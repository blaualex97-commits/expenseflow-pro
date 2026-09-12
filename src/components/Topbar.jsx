import { useEffect, useRef, useState } from "react";
import {
  Bell,
  Check,
  ChevronDown,
  CircleUserRound,
  Info,
  WalletCards,
  X,
} from "lucide-react";

function getGreeting() {
  const hour = new Date().getHours();

  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";

  return "Good evening";
}

function Topbar({
  title,
  subtitle,
  dashboard = false,
}) {
  const [notificationsOpen, setNotificationsOpen] =
    useState(false);

  const [profileOpen, setProfileOpen] =
    useState(false);

  const [notifications, setNotifications] =
    useState([
      {
        id: 1,
        title: "Budget status",
        message:
          "Your monthly budget is currently within the safe range.",
        icon: WalletCards,
        unread: true,
      },
      {
        id: 2,
        title: "ExpenseFlow Pro",
        message:
          "Your financial dashboard is up to date.",
        icon: Info,
        unread: true,
      },
    ]);

  const wrapperRef = useRef(null);

  const unreadCount = notifications.filter(
    (notification) => notification.unread
  ).length;

  useEffect(() => {
    function handleOutsideClick(event) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target)
      ) {
        setNotificationsOpen(false);
        setProfileOpen(false);
      }
    }

    function handleEscape(event) {
      if (event.key === "Escape") {
        setNotificationsOpen(false);
        setProfileOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleOutsideClick
    );

    document.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );

      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, []);

  function toggleNotifications() {
    setNotificationsOpen((current) => !current);
    setProfileOpen(false);
  }

  function toggleProfile() {
    setProfileOpen((current) => !current);
    setNotificationsOpen(false);
  }

  function markAllAsRead() {
    setNotifications((current) =>
      current.map((notification) => ({
        ...notification,
        unread: false,
      }))
    );
  }

  function removeNotification(id) {
    setNotifications((current) =>
      current.filter(
        (notification) =>
          notification.id !== id
      )
    );
  }

  return (
    <header className="mb-8 flex items-start justify-between gap-4">
      <div className="min-w-0">
        <p className="mb-2 text-[10px] font-black tracking-[0.22em] text-emerald-400">
          EXPENSEFLOW PRO
        </p>

        <h1 className="text-3xl font-black tracking-tight md:text-4xl">
          {dashboard
            ? `${getGreeting()}, Alex.`
            : title}
        </h1>

        <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
          {subtitle}
        </p>
      </div>

      <div
        ref={wrapperRef}
        className="relative flex shrink-0 items-center gap-2 sm:gap-3"
      >
        {/* NOTIFICATIONS */}
        <div className="relative">
          <button
            type="button"
            onClick={toggleNotifications}
            aria-label="Open notifications"
            aria-expanded={notificationsOpen}
            className={`relative grid h-11 w-11 place-items-center rounded-2xl border transition ${
              notificationsOpen
                ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300"
                : "border-white/10 bg-white/[0.03] text-slate-400 hover:border-emerald-400/20 hover:text-white"
            }`}
          >
            <Bell size={18} />

            {unreadCount > 0 && (
              <>
                <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-rose-400 shadow-[0_0_10px_#fb7185]" />

                <span className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-rose-500 px-1 text-[8px] font-black text-white">
                  {unreadCount}
                </span>
              </>
            )}
          </button>

          {notificationsOpen && (
            <div className="fixed left-4 right-4 top-20 z-[90] rounded-[24px] border border-white/10 bg-[#0d141a]/98 p-4 shadow-2xl backdrop-blur-xl sm:absolute sm:left-auto sm:right-0 sm:top-14 sm:w-[370px]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-black tracking-[0.16em] text-emerald-400">
                    ACTIVITY
                  </p>

                  <h3 className="mt-1 text-base font-black">
                    Notifications
                  </h3>
                </div>

                {unreadCount > 0 && (
                  <button
                    type="button"
                    onClick={markAllAsRead}
                    className="flex items-center gap-1 text-[10px] font-bold text-emerald-300 transition hover:text-emerald-200"
                  >
                    <Check size={13} />
                    Mark all read
                  </button>
                )}
              </div>

              <div className="mt-4 space-y-2">
                {notifications.length > 0 ? (
                  notifications.map(
                    (notification) => {
                      const Icon =
                        notification.icon;

                      return (
                        <div
                          key={notification.id}
                          className={`group flex gap-3 rounded-2xl border p-3 transition ${
                            notification.unread
                              ? "border-emerald-400/10 bg-emerald-400/[0.04]"
                              : "border-white/[0.05] bg-white/[0.02]"
                          }`}
                        >
                          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-emerald-400/10 text-emerald-300">
                            <Icon size={16} />
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="flex items-start justify-between gap-2">
                              <strong className="text-xs">
                                {notification.title}
                              </strong>

                              <button
                                type="button"
                                onClick={() =>
                                  removeNotification(
                                    notification.id
                                  )
                                }
                                className="text-slate-700 transition hover:text-rose-400"
                              >
                                <X size={13} />
                              </button>
                            </div>

                            <p className="mt-1 text-[11px] leading-5 text-slate-500">
                              {
                                notification.message
                              }
                            </p>
                          </div>
                        </div>
                      );
                    }
                  )
                ) : (
                  <div className="rounded-2xl border border-dashed border-white/10 py-8 text-center">
                    <Check
                      size={22}
                      className="mx-auto text-emerald-400"
                    />

                    <p className="mt-3 text-sm font-bold">
                      You're all caught up
                    </p>

                    <p className="mt-1 text-xs text-slate-600">
                      No new notifications.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* PROFILE */}
        <div className="relative">
          <button
            type="button"
            onClick={toggleProfile}
            aria-label="Open profile"
            aria-expanded={profileOpen}
            className={`flex items-center gap-2 rounded-2xl transition ${
              profileOpen
                ? "ring-2 ring-emerald-400/20"
                : ""
            }`}
          >
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-emerald-300 to-emerald-500 text-xs font-black text-black shadow-lg shadow-emerald-500/10">
              AF
            </div>

            <div className="hidden text-left lg:block">
              <strong className="block text-xs">
                Alexandru
              </strong>

              <span className="text-[10px] text-slate-600">
                Personal account
              </span>
            </div>

            <ChevronDown
              size={14}
              className={`hidden text-slate-600 transition lg:block ${
                profileOpen
                  ? "rotate-180"
                  : ""
              }`}
            />
          </button>

          {profileOpen && (
            <div className="fixed left-4 right-4 top-20 z-[90] rounded-[24px] border border-white/10 bg-[#0d141a]/98 p-5 shadow-2xl backdrop-blur-xl sm:absolute sm:left-auto sm:right-0 sm:top-14 sm:w-[300px]">
              <div className="flex items-center gap-4">
                <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-emerald-300 to-emerald-500 text-sm font-black text-black shadow-lg shadow-emerald-500/10">
                  AF
                </div>

                <div>
                  <strong className="block text-sm">
                    Alexandru Filip
                  </strong>

                  <span className="mt-1 block text-xs text-slate-500">
                    Frontend Developer
                  </span>
                </div>
              </div>

              <div className="my-5 h-px bg-white/[0.06]" />

              <div className="space-y-2">
                <div className="flex items-center gap-3 rounded-2xl bg-white/[0.025] p-3">
                  <CircleUserRound
                    size={17}
                    className="text-emerald-300"
                  />

                  <div>
                    <p className="text-[10px] text-slate-600">
                      Account
                    </p>

                    <strong className="text-xs">
                      Personal Finance
                    </strong>
                  </div>
                </div>

                <div className="rounded-2xl border border-emerald-400/10 bg-emerald-400/[0.04] p-4">
                  <p className="text-[9px] font-black tracking-[0.16em] text-emerald-400">
                    PROJECT
                  </p>

                  <p className="mt-2 text-xs font-bold">
                    ExpenseFlow Pro
                  </p>

                  <p className="mt-1 text-[11px] leading-5 text-slate-500">
                    Designed & built by
                    Alexandru Filip.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Topbar;