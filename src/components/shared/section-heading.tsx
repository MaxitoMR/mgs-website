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
      <p className="t-eyebrow text-brand-green-text">
        {eyebrow}
      </p>
      {/* Was `font-bold` at `text-[1.75rem] sm:text-4xl`. Every other section
          heading on the site is the light cut — this component is used on one
          page, so it was the outlier setting a second heading voice rather
          than the rule. `t-h2` puts it in the same voice as the rest. */}
      <h2 className="t-h2 mt-3 font-display text-gray-900">
        {title}
      </h2>
      {lede && (
        <p className="t-lead t-measure mt-5 max-w-2xl text-gray-600">
          {lede}
        </p>
      )}
    </div>
  );
}
