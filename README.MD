# Insurance Accumulator

A full‑stack reference application for exploring insurance plan benefits, deductibles, and out‑of‑pocket (OOP) accumulators. The backend is a Spring Boot 3 service with PostgreSQL and OpenAPI; the frontend is a modern Next.js 14 app styled for a clean UX.

- Live frontend (Vercel): https://insurance-accumulator.vercel.app
- Live backend (Render): https://insurance-accumulator-latest.onrender.com
- API docs (when running locally): http://localhost:8080/swagger-ui.html


## Features
- **Professional UI/UX**: Modern, responsive design with GSAP animations and shadcn/ui components
- **Interactive Dashboard**: Real-time accumulator tracking with visual progress indicators
- **Member-centric search**: View plans and benefits by coverage dates
- **Plan-level cost shares**: Deductibles, OOP maximums, and benefit-level cost shares
- **HIPAA Code Support**: Filter and explore benefits by standardized HIPAA service codes
- **Educational Content**: Comprehensive information about health insurance and accumulator models
- **OpenAPI-powered API**: Rich annotations and interactive documentation
- **Comprehensive Mock Data**: 8 products, 20 members, 20 benefit types, and extensive configurations
- **CORS-configured backend**: Supports local dev and production frontend origins
- **Containerized services**: One-command local runs with Docker Compose
- **CI/CD**: Automated Docker builds via GitHub Actions


## Tech Stack
- Backend
  - Java 21, Spring Boot 3.5.x
  - Spring Web, Spring Data JPA, Validation, Actuator
  - Swagger/OpenAPI (annotations via `io.swagger.core.v3`), custom OpenAPI bean
  - PostgreSQL driver
- Frontend
  - Next.js 14, React 18, TypeScript
  - GSAP for high-end animations and scroll effects
  - shadcn/ui components (Button, Sheet, etc.)
  - Tailwind CSS with custom design system
  - Professional typography (Inter + Poppins via Google Fonts)
  - Lucide React for icons
  - Axios for API calls
- Infrastructure
  - Docker, Docker Compose
  - Vercel (frontend), Render (backend)
  - GitHub Actions for CI/CD


## Technologies

