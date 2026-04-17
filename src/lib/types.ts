export interface CVData {
  rawText: string;
  fileName: string;
  fileType: string;
}

export interface CVAnalysis {
  score: number;
  summary: string;
  strengths: string[];
  weaknesses: string[];
  skills: string[];
  experience: string[];
  education: string[];
}

export interface CVImprovement {
  improvedCV: string;
  changes: string[];
  tips: string[];
}

export interface JobSuggestion {
  title: string;
  company: string;
  matchScore: number;
  description: string;
  requirements: string[];
  whyMatch: string;
}

export interface CoverLetterResult {
  coverLetter: string;
  jobTitle: string;
  company: string;
}

export type PlanTier = "free" | "pro";

export interface UserPlan {
  tier: PlanTier;
  coverLettersGenerated: number;
  maxCoverLettersFree: number;
}
