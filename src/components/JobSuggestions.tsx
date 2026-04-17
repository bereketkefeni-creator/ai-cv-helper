"use client";

import { useState } from "react";
import type { JobSuggestion } from "@/lib/types";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  Loader2,
  Star,
  ChevronDown,
  FileEdit,
} from "lucide-react";

interface Props {
  cvText: string;
  onGenerateCoverLetter: (jobTitle: string, company: string) => void;
}

export default function JobSuggestions({
  cvText,
  onGenerateCoverLetter,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState<JobSuggestion[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [expandedJob, setExpandedJob] = useState<number | null>(null);

  const handleSuggest = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cvText }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error);

      setJobs(data.jobs);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to suggest jobs");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {jobs.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSuggest}
            disabled={loading}
            className="btn-shine inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 px-8 py-3 text-sm font-medium text-white shadow-lg shadow-indigo-500/25 disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Finding matching jobs...
              </>
            ) : (
              <>
                <Briefcase className="h-4 w-4" />
                Find Jobs For Me
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

      {jobs.length > 0 && (
        <div className="space-y-4">
          {jobs.map((job, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass glow-hover overflow-hidden rounded-2xl"
            >
              <button
                onClick={() => setExpandedJob(expandedJob === i ? null : i)}
                className="flex w-full items-center justify-between p-6 text-left"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-500/15 ring-1 ring-indigo-500/20">
                    <Briefcase className="h-6 w-6 text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{job.title}</h3>
                    <p className="mt-0.5 text-sm text-slate-400">
                      {job.company}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-amber-400" />
                    <span className="text-sm font-semibold text-slate-200">
                      {job.matchScore}% match
                    </span>
                  </div>
                  <motion.div
                    animate={{ rotate: expandedJob === i ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="h-5 w-5 text-slate-400" />
                  </motion.div>
                </div>
              </button>

              <AnimatePresence>
                {expandedJob === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-white/5 px-6 pb-6 pt-4">
                      <p className="text-sm text-slate-300">{job.description}</p>

                      <div className="mt-4">
                        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                          Requirements
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {job.requirements.map((req, j) => (
                            <span
                              key={j}
                              className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-300 ring-1 ring-white/10"
                            >
                              {req}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mt-4 rounded-lg bg-emerald-500/10 p-3 ring-1 ring-emerald-500/20">
                        <p className="text-sm text-emerald-300">
                          <span className="font-medium">Why you match:</span>{" "}
                          {job.whyMatch}
                        </p>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() =>
                          onGenerateCoverLetter(job.title, job.company)
                        }
                        className="btn-shine mt-4 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-indigo-500/25"
                      >
                        <FileEdit className="h-4 w-4" />
                        Generate Cover Letter
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
