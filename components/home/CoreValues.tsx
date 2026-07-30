"use client";

import { motion } from "framer-motion";
import {
  BiShield,
  BiStar,
  BiHeart,
  BiCheckShield,
  BiSearch,
  BiCrown,
} from "react-icons/bi";
import MainTitle from "../MainTitle";

const values = [
  {
    title: "Integrity",
    desc: "Honesty, responsibility and moral courage are at the heart of every student action.",
    icon: BiShield,
  },
  {
    title: "Excellence",
    desc: "Students are supported to reach their highest potential in academics and character.",
    icon: BiStar,
  },
  {
    title: "Respect",
    desc: "A culture of kindness, listening, and mutual support is woven into daily school life.",
    icon: BiHeart,
  },
  {
    title: "Discipline",
    desc: "We instill focus, consistency and the dedication needed for personal growth.",
    icon: BiCheckShield,
  },
  {
    title: "Curiosity",
    desc: "Exploration, questions and creative thinking are celebrated in every lesson.",
    icon: BiSearch,
  },
  {
    title: "Leadership",
    desc: "Students learn to lead with confidence, empathy, and team spirit.",
    icon: BiCrown,
  },
];

export default function CoreValues() {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-16 sm:py-20 lg:py-24">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_left,_rgba(251,191,36,0.16),_transparent_32%),linear-gradient(180deg,_rgba(15,23,42,0.95),_rgba(15,23,42,1))]" />
      <div className="relative max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid gap-12 items-center">
          <div className="space-y-8 text-center lg:text-left">
            <MainTitle align="center" title="Our Core Values" color="white" />
            <p className="max-w-7xl text-sm leading-7 text-slate-300 sm:text-base">
              Every lesson, activity and relationship at Noza Convent School is shaped by values that empower students to become confident, caring and capable individuals. We nurture integrity, curiosity, respect, discipline, excellence and leadership in every student.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-white/5 border border-white/10 p-5">
                <p className="text-xs uppercase tracking-[0.35em] text-amber-300">Mission</p>
                <p className="mt-3 text-slate-300 leading-7">
                  Build character through curiosity, discipline and a sense of community.
                </p>
              </div>
              <div className="rounded-3xl bg-white/5 border border-white/10 p-5">
                <p className="text-xs uppercase tracking-[0.35em] text-amber-300">Vision</p>
                <p className="mt-3 text-slate-300 leading-7">
                  Inspire learners to lead with empathy and purpose in every environment.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.06 }}
                  viewport={{ once: true }}
                  className="group rounded-[1.75rem] border border-white/10 bg-slate-900/95 p-6 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.7)] transition hover:-translate-y-1 hover:border-amber-400/30"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-br from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/20">
                    <Icon className="text-2xl" />
                  </div>
                  <h3 className="mt-6 text-lg font-semibold text-white sm:text-xl">
                    {value.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-300">
                    {value.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
