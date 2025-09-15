# Insurance Accumulator

A full‑stack reference application for exploring insurance plan benefits, deductibles, and out‑of‑pocket (OOP) accumulators. The backend is a Spring Boot 3 service with PostgreSQL and OpenAPI; the frontend is a modern Next.js 14 app styled for a clean UX.

- Live frontend (Netlify): https://insurance-accumulator.netlify.app
- Live backend (Render): https://insurance-accumulator-latest.onrender.com
- API docs (when running locally): http://localhost:8080/swagger-ui.html


## Features
- Member-centric search to view plans and benefits by coverage dates
- Plan-level cost shares (deductibles, OOP) and benefit-level cost shares
- OpenAPI-powered API with rich annotations and documentation
- PostgreSQL schema with seed data for quick demos
- CORS-configured backend for local dev and production frontend origins
- Containerized services for one-command local runs


## Tech Stack
- Backend
  - Java 21, Spring Boot 3.5.x
  - Spring Web, Spring Data JPA, Validation, Actuator
  - Swagger/OpenAPI (annotations via `io.swagger.core.v3`), custom OpenAPI bean
  - PostgreSQL driver
- Frontend
  - Next.js 14, React 18, TypeScript
  - Framer Motion for subtle UI animation
  - Axios for API calls
- Infrastructure
  - Docker, Docker Compose
  - Netlify (frontend), Render (backend)


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
![Framer Motion](https://img.shields.io/badge/Framer%20Motion-Animation-0055FF?logo=framer&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-HTTP-5A29E4)

![Netlify](https://img.shields.io/badge/Netlify-Hosting-00C7B7?logo=netlify&logoColor=white)
![Render](https://img.shields.io/badge/Render-Backend%20Hosting-46E3B7?logo=render&logoColor=black)


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
│  ├─ app/ (pages & layout)
│  ├─ lib/api.ts                              # API client for /benefitPlans
│  ├─ netlify.toml                            # Build/deploy config
│  └─ package.json
├─ Dockerfile                                 # Spring Boot runtime image
├─ docker-compose.yaml                        # DB only (quick dev)
└─ app-docker-compose.yaml                    # DB + backend + frontend (full stack)


## How it works (high level)
The flow to build a response for a member/product is represented in code under `BenefitPlanController` and the service layer it calls:

## Architecture Diagram

```mermaid
flowchart LR
    A[User] --> B[Front End<br/>Hosted on Netlify Cloud<br/><br/>/benefits<br/>Next.js React Framework]
    B --> C[Backend Service<br/>Hosted on Render Cloud<br/><br/>Service Endpoints:<br/>/benefits<br/>/accumulators<br/><br/>Spring Rest & JPA Framework]
    C --> D[Plan Benefits & Accumulator DB<br/>Hosted on Neon Cloud]
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

Seed data (`database/sample-data.sql`) includes two products (`P001`, `P002`), members (`M001..M003`), deductibles, OOP, benefits, plans, copay/coinsurance, and limits.


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
- Dev server: `npm run dev` at `http://localhost:3000`
- Configure `NEXT_PUBLIC_API_BASE` to point to your backend (local or hosted)
- The UI provides inputs for Member ID, coverage start/end, and HIPAA codes. Results animate in and group by plan with cost shares and benefits.

Netlify deployment is configured via `frontend/netlify.toml`, which sets `NEXT_PUBLIC_API_BASE` to the Render backend by default.


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


## Troubleshooting
- CORS errors in the browser
  - Ensure your frontend origin is included in `app.cors.allowed-origins` (see `application.properties`).
  - For permissive dev mode, set `app.cors.permissive=true` when launching the backend.
- Frontend cannot reach backend in Docker
  - In `app-docker-compose.yaml`, ensure `frontend.environment.NEXT_PUBLIC_API_BASE` is `http://app:8080` if the frontend calls the backend from inside the Docker network, or `http://localhost:8080` if the frontend is accessed via your host browser and calls back to the host.
  - There is a typo in the sample compose: `http://localhostgit :8080`. Replace with `http://localhost:8080`.
- Database connection failures
  - Verify Postgres is running on `localhost:5432` and credentials match.
  - If using SSL-only Postgres (e.g., Neon), set `spring.datasource.hikari.data-source-properties.ssl=true` and `sslmode=require` (already in `application.properties`).
- Swagger UI does not load
  - Make sure the app is running and visit `/swagger-ui.html`.


## Contributing
- Open a PR with a clear description, and please include before/after screenshots for UI changes.
- For backend changes, prefer adding or updating tests under `src/test/java`.


## License
The API metadata references the MIT License. If you intend to license this repository under MIT, please add a `LICENSE` file with the MIT text. Otherwise, update `OpenApiConfig.java` accordingly.


## Acknowledgements
- Spring Boot team and contributors
- Next.js team and community
- Swagger/OpenAPI ecosystem
