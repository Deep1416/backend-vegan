# Agent context — VeganFit backend (`veganfit-backend`)

This folder is the **Node.js + Express** API and **Prisma** data layer for VeganFit (user app + admin).

## Stack

- **Runtime**: Node (ESM: `"type": "module"`)
- **HTTP**: Express, CORS, Helmet
- **Auth**: JWT, bcrypt; Google auth via `google-auth-library`
- **Realtime**: Socket.IO
- **ORM**: Prisma (migrations under `prisma/migrations/`, seed `prisma/seed.ts`)

## Important paths

| Area | Location |
|------|----------|
| Entry | `src/index.ts` |
| Routes registration | `src/routes/` (`index.ts`, `admin.ts`, `gym.ts`, …) |
| Feature modules | `src/modules/` (e.g. `auth`, `users`, `gym`, `admin`, `onboarding`) |
| Shared HTTP helpers | `src/common/`, `src/http/` |
| Middleware | `src/middleware/` |

## Commands

- Dev: `npm run dev` (tsx watch)
- Build: `npm run build` → `node dist/index.js`
- Prisma: `npm run prisma:generate`, `prisma:migrate`, `prisma:studio`, `prisma:seed`

## Conventions for agents

- Add or change endpoints in `src/routes/` and the matching `src/modules/*` service/controller pattern already in the repo.
- After schema changes, run migrations and regenerate Prisma client.
- Frontends: `../VeganFit-One_Platform_For_All_Vegans` and `../VeganFit-Admin` depend on this API—coordinate breaking changes.

---

## Project-specific notes (edit below)

_Add base URL, required env vars (`.env.example`), socket namespaces, and integration quirks here._
