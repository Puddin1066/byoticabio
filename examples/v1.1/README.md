# TRAPI v1.1 Query Examples

This directory contains example queries demonstrating the capabilities of BioThings Explorer (BTE) using the **Translator Reasoner API (TRAPI) v1.1** specification. These examples serve as practical references for understanding how to construct and submit queries to the BTE API.

## What is TRAPI v1.1?

TRAPI (Translator Reasoner API) is a standard API specification developed by the NCATS Biomedical Translator project to facilitate interoperability between biomedical knowledge resources. Version 1.1 includes enhanced features such as:

- **Inferred knowledge queries** - Support for `knowledge_type: "inferred"` to query templated/inferred relationships
- **Improved query graph structure** - Enhanced node and edge definitions
- **Better predicate handling** - More flexible predicate specifications
- **Expanded category support** - Support for multiple categories per node

## Directory Value

This collection of examples provides:

1. **Learning Resource** - Understand how to structure TRAPI queries for various biomedical use cases
2. **Testing Reference** - Use these examples to test BTE API functionality and validate your integration
3. **Pattern Library** - See common query patterns (single-hop, multi-hop, branched, inferred)
4. **Error Examples** - Learn what invalid queries look like (see `invalid/` subdirectory)
5. **Domain-Specific Examples** - Explore specialized query types for text mining, multiomics, and service providers

## Query Categories

### Basic Query Patterns

#### Single-Hop Queries
- **`query_genes_relate_to_disease.json`** - Find genes related to a specific disease
- **`query_chemicals_physically_interacts_with_genes.json`** - Find chemicals that physically interact with genes
- **`query_disease_has_phenotype.json`** - Find phenotypes associated with a disease

#### Multi-Hop Queries
- **`query_multihop_disease_gene_chemical.json`** - Traverse from disease → gene → chemical
- **`query_multihop_gene_gene_chemical.json`** - Traverse from gene → gene → chemical

#### Advanced Query Features
- **`query_without_input_category.json`** - Query where input node has no category specified
- **`query_with_node_to_be_expanded.json`** - Query with nodes that need expansion
- **`query_with_category_as_list.json`** - Query using multiple categories for a node
- **`query_genes_relate_to_disease_list.json`** - Query with multiple input IDs

#### Special Query Types
- **`branched_query.json`** - Query with multiple edges from a single node (branching structure)
- **`inferred_query_drug_treats_disease.json`** - Query using inferred knowledge type

#### Investment/Research Queries
- **`query_alzheimers_cr4_mab_focused.json`** - Focused query: Alzheimer's → CR4 → mAb therapeutics
- **`query_alzheimers_cr4_mab_vc_comprehensive.json`** - Comprehensive VC investment query exploring Alzheimer's, complement receptor 4, and monoclonal antibody targeting
- **`query_alzheimers_cr4_mab_vc.json`** - Alternative comprehensive query structure
- **`VC_ALZHEIMERS_CR4_QUERY_GUIDE.md`** - Complete guide for VC investors on using these queries

### Specialized Subdirectories

#### `serviceprovider/`
Examples for querying specific service providers:
- **`mychem.json`** - Queries targeting MyChem service provider
- **`mygene.json`** - Queries targeting MyGene service provider

#### `textmining/`
Text mining-based queries that leverage literature-derived associations:
- **`query_chemicals_related_to_disease.json`** - Find chemicals mentioned in literature related to diseases
- **`query_chemicals_related_to_gene_or_gene_product.json`** - Find chemicals related to genes/gene products from text

#### `multiomics/clinical_risk_kp/`
Multiomics queries for clinical risk knowledge provider:
- **`query_attribute_to_disease.json`** - Query attributes to diseases
- **`query_disease_to_disease.json`** - Disease-to-disease relationships
- **`query_drug_to_disease.json`** - Drug-to-disease associations
- **`query_observation_to_disease.json`** - Clinical observations to diseases

#### `invalid/`
Examples of **invalid** queries for testing error handling:
- **`query_graph_with_edges_not_specified.json`** - Missing edge definitions
- **`query_graph_with_nodes_and_edges_not_match.json`** - Mismatched node/edge references
- **`query_graph_with_nodes_not_specified.json`** - Missing node definitions

## Query Input Format

### Overview

