"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FiBell, FiX } from "react-icons/fi";
import type { NotificationItem } from "@/services/notifications";

type NoticeWidgetProps = {
  notifications?: NotificationItem[];
};

export default function NoticeWidget({
  notifications = [],
}: NoticeWidgetProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hasAutoOpened, setHasAutoOpened] = useState(false);

  const newCount = notifications.filter((n) => n.isNew).length;

  // Auto-open once, only for visitors landing on the home page — never on
  // internal navigation, and never more than once per visit.
  useEffect(() => {
    if (!hasAutoOpened && pathname === "/" && notifications.length > 0) {
      setOpen(true);
      setHasAutoOpened(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const closeNotification = () => setOpen(false);
  const toggleNotification = () => setOpen((prev) => !prev);

  // Nothing to say, nothing to show — a permanently empty bell is just clutter.
  if (notifications.length === 0) {
    return null;
  }

  return (
    <div>
      <button
        onClick={toggleNotification}
        className="fixed bottom-6 left-6 flex h-14 w-14 items-center justify-center rounded-full bg-amber-500 text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-amber-600 hover:shadow-xl"
        style={{ zIndex: 50 }}
        aria-label={open ? "Close notices" : "Open notices"}
        title={open ? "Close notices" : "Open notices"}
      >
        <motion.span
          animate={newCount > 0 && !open ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          className="flex items-center justify-center"
        >
          {open ? <FiX size={24} /> : <FiBell size={24} />}
        </motion.span>

        {newCount > 0 && !open && (
          <span className="absolute -top-1 -right-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-lime-500 px-1 text-[11px] font-bold text-white ring-2 ring-white">
            {newCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-24 left-6 w-[calc(100vw-3rem)] max-w-sm overflow-hidden rounded-3xl border border-slate-800 shadow-2xl sm:w-96"
            style={{ zIndex: 50 }}
          >
            <div className="flex items-center justify-between bg-slate-900 px-5 py-4">
              <div className="flex items-center gap-2">
                <FiBell className="text-amber-400" size={18} />
                <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-white">
                  Notices
                </h3>
                {newCount > 0 && (
                  <span className="rounded-full bg-lime-500 px-2 py-0.5 text-[11px] font-bold text-white">
                    {newCount} new
                  </span>
                )}
              </div>

              <button
                aria-label="Close notifications"
                onClick={closeNotification}
                className="rounded-full p-1 text-slate-400 transition hover:bg-white/10 hover:text-white"
              >
                <FiX size={18} />
              </button>
            </div>

            <div className="max-h-96 overflow-y-auto bg-slate-900">
              {notifications.map((notice) => (
                <Link
                  href={`/notifications/${notice.slug}`}
                  key={notice.slug}
                  onClick={closeNotification}
                  className="flex flex-col gap-2 border-t border-slate-800 px-5 py-4 text-left transition hover:bg-slate-800"
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-sm font-medium leading-relaxed text-white">
                      {notice.title}
                    </p>

                    {notice.isNew && (
                      <span className="flex-shrink-0 rounded-full bg-amber-500/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-400">
                        New
                      </span>
                    )}
                  </div>

                  <p className="text-xs leading-relaxed text-slate-400">
                    {notice.summary}
                  </p>

                  <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.16em] text-slate-500">
                    <span>{notice.category}</span>
                    <span>{notice.publishedAt || "Recently posted"}</span>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
