# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2026-07-08

### Added

- **Cloudflare Worker** API built with **Hono** and TypeScript (`wrangler dev` / `wrangler deploy`).
- **`GET /health`** — public liveness endpoint for frontend connectivity checks.
- **`GET /me`** — authenticated profile endpoint using Supabase JWT and `auth.getUser()`.
- **`POST /chat`** and **`GET /chat?message=`** — Bearer-protected Gemini prompts via `@google/genai` and `GEMINI_API_KEY`.
- **JWT auth middleware** — validates Supabase access tokens on all routes except `/health`.
- **Standardized JSON responses**, CORS, Supabase client helpers, request logging, and error handling.
- **Feature specification** at [`specs/FEATURES.md`](specs/FEATURES.md).
- **Pairing** with [react-supabase-auth-template](https://github.com/open-templates/react-supabase-auth-template).
- **Template init wizard** and shared `@open-templates/specs` scaffolding.

---

## Repository documents

[README](README.md) | [INSTRUCTIONS](INSTRUCTIONS.md) | **CHANGELOG** | [CONTRIBUTING](CONTRIBUTING.md) | [SECURITY](SECURITY.md) | [CODE_OF_CONDUCT](CODE_OF_CONDUCT.md)
