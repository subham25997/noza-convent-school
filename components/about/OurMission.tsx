"use client";

import { motion } from "framer-motion";
import { FaBookOpen, FaUserGraduate, FaHandsHelping } from "react-icons/fa";

export default function MissionSection() {
  const pillars = [
    {
      icon: <FaBookOpen />,
      title: "Academic Excellence",
      desc: "Strong foundations through modern learning.",
    },
    {
      icon: <FaUserGraduate />,
      title: "Holistic Growth",
      desc: "Confidence, leadership, and life skills.",
    },
    {
      icon: <FaHandsHelping />,
      title: "Strong Values",
      desc: "Discipline, integrity, and responsibility.",
    },
  ];

  return (
    <section className="pt-4 pb-10 bg-white relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute left-0 top-0 w-125 h-[500px]rounded-full"></div>

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        {/* LEFT SIDE — MISSION */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-sm uppercase tracking-[0.2em] text-amber-500 mb-4">
            Our Mission
          </p>

          <h2 className="text-3xl lg:text-4xl font-semibold text-gray-900 leading-tight mb-6">
            Shaping Future-Ready Students Through
            <span className="text-amber-500"> Education</span>,{" "}
            <span className="text-amber-500">Values</span> &
            <span className="text-amber-500"> Growth</span>
          </h2>

          <p className="text-gray-600 leading-relaxed max-w-lg">
            We are committed to nurturing young minds with a balanced approach
            that blends academic excellence, character building, and a
            supportive environment for lifelong success.
          </p>

          {/* Subtle Line */}
          <div className="mt-8 w-20 h-0.5 bg-amber-500"></div>
        </motion.div>

        {/* RIGHT SIDE — FLOWING PILLARS */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-orange-200"></div>

          <div className="space-y-10">
            {pillars.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                viewport={{ once: true }}
                className="flex items-start gap-6 relative"
              >
                {/* Dot */}
                <div className="w-10 h-10 flex items-center justify-center bg-lime-500 text-white shadow-lg z-10">
                  {item.icon}
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
