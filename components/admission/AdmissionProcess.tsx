"use client";

import { motion } from "framer-motion";
import MainTitle from "../MainTitle";
import { CONTACT } from "@/config/contact";
import {
  BiPhoneCall,
  BiClipboard,
  BiGroup,
  BiCalendarCheck,
  BiCheckCircle,
} from "react-icons/bi";

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
  "Safe and caring learning environment",
  "Focus on academics and value-based education",
  "Regular communication with parents",
];

export default function AdmissionProcess() {
  return (
    <>
      {/* ================= PROCESS STEPS ================= */}
      <section className="px-4 sm:px-6 py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <MainTitle title="How Admission Works" />

          <p className="text-gray-600 text-sm sm:text-base text-center max-w-2xl mx-auto -mt-6 mb-10 sm:mb-14">
            A simple and transparent journey, from your first enquiry to final
            enrollment.
          </p>

          <div className="relative">
            {/* connecting line for larger screens */}
            <div className="hidden md:block absolute top-6 left-0 right-0 h-px bg-gray-200" />

            <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-4">
              {steps.map((step, i) => {
                const Icon = step.icon;

                return (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="relative border border-gray-200 rounded-xl sm:rounded-2xl p-5 sm:p-6 bg-gray-50 hover:shadow-md transition-shadow"
                  >
                    <div className="relative z-10 mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100 text-green-600">
                      <Icon size={22} />
                    </div>

                    <span className="text-xs text-gray-400 tracking-widest">
                      STEP 0{i + 1}
                    </span>

                    <h3 className="mt-2 text-base sm:text-lg font-semibold text-gray-900">
                      {step.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-gray-600">
                      {step.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ================= DOCUMENTS + HELP ================= */}
      <section className="px-4 sm:px-6 py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl sm:rounded-3xl border border-gray-200 bg-white p-6 sm:p-8"
          >
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
              Required Documents
            </h3>

            <p className="mt-1 text-sm text-gray-600">
              Please keep the following ready while submitting the admission
              form.
            </p>

            <ul className="mt-5 space-y-3">
              {documents.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-xl bg-gray-50 p-3 text-sm text-gray-700"
                >
                  <BiCheckCircle className="mt-0.5 flex-shrink-0 text-lg text-green-600" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-2xl sm:rounded-3xl border border-gray-200 bg-white p-6 sm:p-8"
          >
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
              Need Help?
            </h3>

            <p className="mt-3 text-sm leading-6 text-gray-600">
              For admission enquiries, class availability, or fee-related
              questions, please reach out to the school office.
            </p>

            <div className="mt-5 space-y-2 text-sm text-gray-700">
              <p className="font-medium">Phone: {CONTACT.phoneDisplay}</p>
              <p className="font-medium">Email: {CONTACT.email}</p>
            </div>

            <a
              href={`${CONTACT.whatsappUrl}?text=${encodeURIComponent(
                "Hello, I would like to enquire about admissions at Noza Convent School.",
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex rounded-full bg-green-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-green-600"
            >
              Contact on WhatsApp
            </a>
          </motion.div>
        </div>
      </section>

      {/* ================= WHY PARENTS CHOOSE US ================= */}
      <section className="px-4 sm:px-6 py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <MainTitle title="Why Parents Choose Us" />

          <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
            {whyUs.map((benefit, i) => (
              <motion.div
                key={benefit}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-xl sm:rounded-2xl border border-gray-200 bg-gray-50 p-5 sm:p-6 text-sm sm:text-base text-gray-700 text-center"
              >
                {benefit}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="px-4 sm:px-6 py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center border border-gray-200 p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl bg-white">
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-3 sm:mb-4 text-gray-900">
            Enroll Today for a Complete School Journey
          </h2>

          <p className="text-gray-600 mb-5 sm:mb-6 text-sm sm:text-base">
            Admissions are open for Nursery through Class 10. Join a caring
            school environment rooted in strong academics and holistic growth.
          </p>

          <a
            href={`${CONTACT.whatsappUrl}?text=${encodeURIComponent(
              "Hello, I would like to enquire about admissions at Noza Convent School.",
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex px-5 sm:px-6 py-2.5 sm:py-3 bg-green-500 text-white text-sm hover:bg-green-600 transition rounded-full"
          >
            Enquire Now
          </a>
        </div>
      </section>
    </>
  );
}
