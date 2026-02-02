// Login form component
'use client';

import { useState } from 'react';
import Link from 'next/link';

interface LoginFormProps {
  onLogin: (password: string) => void;
}

export function LoginForm({ onLogin }: LoginFormProps) {
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(password);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl border border-charcoal/10 p-10 shadow-2xl shadow-primary/5">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/70 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary/20">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="text-3xl font-display font-light text-charcoal mb-2">
              Authority<span className="text-primary">.</span>
            </h1>
            <p className="text-charcoal-light/60 font-sans text-sm">Enter credentials to continue</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="w-full px-5 py-4 border-2 border-charcoal/10 rounded-2xl focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 font-sans transition-all"
              placeholder="Password"
              autoFocus
            />
            <button
              type="submit"
              className="w-full px-5 py-4 bg-primary hover:bg-primary/90 text-white rounded-2xl font-medium transition-all shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 font-sans"
            >
              Sign In
            </button>
            <Link href="/" className="block text-center text-sm text-charcoal-light/60 hover:text-primary transition-colors font-sans">
              ← Back to website
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
