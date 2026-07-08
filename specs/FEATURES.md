# API features specification

This document describes the intentional, production-ready surface of **cf-hono-supabase-gemini-api-template**. Use it when extending the worker or pairing with the React frontend.

## Purpose

A thin backend layer between a Supabase-authenticated SPA and Supabase + **Google Gemini**. Authentication is delegated to Supabase; the worker validates access tokens, calls Gemini server-side with `GEMINI_API_KEY`, and returns standardized JSON.

## Endpoints

### `GET /health`

- **Authentication:** none
- **Use case:** Frontend polls this on an interval to show API online/offline status in the app header.
- **Response:**

```json
{
  "success": true,
  "data": {
    "status": "healthy",
    "timestamp": "2026-07-03T12:00:00.000Z"
  }
}
```

### `GET /me`

- **Authentication:** `Authorization: Bearer <supabase_access_token>`
- **Use case:** Authenticated home page loads the current user from the API (demonstrates JWT passthrough and Supabase integration).
- **Implementation:** Creates a Supabase client with the user's JWT and calls `auth.getUser()`.
- **Success response:**

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "email": "user@example.com",
    "user_metadata": {},
    "app_metadata": {},
    "created_at": "..."
  }
}
```

- **Errors:** `401` with `{ "success": false, "error": { "message": "...", "code": "UNAUTHORIZED" } }`

### `POST /chat`

- **Authentication:** `Authorization: Bearer <supabase_access_token>`
- **Use case:** Send a user message and return the model reply (provider API key stays on the worker).
- **Request body:**

```json
{
  "message": "Follow-up question",
  "history": [
    { "role": "user", "content": "Hello" },
    { "role": "assistant", "content": "Hi! How can I help?" }
  ]
}
```

- `history` is optional; omit or pass `[]` for a single-turn prompt. Up to **100** prior turns accepted.
- **Success response:**

```json
{
  "success": true,
  "data": {
    "message": "Explain how JWT auth works in one sentence.",
    "reply": "...",
    "model": "gemini-2.5-flash"
  }
}
```

- **Errors:** `400` (missing/invalid body), `401` (no/invalid JWT), `502` (Gemini API failure)

### `GET /chat?message=...`

- **Authentication:** Bearer JWT (same as `POST /chat`)
- **Use case:** Quick manual tests via query string instead of JSON body.
- **Success response:** Same shape as `POST /chat`.

## Middleware

1. **Logger** — request logging
2. **CORS** — respects `ALLOWED_ORIGINS` when set
3. **Error handler** — standardized JSON errors
4. **Auth** — applied to all routes except `/health`; extracts JWT `sub` and rejects invalid tokens

## Environment

| Variable | Required | Purpose |
|----------|----------|---------|
| `GEMINI_API_KEY` | Yes | Google AI Studio API key for `@google/genai` |
| `GEMINI_MODEL` | No | Model id (default `gemini-2.5-flash`) |

## Supabase integration

| Client helper | When to use |
|---------------|-------------|
| `getSupabaseClientWithJWT(env, token)` | User-scoped reads/writes (`/me`, future RLS-backed tables) |
| `getSupabaseUserClient(env)` | Anonymous public reads |
| `getSupabaseAdminClient(env)` | Service-role operations (use sparingly) |

## Gemini integration

| Module | Role |
|--------|------|
| `src/lib/gemini.ts` | AI provider client (`@google/genai`) |
| `src/routes/chat.ts` | `POST` and `GET` handlers |

Never expose `GEMINI_API_KEY` to the browser or commit it to git.

## Extension guidelines

1. Register new routers in `src/index.ts` **after** `authMiddleware` unless the route is public.
2. Prefer `getSupabaseClientWithJWT` over the service role key for user data.
3. Keep responses in the `{ success, data }` / `{ success: false, error }` shape from `src/utils/response.ts`.
4. Document new endpoints in this file.

## Frontend pairing

| Frontend call | Backend route |
|---------------|---------------|
| Header health indicator | `GET /health` (no auth) |
| Home page profile card | `GET /me` (Bearer token) |
| AI chat / prompt UI | `POST /chat` with `{ "message": "...", "history": [...] }` |

Pairs with **react-supabase-auth-ai-chat-template** (or any SPA implementing the same `/health`, `/me`, and `/chat` contracts). See that repo's `specs/FEATURES.md` for client behavior.
