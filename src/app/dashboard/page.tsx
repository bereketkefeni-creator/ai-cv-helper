"use client";

import { useState, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
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
  // sessionStorage doesn't change externally; no subscription needed
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
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
        <FileText className="h-16 w-16 text-gray-300" />
        <h2 className="mt-4 text-xl font-semibold text-gray-900">
          No CV uploaded yet
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          Upload your CV on the home page to get started
        </p>
        <button
          onClick={() => router.push("/")}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Go to Home
        </button>
      </div>
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
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      {/* File info bar */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
            <FileText className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <p className="font-medium text-gray-900">{cvData.fileName}</p>
            <p className="text-xs text-gray-500">
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
          className="text-sm text-gray-500 transition-colors hover:text-gray-700"
        >
          Upload new CV
        </button>
      </div>

      {/* Tab navigation */}
      <div className="mb-8 flex gap-1 rounded-xl bg-gray-100 p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium transition-all ${
              activeTab === tab.id
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.icon}
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div>
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
      </div>
    </div>
  );
}
