import { useMemo } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import Topbar from "../components/Topbar";
import CategoryChart from "../components/CategoryChart";
import { formatCurrency } from "../utils/formatCurrency";

function Analytics({ transactions, totals }) {
  const categoryData = useMemo(() => {
    const result = {};

    transactions
      .filter(
        (transaction) =>
          transaction.type === "expense"
      )
      .forEach((transaction) => {
        result[transaction.category] =
          (result[transaction.category] || 0) +
          transaction.amount;
      });

    return Object.entries(result).map(
      ([name, value]) => ({
        name,
        value,
      })
    );
  }, [transactions]);

  const comparison = [
    {
      name: "Income",
      value: totals.income,
    },
    {
      name: "Expenses",
      value: totals.expenses,
    },
    {
      name: "Savings",
      value: totals.savings,
    },
  ];

  const biggestExpense = [...transactions]
    .filter(
      (transaction) =>
        transaction.type === "expense"
    )
    .sort((a, b) => b.amount - a.amount)[0];

  return (
    <div className="mx-auto max-w-[1500px] px-5 py-8 pb-28 md:px-8 md:pb-8 xl:px-14">
      <Topbar
        title="Analytics"
        subtitle="Understand where your money goes and how much you save."
      />

      <div className="grid gap-5 xl:grid-cols-2">
        <section className="rounded-[26px] border border-white/[0.06] bg-[#0c1218] p-6">
          <p className="text-[10px] font-black tracking-[0.18em] text-emerald-400">
            FINANCIAL OVERVIEW
          </p>

          <h3 className="mt-2 text-lg font-bold">
            Income vs Expenses
          </h3>

          <div className="mt-7 h-[330px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={comparison}>
                <CartesianGrid
                  stroke="rgba(255,255,255,.04)"
                  vertical={false}
                />

                <XAxis
                  dataKey="name"
                  stroke="#475569"
                  axisLine={false}
                  tickLine={false}
                />

                <YAxis
                  stroke="#475569"
                  axisLine={false}
                  tickLine={false}
                />

                <Tooltip
                  formatter={(value) =>
                    formatCurrency(value)
                  }
                  contentStyle={{
                    background: "#0d141a",
                    border:
                      "1px solid rgba(255,255,255,.08)",
                    borderRadius: 14,
                  }}
                />

                <Bar
                  dataKey="value"
                  fill="#6ee7b7"
                  radius={[10, 10, 2, 2]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="rounded-[26px] border border-white/[0.06] bg-[#0c1218] p-6">
          <p className="text-[10px] font-black tracking-[0.18em] text-emerald-400">
            CATEGORIES
          </p>

          <h3 className="mt-2 text-lg font-bold">
            Expense Distribution
          </h3>

          <CategoryChart data={categoryData} />

          <div className="mt-4 space-y-3">
            {categoryData.map((category) => (
              <div
                key={category.name}
                className="flex justify-between text-xs"
              >
                <span className="text-slate-500">
                  {category.name}
                </span>

                <strong>
                  {formatCurrency(category.value)}
                </strong>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="mt-5 grid gap-4 md:grid-cols-3">
        <Metric
          title="Savings rate"
          value={
            totals.income
              ? `${(
                  (totals.savings / totals.income) *
                  100
                ).toFixed(1)}%`
              : "0%"
          }
        />

        <Metric
          title="Transactions"
          value={transactions.length}
        />

        <Metric
          title="Largest expense"
          value={
            biggestExpense
              ? formatCurrency(biggestExpense.amount)
              : "€0.00"
          }
        />
      </section>
    </div>
  );
}

function Metric({ title, value }) {
  return (
    <div className="rounded-[24px] border border-white/[0.06] bg-[#0c1218] p-6">
      <p className="text-xs text-slate-600">
        {title}
      </p>

      <strong className="mt-2 block text-2xl">
        {value}
      </strong>
    </div>
  );
}

export default Analytics;