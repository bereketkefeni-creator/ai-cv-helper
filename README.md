# CVBuddy — AI CV & Job Helper

Your AI-powered career assistant that helps you land your dream job faster.

## Features

- **Upload CV** — Upload your resume in PDF, DOCX, or TXT format
- **AI CV Analysis** — Get a detailed score, strengths, weaknesses, and skills breakdown
- **AI CV Rewrite** (Pro) — Get a fully rewritten, optimized CV with stronger action verbs and quantified achievements
- **Job Suggestions** — Discover jobs that match your skills with match scores
- **Cover Letter Generator** — Generate tailored cover letters for any job with one click
- **Freemium Model** — Free tier with basic features, Pro tier ($9.99/mo) for full AI rewrite and unlimited cover letters

## Tech Stack

- **Frontend**: Next.js 16, React, Tailwind CSS
- **Backend**: Next.js API Routes
- **AI**: OpenAI GPT-4o-mini
- **PDF Parsing**: pdfjs-dist
- **DOCX Parsing**: mammoth

## Getting Started

### Prerequisites

- Node.js 20+
- OpenAI API Key

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/bereketkefeni-creator/ai-cv-helper.git
   cd ai-cv-helper
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file with your OpenAI API key:
   ```bash
   cp .env.example .env.local
   # Edit .env.local and add your OpenAI API key
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000)

## Environment Variables

| Variable | Description | Required |
|---|---|---|
| `OPENAI_API_KEY` | Your OpenAI API key | Yes |

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── upload/route.ts      # CV upload & parsing
│   │   ├── improve/route.ts     # AI CV improvement
│   │   ├── jobs/route.ts        # Job suggestions
│   │   └── cover-letter/route.ts # Cover letter generation
│   ├── dashboard/page.tsx       # Results dashboard
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Landing page
├── components/
│   ├── Header.tsx               # Navigation header
│   ├── FileUpload.tsx           # Drag & drop upload
│   ├── CVAnalysis.tsx           # CV score & analysis
│   ├── CVImprove.tsx            # AI rewrite (Pro)
│   ├── JobSuggestions.tsx       # Job matching
│   └── CoverLetter.tsx         # Cover letter generator
└── lib/
    ├── types.ts                 # TypeScript types
    ├── cv-parser.ts             # PDF/DOCX parsing
    └── openai.ts                # OpenAI integration
```

## Future Roadmap

- LinkedIn job scraping integration
- User authentication & persistent profiles
- Resume templates & export to PDF
- Interview preparation questions
- Application tracking dashboard

## License

MIT
