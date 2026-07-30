"use client";
import CurriculumStructure from "@/components/academics/CurriculumStructure";
import HeroAcademics from "@/components/academics/HeroAcademics";
import { CONTACT } from "@/config/contact";
import {
  BiBook,
  BiBrain,
  BiLayer,
  BiTrendingUp,
  BiFootball,
  BiPaint,
} from "react-icons/bi";

export default function Academics() {
  return (
    <main>
      <div className="bg-white">
        <HeroAcademics />
        <CurriculumStructure />

        {/* ================= METHODOLOGY ================= */}
        <section className="px-4 sm:px-6 py-12 sm:py-16 md:py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-xl sm:text-2xl font-semibold mb-8 sm:mb-10">
              Teaching Methodology
            </h2>

            <div className="grid sm:grid-cols-2 gap-6 sm:gap-10">
              {[
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
              ].map((item, i) => {
                const Icon = item.icon;

                return (
                  <div key={i} className="flex gap-3 sm:gap-4">
                    <Icon className="text-orange-500 mt-1 flex-shrink-0" size={22} />
                    <div>
                      <h4 className="font-semibold text-sm sm:text-base">{item.title}</h4>
                      <p className="text-gray-600 text-sm">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ================= STAGE SUBJECTS ================= */}
        <section className="px-4 sm:px-6 py-12 sm:py-16 md:py-20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-xl sm:text-2xl font-semibold mb-8 sm:mb-10">Stage-Wise Focus Areas</h2>

            <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
              {[
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
              ].map((subject, i) => (
                <div
                  key={i}
                  className="border border-gray-200 p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white"
                >
                  <h3 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">{subject.title}</h3>
                  <ul className="space-y-2 sm:space-y-3 text-gray-600 text-sm">
                    {subject.items.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="mt-1 text-orange-500">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= CTA ================= */}
        <section className="px-4 sm:px-6 py-12 sm:py-16 md:py-20 bg-white">
          <div className="max-w-4xl mx-auto text-center border border-gray-200 p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl bg-white">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-3 sm:mb-4">
              Enroll Today for a Complete School Journey
            </h2>
            <p className="text-gray-600 mb-5 sm:mb-6 text-sm sm:text-base">
              Admissions are open for Nursery through Class 10. Join a caring school environment rooted in strong academics and holistic growth.
            </p>

            <a
              href={`${CONTACT.whatsappUrl}?text=${encodeURIComponent("Hello, I would like to enquire about admissions at Noza Convent School.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex px-5 sm:px-6 py-2.5 sm:py-3 bg-amber-500 text-white text-sm hover:bg-amber-500 transition rounded-full"
            >
              Enquire Now
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
