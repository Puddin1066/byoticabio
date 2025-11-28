/**
 * Analytics and Event Tracking Utility
 * 
 * Tracks user interactions, form submissions, and conversion events
 * for lead generation testing and optimization.
 */

// Helper function to safely access localStorage
function getLeads() {
  if (typeof window === 'undefined' || !window.localStorage) {
    return [];
  }
  try {
    return JSON.parse(localStorage.getItem('bte_leads') || '[]');
  } catch (e) {
    console.error('Error reading leads from localStorage:', e);
    return [];
  }
}

// Helper function to safely set localStorage
function setLeads(leads) {
  if (typeof window === 'undefined' || !window.localStorage) {
    return;
  }
  try {
    localStorage.setItem('bte_leads', JSON.stringify(leads));
  } catch (e) {
    console.error('Error saving leads to localStorage:', e);
  }
}

// Helper to safely access window/document objects
function safeWindowAccess() {
  return typeof window !== 'undefined' ? window : null;
}

function safeDocumentAccess() {
  return typeof document !== 'undefined' ? document : null;
}

/**
 * Track a custom event
 * @param {string} eventName - Name of the event
 * @param {Object} eventData - Additional event data
 */
export function trackEvent(eventName, eventData = {}) {
  const win = safeWindowAccess();
  const doc = safeDocumentAccess();
  
  if (!win) {
    // Server-side rendering - skip tracking
    return;
  }

  const event = {
    name: eventName,
    data: {
      ...eventData,
      timestamp: new Date().toISOString(),
      url: win.location.href,
      path: win.location.pathname,
      referrer: doc?.referrer || '',
      userAgent: navigator.userAgent || '',
    }
  };

  // Log to console for development
  if (import.meta.env.DEV) {
    console.log('[Analytics Event]', event);
  }

  // Store in localStorage for analysis (temporary solution)
  try {
    const events = JSON.parse(localStorage.getItem('bte_analytics_events') || '[]');
    events.push(event);
    // Keep only last 1000 events
    if (events.length > 1000) {
      events.shift();
    }
    localStorage.setItem('bte_analytics_events', JSON.stringify(events));
  } catch (e) {
    console.error('Error storing analytics event:', e);
  }

  // Google Analytics 4 (if configured)
  if (win.gtag) {
    win.gtag('event', eventName, {
      ...eventData,
      event_category: 'Lead Generation',
      event_label: eventName,
    });
  }

  // Send to custom analytics endpoint (if configured)
  if (import.meta.env.VITE_ANALYTICS_ENDPOINT) {
    fetch(import.meta.env.VITE_ANALYTICS_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event),
    }).catch(err => {
      console.error('Analytics tracking error:', err);
    });
  }
}

/**
 * Track page view
 */
export function trackPageView() {
  const doc = safeDocumentAccess();
  const win = safeWindowAccess();
  
  trackEvent('page_view', {
    page_title: doc?.title || '',
    page_path: win?.location?.pathname || '',
  });
}

/**
 * Track CTA button click
 * @param {string} ctaName - Name/identifier of the CTA
 * @param {string} location - Where the CTA is located on the page
 */
export function trackCTAClick(ctaName, location = 'unknown') {
  trackEvent('cta_click', {
    cta_name: ctaName,
    location: location,
  });
}

/**
 * Track form open
 * @param {string} formType - Type of form ('contact', 'demo')
 */
export function trackFormOpen(formType) {
  trackEvent('form_open', {
    form_type: formType,
  });
}

/**
 * Track form field interaction
 * @param {string} formType - Type of form
 * @param {string} fieldName - Name of the field
 * @param {string} action - Action performed ('focus', 'blur', 'change')
 */
export function trackFormField(formType, fieldName, action) {
  trackEvent('form_field_interaction', {
    form_type: formType,
    field_name: fieldName,
    action: action,
  });
}

/**
 * Track form submission
 * @param {string} formType - Type of form
 * @param {Object} formData - Form data (sanitized)
 */
export function trackFormSubmit(formType, formData) {
  const win = safeWindowAccess();
  const doc = safeDocumentAccess();
  
  if (!win) {
    // Server-side rendering - skip tracking
    return null;
  }

  // Extract lead information
  const lead = {
    ...formData,
    form_type: formType,
    timestamp: new Date().toISOString(),
    source: 'byoticabio_landing_page',
    url: win.location.href,
    referrer: doc?.referrer || '',
    utm_source: getURLParameter('utm_source'),
    utm_medium: getURLParameter('utm_medium'),
    utm_campaign: getURLParameter('utm_campaign'),
    market_segment: identifyMarketSegment(formData),
  };

  // Store lead
  const leads = getLeads();
  leads.push(lead);
  setLeads(leads);

  // Track event
  trackEvent('form_submit', {
    form_type: formType,
    market_segment: lead.market_segment,
    has_company: !!formData.company,
    has_project_type: !!formData.projectType,
  });

  // Log to console
  console.log('[Lead Captured]', lead);

  return lead;
}

/**
 * Track form abandonment
 * @param {string} formType - Type of form
 * @param {Object} partialData - Data entered before abandonment
 */
