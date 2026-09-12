import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import { formatCurrency } from "../utils/formatCurrency";

const colors = [
  "#6ee7b7",
  "#60a5fa",
  "#f472b6",
  "#fbbf24",
  "#a78bfa",
  "#fb7185",
  "#22d3ee",
  "#94a3b8",
];

function CategoryChart({ data }) {
  if (!data.length) {
    return (
      <div className="grid h-[260px] place-items-center text-sm text-slate-600">
        No expense data yet.
      </div>
    );
  }

  return (
    <div className="h-[260px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={65}
            outerRadius={95}
            paddingAngle={3}
          >
            {data.map((entry, index) => (
              <Cell
                key={entry.name}
                fill={colors[index % colors.length]}
              />
            ))}
          </Pie>

          <Tooltip
            contentStyle={{
              background: "#0d141a",
              border: "1px solid rgba(255,255,255,.08)",
              borderRadius: "14px",
            }}
            formatter={(value) => formatCurrency(value)}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CategoryChart;