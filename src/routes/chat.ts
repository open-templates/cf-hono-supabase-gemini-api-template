import { zValidator } from "@hono/zod-validator";
import { Context, Hono } from "hono";
import { z } from "zod";
import { generateGeminiReply } from "@/lib/gemini";
import { errorResponse, successResponse } from "@/utils/response";
import { Env, Variables } from "@/types";

const messageBodySchema = z.object({
  message: z.string().min(1, "message is required").max(10000),
});

export const chatRouter = new Hono<{ Bindings: Env; Variables: Variables }>();

async function handleChatRequest(
  c: Context<{ Bindings: Env; Variables: Variables }>,
  message: string
) {
  try {
    const text = await generateGeminiReply(c.env, message);

    return c.json(
      successResponse({
        message,
        reply: text,
        model: c.env.GEMINI_MODEL ?? "gemini-2.5-flash",
      })
    );
  } catch (error) {
    const err = error instanceof Error ? error : new Error("Chat completion failed");

    if (err.message.includes("GEMINI_API_KEY")) {
      return c.json(
        errorResponse("AI provider is not configured", "INTERNAL_SERVER_ERROR"),
        { status: 500 }
      );
    }

    return c.json(
      errorResponse(err.message || "Chat completion failed", "INTERNAL_SERVER_ERROR"),
      { status: 502 }
    );
  }
}

/** POST /chat — JSON body `{ "message": "..." }` */
chatRouter.post("/", zValidator("json", messageBodySchema), async (c) => {
  const { message } = c.req.valid("json");
  return handleChatRequest(c, message);
});

/** GET /chat?message=... — query alternative for quick tests */
chatRouter.get("/", async (c) => {
  const message = c.req.query("message")?.trim();

  if (!message) {
    return c.json(
      errorResponse("message query parameter is required", "BAD_REQUEST"),
      { status: 400 }
    );
  }

  if (message.length > 10000) {
    return c.json(
      errorResponse("message must be at most 10000 characters", "BAD_REQUEST"),
      { status: 400 }
    );
  }

  return handleChatRequest(c, message);
});
