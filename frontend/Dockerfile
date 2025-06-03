# Stage 1: Dependencies and Build
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

# Build the Next.js application
# NEXT_PUBLIC_API_URL should be set at build time if not already in .env.production or similar that's copied
# Or, it can be set at runtime if the app is architected to read it from window object or similar.
# For simplicity, we assume it's either in the .env files copied or not strictly needed at build time
# if the client makes requests to a relative path or a path configured at runtime.
RUN npm run build

# Stage 2: Production
FROM node:18-alpine

WORKDIR /app

# Set environment to production
ENV NODE_ENV production

# Copy built assets from builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
# Next.js standalone output often doesn't need node_modules in this way,
# but for a basic setup, copying it ensures all necessary packages for `next start` are there.
# If using Next.js standalone output feature, this would be different.
COPY --from=builder /app/node_modules ./node_modules


# Expose port
EXPOSE 3000

# Command to run the Next.js application
# The .env.production or environment variables should be provided for runtime configs.
CMD ["npm", "start"]
