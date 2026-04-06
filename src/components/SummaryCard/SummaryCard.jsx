import { TrendingUp, TrendingDown } from "lucide-react";

export default function SummaryCard({
  title,
  value,
  delta,
  icon: Icon,
  type = "income",
}) {
  const isPositive = delta >= 0;
  const deltaColor = isPositive
    ? "text-emerald-500"
    : "text-red-500";
  const bgColor =
    type === "income"
      ? "bg-emerald-50 dark:bg-emerald-900/20"
      : type === "expense"
        ? "bg-red-50 dark:bg-red-900/20"
        : "bg-blue-50 dark:bg-zinc-800/50";

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:border-zinc-700 dark:bg-black">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-600 dark:text-zinc-400">
            {title}
          </p>
          <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-zinc-100">
            ${Math.abs(value).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </p>
          <div className="mt-2 flex items-center gap-1">
            {isPositive ? (
              <TrendingUp size={16} className={deltaColor} />
            ) : (
              <TrendingDown size={16} className={deltaColor} />
            )}
            <span className={`text-xs font-semibold ${deltaColor}`}>
              {isPositive ? "+" : ""}
              {delta.toFixed(1)}% from last month
            </span>
          </div>
        </div>
        <div className={`rounded-lg p-3 ${bgColor}`}>
          <Icon
            size={24}
            className={
              type === "income"
                ? "text-emerald-600 dark:text-emerald-400"
                : type === "expense"
                  ? "text-red-600 dark:text-red-400"
                  : "text-blue-600 dark:text-zinc-200"
            }
          />
        </div>
      </div>
    </div>
  );
}
