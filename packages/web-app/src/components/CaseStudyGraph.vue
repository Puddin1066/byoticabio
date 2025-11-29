<template>
  <div class="relative w-full h-96 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 rounded-xl border border-blue-500/20 shadow-2xl overflow-hidden">
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent)]"></div>
    <div ref="container" class="relative w-full h-full"></div>
    <div class="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-blue-300/70">
      <span>🖱️ Drag to pan • 🔍 Scroll to zoom • 👆 Hover nodes</span>
      <span class="flex items-center gap-2">
        <span class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
        <span>Interactive Knowledge Graph</span>
      </span>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch, onBeforeUnmount, nextTick } from 'vue'
import cytoscape from 'cytoscape'

const props = defineProps({
  nodes: { 
    type: Array, 
    required: true,
    default: () => []
  },
  edges: { 
    type: Array, 
    required: true,
    default: () => []
  },
  layout: {
    type: String,
    default: 'breadthfirst' // 'breadthfirst', 'dagre', 'cose', 'grid'
  },
  directed: {
    type: Boolean,
    default: true
  }
})

const container = ref(null)
let cy = null

const createGraph = () => {
  if (!container.value) return

  // Clear existing graph if any
  if (cy) {
    cy.destroy()
  }

  const elements = [
    ...props.nodes.map(n => ({
      data: {
        id: n.id,
        label: n.label,
        color: n.color || '#3b82f6',
        borderColor: n.borderColor || '#1e40af',
        ...n
      }
    })),
    ...props.edges.map(e => ({
      data: {
        source: e.source,
        target: e.target,
        label: e.label || '',
        ...e
      }
    }))
  ]

  cy = cytoscape({
    container: container.value,
    elements: elements,
    style: [
      {
        selector: 'node',
        style: {
          'background-color': 'data(color)',
          'background-opacity': 0.9,
          'background-image': 'linear-gradient(135deg, data(color) 0%, data(borderColor) 100%)',
          'label': 'data(label)',
          'width': 100,
          'height': 100,
          'font-size': 11,
          'font-weight': '800',
          'font-family': '"SF Pro Display", "Inter", system-ui, -apple-system, sans-serif',
          'letter-spacing': '0.5px',
          'color': '#ffffff',
          'text-valign': 'center',
          'text-halign': 'center',
          'border-width': 3,
          'border-color': 'data(borderColor)',
          'border-opacity': 1,
          'border-style': 'solid',
          'shape': 'round-hexagon',
          'text-wrap': 'wrap',
          'text-max-width': 90,
          'text-outline-width': 2,
          'text-outline-color': 'rgba(0,0,0,0.7)',
          'text-outline-opacity': 1,
          'overlay-opacity': 0,
          'shadow-blur': 15,
          'shadow-color': 'data(color)',
          'shadow-opacity': 0.8,
          'shadow-offset-x': 0,
          'shadow-offset-y': 4,
          'transition-property': 'background-color border-color width height shadow-opacity transform',
          'transition-duration': '0.25s',
          'transition-timing-function': 'cubic-bezier(0.4, 0, 0.2, 1)',
          'backdrop-filter': 'blur(10px)',
          'opacity': 1
        }
      },
      {
        selector: 'edge',
        style: {
          'width': 4,
          'line-color': '#60a5fa',
          'line-opacity': 0.6,
          'target-arrow-color': '#60a5fa',
          'target-arrow-shape': 'triangle',
          'target-arrow-size': 10,
          'target-arrow-fill': 'filled',
          'curve-style': 'bezier',
          'opacity': 0.7,
          'label': 'data(label)',
          'font-size': 10,
          'font-weight': '600',
          'text-rotation': 'autorotate',
          'text-margin-y': -12,
          'text-background-color': 'rgba(15, 23, 42, 0.8)',
          'text-background-opacity': 0.8,
          'text-background-padding': '3px',
          'text-border-color': '#60a5fa',
          'text-border-width': 1,
          'text-border-opacity': 0.5,
          'transition-property': 'opacity width line-color',
          'transition-duration': '0.2s'
        }
      },
      {
        selector: 'node:selected',
        style: {
          'background-color': '#fbbf24',
          'background-image': 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
          'border-color': '#f59e0b',
          'border-width': 4,
          'width': 115,
          'height': 115,
          'shadow-opacity': 1,
          'shadow-blur': 20,
          'shadow-color': '#fbbf24',
          'z-index': 999,
          'opacity': 1
        }
      },
      {
        selector: 'edge:selected',
        style: {
          'line-color': '#fbbf24',
          'target-arrow-color': '#fbbf24',
          'width': 5,
          'opacity': 1,
          'z-index': 998
        }
      },
      {
        selector: 'node:hover',
        style: {
          'background-color': '#60a5fa',
          'background-image': 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)',
          'border-color': '#3b82f6',
          'border-width': 4,
          'width': 115,
          'height': 115,
          'shadow-opacity': 1,
          'shadow-blur': 25,
          'shadow-color': '#60a5fa',
          'z-index': 999,
          'opacity': 1
        }
      },
      {
        selector: 'edge:hover',
        style: {
          'opacity': 1,
          'width': 5,
          'line-color': '#93c5fd',
          'target-arrow-color': '#93c5fd'
        }
      }
    ],
    layout: {
      name: props.layout,
      directed: props.directed,
      spacingFactor: props.layout === 'breadthfirst' ? 1.3 : 1.2,
      padding: 30,
      ...(props.layout === 'breadthfirst' && { 
        roots: props.nodes.length > 0 ? [props.nodes[0].id] : undefined 
      })
    },
    minZoom: 0.3,
    maxZoom: 3,
    wheelSensitivity: 0.15,
    boxSelectionEnabled: false,
    autounselectify: false,
    userPanningEnabled: true,
    userZoomingEnabled: true
  })

  // Enhanced hover effects with smooth transitions
  cy.on('mouseover', 'node', (evt) => {
    const node = evt.target
    // Use CSS hover styles which are smoother
    // Highlight connected edges
    node.connectedEdges().style('opacity', 1)
    node.connectedEdges().style('width', 5)
    node.connectedEdges().style('line-color', '#93c5fd')
    node.connectedEdges().style('target-arrow-color', '#93c5fd')
    
    // Add a subtle pulse animation
    node.style('shadow-blur', 30)
  })

  cy.on('mouseout', 'node', (evt) => {
    const node = evt.target
    // Reset connected edges
    node.connectedEdges().style('opacity', 0.7)
    node.connectedEdges().style('width', 4)
    node.connectedEdges().style('line-color', '#60a5fa')
    node.connectedEdges().style('target-arrow-color', '#60a5fa')
    
    // Reset shadow
    node.style('shadow-blur', 15)
  })

  // Add click handler for better interactivity
  cy.on('tap', 'node', (evt) => {
    const node = evt.target
    // Toggle selection
    if (node.selected()) {
      node.unselect()
    } else {
      cy.elements().unselect()
      node.select()
    }
  })

  // Fit to viewport with padding and smooth animation
  cy.on('ready', () => {
    cy.fit(undefined, 60)
    // Add a subtle zoom animation
    cy.animate({
      zoom: cy.zoom() * 0.95,
      center: cy.center()
    }, {
      duration: 500,
      easing: 'ease-out'
    })
  })
}

onMounted(async () => {
  await nextTick()
  createGraph()
})

watch([() => props.nodes, () => props.edges], async () => {
  await nextTick()
  createGraph()
}, { deep: true })

onBeforeUnmount(() => {
  if (cy) {
    cy.destroy()
  }
})
</script>

<style scoped>
/* Ensure container takes full width and has proper height */
:deep(.cytoscape-container) {
  width: 100%;
  height: 100%;
}

/* Modern tech styling for nodes */
:deep(.cytoscape-container canvas) {
  filter: drop-shadow(0 0 20px rgba(59, 130, 246, 0.3));
}

/* Add subtle animation to nodes */
@keyframes nodePulse {
  0%, 100% {
    filter: drop-shadow(0 0 8px rgba(59, 130, 246, 0.4));
  }
  50% {
    filter: drop-shadow(0 0 15px rgba(59, 130, 246, 0.6));
  }
}

:deep(.cytoscape-container) {
  animation: nodePulse 3s ease-in-out infinite;
}
</style>

