"use client";

import FileUpload from "@/components/FileUpload";
import { motion } from "framer-motion";
import {
  FileText,
  Sparkles,
  Briefcase,
  FileEdit,
  ArrowRight,
  Zap,
  Shield,
  Clock,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" as const },
  }),
};

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 py-24 sm:px-6">
        <div className="relative mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full bg-indigo-500/10 px-4 py-1.5 text-sm text-indigo-300 ring-1 ring-indigo-500/20 backdrop-blur-sm"
          >
            <Zap className="h-4 w-4 text-yellow-400" />
            AI-Powered Career Assistant
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl"
          >
            Your AI-Powered
            <br />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              CV & Job Helper
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-400"
          >
            Upload your CV and let AI improve it, suggest matching jobs, and
            write tailored cover letters. Land your dream job faster.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 flex justify-center"
          >
            <FileUpload />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center"
          >
            <motion.h2
              variants={fadeUp}
              custom={0}
              className="text-3xl font-bold text-white"
            >
              Everything you need to land the job
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={1}
              className="mt-3 text-lg text-slate-400"
            >
              Powerful AI tools to transform your job search
            </motion.p>
          </motion.div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <FeatureCard
              icon={<FileText className="h-6 w-6" />}
              title="Smart CV Analysis"
              description="Get a detailed score, strengths, and weaknesses analysis of your resume"
              color="indigo"
              index={0}
            />
            <FeatureCard
              icon={<Sparkles className="h-6 w-6" />}
              title="AI CV Rewrite"
              description="Our AI rewrites your CV with stronger action verbs and quantified achievements"
              color="purple"
              badge="PRO"
              index={1}
            />
            <FeatureCard
              icon={<Briefcase className="h-6 w-6" />}
              title="Job Matching"
              description="Discover jobs that match your skills and experience with match scores"
              color="emerald"
              index={2}
            />
            <FeatureCard
              icon={<FileEdit className="h-6 w-6" />}
              title="Cover Letters"
              description="Generate tailored cover letters for any job with one click"
              color="amber"
              index={3}
            />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center"
          >
            <motion.h2
              variants={fadeUp}
              custom={0}
              className="text-3xl font-bold text-white"
            >
              Simple, transparent pricing
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={1}
              className="mt-3 text-lg text-slate-400"
            >
              Start free, upgrade when you&apos;re ready
            </motion.p>
          </motion.div>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {/* Free Plan */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={{ y: -5 }}
              className="glass glow-hover rounded-2xl p-8"
            >
              <h3 className="text-lg font-semibold text-white">Free</h3>
              <p className="mt-1 text-sm text-slate-400">
                Get started with basic features
              </p>
              <p className="mt-6">
                <span className="text-4xl font-bold text-white">$0</span>
                <span className="text-sm text-slate-400">/month</span>
              </p>
              <ul className="mt-8 space-y-3">
                <PricingFeature>CV analysis & scoring</PricingFeature>
                <PricingFeature>Skills detection</PricingFeature>
                <PricingFeature>Job suggestions</PricingFeature>
                <PricingFeature>1 cover letter</PricingFeature>
              </ul>
              <button className="mt-8 w-full rounded-lg border border-white/20 py-2.5 text-sm font-medium text-slate-300 transition-all hover:border-white/40 hover:bg-white/5 hover:text-white">
                Current Plan
              </button>
            </motion.div>

            {/* Pro Plan */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ y: -5 }}
              className="glass-strong relative rounded-2xl p-8 shadow-xl shadow-indigo-500/10"
              style={{ border: "1px solid rgba(139, 92, 246, 0.3)" }}
            >
              <div className="absolute -top-3 right-6 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 px-3 py-1 text-xs font-bold text-white shadow-lg shadow-indigo-500/25">
                POPULAR
              </div>
              <h3 className="text-lg font-semibold text-white">Pro</h3>
              <p className="mt-1 text-sm text-purple-300">
                Full access to all features
              </p>
              <p className="mt-6">
                <span className="text-4xl font-bold text-white">$9.99</span>
                <span className="text-sm text-purple-300">/month</span>
              </p>
              <ul className="mt-8 space-y-3">
                <PricingFeature glow>Everything in Free</PricingFeature>
                <PricingFeature glow>AI CV rewrite & optimization</PricingFeature>
                <PricingFeature glow>Unlimited cover letters</PricingFeature>
                <PricingFeature glow>Priority job suggestions</PricingFeature>
                <PricingFeature glow>LinkedIn optimization tips</PricingFeature>
              </ul>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-shine mt-8 flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 py-2.5 text-sm font-medium text-white shadow-lg shadow-indigo-500/25 transition-all hover:shadow-indigo-500/40"
              >
                Upgrade Now
                <ArrowRight className="h-4 w-4" />
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="px-4 py-16 sm:px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-8 text-center text-sm text-slate-400"
        >
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-emerald-400" />
            Your data is secure & private
          </div>
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-indigo-400" />
            Results in under 30 seconds
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-purple-400" />
            Available 24/7
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="glass border-t border-white/5 px-4 py-8 text-center text-sm text-slate-500 sm:px-6">
        <p>&copy; {new Date().getFullYear()} CVBuddy. All rights reserved.</p>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
  color,
  badge,
  index,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  badge?: string;
  index: number;
}) {
  const colorMap: Record<string, { bg: string; text: string; glow: string }> = {
    indigo: { bg: "bg-indigo-500/15", text: "text-indigo-400", glow: "shadow-indigo-500/10" },
    purple: { bg: "bg-purple-500/15", text: "text-purple-400", glow: "shadow-purple-500/10" },
    emerald: { bg: "bg-emerald-500/15", text: "text-emerald-400", glow: "shadow-emerald-500/10" },
    amber: { bg: "bg-amber-500/15", text: "text-amber-400", glow: "shadow-amber-500/10" },
  };

  const colors = colorMap[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className={`glass glow-hover relative rounded-2xl p-6 shadow-lg ${colors.glow}`}
    >
      {badge && (
        <span className="absolute -top-2 right-4 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 px-2.5 py-0.5 text-xs font-bold text-white shadow-lg shadow-indigo-500/25">
          {badge}
        </span>
      )}
      <div
        className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${colors.bg} ${colors.text}`}
      >
        {icon}
      </div>
      <h3 className="mt-4 font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-400">
        {description}
      </p>
    </motion.div>
  );
}

function PricingFeature({
  children,
  glow,
}: {
  children: React.ReactNode;
  glow?: boolean;
}) {
  return (
    <li className="flex items-center gap-2 text-sm">
      <svg
        className={`h-4 w-4 ${glow ? "text-purple-400" : "text-emerald-400"}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2.5}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
      <span className={glow ? "text-purple-200" : "text-slate-300"}>
        {children}
      </span>
    </li>
  );
}
