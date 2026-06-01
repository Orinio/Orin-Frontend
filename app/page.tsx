'use client';

import { useRef, type ComponentType, type SVGProps } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import {
  ArrowRight,
  Zap,
  BarChart3,
  Users,
  Lock,
  Sparkles,
  Check,
  Star,
  ChevronDown,
} from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const easeInOut = [0.4, 0, 0.2, 1] as const;

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: easeInOut },
  },
};

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

type Feature = {
  icon: IconComponent;
  title: string;
  description: string;
  color: string;
};

type Testimonial = {
  name: string;
  role: string;
  company: string;
  image: string;
  quote: string;
  stars: number;
};

type Tier = {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  highlighted: boolean;
};

// ============================================================================
// HERO SECTION
// ============================================================================
function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  return (
    <motion.section
      ref={ref}
      className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-orin-cream via-orin-sand to-white pt-20 pb-20"
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, 0],
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute -right-1/4 -top-1/4 h-1/2 w-1/2 rounded-full bg-gradient-to-br from-orin-coral via-orin-amber to-transparent opacity-25 blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.1, 1, 1.1],
            rotate: [0, -5, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, delay: 1 }}
          className="absolute -left-1/4 -bottom-1/4 h-1/2 w-1/2 rounded-full bg-gradient-to-tr from-orin-gold via-orin-sage to-transparent opacity-25 blur-3xl"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center"
        >
          {/* Badge */}
          <motion.div
            variants={itemVariants}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-orin-border-light bg-white/90 px-4 py-2 shadow-sm-soft backdrop-blur"
          >
            <Sparkles className="h-4 w-4 text-orin-coral" />
            <span className="text-sm font-medium text-orin-text-primary">
              Welcome to the future of work
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            variants={itemVariants}
            className="mb-6 bg-gradient-to-r from-orin-coral via-orin-amber to-orin-gold bg-clip-text py-4 text-5xl font-bold leading-tight text-transparent md:text-7xl"
          >
            Transform How You Work
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={itemVariants}
            className="mb-8 max-w-2xl text-lg text-white md:text-xl"
          >
            Empower your team with intelligent workflows that feel natural, intuitive, and genuinely enjoyable. ORIN isn&apos;t just another tool—it&apos;s your creative partner.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="mb-16 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-center"
          >
            <button className="group relative inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orin-coral to-orin-amber px-8 py-4 font-semibold text-white transition-all duration-200 hover:shadow-lg hover:shadow-orin-coral/30 active:scale-95">
              Get Started Free
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </button>
            <button className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-orin-coral px-8 py-3 font-semibold text-orin-coral transition-all hover:bg-orin-coral/10 hover:shadow-lg hover:shadow-orin-coral/20">
              Watch Demo
              <ChevronDown className="h-5 w-5" />
            </button>
          </motion.div>

          {/* 3D Hero Card */}
          <motion.div
            style={{ opacity, scale }}
            className="relative w-full"
          >
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="group relative rounded-2xl border border-orin-border-light bg-white/90 p-8 shadow-lg-soft backdrop-blur-sm"
            >
              {/* Glow effect behind card */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-orin-coral to-orin-amber opacity-0 blur transition-opacity group-hover:opacity-20" />

              {/* Card content */}
              <div className="relative space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-3 w-3 rounded-full bg-orin-emerald" />
                    <span className="text-sm font-medium text-orin-text-secondary">
                      Live Dashboard
                    </span>
                  </div>
                  <div className="text-xs text-orin-text-tertiary">Real-time sync</div>
                </div>

                {/* Fake UI elements for visual depth */}
                <div className="space-y-3">
                  <div className="h-3 w-2/3 rounded-full bg-gradient-to-r from-orin-coral to-transparent" />
                  <div className="flex gap-2">
                    <div className="h-2 w-1/3 rounded-full bg-orin-border-light" />
                    <div className="h-2 flex-1 rounded-full bg-orin-border-light" />
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{
                          duration: 2,
                          delay: i * 0.2,
                          repeat: Infinity,
                        }}
                        className="h-12 rounded-lg bg-gradient-to-br from-orin-coral/10 to-orin-amber/10"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center"
      >
        <span className="mb-2 text-xs text-orin-text-secondary">Scroll to explore</span>
        <ChevronDown className="h-5 w-5 text-orin-coral" />
      </motion.div>
    </motion.section>
  );
}

