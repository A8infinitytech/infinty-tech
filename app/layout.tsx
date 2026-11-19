// app/layout.tsx
// Root layout: loads fonts, applies saved theme before paint and renders site chrome outside admin routes.
import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";
import AppChrome from "@/components/AppChrome";
import SiteContentProvider from "@/components/SiteContentProvider";
import { getSiteContent } from "@/lib/site-content";
const display = Montserrat({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const body = Inter({ subsets: ["latin"], variable: "--font-body", display: "swap" });
export async function generateMetadata(): Promise<Metadata> {
  const content = await getSiteContent();
  return content.site.metadata;
}
export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const content = await getSiteContent();
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth" className={`${display.variable} ${body.variable}`}>
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem("theme");if(t==="dark"||(!t&&matchMedia("(prefers-color-scheme: dark)").matches))document.documentElement.classList.add("dark")}catch(e){}`,
          }}
        />
        <SiteContentProvider content={content}>
          <AppChrome skipLink={content.site.skipLink}>{children}</AppChrome>
        </SiteContentProvider>
      </body>
    </html>
  );
}
