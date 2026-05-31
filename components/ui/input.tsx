import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
}

export function Input({ className, hasError, ...props }: InputProps) {
  return (
    <input
      className={cn(
        "min-h-11 w-full rounded-[var(--radius-md)] border px-3 py-2 text-sm text-[var(--color-neutral-text)] transition",
        hasError
          ? "border-[var(--color-warning)]"
          : "border-[var(--color-neutral-border)]",
        "focus:border-[var(--color-primary-teal)] focus:shadow-[0_0_0_2px_rgba(15,118,110,0.15)] focus:outline-none",
        className,
      )}
      {...props}
    />
  );
}
