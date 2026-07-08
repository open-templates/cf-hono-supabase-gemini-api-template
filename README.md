# cf-hono-supabase-gemini-api-template

Cloudflare Worker API built with **Hono**, **Supabase Auth**, and **Google Gemini** from [@open-templates](https://github.com/open-templates). Pairs with [react-supabase-auth-template](https://github.com/open-templates/react-supabase-auth-template).

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
# Set SUPABASE_* and GEMINI_API_KEY in .dev.vars
npm run dev
```

See [`templates/ABOUT_TEMPLATES.md`](templates/ABOUT_TEMPLATES.md) and [`docs/INIT_TEMPLATE.md`](docs/INIT_TEMPLATE.md).

## Out-of-the-box features

| Endpoint | Auth | Description |
|----------|------|-------------|
| `GET /health` | Public | Liveness check for frontend online/offline indicator |
| `GET /me` | Bearer JWT | Returns the authenticated Supabase user profile |
| `POST /chat` | Bearer JWT | Send `{ "message": "..." }` to Gemini; returns model reply |
| `GET /chat?message=...` | Bearer JWT | Query-string alternative for quick tests |

See [`specs/FEATURES.md`](specs/FEATURES.md) for detailed behavior and extension guidance.

Test:

```bash
curl http://localhost:8787/health

# With a Supabase access token:
curl -X POST http://localhost:8787/chat \
  -H "Authorization: Bearer YOUR_JWT" \
  -H "Content-Type: application/json" \
  -d '{"message":"Hello from the worker"}'
```

Full setup: [`QUICKSTART.md`](QUICKSTART.md) · Cloudflare deploy: [`CLOUDFLARE_SETUP.md`](CLOUDFLARE_SETUP.md)

## Environment variables

| Variable | Required | Purpose |
|----------|----------|---------|
| `SUPABASE_URL` | Yes | Supabase project URL |
| `SUPABASE_ANON_KEY` | Yes | Anon key for JWT-scoped client |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Reserved for future admin operations |
| `GEMINI_API_KEY` | Yes | Google AI Studio key for `@google/genai` |
| `GEMINI_MODEL` | No | Model id (default `gemini-2.5-flash`) |
| `ALLOWED_ORIGINS` | No | Comma-separated CORS origins |
| `ENVIRONMENT` | No | `development` / `staging` / `production` |

## License

MIT
