# Use Node.js as the base image
FROM node:18-alpine AS base

# Install pnpm
RUN npm install -g pnpm

# Set working directory
WORKDIR /app

# Install dependencies
FROM base AS dependencies
COPY package.json pnpm-lock.yaml ./
RUN pnpm install

# Build the application
FROM base AS builder
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
RUN pnpm run build

# Production image
FROM base AS runner
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Expose the port your app runs on
EXPOSE 3000

# Start the application
CMD ["node", "server.js"]