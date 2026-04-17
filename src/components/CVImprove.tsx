"use client";

import { useState } from "react";
import type { CVImprovement as CVImprovementType } from "@/lib/types";
import { motion, AnimatePresence } from "framer-motion";
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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass glow-hover rounded-2xl p-8 text-center"
        style={{ border: "1px dashed rgba(168, 85, 247, 0.3)" }}
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
        >
          <Sparkles className="mx-auto h-12 w-12 text-purple-400" />
        </motion.div>
        <h3 className="mt-4 text-lg font-semibold text-white">
          Pro Feature: AI CV Rewrite
        </h3>
        <p className="mt-2 text-sm text-slate-400">
          Upgrade to Pro to get a fully rewritten, optimized CV that stands out
          to recruiters.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn-shine mt-4 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-2.5 text-sm font-medium text-white shadow-lg shadow-indigo-500/25"
        >
          Upgrade to Pro — $9.99/mo
        </motion.button>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      {!result && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleImprove}
            disabled={loading}
            className="btn-shine inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 px-8 py-3 text-sm font-medium text-white shadow-lg shadow-indigo-500/25 disabled:opacity-60"
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
          </motion.button>
        </motion.div>
      )}

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

      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          {/* Changes made */}
          <div className="glass glow-hover rounded-2xl p-6">
            <div className="mb-4 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-emerald-400" />
              <h3 className="font-semibold text-white">Changes Made</h3>
            </div>
            <ul className="space-y-2">
              {result.changes.map((change, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-2 text-sm text-slate-300"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                  {change}
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Improved CV */}
          <div className="glass glow-hover rounded-2xl p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-semibold text-white">Your Improved CV</h3>
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
            </div>
            <div className="whitespace-pre-wrap rounded-xl bg-white/5 p-6 font-mono text-sm leading-relaxed text-slate-300 ring-1 ring-white/10">
              {result.improvedCV}
            </div>
          </div>

          {/* Tips */}
          <div className="glass glow-hover rounded-2xl p-6">
            <div className="mb-4 flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-amber-400" />
              <h3 className="font-semibold text-white">Pro Tips</h3>
            </div>
            <ul className="space-y-2">
              {result.tips.map((tip, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-2 text-sm text-slate-300"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                  {tip}
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}
    </div>
  );
}
