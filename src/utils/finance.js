export function getMonthKey(dateString) {
  if (!dateString) return "";

  const date = new Date(`${dateString}T12:00:00`);

  if (Number.isNaN(date.getTime())) return "";

  return `${date.getFullYear()}-${String(
    date.getMonth() + 1
  ).padStart(2, "0")}`;
}

export function getCurrentMonthExpenses(transactions) {
  const now = new Date();

  const currentMonth = `${now.getFullYear()}-${String(
    now.getMonth() + 1
  ).padStart(2, "0")}`;

  return transactions
    .filter(
      (transaction) =>
        transaction.type === "expense" &&
        getMonthKey(transaction.date) === currentMonth
    )
    .reduce(
      (sum, transaction) =>
        sum + Number(transaction.amount),
      0
    );
}

export function buildMonthlyExpenseData(
  transactions,
  numberOfMonths = 6
) {
  const months = [];
  const now = new Date();

  for (let i = numberOfMonths - 1; i >= 0; i--) {
    const date = new Date(
      now.getFullYear(),
      now.getMonth() - i,
      1
    );

    const key = `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}`;

    months.push({
      key,
      month: date.toLocaleDateString("en-US", {
        month: "short",
      }),
      expense: 0,
    });
  }

  transactions
    .filter((transaction) => transaction.type === "expense")
    .forEach((transaction) => {
      const key = getMonthKey(transaction.date);

      const targetMonth = months.find(
        (month) => month.key === key
      );

      if (targetMonth) {
        targetMonth.expense += Number(transaction.amount);
      }
    });

  return months;
}