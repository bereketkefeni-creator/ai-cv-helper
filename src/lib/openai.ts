import OpenAI from "openai";

let openaiClient: OpenAI | null = null;

export function getOpenAIClient(): OpenAI {
  if (!openaiClient) {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error(
        "OPENAI_API_KEY environment variable is not set. Please add it to your .env.local file."
      );
    }
    openaiClient = new OpenAI({ apiKey });
  }
  return openaiClient;
}

export async function analyzeCV(cvText: string): Promise<string> {
  const client = getOpenAIClient();
  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `You are an expert CV/resume analyst and career coach. Analyze the given CV and return a JSON response with exactly this structure:
{
  "score": <number 0-100>,
  "summary": "<brief overall assessment>",
  "strengths": ["<strength1>", "<strength2>", ...],
  "weaknesses": ["<weakness1>", "<weakness2>", ...],
  "skills": ["<skill1>", "<skill2>", ...],
  "experience": ["<role1 at company1>", "<role2 at company2>", ...],
  "education": ["<degree1 at school1>", ...]
}
Return ONLY valid JSON, no markdown.`,
      },
      {
        role: "user",
        content: `Analyze this CV:\n\n${cvText}`,
      },
    ],
    temperature: 0.3,
  });
  return response.choices[0].message.content ?? "{}";
}

export async function improveCV(cvText: string): Promise<string> {
  const client = getOpenAIClient();
  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `You are an expert CV writer and career coach. Improve the given CV and return a JSON response with exactly this structure:
{
  "improvedCV": "<the full improved CV text, well formatted with sections>",
  "changes": ["<change1 description>", "<change2 description>", ...],
  "tips": ["<tip1>", "<tip2>", ...]
}
Make the CV more impactful with stronger action verbs, better formatting suggestions, and quantified achievements. Return ONLY valid JSON, no markdown.`,
      },
      {
        role: "user",
        content: `Improve this CV:\n\n${cvText}`,
      },
    ],
    temperature: 0.5,
  });
  return response.choices[0].message.content ?? "{}";
}

export async function suggestJobs(cvText: string): Promise<string> {
  const client = getOpenAIClient();
  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `You are an expert career advisor and job market analyst. Based on the CV provided, suggest 5 relevant job positions. Return a JSON array with this structure:
[
  {
    "title": "<job title>",
    "company": "<type of company or example company>",
    "matchScore": <number 0-100>,
    "description": "<brief job description>",
    "requirements": ["<req1>", "<req2>", ...],
    "whyMatch": "<why this person is a good fit>"
  }
]
Return ONLY a valid JSON array, no markdown.`,
      },
      {
        role: "user",
        content: `Based on this CV, suggest jobs:\n\n${cvText}`,
      },
    ],
    temperature: 0.5,
  });
  return response.choices[0].message.content ?? "[]";
}

export async function generateCoverLetter(
  cvText: string,
  jobTitle: string,
  company: string
): Promise<string> {
  const client = getOpenAIClient();
  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `You are an expert cover letter writer. Write a compelling, personalized cover letter based on the CV and job details provided. Return a JSON response with this structure:
{
  "coverLetter": "<the full cover letter text>",
  "jobTitle": "<the job title>",
  "company": "<the company name>"
}
The cover letter should be professional, highlight relevant experience from the CV, and show enthusiasm for the role. Return ONLY valid JSON, no markdown.`,
      },
      {
        role: "user",
        content: `Write a cover letter for the position of "${jobTitle}" at "${company}" based on this CV:\n\n${cvText}`,
      },
    ],
    temperature: 0.6,
  });
  return response.choices[0].message.content ?? "{}";
}