export function trackFormAbandonment(formType, partialData = {}) {
  trackEvent('form_abandonment', {
    form_type: formType,
    fields_completed: Object.keys(partialData).length,
    has_email: !!partialData.email,
    has_name: !!partialData.name,
  });
}

/**
 * Track scroll depth
 * @param {number} percentage - Percentage of page scrolled
 */
export function trackScrollDepth(percentage) {
  const win = safeWindowAccess();
  if (!win || !win.sessionStorage) return;
  
  // Only track at milestones (25%, 50%, 75%, 100%)
  const milestones = [25, 50, 75, 100];
  const milestone = milestones.find(m => percentage >= m);
  
  if (milestone) {
    const key = `scroll_${milestone}`;
    try {
      if (!win.sessionStorage.getItem(key)) {
        win.sessionStorage.setItem(key, 'true');
        trackEvent('scroll_depth', {
          percentage: milestone,
        });
      }
    } catch (e) {
      console.error('Error accessing sessionStorage:', e);
    }
  }
}

/**
 * Track section view
 * @param {string} sectionId - ID of the section
 * @param {string} sectionName - Name of the section
 */
export function trackSectionView(sectionId, sectionName) {
  const win = safeWindowAccess();
  if (!win || !win.sessionStorage) return;
  
  const key = `section_viewed_${sectionId}`;
  try {
    if (!win.sessionStorage.getItem(key)) {
      win.sessionStorage.setItem(key, 'true');
      trackEvent('section_view', {
        section_id: sectionId,
        section_name: sectionName,
      });
    }
  } catch (e) {
    console.error('Error accessing sessionStorage:', e);
  }
}

/**
 * Identify market segment from form data
 * @param {Object} formData - Form data
 * @returns {string} Market segment identifier
 */
function identifyMarketSegment(formData) {
  const email = (formData.email || '').toLowerCase();
  const company = (formData.company || '').toLowerCase();
  const message = (formData.message || '').toLowerCase();
  const projectType = (formData.projectType || '').toLowerCase();

  // VC indicators
  const vcKeywords = ['capital', 'partners', 'ventures', 'investments', 'fund', 'vc'];
  if (vcKeywords.some(keyword => email.includes(keyword) || company.includes(keyword))) {
    return 'vc';
  }
  if (projectType === 'due-diligence' && message.includes('investment')) {
    return 'vc';
  }

  // Pharma indicators
  const pharmaKeywords = ['pharma', 'pharmaceutical', 'pharmaceuticals', 'biopharma'];
  if (pharmaKeywords.some(keyword => email.includes(keyword) || company.includes(keyword))) {
    return 'pharma';
  }

  // Biotech indicators
  const biotechKeywords = ['biotech', 'bio', 'therapeutics', 'genomics', 'biologics'];
  if (biotechKeywords.some(keyword => email.includes(keyword) || company.includes(keyword))) {
    return 'biotech';
  }

  // Entrepreneur/Startup indicators
  if (projectType === 'competitive-intel' || message.includes('startup') || message.includes('validate')) {
    return 'entrepreneur';
  }

  // Default to unknown
  return 'unknown';
}

/**
 * Get URL parameter
 * @param {string} name - Parameter name
 * @returns {string|null} Parameter value
 */
function getURLParameter(name) {
  const win = safeWindowAccess();
  if (!win) return null;
  try {
    const urlParams = new URLSearchParams(win.location.search);
    return urlParams.get(name);
  } catch (e) {
    return null;
  }
}

/**
 * Export leads data
 * @returns {Array} Array of leads
 */
export function exportLeads() {
  return getLeads();
}

/**
 * Export analytics events
 * @returns {Array} Array of events
 */
export function exportAnalyticsEvents() {
  const win = safeWindowAccess();
  if (!win || !win.localStorage) return [];
  
  try {
    return JSON.parse(win.localStorage.getItem('bte_analytics_events') || '[]');
  } catch (e) {
    console.error('Error reading analytics events:', e);
    return [];
  }
}

/**
 * Clear stored data (for testing)
 */
export function clearStoredData() {
  const win = safeWindowAccess();
  if (!win) return;
  
  try {
    if (win.localStorage) {
      win.localStorage.removeItem('bte_leads');
      win.localStorage.removeItem('bte_analytics_events');
    }
    if (win.sessionStorage) {
      win.sessionStorage.clear();
    }
  } catch (e) {
    console.error('Error clearing stored data:', e);
  }
}

/**
 * Get analytics summary
 * @returns {Object} Analytics summary
 */
export function getAnalyticsSummary() {
  const events = exportAnalyticsEvents();
  const leads = exportLeads();
  
  return {
    total_events: events.length,
    total_leads: leads.length,
    page_views: events.filter(e => e.name === 'page_view').length,
    cta_clicks: events.filter(e => e.name === 'cta_click').length,
    form_opens: events.filter(e => e.name === 'form_open').length,
    form_submits: events.filter(e => e.name === 'form_submit').length,
    conversion_rate: events.filter(e => e.name === 'form_submit').length / 
                     Math.max(events.filter(e => e.name === 'page_view').length, 1) * 100,
    leads_by_segment: leads.reduce((acc, lead) => {
      const segment = lead.market_segment || 'unknown';
      acc[segment] = (acc[segment] || 0) + 1;
      return acc;
    }, {}),
  };
}

