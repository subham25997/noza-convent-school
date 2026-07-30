"use client";

import { motion } from "framer-motion";
import type { CoCurricularSectionData } from "@/data/coCurricularData";

const accentStyles = {
  orange: "from-orange-500/40 to-orange-400/20 text-orange-200",
  sky: "from-sky-500/40 to-cyan-400/20 text-sky-200",
  green: "from-emerald-600/40 to-lime-500/20 text-emerald-200",
  purple: "from-violet-600/40 to-fuchsia-500/20 text-violet-200",
};

export default function CoCurricularSection({
  section,
}: {
  section: CoCurricularSectionData;
}) {
  const layout = section.layout ?? "split";
  const accent = accentStyles[section.accent ?? "orange"];

  const content = (
    <div className="grid gap-4 sm:grid-cols-2">
      {section.items.map((item) => (
        <div
          key={item.title}
          className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-orange-300"
        >
          <h4 className="text-lg font-semibold text-gray-900">{item.title}</h4>
          {item.description && (
            <p className="mt-2 text-sm leading-7 text-gray-600">{item.description}</p>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
      className="overflow-hidden rounded-[2rem] border border-gray-200 bg-white shadow-sm"
    >
      {layout === "gallery" ? (
        <div className="grid gap-0 xl:grid-cols-[1fr_0.95fr]">
          <div className="relative min-h-[280px] overflow-hidden">
            <div className="grid h-full grid-cols-2 gap-2 p-3 sm:p-4">
              {(section.images ?? [section.image]).slice(0, 2).map((image, index) => (
                <img
                  key={`${section.id}-${index}`}
                  src={image}
                  alt={`${section.title} ${index + 1}`}
                  className="h-full min-h-[140px] w-full rounded-2xl object-cover"
                />
              ))}
            </div>
            <div className={`absolute inset-0 bg-gradient-to-r ${accent} opacity-90`} />
            <div className="absolute inset-0 flex items-end p-6 sm:p-8">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em]">{section.title}</p>
                <h3 className="mt-2 text-2xl font-bold text-white sm:text-3xl">{section.subtitle}</h3>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 p-6 sm:p-8 lg:p-10">{content}</div>
        </div>
      ) : layout === "stack" ? (
        <div className="grid gap-0 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="relative min-h-[280px] overflow-hidden">
            <img src={section.image} alt={section.title} className="h-full w-full object-cover" />
            <div className={`absolute inset-0 bg-gradient-to-r ${accent} opacity-90`} />
            <div className="absolute inset-0 flex items-end p-6 sm:p-8">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em]">{section.title}</p>
                <h3 className="mt-2 text-2xl font-bold text-white sm:text-3xl">{section.subtitle}</h3>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 sm:p-8 lg:p-10">
            <div className="mb-5 grid gap-3 sm:grid-cols-2">
              {(section.images ?? [section.image]).slice(0, 2).map((image, index) => (
                <img
                  key={`${section.id}-thumb-${index}`}
                  src={image}
                  alt={`${section.title} gallery ${index + 1}`}
                  className="h-32 w-full rounded-2xl object-cover"
                />
              ))}
            </div>
            {content}
          </div>
        </div>
      ) : (
        <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="relative min-h-[280px] overflow-hidden">
            <img src={section.image} alt={section.title} className="h-full w-full object-cover" />
            <div className={`absolute inset-0 bg-gradient-to-r ${accent} opacity-90`} />
            <div className="absolute inset-0 flex items-end p-6 sm:p-8">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em]">{section.title}</p>
                <h3 className="mt-2 text-2xl font-bold text-white sm:text-3xl">{section.subtitle}</h3>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 p-6 sm:p-8 lg:p-10">{content}</div>
        </div>
      )}
    </motion.section>
  );
}
