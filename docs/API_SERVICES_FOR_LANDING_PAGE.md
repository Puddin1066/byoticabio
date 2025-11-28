# API Services Available for Landing Page Integration

## Overview

The BioThings Explorer (BTE) provides a **live, production API** that can be directly integrated into the consulting landing page to create interactive demonstrations and showcase real-time capabilities.

## Live API Instance

**Production API**: `https://api.bte.ncats.io/`

This is a publicly available, production-ready TRAPI-compliant API that can be used for:
- Live demonstrations on the landing page
- Interactive query builders
- Real-time knowledge graph exploration
- Proof-of-concept integrations

## Available API Endpoints

### 1. Synchronous Query Endpoint
**Endpoint**: `POST https://api.bte.ncats.io/v1/query`

**Purpose**: Execute TRAPI queries and get immediate results

**Use Cases for Landing Page**:
- Interactive query builder
- Real-time demo queries
- "Try it now" functionality
- Example query demonstrations

**Example Request**:
```json
{
  "message": {
    "query_graph": {
      "nodes": {
        "n0": {
          "ids": ["NCBIGene:1956"],
          "categories": ["biolink:Gene"]
        },
        "n1": {
          "categories": ["biolink:Disease"]
        }
      },
      "edges": {
        "e0": {
          "subject": "n0",
          "object": "n1"
        }
      }
    }
  }
}
```

### 2. Asynchronous Query Endpoint
**Endpoint**: `POST https://api.bte.ncats.io/v1/asyncquery`

**Purpose**: Submit long-running queries that return a job ID for status checking

**Use Cases for Landing Page**:
- Long-running query demonstrations
- Background processing examples
- Enterprise-scale query handling

**Features**:
- Returns job ID immediately
- Supports callback URLs for results
- Status polling endpoint available

### 3. Meta Knowledge Graph Endpoint
**Endpoint**: `GET https://api.bte.ncats.io/v1/meta_knowledge_graph`

**Purpose**: Get metadata about available knowledge, predicates, and data sources

**Use Cases for Landing Page**:
- Display available data sources
- Show supported query types
- Interactive predicate browser
- "What can you query?" feature

**Returns**:
- Available predicates (relationships)
- Supported node categories
- Data source information
- Query capabilities

### 4. Predicates Endpoint
**Endpoint**: `GET https://api.bte.ncats.io/v1/predicates`

**Purpose**: Get list of all available predicates (relationship types)

**Use Cases for Landing Page**:
- Query builder dropdowns
- Relationship type selector
- Capability showcase

### 5. SmartAPI-Specific Query
**Endpoint**: `POST https://api.bte.ncats.io/v1/smartapi/{smartapi_id}/query`

**Purpose**: Query a specific API by SmartAPI ID

**Use Cases for Landing Page**:
- Demonstrate specific data source queries
- Show API-specific capabilities
- Data source comparison

### 6. Query Status (Async)
**Endpoint**: `GET https://api.bte.ncats.io/v1/check_async_query/{id}`

**Purpose**: Check status of asynchronous queries

**Use Cases for Landing Page**:
- Progress tracking for long queries
- Status dashboard integration

### 7. MetaKG Endpoint
**Endpoint**: `GET https://api.bte.ncats.io/metakg`

**Purpose**: Get the meta knowledge graph structure

**Use Cases for Landing Page**:
- Visualize available knowledge connections
- Interactive knowledge graph explorer
- Data source network visualization

## Integration Recommendations for Landing Page

### 1. Interactive Query Builder
**Feature**: Allow visitors to build and execute queries directly on the landing page

**Implementation**:
- Use `/v1/meta_knowledge_graph` to populate dropdowns
- Use `/v1/predicates` for relationship selection
- Execute queries via `/v1/query`
- Display results in a visual knowledge graph

**Benefits**:
- Immediate value demonstration
- Hands-on experience
- Proof of capabilities

### 2. Pre-built Example Queries
**Feature**: Showcase common use cases with one-click execution

**Example Queries Available**:
- Gene → Disease associations
- Chemical → Gene interactions
- Multi-hop queries (Disease → Gene → Chemical)
- Pathway queries
- Phenotype associations

**Location**: Query examples are in `/examples/v1/` directory

**Implementation**:
- Load example queries from JSON files
- Execute via `/v1/query` endpoint
- Visualize results

### 3. Live Data Source Counter
**Feature**: Display real-time count of available APIs/data sources

**Implementation**:
- Query `/v1/meta_knowledge_graph`
- Count unique data sources
- Update periodically or on page load

### 4. Knowledge Graph Visualization
**Feature**: Interactive visualization of query results

**Implementation**:
- Use Cytoscape.js (already in dependencies)
- Query `/v1/query` with example queries
- Render results as interactive network graph
- Allow node/edge exploration

### 5. "Try BTE API" Section
**Feature**: Embedded query interface similar to existing `/try-it` page

**Implementation**:
- Reuse existing `QueryBox.vue` component
- Point to production API: `https://api.bte.ncats.io`
- Pre-populate with example queries
- Show results visualization

### 6. API Status Dashboard
**Feature**: Show API health and availability

**Implementation**:
- Health check endpoint (if available)
- Display uptime/status
- Show recent query statistics

## Example Integration Code

