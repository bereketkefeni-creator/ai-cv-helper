"use client";

import { useState, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import CVAnalysis from "@/components/CVAnalysis";
import CVImprove from "@/components/CVImprove";
import JobSuggestions from "@/components/JobSuggestions";
import CoverLetter from "@/components/CoverLetter";
import type { CVAnalysis as CVAnalysisType } from "@/lib/types";
import {
  FileText,
  Sparkles,
  Briefcase,
  FileEdit,
  ArrowLeft,
} from "lucide-react";

type Tab = "analysis" | "improve" | "jobs" | "cover-letter";

interface CVSessionData {
  rawText: string;
  fileName: string;
  fileType: string;
  analysis: CVAnalysisType;
}

function subscribeNoop(cb: () => void) {
  void cb;
  return () => {};
}

let cachedCVString: string | null = null;
let cachedCVData: CVSessionData | null = null;

function getSessionCVData(): CVSessionData | null {
  const stored = sessionStorage.getItem("cvData");
  if (!stored) {
    cachedCVString = null;
    cachedCVData = null;
    return null;
  }
  if (stored !== cachedCVString) {
    cachedCVString = stored;
    cachedCVData = JSON.parse(stored) as CVSessionData;
  }
  return cachedCVData;
}

function getServerSnapshot(): CVSessionData | null {
  return null;
}

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<Tab>("analysis");
  const cvData = useSyncExternalStore(subscribeNoop, getSessionCVData, getServerSnapshot);
  const [coverLetterJob, setCoverLetterJob] = useState({ title: "", company: "" });
  const [coverLettersGenerated, setCoverLettersGenerated] = useState(0);
  const [isPro] = useState(false);
  const router = useRouter();

  const handleGenerateCoverLetter = (jobTitle: string, company: string) => {
    setCoverLetterJob({ title: jobTitle, company });
    setActiveTab("cover-letter");
  };

  const handleCoverLetterGenerated = () => {
    setCoverLettersGenerated((prev) => prev + 1);
  };

  if (!cvData) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center"
      >
        <div className="glass glow-hover rounded-2xl p-12">
          <FileText className="mx-auto h-16 w-16 text-slate-500" />
          <h2 className="mt-4 text-xl font-semibold text-white">
            No CV uploaded yet
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Upload your CV on the home page to get started
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push("/")}
            className="btn-shine mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-2.5 text-sm font-medium text-white shadow-lg shadow-indigo-500/25"
          >
            <ArrowLeft className="h-4 w-4" />
            Go to Home
          </motion.button>
        </div>
      </motion.div>
    );
  }

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "analysis", label: "Analysis", icon: <FileText className="h-4 w-4" /> },
    { id: "improve", label: "AI Rewrite", icon: <Sparkles className="h-4 w-4" /> },
    { id: "jobs", label: "Job Matches", icon: <Briefcase className="h-4 w-4" /> },
    {
      id: "cover-letter",
      label: "Cover Letter",
      icon: <FileEdit className="h-4 w-4" />,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="mx-auto max-w-5xl px-4 py-8 sm:px-6"
    >
      {/* File info bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="glass glow-hover mb-6 flex items-center justify-between rounded-2xl p-4"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/20 ring-1 ring-indigo-400/30">
            <FileText className="h-5 w-5 text-indigo-400" />
          </div>
          <div>
            <p className="font-medium text-white">{cvData.fileName}</p>
            <p className="text-xs text-slate-400">
              Score: {cvData.analysis.score}/100 &middot;{" "}
              {cvData.analysis.skills.length} skills detected
            </p>
          </div>
        </div>
        <button
          onClick={() => {
            sessionStorage.removeItem("cvData");
            router.push("/");
          }}
          className="text-sm text-slate-400 transition-colors hover:text-white"
        >
          Upload new CV
        </button>
      </motion.div>

      {/* Tab navigation */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="glass mb-8 flex gap-1 rounded-xl p-1"
      >
        {tabs.map((tab) => (
          <motion.button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`relative flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium transition-all ${
              activeTab === tab.id
                ? "text-white"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 rounded-lg bg-white/10"
                style={{ border: "1px solid rgba(139, 92, 246, 0.3)" }}
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              {tab.icon}
              <span className="hidden sm:inline">{tab.label}</span>
            </span>
          </motion.button>
        ))}
      </motion.div>

      {/* Tab content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === "analysis" && (
            <CVAnalysis analysis={cvData.analysis} />
          )}
          {activeTab === "improve" && (
            <CVImprove cvText={cvData.rawText} isPro={isPro} />
          )}
          {activeTab === "jobs" && (
            <JobSuggestions
              cvText={cvData.rawText}
              onGenerateCoverLetter={handleGenerateCoverLetter}
            />
          )}
          {activeTab === "cover-letter" && (
            <CoverLetter
              cvText={cvData.rawText}
              initialJobTitle={coverLetterJob.title}
              initialCompany={coverLetterJob.company}
              isPro={isPro}
              coverLettersGenerated={coverLettersGenerated}
              onGenerated={handleCoverLetterGenerated}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
