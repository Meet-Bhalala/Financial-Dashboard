import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const monthly = [
  { 
    name: "Jan", 
    users: 1200 

  },
  { 
    name: "Feb", 
    users: 1500 

  },
  { 
    name: "Mar", 
    users: 1700 

  },
  { 
    name: "Apr", 
    users: 1400 

  },
  { 
    name: "May", 
    users: 2200 

  },
  { 
    name: "Jun", 
    users: 2600 

  },
];

const traffic = [
  { 
    name: "Organic", 
    value: 45 

  },
  { 
    name: "Ads", 
    value: 30 

  },
  { 
    name: "Referral", 
    value: 15 

  },
  { 
    name: "Direct", 
    value: 10 

  },
]

const colors = ["#2563eb", "#22c55e", "#f59e0b", "#a855f7"];

export default function Reports() {
  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-xl font-semibold">Reports</h2>
        <p className="mt-1 text-sm text-slate-500">Overview of growth and traffic channels.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <h3 className="mb-4 font-semibold">Monthly Active Users</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthly}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="users" fill="#2563eb" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <h3 className="mb-4 font-semibold">Traffic Source</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={traffic} dataKey="value" nameKey="name" outerRadius={100} label>
                  {traffic.map((_, i) => (
                    <Cell key={i} fill={colors[i % colors.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}