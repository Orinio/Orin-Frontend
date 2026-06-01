'use client';

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/dashboard#my-proof", label: "My Proof" },
  { href: "/dashboard#opportunities", label: "Opportunities" },
  { href: "/dashboard/settings", label: "Settings" },
];

export function Navigation() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const getUser = async () => {
      if (!supabase) return;
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();

    if (!supabase) return;
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event: any, session: any) => {
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
    router.push('/signin');
  };

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-neutral-border)] bg-[var(--color-neutral-surface)] shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
      <nav
        className="mx-auto flex h-16 w-full max-w-[1200px] items-center justify-between gap-4 px-4 md:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        <div className="flex items-center gap-3">
          <button
            className="rounded-md border border-[var(--color-neutral-border)] p-2 text-[var(--color-neutral-text-secondary)] md:hidden"
            aria-label="Toggle navigation"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((prev) => !prev)}
            type="button"
          >
            <svg
              aria-hidden="true"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <Link href="/" className="text-lg font-semibold text-[var(--color-primary-emerald)]">
            Orin
          </Link>
        </div>

        <div className="hidden flex-1 items-center justify-center gap-6 md:flex">
          <div className="hidden items-center gap-6 lg:flex">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`border-b-2 border-transparent pb-1 text-sm font-medium text-[var(--color-neutral-text-secondary)] transition hover:text-[var(--color-primary-emerald)] ${
                  pathname === link.href && "border-[var(--color-primary-emerald)] text-[var(--color-primary-emerald)]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          {user && (
            <>
              <button
                className="relative rounded-full border border-[var(--color-neutral-border)] p-2 text-[var(--color-neutral-text-secondary)]"
                aria-label="Notifications"
                type="button"
              >
                <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-[var(--color-danger)]" />
                <svg
                  aria-hidden="true"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 17h5l-1.4-1.4A2 2 0 0118 14.2V11a6 6 0 10-12 0v3.2a2 2 0 01-.6 1.4L4 17h5m6 0a3 3 0 01-6 0m6 0H9"
                  />
                </svg>
              </button>
              <button
                className="min-h-11 rounded-full border border-[var(--color-neutral-border)] bg-[var(--color-neutral-bg)] px-3 text-sm font-medium"
                aria-label="Open user menu"
                type="button"
                onClick={handleSignOut}
              >
                {user.user_metadata?.full_name?.split(' ').map((n: string) => n[0]).join('') || 'U'}
              </button>
            </>
          )}
        </div>
      </nav>

      {isMenuOpen ? (
        <div className="border-t border-[var(--color-neutral-border)] bg-[var(--color-neutral-surface)] px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-[var(--color-neutral-text-secondary)] hover:bg-[var(--color-primary-soft)]"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {user && (
              <button
                onClick={handleSignOut}
                className="rounded-md px-3 py-2 text-left text-sm font-medium text-[var(--color-danger)] hover:bg-[var(--color-neutral-surface-alt)]"
              >
                Sign Out
              </button>
            )}
          </div>
        </div>
      ) : null}
    </header>
  );
}