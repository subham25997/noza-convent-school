"use client";

import { motion } from "framer-motion";

export default function HeroAcademics() {
  return (
    <section
      className="relative min-h-[500px] sm:min-h-[550px] md:min-h-[600px] flex items-center justify-center overflow-hidden"
      style={{
        background: "url(/images/classroom.jpeg) no-repeat center center/cover",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/60 to-black/70" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-20"
      >
        <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12 lg:gap-16">
          {/* Text Content */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-1 text-center lg:text-left"
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight">
              Nursery to Class 10: Learning at Every Step
            </h1>
            <p className="text-gray-200 mb-6 sm:mb-8 text-base sm:text-lg md:text-xl leading-relaxed max-w-xl mx-auto lg:mx-0">
              A complete school journey that balances early childhood discovery,
              strong fundamentals, and confident Class 10 board preparation.
            </p>

            <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row justify-center lg:justify-start gap-3 sm:gap-4 lg:gap-3 xl:gap-4 text-sm sm:text-base text-gray-200">
              <div className="flex items-center gap-2">
                <span className="text-orange-500 text-lg">✓</span>
                <span>Age-appropriate learning</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-orange-500 text-lg">✓</span>
                <span>Caring faculty</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-orange-500 text-lg">✓</span>
                <span>Board-ready foundation</span>
              </div>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex-shrink-0 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl"
          >
            <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-2xl border-4 border-white/20">
              <img
                src="/images/academics.jpg"
                alt="Children in classroom"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
