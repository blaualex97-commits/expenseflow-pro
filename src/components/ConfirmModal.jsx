import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

function ConfirmModal({
  open,
  title,
  message,
  onConfirm,
  onCancel,
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[120] grid place-items-center bg-black/80 p-5 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="w-full max-w-md rounded-[28px] border border-white/10 bg-[#0c1218] p-7 shadow-2xl"
            initial={{ scale: 0.95, y: 15 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 15 }}
          >
            <div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-rose-500/10 text-rose-400">
              <AlertTriangle size={22} />
            </div>

            <h2 className="text-xl font-black">
              {title}
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              {message}
            </p>

            <div className="mt-7 grid grid-cols-2 gap-3">
              <button
                onClick={onCancel}
                className="rounded-xl border border-white/10 px-4 py-3 text-sm font-bold text-slate-400 transition hover:bg-white/5"
              >
                Cancel
              </button>

              <button
                onClick={onConfirm}
                className="rounded-xl bg-rose-500 px-4 py-3 text-sm font-black text-white transition hover:bg-rose-400"
              >
                Delete
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ConfirmModal;