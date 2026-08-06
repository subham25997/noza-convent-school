"use client";

import { motion } from "framer-motion";
import {
  BiPhoneCall,
  BiClipboard,
  BiGroup,
  BiCalendarCheck,
  BiCheck,
  BiEnvelope,
  BiMessageRoundedDetail,
  BiRightArrowAlt,
  BiShieldAlt2,
  BiBookOpen,
  BiSolidStar,
} from "react-icons/bi";
import { CONTACT } from "@/config/contact";

const steps = [
  {
    title: "Inquiry & Campus Visit",
    description:
      "Reach out to the school office or visit the campus to see the academic environment, facilities, and overall school culture first-hand.",
    icon: BiPhoneCall,
  },
  {
    title: "Admission Form Submission",
    description:
      "Fill out the admission form with accurate student and parent details, along with any supporting documents requested by the office.",
    icon: BiClipboard,
  },
  {
    title: "Interaction & Assessment",
    description:
      "A short interaction or assessment may be held depending on the class applied for, to understand the child's readiness for learning.",
    icon: BiGroup,
  },
  {
    title: "Fee Confirmation & Enrollment",
    description:
      "Once selected, parents are informed about the fee structure. Admission is confirmed after document verification and fee payment.",
    icon: BiCalendarCheck,
  },
];

const documents = [
  "Birth certificate",
  "Previous school report card / transfer certificate",
  "Recent photographs of the child and parents",
  "Address proof",
  "Any other document requested by the school office",
];

