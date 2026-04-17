"use client";

import type { CVAnalysis as CVAnalysisType } from "@/lib/types";
import { motion } from "framer-motion";
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

const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

export default function CVAnalysis({ analysis }: Props) {
  const scoreBg =
    analysis.score >= 80
      ? "from-emerald-500 to-green-500"
      : analysis.score >= 60
        ? "from-amber-500 to-orange-500"
        : "from-red-500 to-rose-500";

  return (
    <div className="space-y-6">
      {/* Score Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="glass glow-hover overflow-hidden rounded-2xl"
      >
        <div className={`bg-gradient-to-r ${scoreBg} p-6`} style={{ background: `linear-gradient(135deg, rgba(99, 102, 241, 0.3), rgba(168, 85, 247, 0.3))` }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-300">CV Score</p>
              <p className="mt-1 text-4xl font-bold text-white">
                {analysis.score}/100
              </p>
            </div>
            <div className="pulse-glow flex h-16 w-16 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm ring-1 ring-white/20">
              <Target className="h-8 w-8 text-white" />
            </div>
          </div>
        </div>
        <div className="p-6">
          <p className="text-slate-300">{analysis.summary}</p>
        </div>
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        className="grid gap-6 md:grid-cols-2"
      >
        {/* Strengths */}
        <motion.div
          variants={cardVariant}
          custom={0}
          className="glass glow-hover rounded-2xl p-6"
        >
          <div className="mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-emerald-400" />
            <h3 className="font-semibold text-white">Strengths</h3>
          </div>
          <ul className="space-y-2">
            {analysis.strengths.map((s, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm text-slate-300"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                {s}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Weaknesses */}
        <motion.div
          variants={cardVariant}
          custom={1}
          className="glass glow-hover rounded-2xl p-6"
        >
          <div className="mb-4 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-400" />
            <h3 className="font-semibold text-white">Areas to Improve</h3>
          </div>
          <ul className="space-y-2">
            {analysis.weaknesses.map((w, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm text-slate-300"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                {w}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Skills */}
        <motion.div
          variants={cardVariant}
          custom={2}
          className="glass glow-hover rounded-2xl p-6"
        >
          <div className="mb-4 flex items-center gap-2">
            <Code className="h-5 w-5 text-indigo-400" />
            <h3 className="font-semibold text-white">Skills Detected</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {analysis.skills.map((skill, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + i * 0.05 }}
                className="rounded-full bg-indigo-500/15 px-3 py-1 text-xs font-medium text-indigo-300 ring-1 ring-indigo-500/20"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Experience */}
        <motion.div
          variants={cardVariant}
          custom={3}
          className="glass glow-hover rounded-2xl p-6"
        >
          <div className="mb-4 flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-purple-400" />
            <h3 className="font-semibold text-white">Experience</h3>
          </div>
          <ul className="space-y-2">
            {analysis.experience.map((exp, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm text-slate-300"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-400" />
                {exp}
              </li>
            ))}
          </ul>
        </motion.div>
      </motion.div>

      {/* Education */}
      {analysis.education.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="glass glow-hover rounded-2xl p-6"
        >
          <div className="mb-4 flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-indigo-400" />
            <h3 className="font-semibold text-white">Education</h3>
          </div>
          <ul className="space-y-2">
            {analysis.education.map((edu, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm text-slate-300"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-400" />
                {edu}
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </div>
  );
}
