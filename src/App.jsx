import { useMemo, useState } from "react";
import Sidebar from "./components/Sidebar";
import TransactionModal from "./components/TransactionModal";
import ConfirmModal from "./components/ConfirmModal";
import Toast from "./components/Toast";

import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Analytics from "./pages/Analytics";
import Budgets from "./pages/Budgets";

import useLocalStorage from "./hooks/useLocalStorage";
import initialTransactions from "./data/initialTransactions";

function App() {
  const [activePage, setActivePage] = useState("dashboard");

  const [transactions, setTransactions] = useLocalStorage(
    "expenseflow-transactions",
    initialTransactions
  );

  const [monthlyBudget, setMonthlyBudget] = useLocalStorage(
    "expenseflow-budget",
    4500
  );

  const [transactionModal, setTransactionModal] = useState({
    open: false,
    transaction: null,
  });

  const [deleteModal, setDeleteModal] = useState({
    open: false,
    id: null,
  });

  const [toast, setToast] = useState(null);

  const totals = useMemo(() => {
    const income = transactions
      .filter((transaction) => transaction.type === "income")
      .reduce((sum, transaction) => sum + Number(transaction.amount), 0);

    const expenses = transactions
      .filter((transaction) => transaction.type === "expense")
      .reduce((sum, transaction) => sum + Number(transaction.amount), 0);

    return {
      income,
      expenses,
      balance: income - expenses,
      savings: Math.max(income - expenses, 0),
    };
  }, [transactions]);

  function showToast(message, type = "success") {
    setToast({ message, type });

    setTimeout(() => {
      setToast(null);
    }, 2800);
  }

  function openAddTransaction() {
    setTransactionModal({
      open: true,
      transaction: null,
    });
  }

  function openEditTransaction(transaction) {
    setTransactionModal({
      open: true,
      transaction,
    });
  }

  function closeTransactionModal() {
    setTransactionModal({
      open: false,
      transaction: null,
    });
  }

  function saveTransaction(transaction) {
    const isEditing = Boolean(transactionModal.transaction);

    if (isEditing) {
      setTransactions((current) =>
        current.map((item) =>
          item.id === transaction.id ? transaction : item
        )
      );

      showToast("Transaction updated.");
    } else {
      setTransactions((current) => [transaction, ...current]);
      showToast("Transaction added.");
    }

    closeTransactionModal();
  }

  function requestDelete(id) {
    setDeleteModal({
      open: true,
      id,
    });
  }

  function confirmDelete() {
    setTransactions((current) =>
      current.filter((transaction) => transaction.id !== deleteModal.id)
    );

    setDeleteModal({
      open: false,
      id: null,
    });

    showToast("Transaction deleted.", "danger");
  }

  function cancelDelete() {
    setDeleteModal({
      open: false,
      id: null,
    });
  }

  function renderPage() {
    if (activePage === "transactions") {
      return (
        <Transactions
          transactions={transactions}
          totals={totals}
          onAdd={openAddTransaction}
          onEdit={openEditTransaction}
          onDelete={requestDelete}
        />
      );
    }

    if (activePage === "analytics") {
      return (
        <Analytics
          transactions={transactions}
          totals={totals}
        />
      );
    }

    if (activePage === "budgets") {
      return (
        <Budgets
          transactions={transactions}
          monthlyBudget={monthlyBudget}
          setMonthlyBudget={setMonthlyBudget}
          onSaved={() => showToast("Budget updated.")}
        />
      );
    }

    return (
      <Dashboard
        transactions={transactions}
        totals={totals}
        monthlyBudget={monthlyBudget}
        onAdd={openAddTransaction}
        onEdit={openEditTransaction}
        onDelete={requestDelete}
        setActivePage={setActivePage}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#070b0f] text-white">
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
      />

      <main className="min-h-screen md:ml-[86px] xl:ml-[270px]">
        {renderPage()}
      </main>

      <TransactionModal
        open={transactionModal.open}
        transaction={transactionModal.transaction}
        onClose={closeTransactionModal}
        onSave={saveTransaction}
      />

      <ConfirmModal
        open={deleteModal.open}
        title="Delete transaction?"
        message="This transaction will be permanently removed from your financial history."
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />

      <Toast toast={toast} />
    </div>
  );
}

export default App;