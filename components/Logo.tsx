// components/Logo.tsx
"use client";
// Normal logo in light mode, reversed-wordmark logo in dark mode (switched by the .dark class in globals.css).
import Image from "next/image";
import { useContext } from "react";
import { SiteContentContext } from "@/lib/useSiteContent";

export default function Logo({
  className = "h-10",
  alt,
}: {
  className?: string;
  alt?: string;
}) {
  const content = useContext(SiteContentContext);
  const logo = content?.images.logo ?? {
    src: "/logo.png",
    darkSrc: "/logo-dark.png",
    alt: "Infinity",
  };
  const logoAlt = alt ?? logo.alt;
  return (
    <>
      <Image
        src={logo.src}
        alt={logoAlt}
        width={536}
        height={148}
        className={`${className} w-auto logo-light`}
        sizes="(max-width: 768px) 145px, 175px"
        loading="eager"
      />
      <Image
        src={logo.darkSrc}
        alt={logoAlt}
        width={536}
        height={148}
        className={`${className} w-auto logo-dark`}
        sizes="(max-width: 768px) 145px, 175px"
        loading="lazy"
      />
    </>
  );
}
