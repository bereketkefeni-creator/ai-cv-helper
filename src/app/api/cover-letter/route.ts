import { NextResponse } from "next/server";
import { generateCoverLetter } from "@/lib/openai";

export async function POST(request: Request) {
  try {
    const { cvText, jobTitle, company } = await request.json();

    if (!cvText || !jobTitle || !company) {
      return NextResponse.json(
        { error: "CV text, job title, and company are required" },
        { status: 400 }
      );
    }

    const resultJson = await generateCoverLetter(cvText, jobTitle, company);
    const result = JSON.parse(resultJson);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Cover letter error:", error);
    return NextResponse.json(
      { error: "Failed to generate cover letter. Please try again." },
      { status: 500 }
    );
  }
}
