"use client";

import { motion } from "framer-motion";

export default function HeroAcademics() {
  return (
    <section className="relative w-screen min-h-95 sm:min-h-112.5 lg:min-h-140 overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.75 }}
        className="relative flex h-full min-h-95 sm:min-h-112.5 lg:min-h-140 w-full items-center justify-center rounded-none"
      >
        <motion.div
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-0 bg-[url('/images/academics.jpg')] bg-cover bg-center bg-no-repeat"
        />

        <div
          className="absolute inset-0 bg-[linear-gradient(rgba(76,125,32,0.55),rgba(45,80,25,0.55))]"
          aria-hidden="true"
        />

        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.15 }}
          className="relative z-10 flex w-full max-w-212.5 flex-col items-center text-center"
        >
          <h1 className="mx-auto mt-4 max-w-4xl text-3xl font-bold leading-tight sm:text-4xl md:text-5xl text-white">
            CBSE Pattern - Nursery to Class 12
          </h1>

          <p className="mt-5 text-base sm:text-lg md:text-xl leading-8 text-gray-50">
            A complete school journey that balances early childhood discovery,
            strong fundamentals, and confident Class 12 board preparation.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3 sm:gap-4">
            {[
              "Age-appropriate learning",
              "Caring faculty",
              "Board-ready foundation",
            ].map((item) => (
              <div
                key={item}
                className="inline-flex items-center gap-2 rounded-full border border-lime-600 bg-lime-800/80 px-5 py-2.5 text-sm font-medium text-lime-50 shadow-md transition-all duration-300 hover:bg-lime-700 hover:border-lime-400 hover:shadow-lg"
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-full text-lime-200 text-xs font-bold">
                  ✓
                </span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
