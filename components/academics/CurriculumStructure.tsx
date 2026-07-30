"use client";

import { motion } from "framer-motion";
import MainTitle from "../MainTitle";
import { BiBookOpen, BiLayer, BiTrendingUp, BiHappyBeaming } from "react-icons/bi";

export default function CurriculumStructure() {
  const data = [
    {
      title: "Early Years",
      desc: "Nursery and Kindergarten focus on learning through play, language development, sensory exploration, and building social confidence. Activities encourage curiosity, communication, fine motor skills, and safe risk-taking to prepare children for formal learning environments.",
      subjects: ["Language","Play-based Learning","Social Skills"],
      icon: BiHappyBeaming,
    },
    {
      title: "Primary School",
      desc: "Classes 1 to 5 strengthen literacy and numeracy while nurturing scientific curiosity and creative thinking. Lessons blend conceptual foundations with hands-on projects, group work, and personal development to build strong study habits and confidence.",
      subjects: ["English","Mathematics","Environmental Science"],
      icon: BiBookOpen,
    },
    {
      title: "Middle School",
      desc: "Classes 6 to 8 deepen subject knowledge and introduce interdisciplinary projects that connect concepts across subjects. Emphasis is on critical thinking, collaborative research, technology integration, and preparation for subject-specialisation choices ahead.",
      subjects: ["Social Studies","Science","ICT"],
      icon: BiLayer,
    },
    {
      title: "Secondary School",
      desc: "Classes 9 and 10 focus on academic excellence, examination preparedness, and independent learning skills. Curriculum balances rigorous subject content, exam technique, and opportunities for leadership, mentoring, and career exploration to build confidence for higher studies.",
      subjects: ["Physics","Mathematics","Languages"],
      icon: BiTrendingUp,
    },
  ];

  return (
    <section id="curriculum" className="px-4 sm:px-6 py-12 sm:py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto">
        <MainTitle title="Academic Pathway" />

        <div className="relative mt-10 sm:mt-16">
          {/* CENTER LINE - Hidden on mobile, visible on md and up */}
          <div className="hidden md:block absolute left-1/2 top-0 h-full w-px bg-gray-200 -translate-x-1/2" />

          <div className="flex flex-col gap-8 sm:gap-12 md:gap-16">
            {data.map((item, i) => {
              const Icon = item.icon;
              const isLeft = i % 2 === 0;

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: -50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className={`relative flex items-center ${
                    isLeft ? "justify-start" : "justify-end"
                  }`}
                >
                  {/* CONTENT */}
                  <div className="w-full sm:w-[90%] md:w-[45%] border border-gray-200 p-4 sm:p-6 bg-white rounded-lg sm:rounded-xl">
                    <span className="text-xs text-gray-400 tracking-widest">
                      0{i + 1}
                    </span>

                    <h3 className="text-base sm:text-lg font-semibold mt-2 mb-2 text-gray-900">
                      {item.title}
                    </h3>

                    <p className="text-gray-600 text-sm leading-relaxed">
                      {item.desc}
                    </p>

                    {/* SUBJECT CHIPS */}
                    <div className="mt-3 flex flex-wrap gap-2">
                      <strong>Subjects:</strong>
                      {item.subjects?.map((sub, idx) => (
                        <span
                          key={idx}
                          className="text-gray-600 text-sm border border-gray-200 rounded-full px-3 py-1 inline-flex items-center"
                        >
                          {sub}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* ICON DOT - Hidden on mobile, visible on md and up */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 bg-white border border-gray-200 w-12 h-12 items-center justify-center rounded-full">
                    <Icon className="text-orange-500" size={22} />
                  </div>

                  {/* Mobile icon - shown below content on mobile */}
                  <div className="md:hidden absolute right-2 sm:right-4 top-4 bg-white border border-gray-200 w-10 h-10 items-center justify-center rounded-full flex">
                    <Icon className="text-orange-500" size={18} />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
