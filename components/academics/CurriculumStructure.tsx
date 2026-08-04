"use client";

import { motion } from "framer-motion";
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
    <section id="curriculum" className="relative overflow-hidden bg-white px-4 sm:px-6 py-16 sm:py-20 md:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(241,248,233,0.75),transparent_36%),radial-gradient(circle_at_bottom_left,rgba(255,248,236,0.7),transparent_34%)]" />
      <div className="relative max-w-7xl mx-auto">
        <div className="max-w-3xl mb-8 sm:mb-10 md:mb-12">
          <div className="h-1 w-16 rounded-full bg-[#7CB342]/35" aria-hidden="true" />
          <h2 className="mt-4 text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-[#1E293B]">
            Academic Pathway
          </h2>
          <p className="mt-4 text-sm sm:text-base md:text-lg leading-7 sm:leading-8 text-slate-600 max-w-2xl">
            A clear, caring, and future-ready academic journey
          </p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.16 }}
          variants={{
            hidden: { opacity: 0, y: 24 },
            visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.12 } },
          }}
          className="grid gap-5 sm:gap-6 lg:grid-cols-2"
        >
          {data.map((item, i) => {
            const Icon = item.icon;

            return (
              <motion.article
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 20, scale: 0.98 },
                  visible: { opacity: 1, y: 0, scale: 1 },
                }}
                transition={{ duration: 0.3 }}
                className="group relative min-h-56 h-full overflow-hidden bg-linear-to-br from-lime-800 via-lime-900 to-green-950 px-6 py-8 rounded-2xl shadow-xl border border-lime-600/50 transition-all duration-300 ease-out cursor-pointer"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-lime-700/20 text-amber-400">
                    <Icon size={22} />
                  </div>

                  <span className="inline-flex rounded-full border border-lime-500/40 bg-lime-700/20 px-4 py-1 text-xs font-semibold uppercase tracking-[0.32em] text-lime-100">
                    0{i + 1}
                  </span>
                </div>

                <h3 className="mt-6 text-lg sm:text-xl font-semibold text-white">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm sm:text-[0.98rem] leading-7 text-lime-100">
                  {item.desc}
                </p>

                <div className="mt-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.35em] text-lime-200">
                    Subjects:
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2.5">
                    {item.subjects?.map((sub, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center rounded-full border border-lime-500/30 bg-lime-700/20 px-3.5 py-2 text-sm text-lime-100 transition duration-300 hover:bg-amber-400 hover:text-black"
                      >
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
