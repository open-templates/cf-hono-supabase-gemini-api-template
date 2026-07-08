import { Context } from "hono";
import { extractJWT, verifyJWT } from "./jwt";
import { Env, Variables } from "@/types";

export const getAuthenticatedUser = async (
  c: Context<{ Bindings: Env; Variables: Variables }>
): Promise<string | null> => {
  const token = extractJWT(c.req.header("Authorization") || null);

  if (!token) {
    return null;
  }

  const payload = await verifyJWT(token, c.env);
  return payload?.sub || null;
};
