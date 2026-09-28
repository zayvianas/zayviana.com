# Life OS (life.zayviana.com)

Private daily app: workouts, food, faith, self-care, tasks, clients, progress.
The page is `public/life/index.html`; the API is `app/api/life/*`; server helpers are in `app/lib/lifeServer.ts`.
`next.config.ts` serves the page at the root of `life.zayviana.com`. The portfolio site is unchanged.

## Setup in Vercel (one time)

1. **Database:** Project → Storage → Create → Upstash for Redis (free plan) → connect it to this project.
   That adds `KV_REST_API_URL` and `KV_REST_API_TOKEN` automatically.
2. **Passcode:** open life.zayviana.com. The first visit asks you to create a passcode; it's stored hashed in Redis. (Optional: set `LIFE_PASSCODE` and `LIFE_SECRET` env vars instead.) To reset it, delete the `life:auth` key in the Upstash console.
3. **Domain:** Project → Settings → Domains → add `life.zayviana.com`, then add the CNAME record Vercel shows at your DNS provider.
4. Redeploy.

## Apple Calendar

- Each task has **+ Calendar**, which opens a calendar file your iPhone or Mac offers to add.
- Plan tab → **Subscribe** adds a calendar feed (`/api/life/feed?token=…`) so every dated task appears and updates on its own.

Nothing personal is stored in this repo. All data lives in Redis.
