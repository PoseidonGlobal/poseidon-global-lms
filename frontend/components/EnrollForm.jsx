'use client';

import { useState } from 'react';

export default function EnrollForm({ courseId }) {
  const [status, setStatus] = useState('idle');
  const [form, setForm] = useState({ name: '', email: '', note: '' });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('submitting');
    try {
      // Placeholder submit. Replace with your API call.
      await new Promise((r) => setTimeout(r, 700));
      setStatus('success');
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4 rounded-lg border p-4">
      <h4 className="text-base font-semibold">Enroll in this course</h4>
      <input type="hidden" name="courseId" value={courseId} />
      <div>
        <label className="block text-sm font-medium text-gray-700" htmlFor="name">Full name</label>
        <input
          id="name"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          className="mt-1 w-full rounded border px-3 py-2 outline-none focus:border-blue-600"
          placeholder="Jane Doe"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700" htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
          className="mt-1 w-full rounded border px-3 py-2 outline-none focus:border-blue-600"
          placeholder="jane@example.com"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700" htmlFor="note">Note (optional)</label>
        <textarea
          id="note"
          name="note"
          value={form.note}
          onChange={handleChange}
          rows={3}
          className="mt-1 w-full rounded border px-3 py-2 outline-none focus:border-blue-600"
          placeholder="Anything we should know?"
        />
      </div>
      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-60"
        >
          {status === 'submitting' ? 'Submitting…' : 'Enroll'}
        </button>
        {status === 'success' && <span className="text-green-700">Enrollment request submitted!</span>}
        {status === 'error' && <span className="text-red-700">Something went wrong. Try again.</span>}
      </div>
    </form>
  );
}
