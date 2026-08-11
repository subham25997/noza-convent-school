"use client";

import { motion } from "framer-motion";

type HeroAboutProps = {
  title?: string;
  subtitle?: string;
  backgroundImage?: string;
};

export default function HeroAbout({
  title = "About Us",
  subtitle =
    "Shaping future leaders through quality education, strong values, and a nurturing environment.",
  backgroundImage = "/images/computer-lab.jpeg",
}: HeroAboutProps) {
  return (
    <section
      className="relative py-60 text-center"
      style={{
        background: `url(${backgroundImage}) no-repeat center center/cover`,
      }}
    >
      <div className="bg-linear-to-t from-lime-600/30 to-lime-600/40 absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center">
        <motion.h1
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mx-auto mt-4 max-w-4xl text-3xl font-bold leading-tight sm:text-4xl md:text-5xl text-white"
        >
          {title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto mt-6 text-gray-50 text-base md:text-lg"
        >
          {subtitle}
        </motion.p>
      </div>
    </section>
  );
}
