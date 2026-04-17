"use client";

import Link from "next/link";
import { FileText, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function Header() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="glass sticky top-0 z-50"
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/25">
            <FileText className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold text-white">
            CV<span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Buddy</span>
          </span>
        </Link>
        <nav className="flex items-center gap-4">
          <Link
            href="/"
            className="text-sm font-medium text-slate-300 transition-colors hover:text-white"
          >
            Home
          </Link>
          <Link
            href="/dashboard"
            className="text-sm font-medium text-slate-300 transition-colors hover:text-white"
          >
            Dashboard
          </Link>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-shine flex items-center gap-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-indigo-500/25 transition-all hover:shadow-indigo-500/40"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Upgrade Pro
          </motion.button>
        </nav>
      </div>
    </motion.header>
  );
}
