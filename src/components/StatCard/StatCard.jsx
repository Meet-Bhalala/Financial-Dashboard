import React from "react";

export default function StatCard(
    {
        title="",
        value="",
        change="",
        positive,
    }
) {
    return (
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900">
            <p className="text-sm text-slate-500 dark:text-slate-400">{title}</p>
            <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-slate-100">{value}</p>
            <p className={`mt-1 text-sm ${positive ? "text-emerald-600" : "text-red-600"}`}>{change}</p>
        </div>
  );
}