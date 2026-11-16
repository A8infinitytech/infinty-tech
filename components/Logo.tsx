// Normal logo in light mode, reversed-wordmark logo in dark mode (switched by the .dark class in globals.css).
import Image from "next/image";

export default function Logo({
  className = "h-10",
  alt = "Infinity Tech",
}: {
  className?: string;
  alt?: string;
}) {
  return (
    <>
      <Image
        src="/logo.png"
        alt={alt}
        width={536}
        height={148}
        className={`${className} w-auto logo-light`}
         loading="eager" 
      />
      <Image
        src="/logo-dark.png"
        alt={alt}
        width={536}
        height={148}
        className={`${className} w-auto logo-dark`}
         loading="eager" 
      />
    </>
  );
}
