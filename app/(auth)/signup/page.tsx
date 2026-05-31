"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function SignupPage() {
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [isSubmitting] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--color-neutral-bg)] to-[var(--color-primary-soft)]">
      <div className="mx-auto grid w-full max-w-[1200px] gap-10 px-4 py-12 md:px-8 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="flex flex-col justify-center gap-6">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-primary-teal)]">
            ORIN onboarding
          </p>
          <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
            Create your account and start building proof.
          </h1>
          <p className="max-w-xl text-base text-[var(--color-neutral-text-secondary)]">
            Bring every project, competition, and win into one verified, shareable profile.
          </p>
          <div className="grid gap-3 text-sm text-[var(--color-neutral-text-secondary)]">
            <div className="flex items-center gap-2">
              <span className="text-[var(--color-accent-green)]">✓</span>
              Trusted by 500+ students across top universities.
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[var(--color-accent-green)]">✓</span>
              No spam, no recruiters by default. You control sharing.
            </div>
          </div>
        </section>

        <Card className="mx-auto w-full max-w-md">
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-sm font-semibold text-[var(--color-primary-teal)]">ORIN</p>
              <h2 className="mt-2 text-2xl font-semibold">Create your account</h2>
              <p className="mt-1 text-sm text-[var(--color-neutral-text-secondary)]">
                Step 1 of 3 · Let&apos;s get started.
              </p>
            </div>
            <div className="grid gap-3">
              <Button size="lg" loading={isSubmitting}>
                Continue with GitHub
              </Button>
              <Button variant="secondary" size="lg">
                Continue with Google
              </Button>
              <Button
                variant="ghost"
                size="lg"
                type="button"
                onClick={() => setShowEmailForm((prev) => !prev)}
              >
                {showEmailForm ? "Hide email signup" : "Continue with email"}
              </Button>
            </div>

            {showEmailForm ? (
              <form className="mt-2 grid gap-4" aria-label="Email signup form">
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium">
                    Email<span className="text-[var(--color-danger)]">*</span>
                  </label>
                  <Input id="email" type="email" required placeholder="you@orin.app" />
                </div>
                <div>
                  <label htmlFor="fullName" className="mb-2 block text-sm font-medium">
                    Full Name (optional)
                  </label>
                  <Input id="fullName" type="text" placeholder="Your name" />
                </div>
                <div>
                  <label htmlFor="college" className="mb-2 block text-sm font-medium">
                    College
                  </label>
                  <Input id="college" type="text" list="colleges" placeholder="College name" />
                  <datalist id="colleges">
                    <option value="VIT Vellore" />
                    <option value="BITS Pilani" />
                    <option value="NIT Bhopal" />
                  </datalist>
                </div>
                <div>
                  <label htmlFor="year" className="mb-2 block text-sm font-medium">
                    Year
                  </label>
                  <select
                    id="year"
                    className="min-h-11 w-full rounded-[6px] border border-[var(--color-neutral-border)] bg-[var(--color-neutral-surface)] px-3 text-base text-[var(--color-neutral-text)] transition focus:border-[var(--color-primary-teal)] focus:shadow-[0_0_0_3px_rgba(14,165,233,0.1)] focus:outline-none"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select year
                    </option>
                    <option value="first">1st</option>
                    <option value="second">2nd</option>
                    <option value="third">3rd</option>
                    <option value="fourth">4th</option>
                    <option value="graduate">Graduate</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="password" className="mb-2 block text-sm font-medium">
                    Password<span className="text-[var(--color-danger)]">*</span>
                  </label>
                  <Input id="password" type="password" required placeholder="Use 8+ characters" />
                </div>
                <Button size="lg" className="w-full">
                  Create account
                </Button>
                <p className="text-xs text-[var(--color-neutral-text-secondary)]">
                  By continuing, you agree to ORIN&apos;s Terms and Privacy policy.
                </p>
              </form>
            ) : null}

            <p className="text-sm text-[var(--color-neutral-text-secondary)]">
              Already have an account?{" "}
              <Link href="/signin" className="text-[var(--color-primary-teal)]">
                Sign in
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
