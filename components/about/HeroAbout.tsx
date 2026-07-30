"use client";

import { motion } from "framer-motion";

export default function HeroAbout() {
  return (
    <section
      className="relative py-60 text-center"
      style={{
        background:
          "url(/images/computer-lab.jpeg) no-repeat center center/cover",
      }}
    >
      <div className="bg-linear-to-t from-lime-600/20 to-lime-600/30 absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center">
        <motion.h1
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold text-white"
        >
          About Us
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto mt-6 text-gray-50 text-base md:text-lg"
        >
          Shaping future leaders through quality education, strong values, and a
          nurturing environment.
        </motion.p>
      </div>
    </section>
  );
}
