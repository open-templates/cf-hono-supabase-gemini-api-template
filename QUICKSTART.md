# Quick start

## 1. Prerequisites

- Node.js 18+
- A [Supabase](https://supabase.com) project (Auth enabled)
- [Wrangler](https://developers.cloudflare.com/workers/wrangler/) CLI

## 2. Install

```bash
npm install
cp .env.example .dev.vars
```

Edit `.dev.vars`:

```bash
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
ALLOWED_ORIGINS=http://localhost:5173
ENVIRONMENT=development
```

## 3. Run locally

```bash
npm run dev
```

Worker listens at `http://localhost:8787`.

## 4. Verify

```bash
# Health (public)
curl http://localhost:8787/health

# Me (requires a Supabase access token from a signed-in user)
curl -H "Authorization: Bearer YOUR_ACCESS_TOKEN" http://localhost:8787/me
```

Get a token from the React app after login (`localStorage.getItem('x-auth-token')`) or from Supabase Auth APIs during development.

## 5. Pair with the React frontend

1. Start this worker (`npm run dev`).
2. In `react-supabase-auth-template`, set `VITE_API_BASE_URL=http://localhost:8787` in `.env.local`.
3. Start the frontend (`bun run dev`).
4. Sign in with Google OAuth or email/password; the home page calls `GET /me` and the header polls `GET /health`.

## 6. Deploy

See [`CLOUDFLARE_SETUP.md`](CLOUDFLARE_SETUP.md) for `wrangler deploy` and production secrets.
