"use client";

import { motion } from "framer-motion";

export default function HeroAdmission({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <section
      className="relative min-h-[380px] sm:min-h-[440px] md:min-h-[480px] flex items-center justify-center overflow-hidden"
      style={{
        background: "url(/images/school.jpg) no-repeat center center/cover",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/60 to-black/70" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-12 sm:py-16 text-center"
      >
        <motion.p
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-amber-500"
        >
          Admissions
        </motion.p>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-3 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight"
        >
          {title}
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-4 text-gray-200 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
        >
          {subtitle}
        </motion.p>
      </motion.div>
    </section>
  );
}
