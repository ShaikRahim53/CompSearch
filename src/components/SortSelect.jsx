import React, { useState, useRef, useEffect } from "react";

export default function SortSelect({ sortBy, sortOrder, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (value) => {
    setOpen(false);
    if (!value) {
      onChange({ sortBy: "", sortOrder: "" });
    } else {
      onChange({ sortBy: "name", sortOrder: value });
    }
  };

  const display =
    sortOrder === "asc" ? "A–Z ▲" : sortOrder === "desc" ? "Z–A ▼" : "Sort";

  return (
    <div className="relative w-20" ref={ref}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((s) => !s)}
        className="w-20 text-left px-3 py-2 rounded-lg border border-gray-200 bg-white shadow-sm 
                   text-black flex items-center justify-between hover:shadow-md transition duration-200 ease-out
                   focus:outline-none cursor-pointer"
      >
        <span className="truncate">{display}</span>
        <svg
          className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
            open ? "rotate-180" : "rotate-0"
          }`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute left-0 mt-1 w-20 max-h-48 overflow-auto bg-white border border-gray-200 
                     rounded-lg shadow-lg z-50"
        >
          <li
            role="option"
            onClick={() => handleSelect("")}
            className="px-3 py-2 text-gray-700 hover:bg-blue-600 hover:text-white cursor-pointer"
          >
            Sort
          </li>
          <li
            role="option"
            onClick={() => handleSelect("asc")}
            className="px-3 py-2 text-gray-700 hover:bg-blue-600 hover:text-white cursor-pointer"
          >
            A–Z
          </li>
          <li
            role="option"
            onClick={() => handleSelect("desc")}
            className="px-3 py-2 text-gray-700 hover:bg-blue-600 hover:text-white cursor-pointer"
          >
            Z–A
          </li>
        </ul>
      )}
    </div>
  );
}
