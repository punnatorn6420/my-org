# Section-based CMS + Web Rendering (Nx Monorepo)

This workspace implements a **section-content CMS flow** where:

- UI section components live in shared code (`libs/ui/src/section`)
- Content/props live in PostgreSQL
- CMS edits draft content and publishes
- API (NestJS + Prisma) persists content and serves public snapshots
- Web app renders **published** content using the same shared section components

## Projects

- `apps/cms`: Next.js CMS editor UI
- `apps/web`: Next.js public site renderer
- `apps/api`: NestJS API with Prisma persistence
- `libs/ui`: shared section components + typed content models

## Data model (PostgreSQL)

- `SectionInstance`: draft/published section props (`JSONB`) per `pageSlug + sectionKey`
- `PageLayout`: draft section order per page (`JSONB`)
- `PublishedPage`: published snapshot payload consumed by public web (`JSONB`)

## Local database setup (Docker)

```bash
docker compose up -d postgres
```

Postgres is available at `localhost:5432` with:

- user: `postgres`
- password: `postgres`
- db: `my_org_cms`

`apps/api/.env`:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/my_org_cms?schema=public"
```

## Prisma commands

From repo root:

```bash
npx prisma generate --schema apps/api/prisma/schema.prisma
npx prisma migrate deploy --schema apps/api/prisma/schema.prisma
```

## Run apps

```bash
npm exec nx serve api
npm exec nx serve cms
npm exec nx serve web
```

Set these env vars for local integration:

- CMS (`apps/cms`): `NEXT_PUBLIC_API_URL=http://localhost:3000/api`
- Web (`apps/web`): `API_URL=http://localhost:3000/api`

## API endpoints

CMS endpoints:

- `GET /api/cms/sections/:pageSlug`
- `PUT /api/cms/sections/:pageSlug/:sectionKey`
- `GET /api/cms/layout/:pageSlug`
- `PATCH /api/cms/layout/:pageSlug`
- `POST /api/cms/publish/:pageSlug`

Public endpoint:

- `GET /api/public/pages/:pageSlug`

## Authoring flow

1. CMS loads section instances and draft content for `home`.
2. Editor updates section props and saves drafts.
3. Publish copies draft props into published props and writes a page snapshot.
4. Web fetches published snapshot and renders shared section components.
