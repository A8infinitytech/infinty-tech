// Root layout: loads fonts, applies saved theme before paint, renders Navbar, Footer, Chatbot and scroll helpers on every page.
import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatbotMount from "@/components/ChatbotMount";
import ScrollUtils from "@/components/ScrollUtils";
const display = Montserrat({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const body = Inter({ subsets: ["latin"], variable: "--font-body", display: "swap" });
export const metadata: Metadata = {
  title: { default: "Infinity Tech | AI & Technology Solutions", template: "%s | Infinity Tech" },
  description:
    "Infinity Tech: Build Smarter. Move Faster. AI automation, AI development, web development, e-commerce and AI-powered web apps.",
  openGraph: {
    title: "Infinity Tech",
    description: "Build Smarter. Move Faster.",
    
    type: "website",
  },
  icons: "/icon.png",
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth" className={`${display.variable} ${body.variable}`}>
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem("theme");if(t==="dark"||(!t&&matchMedia("(prefers-color-scheme: dark)").matches))document.documentElement.classList.add("dark")}catch(e){}`,
          }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
        <ChatbotMount />
        <ScrollUtils />
      </body>
    </html>
  );
}
