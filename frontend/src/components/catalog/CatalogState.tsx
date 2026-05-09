import type { ReactNode } from "react";

import { cn } from "../../lib/cn";

type CatalogStateProps = {
  type: "loading" | "error" | "empty";
  title: string;
  message?: string;
  action?: ReactNode;
  className?: string;
};

const typeStyles = {
  loading: "border-amber-line bg-amber-cream",
  error: "border-amber-gold bg-amber-ivory",
  empty: "border-amber-line bg-amber-ivory",
};

export function CatalogState({
  type,
  title,
  message,
  action,
  className,
}: CatalogStateProps) {
  return (
    <div
      className={cn(
        "rounded-brand border p-8 text-center",
        typeStyles[type],
        className,
      )}
      role={type === "error" ? "alert" : "status"}
      aria-live={type === "loading" ? "polite" : undefined}
    >
      {type === "loading" ? (
        <div className="mx-auto mb-5 h-10 w-10 animate-pulse rounded-full border border-amber-gold bg-amber-softGold/30" />
      ) : null}
      <h2 className="font-heading text-3xl font-semibold text-amber-black">
        {title}
      </h2>
      {message ? (
        <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-amber-stone">
          {message}
        </p>
      ) : null}
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}