All queries to BTE must follow the **TRAPI v1.1** (Translator Reasoner API) specification. The input is a JSON object with a specific structure that defines a query graph.

### Basic Structure

```json
{
  "message": {
    "query_graph": {
      "nodes": { ... },
      "edges": { ... }
    }
  }
}
```

### Complete Input Format Specification

#### Top-Level Structure

```json
{
  "message": {
    "query_graph": {
      "nodes": {
        "node_id": { ... },
        ...
      },
      "edges": {
        "edge_id": { ... },
        ...
      }
    }
  }
}
```

**Required Fields:**
- `message` (object, required) - Top-level wrapper
- `query_graph` (object, required) - Defines the query structure
- `nodes` (object, required) - Dictionary of node definitions
- `edges` (object, required) - Dictionary of edge definitions

#### Node Format

Each node in the `nodes` dictionary has the following structure:

```json
{
  "n0": {
    "ids": ["MONDO:0005737"],           // Optional: Array of entity identifiers
    "categories": ["biolink:Disease"],  // Optional: Array of Biolink categories
    "is_set": false,                     // Optional: Boolean, default false
    "constraints": []                    // Optional: Array of constraints
  }
}
```

**Node Properties:**
- **`ids`** (array, optional) - List of entity identifiers in CURIE format (e.g., `["MONDO:0005737", "NCBIGene:1017"]`)
  - If provided, the node is constrained to these specific entities
  - If omitted, the node can match any entity of the specified category
- **`categories`** (array, optional) - List of Biolink Model categories (e.g., `["biolink:Disease", "biolink:Gene"]`)
  - If provided, constrains the node to these semantic types
  - If omitted, BTE will attempt to infer the category from the `ids`
- **`is_set`** (boolean, optional) - Whether this node represents a set of entities (default: `false`)
- **`constraints`** (array, optional) - Additional constraints on the node

**Node Naming Convention:**
- Use descriptive IDs like `"n0"`, `"n1"`, `"n2"` or semantic names like `"disease"`, `"gene"`, `"chemical"`
- Node IDs are referenced in edges via `subject` and `object` fields

#### Edge Format

Each edge in the `edges` dictionary has the following structure:

```json
{
  "e01": {
    "subject": "n0",                              // Required: Source node ID
    "object": "n1",                               // Required: Target node ID
    "predicates": ["biolink:related_to"],         // Optional: Array of predicates
    "knowledge_type": "inferred",                 // Optional: "inferred" or "lookup"
    "constraints": []                             // Optional: Array of constraints
  }
}
```

**Edge Properties:**
- **`subject`** (string, required) - ID of the source node (must exist in `nodes`)
- **`object`** (string, required) - ID of the target node (must exist in `nodes`)
- **`predicates`** (array, optional) - List of Biolink Model predicates (relationship types)
  - Examples: `["biolink:related_to"]`, `["biolink:treats"]`, `["biolink:physically_interacts_with"]`
  - If omitted, BTE will find all relationships between the node types
- **`knowledge_type`** (string, optional) - Type of knowledge to query
  - `"inferred"` - Use templated/inferred relationships (TRAPI v1.1 feature)
  - `"lookup"` - Use direct database lookups (default)
- **`constraints`** (array, optional) - Additional constraints on the edge

### Example Input Formats

#### Example 1: Basic Single-Hop Query

Find genes related to a specific disease:

```json
{
  "message": {
    "query_graph": {
      "nodes": {
        "n0": {
          "categories": ["biolink:Disease"],
          "ids": ["MONDO:0005737"]
        },
        "n1": {
          "categories": ["biolink:Gene"]
        }
      },
      "edges": {
        "e01": {
          "subject": "n0",
          "object": "n1"
        }
      }
    }
  }
}
```

#### Example 2: Query with Predicate Filter

Find chemicals that physically interact with a specific gene:

```json
{
  "message": {
    "query_graph": {
      "nodes": {
        "n0": {
          "categories": ["biolink:Gene"],
          "ids": ["NCBIGene:1017"]
        },
        "n1": {
          "categories": ["biolink:SmallMolecule"]
        }
      },
      "edges": {
        "e01": {
          "subject": "n0",
          "object": "n1",
          "predicates": ["biolink:physically_interacts_with"]
        }
      }
    }
  }
}
```

#### Example 3: Multi-Hop Query

Traverse from disease → gene → chemical:

