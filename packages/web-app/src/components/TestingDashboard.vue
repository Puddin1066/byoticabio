<script setup>
import { ref, onMounted } from 'vue'
import { 
  getAnalyticsSummary, 
  exportLeads, 
  exportAnalyticsEvents,
  clearStoredData 
} from '../utils/analytics'
import { downloadLeadsCSV } from '../utils/leadCapture'

const summary = ref(null)
const leads = ref([])
const events = ref([])
const showClearConfirm = ref(false)

const loadData = () => {
  summary.value = getAnalyticsSummary()
  leads.value = exportLeads()
  events.value = exportAnalyticsEvents()
}

onMounted(() => {
  loadData()
  // Refresh every 5 seconds
  const interval = setInterval(loadData, 5000)
  return () => clearInterval(interval)
})

const handleClearData = () => {
  if (confirm('Are you sure you want to clear all analytics data? This cannot be undone.')) {
    clearStoredData()
    loadData()
    showClearConfirm.value = false
  }
}

const exportJSON = () => {
  const data = {
    summary: summary.value,
    leads: leads.value,
    events: events.value,
    exported_at: new Date().toISOString(),
  }
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `byoticabio_analytics_${new Date().toISOString().split('T')[0]}.json`
  link.click()
  URL.revokeObjectURL(url)
}
</script>

<template>
  <div class="fixed bottom-4 right-4 bg-white rounded-lg shadow-2xl border border-gray-200 p-6 max-w-2xl max-h-[80vh] overflow-y-auto z-50" v-if="summary">
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-xl font-bold text-gray-900">Testing Dashboard</h3>
      <div class="flex gap-2">
        <button 
          @click="downloadLeadsCSV"
          class="px-3 py-1.5 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
        >
          Export CSV
        </button>
        <button 
          @click="exportJSON"
          class="px-3 py-1.5 bg-gray-600 text-white rounded text-sm hover:bg-gray-700"
        >
          Export JSON
        </button>
        <button 
          @click="loadData"
          class="px-3 py-1.5 bg-green-600 text-white rounded text-sm hover:bg-green-700"
        >
          Refresh
        </button>
        <button 
          @click="showClearConfirm = true"
          class="px-3 py-1.5 bg-red-600 text-white rounded text-sm hover:bg-red-700"
        >
          Clear
        </button>
      </div>
    </div>

    <!-- Summary Stats -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <div class="bg-blue-50 rounded-lg p-3">
        <div class="text-2xl font-bold text-blue-600">{{ summary.page_views || 0 }}</div>
        <div class="text-xs text-gray-600">Page Views</div>
      </div>
      <div class="bg-green-50 rounded-lg p-3">
        <div class="text-2xl font-bold text-green-600">{{ summary.total_leads || 0 }}</div>
        <div class="text-xs text-gray-600">Leads</div>
      </div>
      <div class="bg-purple-50 rounded-lg p-3">
        <div class="text-2xl font-bold text-purple-600">{{ summary.cta_clicks || 0 }}</div>
        <div class="text-xs text-gray-600">CTA Clicks</div>
      </div>
      <div class="bg-orange-50 rounded-lg p-3">
        <div class="text-2xl font-bold text-orange-600">{{ summary.conversion_rate?.toFixed(1) || 0 }}%</div>
        <div class="text-xs text-gray-600">Conv. Rate</div>
      </div>
    </div>

    <!-- Leads by Segment -->
    <div class="mb-6">
      <h4 class="font-semibold text-gray-900 mb-2">Leads by Market Segment</h4>
      <div class="space-y-2">
        <div v-for="(count, segment) in summary.leads_by_segment" :key="segment" class="flex justify-between items-center">
          <span class="text-sm text-gray-600 capitalize">{{ segment }}</span>
          <span class="text-sm font-bold text-gray-900">{{ count }}</span>
        </div>
        <div v-if="Object.keys(summary.leads_by_segment).length === 0" class="text-sm text-gray-500 italic">
          No leads captured yet
        </div>
      </div>
    </div>

    <!-- Recent Leads -->
    <div class="mb-6">
      <h4 class="font-semibold text-gray-900 mb-2">Recent Leads (Last 5)</h4>
      <div class="space-y-2 max-h-40 overflow-y-auto">
        <div v-for="(lead, index) in leads.slice(-5).reverse()" :key="index" class="bg-gray-50 rounded p-2 text-xs">
          <div class="font-semibold">{{ lead.name || 'Anonymous' }}</div>
          <div class="text-gray-600">{{ lead.email }}</div>
          <div class="text-gray-500">{{ lead.company || 'No company' }} • {{ lead.form_type }}</div>
          <div class="text-gray-400 text-xs mt-1">{{ new Date(lead.timestamp).toLocaleString() }}</div>
        </div>
        <div v-if="leads.length === 0" class="text-sm text-gray-500 italic">
          No leads yet
        </div>
      </div>
    </div>

    <!-- Event Summary -->
    <div class="mb-6">
      <h4 class="font-semibold text-gray-900 mb-2">Event Summary</h4>
      <div class="space-y-1 text-xs">
        <div class="flex justify-between">
          <span class="text-gray-600">Form Opens:</span>
          <span class="font-semibold">{{ summary.form_opens || 0 }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-600">Form Submits:</span>
          <span class="font-semibold">{{ summary.form_submits || 0 }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-600">Total Events:</span>
          <span class="font-semibold">{{ summary.total_events || 0 }}</span>
        </div>
      </div>
    </div>

    <!-- Clear Confirmation -->
    <div v-if="showClearConfirm" class="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
      <p class="text-sm text-red-800 mb-3">Are you sure you want to clear all data?</p>
      <div class="flex gap-2">
        <button 
          @click="handleClearData"
          class="px-3 py-1.5 bg-red-600 text-white rounded text-sm hover:bg-red-700"
        >
          Yes, Clear All
        </button>
        <button 
          @click="showClearConfirm = false"
          class="px-3 py-1.5 bg-gray-300 text-gray-700 rounded text-sm hover:bg-gray-400"
        >
          Cancel
        </button>
      </div>
    </div>

    <div class="text-xs text-gray-500 text-center border-t pt-3 mt-4">
      Testing Dashboard • Data stored locally • Refresh to see updates
    </div>
  </div>
</template>

<style scoped>
/* Add any custom styles here */
</style>

