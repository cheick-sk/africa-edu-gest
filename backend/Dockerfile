# Stage 1: Build
FROM node:18-alpine AS builder

WORKDIR /usr/src/app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies
RUN npm install --only=production

# Copy application source code
COPY . .

# Build the application (compile TypeScript to JavaScript)
RUN npm run build

# Stage 2: Production
FROM node:18-alpine

WORKDIR /usr/src/app

# Copy built application from builder stage
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package*.json ./

# Expose port
EXPOSE 3001

# Command to run the application
# The .env file should be provided via docker-compose or k8s config
CMD ["node", "dist/main"]
