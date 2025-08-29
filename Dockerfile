# syntax = docker/dockerfile:1

# Adjust NODE_VERSION as desired
ARG NODE_VERSION=23.7.0
FROM node:${NODE_VERSION}-slim AS base

LABEL fly_launch_runtime="Node.js/Prisma"

# Node.js/Prisma app lives here
WORKDIR /app

# Set production environment

# Throw-away build stage to reduce size of final image
FROM base AS build

# Install packages needed to build node modules
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential node-gyp openssl pkg-config python-is-python3

# Install node modules
COPY package-lock.json package.json ./
RUN npm install -g npm@11.3.0
RUN npm ci --include=dev

#RUN npm ci

# Generate Prisma Client
#COPY prisma .
# RUN npx prisma generate

# Copy application code
COPY . .

# Build application
RUN npm run build

#RUN npm prune --production

# Final stage for app image
FROM base


ENV NODE_ENV="production"
ENV PORT="3011"
ENV HOST="0.0.0.0"
ENV SERVER_URL="http://0.0.0.0:3011"


# Install packages needed for deployment
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y openssl && \
    rm -rf /var/lib/apt/lists /var/cache/apt/archives

# Copy built application
COPY --from=build /app /app



# Start the server by default, this can be overwritten at runtime
EXPOSE 3011
CMD [ "npm", "run", "start" ]
