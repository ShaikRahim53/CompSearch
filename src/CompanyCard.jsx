import React from "react";

function ensureUrl(href) {
  if (!href) return "";
  return href.startsWith("http://") || href.startsWith("https://")
    ? href
    : `https://${href}`;
}

const Icon = {
  location: (
    <svg
      className="w-4 h-4 inline-block mr-2"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <path
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 11.5a3 3 0 100-6 3 3 0 000 6z"
      />
      <path
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 10c0 6-9 13-9 13S3 16 3 10a9 9 0 1118 0z"
      />
    </svg>
  ),
  industry: (
    <svg
      className="w-4 h-4 inline-block mr-2"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <path
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 21v-8l9-4 9 4v8"
      />
      <path
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 10V3l6 3v7"
      />
    </svg>
  ),
  founded: (
    <svg
      className="w-4 h-4 inline-block mr-2"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" strokeWidth="1.5" />
      <path
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16 2v4M8 2v4M3 10h18"
      />
    </svg>
  ),
  size: (
    <svg
      className="w-4 h-4 inline-block mr-2"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <path
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 2v6M6 8v6M18 8v6M6 20h12"
      />
    </svg>
  ),
  website: (
    <svg
      className="w-4 h-4 inline-block mr-2"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <path
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 2a10 10 0 100 20 10 10 0 000-20z"
      />
      <path
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2 12h20M12 2c2.2 4 2.2 8 0 12M12 22c2.2-4 2.2-8 0-12"
      />
    </svg>
  ),
  email: (
    <svg
      className="w-4 h-4 inline-block mr-2"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <path
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 8l9 6 9-6"
      />
      <path
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 8v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8"
      />
    </svg>
  ),
  revenue: (
    <svg
      className="w-4 h-4 inline-block mr-2 text-green-600"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <path
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 1v22"
      />
      <path
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17 5H9a3 3 0 000 6h6a3 3 0 010 6H7"
      />
    </svg>
  ),
};

export default function CompanyCard({ data }) {
  const items = Array.isArray(data) ? data : data?.data || [];

  if (!items || items.length === 0) {
    return (
      <div className="text-center p-6 text-gray-600 ">
        No companies to show.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {items.map((c, i) => {
        const websiteUrl = ensureUrl(c?.website || c?.url || "");
        const displayWebsite = websiteUrl
          ? websiteUrl.replace(/^https?:\/\//, "")
          : "—";
        const email = c?.email || c?.contact?.email || "";
        const founded =
          c?.founded ||
          c?.foundedYear ||
          c?.yearFounded ||
          (typeof c?.founded === "number" ? c.founded : "") ||
          "";
        const revenue =
          c?.revenue ??
          c?.financial?.revenue ??
          c?.metrics?.revenue ??
          c?.revenueRange ??
          null;
        const size = c?.size || c?.employees || "—";
        const description = c?.description || c?.summary || c?.about || "";

        return (
          <article
            key={c?._id ?? c?.id ?? i}
            className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-xl transform hover:-translate-y-1 transition duration-200 ease-out"
          >
            <h3 className="text-lg font-semibold text-black mb-2">
              {c?.name ?? "—"}
            </h3>

            {/* small description */}
            {description ? (
              <p className="text-sm text-gray-600 mb-3">{description}</p>
            ) : (
              <p className="text-sm text-gray-500 mb-3">
                No description available.
              </p>
            )}

            <div className="space-y-2 text-sm text-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-gray-500">{Icon.location}</span>
                  <span className="text-black">{c?.location ?? "—"}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-500">{Icon.industry}</span>
                  <span className="text-black">{c?.industry ?? "—"}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-gray-500">{Icon.founded}</span>
                  <span className="text-black">{founded || "—"}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-500">{Icon.size}</span>
                  <span className="text-black">{size}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-green-600">{Icon.revenue}</span>
                  <span className="text-green-700 font-medium">
                    {revenue || "—"}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-500">{Icon.email}</span>
                  {email ? (
                    <a
                      className="text-black underline"
                      href={`mailto:${email}`}
                    >
                      {email}
                    </a>
                  ) : (
                    <span className="text-black">—</span>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-gray-500">{Icon.website}</span>
                  {websiteUrl ? (
                    <a
                      href={websiteUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-black underline break-all"
                    >
                      {displayWebsite}
                    </a>
                  ) : (
                    <span className="text-black">—</span>
                  )}
                </div>

                <div className="text-xs text-gray-400">{c?.status ?? ""}</div>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
