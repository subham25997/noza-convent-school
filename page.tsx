"use client";
import CurriculumStructure from "@/components/academics/CurriculumStructure";
import HeroAcademics from "@/components/academics/HeroAcademics";
import { CONTACT } from "@/config/contact";
import { motion } from "framer-motion";
import {
  BiBook,
  BiBrain,
  BiBookOpen,
  BiHappyBeaming,
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
    icon: BiHappyBeaming,
    tone: "lime",
  },
  {
    title: "Primary",
    items: ["Mathematics", "Environmental Science", "English & Hindi"],
    icon: BiBookOpen,
    tone: "amber",
  },
  {
    title: "Secondary",
    items: ["Science", "Social Studies", "Board preparation"],
    icon: BiTrendingUp,
    tone: "navy",
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
        <section className="relative overflow-hidden bg-slate-950 px-4 sm:px-6 py-16 sm:py-20 md:py-24">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_left,rgba(251,191,36,0.16),transparent_32%),linear-gradient(180deg,rgba(15,23,42,0.95),rgba(15,23,42,1))]" />

          <div className="relative max-w-7xl mx-auto">
            <div className="mb-8 sm:mb-10 md:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-white">
                Teaching Methodology
              </h2>
            </div>

            <motion.div
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.18 }}
              className="grid gap-6 md:grid-cols-2"
            >
              {methodologyCards.map((item, i) => {
                const Icon = item.icon;

                return (
                  <motion.article
                    key={i}
                    variants={itemVariants}
                    transition={{ duration: 0.3 }}
                    className="group rounded-[1.75rem] border border-white/10 bg-slate-900/95 p-6 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.7)] transition hover:-translate-y-1 hover:border-amber-400/30"
                    style={{ opacity: 1, transform: "none" }}
                  >
                    <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-linear-to-br from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/20">
                      <Icon className="text-2xl" />
                    </div>

                    <div className="mt-6">
                      <h4 className="text-lg font-semibold text-white sm:text-xl">
                        {item.title}
                      </h4>
                      <p className="mt-3 text-sm leading-7 text-slate-300">
                        {item.desc}
                      </p>
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
              {stageCards.map((subject, i) => {
                const Icon = subject.icon;
                const iconStyle =
                  subject.tone === "amber"
                    ? "bg-amber-50 text-amber-700 ring-amber-100"
                    : subject.tone === "navy"
                      ? "bg-slate-100 text-slate-800 ring-slate-200"
                      : "bg-lime-50 text-lime-700 ring-lime-100";
                const accentStyle =
                  subject.tone === "amber"
                    ? "hover:border-amber-300"
                    : subject.tone === "navy"
                      ? "hover:border-slate-300"
                    : "hover:border-lime-300";

                return (
                  <motion.article
                    key={i}
                    variants={itemVariants}
                    transition={{ duration: 0.3 }}
                    className={`group relative min-h-56 h-full overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white px-6 py-7 shadow-[0_20px_50px_-30px_rgba(15,23,42,0.35)] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_28px_60px_-32px_rgba(15,23,42,0.4)] ${accentStyle}`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div
                        className={`grid size-12 place-items-center rounded-2xl ring-8 transition-transform duration-300 group-hover:rotate-3 group-hover:scale-105 ${iconStyle}`}
                      >
                        <Icon className="text-2xl" aria-hidden />
                      </div>
                      <span className="text-5xl font-bold leading-none tracking-[-0.08em] text-slate-100 transition-colors duration-300 group-hover:text-lime-100">
                        0{i + 1}
                      </span>
                    </div>

                    <h3 className="mt-6 text-base font-semibold text-slate-950 sm:text-lg">
                      {subject.title}
                    </h3>

                    <ul className="mt-5 space-y-3 text-sm text-slate-600 sm:text-[0.98rem]">
                      {subject.items.map((item, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-amber-400" />
                          <span className="leading-7">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.article>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* ================= GET IN TOUCH HEADING ================= */}
        <section className="relative bg-white px-4 sm:px-6 pt-16 sm:pt-20 md:pt-24 pb-6">
          <div className="relative max-w-6xl mx-auto">
            <SectionHeading
              title="Get in Touch"
              subtitle="Have questions about admissions, academics, or school life? We're here to help."
            />
          </div>
        </section>

        {/* ================= CTA ================= */}
        <section className="bg-white px-4 sm:px-6 py-8 pb-24 sm:pb-28 md:pb-32">
          <div className="max-w-4xl mx-auto group relative min-h-56 h-full overflow-hidden bg-linear-to-br from-lime-800 via-lime-900 to-green-950 px-6 py-8 rounded-2xl shadow-xl border border-lime-600/50 transition-all duration-300 ease-out cursor-pointer text-center sm:p-8 md:p-12">
            <SectionHeading
              title="Have an Enquiry? We're Here to Help"
              subtitle="Admissions are open for Nursery through Class 12. Join a caring school environment rooted in strong academics and holistic growth."
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
