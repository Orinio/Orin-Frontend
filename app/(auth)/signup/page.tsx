'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [showEmailForm, setShowEmailForm] = useState(false);

  return (
    <div className="w-full max-w-sm">
      {/* Card */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold text-gray-900 mb-2">
            Create your account
          </h1>
          <p className="text-gray-600">
            Start building and sharing your career proof today.
          </p>
        </div>

        {/* Social Login Buttons */}
        {!showEmailForm && (
          <>
            <div className="space-y-3 mb-6">
              <button
                type="button"
                className="w-full border border-gray-300 rounded-lg py-3 font-semibold text-gray-700 hover:bg-gray-50 transition"
              >
                Continue with GitHub
              </button>
              <button
                type="button"
                className="w-full border border-gray-300 rounded-lg py-3 font-semibold text-gray-700 hover:bg-gray-50 transition"
              >
                Continue with Google
              </button>
            </div>

            {/* Divider */}
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or</span>
              </div>
            </div>

            {/* Email toggle */}
            <button
              type="button"
              onClick={() => setShowEmailForm(true)}
              className="w-full btn-green py-3 rounded-lg font-semibold text-white"
            >
              Continue with email
            </button>
          </>
        )}

        {/* Email Form */}
        {showEmailForm && (
          <form className="space-y-4 mb-6">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-semibold text-gray-900 mb-2">
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                placeholder="John Doe"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                Email address
              </label>
              <input
                id="email"
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-900 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>

            {/* Sign up Button */}
            <button
              type="submit"
              className="w-full btn-green py-3 rounded-lg font-semibold text-white mt-6"
            >
              Create account
            </button>

            {/* Back button */}
            <button
              type="button"
              onClick={() => setShowEmailForm(false)}
              className="w-full border border-gray-300 py-3 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition"
            >
              Back
            </button>
          </form>
        )}

        {/* Sign in link */}
        <div className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/auth/signin" className="text-emerald-600 hover:text-emerald-700 font-semibold">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}