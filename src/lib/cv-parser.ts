import { getDocument, GlobalWorkerOptions } from "pdfjs-dist/legacy/build/pdf.mjs";
import mammoth from "mammoth";

// Disable worker for server-side usage
GlobalWorkerOptions.workerSrc = "";

export async function parseCV(
  buffer: Buffer,
  fileType: string
): Promise<string> {
  if (fileType === "application/pdf" || fileType.endsWith(".pdf")) {
    const uint8Array = new Uint8Array(buffer);
    const doc = await getDocument({ data: uint8Array, useWorkerFetch: false, isEvalSupported: false, useSystemFonts: true }).promise;
    const pages: string[] = [];

    for (let i = 1; i <= doc.numPages; i++) {
      const page = await doc.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items
        .filter((item) => "str" in item)
        .map((item) => (item as { str: string }).str)
        .join(" ");
      pages.push(pageText);
    }

    return pages.join("\n\n");
  }

  if (
    fileType ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    fileType.endsWith(".docx")
  ) {
    const result = await mammoth.extractRawText({ buffer });
    return result.value;
  }

  // Fallback: treat as plain text
  return buffer.toString("utf-8");
}
