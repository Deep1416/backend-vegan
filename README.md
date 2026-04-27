# VeganFit Node.js Backend (Standalone)

This is a standalone Express + Prisma backend extracted from the Next.js app.

## Run locally

```bash
cd backend-nodejs
npm install
cp .env.example .env
npm run prisma:generate
npm run prisma:migrate
npm run dev
```

## Auth (temporary)

For now, endpoints require `X-User-Id` header.

Example:

```bash
curl -H "X-User-Id: <userId>" http://localhost:4000/api/profile/targets
```