const whyUs = [
  {
    title: "Safe & Caring Campus",
    description:
      "A secure learning environment where every child feels supported.",
    icon: BiShieldAlt2,
  },
  {
    title: "Value-Based Academics",
    description: "Strong academic foundations paired with character building.",
    icon: BiBookOpen,
  },
  {
    title: "Regular Parent Updates",
    description: "Consistent communication keeps you informed at every stage.",
    icon: BiPhoneCall,
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

function Eyebrow({
  children,
  tone = "amber",
}: {
  children: string;
  tone?: "lime" | "amber";
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] ${
        tone === "lime"
          ? "bg-lime-100 text-lime-700"
          : "bg-amber-100 text-amber-700"
      }`}
    >
      <BiSolidStar className="text-sm" aria-hidden />
      {children}
    </span>
  );
}

export default function AdmissionProcess() {
  return (
    <main className="bg-white">
      {/* ================= HERO + PROCESS STEPS ================= */}
      <section className="relative overflow-hidden px-5 pb-20 pt-20 sm:px-8 sm:pt-24">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-40 -top-40 size-[28rem] rounded-full bg-lime-300/25 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 top-40 size-[24rem] rounded-full bg-amber-300/25 blur-3xl"
        />

        <div className="relative mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-7xl text-center"
          >
            <Eyebrow>Our Process</Eyebrow>
            <h1 className="mt-6 text-3xl lg:text-4xl text-gray-900 font-semibold tracking-tight">
              Admission,
              <span className="relative ml-3 inline-block">
                <span className="relative z-10">step by step</span>
              </span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-slate-600">
              A simple, transparent journey from your first enquiry to final
              enrollment guided by our team at every step.
            </p>
            <div className="mt-8 flex flex-wrap justify-center items-center gap-3">
              <a
                href={CONTACT.phoneUrl}
                className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
              >
                Start your enquiry
                <BiRightArrowAlt className="text-lg" aria-hidden />
              </a>
              <span className="text-sm font-medium text-slate-500">
                Open for Nursery – Class 10
              </span>
            </div>
          </motion.div>

          <ol className="relative mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div
              aria-hidden
              className="absolute left-0 right-0 top-9 hidden h-px bg-gradient-to-r from-lime-400 via-amber-400 to-lime-400 lg:block"
            />
            {steps.map((step, i) => {
              const Icon = step.icon;
              const isAmber = i % 2 === 1;
              return (
                <motion.li
                  key={step.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group relative rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="flex items-center justify-between">
                    <div
                      className={`grid size-12 place-items-center rounded-2xl ${
                        isAmber
                          ? "bg-amber-100 text-amber-700"
                          : "bg-lime-100 text-lime-700"
                      }`}
                    >
                      <Icon className="text-2xl" aria-hidden />
                    </div>
                    <span className="text-4xl font-semibold text-slate-200 transition-colors group-hover:text-lime-400">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-slate-900">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {step.description}
                  </p>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* ================= DOCUMENTS + HELP ================= */}
      <section className="px-5 pb-20 sm:px-8">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1.15fr_1fr]">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-[2rem] border border-slate-200 bg-white p-8 sm:p-10"
          >
            <Eyebrow tone="amber">Checklist</Eyebrow>
            <h2 className="mt-5 text-3xl font-semibold text-slate-900 sm:text-4xl">
              Required documents
            </h2>
            <p className="mt-3 max-w-md text-slate-600">
              Please keep the following ready while submitting the admission
              form.
            </p>
            <ul className="mt-8 space-y-3">
              {documents.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm font-medium text-slate-800"
                >
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-lime-500 text-white">
                    <BiCheck className="text-sm" aria-hidden strokeWidth={3} />
                  </span>
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative overflow-hidden rounded-[2rem] bg-slate-900 p-8 text-white sm:p-10"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full bg-lime-400/20 blur-2xl"
            />
            <span className="relative inline-flex items-center gap-2 rounded-full bg-lime-400/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-lime-300">
              Need help?
            </span>
            <h2 className="relative mt-5 text-3xl font-semibold sm:text-4xl">
              We&apos;re here for every question
            </h2>
            <p className="relative mt-3 text-white/75">
              For admission enquiries, class availability, or fee-related
              questions, please reach out to the school office.
            </p>

            <div className="relative mt-8 space-y-3">
              <a
                href={CONTACT.phoneUrl}
                className="flex items-center gap-3 rounded-2xl bg-white/10 px-4 py-3.5 text-sm font-medium transition-colors hover:bg-white/20"
              >
                <BiPhoneCall className="text-lg text-lime-300" aria-hidden />
                {CONTACT.phoneDisplay}
              </a>
              <a
                href={CONTACT.emailUrl}
                className="flex items-center gap-3 rounded-2xl bg-white/10 px-4 py-3.5 text-sm font-medium transition-colors hover:bg-white/20"
              >
                <BiEnvelope className="text-lg text-amber-300" aria-hidden />
                {CONTACT.email}
              </a>
            </div>

            <a
              href={`${CONTACT.whatsappUrl}?text=${encodeURIComponent(
                "Hello, I would like to enquire about admissions at Noza Convent School.",
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="relative mt-6 inline-flex items-center gap-2 rounded-full bg-lime-400 px-6 py-3 text-sm font-semibold text-lime-950 transition-transform hover:-translate-y-0.5"
            >
              <BiMessageRoundedDetail className="text-lg" aria-hidden />
              Contact on WhatsApp
            </a>
          </motion.div>
        </div>
      </section>

      {/* ================= WHY PARENTS CHOOSE US ================= */}
      <section className="px-5 pb-20 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <motion.div {...fadeUp} transition={{ duration: 0.6 }}>
            <Eyebrow>Trusted by parents</Eyebrow>
            <h2 className="mt-5 max-w-xl text-3xl font-semibold text-slate-900 sm:text-4xl">
              Why families choose our school
            </h2>
          </motion.div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {whyUs.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="rounded-3xl border border-slate-200 bg-white p-7 transition-colors hover:border-lime-400"
                >
                  <div
                    className={`grid size-12 place-items-center rounded-2xl ${
                      i === 1
                        ? "bg-amber-100 text-amber-700"
                        : "bg-lime-100 text-lime-700"
                    }`}
                  >
                    <Icon className="text-2xl" aria-hidden />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="px-5 pb-20 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] bg-amber-500 px-8 py-16 text-center sm:px-16"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-24 left-1/2 size-72 -translate-x-1/2 rounded-full bg-amber-300/30 blur-3xl"
          />
          <h2 className="relative mx-auto max-w-2xl text-3xl font-semibold text-white sm:text-5xl mb-6">
            Enroll today for a complete school journey
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-base text-white">
            Admissions are open for Nursery through Class 10. Join a caring
            school environment rooted in strong academics and holistic growth.
          </p>
          <a
            href={CONTACT.phoneUrl}
            className="relative mt-8 inline-flex items-center gap-2 rounded-full bg-lime-600 px-8 py-4 text-lg font-semibold text-white transition-transform hover:-translate-y-0.5"
          >
            Enquire now
            <BiRightArrowAlt className="text-lg" aria-hidden />
          </a>
        </motion.div>
      </section>
    </main>
  );
}
