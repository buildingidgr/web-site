# Install dependencies
COPY package.json pnpm-lock.yaml ./
RUN pnpm install

# Build the application
COPY . .
RUN pnpm run build 