// components/AppChrome.tsx
"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatbotMount from "@/components/ChatbotMount";
import ScrollUtils from "@/components/ScrollUtils";

export default function AppChrome({
  skipLink,
  children,
}: {
  skipLink: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname === "/admin" || pathname.startsWith("/admin/");

  if (isAdmin) return <>{children}</>;

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2"
      >
        {skipLink}
      </a>
      <Navbar />
      <main id="main">{children}</main>
      <Footer />
      <ChatbotMount />
      <ScrollUtils />
    </>
  );
}
