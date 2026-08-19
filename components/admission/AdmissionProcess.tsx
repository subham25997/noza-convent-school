"use client";

import { motion } from "framer-motion";
import {
  BiBookOpen,
  BiCalendarCheck,
  BiCheck,
  BiClipboard,
  BiEnvelope,
  BiGroup,
  BiMessageRoundedDetail,
  BiPhoneCall,
  BiRightArrowAlt,
  BiShieldAlt2,
  BiSolidStar,
} from "react-icons/bi";
import { CONTACT } from "@/config/contact";
import HeroAbout from "@/components/about/HeroAbout";

const steps = [
  {
    title: "Inquiry & Campus Visit",
    description:
      "Reach out to the school office or visit the campus to see the academic environment, facilities, and overall school culture first-hand.",
    icon: BiPhoneCall,
    tone: "lime",
  },
  {
    title: "Admission Form Submission",
    description:
      "Fill out the admission form with accurate student and parent details, along with any supporting documents requested by the office.",
    icon: BiClipboard,
    tone: "amber",
  },
  {
    title: "Interaction & Assessment",
    description:
      "A short interaction or assessment may be held depending on the class applied for, to understand the child's readiness for learning.",
    icon: BiGroup,
    tone: "navy",
  },
  {
    title: "Fee Confirmation & Enrollment",
    description:
      "Once selected, parents are informed about the fee structure. Admission is confirmed after document verification and fee payment.",
    icon: BiCalendarCheck,
    tone: "lime",
  },
] as const;

const documents = [
  "Birth certificate",
  "Previous school report card / transfer certificate",
  "Recent photographs of the child and parents",
  "Address proof",
  "Any other document requested by the school office",
];

const whyUs = [
  { title: "Safe & Caring Campus", description: "A secure learning environment where every child feels supported.", icon: BiShieldAlt2 },
  { title: "Value-Based Academics", description: "Strong academic foundations paired with character building.", icon: BiBookOpen },
  { title: "Regular Parent Updates", description: "Consistent communication keeps you informed at every stage.", icon: BiPhoneCall },
];

