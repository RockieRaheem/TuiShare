import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { question } = req.body;
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
  const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' + GEMINI_API_KEY;

  // Restrict Gemini to only answer about the website and navigation
  const systemPrompt = `You are TuiShare's website assistant. Only answer questions about the TuiShare website, its features, navigation, and user roles. If a question is not about the website or navigation, politely refuse. If the user asks for navigation (e.g., 'go to dashboard', 'show transactions'), respond with a JSON object: { "navigateTo": "/route" } for the correct route.`;

  const geminiRes = await fetch(GEMINI_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [
        { parts: [{ text: systemPrompt, role: "user" }] },
        { parts: [{ text: question }] }
      ]
    })
  });
  const data = await geminiRes.json();
  const answer = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't find an answer.";

  res.status(200).json({ answer });
}
