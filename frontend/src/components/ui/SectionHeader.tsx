import { cn } from "../../lib/cn";


type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "default" | "inverse";
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "default",
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
      )}
    >
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-gold">
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "mt-3 font-heading text-4xl font-semibold leading-tight sm:text-5xl",
          tone === "inverse" ? "text-amber-ivory" : "text-amber-black",
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 text-base leading-8 sm:text-lg",
            tone === "inverse" ? "text-amber-muted" : "text-amber-stone",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
