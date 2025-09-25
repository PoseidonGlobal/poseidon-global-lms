FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
COPY backend/package*.json ./backend/
COPY frontend/package*.json ./frontend/
RUN npm install
COPY . .
RUN npm run frontend:build
EXPOSE 3000 5000
CMD ["npx", "concurrently", "npm:backend:start", "npm:frontend:dev"]
