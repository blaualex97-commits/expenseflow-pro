import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

import { categories, getCategoryIcon } from "../utils/categories";

function TransactionModal({
  open,
  transaction,
  onClose,
  onSave,
}) {
  const [form, setForm] = useState({
    type: "expense",
    title: "",
    amount: "",
    category: "Food",
    date: new Date().toISOString().slice(0, 10),
    note: "",
  });

  useEffect(() => {
    if (transaction) {
      setForm({
        type: transaction.type,
        title: transaction.title,
        amount: transaction.amount,
        category:
          transaction.type === "income"
            ? "Income"
            : transaction.category,
        date: transaction.date,
        note: transaction.note || "",
      });
    } else {
      setForm({
        type: "expense",
        title: "",
        amount: "",
        category: "Food",
        date: new Date().toISOString().slice(0, 10),
        note: "",
      });
    }
  }, [transaction, open]);

  function update(field, value) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!form.title.trim()) return;
    if (!form.amount || Number(form.amount) <= 0) return;

    const category =
      form.type === "income" ? "Income" : form.category;

    onSave({
      id: transaction?.id || Date.now(),
      title: form.title.trim(),
      type: form.type,
      amount: Number(form.amount),
      category,
      date: form.date,
      note: form.note.trim(),
      icon: getCategoryIcon(category, form.type),
    });
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] grid place-items-center overflow-y-auto bg-black/80 p-5 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="w-full max-w-xl rounded-[28px] border border-emerald-400/10 bg-[#0c1218] p-6 shadow-2xl md:p-8"
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-7 flex justify-between">
              <div>
                <p className="text-[10px] font-black tracking-[0.2em] text-emerald-400">
                  {transaction ? "EDIT ENTRY" : "NEW ENTRY"}
                </p>

                <h2 className="mt-2 text-2xl font-black">
                  {transaction
                    ? "Edit Transaction"
                    : "Add Transaction"}
                </h2>
              </div>

              <button
                onClick={onClose}
                className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 text-slate-500 transition hover:bg-white/5 hover:text-white"
              >
                <X size={19} />
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="grid gap-5"
            >
              <div className="grid grid-cols-2 rounded-2xl bg-black/30 p-1">
                <button
                  type="button"
                  onClick={() => update("type", "expense")}
                  className={`rounded-xl py-3 text-sm font-bold transition ${
                    form.type === "expense"
                      ? "bg-rose-500/10 text-rose-400"
                      : "text-slate-500"
                  }`}
                >
                  Expense
                </button>

                <button
                  type="button"
                  onClick={() => update("type", "income")}
                  className={`rounded-xl py-3 text-sm font-bold transition ${
                    form.type === "income"
                      ? "bg-emerald-400/10 text-emerald-300"
                      : "text-slate-500"
                  }`}
                >
                  Income
                </button>
              </div>

              <label className="form-label">
                Title
                <input
                  className="premium-input"
                  placeholder="e.g. Groceries"
                  value={form.title}
                  onChange={(e) =>
                    update("title", e.target.value)
                  }
                />
              </label>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="form-label">
                  Amount
                  <input
                    className="premium-input"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    value={form.amount}
                    onChange={(e) =>
                      update("amount", e.target.value)
                    }
                  />
                </label>

                <label className="form-label">
                  Date
                  <input
                    className="premium-input"
                    type="date"
                    value={form.date}
                    onChange={(e) =>
                      update("date", e.target.value)
                    }
                  />
                </label>
              </div>

              {form.type === "expense" && (
                <label className="form-label">
                  Category
                  <select
                    className="premium-input"
                    value={form.category}
                    onChange={(e) =>
                      update("category", e.target.value)
                    }
                  >
                    {categories.map((category) => (
                      <option
                        key={category.name}
                        value={category.name}
                      >
                        {category.icon} {category.name}
                      </option>
                    ))}
                  </select>
                </label>
              )}

              <label className="form-label">
                Note
                <textarea
                  className="premium-input min-h-[90px] resize-none"
                  placeholder="Optional note..."
                  value={form.note}
                  onChange={(e) =>
                    update("note", e.target.value)
                  }
                />
              </label>

              <button className="mt-2 rounded-2xl bg-gradient-to-r from-emerald-300 to-emerald-500 px-5 py-4 text-sm font-black text-[#06100b] transition hover:brightness-110">
                {transaction
                  ? "Save changes"
                  : "Add transaction"}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default TransactionModal;