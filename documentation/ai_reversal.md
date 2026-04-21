# AI Chat Feature — Reversal Guide

**Feature branch:** `feature/vertexai`
**Introduced:** 2026-04-18 (commits `053c2e1` → `bbc7d15`, 5 commits on top of `dev`)
**What it adds:** A floating "Ask Gaiada AI" button on every public page. Clicking it opens a small Q/A popup backed by Vertex AI (Gemini 2.5 Flash) grounded in the site's published Payload content.

This document explains exactly how to remove the feature and return the site to its pre-feature state.

---

## What the branch changes

### New files (safe to delete)

```
src/app/(frontend)/api/ai-chat/route.ts   # POST endpoint: Vertex AI + Payload context + rate limit
src/components/AIChat/index.tsx           # floating Sparkles button
src/components/AIChat/Popup.tsx           # Q/A popup modal
```

### Modified files (minimal, additive only)

| File | Change |
|---|---|
| `src/app/(frontend)/layout.tsx` | +2 lines: `import { AIChat }` and `<AIChat />` mount |
| `.env.example` | +14 lines documenting `GCP_*`, `GOOGLE_APPLICATION_CREDENTIALS`, `REDIS_URL`, `AI_CHAT_*` |
| `.gitignore` | +3 lines ignoring `secure/` (SA key dir) |
| `package.json` + `pnpm-lock.yaml` | Added deps: `ioredis`, `google-auth-library` |

### External side effects (outside git)

| Surface | What the branch does | Reversal action |
|---|---|---|
| **Postgres** | **Reads only** via Payload Local API (`find`, `findGlobal`). No migrations. No schema changes. No writes to any collection. | **Nothing.** DB is untouched. |
| **Redis** | Writes rate-limit counters to keys `gaiadaweb:ai-chat:rl:<ip>` with 60s TTL. No other namespaces touched. | **Nothing.** Keys auto-expire within 60s of feature removal. Optional: `redis-cli --scan --pattern 'gaiadaweb:ai-chat:*' \| xargs redis-cli DEL` |
| **GCP project `gda-viceroy`** | Calls Vertex AI `generateContent` using the service account JSON copied from schoolcatering. | **Nothing required.** Stop calling the API = stop incurring cost. See "service account" section below if you want to rotate keys. |
| **Service account JSON** | Copied to `/var/www/gaiadaweb/secure/gda-viceroy-17373de6d690.json` (gitignored). | Optional: `rm -rf /var/www/gaiadaweb/secure`. The same key still exists at `/var/www/schoolcatering/secure/` and is in active use there. |
| **Local `.env`** | Adds `GCP_PROJECT_ID`, `GCP_VERTEX_LOCATION`, `GCP_VERTEX_MODEL`, `GOOGLE_APPLICATION_CREDENTIALS`, `REDIS_URL`, `AI_CHAT_RATE_LIMIT`, `AI_CHAT_RATE_WINDOW_SECONDS`. | Optional: delete those lines from `.env`. Harmless to leave. |
| **PM2 process** | Same `gaiadaweb` process, just has the new code compiled in. | Rebuild + restart after reverting code. |

### What the branch does **NOT** touch

- No Payload collection, hero, block, global, field definitions changed.
- No migrations created or modified.
- No existing API route handlers (`/next/preview`, `/next/seed*`, `/api/[...slug]`, `/api/graphql`) changed.
- No existing components (`WhatsAppCTA`, `BackToTop`, `Header`, `Footer`, etc.) changed.
- No environment variables from other features touched.

A full reversal returns the site to byte-for-byte the pre-feature state (minus the 2 lines in `layout.tsx`, which the revert handles).

---

## Reversal procedures

Pick the one that matches where the branch currently lives.

### Case A — Branch not yet merged to `dev`

Easiest path. Nothing's live except what's running from the local working tree during testing.

```bash
cd /var/www/gaiadaweb
git checkout dev
git branch -D feature/vertexai              # discard local branch
git push origin --delete feature/vertexai   # optional: delete remote branch
rm -rf .next
pnpm install                                # drops ioredis + google-auth-library
pnpm build
pm2 restart gaiadaweb
```

Site is back to `dev` tip. Done.

### Case B — Branch merged to `dev`, deployed, and you want it fully out

```bash
cd /var/www/gaiadaweb
git checkout dev
git pull origin dev

# Find the merge commit. If it was a merge commit:
MERGE_SHA=$(git log --merges --pretty=format:'%H %s' | grep -m1 'feature/vertexai' | awk '{print $1}')
git revert -m 1 "$MERGE_SHA"

# If the branch was squash-merged (single commit), just revert that commit instead:
# git revert <squash-commit-sha>

git push origin dev

rm -rf .next
pnpm install
pnpm build
pm2 restart gaiadaweb
```

### Case C — Panic rollback (production broken, can't wait for a proper revert)

Fastest way to stop the AI button from appearing without touching git:

```bash
cd /var/www/gaiadaweb

# Temporarily unmount the component — sed out the two lines added by commit bbc7d15
sed -i "/import { AIChat } from '@\/components\/AIChat'/d" src/app/\(frontend\)/layout.tsx
sed -i '/<AIChat \/>/d' src/app/\(frontend\)/layout.tsx

rm -rf .next && pnpm build && pm2 restart gaiadaweb
```

The API route at `/api/ai-chat` still exists but no UI calls it. Do a proper `git revert` when you have time.

---

## Reversal verification checklist

After any of the three paths, confirm:

```bash
# 1. Button gone from rendered HTML
curl -s https://gaiadaweb.gaiada.online/ | grep -c 'Open AI chat'
# expected: 0

# 2. API route gone (Case A/B — Case C still returns 400)
curl -s -o /dev/null -w '%{http_code}\n' -X POST https://gaiadaweb.gaiada.online/api/ai-chat
# Case A/B expected: 404 (or 400 from Payload's catch-all)
# Case C expected: 400 from our validator

# 3. Redis cleanup
redis-cli --scan --pattern 'gaiadaweb:ai-chat:*' | wc -l
# expected: 0 within 60s

# 4. Site still healthy
curl -sI https://gaiadaweb.gaiada.online/ | head -1
# expected: HTTP/1.1 200 OK
```

---

## Rationale for reversal-friendly design

Everything the feature touches is scoped:

- **Code** — lives in new files under `AIChat/` and `api/ai-chat/`, with a 2-line layout mount. Nothing else edited.
- **DB** — read-only. No collection, field, migration, or write call. A full revert changes nothing in Postgres.
- **Redis** — namespaced under `gaiadaweb:ai-chat:*` with short TTL so keys evaporate on their own.
- **Secrets** — SA key is gitignored, outside the repo; removing the file or leaving it is equally safe after reverting code.
- **Deps** — the two new packages are not used anywhere else; `pnpm install` after revert will drop them automatically.

Reversing the branch = feature gone. No residual effects that require manual cleanup.
