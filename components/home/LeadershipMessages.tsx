"use client";

import { motion } from "framer-motion";
import leadershipMessages from "@/data/leadershipMessages.json";

type LeadershipCard = {
  role: string;
  name: string;
  img: string;
  message: string;
  quote: string;
  animation: "left" | "up" | "right";
};

type LeadershipData = {
  section: {
    eyebrow: string;
    heading: string;
    description: string;
  };
  cards: LeadershipCard[];
};

const data = leadershipMessages as LeadershipData;

const animationMap = {
  left: { initial: { opacity: 0, x: -80 }, animate: { opacity: 1, x: 0 } },
  up: { initial: { opacity: 0, y: 80 }, animate: { opacity: 1, y: 0 } },
  right: { initial: { opacity: 0, x: 80 }, animate: { opacity: 1, x: 0 } },
};

export default function LeadershipMessages() {
  return (
    <section className="relative overflow-hidden text-white">
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: "url(/images/school.jpg)" }}
      />
      <div className="absolute inset-0 bg-lime-800/70" />
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <div className="mb-12 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.35em] text-amber-300">
            {data.section.eyebrow}
          </p>
          <h2 className="mt-4 text-3xl font-semibold leading-tight text-white sm:text-4xl md:text-5xl">
            {data.section.heading}
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-slate-200 sm:text-lg">
            {data.section.description}
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {data.cards.map((card) => (
            <motion.div
              key={card.role}
              initial={animationMap[card.animation].initial}
              whileInView={animationMap[card.animation].animate}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="text-center bg-white p-8 shadow-[0_35px_120px_-50px_rgba(15,23,42,0.12)]"
            >
              <span className="inline-flex bg-amber-100 px-4 py-1 text-sm font-semibold uppercase tracking-[0.24em] text-amber-600">
                {card.role}
              </span>
              <div className="mt-8 flex justify-center">
                <div className="h-64 w-64 overflow-hidden rounded-full bg-lime-100 ring-1 ring-lime-200">
                  <img
                    src={card.img}
                    alt={card.name}
                    className="h-full w-full object-contain"
                  />
                </div>
              </div>
              <h3 className="mt-8 pb-3 border-b border-b-amber-500 text-center text-amber-500 text-lg md:text-xl font-semibold">{card.name}</h3>
              <p className="mt-4 pb-4 border-b border-b-amber-500 text-justify text-gray-700 leading-relaxed">{card.message}</p>
              <p className="mt-6 text-sm uppercase tracking-[0.22em] text-slate-500">"{card.quote}"</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
