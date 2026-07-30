"use client";

import { motion } from "framer-motion";

export default function HeroAbout() {
  return (
    <section
      className="relative py-60 text-center overflow-hidden"
      style={{
        background: "url(/images/hero4.jpg) no-repeat center center/cover",
      }}
    >
      <div className="bg-gradient-to-r from-black/50 to-gray-900/50 absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center">
        <motion.h1
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold text-white"
        >
          Gallery
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto mt-6 text-gray-200 text-base md:text-lg"
        >
          Discover the moments where learning meets creativity, energy, and excellence.
        </motion.p>
      </div>
    </section>
  );
}
