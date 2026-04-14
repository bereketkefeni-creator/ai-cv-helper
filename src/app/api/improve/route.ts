import { NextResponse } from "next/server";
import { improveCV } from "@/lib/openai";

export async function POST(request: Request) {
  try {
    const { cvText } = await request.json();

    if (!cvText) {
      return NextResponse.json(
        { error: "No CV text provided" },
        { status: 400 }
      );
    }

    const resultJson = await improveCV(cvText);
    const result = JSON.parse(resultJson);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Improve error:", error);
    return NextResponse.json(
      { error: "Failed to improve CV. Please try again." },
      { status: 500 }
    );
  }
}
