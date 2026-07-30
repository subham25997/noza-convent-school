"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FiBell, FiX } from "react-icons/fi";
import type { NotificationItem } from "@/services/notifications";

type NoticeWidgetProps = {
  notifications?: NotificationItem[];
};

export default function NoticeWidget({ notifications = [] }: NoticeWidgetProps) {
  const [open, setOpen] = useState(true);

  const noticeItems = notifications.length ? notifications : [];
  const newCount = noticeItems.filter((n) => n.isNew).length;

  const closeNotification = () => setOpen(false);
  const toggleNotification = () => setOpen((prev) => !prev);

  return (
    <div>
      <button
        onClick={toggleNotification}
        className="fixed bottom-28 right-6 flex items-center justify-center rounded-full bg-blue-500 p-5 w-16 h-16 text-white shadow-xl transition-all duration-300 hover:bg-amber-500 hover:shadow-2xl"
        style={{ zIndex: 9999 }}
        aria-label={open ? "Close notices" : "Open notices"}
        title={open ? "Close notices" : "Open notices"}
      >
        <motion.span
          animate={newCount > 0 ? { scale: [1, 1.12, 1], opacity: [1, 0.75, 1] } : {}}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          className="flex items-center justify-center"
        >
          <FiBell size={28} />
        </motion.span>

        {newCount > 0 && (
          <span className="absolute -top-1 -right-1 inline-flex h-7 min-w-7 items-center justify-center rounded-full bg-red-600 px-1.5 text-[14px] font-semibold text-white shadow-sm">
            {newCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.35 }}
            className="fixed bottom-24 right-6 min-w-68 overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.6)] sm:w-[24rem]"
            style={{ zIndex: 9999 }}
          >
            <div className="flex items-center justify-between bg-gray-900 px-5 pb-3 pt-4">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold text-white">Notices</h3>
                <span className="text-lg font-semibold text-orange-400">({newCount})</span>
              </div>

              <button
                aria-label="Close Notifications"
                onClick={closeNotification}
                className="p-1 text-white transition hover:text-orange-400"
              >
                <FiX size={18} />
              </button>
            </div>

            <div className="relative h-100 overflow-auto bg-gray-800">
              {noticeItems.length > 0 ? (
                <div className="absolute w-full">
                  {noticeItems.map((notice) => (
                    <Link
                      href={`/notifications/${notice.slug}`}
                      key={notice.slug}
                      onClick={closeNotification}
                      className="flex flex-col gap-2 border-b border-gray-700 px-5 py-4 text-left transition hover:bg-gray-700/70"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-medium leading-relaxed text-white">{notice.title}</p>
                          <p className="mt-1 text-xs text-gray-400">{notice.summary}</p>
                        </div>

                        {notice.isNew && (
                          <motion.span
                            animate={{ opacity: [1, 0.45, 1], scale: [1, 1.05, 1] }}
                            transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                            className="rounded bg-amber-500 px-2 py-0.75 text-[10px] font-semibold text-white"
                          >
                            NEW
                          </motion.span>
                        )}
                      </div>

                      <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-gray-500">
                        <span>{notice.category}</span>
                        <span>{notice.publishedAt || "Recently posted"}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="flex h-full items-center justify-center px-6 text-center text-sm text-gray-300">
                  No notices are available at the moment.
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
