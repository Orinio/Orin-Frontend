import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "tertiary" | "danger";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  icon?: ReactNode;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-[var(--color-primary-teal)] text-white hover:bg-[var(--color-primary-teal-light)]",
  secondary:
    "border border-[var(--color-primary-teal)] bg-white text-[var(--color-primary-teal)] hover:bg-[var(--color-neutral-bg)]",
  tertiary: "bg-transparent text-[var(--color-primary-teal)] hover:bg-[var(--color-neutral-bg)]",
  danger:
    "bg-[var(--color-accent-coral)] text-white hover:bg-[var(--color-accent-coral-light)]",
};

const sizeClasses: Record<Size, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-4 text-sm",
  lg: "h-12 px-5 text-base",
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  loading = false,
  disabled,
  icon,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-[var(--radius-md)] font-medium transition duration-200 hover:scale-[1.02] active:scale-100 disabled:cursor-not-allowed disabled:opacity-60",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/70 border-t-transparent" />
      ) : (
        icon
      )}
      <span className={cn(loading && "sr-only")}>{children}</span>
    </button>
  );
}
