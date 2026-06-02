'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import { supabase } from '@/lib/supabase';

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      if (!supabase) return;
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        router.push('/dashboard');
      }
    };
    checkUser();

    if (!supabase) return;
    
const { data: { subscription } } = supabase.auth.onAuthStateChange((_event: any, session: any) => {
       if (session?.user) {
        router.push('/dashboard');
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  return (
    <StyledWrapper>
      {/* NAV */}
      <nav className="fixed top-0 w-full z-50 bg-glass border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-serif font-bold grad-emerald">ORIN</div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-gray-600">
            <a href="#features" className="hover:text-emerald-700">Features</a>
            <a href="#how" className="hover:text-emerald-700">How It Works</a>
            <a href="#pricing" className="hover:text-emerald-700">Pricing</a>
          </div>
<Link href="/signin" className="btn-green px-6 py-2 rounded-lg font-medium">
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
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 leading-tight text-gray-900">
              Your scattered work becomes career proof
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              GitHub, Kaggle, certificates, projects—all over the place. ORIN transforms them into verified proof cards, an AI coach who guides you daily, and real opportunities that match your proof.
            </p>
            <div className="flex gap-4 flex-wrap mb-6">
              <Link
                href="/signup"
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
            <div className="relative mx-auto w-64 h-96 animate-float-slow">
              <div className="absolute inset-0 rounded-[2.5rem] bg-white shadow-2xl border-4 border-emerald-200 overflow-hidden">
                <div className="p-5 space-y-4 bg-gradient-to-b from-emerald-50/30 to-white">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold grad-emerald">ORIN</span>
                    <div className="flex gap-1">
                      <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                      <div className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" style={{animationDelay: '0.5s'}}></div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="h-3 w-20 mx-auto rounded-full bg-emerald-200"></div>
                    <div className="h-2 w-16 mx-auto rounded-full bg-orange-200 mt-2"></div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-14 rounded-2xl border-l-8 border-emerald-400 bg-white p-3 shadow-md transform rotate-1">
                      <div className="h-2 w-3/4 rounded bg-gray-900 mb-1"></div>
                      <div className="h-1.5 w-1/2 rounded bg-gray-300"></div>
                    </div>
                    <div className="h-14 rounded-2xl border-l-8 border-orange-400 bg-white p-3 shadow-md transform -rotate-1">
                      <div className="h-2 w-2/3 rounded bg-gray-900 mb-1"></div>
                      <div className="h-1.5 w-2/5 rounded bg-gray-300"></div>
                    </div>
                    <div className="h-12 rounded-2xl border-l-8 border-emerald-400 bg-white p-3 shadow-md transform rotate-1">
                      <div className="h-2 w-3/5 rounded bg-gray-900"></div>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <div className="rounded-full bg-gradient-to-r from-emerald-400 to-orange-400 px-4 py-2 shadow-lg">
                      <div className="h-2 w-16 rounded-full bg-white"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -left-4 w-64 h-12 bg-emerald-200/30 rounded-full blur-xl"></div>
              <div className="absolute -bottom-4 -right-6 w-48 h-10 bg-orange-200/30 rounded-full blur-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-4xl font-serif font-bold mb-6 text-gray-900">
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
                    Don&apos;t know if what you built actually matters.
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
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-serif font-bold mb-4 text-gray-900">
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
                className="rounded-lg border border-gray-200 bg-white p-8 hover:shadow-lg transition"
              >
                <p className="text-4xl mb-4">{feature.icon}</p>
                <h3 className="font-bold text-lg mb-2 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-serif font-bold text-center mb-16 text-gray-900">
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
          <h2 className="text-5xl font-serif font-bold text-center mb-16 text-gray-900">
            Stories from students
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote:
                  '&ldquo;I had 20 GitHub repos scattered. ORIN turned them into a proof profile. Got 3 internship offers in 2 weeks.&rdquo;',
                author: 'Priya S.',
                org: 'IIT Delhi',
              },
              {
                quote:
                  '&ldquo;The AI coach is like having a mentor. It tells me exactly what I\'m doing wrong and what to fix next.&rdquo;',
                author: 'Arjun M.',
                org: 'Self-taught Dev',
              },
              {
                quote:
                  '&ldquo;Instead of tweaking my resume, I focused on building proof. ORIN made sharing it so easy.&rdquo;',
                author: 'Sophia W.',
                org: 'Bootcamp Grad',
              },
            ].map((testimonial, i) => (
              <div key={i} className="rounded-lg border border-gray-200 bg-white p-8">
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
          <h2 className="text-5xl font-serif font-bold text-center mb-16 text-gray-900">
            Simple, transparent pricing
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Free Plan */}
            <div className="rounded-lg border border-gray-200 bg-white p-8">
              <h3 className="font-bold text-lg mb-6 text-gray-900">Free Proof</h3>
              <p className="text-3xl font-bold mb-6 text-gray-900">Free</p>
              <Link href="/signup" className="rounded-md border-2 border-gray-300 w-full py-3 text-center font-semibold hover:bg-gray-50 mb-6 block">
                Get Started Free
              </Link>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>✓ 5 proof cards</li>
                <li>✓ Basic coach (3x/week)</li>
                <li>✓ Public profile</li>
                <li>✓ 1 source integration</li>
              </ul>
            </div>

            {/* Pro Plan */}
            <div className="rounded-lg border-2 border-emerald-500 bg-emerald-50 p-8 relative">
              <div className="absolute -top-4 left-6 bg-emerald-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                Most Popular
              </div>
              <h3 className="font-bold text-lg mb-6 text-gray-900">Pro Proof</h3>
              <p className="text-3xl font-bold mb-2 text-gray-900">
                ₹299<span className="text-gray-600 text-lg">/month</span>
              </p>
              <Link href="/signup" className="btn-green w-full py-3 rounded-lg font-semibold mb-6 block text-center">
                Start Free Trial
              </Link>
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
            <div className="rounded-lg border border-gray-200 bg-white p-8">
              <h3 className="font-bold text-lg mb-6 text-gray-900">Institutions</h3>
              <p className="text-3xl font-bold mb-6 text-gray-900">Custom</p>
              <Link href="/contact" className="rounded-md border-2 border-gray-300 w-full py-3 text-center font-semibold hover:bg-gray-50 mb-6 block">
                Contact
              </Link>
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
          <h2 className="text-5xl font-serif font-bold mb-6 text-gray-900">
            Stop scattering. Start proving.
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Your work should become your career proof. Not scattered across 5 platforms. One single source of truth.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/signup"
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
              <li><a href="#features" className="hover:text-white">Features</a></li>
              <li><a href="#pricing" className="hover:text-white">Pricing</a></li>
              <li><a href="#" className="hover:text-white">Security</a></li>
            </ul>
          </div>
          <div>
            <p className="font-bold text-white text-sm mb-4">Company</p>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">About</a></li>
              <li><a href="#" className="hover:text-white">Blog</a></li>
              <li><a href="#" className="hover:text-white">Careers</a></li>
            </ul>
          </div>
          <div>
            <p className="font-bold text-white text-sm mb-4">Legal</p>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">Privacy</a></li>
              <li><a href="#" className="hover:text-white">Terms</a></li>
              <li><a href="#" className="hover:text-white">Cookies</a></li>
            </ul>
          </div>
          <div>
            <p className="font-bold text-white text-sm mb-4">Connect</p>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">Twitter</a></li>
              <li><a href="#" className="hover:text-white">Discord</a></li>
              <li><a href="#" className="hover:text-white">LinkedIn</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-sm">
          © 2025 ORIN. Career proof for students building futures.
        </div>
      </footer>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .grad-emerald {
    background: linear-gradient(135deg, #059669 0%, #d97706 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .bg-glass {
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(12px);
  }

  .btn-green {
    background: linear-gradient(135deg, #059669, #10b981);
    color: white;
    font-weight: 500;
    transition: box-shadow 0.3s ease;
  }

  .btn-green:hover {
    box-shadow: 0 8px 25px rgba(5, 150, 105, 0.3);
  }
`;