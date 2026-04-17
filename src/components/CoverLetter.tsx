"use client";

import { useState } from "react";
import type { CoverLetterResult } from "@/lib/types";
import { motion, AnimatePresence } from "framer-motion";
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
    a.download = `cover-letter-${result.company.toLowerCase().replace(/\s+/g, "-")}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Input Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass glow-hover rounded-2xl p-6"
      >
        <div className="mb-4 flex items-center gap-2">
          <FileEdit className="h-5 w-5 text-indigo-400" />
          <h3 className="font-semibold text-white">Generate Cover Letter</h3>
        </div>

        {!isPro && (
          <div className="mb-4 rounded-lg bg-amber-500/10 p-3 text-sm text-amber-300 ring-1 ring-amber-500/20">
            Free plan: {maxFree - coverLettersGenerated} cover letter
            {maxFree - coverLettersGenerated !== 1 ? "s" : ""} remaining.
            Upgrade to Pro for unlimited.
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label
              htmlFor="jobTitle"
              className="block text-sm font-medium text-slate-300"
            >
              Job Title
            </label>
            <input
              id="jobTitle"
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="e.g. Senior Software Engineer"
              className="glass-input mt-1 block w-full rounded-lg px-4 py-2.5 text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="company"
              className="block text-sm font-medium text-slate-300"
            >
              Company Name
            </label>
            <input
              id="company"
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="e.g. Google"
              className="glass-input mt-1 block w-full rounded-lg px-4 py-2.5 text-sm"
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleGenerate}
            disabled={loading || !canGenerate}
            className="btn-shine inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-indigo-500/25 disabled:opacity-60"
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
          </motion.button>
        </div>
      </motion.div>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="rounded-lg bg-red-500/10 p-4 text-sm text-red-300 ring-1 ring-red-500/20"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Result */}
      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass glow-hover rounded-2xl p-6"
        >
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold text-white">
              Cover Letter for {result.jobTitle} at {result.company}
            </h3>
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCopy}
                className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm text-slate-400 transition-colors hover:bg-white/5 hover:text-white"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 text-emerald-400" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    Copy
                  </>
                )}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDownload}
                className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm text-slate-400 transition-colors hover:bg-white/5 hover:text-white"
              >
                <Download className="h-4 w-4" />
                Download
              </motion.button>
            </div>
          </div>
          <div className="whitespace-pre-wrap rounded-xl bg-white/5 p-6 text-sm leading-relaxed text-slate-300 ring-1 ring-white/10">
            {result.coverLetter}
          </div>
        </motion.div>
      )}
    </div>
  );
}
