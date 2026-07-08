# API features specification

This document describes the intentional, production-ready surface of **cf-hono-supabase-api-template**. Use it when extending the worker or pairing with the React frontend.

## Purpose

A thin backend layer between a Supabase-authenticated SPA and Supabase services. Authentication is delegated to Supabase; the worker validates access tokens and performs server-side operations that should not run in the browser.

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

## Middleware

1. **Logger** — request logging
2. **CORS** — respects `ALLOWED_ORIGINS` when set
3. **Error handler** — standardized JSON errors
4. **Auth** — applied to all routes except `/health`; extracts JWT `sub` and rejects invalid tokens

## Supabase integration

| Client helper | When to use |
|---------------|-------------|
| `getSupabaseClientWithJWT(env, token)` | User-scoped reads/writes (`/me`, future RLS-backed tables) |
| `getSupabaseUserClient(env)` | Anonymous public reads |
| `getSupabaseAdminClient(env)` | Service-role operations (use sparingly) |

No custom database tables are required for the default template. Add migrations and routes as you grow the app.

## Extension guidelines

1. Register new routers in `src/index.ts` **after** `authMiddleware` unless the route is public.
2. Prefer `getSupabaseClientWithJWT` over the service role key for user data.
3. Keep responses in the `{ success, data }` / `{ success: false, error }` shape from `src/utils/response.ts`.
4. Document new endpoints in this file.

## Frontend pairing

| Frontend call | Backend route |
|---------------|---------------|
| Header health indicator | `GET /health` (no auth) |
| Home page profile card | `GET /me` (Bearer token from `localStorage['x-auth-token']`) |

Base URL is configured in the React app via `VITE_API_BASE_URL` (default `http://localhost:8787`).
