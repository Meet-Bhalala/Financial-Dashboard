import { formatDistanceToNow } from "date-fns";
import { Edit2, Trash2, ChevronUp, ChevronDown } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTransaction,
  setFilter,
} from "../../store/slices/transactionsSlice";
import { openModal } from "../../store/slices/uiSlice";

export default function TransactionTable({ transactions }) {
  const dispatch = useDispatch();
  const role = useSelector((s) => s.role.currentRole || s.role.current);
  const { sortBy, sortOrder } = useSelector((s) => s.transactions.filters);

  const handleSort = (field) => {
    const newOrder =
      sortBy === field && sortOrder === "desc" ? "asc" : "desc";
    dispatch(setFilter({ sortBy: field, sortOrder: newOrder }));
  };

  const SortIcon = ({ field }) => {
    if (sortBy !== field) return <span className="w-4" />;
    return sortOrder === "desc" ? (
      <ChevronDown size={16} />
    ) : (
      <ChevronUp size={16} />
    );
  };

  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-zinc-700">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50 dark:border-zinc-700 dark:bg-zinc-950">
            <th className="px-4 py-3 text-left font-medium text-slate-700 dark:text-zinc-300">
              <button
                onClick={() => handleSort("date")}
                className="flex items-center gap-1 hover:text-slate-900 dark:hover:text-zinc-100"
              >
                Date
                <SortIcon field="date" />
              </button>
            </th>
            <th className="px-4 py-3 text-left font-medium text-slate-700 dark:text-zinc-300">
              Description
            </th>
            <th className="px-4 py-3 text-left font-medium text-slate-700 dark:text-zinc-300">
              <button
                onClick={() => handleSort("category")}
                className="flex items-center gap-1 hover:text-slate-900 dark:hover:text-zinc-100"
              >
                Category
                <SortIcon field="category" />
              </button>
            </th>
            <th className="px-4 py-3 text-right font-medium text-slate-700 dark:text-zinc-300">
              <button
                onClick={() => handleSort("amount")}
                className="ml-auto flex items-center gap-1 hover:text-slate-900 dark:hover:text-zinc-100"
              >
                Amount
                <SortIcon field="amount" />
              </button>
            </th>
            {role === "admin" && (
              <th className="px-4 py-3 text-center font-medium text-slate-700 dark:text-zinc-300">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {transactions.length === 0 ? (
            <tr>
              <td colSpan={role === "admin" ? 5 : 4} className="px-4 py-8 text-center text-slate-500">
                No transactions found
              </td>
            </tr>
          ) : (
            transactions.map((tx) => (
              <tr
                key={tx.id}
                className="border-b border-slate-200 hover:bg-slate-50 dark:border-zinc-700 dark:hover:bg-zinc-950/50"
              >
                <td className="px-4 py-3 text-slate-900 dark:text-zinc-100">
                  {formatDistanceToNow(new Date(tx.date), { addSuffix: true })}
                </td>
                <td className="px-4 py-3 text-slate-900 dark:text-zinc-100">
                  {tx.description}
                </td>
                <td className="px-4 py-3">
                  <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700 dark:bg-zinc-800/60 dark:text-zinc-300">
                    {tx.category}
                  </span>
                </td>
                <td
                  className={`px-4 py-3 text-right font-semibold ${
                    tx.type === "income"
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {tx.type === "income" ? "+" : "-"}${tx.amount.toFixed(2)}
                </td>
                {role === "admin" && (
                  <td className="px-4 py-3 text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => dispatch(openModal(tx))}
                        className="rounded-lg p-1 hover:bg-blue-100 dark:hover:bg-zinc-800/60"
                      >
                        <Edit2 size={16} className="text-blue-600 dark:text-zinc-200" />
                      </button>
                      <button
                        onClick={() => dispatch(deleteTransaction(tx.id))}
                        className="rounded-lg p-1 hover:bg-red-100 dark:hover:bg-red-900/30"
                      >
                        <Trash2 size={16} className="text-red-600 dark:text-red-400" />
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
