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
        <div className="mx-auto mb-8 sm:mb-10 md:mb-12 max-w-4xl">
          <div className="flex items-center gap-4 justify-center mb-10">
            <div className="flex-1 h-0.5 max-w-15 bg-orange-600" />
            <span className="text-orange-600 px-2 text-center text-2xl sm:text-3xl md:text-4xl font-bold">
              Academic Pathway
            </span>
            <div className="flex-1 h-0.5 max-w-15 bg-orange-600" />
          </div>
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
                className="group relative min-h-56 h-full overflow-hidden bg-white px-6 py-8 rounded-2xl shadow-xl border border-slate-200 transition-all duration-300 ease-out cursor-pointer"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-lime-100 text-lime-700">
                    <Icon size={22} />
                  </div>

                  <span className="inline-flex rounded-full border border-lime-200 bg-lime-50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.32em] text-lime-700">
                    0{i + 1}
                  </span>
                </div>

                <h3 className="mt-6 text-lg sm:text-xl font-semibold text-[#1E293B]">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm sm:text-[0.98rem] leading-7 text-slate-600">
                  {item.desc}
                </p>

                <div className="mt-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">
                    Subjects:
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2.5">
                    {item.subjects?.map((sub, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-2 rounded-full border bg-lime-700 px-4 py-2 text-sm font-semibold text-lime-50 shadow-md transition duration-300 hover:-translate-y-0.5 hover:bg-lime-600 hover:border-lime-800"
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
