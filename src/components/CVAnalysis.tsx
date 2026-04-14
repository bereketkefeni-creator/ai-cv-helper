"use client";

import type { CVAnalysis as CVAnalysisType } from "@/lib/types";
import {
  Target,
  TrendingUp,
  AlertTriangle,
  GraduationCap,
  Briefcase,
  Code,
} from "lucide-react";

interface Props {
  analysis: CVAnalysisType;
}

export default function CVAnalysis({ analysis }: Props) {
  const scoreBg =
    analysis.score >= 80
      ? "from-green-500 to-emerald-500"
      : analysis.score >= 60
        ? "from-yellow-500 to-orange-500"
        : "from-red-500 to-rose-500";

  return (
    <div className="space-y-6">
      {/* Score Card */}
      <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-200">
        <div className={`bg-gradient-to-r ${scoreBg} p-6`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-white/80">CV Score</p>
              <p className="mt-1 text-4xl font-bold text-white">
                {analysis.score}/100
              </p>
            </div>
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
              <Target className="h-8 w-8 text-white" />
            </div>
          </div>
        </div>
        <div className="p-6">
          <p className="text-gray-700">{analysis.summary}</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Strengths */}
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
          <div className="mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            <h3 className="font-semibold text-gray-900">Strengths</h3>
          </div>
          <ul className="space-y-2">
            {analysis.strengths.map((s, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm text-gray-600"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-green-500" />
                {s}
              </li>
            ))}
          </ul>
        </div>

        {/* Weaknesses */}
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
          <div className="mb-4 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            <h3 className="font-semibold text-gray-900">Areas to Improve</h3>
          </div>
          <ul className="space-y-2">
            {analysis.weaknesses.map((w, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm text-gray-600"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                {w}
              </li>
            ))}
          </ul>
        </div>

        {/* Skills */}
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
          <div className="mb-4 flex items-center gap-2">
            <Code className="h-5 w-5 text-blue-600" />
            <h3 className="font-semibold text-gray-900">Skills Detected</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {analysis.skills.map((skill, i) => (
              <span
                key={i}
                className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Experience */}
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
          <div className="mb-4 flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-purple-600" />
            <h3 className="font-semibold text-gray-900">Experience</h3>
          </div>
          <ul className="space-y-2">
            {analysis.experience.map((exp, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm text-gray-600"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-500" />
                {exp}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Education */}
      {analysis.education.length > 0 && (
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
          <div className="mb-4 flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-indigo-600" />
            <h3 className="font-semibold text-gray-900">Education</h3>
          </div>
          <ul className="space-y-2">
            {analysis.education.map((edu, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm text-gray-600"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
                {edu}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
