import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { formatCurrency } from "../utils/formatCurrency";

function ExpenseChart({ data }) {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient
              id="expenseGradient"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="0%"
                stopColor="#34d399"
                stopOpacity={0.35}
              />

              <stop
                offset="100%"
                stopColor="#34d399"
                stopOpacity={0}
              />
            </linearGradient>
          </defs>

          <CartesianGrid
            stroke="rgba(255,255,255,0.04)"
            vertical={false}
          />

          <XAxis
            dataKey="month"
            stroke="#475569"
            tickLine={false}
            axisLine={false}
          />

          <YAxis
            stroke="#475569"
            tickLine={false}
            axisLine={false}
            width={60}
          />

          <Tooltip
            contentStyle={{
              background: "#0d141a",
              border: "1px solid rgba(255,255,255,.08)",
              borderRadius: "14px",
            }}
            formatter={(value) => formatCurrency(value)}
          />

          <Area
            type="monotone"
            dataKey="expense"
            stroke="#6ee7b7"
            strokeWidth={3}
            fill="url(#expenseGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ExpenseChart;