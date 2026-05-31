import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-[var(--radius-lg)] border border-[var(--color-neutral-border)] bg-[var(--color-neutral-surface)] p-6 transition duration-200 hover:scale-[1.01] hover:shadow-[0_0.5px_4px_rgba(15,23,42,0.08)]",
        className,
      )}
      {...props}
    />
  );
}
