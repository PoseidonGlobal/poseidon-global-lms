'use client';

import { useEffect, useState } from 'react';
import { API_BASE_URL } from '../lib/api';

export default function BackendStatus() {
  const [status, setStatus] = useState({ ok: false, detail: 'Checking…' });

  useEffect(() => {
    let cancelled = false;
    async function check() {
      try {
        const res = await fetch(`${API_BASE_URL}/healthz`, { cache: 'no-store' });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        if (!cancelled) setStatus({ ok: true, detail: `uptime: ${Math.round(json.uptime)}s` });
      } catch {
        if (!cancelled) setStatus({ ok: false, detail: 'offline' });
      }
    }
    check();
    const id = setInterval(check, 15000);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  return (
    <div className="inline-flex items-center gap-2 rounded border px-3 py-1 text-sm">
      <span
        className={`h-2 w-2 rounded-full ${status.ok ? 'bg-green-500' : 'bg-red-500'}`}
        aria-hidden
      />
      <span>Backend: {status.ok ? 'online' : 'offline'}</span>
      <span className="text-gray-500">({status.detail})</span>
      <a
        className="ml-2 underline text-blue-600 hover:text-blue-800"
        href={`${API_BASE_URL}/healthz`}
        target="_blank"
        rel="noreferrer"
      >
        /healthz
      </a>
    </div>
  );
}