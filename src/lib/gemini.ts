import { GoogleGenAI } from "@google/genai";
import { Env } from "@/types";

const DEFAULT_MODEL = "gemini-2.5-flash";

export async function generateGeminiReply(
  env: Env,
  message: string
): Promise<string> {
  const apiKey = env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured");
  }

  const ai = new GoogleGenAI({ apiKey });
  const model = env.GEMINI_MODEL ?? DEFAULT_MODEL;

  const response = await ai.models.generateContent({
    model,
    contents: message,
  });

  const text = response.text;

  if (!text) {
    throw new Error("Gemini returned an empty response");
  }

  return text;
}
