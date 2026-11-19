// components/SocialLinks.tsx
"use client";
// Social media icon row, driven by lib/data.ts.
import { useSiteContent } from "@/lib/useSiteContent";
import { iconElement } from "@/lib/data";
export default function SocialLinks() {
  const content = useSiteContent();
  const cls =
    "flex h-10 w-10 items-center justify-center rounded-full border border-surface-border bg-white text-ink-700 transition hover:border-brand-600 hover:text-brand-600";
  return (
    <ul className="flex flex-wrap gap-3" aria-label={content.socialLinks.ariaLabel}>
      {content.socials.map((s) => (
        <li key={s.name}>
          {s.href ? (
            <a
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.name}
              className={cls}
            >
              {iconElement(s.icon, { className: "h-4 w-4", "aria-hidden": true })}
            </a>
          ) : (
            <span
              aria-label={`${s.name}${content.socialLinks.comingSoonSuffix}`}
              role="img"
              className={`${cls} cursor-default opacity-60`}
            >
              {iconElement(s.icon, { className: "h-4 w-4", "aria-hidden": true })}
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}
