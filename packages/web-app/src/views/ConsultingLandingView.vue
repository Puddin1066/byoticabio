<script setup>
import { ref } from 'vue'
import BTE from '../components/BTE.vue'
import Nav from '../components/Nav.vue'
import Logo from '../components/BTELogoVertical.vue'
import LinkOut from '../components/LinkOutIcon.vue'

const contactForm = ref({
  name: '',
  email: '',
  company: '',
  message: ''
})

const showContactForm = ref(false)

const submitContact = () => {
  // TODO: Implement form submission
  console.log('Contact form submitted:', contactForm.value)
  alert('Thank you for your interest! We will contact you soon.')
  showContactForm.value = false
  // Reset form
  contactForm.value = { name: '', email: '', company: '', message: '' }
}
</script>

<template>
  <div class="min-h-screen bg-white">
    <!-- Navigation -->
    <Nav></Nav>

    <!-- Hero Section -->
    <section class="relative w-full min-h-[90vh] bg-gradient-to-br from-blue-900 via-blue-800 to-teal-900 flex items-center justify-center overflow-hidden">
      <div class="absolute inset-0 opacity-20">
        <BTE class="absolute -left-80 -top-28 opacity-50"></BTE>
      </div>
      <div class="relative z-10 text-center px-4 py-20 max-w-5xl mx-auto">
        <h1 class="text-5xl md:text-6xl font-bold text-white mb-6">
          Machine Intelligence for Biotech Decisions
        </h1>
        <p class="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
          Leverage distributed biomedical knowledge graphs to accelerate drug discovery, 
          due diligence, and strategic planning
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button 
            @click="showContactForm = true"
            class="main-btn text-lg px-8 py-4 min-w-[250px]"
          >
            Schedule a Consultation
          </button>
          <a 
            href="#services"
            class="main-btn-outline text-lg px-8 py-4 min-w-[250px]"
          >
            Explore Our Services
          </a>
        </div>
        <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-white">
          <div class="bg-blue-800/50 backdrop-blur-sm rounded-lg p-6">
            <h3 class="text-2xl font-bold mb-2">100+ APIs</h3>
            <p class="text-blue-100">Query biomedical databases simultaneously</p>
          </div>
          <div class="bg-blue-800/50 backdrop-blur-sm rounded-lg p-6">
            <h3 class="text-2xl font-bold mb-2">Multi-hop Reasoning</h3>
            <p class="text-blue-100">Traverse relationships across data sources</p>
          </div>
          <div class="bg-blue-800/50 backdrop-blur-sm rounded-lg p-6">
            <h3 class="text-2xl font-bold mb-2">TRAPI Compliant</h3>
            <p class="text-blue-100">Production-ready, interoperable infrastructure</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Services Section -->
    <section id="services" class="py-20 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive consulting services powered by distributed biomedical knowledge graphs
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <!-- Service 1 -->
          <div class="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div class="w-12 h-12 bg-teal-500 rounded-lg flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Knowledge Graph Integration</h3>
            <p class="text-gray-600 mb-4">
              Integrate proprietary data with public biomedical APIs. Build custom query pipelines 
              for specific research questions.
            </p>
            <ul class="text-sm text-gray-500 space-y-1">
              <li>• Custom data source integration</li>
              <li>• Query pipeline development</li>
              <li>• Infrastructure deployment</li>
            </ul>
          </div>

          <!-- Service 2 -->
          <div class="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div class="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Drug Discovery Support</h3>
            <p class="text-gray-600 mb-4">
              Target identification, mechanism analysis, and multi-omics data integration 
              to accelerate your discovery pipeline.
            </p>
            <ul class="text-sm text-gray-500 space-y-1">
              <li>• Target identification & validation</li>
              <li>• Mechanism of action analysis</li>
              <li>• Drug-disease associations</li>
              <li>• Multi-omics integration</li>
            </ul>
          </div>

          <!-- Service 3 -->
          <div class="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div class="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Competitive Intelligence</h3>
            <p class="text-gray-600 mb-4">
              Comprehensive landscape analysis, patent mining, and biomarker discovery 
              to inform strategic decisions.
            </p>
            <ul class="text-sm text-gray-500 space-y-1">
              <li>• Therapeutic area landscapes</li>
              <li>• Patent & publication mining</li>
              <li>• Biomarker discovery</li>
              <li>• Pathway analysis</li>
            </ul>
          </div>

          <!-- Service 4 -->
          <div class="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div class="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">API Development</h3>
            <p class="text-gray-600 mb-4">
              TRAPI-compliant API development, SmartAPI annotation, and performance 
              optimization for your data sources.
            </p>
            <ul class="text-sm text-gray-500 space-y-1">
              <li>• TRAPI-compliant APIs</li>
              <li>• SmartAPI registration</li>
              <li>• Custom integrations</li>
              <li>• Performance optimization</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Diligence Section -->
    <section id="diligence" class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-gray-900 mb-4">Due Diligence Capabilities</h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive technical, scientific, and strategic due diligence powered by 
            distributed knowledge graphs
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Technical Diligence -->
          <div class="bg-gradient-to-br from-blue-50 to-teal-50 rounded-xl p-8 border-2 border-blue-200">
            <h3 class="text-2xl font-bold text-gray-900 mb-4">Technical Due Diligence</h3>
            <ul class="space-y-3 text-gray-700">
              <li class="flex items-start">
                <svg class="w-5 h-5 text-teal-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                </svg>
                <span><strong>Target Validation:</strong> Comprehensive analysis using multi-source evidence</span>
              </li>
              <li class="flex items-start">
                <svg class="w-5 h-5 text-teal-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                </svg>
                <span><strong>Mechanism Assessment:</strong> Evaluate proposed mechanisms across literature and databases</span>
              </li>
              <li class="flex items-start">
                <svg class="w-5 h-5 text-teal-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                </svg>
                <span><strong>Competitive Landscape:</strong> Map positioning using distributed knowledge sources</span>
              </li>
              <li class="flex items-start">
                <svg class="w-5 h-5 text-teal-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                </svg>
                <span><strong>Data Quality Assessment:</strong> Evaluate sources and knowledge graph completeness</span>
              </li>
            </ul>
          </div>

          <!-- Scientific Diligence -->
          <div class="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-8 border-2 border-purple-200">
            <h3 class="text-2xl font-bold text-gray-900 mb-4">Scientific Due Diligence</h3>
            <ul class="space-y-3 text-gray-700">
              <li class="flex items-start">
                <svg class="w-5 h-5 text-purple-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                </svg>
                <span><strong>Evidence Synthesis:</strong> Aggregate evidence from 100+ biomedical APIs</span>
              </li>
              <li class="flex items-start">
                <svg class="w-5 h-5 text-purple-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                </svg>
                <span><strong>Literature Mining:</strong> Automated extraction and synthesis of publications</span>
              </li>
              <li class="flex items-start">
                <svg class="w-5 h-5 text-purple-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                </svg>
                <span><strong>Biomarker Analysis:</strong> Identify and validate across multiple data sources</span>
              </li>
              <li class="flex items-start">
                <svg class="w-5 h-5 text-purple-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                </svg>
                <span><strong>Safety Profiling:</strong> Early safety signal detection using integrated knowledge</span>
              </li>
            </ul>
          </div>

          <!-- Strategic Diligence -->
          <div class="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl p-8 border-2 border-orange-200">
            <h3 class="text-2xl font-bold text-gray-900 mb-4">Strategic Due Diligence</h3>
            <ul class="space-y-3 text-gray-700">
              <li class="flex items-start">
                <svg class="w-5 h-5 text-orange-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                </svg>
                <span><strong>Market Opportunity:</strong> Analyze therapeutic areas using integrated data</span>
              </li>
              <li class="flex items-start">
                <svg class="w-5 h-5 text-orange-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                </svg>
                <span><strong>Technology Assessment:</strong> Evaluate platform technologies and capabilities</span>
              </li>
              <li class="flex items-start">
                <svg class="w-5 h-5 text-orange-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                </svg>
                <span><strong>Partnership Analysis:</strong> Identify potential collaboration opportunities</span>
              </li>
              <li class="flex items-start">
                <svg class="w-5 h-5 text-orange-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                </svg>
                <span><strong>Risk Assessment:</strong> Comprehensive evaluation of scientific and technical risks</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Data Capabilities Section -->
    <section id="data-capabilities" class="py-20 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-gray-900 mb-4">Data Capabilities</h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            Production-ready infrastructure for querying distributed biomedical knowledge graphs
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <!-- Distributed Knowledge Graph -->
          <div class="bg-white rounded-lg shadow-lg p-8">
            <h3 class="text-2xl font-bold text-gray-900 mb-4">Distributed Knowledge Graph Access</h3>
            <ul class="space-y-2 text-gray-700">
              <li class="flex items-center">
                <span class="w-2 h-2 bg-teal-500 rounded-full mr-3"></span>
                <strong>100+ Biomedical APIs:</strong> Access to major public databases
              </li>
              <li class="flex items-center">
                <span class="w-2 h-2 bg-teal-500 rounded-full mr-3"></span>
                <strong>SmartAPI Registry:</strong> Automatic discovery and integration
              </li>
              <li class="flex items-center">
                <span class="w-2 h-2 bg-teal-500 rounded-full mr-3"></span>
                <strong>TRAPI Compliance:</strong> Interoperable with NCATS Translator
              </li>
              <li class="flex items-center">
                <span class="w-2 h-2 bg-teal-500 rounded-full mr-3"></span>
                <strong>Real-time Updates:</strong> Continuously synced data sources
              </li>
            </ul>
          </div>

          <!-- Query Capabilities -->
          <div class="bg-white rounded-lg shadow-lg p-8">
            <h3 class="text-2xl font-bold text-gray-900 mb-4">Advanced Query Capabilities</h3>
            <ul class="space-y-2 text-gray-700">
              <li class="flex items-center">
                <span class="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                <strong>Multi-hop Queries:</strong> Traverse relationships across sources
              </li>
              <li class="flex items-center">
                <span class="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                <strong>Sync & Async:</strong> Real-time and long-running queries
              </li>
              <li class="flex items-center">
                <span class="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                <strong>Batch Processing:</strong> Efficient large-scale queries
              </li>
              <li class="flex items-center">
                <span class="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                <strong>Custom Queries:</strong> Flexible query construction
              </li>
            </ul>
          </div>
        </div>

        <!-- Data Types -->
        <div class="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h3 class="text-2xl font-bold text-gray-900 mb-6 text-center">Supported Data Types</h3>
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div class="text-center p-4 bg-gray-50 rounded-lg">
              <div class="text-3xl mb-2">🧬</div>
              <div class="font-semibold text-gray-900">Genes</div>
            </div>
            <div class="text-center p-4 bg-gray-50 rounded-lg">
              <div class="text-3xl mb-2">🏥</div>
              <div class="font-semibold text-gray-900">Diseases</div>
            </div>
            <div class="text-center p-4 bg-gray-50 rounded-lg">
              <div class="text-3xl mb-2">💊</div>
              <div class="font-semibold text-gray-900">Drugs</div>
            </div>
            <div class="text-center p-4 bg-gray-50 rounded-lg">
              <div class="text-3xl mb-2">🧪</div>
              <div class="font-semibold text-gray-900">Pathways</div>
            </div>
            <div class="text-center p-4 bg-gray-50 rounded-lg">
              <div class="text-3xl mb-2">📊</div>
              <div class="font-semibold text-gray-900">Clinical</div>
            </div>
            <div class="text-center p-4 bg-gray-50 rounded-lg">
              <div class="text-3xl mb-2">🔬</div>
              <div class="font-semibold text-gray-900">Multi-omics</div>
            </div>
          </div>
        </div>

        <!-- Technical Infrastructure -->
        <div class="bg-gradient-to-r from-blue-600 to-teal-600 rounded-lg shadow-lg p-8 text-white">
          <h3 class="text-2xl font-bold mb-4">Production-Ready Infrastructure</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 class="font-semibold mb-2">Built on Open Standards</h4>
              <p class="text-blue-100">TRAPI-compliant, interoperable with NCATS Translator ecosystem</p>
            </div>
            <div>
              <h4 class="font-semibold mb-2">Scalable Architecture</h4>
              <p class="text-blue-100">Handle enterprise-level query volumes with proven performance</p>
            </div>
            <div>
              <h4 class="font-semibold mb-2">Battle-Tested</h4>
              <p class="text-blue-100">Production deployment in NCATS Translator project</p>
            </div>
            <div>
              <h4 class="font-semibold mb-2">Transparent & Auditable</h4>
              <p class="text-blue-100">Open source foundation with active development</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Use Cases Section -->
    <section id="use-cases" class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-gray-900 mb-4">Use Cases</h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            Real-world applications of distributed knowledge graph technology
          </p>
        </div>

        <div class="space-y-8">
          <!-- Use Case 1 -->
          <div class="bg-gray-50 rounded-lg p-8 border-l-4 border-teal-500">
            <h3 class="text-2xl font-bold text-gray-900 mb-3">Target Identification for Rare Disease</h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 class="font-semibold text-gray-700 mb-2">Challenge</h4>
                <p class="text-gray-600">Identify druggable targets for rare genetic disease with limited prior research</p>
              </div>
              <div>
                <h4 class="font-semibold text-gray-700 mb-2">Approach</h4>
                <p class="text-gray-600">Multi-hop query from disease → genes → pathways → drugs across 50+ data sources</p>
              </div>
              <div>
                <h4 class="font-semibold text-gray-700 mb-2">Outcome</h4>
                <p class="text-gray-600">Prioritized target list with evidence scores and supporting literature</p>
              </div>
            </div>
          </div>

          <!-- Use Case 2 -->
          <div class="bg-gray-50 rounded-lg p-8 border-l-4 border-blue-500">
            <h3 class="text-2xl font-bold text-gray-900 mb-3">Due Diligence for Biotech Acquisition</h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 class="font-semibold text-gray-700 mb-2">Challenge</h4>
                <p class="text-gray-600">Evaluate scientific validity of target platform technology</p>
              </div>
              <div>
                <h4 class="font-semibold text-gray-700 mb-2">Approach</h4>
                <p class="text-gray-600">Comprehensive evidence synthesis across 100+ biomedical APIs and literature</p>
              </div>
              <div>
                <h4 class="font-semibold text-gray-700 mb-2">Outcome</h4>
                <p class="text-gray-600">Detailed technical assessment report with risk analysis and recommendations</p>
              </div>
            </div>
          </div>

          <!-- Use Case 3 -->
          <div class="bg-gray-50 rounded-lg p-8 border-l-4 border-purple-500">
            <h3 class="text-2xl font-bold text-gray-900 mb-3">Competitive Intelligence</h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 class="font-semibold text-gray-700 mb-2">Challenge</h4>
                <p class="text-gray-600">Understand competitive landscape in specific therapeutic area</p>
              </div>
              <div>
                <h4 class="font-semibold text-gray-700 mb-2">Approach</h4>
                <p class="text-gray-600">Query all known drug-disease associations, mechanisms, and clinical data</p>
              </div>
              <div>
                <h4 class="font-semibold text-gray-700 mb-2">Outcome</h4>
                <p class="text-gray-600">Comprehensive competitive map with gaps and opportunities identified</p>
              </div>
            </div>
          </div>

          <!-- Use Case 4 -->
          <div class="bg-gray-50 rounded-lg p-8 border-l-4 border-orange-500">
            <h3 class="text-2xl font-bold text-gray-900 mb-3">Biomarker Discovery</h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 class="font-semibold text-gray-700 mb-2">Challenge</h4>
                <p class="text-gray-600">Identify biomarkers for patient stratification in clinical trials</p>
              </div>
              <div>
                <h4 class="font-semibold text-gray-700 mb-2">Approach</h4>
                <p class="text-gray-600">Multi-omics integration across genes, proteins, pathways, and clinical data</p>
              </div>
              <div>
                <h4 class="font-semibold text-gray-700 mb-2">Outcome</h4>
                <p class="text-gray-600">Validated biomarker candidates with supporting evidence from multiple sources</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Technology Stack Section -->
    <section id="technology" class="py-20 bg-gray-900 text-white">
      <div class="max-w-7xl mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold mb-4">Technology Stack</h2>
          <p class="text-xl text-gray-300 max-w-3xl mx-auto">
            Built on proven, open-source technologies
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <div class="bg-gray-800 rounded-lg p-6">
            <h3 class="text-xl font-bold mb-2">BioThings Explorer</h3>
            <p class="text-gray-300">Core query engine for distributed knowledge graphs</p>
          </div>
          <div class="bg-gray-800 rounded-lg p-6">
            <h3 class="text-xl font-bold mb-2">TRAPI</h3>
            <p class="text-gray-300">Translator Reasoner API standard interface</p>
          </div>
          <div class="bg-gray-800 rounded-lg p-6">
            <h3 class="text-xl font-bold mb-2">SmartAPI Registry</h3>
            <p class="text-gray-300">Automated data source discovery and integration</p>
          </div>
          <div class="bg-gray-800 rounded-lg p-6">
            <h3 class="text-xl font-bold mb-2">Node.js/TypeScript</h3>
            <p class="text-gray-300">Modern, scalable backend infrastructure</p>
          </div>
          <div class="bg-gray-800 rounded-lg p-6">
            <h3 class="text-xl font-bold mb-2">Vue.js</h3>
            <p class="text-gray-300">Responsive, interactive frontend</p>
          </div>
          <div class="bg-gray-800 rounded-lg p-6">
            <h3 class="text-xl font-bold mb-2">Docker</h3>
            <p class="text-gray-300">Containerized, portable deployment</p>
          </div>
        </div>

        <div class="bg-teal-900/30 rounded-lg p-8 border border-teal-700">
          <h3 class="text-2xl font-bold mb-4">Why This Matters</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 class="font-semibold mb-2 text-teal-300">Open Source Foundation</h4>
              <p class="text-gray-300">Transparent, auditable technology you can trust and customize</p>
            </div>
            <div>
              <h4 class="font-semibold mb-2 text-teal-300">NCATS Backing</h4>
              <p class="text-gray-300">Developed and maintained as part of the NCATS Translator project</p>
            </div>
            <div>
              <h4 class="font-semibold mb-2 text-teal-300">Active Development</h4>
              <p class="text-gray-300">Continuously improved with community-driven enhancements</p>
            </div>
            <div>
              <h4 class="font-semibold mb-2 text-teal-300">Production Proven</h4>
              <p class="text-gray-300">Battle-tested in real-world biomedical research applications</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="py-20 bg-gradient-to-br from-blue-600 to-teal-600 text-white">
      <div class="max-w-4xl mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p class="text-xl text-blue-100">
            Let's discuss how distributed knowledge graphs can accelerate your biotech initiatives
          </p>
        </div>

        <!-- Contact Form Modal -->
        <div v-if="showContactForm" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div class="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div class="p-8">
              <div class="flex justify-between items-center mb-6">
                <h3 class="text-2xl font-bold text-gray-900">Contact Us</h3>
                <button 
                  @click="showContactForm = false"
                  class="text-gray-500 hover:text-gray-700"
                >
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
              
              <form @submit.prevent="submitContact" class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input 
                    v-model="contactForm.name"
                    type="text" 
                    required
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input 
                    v-model="contactForm.email"
                    type="email" 
                    required
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="your.email@company.com"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Company</label>
                  <input 
                    v-model="contactForm.company"
                    type="text" 
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="Your company"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea 
                    v-model="contactForm.message"
                    rows="4"
                    required
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="Tell us about your project or questions..."
                  ></textarea>
                </div>
                <div class="flex gap-4">
                  <button 
                    type="submit"
                    class="flex-1 bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                  >
                    Send Message
                  </button>
                  <button 
                    type="button"
                    @click="showContactForm = false"
                    class="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button 
            @click="showContactForm = true"
            class="bg-white text-blue-600 hover:bg-blue-50 font-semibold py-4 px-8 rounded-lg transition-colors text-lg min-w-[250px]"
          >
            Schedule a Consultation
          </button>
          <a 
            href="https://api.bte.ncats.io/"
            target="_blank"
            rel="noopener"
            class="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold py-4 px-8 rounded-lg transition-colors text-lg min-w-[250px] text-center"
          >
            Try BTE API <LinkOut></LinkOut>
          </a>
        </div>

        <div class="mt-12 text-center text-blue-100">
          <p class="mb-2">Or reach out directly:</p>
          <p class="text-lg">consulting@biothings.io</p>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-900 text-gray-400 py-12">
      <div class="max-w-7xl mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h4 class="text-white font-semibold mb-4">Services</h4>
            <ul class="space-y-2">
              <li><a href="#services" class="hover:text-white">Knowledge Graph Integration</a></li>
              <li><a href="#services" class="hover:text-white">Drug Discovery Support</a></li>
              <li><a href="#services" class="hover:text-white">Competitive Intelligence</a></li>
              <li><a href="#services" class="hover:text-white">API Development</a></li>
            </ul>
          </div>
          <div>
            <h4 class="text-white font-semibold mb-4">Resources</h4>
            <ul class="space-y-2">
              <li><a href="https://api.bte.ncats.io/" target="_blank" rel="noopener" class="hover:text-white">BTE API <LinkOut></LinkOut></a></li>
              <li><a href="https://smart-api.info/" target="_blank" rel="noopener" class="hover:text-white">SmartAPI Registry <LinkOut></LinkOut></a></li>
              <li><a href="https://github.com/biothings/biothings_explorer" target="_blank" rel="noopener" class="hover:text-white">GitHub Repository <LinkOut></LinkOut></a></li>
              <li><a href="/about" class="hover:text-white">About BTE</a></li>
            </ul>
          </div>
          <div>
            <h4 class="text-white font-semibold mb-4">Contact</h4>
            <ul class="space-y-2">
              <li><a href="#contact" class="hover:text-white">Schedule Consultation</a></li>
              <li><a href="#contact" class="hover:text-white">Request Demo</a></li>
              <li class="text-sm">consulting@biothings.io</li>
            </ul>
          </div>
        </div>
        <div class="border-t border-gray-800 pt-8 text-center text-sm">
          <p>&copy; 2024 BioThings Explorer Consulting. Built on open-source technology.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}
</style>

