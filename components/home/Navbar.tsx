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

      {/* STYLES */}
      <style>{`
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
      `}</style>
    </>
  );
}