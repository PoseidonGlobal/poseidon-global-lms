#!/usr/bin/env sh
set -e

# Ensure deps for bind-mounted workspace
if [ ! -d node_modules ]; then
  echo "Installing dependencies..."
  if [ -f package-lock.json ]; then
    npm ci
  else
    npm install
  fi
fi

echo "Generating Prisma client..."
npx prisma generate || true

# Wait for Postgres
echo "Waiting for database on db:5432..."
until nc -z db 5432; do
  sleep 1
done

echo "Applying database migrations..."
# Try deploy first for idempotency; fall back to dev migration on fresh DB
npx prisma migrate deploy || npx prisma migrate dev --name init || true

echo "Seeding database (non-fatal if already seeded or script missing)..."
npm run prisma:seed || true

echo "Starting Next.js dev server..."
exec npm run dev
