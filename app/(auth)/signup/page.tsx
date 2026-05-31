import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SignupPage() {
  return (
    <div className="mx-auto grid min-h-screen w-full max-w-[1200px] grid-cols-1 gap-8 px-4 py-8 md:px-8 lg:grid-cols-5 lg:gap-10">
      <section className="lg:col-span-3">
        <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
          Show the world what you can actually do.
        </h1>
        <p className="mt-3 max-w-xl text-base text-[var(--color-neutral-text-secondary)]">
          Your proof is your power. From scattered work to career momentum in 14
          days.
        </p>

        <div className="mt-8 flex flex-col gap-3">
          <Button size="lg">Continue with GitHub</Button>
          <Button variant="secondary" size="lg">
            Continue with Google
          </Button>
        </div>

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
              className="min-h-11 w-full rounded-[var(--radius-md)] border border-[var(--color-neutral-border)] bg-white px-3"
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
        </form>

        <p className="mt-4 text-sm text-[var(--color-neutral-text-secondary)]">
          Step 1/3: Create Account
        </p>
        <p className="mt-2 text-sm text-[var(--color-neutral-text-secondary)]">
          Trusted by 500+ students from VIT, BITS, NIT Bhopal. No spam, no
          recruiters by default.
        </p>
      </section>

      <aside className="lg:col-span-2">
        <div className="space-y-4 rounded-[var(--radius-lg)] border border-[var(--color-neutral-border)] bg-[var(--color-neutral-surface)] p-6">
          <h2 className="text-xl font-semibold">Student outcomes</h2>
          {[
            "I turned my internship and Codeforces profile into one proof link recruiters understood.",
            "My first ProofLoop profile helped me get 4 interview callbacks in 2 weeks.",
            "The daily coach note gave me a focused plan instead of random prep.",
          ].map((item) => (
            <article key={item} className="rounded border border-[var(--color-neutral-border)] p-4">
              <p className="text-sm text-[var(--color-neutral-text-secondary)]">{item}</p>
            </article>
          ))}
        </div>
      </aside>
    </div>
  );
}
