import StatCard from "../../components/StatCard/StatCard"
import RevenueChart from "../../components/RevenueChart/RevenueChart";
import RecentTable from "../../components/RecentTable/RecentTable";
import {stats,revenueData,recentOrders} from "../../data/dashboardData";


export default function Dashboard() {
  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <StatCard key={item.title} {...item} />
        ))}
      </div>
      <RevenueChart data={revenueData} />
      <RecentTable rows={recentOrders} />
    </div>
  );
}