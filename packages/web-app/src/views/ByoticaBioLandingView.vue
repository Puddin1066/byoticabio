<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import BTE from '../components/BTE.vue'
import LinkOut from '../components/LinkOutIcon.vue'
import TestingDashboard from '../components/TestingDashboard.vue'
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
const metaKGStats = ref({
  nodeTypes: 0,
  predicates: 0,
  edges: 0,
  idPrefixes: new Set()
})

const BTE_API_URL = 'https://api.bte.ncats.io'
const scrollHandlerRef = ref(null)
const isDev = import.meta.env.DEV

const submitContact = async () => {
  try {
    trackHubSpotFormSubmit()
    const result = await submitLead('contact', contactForm.value)
    if (result.success) {
      alert('Thank you! Our team will contact you within 24 hours to discuss your project.')
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
    
    // Track scroll depth
    const scrollTop = window.scrollY || document.documentElement.scrollTop
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
    const scrollPercentage = Math.round((scrollTop / scrollHeight) * 100)
    
    if (scrollPercentage > lastScrollPercentage) {
      trackScrollDepth(scrollPercentage)
      lastScrollPercentage = scrollPercentage
    }
    
    // Track section views
    const sections = ['services', 'results', 'technology', 'knowledge-graphs', 'about', 'contact']
    sections.forEach(sectionId => {
      const element = document.getElementById(sectionId)
      if (element) {
        const rect = element.getBoundingClientRect()
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          const sectionNames = {
            'services': 'Services Section',
            'results': 'Results Section',
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
})
</script>

<template>
  <div class="min-h-screen bg-white">
    <!-- Premium Navigation -->
    <nav 
      :class="[
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      ]"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-20">
          <div class="flex-shrink-0">
            <a href="#" class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
              ByoticaBio.ai
            </a>
            <span class="ml-2 text-xs text-gray-500 font-normal">Consulting</span>
          </div>
          <div class="hidden md:flex space-x-8">
            <a href="#services" class="text-gray-700 hover:text-blue-600 transition-colors font-medium">Services</a>
            <a href="#results" class="text-gray-700 hover:text-blue-600 transition-colors font-medium">Results</a>
            <a href="#technology" class="text-gray-700 hover:text-blue-600 transition-colors font-medium">Technology</a>
            <a href="#about" class="text-gray-700 hover:text-blue-600 transition-colors font-medium">About</a>
          </div>
          <div class="flex items-center space-x-4">
            <button 
              @click="handleCTAClick('free_consultation', 'nav')"
              class="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              Free Consultation
            </button>
            <button class="md:hidden text-gray-700">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Hero Section - Agency Focused -->
    <section class="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div class="absolute inset-0">
        <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMxRTI5M0YiIGZpbGwtb3BhY2l0eT0iMC40Ij48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIxLjUiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20"></div>
        <BTE class="absolute -left-80 -top-28 opacity-10"></BTE>
      </div>

      <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div class="text-center">
          <div class="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8">
            <span class="text-blue-400 text-sm font-medium">Biotech Intelligence Consulting Agency</span>
          </div>

          <h1 class="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
            Accelerate Biotech Decisions
            <span class="block bg-gradient-to-r from-blue-400 via-teal-400 to-blue-400 bg-clip-text text-transparent">
              with AI-Powered Intelligence
            </span>
          </h1>

          <p class="text-xl md:text-2xl text-gray-300 mb-4 max-w-3xl mx-auto leading-relaxed">
            We're a specialized consulting agency that leverages cutting-edge knowledge graph technology 
            to deliver actionable insights for biotech companies, investors, and research organizations.
          </p>
          
          <p class="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
            Transform months of research into days. Make data-driven decisions with confidence.
          </p>

          <!-- Primary CTAs -->
          <div class="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button 
              @click="handleCTAClick('get_free_consultation', 'hero')"
              class="group px-8 py-4 bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-xl font-semibold text-lg shadow-2xl hover:shadow-blue-500/50 transform hover:scale-105 transition-all duration-300 flex items-center space-x-2"
            >
              <span>Get Free Consultation</span>
              <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
              </svg>
            </button>
            <button 
              @click="handleDemoClick('hero')"
              class="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-xl font-semibold text-lg hover:bg-white/20 transition-all duration-300"
            >
              See Live Demo
            </button>
          </div>

          <!-- Trust Indicators -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div class="text-center">
              <div class="text-4xl md:text-5xl font-bold text-white mb-2">100+</div>
              <div class="text-gray-400">Biomedical Data Sources</div>
              <div class="text-sm text-gray-500 mt-1">Integrated & Queryable</div>
            </div>
            <div class="text-center">
              <div class="text-4xl md:text-5xl font-bold text-white mb-2">10x</div>
              <div class="text-gray-400">Faster Insights</div>
              <div class="text-sm text-gray-500 mt-1">vs. Traditional Research</div>
            </div>
            <div class="text-center">
              <div class="text-4xl md:text-5xl font-bold text-white mb-2">24hr</div>
              <div class="text-gray-400">Response Time</div>
              <div class="text-sm text-gray-500 mt-1">For New Consultations</div>
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
              Biotech Decisions Are Too Slow and Too Risky
            </h2>
            <ul class="space-y-4 text-gray-600">
              <li class="flex items-start">
                <svg class="w-6 h-6 text-red-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
                <span>Months of manual research across fragmented data sources</span>
              </li>
              <li class="flex items-start">
                <svg class="w-6 h-6 text-red-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
                <span>Missed connections between genes, diseases, and drugs</span>
              </li>
              <li class="flex items-start">
                <svg class="w-6 h-6 text-red-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
                <span>Incomplete due diligence leading to costly mistakes</span>
              </li>
              <li class="flex items-start">
                <svg class="w-6 h-6 text-red-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
                <span>Competitive intelligence gaps in fast-moving markets</span>
              </li>
            </ul>
          </div>
          <div>
            <div class="inline-flex items-center px-4 py-2 rounded-full bg-green-50 border border-green-100 mb-6">
              <span class="text-green-600 text-sm font-semibold">Our Solution</span>
            </div>
            <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              AI-Powered Intelligence in Days, Not Months
            </h2>
            <ul class="space-y-4 text-gray-600">
              <li class="flex items-start">
                <svg class="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                </svg>
                <span><strong class="text-gray-900">Query 100+ APIs simultaneously</strong> - Get comprehensive insights in one query</span>
              </li>
              <li class="flex items-start">
                <svg class="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                </svg>
                <span><strong class="text-gray-900">Multi-hop reasoning</strong> - Discover hidden connections across knowledge domains</span>
              </li>
              <li class="flex items-start">
                <svg class="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                </svg>
                <span><strong class="text-gray-900">Production-ready infrastructure</strong> - Battle-tested technology from NCATS Translator</span>
              </li>
              <li class="flex items-start">
                <svg class="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                </svg>
                <span><strong class="text-gray-900">Expert consulting team</strong> - We translate technology into business value</span>
              </li>
            </ul>
            <div class="mt-8">
              <button 
                @click="handleCTAClick('free_consultation', 'page')"
                class="px-8 py-4 bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-xl font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                See How We Can Help →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Services Section - Lead Generation Focused -->
    <section id="services" class="py-24 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <div class="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-4">
            <span class="text-blue-600 text-sm font-semibold">Our Services</span>
          </div>
          <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            How We Help Biotech Companies Win
          </h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Specialized consulting services powered by advanced knowledge graph technology
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <!-- Service 1 -->
          <div class="bg-white rounded-2xl p-8 border border-gray-100 hover:border-blue-200 hover:shadow-2xl transition-all duration-300">
            <div class="w-14 h-14 bg-gradient-to-br from-blue-500 to-teal-500 rounded-xl flex items-center justify-center mb-6">
              <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Due Diligence Services</h3>
            <p class="text-gray-600 mb-4 leading-relaxed">
              Comprehensive technical and scientific due diligence for M&A, investments, and partnerships. Get answers in days, not months.
            </p>
            <ul class="text-sm text-gray-500 space-y-2 mb-6">
              <li>✓ Target validation & mechanism assessment</li>
              <li>✓ Competitive landscape analysis</li>
              <li>✓ Risk evaluation & recommendations</li>
            </ul>
            <button 
              @click="handleCTAClick('free_consultation', 'page')"
              class="w-full px-4 py-2 bg-blue-50 text-blue-600 rounded-lg font-semibold hover:bg-blue-100 transition-colors text-sm"
            >
              Get Quote →
            </button>
          </div>

          <!-- Service 2 -->
          <div class="bg-white rounded-2xl p-8 border border-gray-100 hover:border-blue-200 hover:shadow-2xl transition-all duration-300">
            <div class="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-6">
              <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Drug Discovery Support</h3>
            <p class="text-gray-600 mb-4 leading-relaxed">
              Accelerate target identification, validate mechanisms, and discover drug-disease associations using AI-powered analysis.
            </p>
            <ul class="text-sm text-gray-500 space-y-2 mb-6">
              <li>✓ Target identification & prioritization</li>
              <li>✓ Mechanism of action analysis</li>
              <li>✓ Multi-omics data integration</li>
            </ul>
            <button 
              @click="handleCTAClick('free_consultation', 'page')"
              class="w-full px-4 py-2 bg-purple-50 text-purple-600 rounded-lg font-semibold hover:bg-purple-100 transition-colors text-sm"
            >
              Learn More →
            </button>
          </div>

          <!-- Service 3 -->
          <div class="bg-white rounded-2xl p-8 border border-gray-100 hover:border-blue-200 hover:shadow-2xl transition-all duration-300">
            <div class="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center mb-6">
              <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Competitive Intelligence</h3>
            <p class="text-gray-600 mb-4 leading-relaxed">
              Map competitive landscapes, identify opportunities, and track market movements across therapeutic areas.
            </p>
            <ul class="text-sm text-gray-500 space-y-2 mb-6">
              <li>✓ Therapeutic area landscapes</li>
              <li>✓ Patent & publication mining</li>
              <li>✓ Biomarker discovery</li>
            </ul>
            <button 
              @click="handleCTAClick('free_consultation', 'page')"
              class="w-full px-4 py-2 bg-orange-50 text-orange-600 rounded-lg font-semibold hover:bg-orange-100 transition-colors text-sm"
            >
              Request Analysis →
            </button>
          </div>

          <!-- Service 4 -->
          <div class="bg-white rounded-2xl p-8 border border-gray-100 hover:border-blue-200 hover:shadow-2xl transition-all duration-300">
            <div class="w-14 h-14 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center mb-6">
              <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Custom Integration</h3>
            <p class="text-gray-600 mb-4 leading-relaxed">
              Deploy knowledge graph infrastructure in your organization. We build, integrate, and train your team.
            </p>
            <ul class="text-sm text-gray-500 space-y-2 mb-6">
              <li>✓ Custom API development</li>
              <li>✓ Data source integration</li>
              <li>✓ Team training & support</li>
            </ul>
            <button 
              @click="handleCTAClick('free_consultation', 'page')"
              class="w-full px-4 py-2 bg-teal-50 text-teal-600 rounded-lg font-semibold hover:bg-teal-100 transition-colors text-sm"
            >
              Schedule Demo →
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Results/Case Studies Section -->
    <section id="results" class="py-24 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <div class="inline-flex items-center px-4 py-2 rounded-full bg-green-50 border border-green-100 mb-4">
            <span class="text-green-600 text-sm font-semibold">Proven Results</span>
          </div>
          <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Real Impact for Our Clients
          </h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            See how we've helped biotech companies make faster, better decisions
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Case Study 1 -->
          <div class="bg-gradient-to-br from-blue-50 to-teal-50 rounded-2xl p-8 border border-blue-100">
            <div class="text-4xl mb-4">🎯</div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Target Identification</h3>
            <p class="text-gray-600 mb-4">
              <strong>Challenge:</strong> Identify druggable targets for rare disease with limited research
            </p>
            <p class="text-gray-600 mb-4">
              <strong>Our Approach:</strong> Multi-hop query across 50+ data sources in 3 days
            </p>
            <div class="bg-white rounded-lg p-4 mb-4">
              <div class="text-2xl font-bold text-blue-600 mb-1">12 Targets</div>
              <div class="text-sm text-gray-600">Prioritized with evidence scores</div>
            </div>
            <p class="text-sm text-gray-500 italic">
              "Saved us 3 months of research time" - Biotech Startup CEO
            </p>
          </div>

          <!-- Case Study 2 -->
          <div class="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-100">
            <div class="text-4xl mb-4">💼</div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Due Diligence</h3>
            <p class="text-gray-600 mb-4">
              <strong>Challenge:</strong> Evaluate acquisition target's scientific validity
            </p>
            <p class="text-gray-600 mb-4">
              <strong>Our Approach:</strong> Comprehensive evidence synthesis across 100+ APIs
            </p>
            <div class="bg-white rounded-lg p-4 mb-4">
              <div class="text-2xl font-bold text-purple-600 mb-1">5 Days</div>
              <div class="text-sm text-gray-600">Complete technical assessment</div>
            </div>
            <p class="text-sm text-gray-500 italic">
              "Most thorough DD we've seen" - Investment Firm Partner
            </p>
          </div>

          <!-- Case Study 3 -->
          <div class="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-8 border border-orange-100">
            <div class="text-4xl mb-4">📊</div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Competitive Analysis</h3>
            <p class="text-gray-600 mb-4">
              <strong>Challenge:</strong> Understand competitive landscape in therapeutic area
            </p>
            <p class="text-gray-600 mb-4">
              <strong>Our Approach:</strong> Query all drug-disease associations and mechanisms
            </p>
            <div class="bg-white rounded-lg p-4 mb-4">
              <div class="text-2xl font-bold text-orange-600 mb-1">47 Gaps</div>
              <div class="text-sm text-gray-600">Opportunities identified</div>
            </div>
            <p class="text-sm text-gray-500 italic">
              "Identified opportunities we didn't know existed" - Pharma Strategy Director
            </p>
          </div>
        </div>

        <div class="text-center mt-12">
          <button 
            @click="handleCTAClick('free_consultation', 'page')"
            class="px-8 py-4 bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-xl font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            See How We Can Help Your Company →
          </button>
        </div>
      </div>
    </section>

    <!-- Technology Differentiator -->
    <section id="technology" class="py-24 bg-gray-900 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <div class="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-4">
            <span class="text-blue-400 text-sm font-semibold">Our Technology Advantage</span>
          </div>
          <h2 class="text-4xl md:text-5xl font-bold mb-4">
            Powered by BioThings Explorer
          </h2>
          <p class="text-xl text-gray-300 max-w-2xl mx-auto">
            We leverage production-ready technology from the NCATS Translator project - 
            the same infrastructure trusted by leading biomedical research organizations
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div class="bg-gray-800 rounded-xl p-6">
            <h3 class="text-xl font-bold mb-2">100+ APIs</h3>
            <p class="text-gray-300">Query major biomedical databases simultaneously</p>
          </div>
          <div class="bg-gray-800 rounded-xl p-6">
            <h3 class="text-xl font-bold mb-2">Multi-hop Reasoning</h3>
            <p class="text-gray-300">Discover connections across knowledge domains</p>
          </div>
          <div class="bg-gray-800 rounded-xl p-6">
            <h3 class="text-xl font-bold mb-2">Production Ready</h3>
            <p class="text-gray-300">Battle-tested in NCATS Translator project</p>
          </div>
        </div>

        <div class="bg-gradient-to-r from-blue-600 to-teal-600 rounded-xl p-8 text-center">
          <h3 class="text-2xl font-bold mb-4">Want to See It in Action?</h3>
          <p class="text-blue-100 mb-6 max-w-2xl mx-auto">
            Schedule a live demo and see how we can transform your biotech research process
          </p>
          <button 
            @click="handleDemoClick('page')"
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
            Access to 100+ Biomedical Knowledge Graphs
          </h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            We query all these APIs simultaneously to deliver comprehensive insights. 
            All accessible in real-time through our platform.
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
                  <div class="text-xs text-gray-500 mt-1">Knowledge Graph API</div>
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
              @click="handleCTAClick('free_consultation', 'page')"
              class="px-6 py-3 bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all"
            >
              Get Free Consultation →
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
    <section id="about" class="py-24 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div class="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-6">
              <span class="text-blue-600 text-sm font-semibold">About ByoticaBio.ai</span>
            </div>
            <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Independent Consulting, Powered by Advanced Technology
            </h2>
            <p class="text-lg text-gray-600 mb-4">
              We're a specialized biotech intelligence consulting agency. Our team combines deep domain expertise 
              with cutting-edge knowledge graph technology to deliver insights that drive decisions.
            </p>
            <p class="text-lg text-gray-600 mb-6">
              Unlike generic consulting firms, we focus exclusively on biotech and leverage production-ready 
              technology from the NCATS Translator project to give our clients a competitive advantage.
            </p>
            <div class="space-y-4">
              <div class="flex items-center">
                <svg class="w-6 h-6 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                </svg>
                <span class="text-gray-700">Expert team with biotech & data science backgrounds</span>
              </div>
              <div class="flex items-center">
                <svg class="w-6 h-6 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                </svg>
                <span class="text-gray-700">Production-ready technology, not prototypes</span>
              </div>
              <div class="flex items-center">
                <svg class="w-6 h-6 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                </svg>
                <span class="text-gray-700">Fast turnaround - results in days, not months</span>
              </div>
            </div>
          </div>
          <div class="bg-gradient-to-br from-blue-50 to-teal-50 rounded-2xl p-8 border border-blue-100">
            <h3 class="text-2xl font-bold text-gray-900 mb-6">Why Choose Us?</h3>
            <ul class="space-y-4">
              <li class="flex items-start">
                <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                  <span class="text-white font-bold">1</span>
                </div>
                <div>
                  <strong class="text-gray-900 block mb-1">Specialized Expertise</strong>
                  <p class="text-gray-600 text-sm">We focus exclusively on biotech intelligence, not general consulting</p>
                </div>
              </li>
              <li class="flex items-start">
                <div class="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                  <span class="text-white font-bold">2</span>
                </div>
                <div>
                  <strong class="text-gray-900 block mb-1">Technology Advantage</strong>
                  <p class="text-gray-600 text-sm">Access to production-ready knowledge graph infrastructure</p>
                </div>
              </li>
              <li class="flex items-start">
                <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                  <span class="text-white font-bold">3</span>
                </div>
                <div>
                  <strong class="text-gray-900 block mb-1">Speed & Quality</strong>
                  <p class="text-gray-600 text-sm">Deliver comprehensive insights in days, not months</p>
                </div>
              </li>
            </ul>
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
          Ready to Accelerate Your Biotech Decisions?
        </h2>
        <p class="text-xl text-gray-300 mb-4 max-w-2xl mx-auto">
          Schedule a free consultation to discuss your project. No obligation, just expert advice.
        </p>
        <p class="text-lg text-gray-400 mb-12">
          We respond to all inquiries within 24 hours
        </p>

        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <button 
            @click="handleCTAClick('free_consultation', 'page')"
            class="px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors shadow-xl hover:shadow-2xl transform hover:scale-105"
          >
            Get Free Consultation
          </button>
          <button 
            @click="handleDemoClick('page')"
            class="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-xl font-semibold text-lg hover:bg-white/20 transition-all"
          >
            Schedule Live Demo
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
              <h3 class="text-3xl font-bold text-gray-900">Get Free Consultation</h3>
              <p class="text-gray-600 mt-2">Tell us about your project and we'll respond within 24 hours</p>
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
            <h4 class="text-white font-bold text-lg mb-4">ByoticaBio.ai</h4>
            <p class="text-sm text-gray-500">
              Independent biotech intelligence consulting agency. Powered by advanced knowledge graph technology.
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
              <li><a href="https://api.bte.ncats.io/" target="_blank" rel="noopener" class="hover:text-white transition-colors">BTE API <LinkOut></LinkOut></a></li>
              <li><a href="https://smart-api.info/" target="_blank" rel="noopener" class="hover:text-white transition-colors">SmartAPI Registry <LinkOut></LinkOut></a></li>
              <li><a href="https://github.com/biothings/biothings_explorer" target="_blank" rel="noopener" class="hover:text-white transition-colors">GitHub <LinkOut></LinkOut></a></li>
            </ul>
          </div>
          <div>
            <h4 class="text-white font-semibold mb-4">Contact</h4>
            <ul class="space-y-2 text-sm">
              <li><button @click="handleCTAClick('free_consultation', 'page')" class="hover:text-white transition-colors text-left">Free Consultation</button></li>
              <li><button @click="handleDemoClick('page')" class="hover:text-white transition-colors text-left">Schedule Demo</button></li>
              <li class="text-gray-500">contact@byoticabio.ai</li>
            </ul>
          </div>
        </div>
        <div class="border-t border-gray-800 pt-8 text-center text-sm">
          <p>&copy; 2024 ByoticaBio.ai Consulting. All rights reserved.</p>
        </div>
      </div>
    </footer>

    <!-- Testing Dashboard (only visible in development) -->
    <TestingDashboard v-if="isDev" />
  </div>
</template>

<style scoped>
html {
  scroll-behavior: smooth;
}
</style>
