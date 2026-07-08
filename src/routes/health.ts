import { Hono } from "hono";
import { Env, Variables } from "@/types";

/**
 * Health check route
 */
export const healthRouter = new Hono<{ Bindings: Env; Variables: Variables }>();

healthRouter.get("/", async (c) => {
  return c.json({
    success: true,
    data: {
      status: "healthy",
      timestamp: new Date().toISOString(),
    },
  });
});
