"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, FileText, Loader2, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function FileUpload() {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      setUploading(true);
      setError(null);

      try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Upload failed");
        }

        sessionStorage.setItem("cvData", JSON.stringify(data));
        router.push("/dashboard");
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to upload file"
        );
      } finally {
        setUploading(false);
      }
    },
    [router]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
      "text/plain": [".txt"],
    },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024,
    disabled: uploading,
  });

  return (
    <div className="w-full max-w-xl">
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <div
          {...getRootProps()}
          className={`glass-light glow-hover group relative cursor-pointer rounded-2xl border-2 border-dashed p-12 text-center transition-all duration-300 ${
            isDragActive
              ? "border-indigo-400 bg-indigo-500/10"
              : "border-white/20 hover:border-indigo-400/50"
          } ${uploading ? "pointer-events-none opacity-60" : ""}`}
        >
          <input {...getInputProps()} />

          {uploading ? (
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="h-12 w-12 animate-spin text-indigo-400" />
              <div>
                <p className="text-lg font-semibold text-white">
                  Analyzing your CV...
                </p>
                <p className="mt-1 text-sm text-slate-400">
                  Our AI is reading and scoring your resume
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-500/20 ring-1 ring-indigo-400/30"
              >
                {isDragActive ? (
                  <FileText className="h-8 w-8 text-indigo-400" />
                ) : (
                  <Upload className="h-8 w-8 text-indigo-400" />
                )}
              </motion.div>
              <div>
                <p className="text-lg font-semibold text-white">
                  {isDragActive
                    ? "Drop your CV here"
                    : "Upload your CV"}
                </p>
                <p className="mt-1 text-sm text-slate-400">
                  Drag & drop or click to browse
                </p>
                <p className="mt-2 text-xs text-slate-500">
                  PDF, DOCX, or TXT (max 10MB)
                </p>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-4 flex items-center gap-2 rounded-lg bg-red-500/10 p-3 text-sm text-red-300 ring-1 ring-red-500/20"
          >
            <AlertCircle className="h-4 w-4 shrink-0" />
            {error}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
