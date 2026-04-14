"use client";

import { useState } from "react";
import type { CVImprovement as CVImprovementType } from "@/lib/types";
import {
  Sparkles,
  Loader2,
  CheckCircle2,
  Lightbulb,
  Copy,
  Check,
} from "lucide-react";

interface Props {
  cvText: string;
  isPro: boolean;
}

export default function CVImprove({ cvText, isPro }: Props) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CVImprovementType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleImprove = async () => {
    if (!isPro) return;
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/improve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cvText }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error);

      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to improve CV");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!result) return;
    await navigator.clipboard.writeText(result.improvedCV);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isPro) {
    return (
      <div className="rounded-2xl border-2 border-dashed border-purple-200 bg-purple-50/50 p-8 text-center">
        <Sparkles className="mx-auto h-12 w-12 text-purple-400" />
        <h3 className="mt-4 text-lg font-semibold text-gray-900">
          Pro Feature: AI CV Rewrite
        </h3>
        <p className="mt-2 text-sm text-gray-600">
          Upgrade to Pro to get a fully rewritten, optimized CV that stands out
          to recruiters.
        </p>
        <button className="mt-4 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:shadow-md">
          Upgrade to Pro — $9.99/mo
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {!result && (
        <div className="text-center">
          <button
            onClick={handleImprove}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-3 text-sm font-medium text-white shadow-sm transition-all hover:shadow-md disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Rewriting your CV...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                AI Rewrite My CV
              </>
            )}
          </button>
        </div>
      )}

      {error && (
        <div className="rounded-lg bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {result && (
        <div className="space-y-6">
          {/* Changes made */}
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
            <div className="mb-4 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              <h3 className="font-semibold text-gray-900">Changes Made</h3>
            </div>
            <ul className="space-y-2">
              {result.changes.map((change, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm text-gray-600"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-green-500" />
                  {change}
                </li>
              ))}
            </ul>
          </div>

          {/* Improved CV */}
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">Your Improved CV</h3>
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
            </div>
            <div className="whitespace-pre-wrap rounded-xl bg-gray-50 p-6 font-mono text-sm leading-relaxed text-gray-700">
              {result.improvedCV}
            </div>
          </div>

          {/* Tips */}
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
            <div className="mb-4 flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-amber-500" />
              <h3 className="font-semibold text-gray-900">Pro Tips</h3>
            </div>
            <ul className="space-y-2">
              {result.tips.map((tip, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm text-gray-600"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
