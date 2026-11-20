// components/Button.tsx
// Reusable link-styled button (primary and secondary variants).
import Link from "next/link";
import { iconElement } from "@/lib/data";
export default function Button({
  href,
  children,
  variant = "primary",
  arrow = true,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  arrow?: boolean;
  className?: string;
}) {
  const base =
    "group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-transform duration-200";
  const v =
    variant === "primary"
      ? "bg-brand-600 text-white shadow-glow hover:bg-brand-700 hover:-translate-y-0.5"
      : "border border-surface-border bg-white text-ink hover:border-brand-600 hover:text-brand-600";
  return (
    <Link href={href} className={`${base} ${v} ${className}`}>
      {children}
      {arrow &&
        iconElement("ArrowRight", {
          className: "h-4 w-4 transition-transform group-hover:translate-x-1",
          "aria-hidden": true,
          })}
    </Link>
  );
}
