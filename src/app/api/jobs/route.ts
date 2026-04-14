import { NextResponse } from "next/server";
import { suggestJobs } from "@/lib/openai";

export async function POST(request: Request) {
  try {
    const { cvText } = await request.json();

    if (!cvText) {
      return NextResponse.json(
        { error: "No CV text provided" },
        { status: 400 }
      );
    }

    const resultJson = await suggestJobs(cvText);
    const jobs = JSON.parse(resultJson);

    return NextResponse.json({ jobs });
  } catch (error) {
    console.error("Jobs error:", error);
    return NextResponse.json(
      { error: "Failed to suggest jobs. Please try again." },
      { status: 500 }
    );
  }
}
