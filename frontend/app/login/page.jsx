'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('student1@example.com');
  const [password, setPassword] = useState('password123');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/student';

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setErr('');
    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
      callbackUrl,
    });
    setLoading(false);
    if (res?.error) {
      setErr('Invalid email or password.');
    } else {
      router.push(callbackUrl);
    }
  }

  return (
    <main className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-10">
      <div className="surface-panel p-8 shadow-brand-glow">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-brand.accent via-brand.primary to-brand.accent bg-clip-text text-transparent">
          Log in
        </h1>
        <form onSubmit={onSubmit} className="mt-8 space-y-5">
          {err && (
            <div className="rounded-md border border-red-400/40 bg-red-500/10 p-3 text-sm text-red-300">
              {err}
            </div>
          )}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wide text-text.muted">
              Email
            </label>
            <input
              type="email"
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              placeholder="you@example.com"
            />
          </div>
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wide text-text.muted">
              Password
            </label>
            <input
              type="password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              placeholder="••••••••"
            />
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? 'Signing in...' : 'Log in'}
          </button>
          <p className="text-xs leading-relaxed text-text.muted">
            Demo: student1@example.com / password123<br />
            Admin: admin@example.com / admin1234
          </p>
        </form>
      </div>
    </main>
  );
}
