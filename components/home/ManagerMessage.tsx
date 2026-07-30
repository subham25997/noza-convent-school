"use client";

import { motion } from "framer-motion";
import CountUp from "react-countup";

export default function ManagerMessage() {
  return (
    <section className="relative overflow-hidden bg-slate-950/5 pt-12 sm:pt-16">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
          className="overflow-hidden rounded-4xl bg-white shadow-[0_40px_120px_-80px_rgba(15,23,42,0.35)] p-6 md:p-8 lg:p-10"
        >
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="relative order-last lg:order-first">
              <img
                src="/images/manager.png"
                alt="School Manager"
                className="h-full min-h-105 w-full object-cover"
              />
            </div>

            <div className="py-6">
              <span className="inline-flex items-center rounded-full bg-orange-50 px-4 py-1 text-sm font-semibold uppercase tracking-[0.24em] text-orange-700">
                Manager’s Message
              </span>

              <h2 className="mt-6 text-3xl sm:text-4xl font-semibold leading-tight text-slate-950">
                Inspiring leadership in a single, confident vision.
              </h2>

              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-700">
                At Noza Convent School, leadership means nurturing every
                student with clarity, care, and a purposeful direction. We focus
                on building a culture of achievement, wellbeing and strong
                values.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[1.5rem] bg-slate-50 p-5">
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-500">
                    Our Focus
                  </p>
                  <p className="mt-3 text-slate-700 leading-7">
                    Strong foundations through student support, wellbeing and
                    parent partnership.
                  </p>
                </div>

                <div className="rounded-[1.5rem] bg-slate-50 p-5">
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-500">
                    School Culture
                  </p>
                  <p className="mt-3 text-slate-700 leading-7">
                    Encouraging curiosity, respect and collaboration in every
                    classroom.
                  </p>
                </div>
              </div>

              <p className="mt-8 text-sm font-medium uppercase tracking-[0.22em] text-slate-500">
                — Mrs. Ranju Singh, Manager
              </p>
            </div>
          </div>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-[1.5rem] bg-slate-950/5 p-6">
            <div>
              <p className="text-6xl font-semibold text-orange-500">
                <CountUp end={15} duration={2} enableScrollSpy scrollSpyOnce />+
              </p>
              <p className="mt-2 text-xs uppercase tracking-[0.15em] text-slate-500">
                Years of Leadership
              </p>
            </div>
            <p className="max-w-xl text-slate-700 leading-7">
              Leading with consistency, vision and a commitment to meaningful
              school growth.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
