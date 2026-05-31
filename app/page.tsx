import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const features = [
  {
    title: "Real-time proof cards",
    description: "Turn GitHub, Kaggle, and certificate data into verified proof in minutes.",
    icon: "M4 12h6v8H4zM14 4h6v16h-6zM4 4h6v6H4z",
  },
  {
    title: "Skill intelligence",
    description: "See the skills recruiters care about, tagged automatically from your work.",
    icon: "M4 18V6m5 12V9m5 9v-4m5 4V8",
  },
  {
    title: "Showcase-ready profiles",
    description: "Share a polished ORIN profile link with every application.",
    icon: "M12 2l7 4v6c0 5-3 9-7 10-4-1-7-5-7-10V6l7-4z",
  },
];

const testimonials = [
  {
    name: "Aditi K.",
    title: "SWE Intern · Stripe",
    quote:
      "ORIN turned my scattered projects into a profile recruiters instantly understood.",
  },
  {
    name: "Rahul M.",
    title: "Final Year · BITS Pilani",
    quote: "I finally had a clean way to show verified skills, not just claims.",
  },
  {
    name: "Neha P.",
    title: "Product Analyst · Loom",
    quote: "The proof cards feel premium and made my outreach feel confident.",
  },
];

const pricing = [
  {
    name: "Starter",
    price: "$0",
    description: "For building your first proof cards.",
    features: ["3 proof sources", "Public profile", "Weekly skill insights"],
  },
  {
    name: "Pro",
    price: "$12",
    badge: "Popular",
    description: "For ambitious builders ready to stand out.",
    features: ["Unlimited sources", "Priority verification", "Custom proof links"],
  },
  {
    name: "Team",
    price: "$29",
    description: "For cohorts and placement cells.",
    features: ["Team dashboards", "Analytics exports", "Admin controls"],
  },
];

