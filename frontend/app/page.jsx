'use client';

import { useEffect, useState } from 'react';
import BackendStatus from '../components/BackendStatus';
import { getHello, API_BASE_URL } from '../lib/api';

export default function HomePage() {
  const [message, setMessage] = useState('Fetching message…');
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    getHello()
      .then((data) => {
        if (!cancelled) setMessage(data.message || 'Hello from backend');
      })
      .catch((e) => {
        if (!cancelled) {
          setError(e.message || 'Failed to reach backend');
          setMessage('Backend not available yet.');
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <main>
      <section className="mb-8 rounded-lg bg-gradient-to-r from-blue-50 to-blue-100 p-8">
        <h1 className="text-3xl font-bold text-blue-900">Poseidon Global Maritime University</h1>
        <p className="mt-2 text-blue-900/80">
          Bringing maritime security courses alive.
        </p>
        <div className="mt-4">
          <BackendStatus />
        </div>
      </section>

      <section className="rounded-lg border bg-white p-6 shadow-sm">
        <h2 className="mb-2 text-xl font-semibold">API Message</h2>
        {error ? (
          <p className="text-red-600">{error}</p>
        ) : (
          <p className="text-green-700">{message}</p>
        )}
        <div className="mt-4">
          <a
            className="underline text-blue-600 hover:text-blue-800"
            href={`${API_BASE_URL}/api/v1/hello`}
            target="_blank"
            rel="noreferrer"
          >
            Open /api/v1/hello
          </a>
        </div>
      </section>
    </main>
  );
}