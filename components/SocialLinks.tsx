// Social media icon row, driven by lib/extra.ts.
import { socials } from "@/lib/extra";
export default function SocialLinks() {
  const cls =
    "flex h-10 w-10 items-center justify-center rounded-full border border-surface-border bg-white text-ink-700 transition hover:border-brand-600 hover:text-brand-600";
  return (
    <ul className="flex flex-wrap gap-3" aria-label="Social media">
      {socials.map((s) => (
        <li key={s.name}>
          {s.href ? (
            <a
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.name}
              className={cls}
            >
              <s.icon className="h-4 w-4" aria-hidden />
            </a>
          ) : (
            <span
              aria-label={`${s.name} (link coming soon)`}
              role="img"
              className={`${cls} cursor-default opacity-60`}
            >
              <s.icon className="h-4 w-4" aria-hidden />
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}
