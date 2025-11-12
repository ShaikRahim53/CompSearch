const API_BASE = import.meta.env.VITE_API_BASE;

export function buildQuery(params) {
  const q = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== "") q.set(k, String(v));
  });
  return q.toString();
}

export async function getCompanies(params) {
  if (!API_BASE) throw new Error("API base URL is not defined!");
  const qs = buildQuery(params);
  const res = await fetch(`${API_BASE}/api/companies?${qs}`);
  if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
  return res.json();
}
