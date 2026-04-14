import { NextResponse } from "next/server";
import { parseCV } from "@/lib/cv-parser";
import { analyzeCV } from "@/lib/openai";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/plain",
    ];

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Please upload a PDF, DOCX, or TXT file." },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const rawText = await parseCV(buffer, file.type);

    if (!rawText.trim()) {
      return NextResponse.json(
        { error: "Could not extract text from the file. Please try a different format." },
        { status: 400 }
      );
    }

    const fallbackAnalysis = {
      score: 0,
      summary: "AI analysis unavailable. Please check your OPENAI_API_KEY.",
      strengths: [],
      weaknesses: [],
      skills: [],
      experience: [],
      education: [],
    };

    let analysis;
    try {
      const analysisJson = await analyzeCV(rawText);
      const parsed = JSON.parse(analysisJson);

      // Validate required array fields exist to prevent dashboard crashes
      if (
        !Array.isArray(parsed.strengths) ||
        !Array.isArray(parsed.weaknesses) ||
        !Array.isArray(parsed.skills) ||
        !Array.isArray(parsed.experience) ||
        !Array.isArray(parsed.education)
      ) {
        analysis = fallbackAnalysis;
      } else {
        analysis = parsed;
      }
    } catch {
      analysis = fallbackAnalysis;
    }

    return NextResponse.json({
      rawText,
      fileName: file.name,
      fileType: file.type,
      analysis,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to process the file. Please try again." },
      { status: 500 }
    );
  }
}
