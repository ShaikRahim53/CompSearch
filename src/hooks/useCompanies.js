import { useEffect, useRef, useState } from "react";
import { getCompanies } from "../api/client"; // use your client.js

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

  useEffect(() => {
    const reqId = ++requestIdRef.current;

    if (abortRef.current) {
      try {
        abortRef.current.abort();
      } catch {}
    }
    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);
    setError(null);

    // Use the getCompanies function from client.js, which already respects VITE_API_BASE
    getCompanies(filters)
      .then((json) => {
        if (requestIdRef.current !== reqId) return; // stale request
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
