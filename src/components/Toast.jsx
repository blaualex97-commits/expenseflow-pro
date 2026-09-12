import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Trash2 } from "lucide-react";

function Toast({ toast }) {
  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          className="fixed bottom-24 right-5 z-[150] md:bottom-6"
          initial={{ opacity: 0, x: 30, y: 10 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: 30 }}
        >
          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#10171e] px-5 py-4 shadow-2xl">
            <div
              className={`grid h-9 w-9 place-items-center rounded-xl ${
                toast.type === "danger"
                  ? "bg-rose-500/10 text-rose-400"
                  : "bg-emerald-400/10 text-emerald-300"
              }`}
            >
              {toast.type === "danger" ? (
                <Trash2 size={17} />
              ) : (
                <CheckCircle2 size={17} />
              )}
            </div>

            <span className="text-sm font-semibold">
              {toast.message}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Toast;