FROM node:20-alpine
WORKDIR /app

# System tools (openssl/netcat used by some scripts or health checks)
RUN apk add --no-cache openssl netcat-openbsd

# Install deps (copy only manifests first for caching)
COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./
RUN npm install --legacy-peer-deps

# App source
COPY . .

EXPOSE 3000
ENV NODE_ENV=development
CMD ["npm","run","dev"]
