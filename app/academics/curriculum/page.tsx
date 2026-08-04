"use client";
import CurriculumStructure from "@/components/academics/CurriculumStructure";
import HeroAcademics from "@/components/academics/HeroAcademics";
import { CONTACT } from "@/config/contact";
import { motion } from "framer-motion";
import {
  BiBook,
  BiBrain,
  BiLayer,
  BiTrendingUp,
} from "react-icons/bi";

const sectionVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.06,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

const methodologyCards = [
  {
    icon: BiBrain,
    title: "Child-Centered Learning",
    desc: "Every class, from nursery to tenth, receives age-appropriate guidance and encouragement.",
  },
  {
    icon: BiBook,
    title: "Active Learning",
    desc: "Activities, experiments and projects help students retain concepts across grades.",
  },
  {
    icon: BiLayer,
    title: "Balanced Curriculum",
    desc: "Academic rigor is blended with creativity, values, and life skills.",
  },
  {
    icon: BiTrendingUp,
    title: "Progress Tracking",
    desc: "Regular feedback and assessments keep learning goals aligned for every student.",
  },
];

const stageCards = [
  {
    title: "Early Years",
    items: ["Language readiness", "Motor skills", "Creative play"],
  },
  {
    title: "Primary",
    items: ["Mathematics", "Environmental Science", "English & Hindi"],
  },
  {
    title: "Secondary",
    items: ["Science", "Social Studies", "Board preparation"],
  },
];

function SectionHeading({
  title,
  subtitle,
  tone = "light",
}: {
  title: string;
  subtitle?: string;
  tone?: "light" | "inverse";
}) {
  const isInverse = tone === "inverse";

  return (
    <div className="max-w-3xl mb-8 sm:mb-10 md:mb-12">
      <div
        className={`h-1 w-16 rounded-full ${isInverse ? "bg-lime-200/40" : "bg-[#7CB342]/35"}`}
        aria-hidden="true"
      />
      <h2
        className={`mt-4 text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight ${
          isInverse ? "text-white" : "text-[#1E293B]"
        }`}
      >
        {title}
      </h2>
      {subtitle ? (
        <p
          className={`mt-4 text-sm sm:text-base md:text-lg leading-7 sm:leading-8 max-w-2xl ${
            isInverse ? "text-lime-100" : "text-slate-600"
          }`}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

export default function Academics() {
  return (
    <main className="bg-white text-[#1E293B]">
      <div className="bg-white">
        <HeroAcademics />
        <CurriculumStructure />

        {/* ================= METHODOLOGY ================= */}
        <section className="relative overflow-hidden bg-white px-4 sm:px-6 py-16 sm:py-20 md:py-24">
          <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-[#E8F5E9] to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(241,248,233,0.65),transparent_36%),radial-gradient(circle_at_bottom_right,rgba(255,248,236,0.7),transparent_34%)]" />

          <div className="relative max-w-7xl mx-auto">
            <SectionHeading
              title="Teaching Methodology"
            />

            <motion.div
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.18 }}
              className="grid gap-5 sm:gap-6 md:grid-cols-2"
            >
              {methodologyCards.map((item, i) => {
                const Icon = item.icon;

                return (
                  <motion.article
                    key={i}
                    variants={itemVariants}
                    transition={{ duration: 0.3 }}
                    className="group relative min-h-56 h-full overflow-hidden bg-linear-to-br from-lime-800 via-lime-900 to-green-950 px-6 py-8 rounded-2xl shadow-xl border border-lime-600/50 transition-all duration-300 ease-out cursor-pointer"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-lime-700/20 text-amber-400">
                        <Icon size={22} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <h4 className="text-base sm:text-lg font-semibold text-white">
                          {item.title}
                        </h4>
                        <p className="mt-2 text-sm sm:text-[0.98rem] leading-7 text-lime-100">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* ================= STAGE SUBJECTS ================= */}
        <section className="relative overflow-hidden bg-[#FFF8EC]/40 px-4 sm:px-6 py-16 sm:py-20 md:py-24">
          <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-[#E8F5E9] to-transparent" />
          <div className="relative max-w-6xl mx-auto">
            <SectionHeading
              title="Stage-wise focus areas"
              subtitle="Each stage is shaped to support age-appropriate growth, confidence, and academic readiness."
            />

            <motion.div
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.18 }}
              className="grid gap-5 sm:gap-6 md:grid-cols-3"
            >
              {stageCards.map((subject, i) => (
                <motion.article
                  key={i}
                  variants={itemVariants}
                  transition={{ duration: 0.3 }}
                  className="group relative min-h-56 h-full overflow-hidden bg-linear-to-br from-lime-800 via-lime-900 to-green-950 px-6 py-8 rounded-2xl shadow-xl border border-lime-600/50 transition-all duration-300 ease-out cursor-pointer"
                >
                  <h3 className="text-base sm:text-lg font-semibold text-white">
                    {subject.title}
                  </h3>

                  <ul className="mt-5 space-y-3 text-sm sm:text-[0.98rem] text-lime-100">
                    {subject.items.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-amber-400" />
                        <span className="leading-7">{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ================= CTA ================= */}
        <section className="bg-white px-4 sm:px-6 py-16 sm:py-20 md:py-24 pb-24 sm:pb-28 md:pb-32">
          <div className="max-w-4xl mx-auto group relative min-h-56 h-full overflow-hidden bg-linear-to-br from-lime-800 via-lime-900 to-green-950 px-6 py-8 rounded-2xl shadow-xl border border-lime-600/50 transition-all duration-300 ease-out cursor-pointer text-center sm:p-8 md:p-12">
            <SectionHeading
              title="Enroll Today for a Complete School Journey"
              subtitle="Admissions are open for Nursery through Class 10. Join a caring school environment rooted in strong academics and holistic growth."
              tone="inverse"
            />

            <a
              href={`${CONTACT.whatsappUrl}?text=${encodeURIComponent("Hello, I would like to enquire about admissions at Noza Convent School.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-lime-500/40 bg-lime-700/20 px-6 sm:px-7 py-3 text-sm font-semibold text-lime-100 transition duration-300 hover:bg-amber-400 hover:text-black hover:shadow-[0_12px_28px_rgba(250,204,21,0.22)]"
            >
              Enquire Now
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
