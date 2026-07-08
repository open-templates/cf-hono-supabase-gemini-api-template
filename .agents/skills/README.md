# cf-hono-supabase-api-template — Agent Skills Index

Skills teach agents how this Cloudflare Worker API works and how to extend it safely.

## Project status (current template)

Minimal **Hono + Supabase** worker paired with **react-supabase-auth-template**:

| Endpoint | Auth | Purpose |
|----------|------|---------|
| `GET /health` | Public | Liveness check |
| `GET /me` | Bearer JWT | Current user via `auth.getUser()` |

No custom Postgres tables required for the default template.

Canonical spec: [`specs/FEATURES.md`](../../specs/FEATURES.md)

## Skills

| Skill | Use when |
|-------|----------|
| [create-api-endpoint](create-api-endpoint/SKILL.md) | Adding routes, registering routers, public vs protected endpoints |
| [create-zod-schema](create-zod-schema/SKILL.md) | Request/response validation with Zod |
| [authentication](authentication/SKILL.md) | JWT middleware, Supabase client selection, `/me` patterns |
| [supabase-mcp](supabase-mcp/SKILL.md) | Migrations, seeding, schema inspection via Supabase MCP |

### Upstream Supabase skills (optional install)

[`skills-lock.json`](../../skills-lock.json) pins the same `supabase/agent-skills` versions as the React template (not tied to any user or MCP `project_ref`).

After clone, install into this repo if you want the full Supabase skill packs locally:

```bash
npx skills add supabase/agent-skills --skill supabase
npx skills add supabase/agent-skills --skill supabase-postgres-best-practices
```

Or configure Supabase MCP in Cursor (see `INSTRUCTIONS.md`) — project-specific; separate from `computedHash`.

## Project layout

```
src/
├── index.ts           # Route registration, middleware order
├── routes/
│   ├── health.ts      # Public
│   └── me.ts          # Protected
├── middleware/        # auth, CORS, errors
├── lib/supabase.ts    # Client factories
├── utils/             # jwt, auth, response
└── schemas/           # Zod schemas (add as needed)
```

## Extension order

1. **Schema** (if validating body/query) → `src/schemas/`
2. **Route** → `src/routes/<name>.ts`
3. **Register** in `src/index.ts` (public before auth, or after `authMiddleware`)
4. **Migration** (if new tables) → Supabase MCP / CLI; enable RLS
5. **Document** → `specs/FEATURES.md` + frontend `src/api/` module

## Middleware order (do not break)

```
logger → cors → errorHandler → /health (public) → authMiddleware → protected routes
```

## Environment

Local: `.dev.vars` (from `.env.example`). Production: `wrangler secret put`.

Required: `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`. Optional: `ALLOWED_ORIGINS`.
