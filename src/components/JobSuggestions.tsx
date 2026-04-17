"use client";

import { useState } from "react";
import type { JobSuggestion } from "@/lib/types";
import {
  Briefcase,
  Loader2,
  Star,
  ChevronDown,
  ChevronUp,
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
        <div className="text-center">
          <button
            onClick={handleSuggest}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-3 text-sm font-medium text-white shadow-sm transition-all hover:shadow-md disabled:opacity-60"
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
          </button>
        </div>
      )}

      {error && (
        <div className="rounded-lg bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {jobs.length > 0 && (
        <div className="space-y-4">
          {jobs.map((job, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-200 transition-all hover:shadow-md"
            >
              <button
                onClick={() => setExpandedJob(expandedJob === i ? null : i)}
                className="flex w-full items-center justify-between p-6 text-left"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-100">
                    <Briefcase className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{job.title}</h3>
                    <p className="mt-0.5 text-sm text-gray-500">
                      {job.company}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-amber-500" />
                    <span className="text-sm font-semibold text-gray-700">
                      {job.matchScore}% match
                    </span>
                  </div>
                  {expandedJob === i ? (
                    <ChevronUp className="h-5 w-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  )}
                </div>
              </button>

              {expandedJob === i && (
                <div className="border-t border-gray-100 px-6 pb-6 pt-4">
                  <p className="text-sm text-gray-600">{job.description}</p>

                  <div className="mt-4">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
                      Requirements
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {job.requirements.map((req, j) => (
                        <span
                          key={j}
                          className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600"
                        >
                          {req}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 rounded-lg bg-green-50 p-3">
                    <p className="text-sm text-green-800">
                      <span className="font-medium">Why you match:</span>{" "}
                      {job.whyMatch}
                    </p>
                  </div>

                  <button
                    onClick={() =>
                      onGenerateCoverLetter(job.title, job.company)
                    }
                    className="mt-4 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                  >
                    <FileEdit className="h-4 w-4" />
                    Generate Cover Letter
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