export default function LandingPage() {
  return (
    <main id="main-content" className="bg-[var(--color-neutral-bg)] text-[var(--color-neutral-text)]">
      <header className="sticky top-0 z-30 border-b border-[var(--color-neutral-border)] bg-[var(--color-neutral-surface)]/90 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-[1200px] items-center justify-between px-4 md:px-8">
          <Link href="/" className="text-lg font-semibold text-[var(--color-primary-teal)]">
            ORIN
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-medium text-[var(--color-neutral-text-secondary)] md:flex">
            <a href="#features" className="hover:text-[var(--color-primary-teal)]">
              Features
            </a>
            <a href="#testimonials" className="hover:text-[var(--color-primary-teal)]">
              Testimonials
            </a>
            <a href="#pricing" className="hover:text-[var(--color-primary-teal)]">
              Pricing
            </a>
            <a href="#cta" className="hover:text-[var(--color-primary-teal)]">
              Get started
            </a>
          </nav>
          <Link href="/signup">
            <Button size="sm">Start free</Button>
          </Link>
        </div>
      </header>

      <section className="mx-auto flex min-h-[calc(100vh-64px)] w-full max-w-[1200px] flex-col items-center justify-center gap-8 px-4 py-16 text-center md:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-primary-teal)]">
          Where proof meets delight
        </p>
        <h1 className="max-w-3xl text-4xl font-semibold leading-tight md:text-6xl">
          <span className="bg-gradient-to-r from-[var(--color-primary-teal)] to-[var(--color-primary-blue)] bg-clip-text text-transparent">
            Transform how you showcase your work.
          </span>
        </h1>
        <p className="max-w-2xl text-base text-[var(--color-neutral-text-secondary)] md:text-lg">
          ORIN turns scattered accomplishments into verified, shareable proof cards
          recruiters instantly trust.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/signup">
            <Button size="lg">Start free trial</Button>
          </Link>
          <Link href="/dashboard">
            <Button size="lg" variant="secondary">
              View dashboard
            </Button>
          </Link>
        </div>
      </section>

      <section id="features" className="mx-auto w-full max-w-[1200px] px-4 py-16 md:px-8">
        <div className="flex flex-col items-start gap-3 text-left">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-accent-magenta)]">
            Key features
          </p>
          <h2 className="text-3xl font-semibold md:text-4xl">Powerful proof, beautifully delivered.</h2>
          <p className="max-w-2xl text-base text-[var(--color-neutral-text-secondary)]">
            A vibrant experience with the data and verification recruiters care about.
          </p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title} className="hover:scale-[1.02]">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-primary-teal)]/10 text-[var(--color-primary-teal)]">
                <svg
                  aria-hidden="true"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d={feature.icon} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="mt-4 text-xl font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm text-[var(--color-neutral-text-secondary)]">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </section>

      <section id="testimonials" className="bg-gradient-to-b from-white to-[var(--color-neutral-bg)] py-16">
        <div className="mx-auto w-full max-w-[1200px] px-4 md:px-8">
          <div className="flex flex-col items-start gap-3">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-primary-teal)]">
              Testimonials
            </p>
            <h2 className="text-3xl font-semibold md:text-4xl">Loved by builders everywhere.</h2>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.name} className="shadow-[0_6px_20px_rgba(15,23,42,0.08)]">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-[var(--color-accent-purple)]/20" />
                  <div>
                    <p className="text-sm font-semibold">{testimonial.name}</p>
                    <p className="text-xs text-[var(--color-neutral-text-secondary)]">
                      {testimonial.title}
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-sm italic text-[var(--color-neutral-text-secondary)]">
                  “{testimonial.quote}”
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="mx-auto w-full max-w-[1200px] px-4 py-16 md:px-8">
        <div className="flex flex-col items-start gap-3">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-accent-purple)]">
            Pricing
          </p>
          <h2 className="text-3xl font-semibold md:text-4xl">Pick the plan that fits.</h2>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {pricing.map((plan) => (
            <Card
              key={plan.name}
              className={plan.badge ? "relative border-2 border-[var(--color-accent-magenta)]" : ""}
            >
              {plan.badge ? (
                <span className="absolute right-6 top-6 rounded-full bg-[var(--color-accent-magenta)] px-3 py-1 text-xs font-semibold text-white">
                  {plan.badge}
                </span>
              ) : null}
              <h3 className="text-xl font-semibold">{plan.name}</h3>
              <p className="mt-2 text-sm text-[var(--color-neutral-text-secondary)]">
                {plan.description}
              </p>
              <p className="mt-6 text-4xl font-semibold">{plan.price}</p>
              <ul className="mt-4 space-y-2 text-sm text-[var(--color-neutral-text-secondary)]">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <span className="text-[var(--color-accent-green)]">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <Button className="mt-6 w-full" variant={plan.badge ? "primary" : "secondary"}>
                Get started
              </Button>
            </Card>
          ))}
        </div>
      </section>

      <section
        id="cta"
        className="bg-gradient-to-r from-[var(--color-primary-teal)] to-[var(--color-primary-blue)] py-16 text-white"
      >
        <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center gap-4 px-4 text-center md:px-8">
          <h2 className="text-3xl font-semibold md:text-4xl">Ready to get started?</h2>
          <p className="max-w-2xl text-base text-white/90">
            Build your ORIN profile in minutes and show recruiters real proof.
          </p>
          <Link href="/signup">
            <Button
              size="lg"
              variant="ghost"
              className="bg-white text-[var(--color-primary-teal)] hover:bg-white/90"
            >
              Start free trial
            </Button>
          </Link>
        </div>
      </section>

      <footer className="bg-[var(--color-neutral-text)] py-12 text-[var(--color-neutral-text-tertiary)]">
        <div className="mx-auto grid w-full max-w-[1200px] gap-8 px-4 md:grid-cols-4 md:px-8">
          <div>
            <h3 className="text-lg font-semibold text-white">ORIN</h3>
            <p className="mt-2 text-sm text-white/70">
              Where functionality meets delight.
            </p>
          </div>
          {[
            { title: "Product", links: ["Features", "Pricing", "Dashboard"] },
            { title: "Company", links: ["About", "Careers", "Contact"] },
            { title: "Resources", links: ["Blog", "Support", "Legal"] },
          ].map((group) => (
            <div key={group.title}>
              <h4 className="text-sm font-semibold text-white">{group.title}</h4>
              <ul className="mt-3 space-y-2 text-sm">
                {group.links.map((link) => (
                  <li key={link} className="hover:text-[var(--color-primary-teal)]">
                    {link}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-10 text-center text-xs text-white/60">
          © 2026 ORIN. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
