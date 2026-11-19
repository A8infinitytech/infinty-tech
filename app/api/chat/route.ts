// app/api/chat/route.ts
// Server route for the chatbot: sends the conversation to Groq using the secret GROQ_API_KEY.
import { NextResponse } from "next/server";
import { getServices } from "@/lib/services";
import { getSettings } from "@/lib/settings";

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
    // 1. Database se live Services aur Settings fetch karein
    const servicesData = await getServices();
    const settingsData = await getSettings();

    // 2. Fallback values set karein agar DB khali ho
    const email = settingsData?.email || "a8infinitytech@gmail.com";
    const phone = settingsData?.phone || "+92 318 1935228";
    const slogan = settingsData?.slogan || "Build Smarter. Move Faster.";

    // 3. Dynamic System Prompt banayein
    const servicesText = servicesData.map((s) => `- ${s.title}: ${s.description ?? ""}`).join("\n");

    const SYSTEM = `You are the official AI Assistant for "Infinity Tech". 
Company Slogan: "${slogan}".
Our Services: 
${servicesText}
Contact Info: Email: ${email}, Phone: ${phone}, or use the Contact page form.

STRICT RULES:
1. LANGUAGE: ALWAYS reply in the exact same language and script the user used. (e.g., if they ask in Roman Urdu, reply in Roman Urdu. If they ask in English, reply in English).
2. NO HALLUCINATION: Use ONLY the facts provided above. NEVER invent prices, clients, projects, statistics, addresses, or phone numbers. 
3. UNKNOWN INFO: If you don't know the answer, politely say: "I don't have that information right now. Please contact us at ${email} or ${phone} for details."
4. FORMAT & SERVICES: When the user asks about services (e.g., "Services" or "What do you do?"), DO NOT just output a raw list of titles. Always start with a friendly introductory sentence like "Here are the services we offer at Infinity Tech:" or "We provide the following solutions:". Then list the service names clearly.
5. Keep answers friendly, professional, and concise. Use plain text ONLY. Do not use asterisks. For lists, put each item on a new line. You can use a hyphen "-" or bullet points for the list items.
6. SCOPE: Only answer questions related to Infinity Tech, our services, or how to contact us. If asked unrelated questions, politely decline and steer the conversation back to Infinity Tech.`;

    // 4. Groq API call
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        model: process.env.GROQ_MODEL || "llama3-70b-8192", 
        temperature: 0.3, 
        max_tokens: 800,
        top_p: 0.9,
        stream: false, 
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