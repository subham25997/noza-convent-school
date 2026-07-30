"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BiChevronDown } from "react-icons/bi";
import MainTitle from "../MainTitle";

const faqs = [
  {
    question: "What curriculum does the school follow?",
    answer:
      "Noza Convent School follows a structured curriculum designed to develop academic excellence along with character and leadership skills.",
  },
  {
    question: "How can parents apply for admission?",
    answer:
      "Parents can visit the campus or contact the school office to receive admission guidance and required documentation details.",
  },
  {
    question: "Does the school provide transportation?",
    answer:
      "Yes, transportation facilities are available for nearby areas ensuring safe travel for students.",
  },
  {
    question: "What extracurricular activities are offered?",
    answer:
      "Students participate in sports, cultural programs, competitions and activities that promote creativity and teamwork.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<null | number>(null);

  return (
    <section className="pt-20 pb-20 bg-gray-100 px-6">
      <div className="max-w-7xl mx-auto grid">
        {/* FAQ AREA */}

        <div>
          <MainTitle align="center" title="Frequently Asked Questions" />

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                className="backdrop-blur-lg bg-white/70 border border-white/40 shadow-lg"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                viewport={{ once: true }}
              >
                {/* QUESTION */}

                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex justify-between items-center px-6 py-5 text-left"
                >
                  <span className="font-semibold text-gray-800">
                    {faq.question}
                  </span>

                  <BiChevronDown
                    className={`text-2xl text-amber-500 transition-transform duration-300 ${
                      openIndex === i ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* ANSWER */}

                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.35 }}
                      className="px-6 pb-5 text-gray-600"
                    >
                      {faq.answer}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
