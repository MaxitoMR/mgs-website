import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  /** Small green label above the heading. */
  eyebrow: string;
  title: React.ReactNode;
  /** Optional supporting line under the heading. */
  lede?: React.ReactNode;
  className?: string;
}

/**
 * The single heading treatment for stacked content sections.
 *
 * Consolidating /about, /leadership and the award left four sections on one
 * page using three different heading styles — `font-display` bold at 3xl,
 * `font-gothic` at weight 400, and `font-display` bold at 2xl — with eyebrows
 * split between <span> and <p>. Nothing was wrong with any one of them; the
 * inconsistency is what made the page read as separate pages stapled
 * together. Route every section header through here so that can't drift again.
 */
export function SectionHeading({
  eyebrow,
  title,
  lede,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-3xl", className)}>
      <p className="text-sm font-bold uppercase tracking-widest text-brand-green-text">
        {eyebrow}
      </p>
      <h2 className="mt-3 font-display text-3xl font-bold leading-[1.15] text-gray-900 sm:text-4xl">
        {title}
      </h2>
      {lede && (
        <p
          className="mt-5 max-w-2xl text-gray-600"
          style={{ fontWeight: 300, lineHeight: 1.75 }}
        >
          {lede}
        </p>
      )}
    </div>
  );
}
