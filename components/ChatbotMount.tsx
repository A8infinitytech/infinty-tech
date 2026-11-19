// components/ChatbotMount.tsx
"use client";
// Loads the chat widget after the page has finished loading, outside the initial bundle.
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Chatbot = dynamic(() => import("./Chatbot"), { ssr: false });

export default function ChatbotMount() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const load = () => setReady(true);
    const onOpen = () => setReady(true);

    if (document.readyState === "complete") {
      load();
    } else {
      window.addEventListener("load", load, { once: true });
    }

    // Open the widget immediately if a visitor asks before it mounts.
    window.addEventListener("open-chat", onOpen);

    return () => {
      window.removeEventListener("load", load);
      window.removeEventListener("open-chat", onOpen);
    };
  }, []);

  return ready ? <Chatbot /> : null;
}
