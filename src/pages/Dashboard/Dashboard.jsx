import SummaryCard from "../../components/SummaryCard/SummaryCard";
import RevenueChart from "../../components/RevenueChart/RevenueChart";
import RecentTable from "../../components/RecentTable/RecentTable";
import { revenueData, recentOrders } from "../../Data/dashboardData";
import { useSelector } from "react-redux";
import { selectSummary } from "../../store/selectors";
import { DollarSign, TrendingUp, TrendingDown } from "lucide-react";

export default function Dashboard() {
  const role = useSelector((state) => state.role.currentRole);
  const summary = useSelector(selectSummary);

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-zinc-100">Dashboard Overview</h2>
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            role === "admin"
              ? "bg-blue-100 text-blue-700 dark:bg-zinc-800/60 dark:text-zinc-300"
              : "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"
          }`}
        >
          {role === "admin" ? "Admin" : "Viewer"}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          title="Balance"
          value={summary.balance}
          delta={summary.savingsDelta}
          icon={DollarSign}
          type="balance"
        />
        <SummaryCard
          title="Income"
          value={summary.totalIncome}
          delta={summary.incomeDelta}
          icon={TrendingUp}
          type="income"
        />
        <SummaryCard
          title="Expenses"
          value={summary.totalExpenses}
          delta={summary.expensesDelta}
          icon={TrendingDown}
          type="expense"
        />
        <SummaryCard
          title="Transactions"
          value={recentOrders.length}
          delta={0}
          icon={DollarSign}
          type="balance"
        />
      </div>

      <RevenueChart data={revenueData} />
      <RecentTable rows={recentOrders} />
    </div>
  );
}