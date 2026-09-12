import { useMemo, useState } from "react";
import {
  Download,
  Plus,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";

import Topbar from "../components/Topbar";
import TransactionTable from "../components/TransactionTable";
import { formatCurrency } from "../utils/formatCurrency";

function Transactions({
  transactions,
  totals,
  onAdd,
  onEdit,
  onDelete,
}) {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("all");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("newest");

  const categories = useMemo(() => {
    return [
      ...new Set(
        transactions.map(
          (transaction) => transaction.category
        )
      ),
    ].sort();
  }, [transactions]);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();

    const results = transactions.filter(
      (transaction) => {
        const searchableText = [
          transaction.title,
          transaction.category,
          transaction.note,
          transaction.date,
          transaction.type,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        const searchMatch =
          query === "" ||
          searchableText.includes(query);

        const typeMatch =
          type === "all" ||
          transaction.type === type;

        const categoryMatch =
          category === "all" ||
          transaction.category === category;

        return (
          searchMatch &&
          typeMatch &&
          categoryMatch
        );
      }
    );

    return [...results].sort((a, b) => {
      if (sort === "oldest") {
        return (
          new Date(a.date) -
          new Date(b.date)
        );
      }

      if (sort === "highest") {
        return (
          Number(b.amount) -
          Number(a.amount)
        );
      }

      if (sort === "lowest") {
        return (
          Number(a.amount) -
          Number(b.amount)
        );
      }

      return (
        new Date(b.date) -
        new Date(a.date)
      );
    });
  }, [
    transactions,
    search,
    type,
    category,
    sort,
  ]);

  const filtersActive =
    search ||
    type !== "all" ||
    category !== "all" ||
    sort !== "newest";

  function clearFilters() {
    setSearch("");
    setType("all");
    setCategory("all");
    setSort("newest");
  }

  function exportCSV() {
    if (!filtered.length) return;

    const rows = [
      [
        "Title",
        "Type",
        "Category",
        "Amount",
        "Date",
        "Note",
      ],

      ...filtered.map((transaction) => [
        transaction.title,
        transaction.type,
        transaction.category,
        transaction.amount,
        transaction.date,
        transaction.note || "",
      ]),
    ];

    const csv = rows
      .map((row) =>
        row
          .map((item) =>
            `"${String(item).replaceAll(
              '"',
              '""'
            )}"`
          )
          .join(",")
      )
      .join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8",
    });

    const url =
      URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;
    link.download =
      "expenseflow-transactions.csv";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  }

  return (
    <div className="mx-auto max-w-[1500px] px-5 py-8 pb-28 md:px-8 md:pb-8 xl:px-14">
      <Topbar
        title="Transactions"
        subtitle="Search, organize and manage every financial movement."
      />

      <section className="mb-5 grid gap-4 md:grid-cols-3">
        <Summary
          label="Current Balance"
          value={totals.balance}
        />

        <Summary
          label="Total Income"
          value={totals.income}
          accent="income"
        />

        <Summary
          label="Total Expenses"
          value={totals.expenses}
          accent="expense"
        />
      </section>

      <section className="rounded-[28px] border border-white/[0.06] bg-[#0c1218] p-5 md:p-7">
        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <p className="text-[10px] font-black tracking-[0.18em] text-emerald-400">
              ACTIVITY
            </p>

            <h2 className="mt-2 text-xl font-black">
              Financial History
            </h2>
          </div>

          <span className="rounded-xl bg-white/[0.04] px-3 py-2 text-xs text-slate-500">
            {filtered.length}{" "}
            {filtered.length === 1
              ? "result"
              : "results"}
          </span>
        </div>

        <div className="grid gap-3 xl:grid-cols-[minmax(280px,1.5fr)_180px_210px_170px_auto_auto]">
          <div className="relative">
            <Search
              size={18}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
            />

            <input
              type="search"
              className="premium-input !pl-12"
              placeholder="Search title, category, note..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 transition hover:text-white"
              >
                <X size={16} />
              </button>
            )}
          </div>

          <select
            className="premium-input"
            value={type}
            onChange={(e) =>
              setType(e.target.value)
            }
          >
            <option value="all">
              All types
            </option>

            <option value="income">
              Income
            </option>

            <option value="expense">
              Expenses
            </option>
          </select>

          <select
            className="premium-input"
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
          >
            <option value="all">
              All categories
            </option>

            {categories.map((item) => (
              <option
                value={item}
                key={item}
              >
                {item}
              </option>
            ))}
          </select>

          <select
            className="premium-input"
            value={sort}
            onChange={(e) =>
              setSort(e.target.value)
            }
          >
            <option value="newest">
              Newest first
            </option>

            <option value="oldest">
              Oldest first
            </option>

            <option value="highest">
              Highest amount
            </option>

            <option value="lowest">
              Lowest amount
            </option>
          </select>

          {filtersActive ? (
            <button
              type="button"
              onClick={clearFilters}
              className="flex items-center justify-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-xs font-bold text-slate-400 transition hover:border-rose-400/20 hover:bg-rose-400/5 hover:text-rose-300"
            >
              <SlidersHorizontal size={15} />
              Reset
            </button>
          ) : (
            <button
              type="button"
              onClick={exportCSV}
              className="flex items-center justify-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-xs font-bold text-slate-400 transition hover:border-emerald-400/20 hover:text-white"
            >
              <Download size={15} />
              CSV
            </button>
          )}

          <button
            type="button"
            onClick={onAdd}
            className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-300 to-emerald-500 px-5 py-3 text-xs font-black text-[#06100b] transition hover:brightness-110"
          >
            <Plus size={16} />
            Add
          </button>
        </div>

        {filtersActive && (
          <div className="mt-3 flex justify-end">
            <button
              onClick={exportCSV}
              className="flex items-center gap-2 text-xs text-slate-500 transition hover:text-emerald-300"
            >
              <Download size={14} />
              Export filtered results
            </button>
          </div>
        )}

        <div className="mt-6">
          <TransactionTable
            transactions={filtered}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </div>
      </section>

      <p className="mt-8 text-center text-[10px] tracking-[0.12em] text-slate-800">
        EXPENSEFLOW PRO • DESIGNED & BUILT BY ALEXANDRU FILIP
      </p>
    </div>
  );
}

function Summary({
  label,
  value,
  accent,
}) {
  return (
    <div className="rounded-[22px] border border-white/[0.06] bg-[#0c1218] p-5">
      <p className="text-xs text-slate-600">
        {label}
      </p>

      <strong
        className={`mt-2 block text-xl ${
          accent === "income"
            ? "text-emerald-300"
            : accent === "expense"
              ? "text-rose-300"
              : ""
        }`}
      >
        {formatCurrency(value)}
      </strong>
    </div>
  );
}

export default Transactions;