import Navbar from "./Navbar";
import React, { useState, useEffect, useRef, startTransition } from "react";
import { useCompanies } from "./hooks/useCompanies";
import CompanyFilters from "./components/CompanyFilters";
import SortSelect from "./components/SortSelect";
import Pagination from "./components/Pagination";
import CompanyTable from "./components/CompanyTable";
import CompanyCard from "./CompanyCard";
import Hero from "./components/Hero";
import Footer from "./components/Footer";

function App() {
  const [view, setView] = useState("card"); // default to card view on load

  const { data, filters, setFilters, loading, error } = useCompanies({});
  const [pending, setPending] = useState({
    search: "",
    location: "",
    industry: "",
    sortBy: "",
    sortOrder: "",
  });

  // refs used for debounce and to access latest pending inside timeout
  const searchDebounceRef = useRef(null);
  const pendingRef = useRef(pending);

  // helper: only call setFilters when something actually changed, and do it in a low-priority transition
  const applyIfChanged = (nextPartial) => {
    const merged = { ...filters, ...nextPartial };
    const keys = [
      "search",
      "location",
      "industry",
      "sortBy",
      "sortOrder",
      "page",
      "limit",
    ];
    const changed = keys.some((k) => {
      const a = filters?.[k] ?? "";
      const b = merged?.[k] ?? "";
      return String(a) !== String(b);
    });
    if (changed) {
      startTransition(() => {
        setFilters((prev) => ({ ...prev, ...nextPartial }));
      });
    }
  };

  // keep pending in sync when applied filters change (e.g., pagination or reset)
  // but avoid overwriting user input while typing by only syncing keys we don't actively edit
  useEffect(() => {
    const next = {
      search: filters.search || "",
      location: filters.location || "",
      industry: filters.industry || "",
      sortBy: filters.sortBy || "",
      sortOrder: filters.sortOrder || "",
    };
    setPending((prev) => {
      const merged = { ...prev, ...next };
      pendingRef.current = merged;
      return merged;
    });
  }, [
    filters.search,
    filters.location,
    filters.industry,
    filters.sortBy,
    filters.sortOrder,
  ]);

  // keep pendingRef in sync any time pending changes (covers local updates)
  useEffect(() => {
    pendingRef.current = pending;
  }, [pending]);

  // clear debounce on unmount
  useEffect(() => {
    return () => {
      if (searchDebounceRef.current) {
        clearTimeout(searchDebounceRef.current);
        searchDebounceRef.current = null;
      }
    };
  }, []);

  const onFilterChange = (next) => {
    // update local pending and its ref
    setPending((prev) => {
      const np = { ...prev, ...next };
      pendingRef.current = np;
      return np;
    });

    // apply immediately for location/industry, but debounce search to avoid frequent requests
    if (Object.prototype.hasOwnProperty.call(next, "search")) {
      // debounce 350ms
      if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current);
      searchDebounceRef.current = setTimeout(() => {
        applyIfChanged({ ...pendingRef.current, page: 1 });
        searchDebounceRef.current = null;
      }, 350);
    } else {
      applyIfChanged({ ...next, page: 1 });
    }
  };

  const onSortChange = (next) => {
    // update local pending state
    setPending((prev) => ({ ...prev, ...next }));

    // apply immediately when sortOrder changes so UI sorts
    if (next.sortOrder !== undefined) {
      applyIfChanged({
        sortBy: next.sortBy || "",
        sortOrder: next.sortOrder || "",
        page: 1,
      });
    }
  };

  const onApply = () => {
    // clear any pending debounce and immediately apply current pending
    if (searchDebounceRef.current) {
      clearTimeout(searchDebounceRef.current);
      searchDebounceRef.current = null;
    }
    applyIfChanged({ ...pendingRef.current, page: 1 });
  };

  // on first load, use card-friendly page size
  useEffect(() => {
    setFilters((prev) => ({ ...prev, limit: 9, page: 1 }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Hero
        imageUrl="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1600&auto=format&fit=crop"
        title="Find and explore the companies"
        subtitle="Analyze, Compare, and Discover Companies Instantly"
      />
      <div className="max-w-6xl mx-auto p-4 md:p-6">
        <div
          className="rounded-lg border border-gray-200 bg-white shadow-sm text-black 
           focus:outline-none p-4 mb-4"
        >
          <div className="flex flex-col gap-3">
            <CompanyFilters
              search={pending.search}
              location={pending.location}
              industry={pending.industry}
              locations={data?.meta?.locations || []}
              industries={data?.meta?.industries || []}
              onChange={onFilterChange}
            />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <SortSelect
                  sortBy={pending.sortBy}
                  sortOrder={pending.sortOrder}
                  onChange={onSortChange}
                />

                {/* view toggle buttons moved beside sort */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setView("table")}
                    className={`px-3 py-2 rounded border cursor-pointer rounded-lg border border-gray-200 shadow-sm text-black 
             hover:shadow-md hover:-translate-y-0 transition duration-200 ease-out focus:outline-none ${
               view === "table"
                 ? "bg-blue-600 text-white border-blue-600"
                 : "bg-white"
             }`}
                  >
                    Table
                  </button>
                  <button
                    onClick={() => {
                      startTransition(() =>
                        setFilters((prev) => ({ ...prev, limit: 9, page: 1 }))
                      );
                      setView("card");
                    }}
                    className={`px-3 py-2 rounded border cursor-pointer rounded border cursor-pointer rounded-lg border border-gray-200 shadow-sm text-black 
             hover:shadow-md hover:-translate-y-0 transition duration-200 ease-out focus:outline-none ${
               view === "card"
                 ? "bg-blue-600 text-white border-blue-600"
                 : "bg-white"
             }`}
                  >
                    Cards
                  </button>
                </div>
              </div>
              <div /> {/* layout balance */}
            </div>
          </div>
        </div>
        {loading && (
          <div className="text-center py-4 ">
            <span className="text-gray-500">Loading...</span>
          </div>
        )}
        {error && (
          <div className="text-center py-4">
            <span className="text-red-500">{error.message}</span>
          </div>
        )}
        {!loading && !error && data && (
          <div
            className="bg-white border rounded p-4 rounded-lg border border-gray-200 bg-white shadow-sm text-black 
             hover:shadow-md hover:-translate-y-0 transition duration-200 ease-out focus:outline-none"
          >
            {data.data.length === 0 ? (
              <div className="text-center text-gray-600 p-6">
                No companies found.
              </div>
            ) : view === "table" ? (
              <CompanyTable data={data.data} />
            ) : (
              <CompanyCard data={data.data} />
            )}

            <div className="mt-4 flex items-center justify-between ">
              <div className="text-sm text-gray-600">
                Showing {(filters.page - 1) * filters.limit + 1}-
                {Math.min(filters.page * filters.limit, data.meta.total)} of{" "}
                {data.meta.total}
              </div>
              <Pagination
                page={data.meta.page}
                totalPages={data.meta.totalPages}
                onChange={(p) => setFilters((prev) => ({ ...prev, page: p }))}
              />
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default App;
