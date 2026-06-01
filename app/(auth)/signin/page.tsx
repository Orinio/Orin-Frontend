'use client';

import Link from "next/link";
import { useState } from "react";

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="w-full max-w-sm">
      {/* Card */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold text-gray-900 mb-2">
            Sign in
          </h1>
          <p className="text-gray-600">
            Welcome back. Let&apos;s get back to building your proof.
          </p>
        </div>

        {/* Form */}
        <form className="space-y-4 mb-6">
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

          {/* Sign in Button */}
          <button
            type="submit"
            className="w-full btn-green py-3 rounded-lg font-semibold text-white mt-6"
          >
            Sign in
          </button>
        </form>

        {/* Divider */}
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>

        {/* Social Login */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <button
            type="button"
            className="border border-gray-300 rounded-lg py-3 font-semibold text-gray-700 hover:bg-gray-50 transition"
          >
            GitHub
          </button>
          <button
            type="button"
            className="border border-gray-300 rounded-lg py-3 font-semibold text-gray-700 hover:bg-gray-50 transition"
          >
            Google
          </button>
        </div>

        {/* Links */}
        <div className="space-y-2 text-sm text-center">
          <div>
            <Link href="/auth/reset-password" className="text-emerald-600 hover:text-emerald-700 font-semibold">
              Forgot password?
            </Link>
          </div>
          <div className="text-gray-600">
            Don&apos;t have an account?{" "}
            <Link href="/auth/signup" className="text-emerald-600 hover:text-emerald-700 font-semibold">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}