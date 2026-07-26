# DUNGEON — Phase 1: Production Foundation

The foundation of the commercial platform for **Dungeon**, a premium gaming
center in Amman, Jordan. This phase ships: project architecture, the full
database schema, authentication, the design system, and the public homepage.

Booking, tournaments, XP/rewards, and the admin dashboard are **intentionally
not implemented yet** — they're Phase 2 and Phase 4. The database models for
them already exist in `prisma/schema.prisma` so those phases don't require
schema-breaking changes, but no UI or business logic for them ships here.

## Tech stack

| Layer      | Choice                                              |
|------------|------------------------------------------------------|
| Framework  | Next.js 14 (App Router), TypeScript (strict mode)     |
| Styling    | Tailwind CSS, custom design tokens                    |
| Components | Radix UI primitives + a small first-party UI kit      |
| Animation  | Framer Motion                                         |
| Forms      | React Hook Form + Zod                                 |
| Database   | PostgreSQL + Prisma ORM                                |
| Auth       | Auth.js (NextAuth) — credentials provider, JWT sessions |

### A deliberate deviation from the original spec

The original brief called for a Turborepo monorepo (`apps/web`, `apps/api`,
`packages/ui`, ...). This build uses a single, well-organized Next.js app
instead. Reasoning: a monorepo earns its complexity when there's a genuinely
separate deployable (a standalone API service, a second app sharing the UI
package) — neither exists yet. The folder structure below is already
organized so that splitting into a monorepo later is a mechanical move, not a
rewrite.

## Folder structure

```
dungeon/
├── prisma/
│   ├── schema.prisma       # All data models (see "Database" below)
│   └── seed.ts             # Seeds an admin account + sample stations/room
├── src/
│   ├── app/                # Next.js App Router routes
│   │   ├── api/            # Route handlers (auth, contact, ...)
│   │   ├── layout.tsx      # Root layout: fonts, metadata, providers
│   │   ├── page.tsx        # Homepage
│   │   ├── globals.css
│   │   ├── sitemap.ts
│   │   └── robots.ts
│   ├── components/
│   │   ├── ui/             # Reusable, presentation-only components
│   │   ├── layout/          # Navbar, Footer
│   │   └── sections/        # Homepage sections (Hero, Pricing preview, ...)
│   ├── lib/
│   │   ├── auth.ts          # NextAuth config
│   │   ├── prisma.ts        # Prisma client singleton
│   │   ├── utils.ts         # cn() class-merging helper
│   │   ├── use-toast.tsx    # Toast state hook
│   │   └── validations/     # Zod schemas (one file per domain)
│   ├── middleware.ts        # Route protection by role
│   └── types/                # Ambient type augmentation (NextAuth session)
├── .env.example
├── tailwind.config.ts
└── package.json
```

## Getting started

### 1. Prerequisites

- Node.js 18.18+ and pnpm (or npm/yarn)
- A running PostgreSQL instance (local, Docker, or hosted — Supabase/Neon/RDS all work)

### 2. Install dependencies

```bash
pnpm install
```

### 3. Environment setup

```bash
cp .env.example .env
```

Fill in `.env`:

- `DATABASE_URL` — your PostgreSQL connection string
- `NEXTAUTH_SECRET` — generate with `openssl rand -base64 32`
- `NEXTAUTH_URL` — `http://localhost:3000` for local dev
- Contact info vars are already filled with Dungeon's real details

### 4. Database setup

```bash
pnpm db:push      # create tables from the Prisma schema
pnpm db:seed      # seed an admin account + sample stations/room
```

This creates an admin login:

- Email: `admin@dungeongaming.jo`
- Password: `ChangeMe123!` — **change this immediately in a real deployment**

For production, prefer migrations over `db:push`:

```bash
pnpm db:migrate   # creates a migration file, applies it
```

### 5. Run the dev server

```bash
pnpm dev
```

Visit `http://localhost:3000`.

## Testing what's built

- **Homepage** (`/`) — all sections should render, animate in on scroll, and
  be usable on mobile (resize the browser or use device toolbar).
- **Registration** — `POST /api/auth/register` with `{ email, username,
  displayName, password }` creates a real user + profile + Bronze membership
  row. Try it with `curl` or a REST client; there's no signup page UI yet
  (that's a Phase 2 concern once the customer dashboard exists).
- **Login** — NextAuth's credentials flow is wired at `/api/auth/[...nextauth]`.
  A `/login` page isn't built yet — the middleware already redirects
  unauthenticated visitors to `/login` for `/dashboard` and `/admin`, so that
  page is the natural first thing to build in Phase 2.
- **Contact form** — fully functional at the bottom of the homepage. Submits
  are validated with Zod and logged server-side (swap in a real email
  provider — Resend, Postmark, etc. — inside `src/app/api/contact/route.ts`
  when you pick one).
- **Middleware** — visiting `/dashboard` or `/admin` while logged out
  redirects to `/login?callbackUrl=...`.

## Database

All 18 models the business will eventually need are defined now in
`prisma/schema.prisma`, so later phases extend relations instead of
restructuring tables. Summary:

- **Identity**: `User`, `Profile`, `Role` (enum: Guest/Customer/Staff/Admin)
- **Inventory**: `Station`, `PlayStationRoom`
- **Commerce**: `Booking`, `Transaction`, `Coupon`
- **Loyalty**: `Membership`, `Reward`, `Achievement`
- **Community**: `Tournament`, `Event`, `Review`
- **Comms**: `Notification`, `Announcement`
- **Content**: `GalleryImage`
- **Compliance**: `AuditLog`

Indexes are set on foreign keys and any field used for filtering (booking
status, station status, notification read-state) since those are the queries
that will run most often once booking is live.

## Security

- Passwords hashed with bcrypt (cost factor 12)
- Sessions are JWTs signed with `NEXTAUTH_SECRET`
- All API input validated with Zod before touching the database
- Role-based middleware protects `/dashboard` (any authenticated role) and
  `/admin` (Staff/Admin only)
- `.env` is gitignored; `.env.example` has no real secrets

## What's deliberately not here yet

Per the phase boundaries in the original spec, this build does **not**
include: booking UI/logic, tournament UI, the admin dashboard, or a `/login`
or `/signup` page. The API foundation and database models these will sit on
top of are already in place.