### Basic Query Execution
```javascript
async function executeBTEQuery(queryGraph) {
  try {
    const response = await fetch('https://api.bte.ncats.io/v1/query', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: {
          query_graph: queryGraph
        }
      })
    });
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Query failed:', error);
    throw error;
  }
}

// Example: Query genes related to a disease
const exampleQuery = {
  nodes: {
    n0: {
      ids: ["MONDO:0005148"], // Type 2 diabetes
      categories: ["biolink:Disease"]
    },
    n1: {
      categories: ["biolink:Gene"]
    }
  },
  edges: {
    e0: {
      subject: "n0",
      object: "n1"
    }
  }
};

const results = await executeBTEQuery(exampleQuery);
```

### Get Available Predicates
```javascript
async function getAvailablePredicates() {
  const response = await fetch('https://api.bte.ncats.io/v1/predicates');
  const data = await response.json();
  return data;
}
```

### Get Meta Knowledge Graph
```javascript
async function getMetaKG() {
  const response = await fetch('https://api.bte.ncats.io/v1/meta_knowledge_graph');
  const data = await response.json();
  return data;
}
```

## Example Queries for Demos

### 1. Simple Gene-Disease Query
```json
{
  "message": {
    "query_graph": {
      "nodes": {
        "n0": {
          "ids": ["NCBIGene:1956"],
          "categories": ["biolink:Gene"]
        },
        "n1": {
          "categories": ["biolink:Disease"]
        }
      },
      "edges": {
        "e0": {
          "subject": "n0",
          "object": "n1"
        }
      }
    }
  }
}
```

### 2. Chemical-Gene Interaction
```json
{
  "message": {
    "query_graph": {
      "nodes": {
        "n0": {
          "ids": ["CHEMBL.COMPOUND:CHEMBL744"],
          "categories": ["biolink:SmallMolecule"]
        },
        "n1": {
          "categories": ["biolink:Gene"]
        }
      },
      "edges": {
        "e0": {
          "subject": "n0",
          "object": "n1",
          "predicates": ["biolink:physically_interacts_with"]
        }
      }
    }
  }
}
```

### 3. Multi-hop Query (Disease → Gene → Chemical)
```json
{
  "message": {
    "query_graph": {
      "nodes": {
        "n0": {
          "ids": ["MONDO:0005148"],
          "categories": ["biolink:Disease"]
        },
        "n1": {
          "categories": ["biolink:Gene"]
        },
        "n2": {
          "categories": ["biolink:SmallMolecule"]
        }
      },
      "edges": {
        "e0": {
          "subject": "n0",
          "object": "n1"
        },
        "e1": {
          "subject": "n1",
          "object": "n2"
        }
      }
    }
  }
}
```

## Security & Rate Limiting Considerations

### CORS
- The production API should support CORS for browser-based queries
- May need to implement a proxy for certain use cases

### Rate Limiting
- Consider implementing client-side rate limiting
- Cache frequently-used queries
- Use async queries for long-running operations

### Error Handling
- Implement proper error handling for API failures
- Show user-friendly error messages
- Provide fallback examples if API is unavailable

## Recommended Landing Page Enhancements

### High Priority
1. **Interactive Query Builder** - Most impactful for demonstrating capabilities
2. **Pre-built Example Queries** - Easy to implement, high value
3. **Live Results Visualization** - Visual appeal and proof of concept

### Medium Priority
4. **Meta Knowledge Graph Explorer** - Shows breadth of capabilities
5. **Data Source Browser** - Demonstrates integration capabilities
6. **Query History/Examples** - Educational value

### Low Priority
7. **API Status Dashboard** - Trust building
8. **Performance Metrics** - For technical audiences
9. **Advanced Query Options** - For power users

## Implementation Notes

### Existing Components
The web-app already has components that can be reused:
- `QueryBox.vue` - Query input interface
- `CytoNetwork.vue` - Network visualization
- `BTE.vue` - BTE logo/visualization

### API Configuration
Create a configuration file for API endpoints:
```javascript
// config/api.js
export const API_CONFIG = {
  production: 'https://api.bte.ncats.io',
  development: 'http://localhost:3000',
  endpoints: {
    query: '/v1/query',
    asyncQuery: '/v1/asyncquery',
    metaKG: '/v1/meta_knowledge_graph',
    predicates: '/v1/predicates'
  }
}
```

### Error Handling
Implement comprehensive error handling:
- Network errors
- API errors
- Invalid query formats
- Timeout handling
- Rate limit handling

## Next Steps

1. **Test API Connectivity**: Verify CORS and accessibility
2. **Create Demo Component**: Build interactive query builder
3. **Load Example Queries**: Integrate examples from `/examples/v1/`
4. **Add Visualization**: Use existing Cytoscape component
5. **Implement Error Handling**: Graceful degradation
6. **Add Loading States**: Better UX during queries
7. **Cache Results**: Improve performance for repeated queries

## Resources

- **Live API**: https://api.bte.ncats.io/
- **API Documentation**: https://smart-api.info/ui/dc91716f44207d2e1287c727f281d339
- **Example Queries**: `/examples/v1/` directory
- **TRAPI Specification**: https://github.com/NCATSTranslator/ReasonerAPI
- **SmartAPI Registry**: https://smart-api.info/registry

