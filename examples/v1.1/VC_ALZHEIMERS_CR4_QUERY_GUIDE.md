# VC Investment Query: Alzheimer's, Complement Receptor 4, and mAb Therapeutics

## Overview

This query is designed for **venture capital biotech investors** evaluating opportunities in Alzheimer's disease therapeutics, specifically focusing on:
- **Alzheimer's disease biology** and associated genes/proteins
- **Complement Receptor 4 (CR4)** and its role in Alzheimer's pathology
- **Monoclonal antibody (mAb)** targeting strategies
- **Pathways and mechanisms** connecting these elements
- **Competitive landscape** and existing therapeutics

## Query Strategy

### Primary Query: Comprehensive Multi-Hop Exploration

**File**: `query_alzheimers_cr4_mab_vc_comprehensive.json`

This query explores:
1. **Alzheimer's → Associated Genes**: Find all genes/proteins linked to Alzheimer's
2. **Alzheimer's → CR4**: Direct relationship between Alzheimer's and complement receptor 4
3. **CR4 → Complement System**: Related complement pathway genes
4. **CR4 → mAb Drugs**: Monoclonal antibodies that target CR4
5. **Alzheimer's → mAb Drugs**: Existing or potential mAb therapeutics for Alzheimer's
6. **Genes → Pathways**: Biological pathways involved
7. **Alzheimer's → Related Diseases**: Comorbidities and related conditions

### Key Identifiers Used

**Alzheimer's Disease:**
- `MONDO:0004975` - Alzheimer's disease (MONDO ontology)
- `UMLS:C0002395` - Alzheimer's disease (UMLS)
- `DOID:10652` - Alzheimer's disease (Disease Ontology)

**Complement Receptor 4:**
- `HGNC:2343` / `NCBIGene:2343` - C5AR1 (C5a anaphylatoxin chemotactic receptor 1)
- `HGNC:2342` / `NCBIGene:2342` - C5AR2 (C5a anaphylatoxin chemotactic receptor 2)

**Note**: CR4 may refer to different complement receptors depending on context. The query includes multiple complement receptor genes to capture the full landscape.

## Investment-Relevant Insights This Query Provides

### 1. **Target Validation**
- Which genes/proteins are most strongly associated with Alzheimer's?
- How is CR4 connected to Alzheimer's pathology?
- What is the evidence base for CR4 as a therapeutic target?

### 2. **Mechanism of Action**
- What pathways connect Alzheimer's to complement system?
- How do complement receptors function in Alzheimer's?
- What are the downstream effects of CR4 activation?

### 3. **Competitive Landscape**
- What monoclonal antibodies already exist for Alzheimer's?
- Are there existing mAbs targeting complement receptors?
- What other therapeutic modalities are being explored?

### 4. **Drug Discovery Opportunities**
- What mAbs could potentially target CR4?
- What are the druggability considerations?
- Are there combination therapy opportunities?

### 5. **Clinical Context**
- What related diseases share similar mechanisms?
- What pathways are most relevant?
- What is the broader therapeutic landscape?

## How to Execute

### Option 1: Using Production API

```bash
curl -X POST https://api.bte.ncats.io/v1/query \
  -H "Content-Type: application/json" \
  -d @examples/v1.1/query_alzheimers_cr4_mab_vc_comprehensive.json
```

### Option 2: Local Instance

```bash
curl -X POST http://localhost:3000/v1/query \
  -H "Content-Type: application/json" \
  -d @examples/v1.1/query_alzheimers_cr4_mab_vc_comprehensive.json
```

## Expected Results Structure

The response will contain:

1. **Knowledge Graph** with:
   - Alzheimer's disease nodes
   - CR4 and complement system genes
   - Associated genes/proteins
   - Pathways (complement cascade, neuroinflammation, etc.)
   - Existing mAb drugs
   - Related diseases

2. **Results** showing:
   - Complete paths from Alzheimer's → genes → pathways
   - Alzheimer's → CR4 relationships
   - CR4 → mAb targeting opportunities
   - Pathway connections

## Alternative Focused Queries

### Query 1: CR4-Specific Targeting

