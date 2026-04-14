import FileUpload from "@/components/FileUpload";
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

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 px-4 py-20 text-white sm:px-6">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        <div className="relative mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm backdrop-blur-sm">
            <Zap className="h-4 w-4 text-yellow-300" />
            AI-Powered Career Assistant
          </div>
          <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl">
            Your AI-Powered
            <br />
            <span className="bg-gradient-to-r from-yellow-200 to-yellow-400 bg-clip-text text-transparent">
              CV & Job Helper
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-blue-100">
            Upload your CV and let AI improve it, suggest matching jobs, and
            write tailored cover letters. Land your dream job faster.
          </p>

          <div className="mt-12 flex justify-center">
            <FileUpload />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              Everything you need to land the job
            </h2>
            <p className="mt-3 text-lg text-gray-500">
              Powerful AI tools to transform your job search
            </p>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <FeatureCard
              icon={<FileText className="h-6 w-6" />}
              title="Smart CV Analysis"
              description="Get a detailed score, strengths, and weaknesses analysis of your resume"
              color="blue"
            />
            <FeatureCard
              icon={<Sparkles className="h-6 w-6" />}
              title="AI CV Rewrite"
              description="Our AI rewrites your CV with stronger action verbs and quantified achievements"
              color="purple"
              badge="PRO"
            />
            <FeatureCard
              icon={<Briefcase className="h-6 w-6" />}
              title="Job Matching"
              description="Discover jobs that match your skills and experience with match scores"
              color="green"
            />
            <FeatureCard
              icon={<FileEdit className="h-6 w-6" />}
              title="Cover Letters"
              description="Generate tailored cover letters for any job with one click"
              color="amber"
            />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="bg-white px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              Simple, transparent pricing
            </h2>
            <p className="mt-3 text-lg text-gray-500">
              Start free, upgrade when you&apos;re ready
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {/* Free Plan */}
            <div className="rounded-2xl bg-gray-50 p-8 ring-1 ring-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Free</h3>
              <p className="mt-1 text-sm text-gray-500">
                Get started with basic features
              </p>
              <p className="mt-6">
                <span className="text-4xl font-bold text-gray-900">$0</span>
                <span className="text-sm text-gray-500">/month</span>
              </p>
              <ul className="mt-8 space-y-3">
                <PricingFeature>CV analysis & scoring</PricingFeature>
                <PricingFeature>Skills detection</PricingFeature>
                <PricingFeature>Job suggestions</PricingFeature>
                <PricingFeature>1 cover letter</PricingFeature>
              </ul>
              <button className="mt-8 w-full rounded-lg border border-gray-300 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100">
                Current Plan
              </button>
            </div>

            {/* Pro Plan */}
            <div className="relative rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 p-8 text-white shadow-xl">
              <div className="absolute -top-3 right-6 rounded-full bg-yellow-400 px-3 py-1 text-xs font-bold text-gray-900">
                POPULAR
              </div>
              <h3 className="text-lg font-semibold">Pro</h3>
              <p className="mt-1 text-sm text-blue-200">
                Full access to all features
              </p>
              <p className="mt-6">
                <span className="text-4xl font-bold">$9.99</span>
                <span className="text-sm text-blue-200">/month</span>
              </p>
              <ul className="mt-8 space-y-3">
                <PricingFeature light>
                  Everything in Free
                </PricingFeature>
                <PricingFeature light>
                  AI CV rewrite & optimization
                </PricingFeature>
                <PricingFeature light>
                  Unlimited cover letters
                </PricingFeature>
                <PricingFeature light>
                  Priority job suggestions
                </PricingFeature>
                <PricingFeature light>
                  LinkedIn optimization tips
                </PricingFeature>
              </ul>
              <button className="mt-8 flex w-full items-center justify-center gap-2 rounded-lg bg-white py-2.5 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-50">
                Upgrade Now
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-8 text-center text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-green-500" />
            Your data is secure & private
          </div>
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-blue-500" />
            Results in under 30 seconds
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-purple-500" />
            Available 24/7
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white px-4 py-8 text-center text-sm text-gray-500 sm:px-6">
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
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  badge?: string;
}) {
  const colorMap: Record<string, string> = {
    blue: "bg-blue-100 text-blue-600",
    purple: "bg-purple-100 text-purple-600",
    green: "bg-green-100 text-green-600",
    amber: "bg-amber-100 text-amber-600",
  };

  return (
    <div className="relative rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200 transition-all hover:shadow-md">
      {badge && (
        <span className="absolute -top-2 right-4 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-2.5 py-0.5 text-xs font-bold text-white">
          {badge}
        </span>
      )}
      <div
        className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${colorMap[color]}`}
      >
        {icon}
      </div>
      <h3 className="mt-4 font-semibold text-gray-900">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-gray-500">
        {description}
      </p>
    </div>
  );
}

function PricingFeature({
  children,
  light,
}: {
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <li className="flex items-center gap-2 text-sm">
      <svg
        className={`h-4 w-4 ${light ? "text-blue-200" : "text-green-500"}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2.5}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
      <span className={light ? "text-blue-100" : "text-gray-600"}>
        {children}
      </span>
    </li>
  );
}
