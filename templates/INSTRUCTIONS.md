# Agent & developer instructions — repo-name

Minimal **Hono + Supabase** Cloudflare Worker API. Pairs with [paired-repo-name](https://github.com/owner-username/paired-repo-name) for the React frontend.

## What ships out of the box

| Endpoint | Auth | Description |
|----------|------|-------------|
| `GET /health` | Public | Liveness probe |
| `GET /me` | Bearer JWT | Authenticated user profile |

Details: [`specs/FEATURES.md`](specs/FEATURES.md)

## Local development

```bash
npm install
cp .env.example .dev.vars
npm run dev
```

## Deploy

See [`CLOUDFLARE_SETUP.md`](CLOUDFLARE_SETUP.md) for Wrangler login, secrets, and custom domains.

Update `wrangler.toml` routes before production deploy.