```json
{
  "message": {
    "query_graph": {
      "nodes": {
        "n0": {
          "categories": ["biolink:Disease"],
          "ids": ["MONDO:0004975"]
        },
        "n1": {
          "categories": ["biolink:Gene"],
          "ids": ["HGNC:2343", "NCBIGene:2343"]
        },
        "n2": {
          "categories": ["biolink:Drug", "biolink:MolecularEntity"]
        }
      },
      "edges": {
        "e01": {
          "subject": "n0",
          "object": "n1"
        },
        "e02": {
          "subject": "n1",
          "object": "n2",
          "predicates": ["biolink:targets", "biolink:treats"],
          "knowledge_type": "inferred"
        }
      }
    }
  }
}
```

**Question**: "What drugs/mAbs could target CR4 for Alzheimer's treatment?"

### Query 2: Pathway Exploration

```json
{
  "message": {
    "query_graph": {
      "nodes": {
        "n0": {
          "categories": ["biolink:Disease"],
          "ids": ["MONDO:0004975"]
        },
        "n1": {
          "categories": ["biolink:Gene"],
          "ids": ["HGNC:2343"]
        },
        "n2": {
          "categories": ["biolink:Pathway", "biolink:BiologicalProcess"]
        }
      },
      "edges": {
        "e01": {"subject": "n0", "object": "n1"},
        "e02": {
          "subject": "n1",
          "object": "n2",
          "predicates": ["biolink:participates_in"]
        }
      }
    }
  }
}
```

**Question**: "What pathways does CR4 participate in that are relevant to Alzheimer's?"

### Query 3: Competitive Analysis

```json
{
  "message": {
    "query_graph": {
      "nodes": {
        "n0": {
          "categories": ["biolink:Disease"],
          "ids": ["MONDO:0004975"]
        },
        "n1": {
          "categories": ["biolink:Drug", "biolink:MolecularEntity"]
        }
      },
      "edges": {
        "e01": {
          "subject": "n1",
          "object": "n0",
          "predicates": ["biolink:treats"],
          "knowledge_type": "inferred"
        }
      }
    }
  }
}
```

**Question**: "What existing therapeutics target Alzheimer's?"

## Interpreting Results for Investment Decisions

### High-Value Signals

1. **Strong Gene-Disease Associations**
   - Multiple evidence sources linking CR4 to Alzheimer's
   - High confidence scores in results

2. **Existing mAb Landscape**
   - Few existing mAbs targeting CR4 → opportunity
   - Many mAbs in Alzheimer's → competitive but validated market

3. **Pathway Richness**
   - Multiple pathways connecting CR4 to Alzheimer's → robust mechanism
   - Novel pathway connections → differentiation opportunity

4. **Related Disease Connections**
   - Shared mechanisms with other diseases → broader market potential
   - Comorbidity insights → combination therapy opportunities

### Red Flags

- No direct CR4-Alzheimer's connection → target validation risk
- Many existing CR4-targeting mAbs → crowded competitive space
- Weak pathway connections → mechanism uncertainty

## Next Steps After Query

1. **Validate Target**: Cross-reference results with literature and clinical data
2. **Assess Competition**: Identify existing mAbs and their development stage
3. **Evaluate Mechanism**: Review pathway connections for biological plausibility
4. **Market Analysis**: Consider related diseases and broader therapeutic landscape
5. **IP Landscape**: Research patent filings for CR4-targeting mAbs

## Additional Resources

- [BTE Usage Guide](../docs/USAGE.md)
- [Query Examples](../examples/v1.1/README.md)
- [TRAPI Specification](https://github.com/NCATSTranslator/ReasonerAPI)

## Notes

- **CR4 Identification**: Complement Receptor 4 may refer to different genes depending on context. The query includes C5AR1 and C5AR2 as common interpretations. Adjust gene IDs based on your specific target.
- **mAb Category**: Monoclonal antibodies may appear as `biolink:Drug`, `biolink:MolecularEntity`, or `biolink:ChemicalEntity` in results.
- **Inferred Knowledge**: Using `knowledge_type: "inferred"` helps find potential therapeutic relationships even if not directly in databases.