![Java 21](https://img.shields.io/badge/Java-21-007396?logo=java&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.5.x-6DB33F?logo=springboot&logoColor=white)
![Spring Data JPA](https://img.shields.io/badge/Spring%20Data%20JPA-%236DB33F?logo=spring&logoColor=white)
![OpenAPI](https://img.shields.io/badge/OpenAPI-3.x-6BA539?logo=openapiinitiative&logoColor=white)
![Swagger](https://img.shields.io/badge/Swagger-UI-85EA2D?logo=swagger&logoColor=black)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14+-4169E1?logo=postgresql&logoColor=white)
![Maven](https://img.shields.io/badge/Maven-3.9%2B-C71A36?logo=apachemaven&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Containerized-2496ED?logo=docker&logoColor=white)

![Next.js](https://img.shields.io/badge/Next.js-14-000000?logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-18-339933?logo=node.js&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-Animation-88CE02?logo=greensock&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4-38B2AC?logo=tailwind-css&logoColor=white)
![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-Components-000000?logo=react&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-HTTP-5A29E4)

![Vercel](https://img.shields.io/badge/Vercel-Frontend-000000?logo=vercel&logoColor=white)
![Render](https://img.shields.io/badge/Render-Backend%20Hosting-46E3B7?logo=render&logoColor=black)
![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-CI%2FCD-2088FF?logo=github-actions&logoColor=white)


## Repository Structure
```
insurance_accumulator/
├─ src/main/java/com/insurance/accumulator/
│  ├─ Accumulator1Application.java            # Spring Boot main app with CORS config
│  ├─ config/OpenApiConfig.java               # OpenAPI metadata (title, contact, license)
│  └─ controller/BenefitPlanController.java   # GET /benefitPlans endpoint
├─ src/main/resources/
│  └─ application.properties                  # Ports, JPA, logging, springdoc UI, CORS
├─ database/
│  ├─ init.sql                                # Schema for product/plan/benefit/etc.
│  └─ sample-data.sql                         # Seed data for demo
├─ frontend/                                  # Next.js 14 app
│  ├─ app/
│  │  ├─ components/
│  │  │  ├─ ui/                               # shadcn/ui components
│  │  │  │  ├─ button.tsx
│  │  │  │  ├─ sheet.tsx
│  │  │  │  └─ floating-header.tsx            # Floating navigation header
│  │  │  ├─ Shell.tsx                         # Main layout wrapper
│  │  │  ├─ PlanCard.tsx                      # Benefit plan card component
│  │  │  └─ LoadingSpinner.tsx
│  │  ├─ demo/page.tsx                        # Interactive dashboard
│  │  ├─ page.tsx                             # Homepage with GSAP animations
│  │  └─ layout.tsx                           # Root layout with fonts
│  ├─ lib/
│  │  ├─ api.ts                               # API client for /benefitPlans
│  │  └─ utils.ts                             # Utility functions (cn helper)
│  ├─ vercel.json                             # Vercel deployment config
│  └─ package.json
├─ .github/
│  └─ workflows/
│     └─ build-docker.yaml                    # CI/CD workflow
├─ Dockerfile                                 # Spring Boot runtime image
├─ docker-compose.yaml                        # DB only (quick dev)
└─ app-docker-compose.yaml                    # DB + backend + frontend (full stack)


## How it works (high level)
The flow to build a response for a member/product is represented in code under `BenefitPlanController` and the service layer it calls:

```

## Architecture Diagram

```mermaid
graph TD;
    A[👤 User] --> B["📱 Front End<br/>⚫ Vercel Cloud<br/>Routes: /, /demo<br/>⚛️ Next.js 14 + React 18<br/>🎨 GSAP + shadcn/ui"]
    
    B --> C["⚙️ Backend Service<br/>☁️ Render Cloud<br/>Endpoints:<br/>/benefitPlans<br/>🌱 Spring Boot 3 + JPA"]
    
    C --> D["🗄️ PostgreSQL Database<br/>📊 8 Products, 20 Members<br/>20 Benefits, 8 Plans"]
    D --> C
    C --> B

    E["🔄 GitHub Actions"] --> F["🐳 Docker Hub<br/>Automated Builds"]
    F --> C

    %% Styling
    style B fill:#E3F2FD,stroke:#1565C0,stroke-width:2px,color:#0D47A1
    style C fill:#E8F5E9,stroke:#2E7D32,stroke-width:2px,color:#1B5E20
    style D fill:#FFF3E0,stroke:#EF6C00,stroke-width:2px,color:#E65100
    style A fill:#F3E5F5,stroke:#6A1B9A,stroke-width:2px,color:#4A148C
    style E fill:#F0F0F0,stroke:#333333,stroke-width:2px,color:#000000
    style F fill:#0db7ed,stroke:#0066cc,stroke-width:2px,color:#FFFFFF
```


1. Identify product context
   - If `productId` is provided, use it directly.
   - Otherwise, resolve `productId` from `memberId` via `member` table.
2. Read plan(s)
   - Fetch from `plan` table by product, then map into response plans[] with coverage window filtered by `covgStartDt` and `covgEndDt`.
3. Plan-level cost shares
   - Resolve `deduct` (by `dect_pfx`) and `oop` (by `oop_pfx`) and map to plan cost share attributes.
4. Benefits and cost shares
   - Fetch `benefit` records by `bnf_pfx` and optional HIPAA codes; map benefit-level cost shares (copay/coinsurance) from `cop_coins` and limits from `ben_limit`.

The domain schema is defined in `database/init.sql` and seeded via `database/sample-data.sql`.


## Getting Started
You can run the stack either entirely in Docker or manually.

### Prerequisites
- Java 21 and Maven 3.9+
- Node.js 18+ and npm (for the frontend)
- Docker Desktop (for containerized runs)

### Option A: Full stack with Docker Compose (DB + API + UI)
This is the quickest way to see everything working together. It builds the backend image from the local source and runs the frontend pointing at it.

```
# from repository root
docker compose -f app-docker-compose.yaml up --build
```

- Backend: http://localhost:8080
- Swagger UI: http://localhost:8080/swagger-ui.html
- Frontend: http://localhost:3002

Notes
- `app-docker-compose.yaml` mounts `database/init.sql` and `database/sample-data.sql` so the DB boots with schema and demo data.
- Ensure `frontend` service environment has `NEXT_PUBLIC_API_BASE=http://localhost:8080` (there is a typo in the file — see Troubleshooting).

### Option B: Manual run (Dockerized DB + local API + local UI)
1) Start PostgreSQL via the lightweight compose file:
```
docker compose up -d
```
This exposes Postgres on `localhost:5432` with user/password `postgres` and DB `insurance_accumulator`.

2) Apply schema and seed (one-time)
- Option 1: psql
```
psql postgresql://postgres:postgres@localhost:5432/postgres \
  -c "DROP DATABASE IF EXISTS insurance_accumulator;" \
  -c "CREATE DATABASE insurance_accumulator;"
psql postgresql://postgres:postgres@localhost:5432/insurance_accumulator -f database/init.sql
psql postgresql://postgres:postgres@localhost:5432/insurance_accumulator -f database/sample-data.sql
```
- Option 2: use `app-docker-compose.yaml`'s `db` volumes to auto-init, then stop it and reuse the data volume.

3) Run the Spring Boot API
```
# from repository root
export SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/insurance_accumulator
export SPRING_DATASOURCE_USERNAME=postgres
export SPRING_DATASOURCE_PASSWORD=postgres

./mvnw spring-boot:run
```
The API will listen on http://localhost:8080.

4) Run the Next.js frontend
```
# in a second terminal
cd frontend
npm install
# Point the UI directly at the local API
export NEXT_PUBLIC_API_BASE=http://localhost:8080
npm run dev
```
The UI will listen on http://localhost:3000.


## Configuration
### Backend (`src/main/resources/application.properties`)
- Port: `server.port=8080`
- DataSource: picks up `SPRING_DATASOURCE_URL`, `SPRING_DATASOURCE_USERNAME`, `SPRING_DATASOURCE_PASSWORD`
- JPA/Hibernate: `ddl-auto=update`, SQL logging enabled
- OpenAPI UI paths: `/v3/api-docs`, `/swagger-ui.html`
- CORS: `app.cors.allowed-origins` controls allowed origins (defaults include the Netlify app and `http://localhost:3000`)

CORS is enforced both via `WebMvcConfigurer` and a `CorsFilter` bean in `Accumulator1Application.java`.

### Frontend (`frontend/lib/api.ts`)
- Uses `NEXT_PUBLIC_API_BASE` to call the backend directly, otherwise proxies through a Next API route path (`/api/benefitPlans`).

### Environment variables quick reference
- Backend
  - `SPRING_DATASOURCE_URL` (e.g., `jdbc:postgresql://localhost:5432/insurance_accumulator`)
  - `SPRING_DATASOURCE_USERNAME` (e.g., `postgres`)
  - `SPRING_DATASOURCE_PASSWORD` (e.g., `postgres`)
- Frontend
  - `NEXT_PUBLIC_API_BASE` (e.g., `http://localhost:8080` for local, Render URL in prod)


## Database
Key tables (`database/init.sql`):
- `product`: products/plans by ID and effective window
- `plan`: ties product to plan plus prefixes for cost shares and benefits
- `deduct`: deductible family/individual amounts (by `dect_pfx`)
- `oop`: out-of-pocket family/individual amounts (by `oop_pfx`)
- `benefit`: benefits linked by `bnf_pfx`, optional HIPAA category codes
- `cop_coins`: benefit-level copay/coinsurance values
- `ben_limit`: benefit limits (visit or dollar)
- `member`: demo members associated with a product ID

Seed data (`database/sample-data.sql`) includes:
- **8 products** (`P001` - `P008`): Premium, Standard, Basic, Elite, Family, Senior, Student, and Corporate plans
- **20 members** (`M001` - `M020`): Members distributed across all products
- **12 deductibles**: Individual and family configurations for different plan tiers
- **12 out-of-pocket maximums**: Matching configurations for each plan
- **20 benefits**: Comprehensive coverage including Primary Care, Specialist, Emergency, Prescriptions, Inpatient, Outpatient Surgery, Lab, Radiology, Mental Health, Physical Therapy, DME, Home Health, Skilled Nursing, Urgent Care, Preventive, Chiropractic, Ambulance, Maternity, Rehabilitation, and Hospice
- **8 plans**: One plan per product with different plan types (PPO, HMO, EPO)
- **50 copay/coinsurance entries**: Coverage for all benefits across different plan tiers
- **30 benefit limits**: Visit limits and dollar limits for various benefits

See the [Using the Demo](#using-the-demo) section for details on how to explore this data.


## API
### OpenAPI and Swagger UI
- Local: http://localhost:8080/swagger-ui.html
- JSON: http://localhost:8080/v3/api-docs

### Endpoints
- `GET /benefitPlans` — returns plan benefits including coverage, cost shares, and benefit details.

Query parameters
- `productId` (string, optional) — preferred. If omitted, you may provide `memberId` to resolve the product.
- `memberId` (string, optional) — deprecated in docs but supported; the frontend UI currently uses member ID.
- `hipaaCodes` (array, optional) — e.g., `hipaaCodes=30&hipaaCodes=35`
- `covgStartDt` (date, required) — `yyyy-MM-dd`
- `covgEndDt` (date, required) — `yyyy-MM-dd`

Example
```
# using memberId to resolve product
curl "http://localhost:8080/benefitPlans?memberId=M001&covgStartDt=2024-01-01&covgEndDt=2024-12-31&hipaaCodes=30&hipaaCodes=35"
```

Response wrapper fields are `status`, `code`, `message`, and a `data` object with optional `member` and `plans` arrays. The frontend typings and rendering are in `frontend/app/page.tsx`.


## Frontend

### UI Features
- **Professional Design**: Clean, modern interface with professional typography (Inter + Poppins)
- **GSAP Animations**: High-end scroll-triggered animations and transitions
- **Floating Header**: Sticky navigation with backdrop blur and mobile menu
- **Interactive Dashboard**: Real-time accumulator tracking with circular progress indicators
- **Educational Content**: Comprehensive information about health insurance, accumulators, and HIPAA codes
- **Responsive Design**: Fully responsive across all device sizes

### Development
- Dev server: `npm run dev` at `http://localhost:3000`
- Configure `NEXT_PUBLIC_API_BASE` to point to your backend (local or hosted)
- The UI provides inputs for Member ID, coverage start/end, and HIPAA codes. Results animate in with GSAP animations and group by plan with cost shares and benefits.

### Components
- **FloatingHeader**: Modern floating navigation with mobile sheet menu (shadcn/ui)
- **Shell**: Main layout wrapper with header and footer
- **PlanCard**: Displays benefit plan information with cost shares
- **Homepage**: Educational content with animated statistics and feature sections

### Deployment
- Vercel deployment is configured via `vercel.json` for static export
- Frontend is built as a static site (`output: 'export'`) and deployed to Vercel
- Environment variable `NEXT_PUBLIC_API_BASE` should be set to the Render backend URL in production


## Using the Demo

The demo page (`/demo`) provides an interactive dashboard to explore insurance accumulator data. Here's how to use it with the available mock data:

### Available Mock Data

**Members (20 total):**
- `M001` - M020: Members across different products
- Examples: `M001` (John Doe, Premium Plan), `M002` (Jane Smith, Premium Plan), `M003` (Bob Johnson, Standard Plan)

**Products (8 total):**
- `P001` - Premium Health Plan (PPO)
- `P002` - Standard Health Plan (HMO)
- `P003` - Basic Health Plan (EPO)
- `P004` - Elite Health Plan (PPO)
- `P005` - Family Health Plan (HMO)
- `P006` - Senior Health Plan (PPO)
- `P007` - Student Health Plan (EPO)
- `P008` - Corporate Health Plan (PPO)

**HIPAA Codes (20 available):**
- `30` - Primary Care Visit
- `32` - Urgent Care
- `33` - Preventive Care
- `35` - Specialist Visit
- `36` - Chiropractic
- `40` - Prescription Drugs
- `45` - Emergency Room
- `46` - Ambulance
- `50` - Inpatient Hospital
- `51` - Maternity Care
- `55` - Outpatient Surgery
- `60` - Lab Services
- `65` - Radiology
- `70` - Mental Health
- `75` - Physical Therapy
- `76` - Rehabilitation
- `80` - Durable Medical Equipment
- `85` - Home Health
- `90` - Skilled Nursing
- `91` - Hospice Care

### How to Use the Demo

1. **Access the Demo Page**
   - Navigate to `http://localhost:3000/demo` (or your deployed frontend URL)

2. **Search for Benefits**
   - Enter a **Member ID** (e.g., `M001`, `M002`, `M003`)
   - Set **Coverage Start Date** (e.g., `2024-01-01`)
   - Set **Coverage End Date** (e.g., `2024-12-31`)
   - Optionally add **HIPAA Codes** to filter specific benefits (e.g., `30`, `35`, `40`)

3. **View Results**
   - The dashboard displays:
     - **Total Healthcare Spending** with progress indicators
     - **Circular Progress** for deductibles and out-of-pocket maximums
     - **Plan Details** with cost shares and benefits
     - **Accumulator View** showing spending progress
     - **Benefits List** with copays, coinsurance, and limits

### Example Queries

**Basic Member Search:**
```
Member ID: M001
Coverage Start: 2024-01-01
Coverage End: 2024-12-31
```
This will show all benefits for John Doe's Premium Health Plan.

**Filtered by HIPAA Codes:**
```
Member ID: M002
Coverage Start: 2024-01-01
Coverage End: 2024-12-31
HIPAA Codes: 30, 35, 40
```
This shows only Primary Care, Specialist, and Prescription benefits for Jane Smith.

**Product-Based Search:**
```
Product ID: P004
Coverage Start: 2024-01-01
Coverage End: 2024-12-31
HIPAA Codes: 45, 50
```
This shows Emergency Room and Inpatient Hospital benefits for the Elite Health Plan.

### What You'll See

- **Deductible Progress**: Visual circular progress showing how much of the deductible has been met
- **Out-of-Pocket Progress**: Progress toward the annual out-of-pocket maximum
- **Cost Shares**: Copays and coinsurance percentages for each benefit
- **Benefit Limits**: Visit limits (e.g., 12 primary care visits) and dollar limits (e.g., $5,000 prescription limit)
- **Plan Comparison**: Different plans show varying deductibles, OOP maximums, and cost-sharing structures

### Tips

- Try different member IDs to see how different products affect benefits
- Filter by specific HIPAA codes to focus on particular service types
- Compare Premium (`P001`) vs Basic (`P003`) plans to see cost differences
- Use the "Clear" button to reset the form and start a new search


## Docker
- Backend image is produced by the Maven build and consumed by `Dockerfile` (runtime-only JRE image, Java 21).
- `app-docker-compose.yaml` starts:
  - `db` (Postgres 14, with schema+seed mounted)
  - `app` (Spring Boot, port 8080)
  - `frontend` (Next.js, port 3002, points to `app` via `NEXT_PUBLIC_API_BASE`)

Build and run everything:
```
docker compose -f app-docker-compose.yaml up --build
```

## CI/CD

### GitHub Actions
The project includes automated CI/CD via GitHub Actions (`.github/workflows/build-docker.yaml`):

- **Automatic Triggers**: Runs on push to `main`, `master`, or `develop` branches
- **Pull Request Builds**: Builds (but doesn't push) on pull requests for verification
- **Manual Trigger**: Available via GitHub Actions UI (`workflow_dispatch`)
- **Docker Build**: Automatically builds and pushes Docker images to Docker Hub on commits

The workflow:
1. Checks out the repository
2. Sets up JDK 21
3. Builds the project with Maven
4. Builds and pushes Docker image to Docker Hub with tags (`latest` and commit SHA)

**Required Secrets** (set in GitHub repository settings):
- `DOCKERHUB_USERNAME`: Your Docker Hub username
- `DOCKERHUB_TOKEN`: Your Docker Hub access token


## Troubleshooting

### CORS Errors
- Ensure your frontend origin is included in `app.cors.allowed-origins` (see `application.properties`).
- Vercel preview deployments are supported via wildcard pattern `https://*.vercel.app`
- For permissive dev mode, set `app.cors.permissive=true` when launching the backend.

### Frontend Issues
- **Cannot reach backend in Docker**: In `app-docker-compose.yaml`, ensure `frontend.environment.NEXT_PUBLIC_API_BASE` is `http://app:8080` if the frontend calls the backend from inside the Docker network, or `http://localhost:8080` if the frontend is accessed via your host browser.
- **Static export errors**: The frontend uses static export (`output: 'export'`), so API routes are not available. All API calls go directly to the backend URL specified in `NEXT_PUBLIC_API_BASE`.
- **Vercel deployment**: Ensure `vercel.json` is configured correctly with `outputDirectory: "out"` for the monorepo structure.

### Database Issues
- Verify Postgres is running on `localhost:5432` and credentials match.
- For local development, disable SSL: `SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/insurance_accumulator?sslmode=disable`
- If using SSL-only Postgres (e.g., Neon), set `spring.datasource.hikari.data-source-properties.ssl=true` and `sslmode=require` (already in `application.properties`).
- To reload database with fresh data:
  ```bash
  psql postgresql://postgres:postgres@localhost:5432/postgres \
    -c "DROP DATABASE IF EXISTS insurance_accumulator;" \
    -c "CREATE DATABASE insurance_accumulator;"
  psql postgresql://postgres:postgres@localhost:5432/insurance_accumulator -f database/init.sql
  psql postgresql://postgres:postgres@localhost:5432/insurance_accumulator -f database/sample-data.sql
  ```

### API Issues
- **Swagger UI does not load**: Make sure the app is running and visit `/swagger-ui.html`.
- **API not responding**: Check that the backend is running on port 8080 and CORS is properly configured.


## Contributing
- Open a PR with a clear description, and please include before/after screenshots for UI changes.
- For backend changes, prefer adding or updating tests under `src/test/java`.


## License
The API metadata references the MIT License. If you intend to license this repository under MIT, please add a `LICENSE` file with the MIT text. Otherwise, update `OpenApiConfig.java` accordingly.


## Acknowledgements
- Spring Boot team and contributors
- Next.js team and community
- Swagger/OpenAPI ecosystem