// ============================================================================
// FEATURES SECTION
// ============================================================================
function FeaturesSection() {
  const features: Feature[] = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Real-time collaboration that feels instant. No lag, no delays, pure flow.',
      color: 'from-orin-coral to-orin-amber',
    },
    {
      icon: BarChart3,
      title: 'Smart Analytics',
      description: 'Understand your work patterns. Make data-driven decisions with beautiful insights.',
      color: 'from-orin-amber to-orin-gold',
    },
    {
      icon: Users,
      title: 'Team Harmony',
      description: 'Built for collaboration. Every feature designed to bring teams closer.',
      color: 'from-orin-sage to-orin-emerald',
    },
    {
      icon: Lock,
      title: 'Bank-Level Security',
      description: 'Enterprise-grade encryption. Your data is yours. Always protected.',
      color: 'from-orin-gold to-orin-coral',
    },
  ];

  return (
    <section className="relative w-full bg-gradient-to-b from-orin-cream via-orin-sand to-white py-20 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-5xl font-bold text-orin-text-primary md:text-6xl">
            Superpowers Built In
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-orin-text-primary">
            ORIN comes packed with features that just work. No configuration. No complexity.
            Pure productivity.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <FeatureCard key={idx} feature={feature} Icon={Icon} index={idx} />
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  feature,
  Icon,
  index,
}: {
  feature: Feature;
  Icon: IconComponent;
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: easeInOut,
      }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="group relative rounded-2xl border border-orin-border-light bg-white p-8 shadow-sm-soft transition-all duration-300 hover:border-orin-coral hover:shadow-md-soft"
    >
      {/* Gradient background on hover */}
      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-orin-coral/0 to-orin-amber/0 opacity-0 blur transition-all duration-300 group-hover:from-orin-coral/10 group-hover:to-orin-amber/5 group-hover:opacity-100" />

      <div className="relative z-10">
        <div className={`mb-4 inline-flex rounded-xl bg-gradient-to-br ${feature.color} p-3`}>
          <Icon className="h-6 w-6 text-white" />
        </div>

        <h3 className="mb-2 text-xl font-semibold text-orin-text-primary">
          {feature.title}
        </h3>
        <p className="text-orin-text-secondary">{feature.description}</p>

        <motion.div
          className="mt-4 flex items-center gap-2 text-sm font-medium text-orin-coral opacity-0 transition-all group-hover:opacity-100"
          animate={{ x: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          Learn more <ArrowRight className="h-4 w-4" />
        </motion.div>
      </div>
    </motion.div>
  );
}

// ============================================================================
// TESTIMONIALS SECTION
// ============================================================================
function TestimonialsSection() {
  const testimonials: Testimonial[] = [
    {
      name: 'Sarah Chen',
      role: 'Product Lead',
      company: 'TechFlow',
      image: '👩‍💼',
      quote:
        "ORIN completely transformed how our team collaborates. It's like we're telepathic now.",
      stars: 5,
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Founder & CEO',
      company: 'BuildSync',
      image: '👨‍💼',
      quote:
        "The best productivity tool we've ever used. Seriously game-changing for our workflow.",
      stars: 5,
    },
    {
      name: 'Emily Watson',
      role: 'Operations Manager',
      company: 'CreativeStudio',
      image: '👩‍🔬',
      quote:
        "We've cut our project turnaround time in half. ORIN is incredible.",
      stars: 5,
    },
  ];

  return (
    <section className="relative w-full bg-gradient-to-b from-white via-orin-cream to-orin-sand py-20 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-5xl font-bold text-orin-text-primary md:text-6xl">
            Loved by Teams
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-orin-text-primary">
            See what users are saying about ORIN
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, idx) => (
            <TestimonialCard key={idx} testimonial={testimonial} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial, index }: { testimonial: Testimonial; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="group relative rounded-2xl border border-orin-border-light bg-white/90 p-8 shadow-md-soft"
    >
      {/* Elevated card indicator */}
      <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-orin-coral/10 px-3 py-1">
        <span className="text-xs font-medium text-orin-coral">Verified User</span>
      </div>

      <div className="mb-4 flex gap-1">
        {[...Array(testimonial.stars)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 + i * 0.1 }}
          >
            <Star className="h-4 w-4 fill-orin-gold text-orin-gold" />
          </motion.div>
        ))}
      </div>

      <p className="mb-6 italic text-orin-text-secondary">
        &ldquo;{testimonial.quote}&rdquo;
      </p>

      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-orin-coral to-orin-amber text-2xl">
          {testimonial.image}
        </div>
        <div>
          <p className="font-semibold text-orin-text-primary">{testimonial.name}</p>
          <p className="text-sm text-orin-text-secondary">
            {testimonial.role} at {testimonial.company}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// ============================================================================