```json
{
  "message": {
    "query_graph": {
      "nodes": {
        "n0": {
          "categories": ["biolink:Disease"],
          "ids": ["MONDO:0005737"]
        },
        "n1": {
          "categories": ["biolink:Gene"]
        },
        "n2": {
          "categories": ["biolink:SmallMolecule"]
        }
      },
      "edges": {
        "e01": {
          "subject": "n0",
          "object": "n1"
        },
        "e02": {
          "subject": "n1",
          "object": "n2"
        }
      }
    }
  }
}
```

#### Example 4: Inferred Query (TRAPI v1.1)

Find drugs that treat a disease using inferred knowledge:

```json
{
  "message": {
    "query_graph": {
      "nodes": {
        "n0": {
          "categories": ["biolink:ChemicalEntity"]
        },
        "n1": {
          "categories": ["biolink:Disease"],
          "ids": ["MONDO:0800044"]
        }
      },
      "edges": {
        "e01": {
          "subject": "n0",
          "object": "n1",
          "predicates": ["biolink:treats"],
          "knowledge_type": "inferred"
        }
      }
    }
  }
}
```

#### Example 5: Query with Multiple IDs

Query with multiple input identifiers:

```json
{
  "message": {
    "query_graph": {
      "nodes": {
        "n0": {
          "categories": ["biolink:Disease"],
          "ids": ["MONDO:0005737", "MONDO:0005148"]
        },
        "n1": {
          "categories": ["biolink:Gene"]
        }
      },
      "edges": {
        "e01": {
          "subject": "n0",
          "object": "n1"
        }
      }
    }
  }
}
```

#### Example 6: Query Without Input Category

Query where input node category is inferred from ID:

```json
{
  "message": {
    "query_graph": {
      "nodes": {
        "n0": {
          "ids": ["UMLS:C0751434"]
        },
        "n1": {
          "categories": ["biolink:Gene"]
        }
      },
      "edges": {
        "e01": {
          "subject": "n0",
          "object": "n1",
          "predicates": ["biolink:caused_by"]
        }
      }
    }
  }
}
```

#### Example 7: Branched Query

One node connecting to multiple nodes:

```json
{
  "message": {
    "query_graph": {
      "nodes": {
        "n0": {
          "categories": ["biolink:Disease"],
          "ids": ["MONDO:0005737"]
        },
        "n1": {
          "categories": ["biolink:Gene"]
        },
        "n2": {
          "categories": ["biolink:SmallMolecule"]
        }
      },
      "edges": {
        "e01": {
          "subject": "n0",
          "object": "n1"
        },
        "e02": {
          "subject": "n0",
          "object": "n2"
        }
      }
    }
  }
}
```

### Common Identifier Namespaces

When using `ids` in nodes, use these standardized identifier formats:

- **MONDO** - Disease identifiers: `MONDO:0005737`
- **NCBIGene** - Gene identifiers: `NCBIGene:1017`
- **HGNC** - Human gene symbols: `HGNC:17947`
- **CHEBI** - Chemical entities: `CHEBI:28748`
- **PUBCHEM.COMPOUND** - PubChem compounds: `PUBCHEM.COMPOUND:2662`
- **UMLS** - Unified Medical Language System: `UMLS:C0751434`
- **HP** - Human Phenotype Ontology: `HP:0002013`
- **SNOMEDCT** - SNOMED CT codes: `SNOMEDCT:197358007`

### Common Biolink Categories

When using `categories` in nodes:

- `biolink:Disease` - Diseases and disorders
- `biolink:Gene` - Genes
- `biolink:SmallMolecule` - Small molecule compounds
- `biolink:ChemicalEntity` - Chemical entities (broader than SmallMolecule)
- `biolink:Drug` - Drugs and medications
- `biolink:PhenotypicFeature` - Phenotypes
- `biolink:Pathway` - Biological pathways
- `biolink:Protein` - Proteins
- `biolink:DiseaseOrPhenotypicFeature` - Diseases or phenotypes

### Common Biolink Predicates

When using `predicates` in edges:

- `biolink:related_to` - General relationship
- `biolink:treats` - Treatment relationship
- `biolink:associated_with` - Association
- `biolink:physically_interacts_with` - Physical interaction
- `biolink:gene_associated_with_condition` - Gene-disease association
- `biolink:caused_by` - Causation
- `biolink:correlated_with` - Correlation