function Eyebrow({ children, tone = "lime" }: { children: string; tone?: "lime" | "amber" }) {
  return (
    <span className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[0.68rem] font-bold uppercase tracking-[0.2em] ${tone === "lime" ? "border-lime-200 bg-lime-50 text-lime-800" : "border-amber-200 bg-amber-50 text-amber-800"}`}>
      <BiSolidStar aria-hidden className="text-sm" />
      {children}
    </span>
  );
}

const reveal = {
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-70px" },
};

const stepStyles = [
  {
    icon: "bg-white text-lime-700 ring-lime-100 shadow-[0_8px_20px_-12px_rgba(101,163,13,0.55)]",
    card: "border-lime-200/90 hover:border-lime-300",
    number: "text-lime-100 group-hover:text-lime-200",
  },
  {
    icon: "bg-white text-amber-700 ring-amber-100 shadow-[0_8px_20px_-12px_rgba(217,119,6,0.55)]",
    card: "border-slate-200/90 hover:border-amber-200",
    number: "text-amber-100/80 group-hover:text-amber-200/80",
  },
  {
    icon: "bg-white text-slate-800 ring-slate-200 shadow-[0_8px_20px_-12px_rgba(15,23,42,0.35)]",
    card: "border-slate-200/90 hover:border-slate-300",
    number: "text-slate-100 group-hover:text-slate-200",
  },
  {
    icon: "bg-white text-lime-700 ring-lime-100 shadow-[0_8px_20px_-12px_rgba(101,163,13,0.55)]",
    card: "border-slate-200/90 hover:border-lime-200",
    number: "text-lime-100 group-hover:text-lime-200",
  },
] as const;

export default function AdmissionProcess() {
  return (
    <main className="relative overflow-hidden bg-white text-slate-900">
      <HeroAbout
        title="Our Admission Process"
        subtitle="Your journey to joining Noza Convent School, step by step."
        backgroundImage="/images/gallery2/ap.png"
      />

      <section className="relative bg-white px-5 pb-16 pt-16 sm:px-8 sm:pb-20 sm:pt-20 lg:pt-24">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto mb-8 sm:mb-10 md:mb-12 max-w-4xl">
            <div className="flex items-center gap-4 justify-center mb-10">
              <div className="flex-1 h-0.5 max-w-15 bg-orange-600" />
              <span className="text-orange-600 px-2 text-center text-2xl sm:text-3xl md:text-4xl font-bold">
                Steps to Admission
              </span>
              <div className="flex-1 h-0.5 max-w-15 bg-orange-600" />
            </div>
          </div>
          <motion.div
            {...reveal}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="mt-16 flex items-center gap-4 sm:mt-20"
          >
            <span className="text-xs font-bold uppercase tracking-[0.22em] text-slate-400">
              Your journey
            </span>
            <span className="h-px flex-1 bg-slate-200" />
            <span className="text-xs font-semibold text-slate-400">
              01 — 04
            </span>
          </motion.div>

          <div className="relative mt-7">
            <div
              aria-hidden
              className="absolute bottom-10 left-4 top-10 w-px bg-gradient-to-b from-lime-400/80 via-amber-400/70 to-lime-400/80 lg:bottom-auto lg:left-0 lg:right-0 lg:top-9 lg:h-px lg:w-auto lg:bg-gradient-to-r"
            />
            <ol className="grid gap-5 lg:grid-cols-4 lg:gap-4 xl:gap-5">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const style = stepStyles[index];
                return (
                  <motion.li
                    key={step.title}
                    {...reveal}
                    transition={{ duration: 0.55, delay: index * 0.08 }}
                    className="group relative flex flex-col pl-12 lg:pl-0"
                  >
                    <div className="absolute left-0 top-7 z-10 grid size-8 place-items-center rounded-full border-4 border-white bg-lime-700 text-[0.62rem] font-bold text-white shadow-sm lg:relative lg:left-auto lg:top-auto lg:mx-auto lg:mb-[-1.55rem]">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <article
                      className={`relative flex-1 min-h-[17.5rem] overflow-hidden rounded-[1.75rem] border bg-white p-6 shadow-[0_20px_50px_-30px_rgba(15,23,42,0.3)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_25px_60px_-30px_rgba(15,23,42,0.38)] sm:p-7 lg:pt-10 ${style.card}`}
                    >
                      <span
                        aria-hidden
                        className={`pointer-events-none absolute pt-5 lg:pt-10 right-4 top-0 text-[3rem] font-bold leading-none tracking-[-0.08em] transition-colors duration-300 ${style.number}`}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div
                        className={`relative grid size-14 place-items-center rounded-2xl border border-slate-100 ring-8 transition-transform duration-300 group-hover:rotate-3 group-hover:scale-105 ${style.icon}`}
                      >
                        <Icon aria-hidden className="text-[1.65rem]" />
                      </div>
                      <h2 className="relative mt-6 max-w-[12rem] text-xl font-semibold leading-tight tracking-tight text-slate-950">
                        {step.title}
                      </h2>
                      <p className="relative mt-3 text-sm leading-7 text-slate-600">
                        {step.description}
                      </p>
                    </article>
                  </motion.li>
                );
              })}
            </ol>
          </div>
        </div>
      </section>

      <section className="relative border-y border-slate-200/70 bg-white/70 px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div
            {...reveal}
            className="rounded-[1.75rem] border border-slate-200/80 bg-white p-7 shadow-[0_20px_50px_-30px_rgba(15,23,42,0.25)] sm:p-10"
          >
            <Eyebrow tone="amber">Checklist</Eyebrow>
            <h2 className="mt-5 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              Required documents
            </h2>
            <p className="mt-3 max-w-md leading-7 text-slate-600">
              Please keep the following ready while submitting the admission
              form.
            </p>
            <ul className="mt-7 space-y-3">
              {documents.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-2xl border border-slate-200/80 bg-slate-50/80 px-4 py-3.5 text-sm font-medium leading-6 text-slate-700"
                >
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-lime-500 text-white">
                    <BiCheck aria-hidden className="text-sm" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div
            {...reveal}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative overflow-hidden rounded-[1.75rem] bg-slate-950 p-7 text-white shadow-[0_25px_60px_-30px_rgba(15,23,42,0.55)] sm:p-10"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-lime-400/15 blur-3xl"
            />
            <span className="relative inline-flex rounded-full bg-lime-400/15 px-3.5 py-1.5 text-[0.68rem] font-bold uppercase tracking-[0.2em] text-lime-300">
              Need help?
            </span>
            <h2 className="relative mt-5 max-w-md text-3xl font-semibold tracking-tight sm:text-4xl">
              We&apos;re here for every question
            </h2>
            <p className="relative mt-4 max-w-md leading-7 text-white/65">
              For admission enquiries, class availability, or fee-related
              questions, please reach out to the school office.
            </p>
            <div className="relative mt-8 space-y-3">
              <a
                href={CONTACT.phoneUrl}
                className="flex items-center gap-3 rounded-2xl bg-white/10 px-4 py-3.5 text-sm font-medium transition-colors hover:bg-white/15"
              >
                <BiPhoneCall className="text-lg text-lime-300" />
                {CONTACT.phoneDisplay}
              </a>
              <a
                href={CONTACT.emailUrl}
                className="flex items-center gap-3 rounded-2xl bg-white/10 px-4 py-3.5 text-sm font-medium transition-colors hover:bg-white/15"
              >
                <BiEnvelope className="text-lg text-amber-300" />
                {CONTACT.email}
              </a>
            </div>
            <a
              href={`${CONTACT.whatsappUrl}?text=${encodeURIComponent("Hello, I would like to enquire about admissions at Noza Convent School.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="relative mt-6 inline-flex items-center gap-2 rounded-full bg-lime-400 px-5 py-3 text-sm font-semibold text-lime-950 transition-all duration-300 hover:-translate-y-0.5 hover:bg-lime-300"
            >
              <BiMessageRoundedDetail className="text-lg" />
              Contact on WhatsApp
            </a>
          </motion.div>
        </div>
      </section>

      <section className="relative px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <motion.div {...reveal}>
            <Eyebrow>Trusted by parents</Eyebrow>
            <h2 className="mt-5 max-w-xl text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              Why families choose our school
            </h2>
          </motion.div>
          <div className="mt-9 grid gap-5 md:grid-cols-3">
            {whyUs.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.article
                  key={item.title}
                  {...reveal}
                  transition={{ duration: 0.55, delay: index * 0.08 }}
                  className="group rounded-[1.5rem] border border-slate-200/80 bg-white p-7 shadow-[0_20px_50px_-30px_rgba(15,23,42,0.2)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_25px_55px_-30px_rgba(15,23,42,0.3)]"
                >
                  <div
                    className={`grid size-12 place-items-center rounded-2xl ${index === 1 ? "bg-amber-50 text-amber-700" : "bg-lime-50 text-lime-700"} transition-transform duration-300 group-hover:rotate-3`}
                  >
                    <Icon className="text-2xl" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-slate-950">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    {item.description}
                  </p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative px-5 pb-20 sm:px-8">
        <motion.div
          {...reveal}
          className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-amber-500 px-7 py-14 text-center shadow-[0_28px_70px_-35px_rgba(245,158,11,0.65)] sm:px-16 sm:py-16"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -right-10 -top-32 size-80 rounded-full border-[3rem] border-white/10"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-40 left-1/3 size-96 rounded-full bg-amber-300/30 blur-3xl"
          />
          <h2 className="relative mx-auto max-w-2xl text-3xl font-semibold tracking-tight text-white sm:text-5xl">
            Enroll today for a complete school journey
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl leading-7 text-white/90">
            Admissions are open for Nursery through Class 10. Join a caring
            school environment rooted in strong academics and holistic growth.
          </p>
          <a
            href={CONTACT.phoneUrl}
            className="relative mt-8 inline-flex items-center gap-2 rounded-full bg-slate-950 px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-slate-800"
          >
            <span>Enquire now</span>
            <BiRightArrowAlt className="text-lg" />
          </a>
        </motion.div>
      </section>
    </main>
  );
}
