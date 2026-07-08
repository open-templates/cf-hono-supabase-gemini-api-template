import { Context, Next } from "hono";
import { cors } from "hono/cors";
import { getAuthenticatedUser } from "@/utils/auth";
import { errorResponse } from "@/utils/response";
import { Env, Variables } from "@/types";

/**
 * Authentication middleware
 * Verifies JWT and extracts user ID
 * If invalid, returns 401 Unauthorized
 */
export const authMiddleware = async (
  c: Context<{ Bindings: Env; Variables: Variables }>,
  next: Next
) => {
  const userId = await getAuthenticatedUser(c);

  if (!userId) {
    return c.json(
      errorResponse("Unauthorized", "UNAUTHORIZED"),
      { status: 401 }
    );
  }

  // Store user ID in context for use in route handlers
  c.set("userId", userId);
  await next();
};

/**
 * CORS middleware
 * Uses Hono's built-in CORS handler
 */
export const corsMiddleware = cors({
  origin: (origin, c) => {
    const allowed = c.env.ALLOWED_ORIGINS?.split(",").map((o: string) => o.trim()) ?? [];
    if (allowed.length === 0) {
      return origin || "*";
    }
    if (!origin) {
      return allowed[0];
    }
    return allowed.includes(origin) ? origin : allowed[0];
  },
  allowHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  credentials: true,
});

/**
 * Error handling middleware
 * Catches errors and returns standardized error response
 */
export const errorHandler = async (
  c: Context<{ Bindings: Env; Variables: Variables }>,
  next: Next
) => {
  try {
    await next();
  } catch (error) {
    console.error("Error:", error);

    if (error instanceof Error) {
      return c.json(
        errorResponse(
          error.message || "Internal server error",
          "INTERNAL_SERVER_ERROR"
        ),
        { status: 500 }
      );
    }

    return c.json(
      errorResponse("An unexpected error occurred", "INTERNAL_SERVER_ERROR"),
      { status: 500 }
    );
  }
};
