import { useSelector } from "react-redux";
import { selectSummary, selectCategorySpending } from "../../store/selectors";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const COLORS = ["#3b82f6", "#ef4444", "#10b981", "#f59e0b", "#8b5cf6", "#ec4899", "#14b8a6", "#f97316"];

export default function Insights() {
  const summary = useSelector(selectSummary);
  const categorySpending = useSelector(selectCategorySpending);

  const savingsRate =
    summary.totalIncome > 0
      ? (((summary.totalIncome - summary.totalExpenses) / summary.totalIncome) * 100).toFixed(1)
      : 0;

  const getSavingsHealth = (rate) => {
    if (rate >= 20) return { label: "Excellent", color: "text-emerald-600 dark:text-emerald-400" };
    if (rate >= 10) return { label: "Good", color: "text-blue-600 dark:text-zinc-200" };
    if (rate >= 0) return { label: "Fair", color: "text-amber-600 dark:text-amber-400" };
    return { label: "Poor", color: "text-red-600 dark:text-red-400" };
  };

  const health = getSavingsHealth(savingsRate);

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-zinc-100">Insights & Analytics</h1>
        <p className="mt-1 text-slate-600 dark:text-zinc-400">Track your financial metrics and trends</p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border border-slate-200 bg-white p-4 dark:border-zinc-700 dark:bg-black">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-600 dark:text-zinc-400">
            Savings Rate
          </p>
          <p className={`mt-3 text-3xl font-bold ${health.color}`}>{savingsRate}%</p>
          <p className={`mt-2 text-xs font-semibold ${health.color}`}>{health.label}</p>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-4 dark:border-zinc-700 dark:bg-black">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-600 dark:text-zinc-400">
            Avg. Expense
          </p>
          <p className="mt-3 text-3xl font-bold text-red-600 dark:text-red-400">
            ${(summary.totalExpenses / Math.max(1, categorySpending.length)).toFixed(0)}
          </p>
          <p className="mt-2 text-xs text-slate-600 dark:text-zinc-400">{categorySpending.length} categories</p>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-4 dark:border-zinc-700 dark:bg-black">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-600 dark:text-zinc-400">
            Monthly Target
          </p>
          <p className="mt-3 text-3xl font-bold text-blue-600 dark:text-zinc-200">$500</p>
          <p className="mt-2 text-xs text-slate-600 dark:text-zinc-400">
            Saved ${summary.balance > 500 ? summary.balance - 500 : 0}
          </p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Category Spending Chart */}
        <div className="rounded-lg border border-slate-200 bg-white p-4 dark:border-zinc-700 dark:bg-black">
          <h3 className="mb-4 text-base font-semibold text-slate-900 dark:text-zinc-100">
            Spending by Category
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categorySpending}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) => `${entry.name.slice(0, 10)}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categorySpending.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Ranking */}
        <div className="rounded-lg border border-slate-200 bg-white p-4 dark:border-zinc-700 dark:bg-black">
          <h3 className="mb-4 text-base font-semibold text-slate-900 dark:text-zinc-100">
            Top Spending Categories
          </h3>
          <div className="space-y-3">
            {categorySpending.slice(0, 5).map((cat, idx) => {
              const maxVal = categorySpending[0]?.value || 1;
              const percentage = ((cat.value / maxVal) * 100).toFixed(0);
              return (
                <div key={cat.name}>
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium text-slate-900 dark:text-zinc-100">
                      {cat.name}
                    </p>
                    <p className="text-sm font-semibold text-slate-600 dark:text-zinc-400">
                      ${cat.value.toFixed(0)}
                    </p>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-zinc-700">
                    <div
                      className="h-full bg-linear-to-r from-red-400 to-red-600"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Summary Strip */}
      <div className="rounded-lg border border-slate-200 bg-white p-6 dark:border-zinc-700 dark:bg-black">
        <h3 className="mb-4 text-base font-semibold text-slate-900 dark:text-zinc-100">
          Smart Observations
        </h3>
        <ul className="space-y-3 text-sm">
          <li className="flex items-start gap-3">
            <span className="text-blue-600 dark:text-zinc-200">-</span>
            <span className="text-slate-700 dark:text-zinc-300">
              {summary.incomeDelta > 0 ? "Your income increased by" : "Your income decreased by"}{" "}
              <strong>{Math.abs(summary.incomeDelta).toFixed(1)}%</strong> compared to last month.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-600 dark:text-zinc-200">-</span>
            <span className="text-slate-700 dark:text-zinc-300">
              {summary.expensesDelta > 0 ? "Your expenses increased by" : "Your expenses decreased by"}{" "}
              <strong>{Math.abs(summary.expensesDelta).toFixed(1)}%</strong> compared to last month.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-600 dark:text-zinc-200">-</span>
            <span className="text-slate-700 dark:text-zinc-300">
              Your current savings rate is <strong>{savingsRate}%</strong> - {health.label}.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-600 dark:text-zinc-200">-</span>
            <span className="text-slate-700 dark:text-zinc-300">
              Top spending category: <strong>{categorySpending[0]?.name || "N/A"}</strong> at $
              {(categorySpending[0]?.value || 0).toFixed(0)}.
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
