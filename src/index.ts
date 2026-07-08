import { Hono } from "hono";
import { logger } from "hono/logger";
import { authMiddleware, corsMiddleware, errorHandler } from "@/middleware";
import { geminiRouter } from "@/routes/gemini";
import { healthRouter } from "@/routes/health";
import { meRouter } from "@/routes/me";
import { Env, Variables } from "@/types";

const app = new Hono<{ Bindings: Env; Variables: Variables }>();

app.use("*", logger());
app.use("*", corsMiddleware);
app.use("*", errorHandler);

app.route("/health", healthRouter);

app.use("/*", authMiddleware);
app.route("/me", meRouter);
app.route("/gemini", geminiRouter);

app.notFound((c) => {
  return c.json(
    {
      success: false,
      error: {
        message: "Not Found",
        code: "NOT_FOUND",
      },
    },
    { status: 404 }
  );
});

export default app;
