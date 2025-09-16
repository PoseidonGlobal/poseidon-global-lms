FROM node:20-alpine

WORKDIR /app

# Helpful utilities for entrypoint
RUN apk add --no-cache openssl netcat-openbsd

# Install dependencies first (cache friendly)
COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./
RUN if [ -f package-lock.json ]; then npm ci; \
    elif [ -f yarn.lock ]; then yarn install --frozen-lockfile; \
    elif [ -f pnpm-lock.yaml ]; then corepack enable && pnpm i --frozen-lockfile; \
    else npm install; fi

# Copy app source
COPY . .

# Ensure entrypoint is executable
RUN chmod +x scripts/docker-entrypoint.sh

EXPOSE 3000

# Start via entrypoint
CMD ["sh", "./scripts/docker-entrypoint.sh"]
