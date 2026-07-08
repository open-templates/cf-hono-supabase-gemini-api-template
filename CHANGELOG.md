# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2026-07-03

### Added

- **Cloudflare Worker** API built with **Hono** and TypeScript (`wrangler dev` / `wrangler deploy`).
- **`GET /health`** — public liveness endpoint for frontend connectivity checks (`{ success, data: { status, timestamp } }`).
- **`GET /me`** — authenticated profile endpoint using `Authorization: Bearer <supabase_access_token>` and `auth.getUser()`.
- **JWT auth middleware** — validates Supabase access tokens on all routes except `/health`.
- **Standardized JSON responses** — `{ success, data }` / `{ success: false, error }` via `src/utils/response.ts`.
- **CORS** — configurable via `ALLOWED_ORIGINS` for local dev and production frontends.
- **Supabase client helpers** — JWT-scoped, anonymous, and service-role clients in `src/lib/supabase.ts`.
- **Request logging** and centralized error handling middleware.
- **Feature specification** at [`specs/FEATURES.md`](specs/FEATURES.md) for endpoint contracts and extension guidance.
- **Pairing** with [react-supabase-auth-template](https://github.com/open-templates/react-supabase-auth-template) for end-to-end auth demo.
- **Template init wizard** — `./scripts/init-from-template.sh` personalizes repo metadata, `wrangler.toml`, and `package.json` from `templates/`.
- **Shared repository scaffolding** — Dependabot, CODEOWNERS, issue templates, PR template, and standard markdown docs via `@open-templates/specs`.

---

## Repository documents

[README](README.md) | [INSTRUCTIONS](INSTRUCTIONS.md) | **CHANGELOG** | [CONTRIBUTING](CONTRIBUTING.md) | [SECURITY](SECURITY.md) | [CODE_OF_CONDUCT](CODE_OF_CONDUCT.md)
