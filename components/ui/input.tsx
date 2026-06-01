import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
}

export function Input({ className, hasError, ...props }: InputProps) {
  return (
    <input
      className={cn(
        "min-h-11 w-full rounded-[6px] border bg-[var(--color-neutral-surface)] px-3 py-2 text-base text-[var(--color-neutral-text)] transition placeholder:text-[var(--color-neutral-text-tertiary)]",
        hasError
          ? "border-[var(--color-danger)]"
          : "border-[var(--color-neutral-border)]",
        "focus:border-[var(--color-primary-emerald)] focus:shadow-[0_0_0_3px_rgba(16,185,129,0.1)] focus:outline-none disabled:cursor-not-allowed disabled:bg-[var(--color-neutral-surface-alt)] disabled:text-[var(--color-neutral-text-secondary)]",
        className,
      )}
      {...props}
    />
  );
}