// PRICING SECTION
// ============================================================================
function PricingSection() {
  const tiers: Tier[] = [
    {
      name: 'Starter',
      price: '$29',
      period: '/month',
      description: 'Perfect for individuals and small projects',
      features: [
        'Up to 3 projects',
        '5GB storage',
        'Basic analytics',
        'Email support',
        'Community access',
      ],
      cta: 'Get Started',
      highlighted: false,
    },
    {
      name: 'Professional',
      price: '$79',
      period: '/month',
      description: 'For growing teams and serious makers',
      features: [
        'Unlimited projects',
        '500GB storage',
        'Advanced analytics',
        'Priority support',
        'Custom integrations',
        'Team collaboration',
        'Advanced security',
      ],
      cta: 'Start Free Trial',
      highlighted: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'contact us',
      description: 'For large organizations',
      features: [
        'Everything in Pro',
        'Unlimited storage',
        'Dedicated support',
        'Custom contracts',
        'SSO & advanced auth',
        'SLA guarantee',
        'On-premise option',
      ],
      cta: 'Talk to Sales',
      highlighted: false,
    },
  ];

  return (
    <section className="relative w-full bg-gradient-to-b from-orin-sand via-white to-orin-cream py-20 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-5xl font-bold text-orin-text-primary md:text-6xl">
            Simple, Transparent Pricing
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-orin-text-primary">
            Choose the plan that fits your needs. No hidden fees. No surprises.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3">
          {tiers.map((tier, idx) => (
            <PricingCard key={idx} tier={tier} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingCard({ tier, index }: { tier: Tier; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className={`relative rounded-2xl border p-8 transition-all duration-300 ${
        tier.highlighted
          ? 'border-orin-coral bg-gradient-to-br from-white to-orin-cream shadow-lg-soft ring-2 ring-orin-coral/20'
          : 'border-orin-border-light bg-white/90 shadow-md-soft'
      }`}
    >
      {tier.highlighted && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 transform">
          <div className="rounded-full bg-gradient-to-r from-orin-coral to-orin-amber px-4 py-1 text-sm font-semibold text-white">
            Most Popular
          </div>
        </div>
      )}

      <div className="mb-6">
        <h3 className="mb-2 text-2xl font-bold text-orin-text-primary">
          {tier.name}
        </h3>
        <p className="text-sm text-orin-text-secondary">{tier.description}</p>
      </div>

      <div className="mb-6">
        <span className="text-4xl font-bold text-orin-text-primary">{tier.price}</span>
        <span className="text-orin-text-secondary"> {tier.period}</span>
      </div>

      <button
        className={`mb-8 w-full rounded-xl px-6 py-3 font-semibold transition-all ${
          tier.highlighted
            ? 'bg-gradient-to-r from-orin-coral to-orin-amber text-white hover:shadow-lg hover:shadow-orin-coral/30'
            : 'border-2 border-orin-coral text-orin-coral hover:bg-orin-coral/5'
        }`}
      >
        {tier.cta}
      </button>

      <div className="space-y-3">
        {tier.features.map((feature: string, idx: number) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -10 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
            transition={{ delay: 0.3 + idx * 0.05 }}
            className="flex items-center gap-3"
          >
            <Check className="h-5 w-5 text-orin-emerald" />
            <span className="text-orin-text-secondary">{feature}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// ============================================================================
// CTA SECTION
// ============================================================================
function CTASection() {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-r from-orin-coral via-orin-amber to-orin-gold py-20 md:py-32">
      <div className="absolute inset-0 opacity-10">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 30, repeat: Infinity }}
          className="absolute h-full w-full bg-[radial-gradient(circle_at_40%_60%,rgba(255,255,255,0.1)_0%,transparent_50%)]"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-6 text-5xl font-bold text-white md:text-6xl"
        >
          Ready to Transform Your Work?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          viewport={{ once: true }}
          className="mb-8 text-xl text-white/90"
        >
          Join thousands of teams who are already experiencing the ORIN difference.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-4 font-semibold text-orin-coral transition-all hover:shadow-2xl"
        >
          Start Free Trial
          <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
        </motion.button>
      </div>
    </section>
  );
}

// ============================================================================
// FOOTER
// ============================================================================
function Footer() {
  return (
    <footer className="w-full bg-orin-bg-dark text-white">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div>
            <h3 className="mb-6 text-2xl font-bold bg-gradient-to-r from-orin-coral to-orin-gold bg-clip-text text-transparent">
              ORIN
            </h3>
            <p className="text-sm text-gray-400">
              Where functionality meets delight. Transform how you work.
            </p>
          </div>

          {[
            {
              title: 'Product',
              links: ['Features', 'Pricing', 'Security', 'Roadmap'],
            },
            {
              title: 'Company',
              links: ['About', 'Blog', 'Careers', 'Contact'],
            },
            {
              title: 'Legal',
              links: ['Privacy', 'Terms', 'Cookies', 'Compliance'],
            },
          ].map((group, idx) => (
            <div key={idx}>
              <h4 className="mb-4 font-semibold">{group.title}</h4>
              <ul className="space-y-2">
                {group.links.map((link, i) => (
                  <li key={i}>
                    <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-gray-700 pt-8">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <p className="text-sm text-gray-400">
              © 2025 ORIN. All rights reserved.
            </p>
            <div className="flex gap-4">
              {['Twitter', 'GitHub', 'LinkedIn'].map((social) => (
                <a key={social} href="#" className="text-sm text-gray-400 transition-colors hover:text-orin-coral">
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ============================================================================
// MAIN PAGE
// ============================================================================
export default function Home() {
  return (
    <main id="main-content" className="w-full overflow-hidden bg-orin-sand">
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      <PricingSection />
      <CTASection />
      <Footer />
    </main>
  );
}
