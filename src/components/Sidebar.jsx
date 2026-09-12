import {
  ArrowLeftRight,
  ChartNoAxesCombined,
  LayoutDashboard,
  Sparkles,
  WalletCards,
} from "lucide-react";

const pages = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    id: "transactions",
    label: "Transactions",
    icon: ArrowLeftRight,
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: ChartNoAxesCombined,
  },
  {
    id: "budgets",
    label: "Budgets",
    icon: WalletCards,
  },
];

function Sidebar({
  activePage,
  setActivePage,
}) {
  return (
    <>
      {/* DESKTOP / TABLET SIDEBAR */}
      <aside
        className="
          expense-sidebar
          fixed left-0 top-0 z-50 hidden h-dvh
          w-[86px]
          flex-col
          border-r border-white/[0.07]
          bg-[#080d12]/95
          backdrop-blur-xl
          md:flex
          xl:w-[270px]
        "
      >
        <div className="flex min-h-0 flex-1 flex-col p-3 xl:p-5">
          {/* CLICKABLE LOGO */}
          <button
            type="button"
            onClick={() => setActivePage("dashboard")}
            className="
              group
              flex shrink-0 items-center
              justify-center gap-3
              rounded-2xl
              py-3
              transition-all duration-200
              hover:bg-white/[0.025]
              xl:justify-start
              xl:px-2
            "
            aria-label="Go to dashboard"
            title="Dashboard"
          >
            <div
              className="
                grid h-11 w-11 shrink-0
                place-items-center
                rounded-2xl
                bg-gradient-to-br
                from-emerald-300
                to-emerald-500
                font-black
                text-[#06100b]
                shadow-lg
                shadow-emerald-500/10
                transition
                group-hover:scale-105
              "
            >
              F
            </div>

            <div className="hidden min-w-0 text-left xl:block">
              <h1 className="truncate text-base font-black">
                ExpenseFlow
              </h1>

              <p className="mt-0.5 text-[10px] font-bold tracking-[0.16em] text-slate-600">
                SMART FINANCE
              </p>
            </div>

            {/* Tooltip doar pentru sidebar compact */}
            <span
              className="
                pointer-events-none
                absolute left-[72px]
                z-[100]
                hidden whitespace-nowrap
                rounded-xl
                border border-white/10
                bg-[#10171e]
                px-3 py-2
                text-xs font-bold text-white
                opacity-0 shadow-xl
                transition
                md:block
                xl:hidden
                group-hover:opacity-100
              "
            >
              Dashboard
            </span>
          </button>

          {/* NAVIGATION */}
          <nav className="mt-7 shrink-0 space-y-2">
            {pages.map((page) => {
              const Icon = page.icon;
              const active =
                activePage === page.id;

              return (
                <button
                  type="button"
                  key={page.id}
                  title={page.label}
                  onClick={() =>
                    setActivePage(page.id)
                  }
                  className={`
                    group relative
                    flex w-full items-center
                    justify-center gap-3
                    rounded-2xl
                    px-3 py-3.5
                    text-sm font-bold
                    transition-all duration-200
                    xl:justify-start xl:px-4
                    ${
                      active
                        ? "bg-emerald-400/10 text-emerald-300"
                        : "text-slate-500 hover:bg-white/[0.04] hover:text-white"
                    }
                  `}
                >
                  <Icon
                    size={20}
                    className="shrink-0"
                  />

                  <span className="hidden xl:block">
                    {page.label}
                  </span>

                  {active && (
                    <span
                      className="
                        absolute right-2
                        h-1.5 w-1.5
                        rounded-full
                        bg-emerald-300
                        shadow-[0_0_12px_#6ee7b7]
                        xl:right-4
                      "
                    />
                  )}

                  {/* Tooltip pentru sidebar compact */}
                  <span
                    className="
                      pointer-events-none
                      absolute left-[72px]
                      z-[100]
                      hidden whitespace-nowrap
                      rounded-xl
                      border border-white/10
                      bg-[#10171e]
                      px-3 py-2
                      text-xs font-bold text-white
                      opacity-0 shadow-xl
                      transition
                      md:block
                      xl:hidden
                      group-hover:opacity-100
                    "
                  >
                    {page.label}
                  </span>
                </button>
              );
            })}
          </nav>

          {/* Spacer */}
          <div className="min-h-4 flex-1" />

          {/* PRO CARD */}
          <div className="expense-pro-card hidden shrink-0 xl:block">
            <div
              className="
                rounded-[24px]
                border border-emerald-400/10
                bg-gradient-to-br
                from-emerald-400/[0.09]
                to-transparent
                p-5
              "
            >
              <div
                className="
                  grid h-10 w-10
                  place-items-center
                  rounded-xl
                  bg-emerald-400/10
                  text-emerald-300
                "
              >
                <Sparkles size={18} />
              </div>

              <p className="mt-5 text-[10px] font-black tracking-[0.18em] text-emerald-300">
                EXPENSEFLOW PRO
              </p>

              <h3 className="mt-4 text-base font-black leading-6">
                Smarter money decisions
              </h3>

              <p className="mt-2 text-xs leading-5 text-slate-600">
                Track, analyze and understand
                your financial habits.
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* MOBILE BOTTOM NAVIGATION */}
      <nav
        className="
          fixed bottom-0 left-0 right-0
          z-50
          grid h-[64px]
          grid-cols-4
          border-t border-white/[0.08]
          bg-[#080d12]/95
          px-2
          backdrop-blur-xl
          md:hidden
        "
      >
        {pages.map((page) => {
          const Icon = page.icon;
          const active =
            activePage === page.id;

          return (
            <button
              type="button"
              key={page.id}
              aria-label={page.label}
              onClick={() =>
                setActivePage(page.id)
              }
              className="
                flex items-center
                justify-center
              "
            >
              <div
                className={`
                  grid h-11 w-11
                  place-items-center
                  rounded-2xl
                  transition-all duration-200
                  ${
                    active
                      ? "bg-emerald-400/10 text-emerald-300"
                      : "text-slate-600"
                  }
                `}
              >
                <Icon size={19} />
              </div>
            </button>
          );
        })}
      </nav>
    </>
  );
}

export default Sidebar;