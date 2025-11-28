/**
 * HubSpot Integration for Lead Capture and CRM
 * Free Tier: 1,000 contacts, 2,000 emails/month
 * 
 * This integration:
 * - Creates contacts in HubSpot CRM
 * - Triggers automated email workflows
 * - Tracks website visitors
 * - Manages lead lists by segment
 */

// HubSpot API Client (install: pnpm add @hubspot/api-client)
let hubspotClient = null;

// Initialize HubSpot client (lazy load to avoid SSR issues)
function getHubSpotClient() {
  if (typeof window === 'undefined') {
    return null; // Server-side rendering
  }

  if (!hubspotClient && import.meta.env.VITE_HUBSPOT_API_KEY) {
    try {
      // Dynamic import to avoid SSR issues
      import('@hubspot/api-client').then((module) => {
        const { Client } = module;
        hubspotClient = new Client({
          accessToken: import.meta.env.VITE_HUBSPOT_API_KEY,
        });
      });
    } catch (error) {
      console.error('Error initializing HubSpot client:', error);
    }
  }

  return hubspotClient;
}

/**
 * Create contact in HubSpot from form submission
 * @param {Object} formData - Lead form data
 * @param {string} formType - Type of form ('contact' or 'demo')
 * @returns {Promise<Object>} Created contact
 */
export async function createHubSpotContact(formData, formType) {
  const client = getHubSpotClient();
  
  if (!client && import.meta.env.VITE_HUBSPOT_API_KEY) {
    // Wait for client to initialize
    await new Promise(resolve => setTimeout(resolve, 500));
    return await createHubSpotContact(formData, formType);
  }

  if (!client) {
    console.warn('HubSpot client not initialized - skipping HubSpot integration');
    return null;
  }

  try {
    const segment = identifyMarketSegment(formData);
    
    const properties = {
      email: formData.email,
      firstname: formData.name?.split(' ')[0] || formData.name || '',
      lastname: formData.name?.split(' ').slice(1).join(' ') || '',
      company: formData.company || '',
      phone: formData.phone || '',
      hs_lead_status: 'NEW',
      lead_source: 'ByoticaBio.ai Landing Page',
      market_segment: segment,
      project_type: formData.projectType || '',
      message: formData.message || '',
      form_type: formType,
      consultation_requested: formType === 'contact' ? 'true' : 'false',
      demo_requested: formType === 'demo' ? 'true' : 'false',
    };

    const contactObj = {
      properties,
    };

    // Create contact
    const response = await client.crm.contacts.basicApi.create(contactObj);
    
    console.log('✅ Contact created in HubSpot:', response.id);

    // Add to segment list (non-blocking)
    addContactToList(response.id, segment).catch(err => 
      console.warn('Could not add contact to list:', err)
    );
    
    return response;
  } catch (error) {
    // Handle duplicate contact (409) - update instead
    if (error.code === 409 || error.response?.status === 409) {
      console.log('Contact already exists, updating instead');
      return await updateHubSpotContact(formData.email, formData, formType);
    }
    
    console.error('HubSpot contact creation error:', error);
    // Don't throw - fail silently so form submission still works
    return null;
  }
}

/**
 * Update existing contact
 */
async function updateHubSpotContact(email, formData, formType) {
  const client = getHubSpotClient();
  if (!client) return null;

  try {
    // Search for contact by email
    const searchResponse = await client.crm.contacts.searchApi.doSearch({
      query: email,
      limit: 1,
      properties: ['email'],
    });

    if (searchResponse.results && searchResponse.results.length > 0) {
      const contactId = searchResponse.results[0].id;
      
      const segment = identifyMarketSegment(formData);
      
      const properties = {
        project_type: formData.projectType || '',
        message: formData.message || '',
        form_type: formType,
        hs_lead_status: 'OPEN',
        market_segment: segment,
        consultation_requested: formType === 'contact' ? 'true' : 'false',
        demo_requested: formType === 'demo' ? 'true' : 'false',
      };

      await client.crm.contacts.basicApi.update(contactId, { properties });
      
      console.log('✅ Contact updated in HubSpot:', contactId);
      
      return { id: contactId };
    }
  } catch (error) {
    console.error('HubSpot contact update error:', error);
    return null;
  }
  
  return null;
}

/**
 * Add contact to segment-based list
 */
async function addContactToList(contactId, segment) {
  const client = getHubSpotClient();
  if (!client) return;

  try {
    // List names based on segments
    const listNames = {
      vc: 'VC Leads',
      biotech: 'Biotech Leads',
      pharma: 'Pharma Leads',
      entrepreneur: 'Entrepreneur Leads',
      unknown: 'General Leads',
    };

    const listName = listNames[segment] || 'General Leads';
    
    // Get all lists
    const lists = await client.crm.lists.getAll();
    const targetList = lists.results?.find(list => list.name === listName);
    
    if (targetList) {
      await client.crm.lists.addContactsToList(targetList.listId, {
        vids: [contactId],
      });
      console.log(`✅ Added contact to ${listName} list`);
    } else {
      console.warn(`List "${listName}" not found - create it in HubSpot`);
    }
  } catch (error) {
    console.warn('Error adding contact to list (non-critical):', error);
  }
}

/**
 * Identify market segment (reuse from analytics)
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

  // Entrepreneur indicators
  if (projectType === 'competitive-intel' || message.includes('startup') || message.includes('validate')) {
    return 'entrepreneur';
  }

  return 'unknown';
}

/**
 * Track page view in HubSpot
 */
export function trackHubSpotPageView() {
  if (typeof window === 'undefined' || !window.hubspot) {
    return;
  }
  
  try {
    window.hubspot.page();
  } catch (error) {
    console.warn('Error tracking HubSpot page view:', error);
  }
}

/**
 * Track form submission in HubSpot
 */
export function trackHubSpotFormSubmit() {
  if (typeof window === 'undefined' || !window.hubspot) {
    return;
  }
  
  try {
    window.hubspot.track('Form Submitted', {
      form_type: 'Contact Form',
      page: window.location.pathname,
    });
  } catch (error) {
    console.warn('Error tracking HubSpot form submission:', error);
  }
}

/**
 * Check if HubSpot is configured
 */
export function isHubSpotConfigured() {
  return !!import.meta.env.VITE_HUBSPOT_API_KEY;
}

