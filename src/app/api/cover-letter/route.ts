import { NextResponse } from "next/server";
import { generateCoverLetter } from "@/lib/openai";
import {
  checkRateLimit,
  checkApiKey,
  validateStringField,
  sanitizeString,
  MAX_CV_TEXT_LENGTH,
  MAX_SHORT_FIELD_LENGTH,
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

    const jobTitleError = validateStringField(body.jobTitle, "jobTitle", MAX_SHORT_FIELD_LENGTH);
    if (jobTitleError) return jobTitleError;

    const companyError = validateStringField(body.company, "company", MAX_SHORT_FIELD_LENGTH);
    if (companyError) return companyError;

    const cvText = sanitizeString(body.cvText as string);
    const jobTitle = sanitizeString(body.jobTitle as string);
    const company = sanitizeString(body.company as string);

    const resultJson = await generateCoverLetter(cvText, jobTitle, company);
    const parsed = JSON.parse(resultJson);

    const result =
      typeof parsed.coverLetter === "string" &&
      typeof parsed.jobTitle === "string" &&
      typeof parsed.company === "string"
        ? parsed
        : { coverLetter: "", jobTitle, company };

    return NextResponse.json(result);
  } catch (error) {
    console.error("Cover letter error:", error);
    return NextResponse.json(
      { error: "Failed to generate cover letter. Please try again." },
      { status: 500 }
    );
  }
}
