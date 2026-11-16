// Server route for the chatbot: sends the conversation to Groq using the secret GROQ_API_KEY.
import { NextResponse } from "next/server";
import { services, EMAIL, PHONE, SLOGAN } from "@/lib/data";


// Advanced System Prompt: Strict rules + Multi-language support
const SYSTEM = `You are the official AI Assistant for "Infinity Tech". 
Company Slogan: "${SLOGAN}".
Our Services: ${services.map((s) => `- ${s.title}: ${s.desc}`).join("\n")}.
Contact Info: Email: ${EMAIL}, Phone: ${PHONE}, or use the Contact page form.

STRICT RULES:
1. LANGUAGE: ALWAYS reply in the exact same language and script the user used. (e.g., if they ask in Roman Urdu, reply in Roman Urdu. If they ask in English, reply in English).
2. NO HALLUCINATION: Use ONLY the facts provided above. NEVER invent prices, clients, projects, statistics, addresses, or phone numbers. 
3. UNKNOWN INFO: If you don't know the answer, politely say: "I don't have that information right now. Please contact us at ${EMAIL} or ${PHONE} for details."
4. FORMAT: Keep answers friendly, professional, and concise (under 80 words). Use plain text ONLY. No markdown, no bold, no asterisks, no headings. For lists, put each item on a new line starting with "- ".
5. SCOPE: Only answer questions related to Infinity Tech, our services, or how to contact us. If asked unrelated questions (like coding, general knowledge, or math), politely decline and steer the conversation back to Infinity Tech.`;

export async function POST(req: Request) {
  const key = process.env.GROQ_API_KEY;
  if (!key) {
    console.error("[chat] GROQ_API_KEY is missing.");
    return NextResponse.json(
      { error: "Configuration error. Please try again later." },
      { status: 503 }
    );
  }

  let body: { messages?: { role: string; content: string }[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Sanitize and limit conversation history to save tokens and keep context
  const messages = (body.messages ?? [])
    .filter(
      (m) =>
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string" &&
        m.content.trim() !== ""
    )
    .slice(-8) // Keep last 8 messages for context
    .map((m) => ({
      role: m.role,
      content: m.content.slice(0, 500), // Limit individual message length
    }));

  if (!messages.length) {
    return NextResponse.json({ error: "No messages provided." }, { status: 400 });
  }

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        model: process.env.GROQ_MODEL || "llama3-70b-8192", // 'llama3-70b-8192' is highly reliable and smart
        temperature: 0.3, // Lower temperature makes it more factual and strict
        max_tokens: 800,
        top_p: 0.9,
        stream: false, // Set to true if you want streaming text later
        messages: [{ role: "system", content: SYSTEM }, ...messages],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("[chat] Groq API Error:", response.status, errorText.slice(0, 300));
      
      if (response.status === 429) {
         return NextResponse.json({ error: "Too many requests. Please wait a moment." }, { status: 429 });
      }
      return NextResponse.json({ error: "Failed to generate response." }, { status: 502 });
    }

    const data = await response.json();
    let replyText = data.choices?.[0]?.message?.content ?? "";

    // Post-processing: Ensure no accidental markdown slips through
    replyText = replyText.replace(/\*/g, "").trim();

    if (!replyText) {
      return NextResponse.json({ error: "Empty response from AI." }, { status: 502 });
    }

    return NextResponse.json({ reply: replyText });
    
  } catch (error) {
    console.error("[chat] Network or parsing error:", error);
    return NextResponse.json(
      { error: "Network error. Please check your connection." },
      { status: 502 }
    );
  }
}