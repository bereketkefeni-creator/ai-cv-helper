import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CVBuddy — AI CV & Job Helper",
  description:
    "Upload your CV, get AI-powered improvements, job suggestions, and tailored cover letters.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="bg-animated-gradient relative flex min-h-full flex-col overflow-x-hidden">
        {/* Floating orbs */}
        <div className="orb orb-1 -left-64 top-0" />
        <div className="orb orb-2 -right-48 top-1/3" />
        <div className="orb orb-3 left-1/4 bottom-0" />

        <Header />
        <main className="relative z-10 flex-1">{children}</main>
      </body>
    </html>
  );
}
