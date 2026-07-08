import { Hono } from "hono";
import { getSupabaseClientWithJWT } from "@/lib/supabase";
import { extractJWT } from "@/utils/jwt";
import { errorResponse, successResponse } from "@/utils/response";
import { Env, Variables } from "@/types";

export const meRouter = new Hono<{ Bindings: Env; Variables: Variables }>();

meRouter.get("/", async (c) => {
  const token = extractJWT(c.req.header("Authorization") || null);

  if (!token) {
    return c.json(errorResponse("Unauthorized", "UNAUTHORIZED"), { status: 401 });
  }

  const supabase = getSupabaseClientWithJWT(c.env, token);
  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user) {
    return c.json(errorResponse("Unauthorized", "UNAUTHORIZED"), { status: 401 });
  }

  const { id, email, user_metadata, app_metadata, created_at } = data.user;

  return c.json(
    successResponse({
      id,
      email,
      user_metadata,
      app_metadata,
      created_at,
    })
  );
});