See the [Biolink Model documentation](https://biolink.github.io/biolink-model/) for the complete list.

### Input Validation Rules

1. **Node IDs must be unique** - Each node must have a unique identifier
2. **Edge references must be valid** - `subject` and `object` in edges must reference existing node IDs
3. **At least one node must have constraints** - Either `ids` or `categories` must be specified for at least one node
4. **Graph must be connected** - All nodes must be reachable through edges
5. **JSON must be valid** - The input must be valid JSON

### Asynchronous Query Input

For async queries, add a `callback` field at the top level:

```json
{
  "callback": "https://your-server.com/webhook",
  "message": {
    "query_graph": { ... }
  }
}
```

## End-to-End Query Execution

### Complete Flow for a Single Query

This section explains the complete end-to-end process of executing a single query, from input to output.

#### Step 1: Prepare Your Query Input

The input is a JSON object following the TRAPI v1.1 specification. Here's the structure:

```json
{
  "message": {
    "query_graph": {
      "nodes": {
        "n0": {
          "ids": ["MONDO:0005737"],
          "categories": ["biolink:Disease"]
        },
        "n1": {
          "categories": ["biolink:Gene"]
        }
      },
      "edges": {
        "e01": {
          "subject": "n0",
          "object": "n1"
        }
      }
    }
  }
}
```

**Input Components:**
- **`message`** (required) - Top-level wrapper for the query
- **`query_graph`** (required) - Defines the graph structure of your query
  - **`nodes`** (required) - Dictionary of node definitions
    - Each node has an ID (e.g., `"n0"`, `"n1"`)
    - **`ids`** (optional) - Array of entity identifiers (e.g., `["MONDO:0005737"]`)
    - **`categories`** (optional) - Array of Biolink Model categories (e.g., `["biolink:Disease"]`)
  - **`edges`** (required) - Dictionary of edge definitions
    - Each edge has an ID (e.g., `"e01"`)
    - **`subject`** (required) - Reference to source node (e.g., `"n0"`)
    - **`object`** (required) - Reference to target node (e.g., `"n1"`)
    - **`predicates`** (optional) - Array of relationship types (e.g., `["biolink:related_to"]`)
    - **`knowledge_type`** (optional) - `"inferred"` for templated queries (v1.1 feature)

#### Step 2: Submit the Query

**Option A: Using cURL (Command Line)**

```bash
# Using production API
curl -X POST https://api.bte.ncats.io/v1/query \
  -H "Content-Type: application/json" \
  -d '{
    "message": {
      "query_graph": {
        "nodes": {
          "n0": {
            "ids": ["MONDO:0005737"],
            "categories": ["biolink:Disease"]
          },
          "n1": {
            "categories": ["biolink:Gene"]
          }
        },
        "edges": {
          "e01": {
            "subject": "n0",
            "object": "n1"
          }
        }
      }
    }
  }'
```

**Option B: Using a File**

```bash
# Save query to a file (e.g., my_query.json)
curl -X POST https://api.bte.ncats.io/v1/query \
  -H "Content-Type: application/json" \
  -d @my_query.json
```

**Option C: Using Local Instance**

```bash
# If running BTE locally on port 3000
curl -X POST http://localhost:3000/v1/query \
  -H "Content-Type: application/json" \
  -d @query_genes_relate_to_disease.json
```

**Option D: Using HTTP Client (e.g., Postman, Insomnia)**

1. Set method to `POST`
2. Set URL to `https://api.bte.ncats.io/v1/query`
3. Set header `Content-Type: application/json`
4. Paste JSON query in body

#### Step 3: What Happens Internally

When BTE receives your query, it:

1. **Parses the Query Graph** - Validates and processes the TRAPI query structure
2. **Resolves Identifiers** - Converts input IDs (e.g., `MONDO:0005737`) to equivalent IDs across namespaces
3. **Matches to Meta-Knowledge Graph** - Finds APIs that can answer your query based on:
   - Node categories (Disease, Gene, etc.)
   - Edge predicates (if specified)
   - Available knowledge sources
4. **Executes API Calls** - Queries relevant biomedical APIs in parallel
5. **Transforms Results** - Converts API responses to TRAPI format
6. **Assembles Response** - Builds the knowledge graph and results

#### Step 4: Receive the Response

The response follows TRAPI format:

```json
{
  "message": {
    "query_graph": { ... },
    "knowledge_graph": {
      "nodes": {
        "MONDO:0005737": {
          "categories": ["biolink:Disease"],
          "name": "Ehlers-Danlos syndrome"
        },
        "NCBIGene:1277": {
          "categories": ["biolink:Gene"],
          "name": "COL1A1"
        }
      },
      "edges": {
        "e01": {
          "subject": "MONDO:0005737",
          "object": "NCBIGene:1277",
          "predicates": ["biolink:gene_associated_with_condition"]
        }
      }
    },
    "results": [
      {
        "node_bindings": {
          "n0": [{"id": "MONDO:0005737"}],
          "n1": [{"id": "NCBIGene:1277"}]
        },
        "edge_bindings": {
          "e01": [{"id": "e01"}]
        }
      }
    ]
  }
}
```

**Response Components:**
- **`query_graph`** - Echo of your input query
- **`knowledge_graph`** - Contains all discovered nodes and edges
- **`results`** - Array of result paths that satisfy your query
  - **`node_bindings`** - Maps query nodes to discovered entities
  - **`edge_bindings`** - Maps query edges to discovered relationships

### Example: Complete End-to-End Query

Let's walk through a complete example using `query_genes_relate_to_disease.json`:

**1. Input Query:**
```json
{
  "message": {
    "query_graph": {
      "nodes": {
        "n0": {
          "categories": ["biolink:Disease"],
          "ids": ["MONDO:0005737"]
        },
        "n1": {
          "categories": ["biolink:Gene"]
        }
      },
      "edges": {
        "e01": {
          "subject": "n0",
          "object": "n1"
        }
      }
    }
  }
}
```

**2. Submit:**
```bash
curl -X POST https://api.bte.ncats.io/v1/query \
  -H "Content-Type: application/json" \
  -d @query_genes_relate_to_disease.json
```

**3. What This Query Does:**
- **Input Node (n0)**: Disease with ID `MONDO:0005737` (Ehlers-Danlos syndrome)
- **Output Node (n1)**: Any Gene
- **Edge (e01)**: Relationship from Disease to Gene
- **Question**: "What genes are related to Ehlers-Danlos syndrome?"

**4. Expected Response:**
- Returns genes associated with Ehlers-Danlos syndrome
- Each result contains a gene ID and the relationship connecting it to the disease
- May include multiple genes if multiple associations exist

### Asynchronous Queries

For long-running queries, use the async endpoint:

**Submit:**
```bash
curl -X POST https://api.bte.ncats.io/v1/asyncquery \
  -H "Content-Type: application/json" \
  -d @query_genes_relate_to_disease.json
```

**Response:**
```json
{
  "id": "job-12345",
  "url": "https://api.bte.ncats.io/v1/check_query_status/job-12345"
}
```

**Check Status:**
```bash
curl https://api.bte.ncats.io/v1/check_query_status/job-12345
```

**With Callback:**
```json
{
  "callback": "https://your-server.com/webhook",
  "message": {
    "query_graph": { ... }
  }
}
```

## How to Use These Examples

### 1. Testing with the Live API

You can test these queries against the production BTE API:

```bash
curl -X POST https://api.bte.ncats.io/v1/query \
  -H "Content-Type: application/json" \
  -d @query_genes_relate_to_disease.json
```

### 2. Testing with Local Instance

If running BTE locally:

```bash
curl -X POST http://localhost:3000/v1/query \
  -H "Content-Type: application/json" \
  -d @query_genes_relate_to_disease.json
```

### 3. Understanding Query Structure

Each query follows the TRAPI v1.1 message format:

```json
{
  "message": {
    "query_graph": {
      "nodes": {
        "n0": {
          "ids": ["MONDO:0005737"],
          "categories": ["biolink:Disease"]
        },
        "n1": {
          "categories": ["biolink:Gene"]
        }
      },
      "edges": {
        "e01": {
          "subject": "n0",
          "object": "n1",
          "predicates": ["biolink:related_to"]
        }
      }
    }
  }
}
```

**Key Components:**
- **nodes**: Define the entities in your query (diseases, genes, chemicals, etc.)
- **edges**: Define the relationships between nodes
- **categories**: Use Biolink Model categories (e.g., `biolink:Disease`, `biolink:Gene`)
- **ids**: Use standardized identifiers (MONDO, NCBIGene, etc.)
- **predicates**: Specify relationship types (optional, BTE will infer if omitted)
- **knowledge_type**: Use `"inferred"` for templated queries (v1.1 feature)

## Query Patterns Explained

### Single-Hop Query
Finds direct relationships between two node types:
```json
Disease → Gene
```

### Multi-Hop Query
Traverses multiple relationships:
```json
Disease → Gene → Chemical
```

### Branched Query
One node connects to multiple nodes:
```json
    Gene
   /    \
Disease  Chemical
```

### Inferred Query
Uses templated/inferred knowledge (v1.1 feature):
```json
{
  "knowledge_type": "inferred",
  "predicates": ["biolink:treats"]
}
```

## Biolink Model Categories

Common categories used in these examples:
- `biolink:Disease` - Diseases and disorders
- `biolink:Gene` - Genes
- `biolink:SmallMolecule` / `biolink:ChemicalEntity` - Chemical compounds
- `biolink:PhenotypicFeature` - Phenotypes
- `biolink:Drug` - Drugs and medications

See the [Biolink Model documentation](https://biolink.github.io/biolink-model/) for the complete list.

## Identifier Namespaces

Examples use standardized identifiers:
- **MONDO** - Disease identifiers (e.g., `MONDO:0005737`)
- **NCBIGene** - Gene identifiers (e.g., `NCBIGene:1017`)
- **UMLS** - Unified Medical Language System (e.g., `UMLS:C0751434`)

## Related Documentation

- [BTE Usage Guide](../docs/USAGE.md) - How to use BTE
- [BTE Installation Guide](../docs/INSTALLATION.md) - Setting up BTE
- [TRAPI Specification](https://github.com/NCATSTranslator/ReasonerAPI) - Official TRAPI documentation
- [Biolink Model](https://biolink.github.io/biolink-model/) - Biomedical entity categories and predicates

## Querying Across All APIs

### How BTE Selects APIs

BTE uses a **meta-knowledge graph** to intelligently select which APIs can answer your query. When you submit a query to `/v1/query`, BTE:

1. **Matches your query to the meta-knowledge graph** - Identifies which APIs have knowledge matching your query's node categories and edge predicates
2. **Queries all matching APIs automatically** - BTE queries all APIs that can potentially answer your query (not every API, only relevant ones)
3. **Merges results** - Combines results from multiple APIs into a single response

**Important**: BTE does NOT query "every" API blindly. It only queries APIs that match your query based on their meta-knowledge graph capabilities.

### Default Behavior: Query All Matching APIs

By default, when you submit a query to `/v1/query`, BTE automatically queries **all APIs** that match your query:

```bash
# This automatically queries all matching APIs
curl -X POST https://api.bte.ncats.io/v1/query \
  -H "Content-Type: application/json" \
  -d @query_genes_relate_to_disease.json
```

The response contains merged results from all matching APIs, but **does not explicitly indicate which APIs were queried** in the standard TRAPI response format.

### Getting a List of Available APIs

To see all available APIs and their capabilities:

**1. Get the Meta-Knowledge Graph:**
```bash
curl https://api.bte.ncats.io/v1/meta_knowledge_graph
```

This returns metadata about:
- All available APIs (data sources)
- Supported node categories
- Available predicates (relationships)
- Edge types each API can answer

**2. Get API-Specific Meta-Knowledge Graph:**
```bash
# Get meta-KG for a specific API by SmartAPI ID
curl https://api.bte.ncats.io/v1/smartapi/{smartapi_id}/meta_knowledge_graph
```

### Querying Individual APIs for a Report

If you want to create a report showing results from **each API individually**, you can query each API separately:

**Step 1: Get List of API IDs**

First, get the meta-knowledge graph to identify which APIs match your query:

```bash
curl https://api.bte.ncats.io/v1/meta_knowledge_graph > metakg.json
```

Then extract the SmartAPI IDs from the response. Each edge in the meta-KG has a `sources` field listing which APIs provide that knowledge.

**Step 2: Query Each API Individually**

For each SmartAPI ID, query it individually:

```bash
# Query API 1
curl -X POST https://api.bte.ncats.io/v1/smartapi/{smartapi_id_1}/query \
  -H "Content-Type: application/json" \
  -d @query_genes_relate_to_disease.json > api1_results.json

# Query API 2
curl -X POST https://api.bte.ncats.io/v1/smartapi/{smartapi_id_2}/query \
  -H "Content-Type: application/json" \
  -d @query_genes_relate_to_disease.json > api2_results.json

# ... and so on
```

**Step 3: Generate a Report**

You can then create a report comparing:
- Which APIs returned results
- Number of results per API
- Unique vs. overlapping results
- Response times
- API-specific data quality

### Example: Creating an API Coverage Report

Here's a Python script example to query all matching APIs and generate a report:

```python
import requests
import json

# Your query
query = {
    "message": {
        "query_graph": {
            "nodes": {
                "n0": {
                    "categories": ["biolink:Disease"],
                    "ids": ["MONDO:0005737"]
                },
                "n1": {
                    "categories": ["biolink:Gene"]
                }
            },
            "edges": {
                "e01": {
                    "subject": "n0",
                    "object": "n1"
                }
            }
        }
    }
}

# Get meta-KG to find matching APIs
metakg_url = "https://api.bte.ncats.io/v1/meta_knowledge_graph"
metakg = requests.get(metakg_url).json()

# Extract unique API IDs from edges
api_ids = set()
for edge in metakg.get("edges", []):
    for source in edge.get("sources", []):
        if "id" in source:
            api_ids.add(source["id"])

# Query each API
report = {
    "query": query,
    "total_apis": len(api_ids),
    "api_results": []
}

for api_id in api_ids:
    try:
        url = f"https://api.bte.ncats.io/v1/smartapi/{api_id}/query"
        response = requests.post(url, json=query, timeout=30)
        
        result = {
            "api_id": api_id,
            "status": response.status_code,
            "num_results": 0,
            "num_nodes": 0,
            "num_edges": 0
        }
        
        if response.status_code == 200:
            data = response.json()
            kg = data.get("message", {}).get("knowledge_graph", {})
            results = data.get("message", {}).get("results", [])
            
            result["num_results"] = len(results)
            result["num_nodes"] = len(kg.get("nodes", {}))
            result["num_edges"] = len(kg.get("edges", {}))
        
        report["api_results"].append(result)
    except Exception as e:
        report["api_results"].append({
            "api_id": api_id,
            "error": str(e)
        })

# Save report
with open("api_coverage_report.json", "w") as f:
    json.dump(report, f, indent=2)

print(f"Report generated: {len(api_ids)} APIs queried")
```

### Team-Specific Queries

You can also query all APIs from a specific team:

**Text Mining Provider:**
```bash
curl -X POST https://api.bte.ncats.io/v1/team/Textmining%20Provider/query \
  -H "Content-Type: application/json" \
  -d @query_genes_relate_to_disease.json
```

**Multiomics Provider:**
```bash
curl -X POST https://api.bte.ncats.io/v1/team/Multiomics%20Provider/query \
  -H "Content-Type: application/json" \
  -d @query_genes_relate_to_disease.json
```

**Service Provider:**
```bash
curl -X POST https://api.bte.ncats.io/v1/team/Service%20Provider/query \
  -H "Content-Type: application/json" \
  -d @query_genes_relate_to_disease.json
```

### Limitations

- **Not all APIs will have results** - Some APIs may not have data matching your specific query
- **Response times vary** - Different APIs have different response times
- **Some APIs may be unavailable** - APIs may be down or unreachable
- **Rate limiting** - Querying many APIs individually may hit rate limits
- **Standard response doesn't include API attribution** - The merged response from `/v1/query` doesn't explicitly show which API provided which results

### Best Practices for API Reports

1. **Use async queries** for large-scale API testing to avoid timeouts
2. **Cache results** to avoid repeated queries
3. **Handle errors gracefully** - Some APIs may fail
4. **Respect rate limits** - Add delays between requests if needed
5. **Use the meta-KG** to pre-filter APIs that can't answer your query

## Notes

- All queries in this directory follow TRAPI v1.1 specification
- Queries are designed to work with the BTE API endpoint `/v1/query`
- Some queries may return different results depending on available knowledge sources
- The `invalid/` directory contains intentionally malformed queries for testing error handling
- For production use, always validate your queries against the TRAPI schema
- By default, BTE queries all matching APIs automatically - you don't need to query each one individually unless you need per-API reporting

