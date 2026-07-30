"use client";

import { motion } from "framer-motion";
import AboutCounts from "./AboutCounts";
// import MainTitle from "../MainTitle";

export default function StorySection() {
  return (
    <section className="relative -mt-20">
      <div className="absolute inset-0 opacity-40"></div>

      {/* COUNTS (unchanged) */}
      <div className="bg-transparent grid md:grid-cols-2 lg:grid-cols-4 gap-6 px-6 mb-16 max-w-7xl mx-auto">
        <AboutCounts />
      </div>

      {/* <MainTitle title="Our Story" /> */}

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 px-6 items-center relative z-10 pt-0 pb-10">
        {/* IMAGE */}
        <motion.div
          initial={{ opacity: 0, x: -60, scale: 0.95 }}
          whileInView={{ opacity: 0.9, x: 0, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative h-full"
        >
          {/* Image */}
          <img
            src="/images/school.png"
            alt="School"
            className="relative w-full h-full object-cover"
          />

          {/* Overlay tint */}
          <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent"></div>
        </motion.div>

        {/* TEXT */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Highlight Line */}
          <p className="text-amber-500 font-semibold tracking-wide mb-3 text-sm uppercase">
            Building Future Leaders
          </p>

          {/* Premium Heading */}
          <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-5 leading-snug">
            A Journey of Excellence, Values, and Growth
          </h3>

          {/* Animated Divider */}
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "80px" }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="h-0.5 bg-amber-500 mb-6"
          ></motion.div>

          {/* Content */}
          <p className="text-gray-700 leading-relaxed mb-5">
            Noza Convent School was founded with a vision to deliver
            quality education that blends academic excellence with strong moral
            values. We believe learning should shape not just minds, but
            character and confidence.
          </p>

          <p className="text-gray-700 leading-relaxed mb-6">
            Over the years, our institution has grown into a nurturing
            environment where students are encouraged to explore, innovate, and
            develop into responsible individuals ready to face the future.
          </p>

          {/* Subtle Quote Block */}
          <div className="bg-orange-50 border-l-4 border-orange-500 px-5 py-4 text-gray-800 italic shadow-sm">
            “Education is not just about knowledge, but about shaping the future
            with values and vision.”
          </div>
        </motion.div>
      </div>
    </section>
  );
}
