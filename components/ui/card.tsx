import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-[var(--radius-lg)] border border-[var(--color-neutral-border)] bg-[var(--color-neutral-surface)] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.1),0_1px_2px_rgba(0,0,0,0.06)] transition duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] hover:scale-[1.02] hover:shadow-[0_4px_6px_rgba(0,0,0,0.1),0_2px_4px_rgba(0,0,0,0.06)]",
        className,
      )}
      {...props}
    />
  );
}
