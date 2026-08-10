import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  dark?: boolean;
}

export function SectionWrapper({
  children,
  className,
  id,
  dark,
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={cn(
        /* 32px on phones, not 60. This wrapper is used by twelve routes, most
           of which stack three or four of them, so the mobile figure was
           spending 480px of a 715px screen on nothing. `md:` and `lg:` are
           unchanged: at those widths the whitespace is doing the job it was
           chosen for. */
        "relative py-8 sm:py-[60px] md:py-[80px] lg:py-[120px]",
        dark ? "bg-brand-dark text-white" : "bg-white",
        className
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}
