import type { ReactNode } from "react";

import { cn } from "../../lib/cn";


type CardProps = {
  children: ReactNode;
  className?: string;
  hover?: boolean;
};

export function Card({ children, className, hover = false }: CardProps) {
  return (
    <article
      className={cn(
        "rounded-brand border border-amber-line bg-amber-ivory shadow-premium",
        hover && "transition duration-200 hover:-translate-y-1 hover:border-amber-gold",
        className,
      )}
    >
      {children}
    </article>
  );
}
