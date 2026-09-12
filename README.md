# ExpenseFlow Pro

A modern and responsive personal finance dashboard built with React.

ExpenseFlow Pro helps users track income and expenses, monitor monthly budgets, analyze spending patterns, and manage transactions through a clean financial dashboard.

## Live Demo

[View ExpenseFlow Pro](https://blaualex97-commits.github.io/expenseflow-pro/)

## Features

- Financial dashboard with balance, income, expenses and savings
- Add, edit and delete transactions
- Transaction search and filtering
- Sort transactions by different criteria
- Income and expense tracking
- Monthly budget management
- Budget progress and remaining balance
- Financial analytics and interactive charts
- Spending breakdown by category
- Monthly financial overview
- CSV transaction export
- LocalStorage data persistence
- Notification dropdown
- User profile menu
- Confirmation modal for deleting transactions
- Toast notifications
- Responsive sidebar and mobile navigation
- Fully responsive design for desktop, tablet and mobile

## Built With

- React
- JavaScript
- Vite
- Tailwind CSS
- Recharts
- Lucide React
- LocalStorage

## Project Structure

```text
src/
├── components/
│   ├── CategoryChart.jsx
│   ├── ConfirmModal.jsx
│   ├── ExpenseChart.jsx
│   ├── Sidebar.jsx
│   ├── Toast.jsx
│   ├── Topbar.jsx
│   ├── TransactionModal.jsx
│   └── TransactionTable.jsx
│
├── data/
│   └── initialTransactions.js
│
├── hooks/
│   └── useLocalStorage.js
│
├── pages/
│   ├── Analytics.jsx
│   ├── Budgets.jsx
│   ├── Dashboard.jsx
│   └── Transactions.jsx
│
├── utils/
│   ├── categories.js
│   ├── finance.js
│   └── formatCurrency.js
│
├── App.jsx
├── index.css
└── main.jsx
```

## Main Pages

### Dashboard

Provides an overview of the user's financial situation, including total balance, income, expenses, savings, recent transactions and monthly activity.

### Transactions

Allows users to add, edit, delete, search, filter and sort financial transactions. Transaction data can also be exported as a CSV file.

### Analytics

Displays financial data through interactive charts, including monthly income and expenses and spending by category.

### Budgets

Allows users to define a monthly budget and monitor spending progress and remaining funds.

## Data Persistence

ExpenseFlow Pro uses browser LocalStorage to persist financial data.

This means transactions and budget information remain available after refreshing or reopening the application without requiring a backend.

## Responsive Design

The interface adapts to different screen sizes:

- Full sidebar on large desktop screens
- Compact navigation on smaller desktop and tablet screens
- Bottom navigation on mobile devices
- Responsive cards, charts, tables and forms
- Short viewport handling to prevent sidebar content overlap

## Getting Started

Clone the repository:

```bash
git clone https://github.com/blaualex97-commits/expenseflow-pro.git
```

Enter the project directory:

```bash
cd expenseflow-pro
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

## Deployment

The project is deployed using GitHub Pages.

Live version:

[https://blaualex97-commits.github.io/expenseflow-pro/](https://blaualex97-commits.github.io/expenseflow-pro/)

## Author

**Alexandru Filip**

Frontend Developer

GitHub: [blaualex97-commits](https://github.com/blaualex97-commits)

---

Designed and developed as a frontend portfolio project.