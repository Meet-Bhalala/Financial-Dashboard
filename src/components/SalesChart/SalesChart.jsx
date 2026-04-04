import { LineChart,Line,XAxis,YAxis,Tooltip,ResponsiveContainer } from "recharts";

const data=[
    {
        name:"Mon",
        sales:120,
    },
    {
        name:"Tue",
        sales:210,
    },
    {
        name:"Wed",
        sales:160,
    },
    {
        name:"Thu",
        sales:280,
    },
    {
        name:"Fri",
        sales:240,
    },
    {
        name:"Sat",
        sales:310,
    },
    {
        name:"Sun",
        sales:260,
    },
]

export default function SalesChart(){
    return (
    <div className="rounded-xl border border-slate-700 bg-[#121a2f] p-4 h-80">
      <h3 className="mb-4 font-semibold">Weekly Sales</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="name" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />
          <Tooltip />
          <Line type="monotone" dataKey="sales" stroke="#5b8cff" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}