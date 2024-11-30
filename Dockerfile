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
ENV NEXT_TELEMETRY_DISABLED 1
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
# Try to copy public directory if it exists
RUN mkdir -p /app/public && \
    if [ -d "/app/public" ]; then \
      cp -r /app/public/* /app/public/ || true; \
    fi

# Expose port
EXPOSE 3000

# Start the application
CMD ["node", "server.js"]