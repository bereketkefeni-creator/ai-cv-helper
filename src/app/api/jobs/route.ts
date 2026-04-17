import { NextResponse } from "next/server";
import { suggestJobs } from "@/lib/openai";
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

    const resultJson = await suggestJobs(cvText);
    const parsed = JSON.parse(resultJson);

    const jobs = Array.isArray(parsed)
      ? parsed.filter(
          (j: Record<string, unknown>) =>
            typeof j.title === "string" &&
            typeof j.company === "string" &&
            Array.isArray(j.requirements)
        )
      : [];

    return NextResponse.json({ jobs });
  } catch (error) {
    console.error("Jobs error:", error);
    return NextResponse.json(
      { error: "Failed to suggest jobs. Please try again." },
      { status: 500 }
    );
  }
}
