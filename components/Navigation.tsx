"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/dashboard#my-proof", label: "My Proof" },
  { href: "/dashboard#opportunities", label: "Opportunities" },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-neutral-border)] bg-[var(--color-neutral-surface)]">
      <nav
        className="mx-auto flex h-16 w-full max-w-[1200px] items-center justify-between px-4 md:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        <Link href="/" className="text-lg font-semibold text-[var(--color-primary-teal)]">
          ProofLoop
        </Link>
        <div className="hidden gap-6 md:flex">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={cn(
                "text-sm font-medium text-[var(--color-neutral-text-secondary)] transition",
                pathname === link.href && "text-[var(--color-primary-teal)]",
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <button
          className="min-h-11 rounded-full border border-[var(--color-neutral-border)] px-3 text-sm"
          aria-label="Open user menu"
        >
          AG
        </button>
      </nav>
    </header>
  );
}
