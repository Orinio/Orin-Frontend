'use client';

import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

// Lazy load components with loading states
const Navbar = dynamic(() => import('@/components/home/Navbar'), { 
  loading: () => <div className="h-16">Loading...</div> 
});
const Hero = dynamic(() => import('@/components/home/Hero'), { 
  loading: () => <div className="min-h-[600px] flex items-center justify-center">Loading...</div> 
});
const Problem = dynamic(() => import('@/components/home/Problem'), { 
  loading: () => <div className="py-20 px-6">Loading...</div> 
});
const Features = dynamic(() => import('@/components/home/Features'), { 
  loading: () => <div className="py-20 px-6">Loading...</div> 
});
const HowItWorks = dynamic(() => import('@/components/home/HowItWorks'), { 
  loading: () => <div className="py-20 px-6 bg-gray-50">Loading...</div> 
});
const Stats = dynamic(() => import('@/components/home/Stats'), { 
  loading: () => <div className="py-20 px-6">Loading...</div> 
});
const Testimonials = dynamic(() => import('@/components/home/Testimonials'), { 
  loading: () => <div className="py-20 px-6 bg-gray-50">Loading...</div> 
});
const Pricing = dynamic(() => import('@/components/home/Pricing'), { 
  loading: () => <div className="py-20 px-6">Loading...</div> 
});
const FinalCTA = dynamic(() => import('@/components/home/FinalCTA'), { 
  loading: () => <div className="py-24 px-6">Loading...</div> 
});
const Footer = dynamic(() => import('@/components/home/Footer'), { 
  loading: () => <div className="bg-gray-900 text-gray-400 py-16 px-6">Loading...</div> 
});

export default function Home() {
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
      <Navbar />
      <Hero />
      <Problem />
      <Features />
      <HowItWorks />
      <Stats />
      <Testimonials />
      <Pricing />
      <FinalCTA />
      <Footer />
    </>
  );
}