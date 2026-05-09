import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "../../lib/cn";


type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = {
  children: ReactNode;
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
} & Pick<ButtonHTMLAttributes<HTMLButtonElement>, "type" | "onClick">;

const variants: Record<ButtonVariant, string> = {
  primary:
    "border border-amber-gold bg-amber-gold text-amber-black hover:bg-amber-softGold hover:border-amber-softGold",
  secondary:
    "border border-amber-black bg-transparent text-amber-black hover:bg-amber-black hover:text-amber-ivory",
  ghost:
    "border border-transparent bg-transparent text-amber-black hover:border-amber-line hover:bg-amber-cream",
};

const sizes: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-xs",
  md: "px-5 py-3 text-sm",
  lg: "px-7 py-4 text-sm",
};

export function Button({
  children,
  className,
  variant = "primary",
  size = "md",
  type = "button",
  onClick,
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-brand font-body font-semibold uppercase tracking-[0.16em] transition-colors duration-200 focus-visible:outline-amber-gold disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        sizes[size],
        className,
      )}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
