# Gaiada Web

Production website and CMS for **Gaia Digital Agency** — built on Next.js 15 + Payload CMS v3 + PostgreSQL 18, self-hosted on a GCP VPS.

---

## Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js (App Router, Turbopack) | 16.2.1 |
| CMS | Payload CMS | 3.80.0 |
| Database | PostgreSQL (native, no Docker) | 18.3 |
| Language | TypeScript | 5.7.3 |
| Runtime | Node.js | 20.20.2 |
| Package Manager | pnpm | 10.29.1 |
| Styling | TailwindCSS + shadcn/ui | 4.1.18 |
| AI | Google Vertex AI (Gemini 2.5 Flash) | — |
| Cache / Rate Limit | Redis (ioredis) | 5.10.1 |
| Process Manager | PM2 (fork mode) | — |
| Reverse Proxy | Nginx | — |
| Image Optimization | sharp | 0.34.2 |

---

## URLs

| Environment | URL |
|-------------|-----|
| Frontend | `https://gaiadaweb.gaiada.online` |
| Admin Panel | `https://gaiadaweb.gaiada.online/admin` |
| Payload API | `https://gaiadaweb.gaiada.online/api` |

---

## Collections

| Collection | Description |
|-----------|-------------|
| **Pages** | Dynamic pages with layout builder blocks |
| **Posts** | Blog posts with versioning, draft, scheduled publish |
| **Portfolio** | Portfolio items with blocks, scopes |
| **Services** | Services with department relations and detail blocks |
| **Team** | Team members grouped by department |
| **Media** | File uploads (max 25MB), auto image variants |
| **Categories** | Nested taxonomy for posts |
| **Users** | Admin users with role-based access |
| **Departments** | Groups for team and services |

## Globals

| Global | Description |
|--------|-------------|
| **Header** | Navigation links and sub-items |
| **Footer** | Footer nav, background image, form reference |
| **Settings** | Site title, logo, GTM/GA, social links, scripts |
| **Post Ordering** | Manual drag-and-drop post ordering |

---

## Layout Blocks (Pages)

`CallToAction` · `Content` · `MediaBlock` · `Archive` · `FormBlock` · `ContentMedia` · `CareerBlock` · `CareerFormBlock` · `ButtonBlock` · `PortfolioBlock` · `AboutBlock` · `TeamBlock` · `OurProcessBlock` · `PortfolioInsight` · `PortfolioImageBanner` · `OurWorksBlock` · `FeaturedBlogBlock` · `ListingPostBlock` · `HiringProcess` · `MapBlock` · `VisitOurOffice`

---

## Plugins

| Plugin | Purpose |
|--------|---------|
| `@payloadcms/plugin-form-builder` | Contact/career forms with hCaptcha |
| `@payloadcms/plugin-seo` | Meta, OG, sitemap per collection |
| `@payloadcms/plugin-search` | Full-text search on posts |
| `@payloadcms/plugin-redirects` | Redirect management from admin |
| `@payloadcms/plugin-nested-docs` | Nested category support |
| Admin Bar | Frontend admin bar for logged-in users |
| Live Preview | Real-time preview in admin |

---

## Environment Variables

Copy `.env.example` to `.env` and fill in values:

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string |
| `PAYLOAD_SECRET` | JWT signing key |
| `NEXT_PUBLIC_SERVER_URL` | Public base URL (https, no trailing slash) |
| `CRON_SECRET` | Auth secret for cron endpoints |
| `PREVIEW_SECRET` | Auth secret for live preview |
| `ENVIRONMENT` | `production` on server, `development` locally |
| `GCP_PROJECT_ID` | Google Cloud project ID |
| `GCP_VERTEX_LOCATION` | Vertex AI region (e.g. `asia-southeast1`) |
| `GCP_VERTEX_MODEL` | AI model (e.g. `gemini-2.5-flash`) |
| `GOOGLE_APPLICATION_CREDENTIALS` | Path to GCP service account JSON |
| `REDIS_URL` | Redis connection string |
| `AI_CHAT_RATE_LIMIT` | Max AI chat requests per window |
| `AI_CHAT_RATE_WINDOW_SECONDS` | Rate limit window in seconds |
| `SMTP_HOST/PORT/USER/PASS` | Email transport config |
| `SMTP_FROM_NAME/ADDRESS` | Sender name and address |

---

## Local Developer Setup

> Start fresh from the repo — do not copy from another dev's machine.

```bash
# 1. Clone
git clone git@github.com:Gaia-Digital-Agency/gaiada-web-revamp.git
cd gaiada-web-revamp

# 2. Switch to dev branch
git checkout dev

# 3. Install dependencies
pnpm install

# 4. Set up environment
cp .env.example .env
# Fill in your local DB credentials

# 5. Apply migrations to your local DB
pnpm payload migrate

# 6. Start dev server
pnpm dev
```

Open `http://localhost:3000` in your browser.

---

