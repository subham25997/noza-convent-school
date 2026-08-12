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
    <section className="relative overflow-hidden bg-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(132,204,22,0.10),transparent_38%),radial-gradient(circle_at_top_right,rgba(251,191,36,0.10),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(15,23,42,0.06),transparent_30%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 -top-32 size-[26rem] rounded-full bg-lime-200/40 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-24 size-[22rem] rounded-full bg-amber-200/40 blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl px-5 pb-16 pt-20 sm:px-8 sm:pb-20 sm:pt-24">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-lime-200/80 bg-lime-50 px-4 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-lime-800 shadow-sm">
            <BiSolidStar className="text-sm" aria-hidden />
            Our Process
          </span>

          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
            Admission,{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-lime-700">step by step</span>
              <span
                aria-hidden
                className="absolute inset-x-0 -bottom-1 h-2 rounded-full bg-lime-200/70"
              />
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
            {subtitle}
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <a
              href="#enquire"
              className="group inline-flex items-center gap-2 rounded-full bg-slate-900 px-7 py-3.5 text-sm font-semibold text-white shadow-[0_18px_38px_-18px_rgba(15,23,42,0.55)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-[0_22px_44px_-18px_rgba(15,23,42,0.62)]"
            >
              Start your enquiry
              <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                →
              </span>
            </a>
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-600 shadow-sm">
              <span className="size-1.5 rounded-full bg-lime-500" />
              Open for Nursery – Class 10
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
