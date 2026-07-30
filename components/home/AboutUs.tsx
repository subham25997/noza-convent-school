"use client";

import { motion } from "framer-motion";
import { BiCheckboxChecked, BiBookOpen, BiUserCircle, BiAward } from "react-icons/bi";
// import MainTitle from "../MainTitle";

export default function AboutSection() {
  return (
    <section className="relative overflow-hidden bg-white pt-0 md:pt-24 pb-6 px-4 sm:px-6 lg:px-8">
      <div className="relative mx-auto max-w-7xl">
        {/* <MainTitle title="About Us" /> */}

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] items-start">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="border border-gray-100 bg-white/95 p-10 shadow-2xl shadow-slate-950/10"
          >
            <span className="inline-flex rounded-full bg-amber-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-amber-600 shadow-sm shadow-amber-500/10">
              Our Story
            </span>
            <h2 className="mt-6 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
              Nurturing confident learners through values, innovation, and care.
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-700">
              Founded in 2016, Noza Convent School blends academic excellence with strong moral values. Our campus is designed to help students grow intellectually and emotionally while building confidence, resilience, and a lifelong love for learning.
            </p>
            <p className="mt-6 text-lg leading-8 text-slate-700">
              Today, we are a thriving community where every student is encouraged to explore their potential, think critically, and become a responsible citizen prepared for the world ahead.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {[
                "Experienced and dedicated teachers",
                "Academic excellence with character building",
                "Safe and supportive learning environment",
                "Holistic development across all activities",
              ].map((point, index) => (
                <motion.div
                  key={point}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index, duration: 0.6 }}
                  className="flex gap-3 rounded-3xl border border-amber-500/40 bg-amber-100 p-5"
                >
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-amber-500 text-white shadow-lg shadow-amber-500/10">
                    <BiCheckboxChecked className="text-2xl" />
                  </div>
                  <p className="text-slate-700 leading-7">{point}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden shadow-2xl"
            >
              <div className="bg-lime-900/95 p-6">
                <div className="grid gap-6">
                  <div className="rounded-3xl bg-lime-500/20 p-6 shadow-sm shadow-slate-950/5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-5xl font-semibold text-white">10+</p>
                        <p className="mt-2 text-sm uppercase tracking-[0.25em] text-gray-50">
                          Years of Excellence
                        </p>
                      </div>
                      <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10 text-white">
                        <BiAward className="text-2xl" />
                      </div>
                    </div>
                  </div>
                  <div className="rounded-3xl bg-lime-500/20 p-6 shadow-sm shadow-slate-950/5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-5xl font-semibold text-white">500+</p>
                        <p className="mt-2 text-sm uppercase tracking-[0.25em] text-gray-50">
                          Happy Students
                        </p>
                      </div>
                      <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10 text-white">
                        <BiUserCircle className="text-2xl" />
                      </div>
                    </div>
                  </div>
                  <div className="rounded-3xl bg-lime-500/20 p-6 shadow-sm shadow-slate-950/5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-5xl font-semibold text-white">20+</p>
                        <p className="mt-2 text-sm uppercase tracking-[0.25em] text-gray-50">
                          Experienced Teachers
                        </p>
                      </div>
                      <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10 text-white">
                        <BiBookOpen className="text-2xl" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden bg-slate-950/95 py-10 px-8 text-white shadow-2xl shadow-slate-950/20"
            >
              <p className="text-sm uppercase tracking-[0.35em] text-lime-300">
                Why Choose Us
              </p>
              <p className="mt-5 text-slate-300 leading-8">
                We combine modern facilities, attentive teaching, and strong values to ensure every student feels supported and inspired.
              </p>
              <div className="mt-8 grid gap-4 text-sm text-slate-300">
                <p>• Personalized attention across academics and co-curricular activities.</p>
                <p>• A secure campus culture designed for learning and growth.</p>
                <p>• A progressive curriculum that prepares students for tomorrow.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
