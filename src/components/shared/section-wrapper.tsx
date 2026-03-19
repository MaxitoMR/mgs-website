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
        "py-16 md:py-24",
        dark ? "bg-brand-dark text-white" : "bg-white",
        className
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}
