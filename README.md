# cf-hono-supabase-api-template

Minimal Cloudflare Worker API built with **Hono** and **Supabase** from [@open-templates](https://github.com/open-templates). Pairs with [react-supabase-auth-template](https://github.com/open-templates/react-supabase-auth-template).

## Quick start

1. **Use this template** on GitHub, then clone your repo.
2. Personalize from `templates/`:

```bash
./scripts/init-from-template.sh
```

3. Install and run:

```bash
npm install
cp .env.example .dev.vars
npm run dev
```

See [`templates/ABOUT_TEMPLATES.md`](templates/ABOUT_TEMPLATES.md) and [`docs/INIT_TEMPLATE.md`](docs/INIT_TEMPLATE.md).

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

Maintained by [xarlizard](https://github.com/jane).

## License

MIT
