'use client';

import { useState } from 'react';

export default function EnrollForm({ courseId }) {
  const [form, setForm] = useState({ name: '', email: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    // Placeholder: in future, POST to backend API using NEXT_PUBLIC_API_BASE_URL
    await new Promise((r) => setTimeout(r, 600));
    setSubmitting(false);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-md border border-green-200 bg-green-50 p-4 text-green-800">
        Enrollment submitted for <span className="font-medium">{courseId}</span>. We will contact you shortly.
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 space-y-4">
      <h2 className="text-lg font-semibold">Enroll in this course</h2>
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
      <button
        type="submit"
        disabled={submitting}
        className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-60"
      >
        {submitting ? 'Submitting…' : 'Submit enrollment'}
      </button>
    </form>
  );
}