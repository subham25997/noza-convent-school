"use client";

import { motion } from "framer-motion";
import CountUp from "react-countup";

export default function PrincipalMessage() {
  return (
    <section className="relative overflow-hidden bg-slate-950/5 py-12 sm:py-16">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
          className="overflow-hidden rounded-[2rem] bg-white shadow-[0_40px_120px_-80px_rgba(15,23,42,0.35)] p-6 md:p-8 lg:p-10"
        >
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] items-center">
            <div className="py-6">
              <span className="inline-flex items-center rounded-full bg-orange-50 px-4 py-1 text-sm font-semibold uppercase tracking-[0.24em] text-orange-700">
                Principal’s Message
              </span>

              <h2 className="mt-6 text-3xl sm:text-4xl font-semibold leading-tight text-slate-950">
                A confident message from our principal.
              </h2>

              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-700">
                At Noza Convent School, strong academic performance grows from a caring school culture. We support students to discover their talents while holding fast to respect, resilience and community values.
              </p>

              <div className="mt-8 space-y-6">
                <p className="text-slate-700 leading-8">
                  Through a balanced blend of modern learning methods and traditional values, we nurture young minds and prepare them for the challenges of tomorrow.
                </p>

                <div className="grid gap-4 sm:grid-cols-3">
                  {[
                    { value: 500, label: "Happy Students" },
                    { value: 20, label: "Years of Leadership" },
                    { value: 25, label: "Dedicated Faculty" },
                  ].map((item) => (
                    <div key={item.label} className="rounded-[1.5rem] bg-slate-950/5 p-5 text-center">
                      <p className="text-5xl font-semibold text-orange-500">
                        <CountUp end={item.value} duration={2} enableScrollSpy scrollSpyOnce />+
                      </p>
                      <p className="mt-4 text-xs tracking-[0.15em] text-slate-500">
                        {item.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <p className="mt-8 text-sm font-medium uppercase tracking-[0.22em] text-slate-500">
                — Mr. Rajnarayan Sharma, Principal
              </p>
            </div>

            <div className="relative">
              <img
                src="/images/principal.png"
                alt="School Principal"
                className="w-full h-full min-h-[280px] max-h-[520px] object-cover rounded-[1.5rem]"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
