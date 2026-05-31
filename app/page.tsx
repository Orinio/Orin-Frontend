import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <main
      id="main-content"
      className="mx-auto flex min-h-screen w-full max-w-[1200px] flex-col justify-center gap-8 px-4 py-12 md:px-8"
    >
      <p className="text-sm font-medium text-[var(--color-primary-teal)]">Orin</p>
      <h1 className="max-w-3xl text-4xl font-semibold leading-tight md:text-5xl">
        Show the world what you can actually do.
      </h1>
      <p className="max-w-2xl text-base text-[var(--color-neutral-text-secondary)] md:text-lg">
        Your proof is your power. Convert scattered work into a shareable profile
        recruiters trust.
      </p>
      <div className="flex flex-wrap gap-3">
        <Link href="/signup">
          <Button size="lg">Start building proof</Button>
        </Link>
        <Link href="/dashboard">
          <Button size="lg" variant="secondary">
            View dashboard preview
          </Button>
        </Link>
      </div>
    </main>
  );
}
