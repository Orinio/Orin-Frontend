'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function Navbar() {
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
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
       if (session?.user) {
        router.push('/dashboard');
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  return (
    <>
      {/* NAV */}
      <nav className="fixed top-0 w-full z-50 bg-glass border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-serif font-bold" style={{ color: 'var(--color-ink)' }}>ORIN</div>
          <div className="hidden md:flex gap-8 text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>
            <a href="#features" className="hover:text-emerald-700">Features</a>
            <a href="#how" className="hover:text-emerald-700">How It Works</a>
            <a href="#pricing" className="hover:text-emerald-700">Pricing</a>
          </div>
          <Link href="/signin" className="btn-primary px-6 py-2 rounded-lg font-medium">
            Get Started
          </Link>
        </div>
      </nav>

      {/* STYLES */}
      <style>{`
        .bg-glass {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(12px);
        }
      `}</style>
    </>
  );
}