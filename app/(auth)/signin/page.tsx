'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<
    'github' | 'google' | null
  >(null);
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!supabase) {
      setError('Authentication not configured');
      setLoading(false);
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else if (data.user) {
      window.location.href = '/dashboard';
    }
    setLoading(false);
  };

  const handleSocialLogin = async (provider: 'github' | 'google') => {
    if (!supabase) {
      setError('Authentication not configured');
      return;
    }
    setSocialLoading(provider);
    setError(null);
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    });
    if (error) {
      setError(error.message);
      setSocialLoading(null);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="w-full"
    >
      {/* Heading */}
      <div className="mb-8">
        <h2 className="font-serif text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Welcome back
        </h2>
        <p className="mt-2 text-[15px] text-slate-600">
          Sign in to your Orin account to continue building your proof
          portfolio.
        </p>
      </div>

      {/* Error */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-5 flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50/80 p-3.5 text-sm text-red-700"
        >
          <svg
            className="mt-0.5 h-4 w-4 flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
            />
          </svg>
          <span>{error}</span>
        </motion.div>
      )}

      {/* Social buttons */}
      <div className="mb-6 grid grid-cols-2 gap-3">
        <motion.button
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.98 }}
          type="button"
          onClick={() => handleSocialLogin('google')}
          disabled={socialLoading !== null || loading}
          className="group relative flex items-center justify-center gap-2.5 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm transition-all hover:border-slate-300 hover:bg-slate-50 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
        >
          {socialLoading === 'google' ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <GoogleIcon className="h-4 w-4" />
          )}
          <span>Google</span>
        </motion.button>
        <motion.button
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.98 }}
          type="button"
          onClick={() => handleSocialLogin('github')}
          disabled={socialLoading !== null || loading}
          className="group relative flex items-center justify-center gap-2.5 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm transition-all hover:border-slate-300 hover:bg-slate-900 hover:text-white hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
        >
          {socialLoading === 'github' ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <GithubIcon className="h-4 w-4" />
          )}
          <span>GitHub</span>
        </motion.button>
      </div>

      {/* Divider */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-white px-3 text-slate-500">
            or sign in with email
          </span>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSignIn} className="space-y-4">
        <div>
          <label
            htmlFor="email"
            className="mb-1.5 block text-sm font-medium text-slate-700"
          >
            Email address
          </label>
          <div className="group relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
              <Mail className="h-4 w-4 text-slate-400 transition-colors group-focus-within:text-emerald-500" />
            </div>
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="block w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-3.5 text-[15px] text-slate-900 placeholder:text-slate-400 shadow-sm transition-all hover:border-slate-300 focus:border-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-500/10"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="password"
            className="mb-1.5 block text-sm font-medium text-slate-700"
          >
            Password
          </label>
          <div className="group relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
              <Lock className="h-4 w-4 text-slate-400 transition-colors group-focus-within:text-emerald-500" />
            </div>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="block w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-11 text-[15px] text-slate-900 placeholder:text-slate-400 shadow-sm transition-all hover:border-slate-300 focus:border-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-500/10"
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              tabIndex={-1}
              className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 transition-colors hover:text-slate-600"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        {/* Remember me + forgot */}
        <div className="flex items-center justify-between pt-1">
          <label className="group flex cursor-pointer items-center gap-2.5">
            <div className="relative">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="peer sr-only"
              />
              <div className="h-[18px] w-[18px] rounded-md border-2 border-slate-300 bg-white transition-all peer-checked:border-emerald-500 peer-checked:bg-emerald-500 peer-focus-visible:ring-2 peer-focus-visible:ring-emerald-500/30 group-hover:border-slate-400" />
              <svg
                className="pointer-events-none absolute left-0.5 top-0.5 h-3 w-3 text-white opacity-0 transition-opacity peer-checked:opacity-100"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={4}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <span className="text-sm text-slate-600">Remember me</span>
          </label>
          <Link
            href="/reset-password"
            className="text-sm font-medium text-emerald-600 transition-colors hover:text-emerald-700"
          >
            Forgot password?
          </Link>
        </div>

        {/* Submit */}
        <motion.button
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.99 }}
          type="submit"
          disabled={loading}
          className="group relative mt-2 flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-600 px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 transition-all hover:shadow-xl hover:shadow-emerald-500/30 focus:outline-none focus:ring-4 focus:ring-emerald-500/30 disabled:cursor-not-allowed disabled:opacity-70"
        >
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Signing you in...</span>
            </>
          ) : (
            <>
              <span>Sign in</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </>
          )}
        </motion.button>
      </form>

      {/* Sign up link */}
      <p className="mt-7 text-center text-sm text-slate-600">
        Don&rsquo;t have an account?{' '}
        <Link
          href="/signup"
          className="font-semibold text-emerald-600 transition-colors hover:text-emerald-700"
        >
          Create one for free
        </Link>
      </p>

      {/* Footer trust */}
      <p className="mt-6 text-center text-xs text-slate-400">
        Protected by industry-standard encryption.{' '}
        <Link href="#" className="underline-offset-2 hover:underline">
          Privacy
        </Link>{' '}
        &middot;{' '}
        <Link href="#" className="underline-offset-2 hover:underline">
          Terms
        </Link>
      </p>
    </motion.div>
  );
}

/* Inline brand icons (no extra deps) */
function GoogleIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.25 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.83z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.83C6.71 7.31 9.14 5.38 12 5.38z"
      />
    </svg>
  );
}

function GithubIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}
