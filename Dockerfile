# Use Node.js as the base image
FROM node:18-alpine AS base

# Set working directory
WORKDIR /app

# Install dependencies
FROM base AS dependencies
COPY package.json ./
RUN npm install

# Build the application
FROM base AS builder
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .

# Set environment variables for build time
ARG NEXT_PUBLIC_AUTH_API_URL
ARG NEXT_PUBLIC_PROFILE_API_URL
ARG NEXT_PUBLIC_WEB_URL
ARG NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
ENV NEXT_PUBLIC_AUTH_API_URL=$NEXT_PUBLIC_AUTH_API_URL
ENV NEXT_PUBLIC_PROFILE_API_URL=$NEXT_PUBLIC_PROFILE_API_URL
ENV NEXT_PUBLIC_WEB_URL=$NEXT_PUBLIC_WEB_URL
ENV NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=$NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

# Production image
FROM base AS runner
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Create necessary directories
RUN mkdir -p /app/public /app/.next/static

# Copy necessary files
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public/. ./public/

# Expose port
EXPOSE 3000

# Start the application
CMD ["node", "server.js"]