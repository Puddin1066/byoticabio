# Quick Start Guide - BioThings Explorer

## Running the Repository End-to-End

### Option 1: Using Docker (Easiest)

```bash
# Build and run with Docker Compose
docker compose build --no-cache
docker compose up
```

The API will be available at `http://localhost:3000`

### Option 2: Local Development Setup

#### Step 1: Setup (if not already done)
```bash
# Clone all required packages
pnpm run clone

# Install dependencies
pnpm install

# Build all packages
pnpm run build
```

#### Step 2: Start the BTE API Server

**Option A: Basic Start (No Redis)**
```bash
pnpm run basic-start
```

**Option B: With Redis (Recommended for full features)**
```bash
pnpm start redis
```

**Option C: With Debug Logging**
```bash
pnpm start
```

The server will start on `http://localhost:3000`

#### Step 3: Test the API

**Test Meta Knowledge Graph:**
```bash
curl http://localhost:3000/v1/meta_knowledge_graph
```

**Test a Query:**
```bash
curl -X POST http://localhost:3000/v1/query \
  -H "Content-Type: application/json" \
  -d @examples/v1.1/query_genes_relate_to_disease.json
```

**Or use a simple query:**
```bash
curl -X POST http://localhost:3000/v1/query \
  -H "Content-Type: application/json" \
  -d '{
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
  }'
```

#### Step 4: Start the Web App (Optional)

In a new terminal:
```bash
cd packages/web-app
pnpm run dev
```

The web app will be available at `http://localhost:5173`

### Option 3: Using the Production API

If you just want to test queries without running locally:

```bash
# Use the production API
curl -X POST https://api.bte.ncats.io/v1/query \
  -H "Content-Type: application/json" \
  -d @examples/v1.1/query_genes_relate_to_disease.json
```

## Example Queries

All example queries are in `examples/v1.1/`:

- `query_genes_relate_to_disease.json` - Find genes related to a disease
- `query_chemicals_physically_interacts_with_genes.json` - Chemical-gene interactions
- `query_multihop_disease_gene_chemical.json` - Multi-hop query
- `inferred_query_drug_treats_disease.json` - Inferred knowledge query

See `examples/v1.1/README.md` for complete documentation.

## Troubleshooting

### Port 3000 Already in Use

If port 3000 is occupied, you can:
1. Stop the other service: `lsof -ti:3000 | xargs kill`
2. Or use a different port: `PORT=3001 pnpm run basic-start`

### Server Not Starting

1. Check if all packages are cloned: `ls packages/`
2. Rebuild: `pnpm run build:clean`
3. Check logs for errors

### Missing Dependencies

```bash
pnpm install
pnpm rebuild
```

## Next Steps

- Read the [Usage Guide](docs/USAGE.md)
- Explore [Example Queries](examples/v1.1/)
- Check the [API Documentation](docs/API_SERVICES_FOR_LANDING_PAGE.md)

