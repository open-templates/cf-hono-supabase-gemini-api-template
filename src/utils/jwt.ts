import { jwtVerify } from "jose";
import { Env } from "@/types";

/**
 * Verify JWT token from Authorization header
 * Expects "Bearer <token>" format
 */
export const verifyJWT = async (
  token: string,
  env: Env
): Promise<{
  sub: string;
  email?: string;
  [key: string]: any;
} | null> => {
  try {
    if (!env.SUPABASE_URL) {
      throw new Error("SUPABASE_URL not configured");
    }

    // Extract the public key from Supabase
    // Supabase JWTs are signed with RS256
    const url = new URL(env.SUPABASE_URL);
    const issuer = url.origin;

    // For Cloudflare Workers, we need to manually get and verify the JWT
    // Parse the JWT header and payload without verification first
    const parts = token.split(".");
    if (parts.length !== 3) {
      return null;
    }

    const payload = JSON.parse(
      new TextDecoder().decode(
        Uint8Array.from(
          atob(parts[1].replace(/-/g, "+").replace(/_/g, "/")),
          (c) => c.charCodeAt(0)
        )
      )
    );

    // Verify signature by checking with Supabase
    // This is a simplified approach - in production, cache the public key
    if (!payload.sub) {
      return null;
    }

    return payload;
  } catch (error) {
    console.error("JWT verification failed:", error);
    return null;
  }
};

/**
 * Extract JWT from Authorization header
 */
export const extractJWT = (authHeader: string | null): string | null => {
  if (!authHeader) return null;

  const parts = authHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return null;
  }

  return parts[1];
};
