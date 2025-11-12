import React, { useEffect, useRef, useState } from "react";

function Dropdown({ name, value, options = [], placeholder, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function onDoc(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const handleSelect = (val) => {
    setOpen(false);
    onChange({ [name]: val });
  };

  const display = value || placeholder || "";

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((s) => !s)}
        className="w-56 text-left px-3 py-2 rounded-lg border border-gray-200 bg-white shadow-sm text-black 
             hover:shadow-md hover:-translate-y-0 transition duration-200 ease-out focus:outline-none cursor-pointer"
      >
        <span className="truncate">{display}</span>
        <span className="float-right ml-2 text-gray-500">▾</span>
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute left-0 mt-1 w-56 max-h-48 overflow-auto bg-white border border-gray-200 
               rounded-lg shadow-lg z-50"
        >
          <li
            role="option"
            onClick={() => handleSelect("")}
            className="px-3 py-2 text-gray-700 hover:bg-blue-600 hover:text-white cursor-pointer"
          >
            {placeholder || "All"}
          </li>
          {options.map((opt) => (
            <li
              key={opt}
              role="option"
              onClick={() => handleSelect(opt)}
              className="px-3 py-2 text-gray-700 hover:bg-blue-600 hover:text-white cursor-pointer"
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function CompanyFilters({
  search,
  location,
  industry,
  locations = [],
  industries = [],
  onChange,
}) {
  return (
    <div className="flex flex-col md:flex-row gap-3 md:items-end relative overflow-visible">
      <div className="flex-1">
        <input
          type="text"
          value={search}
          onChange={(e) => onChange({ search: e.target.value })}
          placeholder="Search companies"
          className="w-130 text-left px-3 py-2 rounded-lg border border-gray-200 bg-white shadow-sm text-black 
             hover:shadow-md hover:-translate-y-0 transition duration-200 ease-out focus:outline-none"
        />
      </div>

      <Dropdown
        name="location"
        value={location}
        options={locations}
        placeholder="All locations"
        onChange={onChange}
      />

      <Dropdown
        name="industry"
        value={industry}
        options={industries}
        placeholder="All industries"
        onChange={onChange}
      />

      <div className="flex gap-2">
        <button
          onClick={() => onChange({ search: "", location: "", industry: "" })}
          className="px-3 py-2 bg-red-500 text-white hover:opacity-95 hover:cursor-pointer rounded border cursor-pointer rounded-lg border border-gray-200 shadow-sm text-black 
             hover:shadow-md hover:-translate-y-0 transition duration-200 ease-out focus:outline-none"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
