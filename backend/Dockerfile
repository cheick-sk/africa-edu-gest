# Stage 1: Build
FROM node:18-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./

# Install ALL dependencies (dev and prod) for the build stage
# This makes @nestjs/cli available for the build command
RUN npm install

# Copy application source code
COPY . .

# Build the application (compile TypeScript to JavaScript)
# This will use the locally installed (devDependency) @nestjs/cli
RUN npm run build

# Stage 2: Production
FROM node:18-alpine

WORKDIR /usr/src/app

# Copy package.json and package-lock.json (or yarn.lock if used) from the builder stage
COPY --from=builder /usr/src/app/package*.json ./

# Install ONLY production dependencies.
# --ignore-scripts is a good practice here as the build artifacts are already created.
RUN npm install --only=production --ignore-scripts

# Copy built application (dist folder) from builder stage
COPY --from=builder /usr/src/app/dist ./dist

# Expose port (should match the port your app listens on, e.g., from .env or config)
EXPOSE 3001

# Command to run the application
# The .env file should be provided via docker-compose or k8s config,
# or environment variables set directly in docker-compose.yml
CMD ["node", "dist/main"]
