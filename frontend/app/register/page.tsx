'use client';

import { useState } from 'react';

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Placeholder: replace with a real registration API + database.
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <main className="mx-auto max-w-md px-4 py-10">
        <h1 className="text-2xl font-bold">Registration submitted</h1>
        <p className="mt-2 text-gray-700">
          Thank you for your interest. Registration will be implemented with a real database;
          for now, please log in with a demo account or contact an administrator.
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-md px-4 py-10">
      <h1 className="text-2xl font-bold">Register</h1>
      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Full name</label>
          <input
            type="text"
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            autoComplete="name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
            autoComplete="email"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
            autoComplete="new-password"
            minLength={8}
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700"
        >
          Create account
        </button>
      </form>
    </main>
  );
}