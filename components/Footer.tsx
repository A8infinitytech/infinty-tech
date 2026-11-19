// components/Footer.tsx
"use client";

// Site footer: logo, slogan, social icons, page links, email and subscribe form.
import { useEffect, useState } from "react";
import Link from "next/link";
import SocialLinks from "./SocialLinks";
import { useSiteContent } from "@/lib/useSiteContent";
import { iconElement } from "@/lib/data";
import Logo from "./Logo";


export default function Footer() {
  const [year, setYear] = useState<number | null>(null);
  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);
  const [subEmail, setSubEmail] = useState("");
  const [subStatus, setSubStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const content = useSiteContent();

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!subEmail) return;
    
    setSubStatus("sending");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: subEmail }),
      });
      if (!res.ok) throw new Error("Failed");
      setSubStatus("sent");
      setSubEmail("");
    } catch {
      setSubStatus("error");
    }
  }

  return (
    <footer className="border-t border-surface-border bg-surface">
      {/* Yahan gap-10 ki jagah gap-8 kiya hai taake spacing tight aur barabar lage */}
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 sm:px-6 md:grid-cols-4">
        
        {/* 1. Logo & Socials */}
        <div className="md:col-span-1">
          <Logo className="h-12" />
          <p className="mt-4 max-w-xs text-sm text-ink-500">{content.constants.slogan}</p>
          <div className="mt-5">
            <SocialLinks />
          </div>
        </div>
        
        {/* 2. Pages */}
        <nav aria-label="Footer" className="md:pl-4">
          <h3 className="mb-4 text-sm font-semibold">{content.footer.headings.pages}</h3>
          <ul className="space-y-2 text-sm text-ink-500">
            {content.navigation.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="hover:text-brand-600 transition-colors">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        {/* 3. Contact */}
        <div className="md:pl-4">
          <h3 className="mb-4 text-sm font-semibold">{content.footer.headings.contact}</h3>
          <a
            href={`mailto:${content.constants.email}`}
            className="inline-flex items-center gap-2 text-sm text-ink-500 hover:text-brand-600 transition-colors"
          >
            {iconElement("Mail", { className: "h-4 w-4", "aria-hidden": true })}
            {content.constants.email}
          </a>
          <a
            href={content.constants.phoneHref}
            className="mt-3 flex items-center gap-2 text-sm text-ink-500 hover:text-brand-600 transition-colors"
          >
            {iconElement("Phone", { className: "h-4 w-4", "aria-hidden": true })}
            {content.constants.phone}
          </a>
        </div>

        {/* 4. Newsletter */}
        <div>
          <h3 className="mb-4 text-sm font-semibold">{content.footer.headings.newsletter}</h3>
          <p className="mb-3 text-sm text-ink-500">
            {content.footer.newsletterDescription}
          </p>
          {subStatus === "sent" ? (
            <p className="text-sm font-medium text-green-600">
              {content.footer.success}
            </p>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
              <input
                type="email"
                value={subEmail}
                onChange={(e) => setSubEmail(e.target.value)}
                required
                placeholder={content.footer.emailPlaceholder}
                className="w-full rounded-lg border border-surface-border bg-white px-3 py-2 text-sm focus:border-brand-600 focus:outline-none"
              />
              <button
                type="submit"
                disabled={subStatus === "sending"}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-700 disabled:opacity-60"
              >
                {subStatus === "sending" ? (
                  <>{content.footer.waitLabel} {iconElement("Loader2", { className: "h-4 w-4 animate-spin", "aria-hidden": true })}</>
                ) : (
                  content.footer.subscribeLabel
                )}
              </button>
              {subStatus === "error" && (
                <p className="text-xs text-red-500">{content.footer.error}</p>
              )}
            </form>
          )}
        </div>
      </div>
      
      <div className="border-t border-surface-border py-5 text-center text-xs text-ink-500">
        {content.footer.copyrightSymbol} {year ? `${year} ` : ""}{content.footer.copyrightText}
      </div>
    </footer>
  );
}
