'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="w-full bg-white text-gray-900">
      {/* NAV */}
      <nav className="fixed top-0 w-full z-50 bg-glass border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-serif font-bold grad-emerald">ORIN</div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-gray-600">
            <a href="#features" className="hover:text-emerald-700">Features</a>
            <a href="#how" className="hover:text-emerald-700">How It Works</a>
            <a href="#pricing" className="hover:text-emerald-700">Pricing</a>
          </div>
          <Link href="/auth/signin" className="btn-green px-6 py-2 rounded-lg font-medium">
            Get Started
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-bold mb-6">
              AI Coach For Students
            </div>
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 leading-tight">
              Your scattered work becomes career proof
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              GitHub, Kaggle, certificates, projects—all over the place. ORIN transforms them into verified proof cards, an AI coach who guides you daily, and real opportunities that match your proof.
            </p>
            <div className="flex gap-4 flex-wrap mb-6">
              <Link
                href="/auth/signup"
                className="btn-green px-6 py-3 rounded-lg font-semibold"
              >
                Start Building Proof
              </Link>
              <button className="border-2 border-gray-300 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50">
                Watch Demo
              </button>
            </div>
            <p className="text-sm text-gray-500">
              ✓ Free forever tier • ✓ No card needed • ✓ 5,000+ active students
            </p>
          </div>
          <div>
            <div className="bg-gradient-to-br from-emerald-50 to-orange-50 rounded-2xl p-6 border border-gray-200 shadow-lg">
              <p className="font-semibold text-gray-900 mb-4">Your proof cards:</p>
              <div className="space-y-3">
                <div className="bg-white rounded-lg p-4 border-l-4 border-emerald-500">
                  <p className="text-xs font-semibold text-gray-900">ML Competition Winner</p>
                  <p className="text-xs text-gray-500">Skills: Python, ML, Data Analysis</p>
                </div>
                <div className="bg-white rounded-lg p-4 border-l-4 border-orange-500">
                  <p className="text-xs font-semibold text-gray-900">Kaggle 1st Place</p>
                  <p className="text-xs text-gray-500">Skills: Competition-level expertise</p>
                </div>
                <div className="bg-white rounded-lg p-4 border-l-4 border-emerald-500">
                  <p className="text-xs font-semibold text-gray-900">AWS Certificate</p>
                  <p className="text-xs text-gray-500">Skills: Cloud Architecture</p>
                </div>
              </div>
            </div>
            <div className="mt-2 bg-white rounded-xl border border-gray-200 p-4 shadow-lg max-w-xs">
              <p className="text-xs text-gray-500">AI Coach Message:</p>
              <p className="font-semibold text-sm text-gray-900">
                "You need one live deployment. Ship it this week."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-4xl font-serif font-bold mb-6">
              The problem students face
            </h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <span className="text-3xl">📌</span>
                <div>
                  <strong className="text-gray-900">Scattered proof</strong>
                  <p className="text-gray-600">
                    GitHub, Kaggle, Figma, LinkedIn, Drive. Zero cohesion.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="text-3xl">😕</span>
                <div>
                  <strong className="text-gray-900">No feedback</strong>
                  <p className="text-gray-600">
                    Don't know if what you built actually matters.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="text-3xl">❌</span>
                <div>
                  <strong className="text-gray-900">Unclear story</strong>
                  <p className="text-gray-600">
                    30 projects. What do they prove? Unknown.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="text-3xl">🔍</span>
                <div>
                  <strong className="text-gray-900">Missing guidance</strong>
                  <p className="text-gray-600">
                    No one tells you what to build next.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <p className="font-bold text-gray-900 mb-4">
              Without ORIN (scattered across 5 places):
            </p>
            <div className="space-y-2 text-sm">
              <div className="p-3 bg-gray-50 rounded flex gap-3">
                <span>🐱</span>
                <span className="text-gray-600">github.com/you/repo-1</span>
              </div>
              <div className="p-3 bg-gray-50 rounded flex gap-3">
                <span>🏆</span>
                <span className="text-gray-600">kaggle.com/notebooks/ml</span>
              </div>
              <div className="p-3 bg-gray-50 rounded flex gap-3">
                <span>📜</span>
                <span className="text-gray-600">certificate.pdf (drive)</span>
              </div>
              <div className="p-3 bg-gray-50 rounded flex gap-3">
                <span>🎨</span>
                <span className="text-gray-600">figma link (private)</span>
              </div>
              <div className="text-center text-xs text-gray-400 py-4">
                ... and 15 more scattered items
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-serif font-bold mb-4">
              Everything in one place
            </h2>
            <p className="text-lg text-gray-600">
              Import. Extract. Coach. Share. Opportunities.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '📦',
                title: 'Import Everything',
                desc: 'Connect GitHub, Kaggle, upload certificates, paste project links. All in one place.',
              },
              {
                icon: '✨',
                title: 'AI Extracts Skills',
                desc: 'Our AI reads your code and work, extracts real skills, structures them as proof cards.',
              },
              {
                icon: '🎯',
                title: 'Daily AI Coach',
                desc: 'Every morning: feedback on progress, gaps you have, one concrete next action.',
              },
              {
                icon: '🔗',
                title: 'Public Proof Profile',
                desc: 'Share one link. Your complete proof story. No more scattered links across platforms.',
              },
              {
                icon: '🚀',
                title: 'Matched Opportunities',
                desc: 'Get internships, projects, first jobs matched to your actual proof, not self-described skills.',
              },
              {
                icon: '📊',
                title: 'Proof Score',
                desc: 'See how strong your proof is. Identify gaps. Real progress metrics that matter.',
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="bg-white border border-gray-200 rounded-lg p-8 hover:shadow-lg transition"
              >
                <p className="text-4xl mb-4">{feature.icon}</p>
                <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-serif font-bold text-center mb-16">
            4 steps to proof
          </h2>
          <div className="space-y-8">
            {[
              {
                num: '1',
                title: 'Sign up & import',
                desc: 'Connect GitHub, upload certificates, paste project links. Takes 3 minutes.',
              },
              {
                num: '2',
                title: 'AI extracts your proof',
                desc: 'Our AI reads your work and creates structured proof cards with verified skills. You review & edit.',
              },
              {
                num: '3',
                title: 'Daily coach guides you',
                desc: 'Get one message every morning. It notices gaps, flags what you\'re repeating, suggests one next action.',
              },
              {
                num: '4',
                title: 'Share & get matched',
                desc: 'Publish your proof profile. Get matched to internships, projects, and jobs that fit your actual proof.',
              },
            ].map((step, i) => (
              <div key={i} className="flex gap-6">
                <div className="w-14 h-14 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold flex-shrink-0 font-serif text-xl">
                  {step.num}
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900">{step.title}</h3>
                  <p className="text-gray-600">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8 text-center">
          {[
            { num: '5K+', label: 'Active students' },
            { num: '23K+', label: 'Proof cards created' },
            { num: '1.2K+', label: 'Matched internships' },
            { num: '92%', label: 'Return weekly' },
          ].map((stat, i) => (
            <div key={i}>
              <p className="text-5xl font-serif font-bold grad-emerald">{stat.num}</p>
              <p className="text-gray-600 mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-serif font-bold text-center mb-16">
            Stories from students
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote:
                  '"I had 20 GitHub repos scattered. ORIN turned them into a proof profile. Got 3 internship offers in 2 weeks."',
                author: 'Priya S.',
                org: 'IIT Delhi',
              },
              {
                quote:
                  '"The AI coach is like having a mentor. It tells me exactly what I\'m doing wrong and what to fix next."',
                author: 'Arjun M.',
                org: 'Self-taught Dev',
              },
              {
                quote:
                  '"Instead of tweaking my resume, I focused on building proof. ORIN made sharing it so easy."',
                author: 'Sophia W.',
                org: 'Bootcamp Grad',
              },
            ].map((testimonial, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-lg p-8">
                <p className="text-sm text-gray-700 mb-4 italic">{testimonial.quote}</p>
                <p className="font-semibold text-gray-900">
                  {testimonial.author} • {testimonial.org}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-serif font-bold text-center mb-16">
            Simple, transparent pricing
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Free Plan */}
            <div className="bg-white border border-gray-200 rounded-lg p-8">
              <h3 className="font-bold text-lg mb-6">Free Proof</h3>
              <p className="text-3xl font-bold mb-6">Free</p>
              <button className="border-2 border-gray-300 w-full py-3 rounded-lg font-semibold hover:bg-gray-50 mb-6">
                Get Started
              </button>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>✓ 5 proof cards</li>
                <li>✓ Basic coach (3x/week)</li>
                <li>✓ Public profile</li>
                <li>✓ 1 source integration</li>
              </ul>
            </div>

            {/* Pro Plan */}
            <div className="bg-emerald-50 border-2 border-emerald-500 rounded-lg p-8 relative">
              <div className="absolute -top-4 left-6 bg-emerald-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                Most Popular
              </div>
              <h3 className="font-bold text-lg mb-6">Pro Proof</h3>
              <p className="text-3xl font-bold mb-2">
                ₹299<span className="text-gray-600 text-lg">/month</span>
              </p>
              <button className="btn-green w-full py-3 rounded-lg font-semibold mb-6">
                Start Free Trial
              </button>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>✓ Unlimited proof cards</li>
                <li>✓ Daily AI coach</li>
                <li>✓ Unlimited integrations</li>
                <li>✓ Opportunity matching</li>
                <li>✓ Analytics dashboard</li>
                <li>✓ Priority support</li>
              </ul>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-white border border-gray-200 rounded-lg p-8">
              <h3 className="font-bold text-lg mb-6">Institutions</h3>
              <p className="text-3xl font-bold mb-6">Custom</p>
              <button className="border-2 border-gray-300 w-full py-3 rounded-lg font-semibold hover:bg-gray-50 mb-6">
                Contact
              </button>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>✓ All Pro features</li>
                <li>✓ Cohort dashboard</li>
                <li>✓ Outcome reporting</li>
                <li>✓ Dedicated support</li>
                <li>✓ Branded profiles</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 px-6 bg-gradient-to-br from-emerald-50 via-white to-orange-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-serif font-bold mb-6">
            Stop scattering. Start proving.
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Your work should become your career proof. Not scattered across 5 platforms. One single source of truth.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/auth/signup"
              className="btn-green px-8 py-4 rounded-lg font-semibold text-lg"
            >
              Get Started Free
            </Link>
            <button className="border-2 border-gray-300 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50">
              Watch Demo
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-8">
            🎓 Special: First 500 students get Pro free for 3 months
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-400 py-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-5 gap-8 mb-8">
          <div>
            <p className="font-serif font-bold text-white text-lg">ORIN</p>
            <p className="text-sm mt-2">Turn your work into career proof.</p>
          </div>
          <div>
            <p className="font-bold text-white text-sm mb-4">Product</p>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Security
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="font-bold text-white text-sm mb-4">Company</p>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Careers
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="font-bold text-white text-sm mb-4">Legal</p>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Terms
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Cookies
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="font-bold text-white text-sm mb-4">Connect</p>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Discord
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-sm">
          © 2025 ORIN. Career proof for students building futures.
        </div>
      </footer>
    </div>
  );
}
