import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Plus, Download } from "lucide-react";
import { selectFilteredTransactions, selectCategoriesForType } from "../../store/selectors";
import { setFilter, resetFilters } from "../../store/slices/transactionsSlice";
import { openModal } from "../../store/slices/uiSlice";
import TransactionTable from "../../components/TransactionTable/TransactionTable";

export default function Transactions() {
  const dispatch = useDispatch();
  const role = useSelector((s) => s.role.currentRole || s.role.current);
  const { filters } = useSelector((s) => s.transactions);
  const filtered = useSelector(selectFilteredTransactions);
  const expenseCategories = useSelector((state) =>
    selectCategoriesForType(state, "expense")
  );
  const incomeCategories = useSelector((state) =>
    selectCategoriesForType(state, "income")
  );

  const categories =
    filters.type === "income"
      ? incomeCategories
      : filters.type === "expense"
        ? expenseCategories
        : [...incomeCategories, ...expenseCategories].sort();

  // Calculate summary
  const income = filtered
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);
  const expenses = filtered
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  // CSV Export
  const exportCSV = () => {
    const headers = ["Date", "Description", "Category", "Type", "Amount"];
    const rows = filtered.map((t) => [
      t.date,
      t.description,
      t.category,
      t.type,
      t.amount,
    ]);
    const csv = [
      headers.join(","),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `transactions-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-zinc-100">
            Transactions
          </h1>
          <p className="mt-1 text-slate-600 dark:text-zinc-400">
            Manage and track your transactions
          </p>
        </div>
        <div className="flex flex-wrap gap-2 sm:justify-end">
          {role === "admin" && (
            <button
              onClick={() => dispatch(openModal())}
              className="flex items-center gap-2 whitespace-nowrap rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              <Plus size={16} /> Add Transaction
            </button>
          )}
          <button
            onClick={exportCSV}
            className="flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:border-zinc-600 dark:text-zinc-300 dark:hover:bg-zinc-950"
          >
            <Download size={16} /> Export
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="space-y-4 rounded-lg border border-slate-200 bg-white p-4 dark:border-zinc-700 dark:bg-black">
        <h3 className="font-semibold text-slate-900 dark:text-zinc-100">
          Filters
        </h3>
        <div className="grid gap-4 md:grid-cols-4">
          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-zinc-300">
              Search
            </label>
            <input
              type="text"
              value={filters.search}
              onChange={(e) =>
                dispatch(setFilter({ search: e.target.value }))
              }
              placeholder="Search description..."
              className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-zinc-600 dark:bg-zinc-950 dark:text-zinc-100"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-zinc-300">
              Type
            </label>
            <select
              value={filters.type}
              onChange={(e) => dispatch(setFilter({ type: e.target.value }))}
              className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-zinc-600 dark:bg-zinc-950 dark:text-zinc-100"
            >
              <option value="all">All Types</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-zinc-300">
              Category
            </label>
            <select
              value={filters.category}
              onChange={(e) => dispatch(setFilter({ category: e.target.value }))}
              className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-zinc-600 dark:bg-zinc-950 dark:text-zinc-100"
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-zinc-300">
              Date Range
            </label>
            <select
              value={filters.dateRange}
              onChange={(e) =>
                dispatch(setFilter({ dateRange: e.target.value }))
              }
              className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-zinc-600 dark:bg-zinc-950 dark:text-zinc-100"
            >
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 90 days</option>
              <option value="365">Last year</option>
            </select>
          </div>
        </div>

        <button
          onClick={() => dispatch(resetFilters())}
          className="text-xs font-medium text-blue-600 hover:text-blue-700 dark:text-zinc-200 dark:hover:text-zinc-200"
        >
          Reset Filters
        </button>
      </div>

      {/* Summary Strip */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border border-slate-200 bg-white p-4 dark:border-zinc-700 dark:bg-black">
          <p className="text-xs font-medium text-slate-600 dark:text-zinc-400">
            Income
          </p>
          <p className="mt-2 text-2xl font-bold text-emerald-600 dark:text-emerald-400">
            +${income.toFixed(2)}
          </p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-4 dark:border-zinc-700 dark:bg-black">
          <p className="text-xs font-medium text-slate-600 dark:text-zinc-400">
            Expenses
          </p>
          <p className="mt-2 text-2xl font-bold text-red-600 dark:text-red-400">
            -${expenses.toFixed(2)}
          </p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-4 dark:border-zinc-700 dark:bg-black">
          <p className="text-xs font-medium text-slate-600 dark:text-zinc-400">
            Net
          </p>
          <p
            className={`mt-2 text-2xl font-bold ${
              income - expenses >= 0
                ? "text-blue-600 dark:text-zinc-200"
                : "text-red-600 dark:text-red-400"
            }`}
          >
            ${(income - expenses).toFixed(2)}
          </p>
        </div>
      </div>

      {/* Table */}
      <TransactionTable transactions={filtered} />
    </div>
  );
}
