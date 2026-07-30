"use client";

import { motion } from "framer-motion";

export default function CoCurricularHero() {
  return (
    <section
      className="relative flex min-h-[480px] items-center justify-center overflow-hidden"
      style={{
        background: "url(/images/creative.jpg) no-repeat center center/cover",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/55 to-black/75" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 mx-auto w-full max-w-7xl px-4 py-16 text-center text-white sm:px-6 sm:py-20 md:px-8"
      >
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-400">
          Co-Curricular
        </p>
        <h1 className="mx-auto mt-4 max-w-4xl text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
          Opportunities to grow, perform, create and lead beyond the classroom
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-gray-200 sm:text-lg">
          From artistic expression to physical excellence, our programs encourage students to discover their strengths and shine with confidence.
        </p>
      </motion.div>
    </section>
  );
}
