"use client";

import { motion } from "framer-motion";
import { BiTrophy, BiMedal, BiBookOpen, BiStar } from "react-icons/bi";
import MainTitle from "../MainTitle";

const achievements = [
  {
    title: "Academic Excellence",
    desc: "Consistently achieving top results in board examinations.",
    icon: BiTrophy,
  },
  {
    title: "500+ Students",
    desc: "A growing community of bright and ambitious learners.",
    icon: BiBookOpen,
  },
  {
    title: "Awards & Recognition",
    desc: "Recognized for excellence in academics and extracurriculars.",
    icon: BiMedal,
  },
  {
    title: "Holistic Growth",
    desc: "Focusing on discipline, leadership, and overall development.",
    icon: BiStar,
  },
];

export default function AchievementSection() {
  return (
    <section className="relative py-20 overflow-hidden bg-white">
      {/* 🔥 Soft Background Glow */}
      <div className="absolute -top-20 right-0 w-100 h-100 bg-orange-100/40 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 left-0 w-75 h-75 bg-amber-100/40 blur-3xl rounded-full"></div>

      <div className="relative max-w-7xl mx-auto px-6">
        <MainTitle title="Our Achievements" />

        <div className="grid lg:grid-cols-2 gap-12 items-center mt-12">
          {/* LEFT IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative h-full mb-6"
          >
            <div className="relative overflow-hidden rounded-xl shadow-xl">
              <img
                src="/images/achievements.jpg"
                alt="Achievements"
                className="w-full h-full object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent"></div>

              {/* Floating Badge */}
              <div className="absolute top-6 left-6 bg-lime-600 backdrop-blur-md px-4 py-2 shadow-lg">
                <p className="text-sm font-semibold text-white">
                  10+ Years of Excellence
                </p>
              </div>
            </div>
          </motion.div>

          {/* RIGHT CONTENT */}
          <div className="flex flex-col gap-5 justify-stretch h-full">
            {achievements.map((item, i) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.1,
                  }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="group flex items-start gap-5 p-5 border border-gray-200 bg-white shadow-sm hover:shadow-md transition"
                >
                  {/* Icon */}
                  <div className="flex items-center justify-center w-12 h-12 bg-orange-50 text-amber-500 rounded-lg">
                    <Icon className="text-2xl" />
                  </div>

                  {/* Text */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-1">
                      {item.title}
                    </h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  {/* Hover Line */}
                  <div className="absolute left-0 bottom-0 h-[2px] w-0 bg-amber-500 transition-all duration-300 group-hover:w-full"></div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
