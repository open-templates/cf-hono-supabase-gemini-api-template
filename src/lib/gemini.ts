import { GoogleGenAI } from "@google/genai";
import { Env } from "@/types";

const DEFAULT_MODEL = "gemini-2.5-flash";

export type ChatHistoryItem = {
  role: "user" | "assistant";
  content: string;
};

export async function generateGeminiReply(
  env: Env,
  message: string,
  history: ChatHistoryItem[] = []
): Promise<string> {
  const apiKey = env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured");
  }

  const ai = new GoogleGenAI({ apiKey });
  const model = env.GEMINI_MODEL ?? DEFAULT_MODEL;

  const contents = [
    ...history.map((item) => ({
      role: item.role === "assistant" ? ("model" as const) : ("user" as const),
      parts: [{ text: item.content }],
    })),
    {
      role: "user" as const,
      parts: [{ text: message }],
    },
  ];

  const response = await ai.models.generateContent({
    model,
    contents,
  });

  const text = response.text;

  if (!text) {
    throw new Error("Gemini returned an empty response");
  }

  return text;
}
