# Phase 2 — Post-Development Improvements

These improvements should be applied after active development stabilizes.

---

## Code Cleanup

### 12. Remove Commented-Out Code
- `src/collections/Users/index.ts` lines 19-26 — commented-out `forgotPassword` config
- `src/collections/Pages/index.ts` line 11 — `// import { ServicesBlock }` unused
- `src/blocks/PortfolioInsight/Component.tsx` line 8 — `// import { useGSAPStaggerReveal }` unused
- `src/utilities/generateMeta.ts` line 33 — commented-out title template
- `src/collections/Portfolio.ts` lines 107-109 — commented-out block configs

### 13. Fix `any` Types
- `src/blocks/PortfolioInsight/Component.tsx` line 17 — `description: any`
- `src/blocks/CareerBlock/Component.tsx` line 12 — `form: any`, lines 42/43/56 — `dept: any`, `member: any`
- `src/Footer/FooterMobile.tsx` line 13 — `form: any`
- `src/blocks/OurWorksBlock/component.tsx` line 47 — `doc: any`

---

## Performance

### Add `select` Clauses to DB Queries (Reduce Over-Fetching)
- `src/blocks/PortfolioBlock/Component.tsx` lines 19-28 — fetches all portfolio fields, only needs title/slug/image/services
- `src/blocks/PortfolioBlock/Component.tsx` lines 31-35 — same for services query
- `src/blocks/CareerBlock/Component.tsx` lines 22-31 — departments + team queries with no `select`
- `src/blocks/OurWorksBlock/component.tsx` — portfolio query fetches everything

### Fix N+1 Query in BlogHero
- `src/heros/BlogHero/index.tsx` line 61 — client-side fetch of `/api/posts?limit=1000` just to count categories. Should be a server-side aggregation.

### Add Loading States
- No `loading.tsx` files exist anywhere — add at minimum:
  - `src/app/(frontend)/loading.tsx`
  - `src/app/(frontend)/posts/loading.tsx`
  - `src/app/(frontend)/services/[slug]/loading.tsx`
  - `src/app/(frontend)/portfolio/[slug]/loading.tsx`

### Add Error Boundaries
- No `error.tsx` files exist — add at minimum:
  - `src/app/(frontend)/error.tsx`

---

## Mobile Responsiveness

### Fix Hardcoded Widths That Break Mobile
- `src/app/(frontend)/portfolio/[slug]/page.tsx` line 50 — `w-[700px]` overflows on mobile
- `src/blocks/AboutBlock/Component.tsx` line 84 — `w-[450px]` overflows on mobile
- `src/blocks/AboutBlock/Component.tsx` line 132 — `pr-[180px]` pushes content off-screen
- `src/blocks/PortfolioImageBanner/Component.tsx` line 28 — hardcoded `height: 532px`
- `src/blocks/PortfolioInsight/Component.tsx` lines 49/50 — `pr-20`/`pl-20` too large for mobile

### Fix Header Mobile Menu
- `src/Header/Component.client.tsx` line 103 — `g:hidden` should be `lg:hidden`

---

## SEO

### Add JSON-LD Structured Data
- Add `Organization` schema to the root layout
- Add `Article` schema to blog post pages
- Add `WebSite` schema with search action

### Seed Data Template Leftovers (Low Priority)
- `src/endpoints/seed/home-static.ts` lines 22, 84 — "Payload Website Template" in seed data
- `src/endpoints/seed/home.ts` lines 50, 671 — same

---

## Missing Features

### Listing Pages
- No `/services` index page — only `/services/[slug]` exists
- No `/portfolio` index page — only `/portfolio/[slug]` exists
- No dedicated `/contact` page — contact form only in footer

### New Blocks to Consider
- Testimonials / client logos block
- FAQ accordion block
- Newsletter signup block
- Statistics / counter block
- Video embed / showreel block

### Existing Blocks Not Registered
- `Code` block exists in `src/blocks/Code/` but not in `RenderBlocks.tsx`
- `Banner` block exists in `src/blocks/Banner/` but not in `RenderBlocks.tsx`
- `FeaturedBlogBlock` and `ListingPostBlock` missing from `HomepageSections` component map

### Social Features
- Add social sharing buttons to blog posts
- Add cookie consent banner

---

## Security (Pre-Launch)

### Rotate Secrets
- Rotate all secrets in `.env` to cryptographically random values (min 32 random bytes)
- `PAYLOAD_SECRET` is currently human-readable — should be random

### Audit Script Injection
- `src/app/(frontend)/layout.tsx` lines 83, 117 — `headerScripts`/`footerScripts` injected via `dangerouslySetInnerHTML` from CMS settings. Consider sanitization.

### Media Upload Auth
- `src/blocks/Form/Component.tsx` lines 75-83 — file uploads via public forms POST to `/api/media` without auth. Media collection requires authentication — public form file uploads will fail. Either add auth token or create a public upload exception.

---

## Assets

### Optimize Logo
- `public/Logo.svg` is 1MB — likely contains embedded raster data. Optimize or convert.

### Block Preview Images
- `/public/block-preview/` contains very large preview images (8.5MB for one). Compress for admin panel performance.
