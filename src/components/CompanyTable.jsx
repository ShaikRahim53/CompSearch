import React from "react";

function ensureUrl(href) {
  if (!href) return "";
  return href.startsWith("http://") || href.startsWith("https://")
    ? href
    : `https://${href}`;
}

export default function CompanyTable({ data }) {
  // accept either array or API wrapper
  const rows = Array.isArray(data) ? data : data?.data ?? [];

  if (!rows || rows.length === 0) {
    return (
      <div className="text-center p-4 text-gray-600">No companies to show.</div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr className="text-left bg-white">
            <th className="px-3 py-2 border-b border-gray-200">Name</th>
            <th className="px-3 py-2 border-b border-gray-200">Location</th>
            <th className="px-3 py-2 border-b border-gray-200">Industry</th>
            <th className="px-3 py-2 border-b border-gray-200">Founded</th>
            <th className="px-3 py-2 border-b border-gray-200">Size</th>
            <th className="px-3 py-2 border-b border-gray-200">Website</th>
            <th className="px-3 py-2 border-b border-gray-200">Email</th>
            <th className="px-3 py-2 border-b border-gray-200">Revenue</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((c, idx) => {
            const website = ensureUrl(c?.website || c?.url || "");
            const email = c?.email || c?.contact?.email || "";
            const founded =
              c?.founded ||
              c?.foundedYear ||
              c?.yearFounded ||
              (typeof c?.founded === "number" ? c.founded : "");
            const size = c?.size || c?.employees || "—";
            const revenue =
              c?.revenue ??
              c?.financial?.revenue ??
              c?.metrics?.revenue ??
              null;

            return (
              <tr
                key={c?._id ?? c?.id ?? idx}
                className="odd:bg-white even:bg-gray-50"
              >
                <td className="px-3 py-2 align-top border-b border-gray-100">
                  {c?.name ?? "—"}
                </td>
                <td className="px-3 py-2 align-top border-b border-gray-100">
                  {c?.location ?? "—"}
                </td>
                <td className="px-3 py-2 align-top border-b border-gray-100">
                  {c?.industry ?? "—"}
                </td>
                <td className="px-3 py-2 align-top border-b border-gray-100">
                  {founded || "—"}
                </td>
                <td className="px-3 py-2 align-top border-b border-gray-100">
                  {size}
                </td>
                <td className="px-3 py-2 align-top border-b border-gray-100">
                  {website ? (
                    <a
                      href={website}
                      target="_blank"
                      rel="noreferrer"
                      className="text-black underline hover:opacity-90"
                    >
                      {website.replace(/^https?:\/\//, "")}
                    </a>
                  ) : (
                    "—"
                  )}
                </td>
                <td className="px-3 py-2 align-top border-b border-gray-100">
                  {email ? (
                    <a
                      href={`mailto:${email}`}
                      className="text-black underline"
                    >
                      {email}
                    </a>
                  ) : (
                    "—"
                  )}
                </td>
                <td className="px-3 py-2 align-top border-b border-gray-100">
                  {revenue != null ? (
                    <span className="text-green-700 font-medium">
                      {revenue}
                    </span>
                  ) : (
                    "—"
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
