import {
  Pencil,
  Trash2,
} from "lucide-react";

import { formatCurrency } from "../utils/formatCurrency";

function TransactionTable({
  transactions,
  onEdit,
  onDelete,
}) {
  if (!transactions.length) {
    return (
      <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.02] py-16 text-center">
        <div className="text-3xl">
          🔎
        </div>

        <h3 className="mt-4 font-bold">
          No transactions found
        </h3>

        <p className="mt-2 text-xs text-slate-600">
          Try changing your search or filters.
        </p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-white/[0.05]">
      {transactions.map(
        (transaction) => (
          <div
            key={transaction.id}
            className="group flex items-center justify-between gap-4 rounded-xl px-2 py-4 transition hover:bg-white/[0.018]"
          >
            <div className="flex min-w-0 items-center gap-4">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-white/[0.06] bg-white/[0.03] text-lg">
                {transaction.icon}
              </div>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="truncate text-sm font-bold">
                    {transaction.title}
                  </p>

                  <span
                    className={`rounded-full px-2 py-1 text-[9px] font-bold uppercase tracking-wider ${
                      transaction.type ===
                      "income"
                        ? "bg-emerald-400/10 text-emerald-300"
                        : "bg-slate-400/5 text-slate-500"
                    }`}
                  >
                    {transaction.type}
                  </span>
                </div>

                <p className="mt-1 text-xs text-slate-600">
                  {transaction.category} •{" "}
                  {transaction.date}
                </p>

                {transaction.note && (
                  <p className="mt-1 truncate text-[11px] text-slate-700">
                    {transaction.note}
                  </p>
                )}
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-2 md:gap-3">
              <strong
                className={`whitespace-nowrap text-sm ${
                  transaction.type ===
                  "income"
                    ? "text-emerald-300"
                    : "text-slate-200"
                }`}
              >
                {transaction.type ===
                "income"
                  ? "+"
                  : "-"}
                {formatCurrency(
                  transaction.amount
                )}
              </strong>

              <button
                type="button"
                title="Edit transaction"
                onClick={() =>
                  onEdit(transaction)
                }
                className="grid h-9 w-9 place-items-center rounded-xl text-slate-600 opacity-100 transition hover:bg-sky-400/10 hover:text-sky-400 md:opacity-0 md:group-hover:opacity-100"
              >
                <Pencil size={15} />
              </button>

              <button
                type="button"
                title="Delete transaction"
                onClick={() =>
                  onDelete(transaction.id)
                }
                className="grid h-9 w-9 place-items-center rounded-xl text-slate-600 opacity-100 transition hover:bg-rose-400/10 hover:text-rose-400 md:opacity-0 md:group-hover:opacity-100"
              >
                <Trash2 size={15} />
              </button>
            </div>
          </div>
        )
      )}
    </div>
  );
}

export default TransactionTable;