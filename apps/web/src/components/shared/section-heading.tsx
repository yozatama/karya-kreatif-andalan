import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
  align?: "left" | "center";
}

export function SectionHeading({ title, subtitle, className, align = "center" }: SectionHeadingProps) {
  return (
    <div className={cn(align === "center" ? "text-center" : "text-left", className)}>
      <h2 className="text-2xl font-bold text-navy-800 sm:text-3xl">{title}</h2>
      {subtitle && (
        <p className="mt-3 text-base text-navy-500 sm:text-lg">{subtitle}</p>
      )}
    </div>
  );
}
