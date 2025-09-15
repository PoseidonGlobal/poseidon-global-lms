export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';

async function fetchJson(path, options = {}) {
  const url = `${API_BASE_URL}${path}`;
  try {
    const res = await fetch(url, {
      headers: { 'Content-Type': 'application/json' },
      ...options,
    });
    if (!res.ok) {
      const text = await res.text().catch(() => '');
      throw new Error(`Request failed ${res.status}: ${text || res.statusText}`);
    }
    return await res.json();
  } catch (err) {
    throw new Error(`Backend unreachable: ${err.message}`);
  }
}

export async function getHello() {
  return fetchJson('/api/v1/hello');
}

export async function getHealth() {
  return fetchJson('/healthz');
}