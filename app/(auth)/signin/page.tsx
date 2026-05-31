import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--color-neutral-bg)] to-[var(--color-primary-soft)]">
      <div className="mx-auto flex min-h-screen w-full max-w-[1200px] items-center justify-center px-4 py-12 md:px-8">
        <Card className="w-full max-w-md">
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-sm font-semibold text-[var(--color-primary-teal)]">ORIN</p>
              <h1 className="mt-2 text-2xl font-semibold">Sign in to ORIN</h1>
              <p className="mt-1 text-sm text-[var(--color-neutral-text-secondary)]">
                Welcome back. Let&apos;s pick up where you left off.
              </p>
            </div>

            <form className="grid gap-4">
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium">
                  Email<span className="text-[var(--color-danger)]">*</span>
                </label>
                <Input id="email" type="email" required placeholder="you@orin.app" />
              </div>
              <div>
                <label htmlFor="password" className="mb-2 block text-sm font-medium">
                  Password<span className="text-[var(--color-danger)]">*</span>
                </label>
                <Input id="password" type="password" required placeholder="Your password" />
              </div>
              <Button size="lg" className="w-full">
                Sign in
              </Button>
            </form>

            <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-[var(--color-neutral-text-secondary)]">
              <Link href="/reset-password" className="text-[var(--color-primary-teal)]">
                Forgot password?
              </Link>
              <span>
                New to ORIN?{" "}
                <Link href="/signup" className="text-[var(--color-primary-teal)]">
                  Create account
                </Link>
              </span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
