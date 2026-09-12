import { useMemo, useState } from "react";

import {
  CheckCircle2,
  Target,
  AlertTriangle,
} from "lucide-react";

import Topbar from "../components/Topbar";

import { formatCurrency } from "../utils/formatCurrency";

import { getCurrentMonthExpenses } from "../utils/finance";

function Budgets({
  transactions,
  monthlyBudget,
  setMonthlyBudget,
  onSaved,
}) {
  const [budgetInput, setBudgetInput] =
    useState(monthlyBudget);

  const expenses = useMemo(
    () =>
      getCurrentMonthExpenses(
        transactions
      ),
    [transactions]
  );

  const percentage =
    monthlyBudget > 0
      ? Math.min(
          (expenses /
            monthlyBudget) *
            100,
          100
        )
      : 0;

  const remaining = Math.max(
    monthlyBudget - expenses,
    0
  );

  function saveBudget(e) {
    e.preventDefault();

    const number =
      Number(budgetInput);

    if (
      !Number.isFinite(number) ||
      number <= 0
    ) {
      return;
    }

    setMonthlyBudget(number);

    onSaved();
  }

  const danger =
    percentage >= 90;

  return (
    <div className="mx-auto max-w-[1300px] px-5 py-8 pb-28 md:px-8 md:pb-8 xl:px-14">
      <Topbar
        title="Budgets"
        subtitle="Control your monthly spending before your spending controls you."
      />

      <div className="grid gap-5 xl:grid-cols-[1fr_.8fr]">
        <section className="rounded-[28px] border border-white/[0.06] bg-[#0c1218] p-7">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-400/10 text-emerald-300">
            <Target size={22} />
          </div>

          <p className="mt-6 text-[10px] font-black tracking-[0.18em] text-emerald-400">
            MONTHLY TARGET
          </p>

          <h2 className="mt-2 text-2xl font-black">
            Monthly spending limit
          </h2>

          <p className="mt-2 max-w-lg text-sm leading-6 text-slate-500">
            Define how much you want
            to spend during the
            current month.
          </p>

          <form
            onSubmit={saveBudget}
            className="mt-7"
          >
            <label className="form-label">
              Monthly budget (€)

              <input
                className="premium-input mt-2"
                type="number"
                min="1"
                step="10"
                value={budgetInput}
                onChange={(e) =>
                  setBudgetInput(
                    e.target.value
                  )
                }
              />
            </label>

            <button className="mt-5 w-full rounded-2xl bg-gradient-to-r from-emerald-300 to-emerald-500 py-4 text-sm font-black text-[#06100b] transition hover:brightness-110">
              Save budget
            </button>
          </form>
        </section>

        <section className="rounded-[28px] border border-white/[0.06] bg-[#0c1218] p-7">
          <p className="text-xs text-slate-500">
            Current month progress
          </p>

          <div className="mt-2 flex items-end gap-3">
            <strong className="text-4xl">
              {percentage.toFixed(
                1
              )}
              %
            </strong>

            <span className="pb-1 text-xs text-slate-600">
              of budget
            </span>
          </div>

          <div className="mt-7 h-3 overflow-hidden rounded-full bg-white/[0.05]">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                danger
                  ? "bg-gradient-to-r from-orange-400 to-rose-400"
                  : "bg-gradient-to-r from-emerald-300 to-emerald-500"
              }`}
              style={{
                width: `${percentage}%`,
              }}
            />
          </div>

          <div className="mt-7 grid grid-cols-2 gap-4">
            <BudgetMetric
              title="Spent this month"
              value={formatCurrency(
                expenses
              )}
            />

            <BudgetMetric
              title="Remaining"
              value={formatCurrency(
                remaining
              )}
            />
          </div>

          <div
            className={`mt-7 flex gap-3 rounded-2xl p-4 text-sm ${
              danger
                ? "bg-rose-400/[0.07] text-rose-300"
                : "bg-emerald-400/[0.06] text-emerald-200"
            }`}
          >
            {danger ? (
              <AlertTriangle
                className="shrink-0"
                size={19}
              />
            ) : (
              <CheckCircle2
                className="shrink-0"
                size={19}
              />
            )}

            {percentage >= 100
              ? "You reached your monthly spending limit."
              : percentage >= 90
                ? "You're close to your monthly spending limit."
                : "You're currently inside your monthly spending limit."}
          </div>
        </section>
      </div>

      <p className="mt-8 text-center text-[10px] tracking-[0.12em] text-slate-800">
        EXPENSEFLOW PRO • ALEXANDRU FILIP
      </p>
    </div>
  );
}

function BudgetMetric({
  title,
  value,
}) {
  return (
    <div className="rounded-2xl bg-white/[0.03] p-4">
      <p className="text-xs text-slate-600">
        {title}
      </p>

      <strong className="mt-2 block">
        {value}
      </strong>
    </div>
  );
}

export default Budgets;