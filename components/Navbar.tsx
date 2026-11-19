// components/Navbar.tsx
"use client";
// Sticky top navigation with mobile menu and theme toggle.
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useSiteContent } from "@/lib/useSiteContent";
import { iconElement } from "@/lib/data";
import Button from "./Button";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const content = useSiteContent();

  return (
    <header className="sticky top-0 z-50 border-b border-surface-border bg-white/90 backdrop-blur">
      <nav
        aria-label={content.navbar.ariaLabel}
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6"
      >
        <Link href="/" aria-label={content.navbar.homeAriaLabel}>
          <Logo className="h-10" />
        </Link>
        <ul className="hidden items-center gap-8 md:flex">
          {content.navigation.map((n) => (
            <li key={n.href}>
              <Link
                href={n.href}
                aria-current={path === n.href ? "page" : undefined}
                className={`text-sm font-medium transition-colors hover:text-brand-600 ${path === n.href ? "text-brand-600" : "text-ink-700"}`}
              >
                {n.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          <Button href="/contact" arrow={false} className="!py-2.5">
            {content.navbar.ctaLabel}
          </Button>
        </div>
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            aria-label={open ? content.navbar.closeMenuLabel : content.navbar.openMenuLabel}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(!open)}
          >
            {iconElement(open ? "X" : "Menu")}
          </button>
        </div>
      </nav>
      {open && (
        <ul
          id="mobile-menu"
          className="border-t border-surface-border bg-white px-4 py-4 md:hidden"
        >
          {content.navigation.map((n) => (
            <li key={n.href}>
              <Link
                href={n.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-3 font-medium hover:bg-brand-50"
              >
                {n.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
