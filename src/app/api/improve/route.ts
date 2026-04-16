import { NextResponse } from "next/server";
import { improveCV } from "@/lib/openai";
import {
  checkRateLimit,
  checkApiKey,
  validateStringField,
  sanitizeString,
  MAX_CV_TEXT_LENGTH,
} from "@/lib/security";

export async function POST(request: Request) {
  const rateLimitError = checkRateLimit(request);
  if (rateLimitError) return rateLimitError;

  const authError = checkApiKey(request);
  if (authError) return authError;

  try {
    const body = await request.json();

    const cvTextError = validateStringField(body.cvText, "cvText", MAX_CV_TEXT_LENGTH);
    if (cvTextError) return cvTextError;

    const cvText = sanitizeString(body.cvText as string);

    const resultJson = await improveCV(cvText);
    const parsed = JSON.parse(resultJson);

    const result =
      typeof parsed.improvedCV === "string" &&
      Array.isArray(parsed.changes) &&
      Array.isArray(parsed.tips)
        ? parsed
        : { improvedCV: "", changes: [], tips: [] };

    return NextResponse.json(result);
  } catch (error) {
    console.error("Improve error:", error);
    return NextResponse.json(
      { error: "Failed to improve CV. Please try again." },
      { status: 500 }
    );
  }
}
