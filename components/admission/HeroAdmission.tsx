"use client";

import { motion } from "framer-motion";
import { BiSolidStar } from "react-icons/bi";

export default function HeroAdmission({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <section
      className="relative flex min-h-120 items-center justify-center overflow-hidden"
      style={{
        background:
          "url(/images/exam-schedule-banner.jpg) no-repeat center center/cover",
      }}
    >
      {/* Lime Theme Overlay */}
      <div className="absolute inset-0 bg-linear-to-r from-lime-600/30 via-lime-600/40 to-lime-600/30" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 mx-auto w-full max-w-7xl px-4 py-16 text-center text-white sm:px-6 sm:py-20 md:px-8"
      >
        <h1 className="mx-auto mt-6 max-w-4xl text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
          {title}
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-gray-50 sm:text-lg">
          {subtitle}
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <a
            href="#enquire"
            className="group inline-flex items-center gap-2 rounded-full bg-lime-600 px-7 py-3.5 text-sm font-semibold text-white shadow-[0_18px_38px_-18px_rgba(101,163,13,0.55)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-lime-700 hover:shadow-[0_22px_44px_-18px_rgba(101,163,13,0.65)]"
          >
            Start your enquiry

            <span className="transition-transform duration-300 group-hover:translate-x-0.5">
              →
            </span>
          </a>

          <span className="inline-flex items-center gap-2 rounded-full border border-lime-200/70 bg-white/95 px-5 py-3 text-sm font-medium text-slate-700 shadow-sm">
            <span className="size-1.5 rounded-full bg-amber-400" />
            Open for Nursery – Class 10
          </span>
        </div>
      </motion.div>
    </section>
  );
}