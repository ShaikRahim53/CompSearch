import { useEffect, useRef, useState } from "react";

function buildQuery(filters) {
  const qs = new URLSearchParams();
  for (const k of Object.keys(filters || {})) {
    const v = filters[k];
    if (v === undefined || v === null || v === "") continue;
    qs.set(k, String(v));
  }
  return qs.toString();
}

export function useCompanies(initialFilters = {}) {
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    ...initialFilters,
  });

  const [data, setData] = useState({
    data: [],
    meta: {
      total: 0,
      page: 1,
      limit: 10,
      totalPages: 0,
      locations: [],
      industries: [],
    },
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const requestIdRef = useRef(0);
  const abortRef = useRef(null);
  const pendingDataRef = useRef(data);

  useEffect(() => {
    pendingDataRef.current = data;
  }, [data]);

  useEffect(() => {
    const reqId = ++requestIdRef.current;

    if (abortRef.current) {
      try {
        abortRef.current.abort();
      } catch {}
    }
    const controller = new AbortController();
    abortRef.current = controller;

    const apiBase = "http://localhost:5000";
    const qs = buildQuery(filters);
    const url = `${apiBase}/api/companies${qs ? "?" + qs : ""}`;

    setLoading(true);
    setError(null);

    fetch(url, { signal: controller.signal })
      .then(async (res) => {
        const ct = (res.headers.get("content-type") || "").toLowerCase();
        const text = await res.text();
        if (!res.ok) {
          throw new Error(
            `HTTP ${res.status} ${res.statusText} - ${text.slice(0, 200)}`
          );
        }
        if (!ct.includes("application/json")) {
          throw new Error(
            "Expected JSON but received HTML. Check backend URL/proxy. Response start: " +
              text.slice(0, 200)
          );
        }
        return JSON.parse(text);
      })
      .then((json) => {
        if (requestIdRef.current !== reqId) return; // stale
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        if (requestIdRef.current !== reqId) return;
        console.error("useCompanies fetch error", err);
        setError(err.message || "Unknown error");
        setLoading(false);
      });

    return () => {
      try {
        controller.abort();
      } catch {}
      if (abortRef.current === controller) abortRef.current = null;
    };
  }, [
    filters.page,
    filters.limit,
    filters.search,
    filters.location,
    filters.industry,
    filters.sortBy,
    filters.sortOrder,
  ]);

  return { data, filters, setFilters, loading, error };
}

export default useCompanies;
