"use client";

import { motion } from "framer-motion";

export default function HeroGallery() {
  return (
    <section className="relative w-screen min-h-95 sm:min-h-112.5 lg:min-h-140 overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.75 }}
        className="relative flex h-full min-h-95 w-full items-center justify-center rounded-none sm:min-h-112.5 lg:min-h-140"
      >
        <motion.div
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-0 bg-[url('/images/hero4.jpg')] bg-cover bg-center bg-no-repeat"
        />

        <div
          className="absolute inset-0 bg-[linear-gradient(rgba(94,140,49,0.45),rgba(94,140,49,0.45))]"
          aria-hidden="true"
        />

        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.15 }}
          className="relative z-10 flex w-full max-w-212.5 flex-col items-center px-4 text-center sm:px-6"
        >
          <div className="h-1 w-16 rounded-full bg-white/35" aria-hidden="true" />

          <h1 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
            Gallery
          </h1>

          <p className="mt-5 text-base leading-8 text-white/70 sm:text-lg md:text-xl">
            Discover the moments where learning meets creativity, energy, and excellence.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
