FROM node:20-alpine

WORKDIR /app

# Install build tools if later you add native dependencies (commented for now)
# RUN apk add --no-cache python3 make g++

COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./
RUN if [ -f package-lock.json ]; then npm ci; \
    elif [ -f yarn.lock ]; then yarn install --frozen-lockfile; \
    elif [ -f pnpm-lock.yaml ]; then corepack enable && pnpm i --frozen-lockfile; \
    else npm install; fi

COPY . .

ENV NODE_ENV=development
EXPOSE 4000

CMD ["npm", "run", "dev"]