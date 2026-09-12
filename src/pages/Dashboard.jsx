import { useMemo, useState } from "react";
import { motion } from "framer-motion";

import {
  Eye,
  EyeOff,
  Plus,
  TrendingDown,
  TrendingUp,
  PiggyBank,
  Wallet,
} from "lucide-react";

import Topbar from "../components/Topbar";
import ExpenseChart from "../components/ExpenseChart";
import TransactionTable from "../components/TransactionTable";

import { formatCurrency } from "../utils/formatCurrency";

import {
  buildMonthlyExpenseData,
  getCurrentMonthExpenses,
} from "../utils/finance";

function Dashboard({
  transactions,
  totals,
  monthlyBudget,
  onAdd,
  onEdit,
  onDelete,
  setActivePage,
}) {
  const [balanceVisible, setBalanceVisible] =
    useState(true);

  const monthlyExpenses = useMemo(
    () =>
      getCurrentMonthExpenses(
        transactions
      ),
    [transactions]
  );

  const chartData = useMemo(
    () =>
      buildMonthlyExpenseData(
        transactions,
        6
      ),
    [transactions]
  );

  const expensePercentage =
    monthlyBudget > 0
      ? Math.min(
          (monthlyExpenses /
            monthlyBudget) *
            100,
          100
        )
      : 0;

  const recent = [
    ...transactions,
  ]
    .sort(
      (a, b) =>
        new Date(b.date) -
        new Date(a.date)
    )
    .slice(0, 6);

  const stats = [
    {
      label: "Total Income",
      value: totals.income,
      icon: TrendingUp,
      className:
        "text-emerald-300 bg-emerald-400/10",
    },

    {
      label: "Total Expenses",
      value: totals.expenses,
      icon: TrendingDown,
      className:
        "text-rose-400 bg-rose-400/10",
    },

    {
      label: "Total Savings",
      value: totals.savings,
      icon: PiggyBank,
      className:
        "text-sky-400 bg-sky-400/10",
    },
  ];

  return (
    <div className="mx-auto max-w-[1600px] px-5 py-8 pb-28 md:px-8 md:pb-8 xl:px-14">
      <Topbar
        dashboard
        subtitle="A real-time overview of your financial activity."
      />

      <section className="relative overflow-hidden rounded-[30px] border border-emerald-400/10 bg-gradient-to-br from-emerald-400/[0.10] to-[#0b1217] p-7 md:p-9">
        <div className="absolute -right-10 -top-20 h-60 w-60 rounded-full bg-emerald-400/10 blur-3xl" />

        <div className="relative flex flex-col justify-between gap-7 md:flex-row">
          <div>
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <Wallet size={17} />
              Total Balance
            </div>

            <div className="mt-4 flex items-center gap-4">
              <h2 className="text-4xl font-black tracking-tight md:text-6xl">
                {balanceVisible
                  ? formatCurrency(
                      totals.balance
                    )
                  : "••••••••"}
              </h2>

              <button
                type="button"
                onClick={() =>
                  setBalanceVisible(
                    (value) => !value
                  )
                }
                className="text-slate-600 transition hover:text-white"
              >
                {balanceVisible ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>

            <p className="mt-4 text-xs text-emerald-300">
              ● Live financial balance
            </p>
          </div>

          <button
            type="button"
            onClick={onAdd}
            className="flex h-fit items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-300 to-emerald-500 px-5 py-4 text-sm font-black text-[#06100b] shadow-lg shadow-emerald-500/10 transition hover:scale-[1.02] hover:brightness-110"
          >
            <Plus size={18} />
            Add transaction
          </button>
        </div>
      </section>

      <section className="mt-5 grid gap-4 lg:grid-cols-3">
        {stats.map(
          (stat, index) => {
            const Icon = stat.icon;

            return (
              <motion.article
                key={stat.label}
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay:
                    index * 0.07,
                }}
                whileHover={{
                  y: -4,
                }}
                className="rounded-[24px] border border-white/[0.06] bg-[#0c1218] p-6 transition hover:border-white/10"
              >
                <div
                  className={`grid h-11 w-11 place-items-center rounded-2xl ${stat.className}`}
                >
                  <Icon size={20} />
                </div>

                <p className="mt-5 text-xs text-slate-500">
                  {stat.label}
                </p>

                <h3 className="mt-2 text-2xl font-black">
                  {formatCurrency(
                    stat.value
                  )}
                </h3>

                <p className="mt-3 text-[11px] text-slate-600">
                  Calculated from
                  your transactions
                </p>
              </motion.article>
            );
          }
        )}
      </section>

      <section className="mt-5 grid gap-5 xl:grid-cols-[1.7fr_.7fr]">
        <article className="rounded-[26px] border border-white/[0.06] bg-[#0c1218] p-6">
          <p className="text-[10px] font-black tracking-[0.18em] text-emerald-400">
            CASH FLOW
          </p>

          <h3 className="mt-2 text-lg font-bold">
            Monthly Spending
          </h3>

          <p className="mt-1 text-xs text-slate-600">
            Based on your real transactions
          </p>

          <div className="mt-6">
            <ExpenseChart
              data={chartData}
            />
          </div>
        </article>

        <article className="rounded-[26px] border border-white/[0.06] bg-[#0c1218] p-6">
          <p className="text-[10px] font-black tracking-[0.18em] text-emerald-400">
            MONTHLY LIMIT
          </p>

          <h3 className="mt-2 text-lg font-bold">
            Budget
          </h3>

          <div className="mx-auto mt-10 grid h-40 w-40 place-items-center rounded-full bg-[#151f20]">
            <div
              className="grid h-full w-full place-items-center rounded-full"
              style={{
                background: `conic-gradient(
                  #6ee7b7 ${
                    expensePercentage *
                    3.6
                  }deg,
                  #172123 ${
                    expensePercentage *
                    3.6
                  }deg
                )`,
              }}
            >
              <div className="grid h-[120px] w-[120px] place-items-center rounded-full bg-[#0c1218] text-center">
                <div>
                  <strong className="text-2xl">
                    {expensePercentage.toFixed(
                      1
                    )}
                    %
                  </strong>

                  <p className="text-[10px] text-slate-600">
                    used
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-between text-xs">
            <div>
              <p className="text-slate-600">
                This month
              </p>

              <strong>
                {formatCurrency(
                  monthlyExpenses
                )}
              </strong>
            </div>

            <div className="text-right">
              <p className="text-slate-600">
                Remaining
              </p>

              <strong>
                {formatCurrency(
                  Math.max(
                    monthlyBudget -
                      monthlyExpenses,
                    0
                  )
                )}
              </strong>
            </div>
          </div>

          <button
            type="button"
            onClick={() =>
              setActivePage(
                "budgets"
              )
            }
            className="mt-7 w-full rounded-xl border border-white/[0.06] bg-white/[0.03] py-3 text-xs font-bold text-slate-400 transition hover:border-emerald-400/20 hover:text-white"
          >
            Manage budget
          </button>
        </article>
      </section>

      <section className="mt-5 rounded-[26px] border border-white/[0.06] bg-[#0c1218] p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] font-black tracking-[0.18em] text-emerald-400">
              LATEST ACTIVITY
            </p>

            <h3 className="mt-2 text-lg font-bold">
              Recent Transactions
            </h3>
          </div>

          <button
            type="button"
            onClick={() =>
              setActivePage(
                "transactions"
              )
            }
            className="text-xs font-bold text-emerald-300 transition hover:text-emerald-200"
          >
            View all →
          </button>
        </div>

        <div className="mt-4">
          <TransactionTable
            transactions={recent}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </div>
      </section>

      <footer className="mt-8 flex flex-col justify-between gap-2 text-[10px] text-slate-700 sm:flex-row">
        <strong>
          ExpenseFlow Pro
        </strong>

        <span>
          Designed & built by
          Alexandru Filip • Frontend
          Developer
        </span>
      </footer>
    </div>
  );
}

export default Dashboard;