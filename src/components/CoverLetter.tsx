"use client";

import { useState } from "react";
import type { CoverLetterResult } from "@/lib/types";
import { FileEdit, Loader2, Copy, Check, Download } from "lucide-react";

interface Props {
  cvText: string;
  initialJobTitle?: string;
  initialCompany?: string;
  isPro: boolean;
  coverLettersGenerated: number;
  onGenerated?: () => void;
}

export default function CoverLetter({
  cvText,
  initialJobTitle = "",
  initialCompany = "",
  isPro,
  coverLettersGenerated,
  onGenerated,
}: Props) {
  const [jobTitle, setJobTitle] = useState(initialJobTitle);
  const [company, setCompany] = useState(initialCompany);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CoverLetterResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const maxFree = 1;
  const canGenerate = isPro || coverLettersGenerated < maxFree;

  const handleGenerate = async () => {
    if (!jobTitle.trim() || !company.trim()) {
      setError("Please enter both a job title and company name.");
      return;
    }

    if (!canGenerate) {
      setError(
        "You've used your free cover letter. Upgrade to Pro for unlimited cover letters."
      );
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/cover-letter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cvText, jobTitle, company }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error);

      setResult(data);
      onGenerated?.();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to generate cover letter"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!result) return;
    await navigator.clipboard.writeText(result.coverLetter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!result) return;
    const blob = new Blob([result.coverLetter], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `cover-letter-${company.toLowerCase().replace(/\s+/g, "-")}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Input Form */}
      <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
        <div className="mb-4 flex items-center gap-2">
          <FileEdit className="h-5 w-5 text-blue-600" />
          <h3 className="font-semibold text-gray-900">Generate Cover Letter</h3>
        </div>

        {!isPro && (
          <div className="mb-4 rounded-lg bg-amber-50 p-3 text-sm text-amber-800">
            Free plan: {maxFree - coverLettersGenerated} cover letter
            {maxFree - coverLettersGenerated !== 1 ? "s" : ""} remaining.
            Upgrade to Pro for unlimited.
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label
              htmlFor="jobTitle"
              className="block text-sm font-medium text-gray-700"
            >
              Job Title
            </label>
            <input
              id="jobTitle"
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="e.g. Senior Software Engineer"
              className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 shadow-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="company"
              className="block text-sm font-medium text-gray-700"
            >
              Company Name
            </label>
            <input
              id="company"
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="e.g. Google"
              className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 shadow-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={handleGenerate}
            disabled={loading || !canGenerate}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Writing your cover letter...
              </>
            ) : (
              <>
                <FileEdit className="h-4 w-4" />
                Generate Cover Letter
              </>
            )}
          </button>
        </div>
      </div>

      {error && (
        <div className="rounded-lg bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Result */}
      {result && (
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">
              Cover Letter for {result.jobTitle} at {result.company}
            </h3>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm text-gray-600 transition-colors hover:bg-gray-100"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 text-green-600" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    Copy
                  </>
                )}
              </button>
              <button
                onClick={handleDownload}
                className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm text-gray-600 transition-colors hover:bg-gray-100"
              >
                <Download className="h-4 w-4" />
                Download
              </button>
            </div>
          </div>
          <div className="whitespace-pre-wrap rounded-xl bg-gray-50 p-6 text-sm leading-relaxed text-gray-700">
            {result.coverLetter}
          </div>
        </div>
      )}
    </div>
  );
}
