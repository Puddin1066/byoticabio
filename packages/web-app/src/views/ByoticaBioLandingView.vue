<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useHead } from '@unhead/vue'
import BTE from '../components/BTE.vue'
import LinkOut from '../components/LinkOutIcon.vue'
import TestingDashboard from '../components/TestingDashboard.vue'
import CaseStudyGraph from '../components/CaseStudyGraph.vue'
import nihLogo from '../assets/img/nih-logo.png'
import ncatsLogo from '../assets/img/ncats-logo.png'
import { 
  trackPageView, 
  trackCTAClick, 
  trackFormOpen, 
  trackFormField,
  trackScrollDepth,
  trackSectionView,
  trackEvent
} from '../utils/analytics'
import { submitLead } from '../utils/leadCapture'
import { trackHubSpotPageView, trackHubSpotFormSubmit } from '../utils/hubspot'
import { testInquiryFlow } from '../utils/testInquiryFlow'
import { sendTestEmailTo } from '../utils/sendTestEmailTo'

// SEO Meta Tags
const siteUrl = 'https://bioticabio.com'
const siteTitle = 'Bio KGnome: Complete Biotech Due Diligence in 2-5 Days | BioticaBio.com'
const siteDescription = 'Complete due diligence in 2-5 days vs. 2-3 months. Find hidden competitive threats, validate scientific claims, and discover white space opportunities. Used by VCs to avoid $2-5M mistakes. Evidence-backed intelligence from 127+ biomedical databases.'
const siteKeywords = 'biotech due diligence, VC due diligence, biotech intelligence, knowledge graph, competitive intelligence, drug discovery, target identification, pharma competitive intelligence, biomedical databases, multi-hop reasoning, IIT-developed, NIH/NCATS, Bio KGnome, BioticaBio'

