# Dungeon Gaming — Platform

Production platform for Dungeon Gaming, a premium gaming center in
Amman, Jordan: booking, membership/XP, tournaments, and an admin
dashboard, built on Next.js + TypeScript + PostgreSQL + Prisma.

This README covers Phase 1 (foundation). See `docs/` for detailed
setup guides as they're added in later phases.

## Monorepo layout

```
dungeon/
├── apps/
│   ├── web/          Next.js app — the actual site + REST API (Route Handlers)
│   └── api/           Placeholder Express service (see apps/api/README.md)
├── packages/
│   ├── database/      Prisma schema, client, seed script
│   ├── types/          Shared TypeScript types (DTOs, enums)
│   └── config/         Shared design tokens + base tsconfig
└── docs/               Setup and deployment guides
```

## Prerequisites

- Node.js 20+
- npm 10+
- A PostgreSQL 15+ database (local or hosted)

## Quickstart

```bash
# 1. Install all workspace dependencies
npm install

# 2. Configure environment variables
cp apps/web/.env.example apps/web/.env
cp packages/database/.env.example packages/database/.env
# then edit both files — at minimum set DATABASE_URL and JWT_SECRET

# 3. Generate the Prisma client
npm run db:generate

# 4. Run migrations (creates tables from schema.prisma)
npm run db:migrate

# 5. Seed real starter data (24 PCs, 6 PS rooms, admin account)
npm run db:seed

# 6. Start the web app
npm run dev:web
```

The site runs at `http://localhost:3000`.

The seed script creates an admin account:
`admin@dungeongaming.jo` / `ChangeMe123!` — **change this password
immediately** in any environment beyond your own machine.

## What's in Phase 1

- Full Prisma schema (19 models) covering the entire platform, so later
  phases only add logic, not migrations that fight earlier ones.
- Design system: Tailwind config with the brand's near-black + single
  crimson-red accent palette, type scale, and motion tokens.
- Homepage: hero, animated stats, about, services, pricing (real rates),
  tournaments preview, gallery, footer — responsive from mobile up.
- Auth foundation: register/login/logout/session endpoints (bcrypt +
  JWT + rate limiting + Zod validation), role-based route protection
  via middleware (`/dashboard`, `/staff`, `/admin`), and working
  login/register pages.

## What's next

- **Phase 2** — profiles, real booking system, station availability,
  membership tiers, XP/rewards.
- **Phase 3** — tournaments, leaderboards, achievements, reviews,
  notifications.
- **Phase 4** — admin dashboard (analytics, user/booking/content
  management).
- **Phase 5** — testing, security hardening, performance, deployment.

## Scripts

| Command | Description |
|---|---|
| `npm run dev:web` | Start the Next.js dev server |
| `npm run dev:api` | Start the placeholder API service |
| `npm run build:web` | Production build of the web app |
| `npm run db:generate` | Regenerate the Prisma client |
| `npm run db:migrate` | Run Prisma migrations (dev) |
| `npm run db:seed` | Seed the database with real starter data |
| `npm run db:studio` | Open Prisma Studio (visual DB browser) |
