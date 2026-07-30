"use client";

import { motion } from "framer-motion";
import MainTitle from "../MainTitle";

const items = [
  {
    title: "Quality Education",
    description:
      "Providing strong academic foundations through structured learning and dedicated teachers guiding every student.",
    image: "/images/QualityEducation.jpg",
  },
  {
    title: "Experienced Teachers",
    description:
      "Our skilled teachers support every child with care, mentorship, and personal attention.",
    image: "/images/teachers.png",
  },
  {
    title: "Holistic Development",
    description:
      "Balanced learning across academics, sports, arts, and life skills builds complete confidence.",
    image: "/images/holistic.jpg",
  },
  {
    title: "Modern Labs",
    description:
      "Hands-on science and computer labs help students explore, experiment, and innovate.",
    image: "/images/computer-lab.jpg",
  },
  {
    title: "Cultural Life",
    description:
      "Festivals and performances foster tradition, teamwork, and joyful experiences.",
    image: "/images/rakshabandhan.png",
  },
  {
    title: "Achievement Culture",
    description:
      "We celebrate student success in academics, sports, and creative pursuits.",
    image: "/images/reward.png",
  },
  
  {
    title: "Creative Learning",
    description:
      "Art, music, and storytelling activities nurture imagination and problem solving.",
    image: "/images/creative.jpg",
  },
  {
    title: "Safe Environment",
    description:
      "A secure campus with caring staff ensures students feel safe and supported.",
    image: "/images/safe.jpg",
  },
  {
    title: "Community Spirit",
    description:
      "We encourage students to contribute to society through service and teamwork.",
    image: "/images/community.jpg",
  }
];

export default function Highlights() {
  return (
    <section className="bg-slate-50 py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="text-center mb-12 lg:mb-16"
        >
          <MainTitle title="Our Highlights" />
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
            Noza Convent School blends academic strength with character building, creativity, and community spirit in every student activity.
          </p>
        </motion.div>

        <motion.div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {items.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              className="group overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-xl shadow-slate-900/5 transition hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className="relative h-64 overflow-hidden sm:h-72">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-xs uppercase tracking-[0.32em] text-amber-200">Highlight</p>
                  <h3 className="mt-2 text-xl font-semibold text-white sm:text-2xl">
                    {item.title}
                  </h3>
                </div>
              </div>

              <div className="p-6 sm:p-7">
                <p className="text-sm leading-7 text-slate-600">
                  {item.description}
                </p>
              
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
