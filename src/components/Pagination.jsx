import React from "react";

export default function Pagination({ page = 1, totalPages = 1, onChange }) {
  const prevDisabled = page <= 1;
  const nextDisabled = page >= totalPages;

  const btnBase =
    "px-3 py-1 rounded-lg border border-gray-200 shadow-sm flex items-center justify-center text-black hover:shadow-md focus:outline-none transition duration-200 ease-out";
  const btnActive = "bg-gray-100 hover:bg-gray-200 hover:cursor-pointer";
  const btnDisabled = "bg-gray-100 text-gray-400 cursor-not-allowed opacity-60";

  return (
    <div className="flex items-center gap-2">
      {/* First */}
      <button
        type="button"
        onClick={() => !prevDisabled && onChange(1)}
        disabled={prevDisabled}
        aria-label="First page"
        className={`${btnBase} ${prevDisabled ? btnDisabled : btnActive}`}
      >
        {/* Double Left Chevron */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11 19l-7-7 7-7M19 19l-7-7 7-7"
          />
        </svg>
      </button>

      {/* Prev */}
      <button
        type="button"
        onClick={() => !prevDisabled && onChange(page - 1)}
        disabled={prevDisabled}
        aria-label="Previous page"
        className={`${btnBase} ${prevDisabled ? btnDisabled : btnActive}`}
      >
        {/* Single Left Chevron */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <div className="text-sm text-gray-600 px-2 select-none">
        Page {page} / {totalPages}
      </div>

      {/* Next */}
      <button
        type="button"
        onClick={() => !nextDisabled && onChange(page + 1)}
        disabled={nextDisabled}
        aria-label="Next page"
        className={`${btnBase} ${nextDisabled ? btnDisabled : btnActive}`}
      >
        {/* Single Right Chevron */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Last */}
      <button
        type="button"
        onClick={() => !nextDisabled && onChange(totalPages)}
        disabled={nextDisabled}
        aria-label="Last page"
        className={`${btnBase} ${nextDisabled ? btnDisabled : btnActive}`}
      >
        {/* Double Right Chevron */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 5l7 7-7 7M13 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
}