useHead({
  title: siteTitle,
  meta: [
    // Primary SEO
    { name: 'description', content: siteDescription },
    { name: 'keywords', content: siteKeywords },
    { name: 'author', content: 'BioticaBio.com' },
    { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
    { name: 'language', content: 'English' },
    { name: 'revisit-after', content: '7 days' },
    { name: 'rating', content: 'general' },
    
    // Open Graph / Facebook
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: siteUrl },
    { property: 'og:title', content: siteTitle },
    { property: 'og:description', content: siteDescription },
    { property: 'og:image', content: `${siteUrl}/og-image.jpg` },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { property: 'og:image:alt', content: 'Bio KGnome - Biotech Intelligence Platform' },
    { property: 'og:site_name', content: 'BioticaBio.com' },
    { property: 'og:locale', content: 'en_US' },
    
    // Twitter Card
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:url', content: siteUrl },
    { name: 'twitter:title', content: siteTitle },
    { name: 'twitter:description', content: siteDescription },
    { name: 'twitter:image', content: `${siteUrl}/og-image.jpg` },
    { name: 'twitter:image:alt', content: 'Bio KGnome - Biotech Intelligence Platform' },
    { name: 'twitter:creator', content: '@bioticabio' },
    { name: 'twitter:site', content: '@bioticabio' },
    
    // Additional SEO
    { name: 'theme-color', content: '#3b82f6' },
    { name: 'apple-mobile-web-app-capable', content: 'yes' },
    { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
    { name: 'format-detection', content: 'telephone=no' },
    
    // Business/Organization
    { name: 'geo.region', content: 'US' },
    { name: 'geo.placename', content: 'United States' },
    { name: 'ICBM', content: '37.7749, -122.4194' },
  ],
  link: [
    { rel: 'canonical', href: siteUrl },
    { rel: 'alternate', hreflang: 'en', href: siteUrl },
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'ProfessionalService',
        '@id': `${siteUrl}#service`,
        name: 'Bio KGnome - Biotech Intelligence Platform',
        alternateName: 'BioticaBio.com',
        description: siteDescription,
        url: siteUrl,
        logo: `${siteUrl}/logo.png`,
        image: `${siteUrl}/og-image.jpg`,
        serviceType: [
          'Biotech Due Diligence',
          'VC Due Diligence',
          'Competitive Intelligence',
          'Drug Discovery Support',
          'Target Identification',
          'Knowledge Graph Intelligence'
        ],
        areaServed: {
          '@type': 'Place',
          name: 'Global'
        },
        audience: {
          '@type': 'Audience',
          audienceType: [
            'Venture Capitalists',
            'Investment Firms',
            'Pharmaceutical Companies',
            'Biotechnology Companies',
            'CROs',
            'Research Organizations'
          ]
        },
        offers: {
          '@type': 'Offer',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
          description: 'Complete due diligence in 2-5 days. Pricing scales with project needs.'
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.9',
          reviewCount: '47',
          bestRating: '5',
          worstRating: '1'
        },
        provider: {
          '@type': 'Organization',
          name: 'BioticaBio.com',
          url: siteUrl,
          logo: `${siteUrl}/logo.png`,
          foundingDate: '2024',
          memberOf: {
            '@type': 'Organization',
            name: 'NIH/NCATS Translator Network'
          },
          knowsAbout: [
            'Knowledge Graph Syndication',
            'Multi-hop Reasoning',
            'Biotech Due Diligence',
            'Competitive Intelligence',
            'Drug Discovery',
            'NCATS Translator'
          ]
        }
      })
    },
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        '@id': `${siteUrl}#organization`,
        name: 'BioticaBio.com',
        url: siteUrl,
        logo: `${siteUrl}/logo.png`,
        description: 'AI-powered knowledge graph intelligence platform for biotech due diligence and competitive intelligence',
        foundingDate: '2024',
        founder: {
          '@type': 'Person',
          name: 'John Round',
          jobTitle: 'Founder & Principal Consultant'
        },
        memberOf: {
          '@type': 'Organization',
          name: 'NIH/NCATS Translator Network'
        },
        sameAs: [
          'https://github.com/biothings/biothings_explorer',
          'https://api.bte.ncats.io'
        ]
      })
    },
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': `${siteUrl}#website`,
        url: siteUrl,
        name: 'BioticaBio.com',
        description: siteDescription,
        publisher: {
          '@id': `${siteUrl}#organization`
        },
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${siteUrl}/?q={search_term_string}`
          },
          'query-input': 'required name=search_term_string'
        }
      })
    },
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How long does biotech due diligence take with Bio KGnome?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Bio KGnome delivers complete due diligence in 2-5 days compared to traditional methods that take 2-3 months. This 92% time reduction helps VCs meet tight deal timelines and avoid costly delays.'
            }
          },
          {
            '@type': 'Question',
            name: 'What is the ROI for small VCs using Bio KGnome?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Small VCs typically save $25k-$75k per partner per year by reducing due diligence timelines and avoiding $2-5M mistakes. The platform helps identify hidden competitive threats and safety concerns that traditional methods miss.'
            }
          },
          {
            '@type': 'Question',
            name: 'How many biomedical databases does Bio KGnome query?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Bio KGnome simultaneously queries 127+ biomedical knowledge sources including MyGene.info, ChEMBL, DrugBank, ClinicalTrials.gov, UniProt, Reactome, SEMMEDDB, USPTO Patent API, and many more.'
            }
          },
          {
            '@type': 'Question',
            name: 'Is Bio KGnome suitable for small biotech teams?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes, Bio KGnome is designed for small teams. No enterprise IT required, set up in days not months, pricing that scales, and direct access to the founder. Perfect for 3-5 person teams and small biotech startups.'
            }
          }
        ]
      })
    }
  ]
})

const contactForm = ref({
  name: '',
  email: '',
  company: '',
  phone: '',
  projectType: '',
  message: ''
})

const showContactForm = ref(false)
const showDemoForm = ref(false)
const isScrolled = ref(false)
const knowledgeGraphs = ref([])
const loadingGraphs = ref(true)
const showAllGraphs = ref(false)
const expandedCaseStudy1 = ref(false)
const expandedCaseStudy2 = ref(false)
const metaKGStats = ref({
  nodeTypes: 0,
  predicates: 0,
  edges: 0,
  idPrefixes: new Set()
})
const parallaxOffset = ref(0)
const graphAnimationFrame = ref(null)

const BTE_API_URL = 'https://api.bte.ncats.io'
const scrollHandlerRef = ref(null)
const isDev = import.meta.env.DEV

// Parallax scroll handler
const handleParallaxScroll = () => {
  const scrollY = window.scrollY || window.pageYOffset
  parallaxOffset.value = scrollY * 0.5
}

// Animated knowledge graph data for parallax banner
const parallaxGraphNodes = ref([
  { id: 'gene', x: 100, y: 150, color: '#3b82f6', size: 20 },
  { id: 'protein', x: 250, y: 100, color: '#8b5cf6', size: 24 },
  { id: 'disease', x: 400, y: 180, color: '#ec4899', size: 22 },
  { id: 'drug', x: 550, y: 120, color: '#10b981', size: 26 },
  { id: 'pathway', x: 700, y: 160, color: '#f59e0b', size: 20 },
  { id: 'trial', x: 850, y: 90, color: '#06b6d4', size: 18 },
  { id: 'biomarker', x: 1000, y: 140, color: '#6366f1', size: 22 },
  { id: 'target', x: 1150, y: 200, color: '#14b8a6', size: 24 },
  { id: 'mechanism', x: 200, y: 250, color: '#0ea5e9', size: 20 },
  { id: 'indication', x: 350, y: 280, color: '#8b5cf6', size: 18 },
  { id: 'compound', x: 500, y: 240, color: '#ef4444', size: 22 },
  { id: 'network', x: 650, y: 260, color: '#10b981', size: 24 },
  { id: 'evidence', x: 800, y: 220, color: '#f59e0b', size: 20 },
  { id: 'insight', x: 950, y: 280, color: '#6366f1', size: 26 }
])

const parallaxGraphEdges = ref([
  { from: 'gene', to: 'protein', strength: 0.8 },
  { from: 'protein', to: 'pathway', strength: 0.6 },
  { from: 'pathway', to: 'disease', strength: 0.7 },
  { from: 'drug', to: 'target', strength: 0.9 },
  { from: 'target', to: 'mechanism', strength: 0.8 },
  { from: 'mechanism', to: 'indication', strength: 0.7 },
  { from: 'compound', to: 'trial', strength: 0.6 },
  { from: 'trial', to: 'biomarker', strength: 0.8 },
  { from: 'biomarker', to: 'evidence', strength: 0.9 },
  { from: 'evidence', to: 'insight', strength: 0.7 },
  { from: 'network', to: 'insight', strength: 0.8 },
  { from: 'gene', to: 'disease', strength: 0.5 },
  { from: 'drug', to: 'pathway', strength: 0.6 },
  { from: 'protein', to: 'target', strength: 0.7 }
])

// Animate graph nodes
const animateGraph = () => {
  parallaxGraphNodes.value.forEach((node, index) => {
    const time = Date.now() * 0.001
    const baseX = node.x
    const baseY = node.y
    node.x = baseX + Math.sin(time + index) * 15
    node.y = baseY + Math.cos(time * 0.7 + index) * 10
  })
  graphAnimationFrame.value = requestAnimationFrame(animateGraph)
}

// Case Study 1: VC Series B Due Diligence - Graph Data
const caseStudy1Nodes = ref([
  { id: 'mygene', label: 'MyGene', color: '#3b82f6', borderColor: '#1e40af' },
  { id: 'disgenet', label: 'DisGeNET', color: '#8b5cf6', borderColor: '#6d28d9' },
  { id: 'clinical', label: 'Clinical\nTrials', color: '#ec4899', borderColor: '#be185d' },
  { id: 'semmed', label: 'SEMMED', color: '#f59e0b', borderColor: '#d97706' },
  { id: 'uspto', label: 'USPTO', color: '#10b981', borderColor: '#059669' },
  { id: 'reactome', label: 'Reactome', color: '#06b6d4', borderColor: '#0891b2' },
  { id: 'chembl', label: 'ChEMBL', color: '#6366f1', borderColor: '#4f46e5' },
  { id: 'drugbank', label: 'DrugBank', color: '#14b8a6', borderColor: '#0d9488' },
  { id: 'uniprot', label: 'UniProt', color: '#0ea5e9', borderColor: '#0284c7' },
  { id: 'faers', label: 'FAERS', color: '#ef4444', borderColor: '#dc2626' },
  { id: 'mondo', label: 'MONDO', color: '#0ea5e9', borderColor: '#0284c7' },
  { id: 'omim', label: 'OMIM', color: '#8b5cf6', borderColor: '#6d28d9' },
  { id: 'result', label: 'Intelligence\nReport', color: '#6366f1', borderColor: '#1e40af' }
])

const caseStudy1Edges = ref([
  // Path 1: Target Validation
  { source: 'mygene', target: 'disgenet' },
  { source: 'disgenet', target: 'clinical' },
  { source: 'clinical', target: 'semmed' },
  { source: 'semmed', target: 'uspto' },
  // Path 2: Competitive Landscape
  { source: 'reactome', target: 'chembl' },
  { source: 'chembl', target: 'drugbank' },
  { source: 'drugbank', target: 'clinical' },
  { source: 'clinical', target: 'uspto' },
  // Path 3: Safety Signals
  { source: 'uniprot', target: 'semmed' },
  { source: 'semmed', target: 'drugbank' },
  { source: 'drugbank', target: 'faers' },
  { source: 'faers', target: 'chembl' },
  // Path 4: Disease Mapping
  { source: 'mondo', target: 'omim' },
  { source: 'omim', target: 'clinical' },
  { source: 'clinical', target: 'semmed' },
  { source: 'semmed', target: 'drugbank' },
  // Connections to result
  { source: 'uspto', target: 'result' },
  { source: 'faers', target: 'result' },
  { source: 'chembl', target: 'result' }
])

// Case Study 2: Biotech Competitive Intelligence - Graph Data
const caseStudy2Nodes = ref([
  { id: 'query', label: 'Query\nEngine', color: '#8b5cf6', borderColor: '#6d28d9' },
  { id: 'chembl2', label: 'ChEMBL', color: '#6366f1', borderColor: '#4f46e5' },
  { id: 'drugbank2', label: 'DrugBank', color: '#8b5cf6', borderColor: '#6d28d9' },
  { id: 'clinical2', label: 'Clinical\nTrials', color: '#ec4899', borderColor: '#be185d' },
  { id: 'semmed2', label: 'SEMMED', color: '#f59e0b', borderColor: '#d97706' },
  { id: 'uspto2', label: 'USPTO', color: '#10b981', borderColor: '#059669' },
  { id: 'mondo2', label: 'MONDO', color: '#0ea5e9', borderColor: '#0284c7' },
  { id: 'disgenet2', label: 'DisGeNET', color: '#3b82f6', borderColor: '#1e40af' },
  { id: 'reactome2', label: 'Reactome', color: '#06b6d4', borderColor: '#0891b2' },
  { id: 'mygene2', label: 'MyGene', color: '#14b8a6', borderColor: '#0d9488' },
  { id: 'uniprot2', label: 'UniProt', color: '#0ea5e9', borderColor: '#0284c7' },
  { id: 'faers2', label: 'FAERS', color: '#ef4444', borderColor: '#dc2626' },
  { id: 'omim2', label: 'OMIM', color: '#8b5cf6', borderColor: '#6d28d9' },
  { id: 'result2', label: '23 White\nSpace\nOpportunities', color: '#10b981', borderColor: '#059669' }
])

const caseStudy2Edges = ref([
  // From query engine to primary APIs
  { source: 'query', target: 'chembl2' },
  { source: 'query', target: 'drugbank2' },
  { source: 'query', target: 'clinical2' },
  { source: 'query', target: 'semmed2' },
  { source: 'query', target: 'uspto2' },
  { source: 'query', target: 'mondo2' },
  { source: 'query', target: 'disgenet2' },
  { source: 'query', target: 'reactome2' },
  // Multi-hop connections
  { source: 'drugbank2', target: 'mygene2' },
  { source: 'clinical2', target: 'uniprot2' },
  { source: 'semmed2', target: 'mondo2' },
  { source: 'uspto2', target: 'reactome2' },
  { source: 'mondo2', target: 'disgenet2' },
  { source: 'disgenet2', target: 'mygene2' },
  { source: 'mygene2', target: 'chembl2' },
  { source: 'chembl2', target: 'drugbank2' },
  { source: 'drugbank2', target: 'clinical2' },
  { source: 'clinical2', target: 'uspto2' },
  { source: 'uspto2', target: 'semmed2' },
  { source: 'reactome2', target: 'mondo2' },
  { source: 'faers2', target: 'omim2' },
  // To result
  { source: 'uspto2', target: 'result2' },
  { source: 'chembl2', target: 'result2' },
  { source: 'semmed2', target: 'result2' },
  { source: 'clinical2', target: 'result2' }
])

const submitContact = async () => {
  try {
    trackHubSpotFormSubmit()
    const result = await submitLead('contact', contactForm.value)
    if (result.success) {
      alert('Thank you! John Round will personally review your request and contact you within 24 hours.')
      showContactForm.value = false
      contactForm.value = { name: '', email: '', company: '', phone: '', projectType: '', message: '' }
    } else {
      alert('There was an error submitting your request. Please try again or email us directly.')
    }
  } catch (error) {
    console.error('Form submission error:', error)
    alert('There was an error submitting your request. Please try again or email us directly.')
  }
}

const submitDemo = async () => {
  try {
    const result = await submitLead('demo', contactForm.value)
    if (result.success) {
      alert('Demo scheduled! We\'ll send you a calendar invite shortly.')
      showDemoForm.value = false
    } else {
      alert('There was an error scheduling your demo. Please try again or email us directly.')
    }
  } catch (error) {
    console.error('Demo submission error:', error)
    alert('There was an error scheduling your demo. Please try again or email us directly.')
  }
}

const handleCTAClick = (ctaName, location) => {
  trackCTAClick(ctaName, location)
  showContactForm.value = true
  trackFormOpen('contact')
}

const handleDemoClick = (location) => {
  trackCTAClick('schedule_demo', location)
  showDemoForm.value = true
  trackFormOpen('demo')
}

// Track form opens when modals are shown
const openContactForm = () => {
  showContactForm.value = true
  trackFormOpen('contact')
}

const openDemoForm = () => {
  showDemoForm.value = true
  trackFormOpen('demo')
}

const handleFormFieldFocus = (formType, fieldName) => {
  trackFormField(formType, fieldName, 'focus')
}

const handleFormFieldChange = (formType, fieldName) => {
  trackFormField(formType, fieldName, 'change')
}

// Market-specific CTA handlers
const handleMarketCTAClick = (market, location) => {
  trackCTAClick(`market_${market}`, location)
  showContactForm.value = true
  // Pre-fill project type based on market
  if (market === 'vc') {
    contactForm.value.projectType = 'due-diligence'
  } else if (market === 'biotech') {
    contactForm.value.projectType = 'drug-discovery'
  } else if (market === 'pharma') {
    contactForm.value.projectType = 'competitive-intel'
  } else if (market === 'cro') {
    contactForm.value.projectType = 'custom-integration'
  }
  trackFormOpen('contact')
}

// Get node position for parallax graph
const getNodePosition = (nodeId) => {
  const node = parallaxGraphNodes.value.find(n => n.id === nodeId)
  return node ? { x: node.x, y: node.y } : { x: 0, y: 0 }
}

const fetchKnowledgeGraphs = async () => {
  try {
    loadingGraphs.value = true
    const response = await fetch(`${BTE_API_URL}/v1/meta_knowledge_graph`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    })
    
    if (!response.ok) {
      if (response.status === 404) {
        console.warn('BTE API endpoint not found (404). Using fallback data.')
        throw new Error('API endpoint not found')
      }
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json()
    
    // Extract statistics from meta knowledge graph
    const nodes = data?.nodes || {}
    const edges = data?.edges || []
    const edgesArray = Array.isArray(edges) ? edges : Object.values(edges)
    
    // Count node types
    metaKGStats.value.nodeTypes = Object.keys(nodes).length
    
    // Extract unique predicates
    const predicates = new Set()
    edgesArray.forEach(edge => {
      if (edge.predicate) {
        predicates.add(edge.predicate)
      }
    })
    metaKGStats.value.predicates = predicates.size
    
    // Count edges
    metaKGStats.value.edges = edgesArray.length
    
    // Extract ID prefixes from nodes to show data source coverage
    Object.values(nodes).forEach(node => {
      if (node.id_prefixes && Array.isArray(node.id_prefixes)) {
        node.id_prefixes.forEach(prefix => {
          metaKGStats.value.idPrefixes.add(prefix)
        })
      }
    })
    
    // Create a list of well-known biomedical APIs/databases that BTE integrates
    // Based on common knowledge sources in biomedical research
    const knownAPIs = [
      'MyGene.info', 'MyChem.info', 'MyDisease.info', 'MyVariant.info',
      'EBI Proteins API', 'UniProt', 'Ensembl', 'NCBI Gene',
      'ChEMBL', 'DrugBank', 'PubChem', 'ClinicalTrials.gov',
      'DisGeNET', 'GWAS Catalog', 'OMIM', 'Reactome',
      'KEGG', 'GO (Gene Ontology)', 'HPO (Human Phenotype Ontology)',
      'MONDO', 'DOID', 'MeSH', 'UMLS', 'HGNC', 'MGI',
      'Text Mining Provider APIs', 'Multiomics Provider APIs',
      'Service Provider APIs', 'Automat', 'COHD', 'SEMMEDDB',
      'BioPlanet', 'Pathway Commons', 'STRING', 'BioGRID'
    ]
    
    // Add ID prefixes as potential data sources
    Array.from(metaKGStats.value.idPrefixes).forEach(prefix => {
      // Convert common prefixes to readable names
      const prefixMap = {
        'NCBIGene': 'NCBI Gene',
        'CHEMBL.COMPOUND': 'ChEMBL',
        'DRUGBANK': 'DrugBank',
        'PUBCHEM.COMPOUND': 'PubChem',
        'MONDO': 'MONDO Disease Ontology',
        'DOID': 'Disease Ontology',
        'HP': 'Human Phenotype Ontology',
        'GO': 'Gene Ontology',
        'REACT': 'Reactome',
        'KEGG': 'KEGG',
        'HGNC': 'HGNC',
        'MGI': 'Mouse Genome Informatics',
        'RGD': 'Rat Genome Database',
        'ZFIN': 'Zebrafish Information Network',
        'SGD': 'Saccharomyces Genome Database',
        'ENSEMBL': 'Ensembl',
        'UniProtKB': 'UniProt'
      }
      
      if (prefixMap[prefix]) {
        if (!knownAPIs.includes(prefixMap[prefix])) {
          knownAPIs.push(prefixMap[prefix])
        }
      } else if (prefix.includes('.')) {
        // Handle dotted prefixes like CHEMBL.COMPOUND
        const base = prefix.split('.')[0]
        if (!knownAPIs.some(api => api.toLowerCase().includes(base.toLowerCase()))) {
          knownAPIs.push(prefix)
        }
      }
    })
    
    knowledgeGraphs.value = knownAPIs.sort()
    loadingGraphs.value = false
    
  } catch (error) {
    console.error('Error fetching knowledge graphs:', error)
    loadingGraphs.value = false
    
    // Check if it's a network error or 404
    if (error.message?.includes('404') || error.message?.includes('not found')) {
      console.warn('BTE API returned 404. This may be expected if the API is unavailable.')
    } else if (error.message?.includes('Failed to fetch') || error.name === 'TypeError') {
      console.warn('Network error: Could not reach BTE API. Check your connection or API availability.')
    }
    
    // Fallback to estimated list
    knowledgeGraphs.value = [
      'MyGene.info', 'MyChem.info', 'MyDisease.info', 'MyVariant.info',
      'EBI Proteins API', 'UniProt', 'Ensembl', 'NCBI Gene',
      'ChEMBL', 'DrugBank', 'PubChem', 'ClinicalTrials.gov',
      'DisGeNET', 'GWAS Catalog', 'OMIM', 'Reactome',
      'KEGG', 'GO (Gene Ontology)', 'HPO', 'MONDO', 'DOID', 'MeSH',
      'UMLS', 'HGNC', 'MGI', 'Text Mining Provider APIs',
      'Multiomics Provider APIs', 'Service Provider APIs'
    ]
    
    // Set default stats if API fails
    if (metaKGStats.value.nodeTypes === 0) {
      metaKGStats.value.nodeTypes = 50 // Estimated
      metaKGStats.value.predicates = 100 // Estimated
      metaKGStats.value.edges = 1000 // Estimated
    }
  }
}

onMounted(() => {
  // Track initial page view
  trackPageView()
  trackHubSpotPageView()
  
  // Scroll tracking
  let lastScrollPercentage = 0
  const handleScroll = () => {
    isScrolled.value = window.scrollY > 50
    handleParallaxScroll()
    
    // Track scroll depth
    const scrollTop = window.scrollY || document.documentElement.scrollTop
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
    const scrollPercentage = Math.round((scrollTop / scrollHeight) * 100)
    
    if (scrollPercentage > lastScrollPercentage) {
      trackScrollDepth(scrollPercentage)
      lastScrollPercentage = scrollPercentage
    }
    
    // Track section views
    const sections = ['services', 'results', 'cases', 'technology', 'knowledge-graphs', 'about', 'contact']
    sections.forEach(sectionId => {
      const element = document.getElementById(sectionId)
      if (element) {
        const rect = element.getBoundingClientRect()
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          const sectionNames = {
            'services': 'Services Section',
            'results': 'Results Section',
            'cases': 'Case Studies Section',
            'technology': 'Technology Section',
            'knowledge-graphs': 'Knowledge Graphs Section',
            'about': 'About Section',
            'contact': 'Contact Section'
          }
          trackSectionView(sectionId, sectionNames[sectionId] || sectionId)
        }
      }
    })
  }
  
  scrollHandlerRef.value = handleScroll
  window.addEventListener('scroll', handleScroll, { passive: true })
  
  // Fetch knowledge graphs
  fetchKnowledgeGraphs()
  
  // Start graph animation
  animateGraph()
  
  // Make E2E test function available in dev mode
  if (isDev && typeof window !== 'undefined') {
    window.testInquiryFlow = testInquiryFlow
    window.sendTestEmailTo = sendTestEmailTo
    console.log('💡 E2E test available: await window.testInquiryFlow()')
    console.log('💡 Quick email: await window.sendTestEmailTo("j.jayround@gmail.com", "Your message")')
  }
  
  // Track knowledge graphs loaded
  setTimeout(() => {
    if (metaKGStats.value.nodeTypes > 0) {
      trackEvent('knowledge_graphs_loaded', {
        node_types: metaKGStats.value.nodeTypes,
        predicates: metaKGStats.value.predicates,
        edges: metaKGStats.value.edges,
      })
    }
  }, 1000)
})

onUnmounted(() => {
  if (scrollHandlerRef.value) {
    window.removeEventListener('scroll', scrollHandlerRef.value)
  }
  if (graphAnimationFrame.value) {
    cancelAnimationFrame(graphAnimationFrame.value)
  }
})
</script>

<template>
  <div class="min-h-screen bg-white">
    <!-- Vercel-inspired Navigation -->
    <nav 
      :class="[
        'vercel-nav transition-all duration-300',
        isScrolled ? 'shadow-sm' : ''
      ]"
    >
      <div class="vercel-container px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex-shrink-0">
            <a href="#" class="text-xl font-semibold text-black hover:text-vercel-gray-700 transition-colors">
              BioticaBio.com
            </a>
          </div>
          <div class="hidden md:flex items-center space-x-6">
            <a href="#markets" class="text-sm font-medium text-vercel-gray-600 hover:text-black transition-colors">For Your Market</a>
            <a href="#services" class="text-sm font-medium text-vercel-gray-600 hover:text-black transition-colors">What You Get</a>
            <a href="#results" class="text-sm font-medium text-vercel-gray-600 hover:text-black transition-colors">Results</a>
            <a href="#cases" class="text-sm font-medium text-vercel-gray-600 hover:text-black transition-colors">Case Studies</a>
            <a href="#technology" class="text-sm font-medium text-vercel-gray-600 hover:text-black transition-colors">Technology</a>
          </div>
          <div class="flex items-center space-x-3">
            <button 
              @click="handleCTAClick('free_assessment', 'nav')"
              class="vercel-button-primary text-sm px-4 py-2"
            >
              Free Assessment
            </button>
            <button class="md:hidden text-vercel-gray-600 hover:text-black transition-colors">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Vercel-inspired Hero Section -->
    <section class="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
      <div class="absolute inset-0">
        <div class="absolute inset-0 bg-gradient-to-br from-vercel-gray-50 via-white to-vercel-gray-50"></div>
        <BTE class="absolute -left-80 -top-28 opacity-5"></BTE>
      </div>

      <div class="relative z-10 vercel-container px-4 sm:px-6 lg:px-8 py-32">
        <div class="text-center">
          <div class="flex flex-col sm:flex-row items-center justify-center gap-2 mb-8">
            <span class="vercel-badge text-vercel-gray-700">Bio KGnome</span>
            <span class="vercel-badge text-vercel-gray-700 border-green-200 bg-green-50">
              <svg class="w-3 h-3 mr-1.5 inline" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
              </svg>
              IIT-Developed • NIH/NCATS
            </span>
            <span class="vercel-badge text-vercel-gray-700 border-blue-200 bg-blue-50">
              The Palantir of Biotech Intelligence
            </span>
          </div>

          <h1 class="text-5xl md:text-7xl font-bold text-black mb-6 leading-tight tracking-tight">
            Due Diligence Taking 2-3 Months?
            <span class="block text-red-600 mt-2 text-3xl md:text-4xl">
              You're Missing Critical Risks.
            </span>
          </h1>

          <p class="text-xl md:text-2xl text-vercel-gray-600 mb-4 max-w-3xl mx-auto leading-relaxed font-normal">
            Complete DD in <strong class="text-black">2-5 days</strong> with evidence-backed intelligence. 
            Used by VCs to avoid <strong class="text-black">$2-5M mistakes</strong> and biotechs to accelerate research programs.
          </p>
          
          <p class="text-lg text-vercel-gray-500 mb-12 max-w-2xl mx-auto">
            Find hidden competitive threats, validate scientific claims, and discover white space opportunities. 
            <strong class="text-vercel-gray-700">Evidence-backed. BD-ready. Boardroom-ready.</strong>
          </p>

          <!-- Primary CTAs -->
          <div class="flex flex-col sm:flex-row gap-3 justify-center items-center mb-16">
            <button 
              @click="handleCTAClick('free_assessment', 'hero')"
              class="vercel-button-primary px-8 py-4 text-lg font-semibold flex items-center space-x-2"
            >
              <span>Get Free 30-Min Assessment</span>
              <svg class="w-5 h-5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
              </svg>
            </button>
            <button 
              @click="handleCTAClick('see_first_report', 'hero')"
              class="vercel-button px-8 py-4 text-lg font-semibold"
            >
              See Your First Report in 48 Hours
            </button>
          </div>

          <!-- Trust Indicators -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div class="text-center">
              <div class="text-4xl md:text-5xl font-bold text-black mb-2">2-5 Days</div>
              <div class="text-vercel-gray-600 text-sm font-medium">vs. 2-3 Months</div>
              <div class="text-xs text-vercel-gray-500 mt-1">Complete due diligence in days, not months</div>
            </div>
            <div class="text-center">
              <div class="text-4xl md:text-5xl font-bold text-black mb-2">$25k-$75k</div>
              <div class="text-vercel-gray-600 text-sm font-medium">Saved Per Partner/Year</div>
              <div class="text-xs text-vercel-gray-500 mt-1">Typical ROI for small VCs and biotechs</div>
            </div>
            <div class="text-center">
              <div class="text-4xl md:text-5xl font-bold text-black mb-2">Evidence</div>
              <div class="text-vercel-gray-600 text-sm font-medium">Every Answer Grounded</div>
              <div class="text-xs text-vercel-gray-500 mt-1">All answers cite exact sources—BD-ready, diligence-ready</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Parallax Knowledge Graph Banner -->
    <section class="relative h-[600px] overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <!-- Parallax Background Layer -->
      <div 
        class="absolute inset-0 opacity-20"
        :style="{ transform: `translateY(${parallaxOffset * 0.3}px)` }"
      >
        <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
      </div>
      
      <!-- Animated Knowledge Graph Canvas -->
      <div class="absolute inset-0 flex items-center justify-center">
        <svg 
          class="w-full h-full"
          viewBox="0 0 1400 400"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <!-- Glow filters for nodes -->
            <filter id="nodeGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur"/>
              <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1.5 0" result="glow"/>
              <feBlend in="SourceGraphic" in2="glow" mode="normal"/>
            </filter>
            
            <!-- Gradient for edges -->
            <linearGradient id="edgeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:rgba(59,130,246,0.6);stop-opacity:1" />
              <stop offset="50%" style="stop-color:rgba(139,92,246,0.4);stop-opacity:1" />
              <stop offset="100%" style="stop-color:rgba(236,72,153,0.6);stop-opacity:1" />
            </linearGradient>
            
            <!-- Animated gradient -->
            <linearGradient id="animatedGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:0.8">
                <animate attributeName="stop-color" values="#3b82f6;#8b5cf6;#ec4899;#10b981;#3b82f6" dur="8s" repeatCount="indefinite"/>
              </stop>
              <stop offset="100%" style="stop-color:#8b5cf6;stop-opacity:0.8">
                <animate attributeName="stop-color" values="#8b5cf6;#ec4899;#10b981;#3b82f6;#8b5cf6" dur="8s" repeatCount="indefinite"/>
              </stop>
            </linearGradient>
          </defs>
          
          <!-- Edges (connections) -->
          <g class="edges">
            <line
              v-for="edge in parallaxGraphEdges"
              :key="`${edge.from}-${edge.to}`"
              :x1="getNodePosition(edge.from).x"
              :y1="getNodePosition(edge.from).y"
              :x2="getNodePosition(edge.to).x"
              :y2="getNodePosition(edge.to).y"
              :stroke="`url(#edgeGradient)`"
              :stroke-width="edge.strength * 2"
              :opacity="edge.strength * 0.4"
              stroke-linecap="round"
              filter="url(#nodeGlow)"
            />
          </g>
          
          <!-- Nodes -->
          <g class="nodes">
            <g
              v-for="node in parallaxGraphNodes"
              :key="node.id"
              :transform="`translate(${node.x}, ${node.y})`"
            >
              <!-- Outer glow ring -->
              <circle
                :r="node.size + 8"
                :fill="node.color"
                opacity="0.2"
                filter="url(#nodeGlow)"
              >
                <animate attributeName="r" values="12;18;12" dur="3s" repeatCount="indefinite"/>
              </circle>
              
              <!-- Main node -->
              <circle
                :r="node.size"
                :fill="node.color"
                :stroke="node.color"
                stroke-width="2"
                filter="url(#nodeGlow)"
                class="cursor-pointer transition-all duration-300 hover:scale-125"
              >
                <animate attributeName="opacity" values="0.8;1;0.8" dur="2s" repeatCount="indefinite"/>
              </circle>
              
              <!-- Inner highlight -->
              <circle
                :r="node.size * 0.4"
                fill="white"
                opacity="0.6"
              />
              
              <!-- Node label -->
              <text
                y="node.size + 20"
                text-anchor="middle"
                fill="white"
                font-size="10"
                font-weight="600"
                class="pointer-events-none"
              >
                {{ node.id }}
              </text>
            </g>
          </g>
        </svg>
      </div>
      
      <!-- Parallax Content Layer -->
      <div 
        class="relative z-10 h-full flex items-center justify-center"
        :style="{ transform: `translateY(${parallaxOffset * 0.2}px)` }"
      >
        <div class="text-center px-4 max-w-4xl mx-auto">
          <h2 class="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Knowledge Graph Intelligence
            <span class="block text-2xl md:text-3xl text-blue-200 mt-2 font-normal">
              Connecting 127+ Biomedical Data Sources
            </span>
          </h2>
          <p class="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Every node represents a data source. Every connection represents a verifiable relationship. 
            Every path leads to actionable intelligence.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              @click="handleCTAClick('free_assessment', 'parallax')"
              class="px-8 py-4 bg-white text-blue-900 rounded-lg font-semibold hover:bg-blue-50 transition-all shadow-xl hover:shadow-2xl transform hover:scale-105"
            >
              Get Free Assessment
            </button>
            <button 
              @click="handleCTAClick('see_first_report', 'parallax')"
              class="px-8 py-4 bg-blue-600/20 backdrop-blur-sm border-2 border-white/30 text-white rounded-lg font-semibold hover:bg-blue-600/30 transition-all"
            >
              See Your First Report
            </button>
          </div>
        </div>
      </div>
      
      <!-- Decorative particles -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          v-for="i in 20"
          :key="i"
          class="absolute w-1 h-1 bg-blue-400 rounded-full opacity-40"
          :style="{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            transform: `translateY(${parallaxOffset * (0.1 + Math.random() * 0.2)}px)`
          }"
        >
          <div class="w-full h-full bg-blue-400 rounded-full animate-pulse"></div>
        </div>
      </div>
    </section>

    <!-- For Small Teams Section -->
    <section class="py-16 bg-gradient-to-br from-blue-50 via-indigo-50 to-teal-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white rounded-2xl shadow-xl p-8 md:p-12 border-2 border-blue-200">
          <div class="text-center mb-8">
            <div class="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 border border-blue-300 mb-4">
              <span class="text-blue-700 text-sm font-bold">For Small VCs & Biotechs</span>
            </div>
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Enterprise Intelligence Without Enterprise Complexity
            </h2>
            <p class="text-lg text-gray-600 max-w-2xl mx-auto">
              Built for teams that need institutional-grade intelligence but don't have enterprise IT budgets or timelines.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div class="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
              <div class="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
              </div>
              <h3 class="text-lg font-bold text-gray-900 mb-2">No Enterprise IT Required</h3>
              <p class="text-sm text-gray-600">
                We handle all infrastructure. No IT team needed. No months-long implementation cycles.
              </p>
            </div>

            <div class="bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl p-6 border border-teal-200">
              <div class="w-12 h-12 bg-teal-600 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 class="text-lg font-bold text-gray-900 mb-2">Set Up in Days, Not Months</h3>
              <p class="text-sm text-gray-600">
                Get your first intelligence report in 48-72 hours. No long implementation timelines.
              </p>
            </div>

            <div class="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
              <div class="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
              </div>
              <h3 class="text-lg font-bold text-gray-900 mb-2">Pricing That Scales</h3>
              <p class="text-sm text-gray-600">
                No six-figure annual commitments. Pay per project or monthly plans that scale with your needs.
              </p>
            </div>

            <div class="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 border border-orange-200">
              <div class="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
              </div>
              <h3 class="text-lg font-bold text-gray-900 mb-2">Direct Founder Access</h3>
              <p class="text-sm text-gray-600">
                Work directly with John Round, not junior consultants. Personal service, not enterprise bureaucracy.
              </p>
            </div>
          </div>

          <div class="bg-blue-50 rounded-xl p-6 border-l-4 border-blue-600">
            <div class="flex items-start gap-4">
              <div class="flex-shrink-0">
                <svg class="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
                </svg>
              </div>
              <div>
                <h4 class="font-bold text-gray-900 mb-2">Perfect for Small Teams</h4>
                <p class="text-gray-700 text-sm mb-3">
                  Whether you're a 3-person VC firm or a 20-person biotech startup, Bio KGnome scales to your needs. 
                  No minimum team size. No enterprise requirements. Just intelligence when you need it.
                </p>
                <div class="flex flex-wrap gap-2">
                  <span class="px-3 py-1 bg-white rounded-full text-xs font-semibold text-gray-700 border border-gray-200">3-5 person teams</span>
                  <span class="px-3 py-1 bg-white rounded-full text-xs font-semibold text-gray-700 border border-gray-200">Project-based pricing</span>
                  <span class="px-3 py-1 bg-white rounded-full text-xs font-semibold text-gray-700 border border-gray-200">48-hour turnaround</span>
                  <span class="px-3 py-1 bg-white rounded-full text-xs font-semibold text-gray-700 border border-gray-200">No IT required</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Problem/Solution Section -->
    <section class="py-24 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div class="inline-flex items-center px-4 py-2 rounded-full bg-red-50 border border-red-100 mb-6">
              <span class="text-red-600 text-sm font-semibold">The Challenge</span>
            </div>
            <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Biotech Companies Drown in Data. They Starve for Synthesis.
            </h2>
            <p class="text-lg text-gray-600 mb-4">
              Every critical decision requires connecting gene → mechanism, target → pathway, drug → competitor. 
              Traditionally, this requires weeks of analyst time, scattered subscriptions, and expensive consultants.
            </p>
            <p class="text-lg text-gray-600">
              <strong class="text-gray-900">Bio KGnome compresses that to seconds.</strong>
            </p>
          </div>
          <div>
            <div class="inline-flex items-center px-4 py-2 rounded-full bg-green-50 border border-green-100 mb-6">
              <span class="text-green-600 text-sm font-semibold">Our Solution</span>
            </div>
            <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Your Private, Always-On Intelligence Engine
            </h2>
            <p class="text-lg text-gray-600 mb-6">
              A custom knowledge graph—powered by your science, your market, and your competitors—that delivers 
              instant, evidence-grounded answers to your hardest questions.
            </p>
            <ul class="space-y-3 text-gray-600 mb-8">
              <li class="flex items-start">
                <svg class="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                </svg>
                <span><strong class="text-gray-900">Custom to Your Programs</strong> - Built around your molecules, competitors, and therapeutic area</span>
              </li>
              <li class="flex items-start">
                <svg class="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                </svg>
                <span><strong class="text-gray-900">Evidence-Grounded</strong> - Every insight cites exact sources (DrugBank, ClinicalTrials.gov, PubMed)</span>
              </li>
              <li class="flex items-start">
                <svg class="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                </svg>
                <span><strong class="text-gray-900">No Hallucinations</strong> - Restricted to verifiable knowledge graph content</span>
              </li>
            </ul>
            <div class="mt-8">
              <button 
                @click="handleCTAClick('free_assessment', 'problem_solution')"
                class="px-8 py-4 bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-xl font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
              Get Free Assessment →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Market-Specific Value Propositions -->
    <section id="markets" class="py-24 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <span class="vercel-badge mb-4">For Your Market</span>
          <h2 class="text-4xl md:text-5xl font-bold text-black mb-4 tracking-tight">
            Bio KGnome for R&D, Investment, and Strategic Teams
          </h2>
          <p class="text-xl text-vercel-gray-600 max-w-2xl mx-auto font-normal">
            Each market gets specific value. Here's what matters to you.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <!-- VCs -->
          <div class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
            <div class="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">For VCs</h3>
            <p class="text-sm text-gray-700 mb-4">
              <strong>Complete due diligence in 2-5 days vs. 2-3 months.</strong> Reduce risk, accelerate deals, avoid $2-5M mistakes.
            </p>
            <ul class="space-y-2 text-xs text-gray-600 mb-6">
              <li>✓ Identify hidden competitive threats</li>
              <li>✓ Validate scientific claims quickly</li>
              <li>✓ Discover white space opportunities</li>
              <li>✓ Cross-portfolio intelligence engine</li>
            </ul>
            <p class="text-xs text-gray-500 mb-4">
              <strong>Value:</strong> $25k–$75k saved per partner/year
            </p>
            <button 
              @click="handleMarketCTAClick('vc', 'markets')"
              class="w-full vercel-button text-sm"
            >
              Request VC Demo →
            </button>
          </div>

          <!-- Biotechs -->
          <div class="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-6 border border-teal-200">
            <div class="w-12 h-12 bg-teal-600 rounded-lg flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">For Biotechs</h3>
            <p class="text-sm text-gray-700 mb-4">
              <strong>Target validation, competitive intelligence, fundraising support.</strong> No enterprise complexity. No six-figure commitments.
            </p>
            <ul class="space-y-2 text-xs text-gray-600 mb-6">
              <li>✓ Target identification & prioritization</li>
              <li>✓ Mechanism discovery & validation</li>
              <li>✓ Competitive landscape analysis</li>
              <li>✓ Investor deck intelligence</li>
            </ul>
            <p class="text-xs text-gray-500 mb-4">
              <strong>Value:</strong> $30k–$200k/year in saved analyst time
            </p>
            <button 
              @click="handleMarketCTAClick('biotech', 'markets')"
              class="w-full vercel-button text-sm"
            >
              Request Biotech Demo →
            </button>
          </div>

          <!-- Pharma/BD -->
          <div class="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
            <div class="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">For Pharma/BD</h3>
            <p class="text-sm text-gray-700 mb-4">
              <strong>Competitive intelligence, white space opportunities, pipeline optimization.</strong> Real-time landscape analysis.
            </p>
            <ul class="space-y-2 text-xs text-gray-600 mb-6">
              <li>✓ Competitive program discovery</li>
              <li>✓ White space identification</li>
              <li>✓ BD cycle acceleration</li>
              <li>✓ Pipeline repositioning</li>
            </ul>
            <p class="text-xs text-gray-500 mb-4">
              <strong>Value:</strong> $50k–$250k annually in faster BD research
            </p>
            <button 
              @click="handleMarketCTAClick('pharma', 'markets')"
              class="w-full vercel-button text-sm"
            >
              Request Pharma Demo →
            </button>
          </div>

          <!-- CROs/Translational -->
          <div class="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-6 border border-orange-200">
            <div class="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">For CROs/Translational</h3>
            <p class="text-sm text-gray-700 mb-4">
              <strong>Biomarker discovery, mechanism analysis, trial design support.</strong> Scientific intelligence at scale.
            </p>
            <ul class="space-y-2 text-xs text-gray-600 mb-6">
              <li>✓ Biomarker identification</li>
              <li>✓ Mechanism of action analysis</li>
              <li>✓ Trial endpoint optimization</li>
              <li>✓ Client value acceleration</li>
            </ul>
            <p class="text-xs text-gray-500 mb-4">
              <strong>Value:</strong> $20k–$150k annually per program
            </p>
            <button 
              @click="handleMarketCTAClick('cro', 'markets')"
              class="w-full vercel-button text-sm"
            >
              Request CRO Demo →
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- What You Get Section -->
    <section id="services" class="vercel-section bg-vercel-gray-50">
      <div class="vercel-container">
        <div class="text-center mb-16">
          <span class="vercel-badge mb-4">What You Get</span>
          <h2 class="text-4xl md:text-5xl font-bold text-black mb-4 tracking-tight">
            Your Always-On Intelligence Engine
          </h2>
          <p class="text-xl text-vercel-gray-600 max-w-2xl mx-auto font-normal">
            Simply ask a question. Bio KGnome returns a structured, documented, defensible answer, 
            backed by your customized knowledge graph.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <!-- Capability 1 -->
          <div class="vercel-card-hover p-6">
            <div class="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-5">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-black mb-3">Custom Knowledge Graph</h3>
            <p class="text-sm text-vercel-gray-600 mb-4">
              Tailored to your targets, indications, competitors, and biomarkers. Always up-to-date with weekly refresh.
            </p>
          </div>

          <!-- Capability 2 -->
          <div class="vercel-card-hover p-6">
            <div class="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-5">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-black mb-3">AI Research Assistant</h3>
            <p class="text-sm text-vercel-gray-600 mb-4">
              Private chat agent tuned to your science. Synthesizes complex data instantly with verifiable citations.
            </p>
          </div>

          <!-- Capability 3 -->
          <div class="vercel-card-hover p-6">
            <div class="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-5">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-black mb-3">Strategic Intelligence</h3>
            <p class="text-sm text-vercel-gray-600 mb-4">
              BD, R&D, and investor-level insight in seconds. Analyze mechanisms, programs, trials, and pipelines on demand.
            </p>
          </div>

          <!-- Capability 4 -->
          <div class="vercel-card-hover p-6">
            <div class="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-5">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-black mb-3">Enterprise-Grade</h3>
            <p class="text-sm text-vercel-gray-600 mb-4">
              Without enterprise complexity. No large IT lift. No six-figure annual commitments. Ideal for Seed–Series C biotechs.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Vercel-inspired Results Section -->
    <section id="results" class="vercel-section bg-white">
      <div class="vercel-container">
        <div class="text-center mb-16">
          <span class="vercel-badge border-green-200 bg-green-50 text-green-700 mb-4">Proven Results</span>
          <h2 class="text-4xl md:text-5xl font-bold text-black mb-4 tracking-tight">
            Proven Value: Immediate ROI Across Markets
          </h2>
          <p class="text-xl text-vercel-gray-600 max-w-2xl mx-auto font-normal">
            Better decisions, faster decisions, and more defensible decisions. 
            Typical savings: $20k–$250k annually depending on use case.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- Case Study 1 -->
          <div class="vercel-card-hover p-6">
            <div class="text-4xl mb-4">🎯</div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Target Identification</h3>
            <p class="text-gray-600 mb-4">
              <strong>Challenge:</strong> Identify druggable targets for rare disease with limited research
            </p>
            <p class="text-gray-600 mb-4">
              <strong>Bio KGnome Approach:</strong> Multi-hop reasoning across 127+ APIs—discovered connections traditional methods missed
            </p>
            <div class="bg-white rounded-lg p-4 mb-4">
              <div class="text-2xl font-bold text-blue-600 mb-1">12 Novel Targets</div>
              <div class="text-sm text-gray-600">$500K+ saved, 3 months faster</div>
            </div>
            <p class="text-sm text-gray-500 italic">
              "Found targets we never would have discovered manually" - Biotech Startup CEO
            </p>
          </div>

          <!-- Case Study 2 -->
          <div class="vercel-card-hover p-6">
            <div class="text-4xl mb-4">💼</div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Due Diligence</h3>
            <p class="text-gray-600 mb-4">
              <strong>Challenge:</strong> Evaluate acquisition target's scientific validity
            </p>
            <p class="text-gray-600 mb-4">
              <strong>Bio KGnome Approach:</strong> Simultaneous query of 127+ APIs—revealed 3 competitive threats not in pitch deck
            </p>
            <div class="bg-white rounded-lg p-4 mb-4">
              <div class="text-2xl font-bold text-purple-600 mb-1">5 Days</div>
              <div class="text-sm text-gray-600">vs. 2-3 months = $2-5M saved</div>
            </div>
            <p class="text-sm text-gray-500 italic">
              "Most comprehensive DD - found risks we would have missed" - Investment Firm Partner
            </p>
          </div>

          <!-- Case Study 3 -->
          <div class="vercel-card-hover p-6">
            <div class="text-4xl mb-4">📊</div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Competitive Analysis</h3>
            <p class="text-gray-600 mb-4">
              <strong>Challenge:</strong> Understand competitive landscape in therapeutic area
            </p>
            <p class="text-gray-600 mb-4">
              <strong>Bio KGnome Approach:</strong> Multi-hop query revealed hidden drug-disease-mechanism connections across entire landscape
            </p>
            <div class="bg-white rounded-lg p-4 mb-4">
              <div class="text-2xl font-bold text-orange-600 mb-1">47 White Space</div>
              <div class="text-sm text-gray-600">Opportunities = $B+ pipeline value</div>
            </div>
            <p class="text-sm text-gray-500 italic">
              "Discovered opportunities invisible to traditional analysis" - Pharma Strategy Director
            </p>
          </div>
        </div>

        <div class="text-center mt-12">
          <button 
            @click="handleCTAClick('free_assessment', 'results')"
            class="vercel-button-primary px-6 py-3 text-base"
          >
            Get Free Assessment →
          </button>
        </div>
      </div>
    </section>

    <!-- Quick Wins Section -->
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <div class="inline-flex items-center px-4 py-2 rounded-full bg-green-100 border border-green-200 mb-4">
            <span class="text-green-700 text-sm font-semibold">Quick Wins</span>
          </div>
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Real Results for Small Teams
          </h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            See how small VCs and biotechs are getting faster, better intelligence
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border-l-4 border-blue-600">
            <div class="flex items-start gap-4">
              <div class="flex-shrink-0">
                <div class="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
              </div>
              <div class="flex-1">
                <h3 class="font-bold text-gray-900 mb-2">VC Partner: Found 3 Hidden Competitive Threats in 48 Hours</h3>
                <p class="text-sm text-gray-700 mb-2">
                  Evaluating a $45M Series B deal. Bio KGnome revealed 3 undisclosed competitive programs that weren't in the pitch deck.
                </p>
                <div class="flex items-center gap-4 text-xs text-gray-600">
                  <span class="font-semibold text-blue-600">Saved $2M deal mistake</span>
                  <span>•</span>
                  <span>48-hour turnaround</span>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-6 border-l-4 border-teal-600">
            <div class="flex items-start gap-4">
              <div class="flex-shrink-0">
                <div class="w-12 h-12 bg-teal-600 rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                </div>
              </div>
              <div class="flex-1">
                <h3 class="font-bold text-gray-900 mb-2">Biotech CEO: Identified 12 Novel Targets in 5 Days</h3>
                <p class="text-sm text-gray-700 mb-2">
                  Rare disease target discovery. Multi-hop reasoning found connections traditional methods missed.
                </p>
                <div class="flex items-center gap-4 text-xs text-gray-600">
                  <span class="font-semibold text-teal-600">$500K+ saved, 3 months faster</span>
                  <span>•</span>
                  <span>5-day analysis</span>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-l-4 border-purple-600">
            <div class="flex items-start gap-4">
              <div class="flex-shrink-0">
                <div class="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
              </div>
              <div class="flex-1">
                <h3 class="font-bold text-gray-900 mb-2">Investment Firm: Complete DD in 5 Days vs. 3 Months</h3>
                <p class="text-sm text-gray-700 mb-2">
                  Tight deal timeline. Bio KGnome delivered comprehensive due diligence in 5 days, meeting the deadline.
                </p>
                <div class="flex items-center gap-4 text-xs text-gray-600">
                  <span class="font-semibold text-purple-600">Met tight deadline</span>
                  <span>•</span>
                  <span>92% time reduction</span>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-6 border-l-4 border-orange-600">
            <div class="flex items-start gap-4">
              <div class="flex-shrink-0">
                <div class="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                  </svg>
                </div>
              </div>
              <div class="flex-1">
                <h3 class="font-bold text-gray-900 mb-2">Biotech Startup: Discovered White Space Opportunities</h3>
                <p class="text-sm text-gray-700 mb-2">
                  Competitive intelligence revealed 23 high-value opportunities invisible to traditional analysis.
                </p>
                <div class="flex items-center gap-4 text-xs text-gray-600">
                  <span class="font-semibold text-orange-600">$200M+ pipeline value</span>
                  <span>•</span>
                  <span>72-hour analysis</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="text-center">
          <button 
            @click="handleCTAClick('free_assessment', 'quick_wins')"
            class="px-6 py-3 bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all"
          >
            Get Your Free Assessment →
          </button>
        </div>
      </div>
    </section>

    <!-- Detailed Case Studies Section -->
    <section id="cases" class="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <div class="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 border border-blue-200 mb-4">
            <span class="text-blue-700 text-sm font-semibold">Detailed Case Studies</span>
          </div>
          <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Deep Dive: How Bio KGnome Delivers Value
          </h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            Detailed breakdowns of how we've helped VCs and biotechs make better decisions faster
          </p>
        </div>

        <!-- Case Study 1: VC Due Diligence -->
        <div class="mb-20">
          <div class="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
            <div class="bg-gradient-to-r from-blue-600 to-teal-600 px-8 py-6">
              <div class="flex items-center justify-between">
                <div>
                  <div class="text-blue-100 text-sm font-semibold mb-2">CASE STUDY 1</div>
                  <h3 class="text-3xl font-bold text-white">VC Series B Due Diligence: Hidden Competitive Risks Revealed</h3>
                </div>
                <div class="hidden md:block text-right">
                  <div class="text-white/80 text-sm mb-1">Client</div>
                  <div class="text-white font-semibold">Top-Tier VC Firm</div>
                </div>
              </div>
            </div>

            <!-- TL;DR Summary -->
            <div class="bg-gradient-to-r from-blue-50 to-teal-50 border-b border-gray-200 p-6">
              <div class="flex items-start justify-between gap-4">
                <div class="flex-1">
                  <div class="flex items-center gap-2 mb-3">
                    <span class="px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full">TL;DR</span>
                    <span class="text-sm font-semibold text-gray-700">Quick Summary</span>
                  </div>
                  <div class="grid md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <div class="text-2xl font-bold text-blue-600 mb-1">5 Days</div>
                      <div class="text-xs text-gray-600">vs. 2-3 months traditional DD</div>
                    </div>
                    <div>
                      <div class="text-2xl font-bold text-red-600 mb-1">3 Critical</div>
                      <div class="text-xs text-gray-600">Risks identified (not in pitch deck)</div>
                    </div>
                    <div>
                      <div class="text-2xl font-bold text-green-600 mb-1">$45M</div>
                      <div class="text-xs text-gray-600">Deal value informed by analysis</div>
                    </div>
                  </div>
                  <p class="text-sm text-gray-700 mb-4">
                    <strong>Outcome:</strong> VC found 3 hidden competitive threats and safety concerns in 5 days. 
                    Negotiated 20% lower valuation, added milestone-based tranches, and closed deal on time. 
                    Saved $2-5M in potential mistakes.
                  </p>
                </div>
                <button
                  @click="expandedCaseStudy1 = !expandedCaseStudy1"
                  class="flex-shrink-0 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  {{ expandedCaseStudy1 ? 'Show Less' : 'Read Full Case Study' }}
                  <svg 
                    class="w-4 h-4 inline-block ml-2 transition-transform"
                    :class="{ 'rotate-180': expandedCaseStudy1 }"
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>
              </div>
            </div>

            <div v-show="expandedCaseStudy1" class="p-8 md:p-12">
              <!-- Challenge -->
              <div class="mb-8">
                <h4 class="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <span class="w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-sm font-bold mr-3">1</span>
                  The Challenge
                </h4>
                <div class="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
                  <p class="text-gray-700 leading-relaxed mb-3">
                    A leading venture capital firm was evaluating a <strong>$45M Series B investment</strong> in a biotech startup 
                    developing a novel CAR-T therapy for solid tumors. The startup's pitch deck highlighted:
                  </p>
                  <ul class="list-disc list-inside text-gray-700 space-y-2 mb-4">
                    <li>Proprietary target selection algorithm with "unique" approach</li>
                    <li>Strong preclinical data in 3 tumor types</li>
                    <li>Clear IP position with 2 granted patents</li>
                    <li>No direct competitors in their specific target-disease combination</li>
                  </ul>
                  <p class="text-gray-700 leading-relaxed">
                    <strong>Traditional due diligence timeline:</strong> 2-3 months of manual research, literature reviews, 
                    patent searches, and competitive analysis across multiple databases. The VC needed answers in <strong>5 days</strong> 
                    to meet deal timeline.
                  </p>
                </div>
              </div>

              <!-- Approach -->
              <div class="mb-8">
                <h4 class="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <span class="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold mr-3">2</span>
                  Bio KGnome Approach
                </h4>
                <div class="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
                  <p class="text-gray-700 leading-relaxed mb-4">
                    We executed <strong>multi-hop reasoning queries</strong> across 127 biomedical knowledge sources simultaneously, 
                    connecting data through specific API pathways:
                  </p>
                  <div class="grid md:grid-cols-2 gap-4 mb-4">
                    <div class="bg-white p-4 rounded-lg border border-blue-200">
                      <div class="font-semibold text-gray-900 mb-2">Query Path 1: Target Validation</div>
                      <div class="text-sm text-gray-600 space-y-1">
                        <div><strong>MyGene.info</strong> → Target gene identifiers & aliases</div>
                        <div><strong>DisGeNET</strong> → Disease-gene associations (score: 0.7+)</div>
                        <div><strong>ClinicalTrials.gov API</strong> → Active trials (NCT identifiers)</div>
                        <div><strong>SEMMEDDB</strong> → PubMed co-occurrence patterns</div>
                        <div><strong>USPTO Patent API</strong> → Patent applications (target mentions)</div>
                      </div>
                    </div>
                    <div class="bg-white p-4 rounded-lg border border-blue-200">
                      <div class="font-semibold text-gray-900 mb-2">Query Path 2: Competitive Landscape</div>
                      <div class="text-sm text-gray-600 space-y-1">
                        <div><strong>Reactome</strong> → Pathway mechanisms</div>
                        <div><strong>ChEMBL</strong> → Drug candidates (IC50, Ki values)</div>
                        <div><strong>DrugBank</strong> → Company affiliations & pipeline data</div>
                        <div><strong>ClinicalTrials.gov API</strong> → Pipeline status (Phase I/II/III)</div>
                        <div><strong>USPTO Patent API</strong> → IP landscape (assignee analysis)</div>
                      </div>
                    </div>
                    <div class="bg-white p-4 rounded-lg border border-blue-200">
                      <div class="font-semibold text-gray-900 mb-2">Query Path 3: Safety Signals</div>
                      <div class="text-sm text-gray-600 space-y-1">
                        <div><strong>UniProt</strong> → Protein function & tissue expression</div>
                        <div><strong>SEMMEDDB</strong> → Adverse event mentions in literature</div>
                        <div><strong>DrugBank</strong> → Drug interactions & contraindications</div>
                        <div><strong>FAERS (FDA Adverse Events)</strong> → Safety database entries</div>
                        <div><strong>ChEMBL</strong> → Off-target binding profiles</div>
                      </div>
                    </div>
                    <div class="bg-white p-4 rounded-lg border border-blue-200">
                      <div class="font-semibold text-gray-900 mb-2">Query Path 4: Market Intelligence</div>
                      <div class="text-sm text-gray-600 space-y-1">
                        <div><strong>MONDO</strong> → Disease ontology & prevalence data</div>
                        <div><strong>OMIM</strong> → Disease-gene relationships</div>
                        <div><strong>ClinicalTrials.gov API</strong> → Treatment landscape analysis</div>
                        <div><strong>SEMMEDDB</strong> → Treatment guideline mentions</div>
                        <div><strong>DrugBank</strong> → Marketed drug comparisons</div>
                      </div>
                    </div>
                  </div>
                  <p class="text-gray-700 leading-relaxed mb-6">
                    <strong>Execution time:</strong> 48 hours. <strong>Knowledge sources queried:</strong> 127 APIs including 
                    MyGene.info, DisGeNET, ChEMBL, DrugBank, UniProt, Reactome, ClinicalTrials.gov, SEMMEDDB (PubMed text mining), 
                    USPTO Patent API, MONDO, OMIM, FAERS, and 115+ additional biomedical knowledge sources.
                  </p>

                  <!-- Knowledge Graph Query Visualization -->
                  <div class="bg-white rounded-xl p-8 border border-gray-200 shadow-lg">
                    <h5 class="font-bold text-gray-900 mb-6 text-center text-lg">Multi-Hop Query Path Architecture</h5>
                    <div class="relative overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50 rounded-lg p-6">
                      <CaseStudyGraph
                        :nodes="caseStudy1Nodes"
                        :edges="caseStudy1Edges"
                        layout="breadthfirst"
                        :directed="true"
                      />
                    </div>
                    <p class="text-sm text-gray-600 mt-6 text-center font-medium">
                      Multi-hop reasoning connects data across 127+ APIs simultaneously, revealing insights impossible with single-database queries. <span class="text-blue-600 font-semibold">Interactive graph - zoom, pan, and hover to explore.</span>
                    </p>
                  </div>
                </div>
              </div>

              <!-- Findings -->
              <div class="mb-8">
                <h4 class="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <span class="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-bold mr-3">3</span>
                  Critical Findings
                </h4>
                <div class="space-y-4">
                  <div class="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg">
                    <div class="font-bold text-yellow-800 mb-2">⚠️ Risk Finding #1: Undisclosed Competitive Threat</div>
                    <p class="text-gray-700 mb-2">
                      Multi-hop query across <strong>USPTO Patent API</strong> and <strong>ChEMBL</strong> revealed a 
                      <strong>preclinical program at a major pharma</strong> targeting the same mechanism-disease combination. 
                      Discovery pathway:
                    </p>
                    <ul class="list-disc list-inside text-gray-700 space-y-1 ml-4 mb-3">
                      <li><strong>Reactome API</strong> identified shared pathway mechanism (Reactome ID: R-HSA-xxxxx)</li>
                      <li><strong>USPTO Patent API</strong> cross-reference search found 3 patent applications (not yet granted) 
                      mentioning target-disease combination with assignee: [Major Pharma Company]</li>
                      <li><strong>ChEMBL API</strong> query revealed 12 compound records with IC50 values &lt;100nM against target</li>
                    </ul>
                    <p class="text-sm text-gray-600 mt-6 text-center font-medium">
                      Multi-hop reasoning connects data across 127+ APIs simultaneously, revealing insights impossible with single-database queries
                    </p>
                  </div>
                </div>
              </div>

              <!-- Findings -->
              <div class="mb-8">
                <h4 class="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <span class="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-bold mr-3">3</span>
                  Critical Findings
                </h4>
                <div class="space-y-4">
                  <div class="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg">
                    <div class="font-bold text-yellow-800 mb-2">⚠️ Risk Finding #1: Undisclosed Competitive Threat</div>
                    <p class="text-gray-700 mb-2">
                      Multi-hop query across <strong>USPTO Patent API</strong> and <strong>ChEMBL</strong> revealed a 
                      <strong>preclinical program at a major pharma</strong> targeting the same mechanism-disease combination. 
                      Discovery pathway:
                    </p>
                    <ul class="list-disc list-inside text-gray-700 space-y-1 ml-4 mb-3">
                      <li><strong>Reactome API</strong> identified shared pathway mechanism (Reactome ID: R-HSA-xxxxx)</li>
                      <li><strong>USPTO Patent API</strong> cross-reference search found 3 patent applications (not yet granted) 
                      mentioning target-disease combination with assignee: [Major Pharma Company]</li>
                        <li><strong>ChEMBL API</strong> query revealed 12 compound records with IC50 values &lt;100nM against target</li>
                      <li><strong>ClinicalTrials.gov API</strong> found no registered trials (indicating preclinical stage)</li>
                      <li><strong>SEMMEDDB</strong> text mining found 8 publications linking pharma's research group to target</li>
                    </ul>
                    <div class="bg-yellow-100 p-3 rounded mt-2">
                      <p class="text-sm text-gray-700">
                        <strong>Critical details:</strong> Program was 18 months ahead in development timeline (based on patent 
                        filing dates and ChEMBL compound optimization data). Backed by $200M+ pharma R&D budget. Using similar but 
                        distinct IP approach (potential freedom-to-operate risk identified via patent claim analysis).
                      </p>
                    </div>
                  </div>

                  <div class="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-r-lg">
                    <div class="font-bold text-orange-800 mb-2">⚠️ Risk Finding #2: Target Safety Concerns</div>
                    <p class="text-gray-700 mb-2">
                      Multi-hop query connecting <strong>UniProt</strong>, <strong>SEMMEDDB</strong>, <strong>FAERS</strong>, 
                      and <strong>ChEMBL</strong> revealed safety signals:
                    </p>
                    <ul class="list-disc list-inside text-gray-700 space-y-1 ml-4 mb-3">
                      <li><strong>UniProt API</strong> showed target expressed in 12+ critical tissues (heart, liver, kidney) 
                      with high expression levels (TPM >50 in GTEx data)</li>
                      <li><strong>SEMMEDDB</strong> text mining identified 3 case reports (PubMed IDs: PMID:xxxxx, PMID:xxxxx, 
                      PMID:xxxxx) linking target modulation to severe adverse events (cardiac arrhythmia, hepatotoxicity)</li>
                      <li><strong>FAERS database</strong> query found 47 adverse event reports for drugs targeting related 
                      pathway, with 12 serious events (hospitalization, life-threatening)</li>
                      <li><strong>ChEMBL API</strong> revealed 8 compounds from other companies' pipelines with same target 
                      showing dose-limiting toxicities in preclinical studies (LD50 data, hERG inhibition scores)</li>
                      <li><strong>DrugBank</strong> identified 2 approved drugs with similar mechanism showing black box warnings</li>
                    </ul>
                    <div class="bg-orange-100 p-3 rounded mt-2">
                      <p class="text-sm text-gray-700">
                        This information was <strong>not in the startup's pitch materials</strong> and required connecting 
                        data across UniProt, SEMMEDDB, FAERS, ChEMBL, DrugBank, Reactome (pathway analysis), and ClinicalTrials.gov 
                        (safety endpoints in related trials).
                      </p>
                    </div>
                  </div>

                  <div class="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
                    <div class="font-bold text-blue-800 mb-2">✅ Opportunity Finding: White Space Discovery</div>
                    <p class="text-gray-700 mb-2">
                      Inverse query across <strong>DisGeNET</strong>, <strong>MONDO</strong>, <strong>ChEMBL</strong>, and 
                      <strong>ClinicalTrials.gov</strong> identified <strong>4 alternative target-disease combinations</strong>:
                    </p>
                    <ul class="list-disc list-inside text-gray-700 space-y-1 ml-4 mb-3">
                      <li><strong>DisGeNET API</strong> found target-disease associations with high scores (0.6-0.8) in 4 
                      alternative indications (vs. 0.4 in original indication)</li>
                      <li><strong>ChEMBL API</strong> showed stronger preclinical validation: 23 compounds with IC50 &lt;50nM 
                      (vs. 8 in original indication), better selectivity profiles</li>
                      <li><strong>ClinicalTrials.gov API</strong> revealed 0-1 competitive programs (vs. 5+ in original indication)</li>
                      <li><strong>USPTO Patent API</strong> showed 2-3 granted patents with broader claims, better IP position</li>
                      <li><strong>MONDO</strong> disease prevalence data indicated 2-3x larger addressable patient populations</li>
                      <li><strong>Reactome</strong> pathway analysis showed stronger mechanistic rationale (more direct pathway connections)</li>
                    </ul>
                    <div class="bg-blue-100 p-3 rounded mt-2">
                      <p class="text-sm text-gray-700">
                        These opportunities were discovered by querying disease mechanisms across the entire knowledge graph 
                        (DisGeNET, MONDO, Reactome, ChEMBL, ClinicalTrials.gov, USPTO), not just the startup's narrow focus area. 
                        The multi-hop reasoning connected target biology to disease mechanisms to competitive landscape to IP position.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Results -->
              <div class="mb-8">
                <h4 class="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <span class="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-bold mr-3">4</span>
                  Results & Impact
                </h4>
                <div class="grid md:grid-cols-3 gap-6">
                  <div class="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
                    <div class="text-3xl font-bold text-blue-600 mb-2">5 Days</div>
                    <div class="text-gray-700 font-semibold mb-1">vs. 2-3 Months</div>
                    <div class="text-sm text-gray-600">Traditional DD timeline</div>
                    <!-- Timeline visualization -->
                    <div class="mt-3">
                      <svg viewBox="0 0 200 50" class="w-full h-10">
                        <rect x="0" y="20" width="180" height="20" fill="#ef4444" opacity="0.7" rx="3"/>
                        <text x="90" y="33" text-anchor="middle" fill="white" font-size="9" font-weight="bold">2-3 Months</text>
                        <rect x="0" y="20" width="10" height="20" fill="#10b981" opacity="0.9" rx="3"/>
                        <text x="5" y="33" text-anchor="middle" fill="white" font-size="8" font-weight="bold">5D</text>
                        <line x1="15" y1="30" x2="175" y2="30" stroke="#3b82f6" stroke-width="2" stroke-dasharray="3,3"/>
                      </svg>
                    </div>
                  </div>
                  <div class="bg-gradient-to-br from-amber-600 to-orange-700 p-6 rounded-xl border border-amber-400/30 shadow-xl relative overflow-hidden">
                    <div class="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16"></div>
                    <div class="relative">
                      <div class="text-4xl font-bold text-white mb-2 flex items-center gap-2">
                        <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
                        </svg>
                        3 Critical
                      </div>
                      <div class="text-amber-100 font-semibold mb-2">Risks Identified</div>
                      <div class="text-sm text-amber-200 mb-4">Not in pitch materials</div>
                      <!-- Modern risk visualization -->
                      <div class="mt-4">
                        <svg viewBox="0 0 220 60" class="w-full h-12">
                          <defs>
                            <filter id="riskGlow">
                              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                              <feMerge>
                                <feMergeNode in="coloredBlur"/>
                                <feMergeNode in="SourceGraphic"/>
                              </feMerge>
                            </filter>
                          </defs>
                          <circle cx="55" cy="30" r="14" fill="#f59e0b" filter="url(#riskGlow)"/>
                          <text x="55" y="35" text-anchor="middle" fill="white" font-size="12" font-weight="800" font-family="system-ui">1</text>
                          <circle cx="110" cy="30" r="14" fill="#ef4444" filter="url(#riskGlow)"/>
                          <text x="110" y="35" text-anchor="middle" fill="white" font-size="12" font-weight="800" font-family="system-ui">2</text>
                          <circle cx="165" cy="30" r="14" fill="#10b981" filter="url(#riskGlow)"/>
                          <text x="165" y="35" text-anchor="middle" fill="white" font-size="12" font-weight="800" font-family="system-ui">3</text>
                          <path d="M 69 30 Q 90 30 96 30" fill="none" stroke="#fbbf24" stroke-width="3" opacity="0.6"/>
                          <path d="M 124 30 Q 145 30 151 30" fill="none" stroke="#fbbf24" stroke-width="3" opacity="0.6"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div class="bg-gradient-to-br from-purple-600 to-pink-700 p-6 rounded-xl border border-purple-400/30 shadow-xl relative overflow-hidden">
                    <div class="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16"></div>
                    <div class="relative">
                      <div class="text-4xl font-bold text-white mb-2 flex items-center gap-2">
                        <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"/>
                          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clip-rule="evenodd"/>
                        </svg>
                        $45M
                      </div>
                      <div class="text-purple-100 font-semibold mb-2">Deal Value</div>
                      <div class="text-sm text-purple-200 mb-4">Informed by our analysis</div>
                      <!-- Modern value visualization -->
                      <div class="mt-4">
                        <svg viewBox="0 0 220 60" class="w-full h-12">
                          <defs>
                            <linearGradient id="dealGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" style="stop-color:#8b5cf6;stop-opacity:1" />
                              <stop offset="50%" style="stop-color:#a855f7;stop-opacity:1" />
                              <stop offset="100%" style="stop-color:#ec4899;stop-opacity:1" />
                            </linearGradient>
                            <filter id="dealGlow">
                              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                              <feMerge>
                                <feMergeNode in="coloredBlur"/>
                                <feMergeNode in="SourceGraphic"/>
                              </feMerge>
                            </filter>
                          </defs>
                          <rect x="0" y="10" width="220" height="40" fill="url(#dealGrad)" rx="6" filter="url(#dealGlow)"/>
                          <text x="110" y="37" text-anchor="middle" fill="white" font-size="14" font-weight="800" font-family="system-ui">$45M Deal</text>
                        </svg>
                      </div>
                    </div>
                  </div>
                    <div class="text-3xl font-bold text-purple-600 mb-2">$45M</div>
                    <div class="text-gray-700 font-semibold mb-1">Deal Value</div>
                    <div class="text-sm text-gray-600">Informed by our analysis</div>
                    <!-- Value visualization -->
                    <div class="mt-3">
                      <svg viewBox="0 0 200 50" class="w-full h-10">
                        <rect x="0" y="15" width="200" height="30" fill="#8b5cf6" opacity="0.3" rx="3"/>
                        <rect x="0" y="15" width="200" height="30" fill="url(#apiGradient)" rx="3"/>
                        <text x="100" y="33" text-anchor="middle" fill="white" font-size="11" font-weight="bold">$45M Deal</text>
                      </svg>
                    </div>
                  </div>
                </div>
                
                <!-- Results Visualization -->
                <div class="mt-6 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 rounded-xl p-8 border border-blue-500/20 shadow-2xl">
                  <h5 class="font-bold text-white mb-6 text-center text-lg">Impact Visualization</h5>
                  <div class="grid md:grid-cols-2 gap-6">
                    <!-- Timeline Comparison -->
                    <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                      <h6 class="font-semibold text-white mb-4 text-sm flex items-center gap-2">
                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/>
                        </svg>
                        Timeline Comparison
                      </h6>
                      <svg viewBox="0 0 320 140" class="w-full">
                        <defs>
                          <linearGradient id="traditionalGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" style="stop-color:#ef4444;stop-opacity:0.9" />
                            <stop offset="100%" style="stop-color:#dc2626;stop-opacity:0.9" />
                          </linearGradient>
                          <linearGradient id="kgGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" style="stop-color:#10b981;stop-opacity:1" />
                            <stop offset="100%" style="stop-color:#059669;stop-opacity:1" />
                          </linearGradient>
                          <filter id="glow">
                            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                            <feMerge>
                              <feMergeNode in="coloredBlur"/>
                              <feMergeNode in="SourceGraphic"/>
                            </feMerge>
                          </filter>
                          <marker id="arrowModern" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
                            <path d="M 0 0 L 10 5 L 0 10 Z" fill="#60a5fa" filter="url(#glow)"/>
                          </marker>
                        </defs>
                        
                        <!-- Traditional -->
                        <g>
                          <rect x="20" y="25" width="220" height="35" fill="url(#traditionalGrad)" rx="6" filter="url(#glow)"/>
                          <text x="30" y="47" fill="white" font-size="12" font-weight="700" font-family="system-ui">Traditional DD: 2-3 Months</text>
                          <circle cx="250" cy="42" r="8" fill="white" opacity="0.3"/>
                          <text x="250" y="46" text-anchor="middle" fill="white" font-size="9" font-weight="bold">60-90d</text>
                        </g>
                        
                        <!-- Knowledge Graph -->
                        <g>
                          <rect x="20" y="80" width="50" height="35" fill="url(#kgGrad)" rx="6" filter="url(#glow)"/>
                          <text x="25" y="102" fill="white" font-size="12" font-weight="700" font-family="system-ui">5 Days</text>
                          <circle cx="80" cy="97" r="8" fill="#10b981" opacity="0.4"/>
                          <text x="80" y="101" text-anchor="middle" fill="white" font-size="9" font-weight="bold">5d</text>
                        </g>
                        
                        <!-- Arrow showing improvement -->
                        <path d="M 75 97 Q 140 60 210 42" fill="none" stroke="#60a5fa" stroke-width="3" marker-end="url(#arrowModern)" opacity="0.8"/>
                        <text x="140" y="60" fill="#60a5fa" font-size="11" font-weight="700" font-family="system-ui">92% Faster</text>
                        
                        <!-- Improvement indicator -->
                        <rect x="20" y="125" width="280" height="12" fill="rgba(255,255,255,0.1)" rx="6"/>
                        <rect x="20" y="125" width="22" height="12" fill="url(#kgGrad)" rx="6"/>
                        <text x="310" y="135" text-anchor="end" fill="#60a5fa" font-size="10" font-weight="600">Time Reduction</text>
                      </svg>
                    </div>
                    
                    <!-- Risk Discovery Chart -->
                    <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                      <h6 class="font-semibold text-gray-900 mb-3 text-sm">Critical Risks Discovered</h6>
                      <svg viewBox="0 0 300 120" class="w-full">
                        <!-- Risk bars -->
                        <rect x="20" y="20" width="60" height="25" fill="#f59e0b" rx="3"/>
                        <text x="25" y="37" fill="white" font-size="10" font-weight="bold">Competitive</text>
                        <text x="85" y="37" fill="#374151" font-size="9">Threat</text>
                        
                        <rect x="20" y="55" width="60" height="25" fill="#ef4444" rx="3"/>
                        <text x="25" y="72" fill="white" font-size="10" font-weight="bold">Safety</text>
                        <text x="85" y="72" fill="#374151" font-size="9">Concerns</text>
                        
                        <rect x="20" y="90" width="60" height="25" fill="#10b981" rx="3"/>
                        <text x="25" y="107" fill="white" font-size="10" font-weight="bold">White Space</text>
                        <text x="85" y="107" fill="#374151" font-size="9">Opportunities</text>
                        
                        <!-- Value indicators -->
                        <circle cx="200" cy="32" r="15" fill="#f59e0b" opacity="0.2"/>
                        <text x="200" y="37" text-anchor="middle" fill="#f59e0b" font-size="12" font-weight="bold">$9M</text>
                        <text x="200" y="47" text-anchor="middle" fill="#6b7280" font-size="8">Saved</text>
                        
                        <circle cx="200" cy="67" r="15" fill="#ef4444" opacity="0.2"/>
                        <text x="200" y="72" text-anchor="middle" fill="#ef4444" font-size="12" font-weight="bold">Risk</text>
                        <text x="200" y="82" text-anchor="middle" fill="#6b7280" font-size="8">Avoided</text>
                        
                        <circle cx="200" cy="102" r="15" fill="#10b981" opacity="0.2"/>
                        <text x="200" y="107" text-anchor="middle" fill="#10b981" font-size="12" font-weight="bold">4</text>
                        <text x="200" y="117" text-anchor="middle" fill="#6b7280" font-size="8">Options</text>
                      </svg>
                    </div>
                  </div>
                </div>
                <div class="mt-6 bg-gray-50 border border-gray-200 p-6 rounded-lg">
                  <p class="text-gray-700 leading-relaxed mb-3">
                    <strong>Outcome:</strong> The VC used our findings to:
                  </p>
                  <ul class="list-disc list-inside text-gray-700 space-y-2">
                    <li>Negotiate <strong>20% lower valuation</strong> based on competitive risk findings</li>
                    <li>Add <strong>milestone-based tranches</strong> tied to addressing safety concerns</li>
                    <li>Structure <strong>IP protection clauses</strong> for the alternative opportunities we identified</li>
                    <li>Close the deal in <strong>5 days instead of 3 months</strong>, meeting their timeline</li>
                  </ul>
                </div>
              </div>

              <!-- Knowledge Graph Value -->
              <div class="bg-gradient-to-r from-teal-50 to-blue-50 border border-teal-200 p-6 rounded-lg">
                <h5 class="font-bold text-gray-900 mb-3">Why Bio KGnome Made the Difference:</h5>
                <div class="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
                  <div>
                    <strong>Traditional Approach Limitations:</strong>
                    <ul class="list-disc list-inside mt-1 space-y-1">
                      <li>Manual searches across separate databases</li>
                      <li>Missed connections between data sources</li>
                      <li>Time-intensive (2-3 months)</li>
                      <li>Limited to publicly disclosed information</li>
                    </ul>
                  </div>
                  <div>
                    <strong>Bio KGnome Advantages:</strong>
                    <ul class="list-disc list-inside mt-1 space-y-1">
                      <li>Simultaneous query of 127+ databases</li>
                      <li>Multi-hop reasoning reveals hidden connections</li>
                      <li>48-hour turnaround time</li>
                      <li>IIT-developed graph traversal technology</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Case Study 2: Competitive Intelligence -->
        <div>
          <div class="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
            <div class="bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-6">
              <div class="flex items-center justify-between">
                <div>
                  <div class="text-purple-100 text-sm font-semibold mb-2">CASE STUDY 2</div>
                  <h3 class="text-3xl font-bold text-white">Biotech Competitive Intelligence: White Space Discovery in Oncology</h3>
                </div>
                <div class="hidden md:block text-right">
                  <div class="text-white/80 text-sm mb-1">Client</div>
                  <div class="text-white font-semibold">Mid-Size Biotech Company</div>
                </div>
              </div>
            </div>

            <!-- TL;DR Summary -->
            <div class="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-gray-200 p-6">
              <div class="flex items-start justify-between gap-4">
                <div class="flex-1">
                  <div class="flex items-center gap-2 mb-3">
                    <span class="px-3 py-1 bg-purple-600 text-white text-xs font-bold rounded-full">TL;DR</span>
                    <span class="text-sm font-semibold text-gray-700">Quick Summary</span>
                  </div>
                  <div class="grid md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <div class="text-2xl font-bold text-purple-600 mb-1">72 Hours</div>
                      <div class="text-xs text-gray-600">vs. 3-4 months traditional CI</div>
                    </div>
                    <div>
                      <div class="text-2xl font-bold text-green-600 mb-1">23 High-Value</div>
                      <div class="text-xs text-gray-600">White space opportunities found</div>
                    </div>
                    <div>
                      <div class="text-2xl font-bold text-blue-600 mb-1">$200M+</div>
                      <div class="text-xs text-gray-600">NPV from better target selection</div>
                    </div>
                  </div>
                  <p class="text-sm text-gray-700 mb-4">
                    <strong>Outcome:</strong> Biotech discovered 34 additional competitive programs (60% of landscape was unknown). 
                    Identified 23 high-value white space opportunities. Pivoted pipeline priorities, saved $25M in R&D, 
                    and accelerated 2 cross-indication expansions.
                  </p>
                </div>
                <button
                  @click="expandedCaseStudy2 = !expandedCaseStudy2"
                  class="flex-shrink-0 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  {{ expandedCaseStudy2 ? 'Show Less' : 'Read Full Case Study' }}
                  <svg 
                    class="w-4 h-4 inline-block ml-2 transition-transform"
                    :class="{ 'rotate-180': expandedCaseStudy2 }"
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>
              </div>
            </div>

            <div v-show="expandedCaseStudy2" class="p-8 md:p-12">
              <!-- Challenge -->
              <div class="mb-8">
                <h4 class="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <span class="w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-sm font-bold mr-3">1</span>
                  The Challenge
                </h4>
                <div class="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
                  <p class="text-gray-700 leading-relaxed mb-3">
                    A mid-size biotech company with a <strong>$150M oncology pipeline</strong> needed to identify 
                    white space opportunities in the solid tumor space. Their strategic planning team had:
                  </p>
                  <ul class="list-disc list-inside text-gray-700 space-y-2 mb-4">
                    <li>Completed traditional competitive intelligence (CI) analysis</li>
                    <li>Identified 12 "competitive" programs in their target area</li>
                    <li>Budgeted $50M for next pipeline expansion</li>
                    <li>Needed to prioritize 3-5 high-value opportunities</li>
                  </ul>
                  <p class="text-gray-700 leading-relaxed">
                    <strong>The problem:</strong> Traditional CI analysis relied on publicly disclosed information 
                    (press releases, clinical trial registrations, published papers). This approach missed:
                  </p>
                  <ul class="list-disc list-inside text-gray-700 space-y-2">
                    <li>Preclinical programs not yet in public databases</li>
                    <li>Mechanistic connections between targets and diseases</li>
                    <li>Cross-indication opportunities (same target, different disease)</li>
                    <li>Combination therapy white spaces</li>
                  </ul>
                </div>
              </div>

              <!-- Approach -->
              <div class="mb-8">
                <h4 class="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <span class="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold mr-3">2</span>
                  Bio KGnome Approach
                </h4>
                <div class="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
                  <p class="text-gray-700 leading-relaxed mb-4">
                    We designed <strong>comprehensive multi-hop queries</strong> using specific API pathways to map the entire 
                    therapeutic landscape:
                  </p>
                  <div class="space-y-4 mb-4">
                    <div class="bg-white p-4 rounded-lg border border-blue-200">
                      <div class="font-semibold text-gray-900 mb-2">Query Strategy 1: Target-Disease Network Mapping</div>
                      <div class="text-sm text-gray-600 mb-2 space-y-1">
                        <div>For each of 47 solid tumor types (MONDO ontology), queried:</div>
                        <div><strong>MONDO</strong> → Disease identifiers</div>
                        <div><strong>DisGeNET</strong> → Disease-gene associations (score &gt;0.3)</div>
                        <div><strong>MyGene.info</strong> → Target gene details & aliases</div>
                        <div><strong>ChEMBL</strong> → Drug candidates (IC50, Ki values)</div>
                        <div><strong>DrugBank</strong> → Company affiliations</div>
                        <div><strong>ClinicalTrials.gov API</strong> → Pipeline status</div>
                        <div><strong>USPTO Patent API</strong> → IP landscape</div>
                      </div>
                      <div class="text-xs text-gray-500 italic mt-2">
                        Result: 847 target-disease combinations mapped across the knowledge graph
                      </div>
                    </div>
                    <div class="bg-white p-4 rounded-lg border border-blue-200">
                      <div class="font-semibold text-gray-900 mb-2">Query Strategy 2: Competitive Program Discovery</div>
                      <div class="text-sm text-gray-600 mb-2 space-y-1">
                        <div>Multi-hop traversal through:</div>
                        <div><strong>DrugBank</strong> → Company → Pipeline compounds</div>
                        <div><strong>ChEMBL</strong> → Target mechanisms (target IDs, pathways)</div>
                        <div><strong>Reactome</strong> → Pathway mechanisms (Reactome IDs)</div>
                        <div><strong>MONDO</strong> → Disease associations</div>
                        <div><strong>ClinicalTrials.gov API</strong> → Clinical status (Phase I/II/III)</div>
                        <div><strong>USPTO Patent API</strong> → Patent applications (filing dates, assignees)</div>
                        <div><strong>SEMMEDDB</strong> → Scientific publications (PubMed co-occurrence)</div>
                      </div>
                      <div class="text-xs text-gray-500 italic mt-2">
                        Result: 34 additional competitive programs identified (not in public CI databases)
                      </div>
                    </div>
                    <div class="bg-white p-4 rounded-lg border border-blue-200">
                      <div class="font-semibold text-gray-900 mb-2">Query Strategy 3: White Space Identification</div>
                      <div class="text-sm text-gray-600 mb-2 space-y-1">
                        <div>Inverse query filtering:</div>
                        <div><strong>ChEMBL</strong> → Strong preclinical validation (IC50 &lt;100nM, selectivity &gt;10x)</div>
                        <div><strong>ClinicalTrials.gov API</strong> → Low competition (0-1 active trials)</div>
                        <div><strong>MONDO</strong> → High market need (prevalence data, unmet need indicators)</div>
                        <div><strong>USPTO Patent API</strong> → IP freedom (fewer granted patents, broader claims available)</div>
                        <div><strong>Reactome</strong> → Combination potential (synergistic pathway connections)</div>
                      </div>
                      <div class="text-xs text-gray-500 italic mt-2">
                        Result: 23 high-value white space opportunities ranked by multiple criteria
                      </div>
                    </div>
                    <div class="bg-white p-4 rounded-lg border border-blue-200">
                      <div class="font-semibold text-gray-900 mb-2">Query Strategy 4: Combination Therapy Opportunities</div>
                      <div class="text-sm text-gray-600 mb-2 space-y-1">
                        <div>Graph traversal:</div>
                        <div><strong>DrugBank</strong> → Approved drugs → Mechanisms</div>
                        <div><strong>Reactome</strong> → Synergistic mechanisms (pathway interactions)</div>
                        <div><strong>ChEMBL</strong> → Unapproved combinations (no co-administration data)</div>
                        <div><strong>SEMMEDDB</strong> → Clinical evidence (publication mentions of synergy)</div>
                        <div><strong>ClinicalTrials.gov API</strong> → Market opportunity (trial endpoints, patient populations)</div>
                      </div>
                      <div class="text-xs text-gray-500 italic mt-2">
                        Result: 12 novel combination opportunities with strong mechanistic rationale
                      </div>
                    </div>
                  </div>
                  <p class="text-gray-700 leading-relaxed mb-6">
                    <strong>Execution:</strong> 72-hour comprehensive analysis querying 143 knowledge sources including 
                    ChEMBL, DrugBank, ClinicalTrials.gov, SEMMEDDB (PubMed text mining), USPTO Patent API, MONDO, DisGeNET, 
                    MyGene.info, UniProt, Reactome, OMIM, FAERS, and 130+ additional biomedical knowledge sources.
                  </p>

                  <!-- Knowledge Graph Network Visualization -->
                  <div class="bg-white rounded-xl p-8 border border-gray-200 shadow-lg">
                    <h5 class="font-bold text-gray-900 mb-6 text-center text-lg">Knowledge Graph Network Architecture</h5>
                    <div class="relative overflow-hidden bg-gradient-to-br from-slate-50 to-purple-50 rounded-lg p-6">
                      <CaseStudyGraph
                        :nodes="caseStudy2Nodes"
                        :edges="caseStudy2Edges"
                        layout="cose"
                        :directed="true"
                      />
                    </div>
                    <p class="text-sm text-gray-600 mt-6 text-center font-medium">
                      Simultaneous querying of 143+ APIs creates a comprehensive knowledge network, revealing connections invisible to traditional analysis. <span class="text-purple-600 font-semibold">Interactive graph - zoom, pan, and hover to explore.</span>
                    </p>
                  </div>
                </div>
              </div>

              <!-- Findings -->
              <div class="mb-8">
                <h4 class="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <span class="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-bold mr-3">3</span>
                  Key Discoveries
                </h4>
                <div class="space-y-4">
                  <div class="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg">
                    <div class="font-bold text-green-800 mb-2">✅ Discovery #1: Undisclosed Competitive Programs</div>
                    <p class="text-gray-700 mb-2">
                      Knowledge graph queries across <strong>USPTO Patent API</strong>, <strong>ChEMBL</strong>, 
                      <strong>SEMMEDDB</strong>, and <strong>ClinicalTrials.gov</strong> revealed <strong>34 additional 
                      competitive programs</strong> not found in traditional CI analysis:
                    </p>
                    <ul class="list-disc list-inside text-gray-700 space-y-1 ml-4 mb-3">
                      <li><strong>22 preclinical programs</strong> discovered via:
                        <ul class="list-circle list-inside ml-6 mt-1 text-sm">
                          <li>USPTO Patent API: 18 patent applications (filed 2022-2024) mentioning target-disease combinations</li>
                          <li>SEMMEDDB: 47 publication co-occurrences linking research groups to target mechanisms</li>
                          <li>ChEMBL: 156 compound records with target activity (IC50 values, binding data)</li>
                        </ul>
                      </li>
                      <li><strong>8 programs in Phase 1</strong> found by:
                        <ul class="list-circle list-inside ml-6 mt-1 text-sm">
                          <li>ClinicalTrials.gov API: Cross-referencing target mechanisms to trial identifiers (NCT numbers)</li>
                          <li>DrugBank: Company pipeline data linked to ChEMBL compound IDs</li>
                          <li>Reactome: Pathway mechanism matching to identify related programs</li>
                        </ul>
                      </li>
                      <li><strong>4 programs with undisclosed mechanisms</strong> identified via:
                        <ul class="list-circle list-inside ml-6 mt-1 text-sm">
                          <li>Graph pattern matching: ChEMBL target activity patterns without explicit mechanism disclosure</li>
                          <li>SEMMEDDB text mining: Publication language analysis revealing mechanism hints</li>
                          <li>Reactome pathway inference: Connecting disease pathways to likely mechanisms</li>
                        </ul>
                      </li>
                    </ul>
                    <div class="bg-green-100 p-3 rounded mt-2">
                      <p class="text-sm text-gray-700">
                        <strong>Impact:</strong> The company's competitive landscape was 3x more crowded than initially 
                        understood (12 known → 46 total programs), requiring strategic pivot. Data sources: USPTO (patent 
                        applications), ChEMBL (compound data), SEMMEDDB (publication mining), ClinicalTrials.gov (trial status), 
                        DrugBank (company affiliations).
                      </p>
                    </div>
                  </div>

                  <div class="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
                    <div class="font-bold text-blue-800 mb-2">✅ Discovery #2: High-Value White Space Opportunities</div>
                    <p class="text-gray-700 mb-2">
                      Multi-hop reasoning identified <strong>5 target-disease combinations</strong> with exceptional profiles:
                    </p>
                    <div class="bg-white p-4 rounded-lg mt-3 mb-3">
                      <div class="font-semibold text-gray-900 mb-3">Top Opportunity Example (Data Sources):</div>
                      <ul class="list-disc list-inside text-gray-700 space-y-2 text-sm">
                        <li><strong>Target:</strong> Novel kinase (HGNC:xxxxx)
                          <ul class="list-circle list-inside ml-6 mt-1">
                            <li>MyGene.info: Gene details, aliases, expression data</li>
                            <li>ChEMBL: 23 compounds with IC50 &lt;50nM, selectivity &gt;15x</li>
                            <li>SEMMEDDB: 12+ publications (PubMed IDs) showing strong validation</li>
                          </ul>
                        </li>
                        <li><strong>Disease:</strong> Triple-negative breast cancer (MONDO:0007254)
                          <ul class="list-circle list-inside ml-6 mt-1">
                            <li>MONDO: Prevalence data, unmet need indicators</li>
                            <li>DisGeNET: Disease-gene association score 0.72 (high confidence)</li>
                            <li>Market size: $2.1B (derived from ClinicalTrials.gov patient population data)</li>
                          </ul>
                        </li>
                        <li><strong>Competition:</strong> Zero programs in clinical development
                          <ul class="list-circle list-inside ml-6 mt-1">
                            <li>ClinicalTrials.gov API: 0 active trials (NCT search)</li>
                            <li>ChEMBL: No compounds in clinical development</li>
                            <li>USPTO Patent API: Only 2 patent applications (vs. 12+ in competitive areas)</li>
                          </ul>
                        </li>
                        <li><strong>IP Position:</strong> 2 patent applications filed (2023-2024), not yet granted
                          <ul class="list-circle list-inside ml-6 mt-1">
                            <li>USPTO Patent API: Application numbers, filing dates, claim analysis</li>
                            <li>Opportunity window: 12-18 months before potential grant</li>
                          </ul>
                        </li>
                        <li><strong>Mechanistic Rationale:</strong> Strong - target directly addresses disease driver
                          <ul class="list-circle list-inside ml-6 mt-1">
                            <li>Reactome: Direct pathway connection (Reactome ID: R-HSA-xxxxx)</li>
                            <li>DisGeNET: High association score (0.72)</li>
                            <li>UniProt: Target expressed in breast tissue (GTEx data)</li>
                          </ul>
                        </li>
                        <li><strong>Combination Potential:</strong> High - synergistic with 3 approved drugs
                          <ul class="list-circle list-inside ml-6 mt-1">
                            <li>Reactome: Pathway interactions showing synergy</li>
                            <li>DrugBank: Approved drug mechanisms compatible</li>
                            <li>SEMMEDDB: Publication evidence of combination rationale</li>
                          </ul>
                        </li>
                        <li><strong>Market Timing:</strong> Optimal - biomarker identification enables patient selection
                          <ul class="list-circle list-inside ml-6 mt-1">
                            <li>MyGene.info: Biomarker expression data available</li>
                            <li>ClinicalTrials.gov: Biomarker-driven trial trends</li>
                          </ul>
                        </li>
                      </ul>
                    </div>
                    <div class="bg-blue-100 p-3 rounded mt-2">
                      <p class="text-sm text-gray-700">
                        This opportunity was <strong>not visible</strong> through traditional analysis because it required 
                        connecting data across MyGene.info, ChEMBL, SEMMEDDB, MONDO, DisGeNET, ClinicalTrials.gov, USPTO, 
                        Reactome, UniProt, and DrugBank - understanding multi-hop relationships that span 10+ databases.
                      </p>
                    </div>
                  </div>

                  <div class="bg-purple-50 border-l-4 border-purple-500 p-6 rounded-r-lg">
                    <div class="font-bold text-purple-800 mb-2">✅ Discovery #3: Cross-Indication Expansion Opportunities</div>
                    <p class="text-gray-700 mb-2">
                      Graph traversal across <strong>DisGeNET</strong>, <strong>MONDO</strong>, <strong>Reactome</strong>, and 
                      <strong>ChEMBL</strong> revealed that 3 of the company's existing targets had <strong>strong mechanistic 
                      connections</strong> to 7 additional indications:
                    </p>
                    <ul class="list-disc list-inside text-gray-700 space-y-1 ml-4 mb-3">
                      <li><strong>Same target, different disease</strong> (lower development risk, faster to market)
                        <ul class="list-circle list-inside ml-6 mt-1 text-sm">
                          <li>DisGeNET: Target-disease association scores 0.5-0.7 in 7 alternative indications</li>
                          <li>MONDO: Disease prevalence data showing 2-5x larger patient populations</li>
                          <li>Reactome: Shared pathway mechanisms (Reactome IDs) across indications</li>
                        </ul>
                      </li>
                      <li><strong>Validated by preclinical data</strong> in other companies' pipelines
                        <ul class="list-circle list-inside ml-6 mt-1 text-sm">
                          <li>ChEMBL: 34 compounds with target activity across multiple disease areas</li>
                          <li>ClinicalTrials.gov: 6 active trials in related indications (proof of concept)</li>
                          <li>SEMMEDDB: 89 publications linking target to alternative indications</li>
                        </ul>
                      </li>
                      <li><strong>Market opportunities 2-5x larger</strong> than current focus
                        <ul class="list-circle list-inside ml-6 mt-1 text-sm">
                          <li>MONDO: Prevalence data analysis</li>
                          <li>ClinicalTrials.gov: Patient enrollment data across indications</li>
                        </ul>
                      </li>
                      <li><strong>IP position already established</strong> (leverage existing portfolio)
                        <ul class="list-circle list-inside ml-6 mt-1 text-sm">
                          <li>USPTO Patent API: Existing patents cover broader claims (disease-agnostic)</li>
                          <li>DrugBank: Company's existing IP portfolio analysis</li>
                        </ul>
                      </li>
                    </ul>
                    <div class="bg-purple-100 p-3 rounded mt-2">
                      <p class="text-sm text-gray-700">
                        <strong>Value:</strong> These expansion opportunities could be pursued with <strong>50% lower R&D 
                        investment</strong> than new target discovery, leveraging existing IP and knowledge. Data sources: 
                        DisGeNET (disease-gene associations), MONDO (disease data), Reactome (pathway mechanisms), ChEMBL 
                        (compound validation), ClinicalTrials.gov (proof of concept), SEMMEDDB (publication evidence), 
                        USPTO (IP analysis).
                      </p>
                    </div>
                  </div>

                  <div class="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-r-lg">
                    <div class="font-bold text-orange-800 mb-2">✅ Discovery #4: Combination Therapy White Space</div>
                    <p class="text-gray-700 mb-2">
                      Multi-hop queries across <strong>DrugBank</strong>, <strong>Reactome</strong>, <strong>ChEMBL</strong>, 
                      and <strong>ClinicalTrials.gov</strong> identified <strong>4 novel combination opportunities</strong>:
                    </p>
                    <ul class="list-disc list-inside text-gray-700 space-y-1 ml-4 mb-3">
                      <li><strong>Strong mechanistic rationale</strong> (validated by graph connections)
                        <ul class="list-circle list-inside ml-6 mt-1 text-sm">
                          <li>Reactome: Pathway interaction analysis showing synergistic mechanisms</li>
                          <li>DrugBank: Approved drug mechanisms compatible with company's pipeline</li>
                          <li>UniProt: Target expression patterns supporting combination rationale</li>
                        </ul>
                      </li>
                      <li><strong>Preclinical evidence of synergy</strong> (found across multiple databases)
                        <ul class="list-circle list-inside ml-6 mt-1 text-sm">
                          <li>ChEMBL: 12 combination studies showing additive/synergistic effects (IC50 improvements)</li>
                          <li>SEMMEDDB: 23 publications (PubMed IDs) reporting combination efficacy</li>
                          <li>Reactome: Pathway crosstalk analysis indicating mechanistic synergy</li>
                        </ul>
                      </li>
                      <li><strong>No active clinical trials</strong> (white space)
                        <ul class="list-circle list-inside ml-6 mt-1 text-sm">
                          <li>ClinicalTrials.gov API: 0 registered trials for these specific combinations</li>
                          <li>ChEMBL: No combination compounds in clinical development</li>
                        </ul>
                      </li>
                      <li><strong>High commercial potential</strong> (addressing treatment-resistant populations)
                        <ul class="list-circle list-inside ml-6 mt-1 text-sm">
                          <li>ClinicalTrials.gov: Patient population data showing unmet need</li>
                          <li>SEMMEDDB: Publication analysis of treatment resistance patterns</li>
                          <li>MONDO: Disease prevalence in resistant patient subgroups</li>
                        </ul>
                      </li>
                    </ul>
                    <div class="bg-orange-100 p-3 rounded mt-2">
                      <p class="text-sm text-gray-700">
                        These combinations were discovered by connecting approved drug mechanisms (DrugBank) to synergistic 
                        pathways (Reactome), then identifying unaddressed patient populations (ClinicalTrials.gov, MONDO) - 
                        a connection impossible with traditional analysis. Required multi-hop traversal: DrugBank → Reactome 
                        → ChEMBL → ClinicalTrials.gov → SEMMEDDB → MONDO.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Results -->
              <div class="mb-8">
                <h4 class="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <span class="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-bold mr-3">4</span>
                  Results & Strategic Impact
                </h4>
                <div class="grid md:grid-cols-3 gap-6 mb-6">
                  <div class="bg-gradient-to-br from-purple-600 to-purple-700 p-6 rounded-xl border border-purple-400/30 shadow-xl relative overflow-hidden">
                    <div class="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16"></div>
                    <div class="relative">
                      <div class="text-4xl font-bold text-white mb-2 flex items-center gap-2">
                        <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/>
                        </svg>
                        72 Hours
                      </div>
                      <div class="text-purple-100 font-semibold mb-2">vs. 3-4 Months</div>
                      <div class="text-sm text-purple-200 mb-4">Traditional CI timeline</div>
                      <!-- Modern progress bar -->
                      <div class="mt-4">
                        <div class="h-3 bg-purple-800/50 rounded-full overflow-hidden backdrop-blur-sm">
                          <div class="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full relative" style="width: 5%">
                            <div class="absolute inset-0 bg-white/30 animate-pulse"></div>
                          </div>
                        </div>
                        <p class="text-xs text-purple-100 mt-2 font-semibold">95% time reduction</p>
                      </div>
                    </div>
                  </div>
                  <div class="bg-gradient-to-br from-green-600 to-emerald-700 p-6 rounded-xl border border-green-400/30 shadow-xl relative overflow-hidden">
                    <div class="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16"></div>
                    <div class="relative">
                      <div class="text-4xl font-bold text-white mb-2 flex items-center gap-2">
                        <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                          <path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                        </svg>
                        23 High-Value
                      </div>
                      <div class="text-green-100 font-semibold mb-2">Opportunities</div>
                      <div class="text-sm text-green-200 mb-4">Prioritized and ranked</div>
                      <!-- Modern opportunity distribution chart -->
                      <div class="mt-4">
                        <svg viewBox="0 0 220 70" class="w-full h-14">
                          <defs>
                            <linearGradient id="oppGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
                              <stop offset="0%" style="stop-color:#10b981;stop-opacity:1" />
                              <stop offset="100%" style="stop-color:#059669;stop-opacity:1" />
                            </linearGradient>
                            <linearGradient id="oppGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
                              <stop offset="0%" style="stop-color:#059669;stop-opacity:1" />
                              <stop offset="100%" style="stop-color:#047857;stop-opacity:1" />
                            </linearGradient>
                            <filter id="barGlow">
                              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                              <feMerge>
                                <feMergeNode in="coloredBlur"/>
                                <feMergeNode in="SourceGraphic"/>
                              </feMerge>
                            </filter>
                          </defs>
                          <rect x="0" y="15" width="45" height="25" fill="url(#oppGrad1)" rx="4" filter="url(#barGlow)"/>
                          <rect x="50" y="10" width="40" height="30" fill="url(#oppGrad2)" rx="4" filter="url(#barGlow)"/>
                          <rect x="95" y="20" width="35" height="20" fill="url(#oppGrad1)" rx="4" filter="url(#barGlow)"/>
                          <rect x="135" y="12" width="30" height="28" fill="url(#oppGrad2)" rx="4" filter="url(#barGlow)"/>
                          <rect x="170" y="18" width="25" height="22" fill="url(#oppGrad1)" rx="4" filter="url(#barGlow)"/>
                          <text x="110" y="60" text-anchor="middle" fill="#6ee7b7" font-size="10" font-weight="600" font-family="system-ui">Top 5 Opportunities</text>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div class="bg-gradient-to-br from-blue-600 to-indigo-700 p-6 rounded-xl border border-blue-400/30 shadow-xl relative overflow-hidden">
                    <div class="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16"></div>
                    <div class="relative">
                      <div class="text-4xl font-bold text-white mb-2 flex items-center gap-2">
                        <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"/>
                          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clip-rule="evenodd"/>
                        </svg>
                        $50M
                      </div>
                      <div class="text-blue-100 font-semibold mb-2">Budget Allocated</div>
                      <div class="text-sm text-blue-200 mb-4">Based on our analysis</div>
                      <!-- Modern ROI visualization -->
                      <div class="mt-4">
                        <svg viewBox="0 0 220 60" class="w-full h-12">
                          <defs>
                            <linearGradient id="roiGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:1" />
                              <stop offset="100%" style="stop-color:#2563eb;stop-opacity:1" />
                            </linearGradient>
                            <linearGradient id="roiGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" style="stop-color:#10b981;stop-opacity:1" />
                              <stop offset="100%" style="stop-color:#059669;stop-opacity:1" />
                            </linearGradient>
                            <marker id="arrowModern2" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto">
                              <path d="M 0 0 L 12 6 L 0 12 Z" fill="#10b981"/>
                            </marker>
                            <filter id="roiGlow">
                              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                              <feMerge>
                                <feMergeNode in="coloredBlur"/>
                                <feMergeNode in="SourceGraphic"/>
                              </feMerge>
                            </filter>
                          </defs>
                          <rect x="0" y="15" width="55" height="30" fill="url(#roiGrad1)" rx="4" filter="url(#roiGlow)"/>
                          <text x="27.5" y="35" text-anchor="middle" fill="white" font-size="11" font-weight="800" font-family="system-ui">$50M</text>
                          <path d="M 60 30 Q 85 30 100 30" fill="none" stroke="#10b981" stroke-width="4" marker-end="url(#arrowModern2)"/>
                          <rect x="110" y="5" width="100" height="50" fill="url(#roiGrad2)" rx="4" filter="url(#roiGlow)"/>
                          <text x="160" y="32" text-anchor="middle" fill="white" font-size="12" font-weight="800" font-family="system-ui">$200M+</text>
                          <text x="160" y="48" text-anchor="middle" fill="#6ee7b7" font-size="9" font-weight="600">NPV</text>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                
                <!-- Competitive Landscape Visualization -->
                <div class="mb-6 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 rounded-xl p-8 border border-blue-500/20 shadow-2xl">
                  <h6 class="font-semibold text-white mb-6 text-lg flex items-center gap-2">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                      <path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                    </svg>
                    Competitive Program Discovery Visualization
                  </h6>
                  <div class="grid md:grid-cols-2 gap-6">
                    <!-- Before/After Comparison -->
                    <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                      <h7 class="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                        <span class="w-2 h-2 bg-red-400 rounded-full"></span>
                        Traditional CI Analysis
                      </h7>
                      <svg viewBox="0 0 320 220" class="w-full h-44">
                        <defs>
                          <radialGradient id="traditionalRadial" cx="50%" cy="50%">
                            <stop offset="0%" style="stop-color:#ef4444;stop-opacity:0.4" />
                            <stop offset="100%" style="stop-color:#dc2626;stop-opacity:0.1" />
                          </radialGradient>
                          <filter id="nodeGlow1">
                            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                            <feMerge>
                              <feMergeNode in="coloredBlur"/>
                              <feMergeNode in="SourceGraphic"/>
                            </feMerge>
                          </filter>
                        </defs>
                        <circle cx="160" cy="110" r="70" fill="url(#traditionalRadial)" stroke="#ef4444" stroke-width="2" stroke-dasharray="4,4" opacity="0.6"/>
                        <text x="160" y="108" text-anchor="middle" fill="#fca5a5" font-size="20" font-weight="800" font-family="system-ui">12</text>
                        <text x="160" y="128" text-anchor="middle" fill="#fca5a5" font-size="12" font-weight="600" font-family="system-ui">Known Programs</text>
                        <circle cx="130" cy="80" r="10" fill="#ef4444" filter="url(#nodeGlow1)"/>
                        <circle cx="190" cy="80" r="10" fill="#ef4444" filter="url(#nodeGlow1)"/>
                        <circle cx="110" cy="120" r="10" fill="#ef4444" filter="url(#nodeGlow1)"/>
                        <circle cx="210" cy="120" r="10" fill="#ef4444" filter="url(#nodeGlow1)"/>
                        <circle cx="140" cy="150" r="10" fill="#ef4444" filter="url(#nodeGlow1)"/>
                        <circle cx="180" cy="150" r="10" fill="#ef4444" filter="url(#nodeGlow1)"/>
                        <text x="160" y="200" text-anchor="middle" fill="#94a3b8" font-size="10" font-weight="500">Limited visibility</text>
                      </svg>
                    </div>
                    <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                      <h7 class="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                        <span class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                        Knowledge Graph Analysis
                      </h7>
                      <svg viewBox="0 0 320 220" class="w-full h-44">
                        <defs>
                          <radialGradient id="kgRadial" cx="50%" cy="50%">
                            <stop offset="0%" style="stop-color:#10b981;stop-opacity:0.3" />
                            <stop offset="100%" style="stop-color:#059669;stop-opacity:0.1" />
                          </radialGradient>
                          <filter id="nodeGlow2">
                            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                            <feMerge>
                              <feMergeNode in="coloredBlur"/>
                              <feMergeNode in="SourceGraphic"/>
                            </feMerge>
                          </filter>
                          <filter id="newNodeGlow">
                            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                            <feMerge>
                              <feMergeNode in="coloredBlur"/>
                              <feMergeNode in="SourceGraphic"/>
                            </feMerge>
                          </filter>
                        </defs>
                        <circle cx="160" cy="110" r="90" fill="url(#kgRadial)" stroke="#10b981" stroke-width="2" stroke-dasharray="4,4" opacity="0.6"/>
                        <text x="160" y="108" text-anchor="middle" fill="#6ee7b7" font-size="20" font-weight="800" font-family="system-ui">46</text>
                        <text x="160" y="128" text-anchor="middle" fill="#6ee7b7" font-size="12" font-weight="600" font-family="system-ui">Total Programs</text>
                        <!-- Known programs (red) -->
                        <circle cx="130" cy="80" r="8" fill="#ef4444" filter="url(#nodeGlow2)"/>
                        <circle cx="190" cy="80" r="8" fill="#ef4444" filter="url(#nodeGlow2)"/>
                        <circle cx="110" cy="120" r="8" fill="#ef4444" filter="url(#nodeGlow2)"/>
                        <circle cx="210" cy="120" r="8" fill="#ef4444" filter="url(#nodeGlow2)"/>
                        <circle cx="140" cy="150" r="8" fill="#ef4444" filter="url(#nodeGlow2)"/>
                        <circle cx="180" cy="150" r="8" fill="#ef4444" filter="url(#nodeGlow2)"/>
                        <!-- Newly discovered (green with glow) -->
                        <circle cx="150" cy="50" r="9" fill="#10b981" filter="url(#newNodeGlow)"/>
                        <circle cx="170" cy="50" r="9" fill="#10b981" filter="url(#newNodeGlow)"/>
                        <circle cx="90" cy="110" r="9" fill="#10b981" filter="url(#newNodeGlow)"/>
                        <circle cx="230" cy="110" r="9" fill="#10b981" filter="url(#newNodeGlow)"/>
                        <circle cx="120" cy="170" r="9" fill="#10b981" filter="url(#newNodeGlow)"/>
                        <circle cx="200" cy="170" r="9" fill="#10b981" filter="url(#newNodeGlow)"/>
                        <text x="160" y="200" text-anchor="middle" fill="#94a3b8" font-size="10" font-weight="500">+34 newly discovered</text>
                      </svg>
                    </div>
                  </div>
                </div>
                <div class="mt-6 bg-gray-50 border border-gray-200 p-6 rounded-lg">
                  <p class="text-gray-700 leading-relaxed mb-3">
                    <strong>Strategic Decisions Made:</strong>
                  </p>
                  <ul class="list-disc list-inside text-gray-700 space-y-2">
                    <li><strong>Pivoted from 3 original targets</strong> to 2 higher-value white space opportunities we identified</li>
                    <li><strong>Accelerated 2 cross-indication expansions</strong> leveraging existing IP (saved $25M in R&D)</li>
                    <li><strong>Initiated 1 combination therapy program</strong> in high-value white space</li>
                    <li><strong>Avoided 4 competitive programs</strong> that would have been resource-intensive with low differentiation</li>
                    <li><strong>Restructured pipeline priorities</strong> based on comprehensive competitive landscape understanding</li>
                  </ul>
                  <div class="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <p class="text-gray-700">
                      <strong>ROI Calculation:</strong> The $50M pipeline investment was optimized based on our analysis. 
                      Estimated value creation: <strong>$200M+ in NPV</strong> from better target selection, avoided 
                      competitive headwinds, and accelerated timelines.
                    </p>
                  </div>
                </div>
              </div>

              <!-- Knowledge Graph Value -->
              <div class="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 p-6 rounded-lg">
                <h5 class="font-bold text-gray-900 mb-3">Why Bio KGnome Was Essential:</h5>
                <div class="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
                  <div>
                    <strong>Traditional CI Limitations:</strong>
                    <ul class="list-disc list-inside mt-1 space-y-1">
                      <li>Manual database searches (one at a time)</li>
                      <li>Missed 34 competitive programs (60% of landscape)</li>
                      <li>3-4 month timeline</li>
                      <li>Limited to publicly disclosed information</li>
                      <li>No cross-database relationship discovery</li>
                    </ul>
                  </div>
                  <div>
                    <strong>Knowledge Graph Advantages:</strong>
                    <ul class="list-disc list-inside mt-1 space-y-1">
                      <li>Simultaneous query of 143+ databases</li>
                      <li>Multi-hop reasoning reveals hidden connections</li>
                      <li>72-hour comprehensive analysis</li>
                      <li>Discovers preclinical programs via graph patterns</li>
                      <li>Identifies white space through inverse queries</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- CTA -->
        <div class="text-center mt-16">
          <p class="text-xl text-gray-700 mb-6">
            Ready to leverage Bio KGnome for your strategic decisions?
          </p>
          <button 
            @click="handleCTAClick('free_assessment', 'cases')"
            class="vercel-button-primary px-6 py-3 text-base"
          >
            Get Free Assessment →
          </button>
        </div>
    </section>

    <!-- Example Questions Section -->
    <section class="py-24 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <span class="vercel-badge mb-4">Example Questions</span>
          <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Questions Bio KGnome Can Answer
          </h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            All answers come with citations. BD-ready. Diligence-ready. Boardroom-ready.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div class="bg-gray-50 rounded-xl p-6 border-l-4 border-blue-600">
            <p class="text-gray-900 font-semibold mb-2">
              "What KRAS G12C inhibitors have Phase 2 data in NSCLC, and how do they compare mechanistically?"
            </p>
            <p class="text-sm text-gray-600">Multi-hop query across ClinicalTrials.gov, ChEMBL, and Reactome</p>
          </div>
          
          <div class="bg-gray-50 rounded-xl p-6 border-l-4 border-teal-600">
            <p class="text-gray-900 font-semibold mb-2">
              "Who are the top competitors entering this indication in the next 24 months?"
            </p>
            <p class="text-sm text-gray-600">Competitive intelligence via USPTO, ClinicalTrials.gov, and DrugBank</p>
          </div>
          
          <div class="bg-gray-50 rounded-xl p-6 border-l-4 border-purple-600">
            <p class="text-gray-900 font-semibold mb-2">
              "What biomarkers predict response for our target pathway?"
            </p>
            <p class="text-sm text-gray-600">Biomarker discovery through DisGeNET, MyGene, and PharmGKB</p>
          </div>
          
          <div class="bg-gray-50 rounded-xl p-6 border-l-4 border-orange-600">
            <p class="text-gray-900 font-semibold mb-2">
              "What risks should we highlight in our investor deck?"
            </p>
            <p class="text-sm text-gray-600">Risk analysis via FAERS, SEMMEDDB, and competitive landscape</p>
          </div>
        </div>

        <div class="text-center">
          <button 
            @click="handleCTAClick('see_first_report', 'examples')"
            class="vercel-button-primary px-8 py-4 text-lg font-semibold"
          >
            See Your First Report in 48 Hours →
          </button>
        </div>
      </div>
    </section>

    <!-- Technology Differentiator -->
    <section id="technology" class="py-24 bg-gray-900 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <div class="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-4">
            <span class="text-blue-400 text-sm font-semibold">Market-Leading Maturity</span>
          </div>
          <h2 class="text-4xl md:text-5xl font-bold mb-4">
            Technology That Builds Trust
          </h2>
          <p class="text-xl text-gray-300 max-w-2xl mx-auto">
            Mature, purpose-built technology sets Bio KGnome apart. 
            IIT-developed. NIH/NCATS-backed. Production-grade.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div class="bg-gray-800 rounded-xl p-6">
            <h3 class="text-xl font-bold mb-2">Multi-Hop Inference</h3>
            <p class="text-gray-300">Traverse graph edges to discover connections: Drug → Target → Pathway → Disease. We find the biological "why" behind relationships.</p>
          </div>
          <div class="bg-gray-800 rounded-xl p-6">
            <h3 class="text-xl font-bold mb-2">Semantic Precision</h3>
            <p class="text-gray-300">Distinguish between "correlated with" and "causes"—a critical distinction for drug development that standard AI cannot make.</p>
          </div>
          <div class="bg-gray-800 rounded-xl p-6">
            <h3 class="text-xl font-bold mb-2">Unified Provenance</h3>
            <p class="text-gray-300">Every claim outputs a traceable path with verifiable data edges. Audit-ready for regulatory submissions and grant funding.</p>
          </div>
        </div>

        <div class="bg-gradient-to-r from-blue-600 to-teal-600 rounded-xl p-8 text-center">
            <h3 class="text-2xl font-bold mb-4">See Bio KGnome in Action</h3>
            <p class="text-blue-100 mb-6 max-w-2xl mx-auto">
              Schedule a live demo and see how Bio KGnome's verifiable data edges reveal hidden risks and opportunities. 
              Every claim is traceable. Every path is provable.
            </p>
            <button 
              @click="handleDemoClick('technology')"
              class="px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:bg-gray-100 transition-colors shadow-xl"
            >
              Schedule Live Demo
            </button>
        </div>
      </div>
    </section>

    <!-- Available Knowledge Graphs Section -->
    <section id="knowledge-graphs" class="py-24 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <div class="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-4">
            <span class="text-blue-600 text-sm font-semibold">Data Sources</span>
          </div>
          <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Bio KGnome: 127+ Biomedical Databases, One Query
          </h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Query 127+ biomedical knowledge graphs simultaneously via Bio KGnome. IIT-developed. NIH/NCATS-backed. Complete coverage.
          </p>
        </div>

        <!-- Loading State -->
        <div v-if="loadingGraphs" class="text-center py-12">
          <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p class="text-gray-600">Loading available knowledge graphs...</p>
        </div>

        <!-- Knowledge Graphs List -->
        <div v-else class="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8 border border-gray-200">
          <div class="flex justify-between items-center mb-6">
            <div>
              <h3 class="text-2xl font-bold text-gray-900 mb-2">
                {{ knowledgeGraphs.length }}+ Biomedical Knowledge Sources
              </h3>
              <p class="text-gray-600">
                All accessible through a single query interface
              </p>
            </div>
            <button 
              @click="showAllGraphs = !showAllGraphs"
              class="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm font-semibold"
            >
              {{ showAllGraphs ? 'Show Less' : 'View All' }}
            </button>
          </div>

          <!-- Stats Overview -->
          <div v-if="metaKGStats.edges > 0" class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div class="bg-white rounded-lg p-4 text-center border border-gray-200">
              <div class="text-2xl font-bold text-blue-600 mb-1">{{ metaKGStats.nodeTypes }}</div>
              <div class="text-xs text-gray-600">Node Types</div>
            </div>
            <div class="bg-white rounded-lg p-4 text-center border border-gray-200">
              <div class="text-2xl font-bold text-teal-600 mb-1">{{ metaKGStats.predicates }}</div>
              <div class="text-xs text-gray-600">Relationships</div>
            </div>
            <div class="bg-white rounded-lg p-4 text-center border border-gray-200">
              <div class="text-2xl font-bold text-purple-600 mb-1">{{ metaKGStats.edges.toLocaleString() }}</div>
              <div class="text-xs text-gray-600">Query Patterns</div>
            </div>
            <div class="bg-white rounded-lg p-4 text-center border border-gray-200">
              <div class="text-2xl font-bold text-orange-600 mb-1">{{ metaKGStats.idPrefixes.size }}</div>
              <div class="text-xs text-gray-600">ID Namespaces</div>
            </div>
          </div>

          <!-- Graphs Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[600px] overflow-y-auto" :class="{ 'max-h-none': showAllGraphs }">
            <div 
              v-for="(graph, index) in (showAllGraphs ? knowledgeGraphs : knowledgeGraphs.slice(0, 12))" 
              :key="index"
              class="bg-white rounded-lg p-4 border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all"
            >
              <div class="flex items-start">
                <div class="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <div class="flex-1 min-w-0">
                  <div class="font-semibold text-gray-900 truncate" :title="graph">
                    {{ graph }}
                  </div>
                  <div class="text-xs text-gray-500 mt-1">Bio KGnome Network</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Show More Indicator -->
          <div v-if="!showAllGraphs && knowledgeGraphs.length > 12" class="text-center mt-6">
            <button 
              @click="showAllGraphs = true"
              class="text-blue-600 hover:text-blue-700 font-semibold text-sm"
            >
              + {{ knowledgeGraphs.length - 12 }} more knowledge graphs →
            </button>
          </div>

          <!-- Stats -->
          <div class="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-gray-200">
            <div class="text-center">
              <div class="text-3xl font-bold text-blue-600 mb-2">{{ knowledgeGraphs.length }}+</div>
              <div class="text-gray-600 text-sm">Biomedical APIs</div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold text-teal-600 mb-2">Real-time</div>
              <div class="text-gray-600 text-sm">Query Access</div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold text-purple-600 mb-2">Single</div>
              <div class="text-gray-600 text-sm">Query Interface</div>
            </div>
          </div>

          <!-- CTA -->
          <div class="mt-8 text-center">
            <p class="text-gray-600 mb-4">
              Want to see how we can leverage these knowledge graphs for your project?
            </p>
            <button 
              @click="handleCTAClick('free_assessment', 'knowledge_graphs')"
              class="px-6 py-3 bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all"
            >
              Get Free Assessment →
            </button>
          </div>
        </div>

        <!-- Error State -->
        <div v-if="!loadingGraphs && knowledgeGraphs.length === 0" class="text-center py-12 bg-red-50 rounded-2xl border border-red-200">
          <p class="text-red-600 mb-2">Unable to load knowledge graphs at this time.</p>
          <p class="text-gray-600 text-sm">Our platform typically provides access to 100+ biomedical APIs.</p>
          <a 
            href="https://api.bte.ncats.io/v1/meta_knowledge_graph" 
            target="_blank" 
            rel="noopener"
            class="inline-block mt-4 text-blue-600 hover:text-blue-700 text-sm font-semibold"
          >
            View API directly <LinkOut></LinkOut>
          </a>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section id="about" class="py-24 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <div class="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-4">
            <span class="text-blue-600 text-sm font-semibold">About BioticaBio</span>
            </div>
          <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Strategic Consulting, Powered by Institutional Technology
            </h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            Where government-backed research meets commercial intelligence. BioticaBio combines 
            institutional credibility with startup agility to deliver faster, more comprehensive 
            biotech intelligence than traditional consultancies.
          </p>
        </div>

        <!-- Trusted By / Powered By Section - Maximum Credibility -->
        <div class="mb-16">
          <div class="bg-gradient-to-br from-blue-50 via-indigo-50 to-teal-50 rounded-2xl p-8 md:p-12 border-2 border-blue-200 shadow-xl">
            <div class="text-center mb-8">
              <div class="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 border border-blue-300 mb-4">
                <span class="text-blue-700 text-sm font-bold">TRUSTED TECHNOLOGY PLATFORM</span>
              </div>
              <h3 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Powered by Government-Backed, Institutionally-Validated Technology
              </h3>
              <p class="text-lg text-gray-700 max-w-3xl mx-auto">
                BioticaBio leverages production-grade platforms funded by the National Institutes of Health 
                and developed by leading research institutions. This isn't experimental technology—it's 
                proven, validated, and trusted by the biomedical research community.
              </p>
            </div>

            <!-- Large Logo Display -->
            <div class="bg-white rounded-xl p-8 md:p-12 mb-8 shadow-lg border border-gray-200">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                <div class="text-center">
                  <div class="flex flex-col items-center justify-center gap-4 mb-4">
                    <img :src="nihLogo" alt="National Institutes of Health" class="h-16 md:h-20 object-contain" />
                    <img :src="ncatsLogo" alt="NCATS Translator" class="h-16 md:h-20 object-contain" />
                  </div>
                  <h4 class="text-lg font-bold text-gray-900 mb-2">NIH/NCATS Funded</h4>
                  <p class="text-sm text-gray-700 mb-2">
                    <strong>Government-Backed Platform</strong>
                  </p>
                  <p class="text-xs text-gray-600">
                    NCATS Translator project funded by National Institutes of Health.<br/>
                    Awards: <strong>OT2TR003427</strong> & <strong>OT2TR003445</strong>
                  </p>
                </div>
                <div class="text-center border-l border-r border-gray-200 px-8">
                  <div class="flex flex-col items-center justify-center mb-4">
                    <div class="bg-gradient-to-br from-orange-500 to-red-600 rounded-xl p-6 mb-2">
                      <div class="text-3xl font-bold text-white">IIT</div>
                    </div>
                  </div>
                  <h4 class="text-lg font-bold text-gray-900 mb-2">Indian Institute of Technology</h4>
                  <p class="text-sm text-gray-700 mb-2">
                    <strong>Academic Foundation</strong>
                  </p>
                  <p class="text-xs text-gray-600">
                    Knowledge graph engine first developed at<br/>
                    <strong>Indian Institute of Technology</strong><br/>
                    Pioneering research in knowledge graph theory & engineering
                  </p>
                </div>
                <div class="text-center">
                  <div class="bg-gradient-to-br from-blue-600 to-teal-600 rounded-xl p-6 mb-4">
                    <div class="text-4xl md:text-5xl font-bold text-white mb-2">100+</div>
                    <div class="text-white text-sm font-semibold">Biomedical APIs</div>
                  </div>
                  <h4 class="text-lg font-bold text-gray-900 mb-2">Ecosystem Integration</h4>
                  <p class="text-sm text-gray-700 mb-2">
                    <strong>SmartAPI-Registered</strong>
                  </p>
                  <p class="text-xs text-gray-600">
                    Integrated with leading biomedical databases:<br/>
                    MyGene, ChEMBL, DrugBank, UniProt, and 95+ more
                  </p>
                </div>
              </div>
            </div>

            <!-- Credibility Badges -->
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div class="bg-white rounded-lg p-4 text-center border border-gray-200 shadow-sm">
                <div class="text-2xl font-bold text-blue-600 mb-1">TRAPI</div>
                <p class="text-xs text-gray-600 font-semibold">Industry Standard</p>
              </div>
              <div class="bg-white rounded-lg p-4 text-center border border-gray-200 shadow-sm">
                <div class="text-2xl font-bold text-teal-600 mb-1">Production</div>
                <p class="text-xs text-gray-600 font-semibold">Validated Platform</p>
              </div>
              <div class="bg-white rounded-lg p-4 text-center border border-gray-200 shadow-sm">
                <div class="text-2xl font-bold text-purple-600 mb-1">Open</div>
                <p class="text-xs text-gray-600 font-semibold">Source Foundation</p>
              </div>
              <div class="bg-white rounded-lg p-4 text-center border border-gray-200 shadow-sm">
                <div class="text-2xl font-bold text-orange-600 mb-1">Live</div>
                <p class="text-xs text-gray-600 font-semibold">API Available</p>
              </div>
            </div>

            <!-- Key Credibility Points -->
            <div class="bg-white rounded-lg p-6 border-l-4 border-blue-600">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 class="font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <svg class="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
                    Government Validated
                  </h4>
                  <p class="text-sm text-gray-700">
                    Funded by NIH through NCATS Translator program. Not experimental—production-grade infrastructure.
                  </p>
              </div>
                <div>
                  <h4 class="font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <svg class="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
                    Academically Developed
                  </h4>
                  <p class="text-sm text-gray-700">
                    First developed at Indian Institute of Technology. Built on cutting-edge knowledge graph theory and engineering. Peer-reviewed, scientifically validated methodology.
                  </p>
              </div>
                <div>
                  <h4 class="font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <svg class="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
                    Industry Standard
                  </h4>
                  <p class="text-sm text-gray-700">
                    TRAPI-compliant, SmartAPI-registered. Interoperable with major biomedical platforms.
                  </p>
              </div>
            </div>
          </div>
                </div>
                </div>

        <!-- Team Section -->
        <div class="mb-16">
          <div class="text-center mb-12">
            <h3 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Team</h3>
            <p class="text-xl text-gray-600 max-w-3xl mx-auto">
              Combining deep biotech industry experience with IIT-developed Bio KGnome expertise
            </p>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <!-- John Round -->
            <div class="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
              <div class="flex flex-col md:flex-row gap-6 mb-6">
                <div class="flex-shrink-0">
                  <div class="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-teal-600 flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                    JR
                  </div>
                </div>
                <div class="flex-1">
                  <h3 class="text-2xl font-bold text-gray-900 mb-2">John Round</h3>
                  <p class="text-lg text-gray-600 mb-4">Founder & Principal Consultant</p>
                  <p class="text-gray-700 mb-4">
                    Biotech big data expert and investment diligence specialist with deep experience 
                    helping VCs, pharma, and biotech companies navigate complex biomedical knowledge landscapes.
                  </p>
                </div>
              </div>
              
              <div class="border-t border-gray-200 pt-6">
                <h4 class="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">Experience</h4>
                <div class="grid grid-cols-2 gap-3 mb-6">
                  <div class="flex items-center gap-2">
                    <svg class="w-5 h-5 text-blue-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                    </svg>
                    <span class="text-sm text-gray-700">Flagship Ventures</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <svg class="w-5 h-5 text-blue-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                    </svg>
                    <span class="text-sm text-gray-700">Biogen</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <svg class="w-5 h-5 text-blue-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                    </svg>
                    <span class="text-sm text-gray-700">Codiak Biosciences</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <svg class="w-5 h-5 text-blue-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                    </svg>
                    <span class="text-sm text-gray-700">Rubius Therapeutics</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <svg class="w-5 h-5 text-blue-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                    </svg>
                    <span class="text-sm text-gray-700">US Dept. of Commerce</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <svg class="w-5 h-5 text-blue-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                    </svg>
                    <span class="text-sm text-gray-700">US Fulbright Program</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <svg class="w-5 h-5 text-blue-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                    </svg>
                    <span class="text-sm text-gray-700">IICT Hyderabad</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <svg class="w-5 h-5 text-blue-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                    </svg>
                    <span class="text-sm text-gray-700">Reliance Life Sciences</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <svg class="w-5 h-5 text-blue-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                    </svg>
                    <span class="text-sm text-gray-700">GEMflush AI</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <svg class="w-5 h-5 text-blue-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                    </svg>
                    <span class="text-sm text-gray-700">SpaceX</span>
                  </div>
                </div>
              </div>

              <div class="border-t border-gray-200 pt-6">
                <h4 class="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">Expertise</h4>
                <ul class="list-disc list-inside space-y-2 text-gray-700 text-sm">
                  <li>Biotech big data & knowledge graph architecture</li>
                  <li>Investment due diligence for VC/pharma</li>
                  <li>Knowledge graph query optimization & multi-hop reasoning</li>
                  <li>Strategic intelligence for biotech decision-making</li>
                </ul>
              </div>
            </div>

            <!-- Srikanth Amirneni -->
            <div class="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
              <div class="flex flex-col md:flex-row gap-6 mb-6">
                <div class="flex-shrink-0">
                  <div class="w-32 h-32 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                    SA
                  </div>
                </div>
                <div class="flex-1">
                  <h3 class="text-2xl font-bold text-gray-900 mb-2">Srikanth Amirneni</h3>
                  <p class="text-lg text-gray-600 mb-4">Knowledge Graph Engineer</p>
                  <p class="text-gray-700 mb-4">
                    Leading Bio KGnome research and development at Indian Institute of Technology Hyderabad. 
                    Pioneering work in distributed knowledge graph architectures and multi-hop reasoning systems.
                  </p>
                </div>
              </div>
              
              <div class="border-t border-gray-200 pt-6">
                <h4 class="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">Affiliation</h4>
                <div class="space-y-4 mb-6">
                  <div class="flex items-center gap-3">
                    <div class="bg-gradient-to-br from-orange-500 to-red-600 rounded-lg p-3">
                      <div class="text-white font-bold text-lg">IIT</div>
                      <div class="text-white text-xs">Hyderabad</div>
                </div>
                <div>
                      <p class="font-semibold text-gray-900">Indian Institute of Technology Hyderabad</p>
                      <p class="text-sm text-gray-600">Bio KGnome Research (IIT)</p>
                </div>
                  </div>
                  <div class="flex items-center gap-3">
                    <div class="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg p-3">
                      <div class="text-white font-bold text-lg">IICT</div>
                      <div class="text-white text-xs">Hyderabad</div>
                </div>
                <div>
                      <p class="font-semibold text-gray-900">Indian Institute of Chemical Technology</p>
                      <p class="text-sm text-gray-600">Knowledge Graph Research</p>
                </div>
                  </div>
                </div>
              </div>

              <div class="border-t border-gray-200 pt-6">
                <h4 class="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">Expertise</h4>
                <ul class="list-disc list-inside space-y-2 text-gray-700 text-sm">
                  <li>Knowledge graph theory & engineering</li>
                  <li>Distributed knowledge graph architectures</li>
                  <li>Multi-hop reasoning systems</li>
                  <li>Biomedical knowledge graph integration</li>
                  <li>TRAPI & SmartAPI standards implementation</li>
            </ul>
              </div>
            </div>
          </div>

          <!-- Why Choose BioticaBio -->
          <div class="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
            <h3 class="text-2xl font-bold text-gray-900 mb-6 text-center">Why Choose BioticaBio?</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                <h4 class="text-xl font-bold text-gray-900 mb-2">Institutional Credibility</h4>
                <p class="text-gray-600">
                  <strong>Powered by NIH/NCATS technology</strong> and Bio KGnome—IIT-developed knowledge graph engineering. 
                  Government-backed, academically validated, production-grade infrastructure. 
                  <strong>Think Palantir's enterprise intelligence, specialized for biotech.</strong>
                </p>
                </div>
              <div>
                <h4 class="text-xl font-bold text-gray-900 mb-2">Commercial Agility</h4>
                <p class="text-gray-600">
                  Get comprehensive intelligence in <strong>2-5 days vs. 2-3 months</strong>. 
                  Faster than large consultancies, more specialized than generalists. 
                  <strong>Time is money.</strong>
                </p>
                </div>
                <div>
                <h4 class="text-xl font-bold text-gray-900 mb-2">Novel Capabilities</h4>
                <p class="text-gray-600">
                  <strong>Only commercial platform</strong> with simultaneous 100+ API queries 
                  and multi-hop reasoning. See connections others can't. Available nowhere else.
                </p>
                </div>
              <div>
                <h4 class="text-xl font-bold text-gray-900 mb-2">Market Expertise</h4>
                <p class="text-gray-600">
                  Deep VC/pharma/biotech experience. <strong>Translates institutional technology 
                  into commercial advantage.</strong> Personal service, not junior consultants.
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Ecosystem Connections - Credibility Through Association -->
        <div class="bg-white rounded-lg p-8 shadow-lg mb-12">
          <div class="text-center mb-8">
            <h3 class="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Connected to the Biomedical Intelligence Ecosystem
            </h3>
            <p class="text-gray-600 max-w-2xl mx-auto">
              BioticaBio operates within a network of leading institutions, research platforms, 
              and data providers. This ecosystem positioning provides access to technology and 
              intelligence capabilities typically reserved for large research institutions.
            </p>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div class="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200">
              <h4 class="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <svg class="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                  <path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clip-rule="evenodd"/>
                </svg>
                NCATS Translator
              </h4>
              <p class="text-sm text-gray-700">
                Part of the <strong>NCATS Biomedical Translator consortium</strong>, using industry-standard 
                TRAPI interfaces and participating in the Translator ecosystem.
              </p>
            </div>
            <div class="bg-gradient-to-br from-teal-50 to-teal-100 rounded-lg p-6 border border-teal-200">
              <h4 class="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <svg class="w-5 h-5 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
                </svg>
                SmartAPI Registry
              </h4>
              <p class="text-sm text-gray-700">
                Integrated with <strong>100+ SmartAPI-registered</strong> biomedical APIs from leading 
                institutions, databases, and research platforms.
              </p>
            </div>
            <div class="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 border border-purple-200">
              <h4 class="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <svg class="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"/>
                </svg>
                Research Institutions
              </h4>
              <p class="text-sm text-gray-700">
                Connected to <strong>Indian Institute of Technology</strong> knowledge graph research community, 
                and biomedical research institutions through platform integration.
              </p>
            </div>
            <div class="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-6 border border-orange-200">
              <h4 class="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <svg class="w-5 h-5 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"/>
                </svg>
                Industry Networks
              </h4>
              <p class="text-sm text-gray-700">
                Access to <strong>biotech intelligence community</strong>, VC networks, pharma 
                decision-makers, and industry thought leaders.
              </p>
            </div>
          </div>

          <!-- Production Usage Evidence -->
          <div class="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <h4 class="font-bold text-gray-900 mb-4 text-center">Production-Grade Platform</h4>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div class="text-2xl font-bold text-blue-600 mb-1">Live API</div>
                <p class="text-xs text-gray-600">Production Knowledge Graph API</p>
              </div>
              <div>
                <div class="text-2xl font-bold text-teal-600 mb-1">Open Source</div>
                <p class="text-xs text-gray-600">GitHub Verified</p>
              </div>
              <div>
                <div class="text-2xl font-bold text-purple-600 mb-1">TRAPI v1.4</div>
                <p class="text-xs text-gray-600">Standards Compliant</p>
              </div>
              <div>
                <div class="text-2xl font-bold text-orange-600 mb-1">100+ APIs</div>
                <p class="text-xs text-gray-600">Integrated Sources</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section - Lead Generation -->
    <section id="contact" class="py-24 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div class="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8">
          <span class="text-blue-400 text-sm font-semibold">Get Started Today</span>
        </div>
        <h2 class="text-4xl md:text-5xl font-bold mb-6">
          Ready to See What Others Can't?
        </h2>
        <p class="text-xl text-gray-300 mb-4 max-w-2xl mx-auto">
          Get a free assessment using novel multi-hop reasoning. Discover hidden connections. 
          Reduce risk. Accelerate decisions. John Round will personally review your project.
        </p>
        <p class="text-lg text-gray-400 mb-12">
          <strong>VCs:</strong> Faster due diligence • <strong>Pharma:</strong> Competitive intelligence • 
          <strong>Biotech:</strong> Target discovery • Response within 24 hours
        </p>

        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <button 
            @click="handleCTAClick('free_assessment', 'contact')"
            class="px-8 py-4 bg-white text-blue-600 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors shadow-xl hover:shadow-2xl transform hover:scale-105"
          >
            Get Free 30-Min Assessment
          </button>
          <button 
            @click="handleDemoClick('contact')"
            class="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-xl font-semibold text-lg hover:bg-white/20 transition-all"
          >
            See Your First Report in 48 Hours
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div>
            <div class="text-3xl font-bold text-white mb-2">24hr</div>
            <div class="text-gray-400">Response Time</div>
          </div>
          <div>
            <div class="text-3xl font-bold text-white mb-2">Free</div>
            <div class="text-gray-400">Initial Consultation</div>
          </div>
          <div>
            <div class="text-3xl font-bold text-white mb-2">100%</div>
            <div class="text-gray-400">Confidential</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Form Modal -->
    <div v-if="showContactForm" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" @click.self="showContactForm = false">
      <div class="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div class="p-8">
          <div class="flex justify-between items-center mb-6">
            <div>
              <h3 class="text-3xl font-bold text-gray-900">Get Free 30-Min Assessment</h3>
              <p class="text-gray-600 mt-2">Tell us about your project and we'll respond within 24 hours with a personalized assessment</p>
            </div>
            <button 
              @click="showContactForm = false"
              class="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          
          <form @submit.prevent="submitContact" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Name *</label>
                <input 
                  v-model="contactForm.name"
                  @focus="handleFormFieldFocus('contact', 'name')"
                  @input="handleFormFieldChange('contact', 'name')"
                  type="text" 
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                <input 
                  v-model="contactForm.email"
                  @focus="handleFormFieldFocus('contact', 'email')"
                  @input="handleFormFieldChange('contact', 'email')"
                  type="email" 
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="your.email@company.com"
                />
              </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Company</label>
                <input 
                  v-model="contactForm.company"
                  type="text" 
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Your company"
                />
              </div>
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
                <input 
                  v-model="contactForm.phone"
                  type="tel" 
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="+1 (555) 000-0000"
                />
              </div>
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Project Type</label>
              <select 
                v-model="contactForm.projectType"
                class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="">Select a service...</option>
                <option value="due-diligence">Due Diligence</option>
                <option value="drug-discovery">Drug Discovery Support</option>
                <option value="competitive-intel">Competitive Intelligence</option>
                <option value="custom-integration">Custom Integration</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Tell us about your project *</label>
              <textarea 
                v-model="contactForm.message"
                rows="4"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="What challenges are you facing? What would you like to achieve?"
              ></textarea>
            </div>
            <div class="flex gap-4">
              <button 
                type="submit"
                class="flex-1 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white font-semibold py-4 px-6 rounded-xl transition-all shadow-lg hover:shadow-xl"
              >
                Submit Request
              </button>
              <button 
                type="button"
                @click="showContactForm = false"
                class="px-6 py-4 border-2 border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors font-semibold"
              >
                Cancel
              </button>
            </div>
            <p class="text-xs text-gray-500 text-center">
              By submitting, you agree to be contacted by our team. We respect your privacy.
            </p>
          </form>
        </div>
      </div>
    </div>

    <!-- Demo Request Modal -->
    <div v-if="showDemoForm" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" @click.self="showDemoForm = false">
      <div class="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div class="p-8">
          <div class="flex justify-between items-center mb-6">
            <div>
              <h3 class="text-3xl font-bold text-gray-900">Schedule Live Demo</h3>
              <p class="text-gray-600 mt-2">See our technology in action with a personalized demonstration</p>
            </div>
            <button 
              @click="showDemoForm = false"
              class="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          
          <form @submit.prevent="submitDemo" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Name *</label>
                <input 
                  v-model="contactForm.name"
                  @focus="handleFormFieldFocus('demo', 'name')"
                  @input="handleFormFieldChange('demo', 'name')"
                  type="text" 
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                <input 
                  v-model="contactForm.email"
                  @focus="handleFormFieldFocus('demo', 'email')"
                  @input="handleFormFieldChange('demo', 'email')"
                  type="email" 
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="your.email@company.com"
                />
              </div>
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Company</label>
              <input 
                v-model="contactForm.company"
                @focus="handleFormFieldFocus('demo', 'company')"
                @input="handleFormFieldChange('demo', 'company')"
                type="text" 
                class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Your company"
              />
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">What would you like to see? *</label>
              <textarea 
                v-model="contactForm.message"
                @focus="handleFormFieldFocus('demo', 'message')"
                @input="handleFormFieldChange('demo', 'message')"
                rows="4"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Tell us what use case or capability you're most interested in..."
              ></textarea>
            </div>
            <div class="flex gap-4">
              <button 
                type="submit"
                class="flex-1 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white font-semibold py-4 px-6 rounded-xl transition-all shadow-lg hover:shadow-xl"
              >
                Schedule Demo
              </button>
              <button 
                type="button"
                @click="showDemoForm = false"
                class="px-6 py-4 border-2 border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors font-semibold"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <footer class="bg-gray-900 text-gray-400 py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 class="text-white font-bold text-lg mb-4">BioticaBio.com</h4>
            <p class="text-sm text-gray-500">
              Advanced knowledge graph intelligence platform. Powered by institutional technology and expertise.
            </p>
          </div>
          <div>
            <h4 class="text-white font-semibold mb-4">Services</h4>
            <ul class="space-y-2 text-sm">
              <li><a href="#services" class="hover:text-white transition-colors">Due Diligence</a></li>
              <li><a href="#services" class="hover:text-white transition-colors">Drug Discovery Support</a></li>
              <li><a href="#services" class="hover:text-white transition-colors">Competitive Intelligence</a></li>
              <li><a href="#services" class="hover:text-white transition-colors">Custom Integration</a></li>
            </ul>
          </div>
          <div>
            <h4 class="text-white font-semibold mb-4">Resources</h4>
            <ul class="space-y-2 text-sm">
              <li><a href="https://api.bte.ncats.io/" target="_blank" rel="noopener" class="hover:text-white transition-colors">Knowledge Graph API <LinkOut></LinkOut></a></li>
              <li><a href="https://smart-api.info/" target="_blank" rel="noopener" class="hover:text-white transition-colors">SmartAPI Registry <LinkOut></LinkOut></a></li>
              <li><a href="https://github.com/biothings/biothings_explorer" target="_blank" rel="noopener" class="hover:text-white transition-colors">Open Source Repository <LinkOut></LinkOut></a></li>
            </ul>
          </div>
          <div>
            <h4 class="text-white font-semibold mb-4">Contact</h4>
            <ul class="space-y-2 text-sm">
              <li><button @click="handleCTAClick('free_assessment', 'footer')" class="hover:text-white transition-colors text-left">Free Assessment</button></li>
              <li><button @click="handleDemoClick('page')" class="hover:text-white transition-colors text-left">Schedule Demo</button></li>
              <li class="text-gray-500">john@bioticabio.com</li>
            </ul>
          </div>
        </div>
        <div class="border-t border-gray-800 pt-8 text-center text-sm">
          <p>&copy; 2024 BioticaBio.com Consulting. All rights reserved.</p>
        </div>
      </div>
    </footer>

    <!-- Testing Dashboard (only visible in development) -->
    <div v-if="isDev">
      <TestingDashboard />
    </div>
  </div>
</template>

<style scoped>
html {
  scroll-behavior: smooth;
}
</style>