## Developer Workflow Rules

> **These rules must be followed to prevent build failures on the server.**

### Before starting work
```bash
git checkout dev
git pull
```

### After adding or modifying any Payload block, collection, or field
```bash
pnpm payload migrate:create   # generates migration file
pnpm payload migrate          # applies to local DB
```

**Always commit the migration file in the same commit as the code change.**
Never push block/field code without the corresponding migration.

### Before pushing
```bash
git pull                      # always pull before push
pnpm build                    # verify build passes locally
```

### Branch rules
- Work on `dev` branch only (or feature branches merged via PR into `dev`)
- `main` is production — only merge from `dev` when ready to release
- Only 2 branches: `main` and `dev`

---

## Database

PostgreSQL 18 running natively on the server (not Docker).

| Property | Value |
|----------|-------|
| Host | `127.0.0.1` |
| Port | `5432` |
| Database | `gaiadaweb_db` |
| User | `gaiadaweb_user` |

### Migration Commands

```bash
pnpm payload migrate:create   # create new migration
pnpm payload migrate          # apply pending migrations
```

### Backups location
```
/var/backups/postgresql/
```

### Useful DB commands (run on server)
```bash
# All tables with row counts
PGPASSWORD='...' psql -U gaiadaweb_user -h 127.0.0.1 -p 5432 gaiadaweb_db \
  -c "SELECT relname, n_live_tup FROM pg_stat_user_tables ORDER BY n_live_tup DESC;"

# Columns of a table
PGPASSWORD='...' psql -U gaiadaweb_user -h 127.0.0.1 -p 5432 gaiadaweb_db -c "\d pages"
```

---

## Server Deployment

The app runs on PM2 behind Nginx on port `3000`.

### Deploy steps
```bash
git pull origin dev
pnpm payload migrate          # apply any new migrations first
pnpm build                    # build Next.js
pm2 restart gaiadaweb         # restart the process
```

### PM2 Commands
```bash
pm2 status                    # check all processes
pm2 logs gaiadaweb --lines 50 # view recent logs
pm2 restart gaiadaweb         # restart app
```

---

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/ai-chat` | POST | AI chat via Vertex AI Gemini, rate-limited via Redis |
| `/api/next/revalidate` | GET/POST | On-demand ISR revalidation (tags or paths) |
| `/api/next/preview` | GET | Enter preview mode |
| `/api/next/exit-preview` | GET | Exit preview mode |
| `/api/next/seed-v2` | POST | Seed database with initial content |
| `/sitemap.xml` | GET | Sitemap index |
| `/pages-sitemap.xml` | GET | Pages sitemap |
| `/posts-sitemap.xml` | GET | Posts sitemap |

---

## AI Chat

- Powered by **Google Vertex AI** (Gemini 2.5 Flash, `asia-southeast1`)
- Rate limited: 10 requests / 60 seconds per IP via Redis
- Prompt injection protection enabled
- Builds context from live CMS content (pages, posts, services, portfolio)
- Max prompt: 150 characters

---

## Features

- Layout builder with 21 blocks
- Draft preview + Live preview
- On-demand ISR revalidation
- SEO plugin (meta, OG, sitemap per collection)
- Full-text search on posts
- Redirects management from admin
- Scheduled publishing via jobs queue
- Form builder with hCaptcha, file upload
- Manual post ordering (drag and drop)
- AI chat assistant (Vertex AI)
- Redis-based rate limiting
- Smooth scroll (Lenis)
- GSAP + Framer Motion animations

---

## Known Issues & Improvement Backlog

### High Priority
- [ ] `ENVIRONMENT=production` must be set on server (currently done — do not revert to `development`)
- [ ] PM2 restart count is high (209+) — investigate crash logs, consider cluster mode
- [ ] Add `loading.tsx` to `/posts`, `/services`, `/portfolio` routes for better UX
- [ ] Add Content-Security-Policy header in `next.config.ts`

### Medium Priority
- [ ] Add `output: standalone` to `next.config.ts` for lighter deployments
- [ ] Remove `console.log` from production code (8 files affected)
- [ ] Rate limiter currently fails open if Redis is down — should fail closed

### Low Priority
- [ ] Increase test coverage (Vitest + Playwright installed, minimal tests exist)
- [ ] Set ESLint `@typescript-eslint/no-explicit-any` to `error` (currently `warn`)
- [ ] Add bundle analyzer for production build insight

---

## Lighthouse / Performance

> Run via PageSpeed Insights: https://pagespeed.web.dev/report?url=https://gaiadaweb.gaiada.online

Key optimisations in place:
- `sharp` for image optimization
- ISR with `revalidate: 600` on post listings
- `generateStaticParams` on all slug-based routes
- On-demand revalidation hooks on all content changes
- Turbopack enabled for dev

---

## Git

```
main   — production branch
dev    — active development branch
```

PRs must target `dev`. `main` is only updated for production releases.
