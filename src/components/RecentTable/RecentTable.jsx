import { set } from "date-fns";
import React from "react";
import { useMemo, useState } from "react";

export default function RecentTable(
  {
    rows
  }
){

  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All");
  const [page, setPage] = useState(1);
  const pageSize = 3;

  const filtered = useMemo(() => {
    return rows.filter((r) => {
      const matchtext = r.id.toLowerCase().includes(query.toLowerCase()) || r.customer.toLowerCase().includes(query.toLowerCase())

      const matchStatus = status === "All" ? true : r.status === status;

      return matchtext && matchStatus;
    })
  }, [rows, query, status])

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  const goPrev = () => setPage((p) => Math.max(1, p - 1));
  const goNext = () => setPage((p) => Math.min(totalPages, p + 1));

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">Recent Orders</h3>
        <div className="flex gap-2">
          <input
            value={query}
            onChange={(e) => {
              setPage(1);
              setQuery(e.target.value);
            }}
            placeholder="Search..."
            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          />
          <select
            value={status}
            onChange={(e) => {
              setPage(1);
              setStatus(e.target.value);
            }}
            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          >
            <option>All</option>
            <option>Paid</option>
            <option>Pending</option>
            <option>Failed</option>
          </select>
        </div>
      </div>

      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-slate-200 text-slate-500 dark:border-slate-700 dark:text-slate-400">
            <th className="py-2">Order ID</th>
            <th className="py-2">Customer</th>
            <th className="py-2">Amount</th>
            <th className="py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {paginated.map((r) => (
            <tr key={r.id} className="border-b border-slate-100 dark:border-slate-800">
              <td className="py-3">{r.id}</td>
              <td className="py-3">{r.customer}</td>
              <td className="py-3">{r.amount}</td>
              <td className="py-3">{r.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 flex items-center justify-between text-sm">
        <p className="text-slate-500 dark:text-slate-400">Page {page} of {totalPages}</p>
        <div className="flex gap-2">
          <button onClick={goPrev} className="rounded-lg border px-3 py-1.5 dark:border-slate-700">
            Prev
          </button>
          <button onClick={goNext} className="rounded-lg border px-3 py-1.5 dark:border-slate-700">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}