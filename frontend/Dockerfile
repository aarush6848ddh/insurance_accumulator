# Build stage
FROM node:18-alpine AS deps

WORKDIR /app

# Copy package.json and package-lock.json (or npm-shrinkwrap.json) and install ALL deps (including dev) for build
COPY package*.json ./
RUN npm ci || npm install

# Build stage
FROM node:18-alpine AS builder

WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NODE_ENV=production
ARG NEXT_PUBLIC_API_BASE
ENV NEXT_PUBLIC_API_BASE=$NEXT_PUBLIC_API_BASE
RUN npm run build

# Runtime stage: run Next.js server with only production dependencies
FROM node:18-alpine AS runner

ENV NODE_ENV=production
WORKDIR /app

# Install only production dependencies for runtime
COPY package*.json ./
RUN npm ci --omit=dev || npm install --omit=dev

# Copy build output and public assets
COPY --from=builder /app/.next ./.next

ENV NEXT_PUBLIC_API_BASE=$NEXT_PUBLIC_API_BASE
EXPOSE 3000
CMD ["npm", "run", "start"]