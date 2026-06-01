'use client';

import Link from "next/link";
import { useState } from "react";
import styled from 'styled-components';
import { supabase } from '@/lib/supabase';

export default function ResetPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    if (!supabase) {
      setError('Authentication not configured');
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/signin`,
    });

    if (error) {
      setError(error.message);
    } else {
      setMessage('Check your email for a reset link!');
    }
    setLoading(false);
  };

  return (
    <StyledWrapper>
      <form className="form" onSubmit={handleResetPassword}>
        <p id="heading">Reset Password</p>
        <p className="subtitle">We&apos;ll email you a secure reset link in seconds.</p>
        
        {error && <p className="message error">{error}</p>}
        {message && <p className="message success">{message}</p>}
        
        <div className="field">
          <svg className="input-icon" xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" viewBox="0 0 16 16">
            <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z" />
          </svg>
          <input 
            autoComplete="off" 
            placeholder="Email address" 
            className="input-field" 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="btn">
          <button className="button1" type="submit" disabled={loading}>
            {loading ? 'Sending...' : 'Send reset link'}
          </button>
        </div>
        <Link href="/signin" className="button3">Back to Sign In</Link>
      </form>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding-left: 2em;
    padding-right: 2em;
    padding-bottom: 0.4em;
    background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
    border-radius: 25px;
    transition: .4s ease-in-out;
    box-shadow: 0 10px 40px rgba(16, 185, 129, 0.15);
    width: 100%;
  }

  .form:hover {
    transform: scale(1.02);
    box-shadow: 0 15px 50px rgba(16, 185, 129, 0.25);
  }

  #heading {
    text-align: center;
    margin: 0.5em 0 0;
    color: rgb(255, 255, 255);
    font-size: 1.5em;
    font-weight: 600;
  }

  .subtitle {
    text-align: center;
    margin-bottom: 1em;
    color: #9ca3af;
    font-size: 0.9rem;
  }

  .message {
    text-align: center;
    font-size: 0.85rem;
    margin-bottom: 0.5em;
  }

  .message.error {
    color: #ef4444;
  }

  .message.success {
    color: #10b981;
  }

  .field {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5em;
    border-radius: 25px;
    padding: 0.6em;
    border: none;
    outline: none;
    color: white;
    background-color: #1e293b;
    box-shadow: inset 2px 5px 10px rgba(0, 0, 0, 0.3);
  }

  .input-icon {
    height: 1.3em;
    width: 1.3em;
    fill: #10b981;
  }

  .input-field {
    background: none;
    border: none;
    outline: none;
    width: 100%;
    color: #d3d3d3;
    font-size: 0.95rem;
  }

  .input-field::placeholder {
    color: #9ca3af;
  }

  .form .btn {
    display: flex;
    justify-content: center;
    flex-direction: row;
    margin-top: 1em;
  }

  .button1 {
    padding: 0.7em;
    padding-left: 2em;
    padding-right: 2em;
    border-radius: 10px;
    border: none;
    outline: none;
    transition: .4s ease-in-out;
    background: linear-gradient(135deg, #059669, #10b981);
    color: white;
    font-weight: 500;
    cursor: pointer;
  }

  .button1:hover:not(:disabled) {
    background: linear-gradient(135deg, #047857, #059669);
    transform: translateY(-2px);
  }

  .button1:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .button3 {
    display: block;
    width: fit-content;
    margin: 1em auto 0;
    padding: 0.5em 1em;
    border-radius: 10px;
    border: none;
    outline: none;
    transition: .3s ease;
    background-color: transparent;
    color: #f97316;
    font-size: 0.9rem;
    text-decoration: none;
  }

  .button3:hover {
    color: #ea580c;
  }`;