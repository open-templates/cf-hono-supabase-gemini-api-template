# repo-name

Minimal Cloudflare Worker API built with **Hono** and **Supabase**. Pairs with [paired-repo-name](https://github.com/owner-username/paired-repo-name): the React app handles auth; this worker validates JWTs and exposes API endpoints.

## Out-of-the-box features

| Endpoint | Auth | Description |
|----------|------|-------------|
| `GET /health` | Public | Liveness check for frontend online/offline indicator |
| `GET /me` | Bearer JWT | Returns the authenticated Supabase user profile |

See [`specs/FEATURES.md`](specs/FEATURES.md) for detailed behavior and extension guidance.

## Quick start

```bash
npm install
cp .env.example .dev.vars
npm run dev
```

Test:

```bash
curl http://localhost:8787/health
```

Full setup: [`QUICKSTART.md`](QUICKSTART.md) · Cloudflare deploy: [`CLOUDFLARE_SETUP.md`](CLOUDFLARE_SETUP.md)

## Environment variables

| Variable | Required | Purpose |
|----------|----------|---------|
| `SUPABASE_URL` | Yes | Supabase project URL |
| `SUPABASE_ANON_KEY` | Yes | Anon key for JWT-scoped client |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Reserved for future admin operations |
| `ALLOWED_ORIGINS` | No | Comma-separated CORS origins |
| `ENVIRONMENT` | No | `development` / `staging` / `production` |

Maintained by [author-display-name](https://github.com/author-github-login).

## License

MIT
