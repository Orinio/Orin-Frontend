"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function SignupPage() {
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [isSubmitting] = useState(false);

  return (
    <div className="mx-auto grid min-h-screen w-full max-w-[1200px] grid-cols-1 gap-8 px-4 py-10 md:px-8 lg:grid-cols-5 lg:gap-10">
      <section className="lg:col-span-3">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-primary-teal)]">
          Orin signup
        </p>
        <h1 className="mt-3 text-4xl font-semibold leading-tight md:text-5xl">
          Show the world what you can actually do.
        </h1>
        <p className="mt-3 max-w-xl text-base text-[var(--color-neutral-text-secondary)]">
          Your proof is your power. From scattered work to career momentum in 14 days.
        </p>

        <div className="mt-8 flex flex-col gap-3">
          <Button size="lg" loading={isSubmitting}>
            Continue with GitHub
          </Button>
          <Button variant="secondary" size="lg">
            Continue with Google
          </Button>
          <Button
            variant="tertiary"
            size="lg"
            type="button"
            onClick={() => setShowEmailForm((prev) => !prev)}
          >
            {showEmailForm ? "Hide email signup" : "Continue with email"}
          </Button>
        </div>

        <p className="mt-4 text-sm text-[var(--color-neutral-text-secondary)]">
          Step 1/3: Create Account
        </p>
        <div
          className="mt-2 text-sm text-[var(--color-neutral-text-secondary)]"
          aria-live="polite"
        >
          Trusted by 500+ students from VIT, BITS, NIT Bhopal. No spam, no recruiters by
          default.
        </div>

        {showEmailForm ? (
          <form className="mt-6 grid gap-4" aria-label="Email signup form">
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium">
                Email
              </label>
              <Input id="email" type="email" required />
            </div>
            <div>
              <label htmlFor="fullName" className="mb-2 block text-sm font-medium">
                Full Name (optional)
              </label>
              <Input id="fullName" type="text" />
            </div>
            <div>
              <label htmlFor="college" className="mb-2 block text-sm font-medium">
                College
              </label>
              <Input id="college" type="text" list="colleges" />
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
                className="min-h-11 w-full rounded-[var(--radius-md)] border border-[var(--color-neutral-border)] bg-[var(--color-neutral-surface)] px-3 text-sm focus:border-[var(--color-primary-teal)] focus:shadow-[0_0_0_2px_rgba(15,118,110,0.15)] focus:outline-none"
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
                Password
              </label>
              <Input id="password" type="password" required />
            </div>
            <Button size="lg" className="mt-2 w-full md:w-fit">
              Create account
            </Button>
            <p className="text-xs text-[var(--color-neutral-text-secondary)]">
              By continuing, you agree to Orin&apos;s Terms and Privacy policy.
            </p>
          </form>
        ) : null}
      </section>

      <aside className="space-y-4 lg:col-span-2">
        <Card className="bg-gradient-to-br from-white to-[var(--color-neutral-bg)]">
          <h2 className="text-xl font-semibold">Why students choose Orin</h2>
          <ul className="mt-4 space-y-3 text-sm text-[var(--color-neutral-text-secondary)]">
            <li>Connect GitHub, Codeforces, Kaggle, and certificates in one flow.</li>
            <li>Instant proof cards with verified skills recruiters understand.</li>
            <li>Daily coach notes keep your prep focused and measurable.</li>
          </ul>
        </Card>

        <Card>
          <h2 className="text-xl font-semibold">Student outcomes</h2>
          <div className="mt-4 space-y-3">
            {[
              "I turned my internship and Codeforces profile into one proof link recruiters understood.",
              "My first Orin profile helped me get 4 interview callbacks in 2 weeks.",
              "The daily coach note gave me a focused plan instead of random prep.",
            ].map((item) => (
              <article
                key={item}
                className="rounded-[var(--radius-md)] border border-[var(--color-neutral-border)] bg-[var(--color-neutral-bg)] p-4"
              >
                <p className="text-sm text-[var(--color-neutral-text-secondary)]">{item}</p>
              </article>
            ))}
          </div>
        </Card>
      </aside>
    </div>
  );
}
