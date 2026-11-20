// components/SectionHeading.tsx
// Reusable section title with eyebrow label and description.
export default function SectionHeading({
  eyebrow,
  title,
  desc,
  center = false,
  as: Heading = "h2",
}: {
  eyebrow?: string;
  title: string;
  desc?: string;
  center?: boolean;
  as?: "h1" | "h2" | "h3";
}) {
  return (
    <div className={`max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[.2em] text-brand-600">
          {eyebrow}
        </p>
      )}
      <Heading className="font-display text-3xl font-bold tracking-tight sm:text-4xl">{title}</Heading>
      {desc && <p className="mt-4 text-lg leading-relaxed text-ink-500">{desc}</p>}
    </div>
  );
}
