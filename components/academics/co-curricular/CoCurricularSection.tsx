"use client";

import { motion } from "framer-motion";
import type { CoCurricularSectionData } from "@/data/coCurricularData";

const accentStyles = {
  orange: "from-amber-500/50 to-amber-400/40 text-amber-100",
  sky: "from-sky-500/50 to-sky-400/40 text-white",
  green: "from-lime-600/40 to-lime-500/20 text-lime-100",
  purple: "from-violet-600/40 to-fuchsia-500/20 text-white",
};

export default function CoCurricularSection({
  section,
}: {
  section: CoCurricularSectionData;
}) {
  const layout = section.layout ?? "split";
  const accent = accentStyles[section.accent ?? "orange"];

  const content = (
    <div className={`grid gap-3 ${section.items.length > 1 ? "sm:grid-cols-2" : ""}`}>
      {section.items.map((item) => (
        <div
          key={item.title}
          className="rounded-2xl border border-gray-200 bg-white p-5 transition hover:-translate-y-1 hover:border-orange-300"
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
      className="overflow-hidden rounded-4xl border border-gray-200 bg-white"
    >
      {layout === "gallery" ? (
        <div className="grid gap-0 xl:grid-cols-[1fr_0.95fr]">
          <div className="relative min-h-70 overflow-hidden">
            <div className="grid h-full grid-cols-2 gap-2 p-3 sm:py-4 sm:ps-4 sm:pe-0">
              {(section.images ?? [section.image]).slice(0, 2).map((image, index) => (
                <img
                  key={`${section.id}-${index}`}
                  src={image}
                  alt={`${section.title} ${index + 1}`}
                  className="h-full min-h-35 w-full rounded-2xl object-cover"
                />
              ))}
            </div>
            <div className={`absolute inset-0`} />
            <div className="absolute inset-0 flex items-end p-6 sm:p-8">
              <div className={`space-y-1 p-5 bg-linear-to-r opacity-90 ${accent}`}>
                <p className="text-sm font-semibold uppercase tracking-[0.2em]">{section.title}</p>
                <h3 className="mt-2 text-2xl font-bold text-white sm:text-3xl">{section.subtitle}</h3>
              </div>
            </div>
          </div>
          <div className="p-3">{content}</div>
        </div>
      ) : layout === "stack" ? (
        <div className="grid gap-0 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="relative min-h-70 overflow-hidden">
            <img src={section.image} alt={section.title} className="h-full w-full object-cover" />
            <div className={`absolute inset-0`} />
            <div className="absolute inset-0 flex items-end p-6 sm:p-8">
              <div className={`space-y-1 p-5 bg-linear-to-r opacity-90 ${accent}`}>
                <p className="text-sm font-semibold uppercase tracking-[0.2em]">{section.title}</p>
                <h3 className="mt-2 text-2xl font-bold text-white sm:text-3xl">{section.subtitle}</h3>
              </div>
            </div>
          </div>
          <div className="bg-white p-3">
            <div className="mb-3 grid gap-3 sm:grid-cols-2">
              {(section.images ?? [section.image]).slice(0, 4).map((image, index) => (
                <img
                  key={`${section.id}-thumb-${index}`}
                  src={image}
                  alt={`${section.title} gallery ${index + 1}`}
                  className="h-70 w-full rounded-2xl object-cover"
                />
              ))}
            </div>
            {content}
          </div>
        </div>
      ) : (
        <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="relative min-h-70 overflow-hidden">
            <img src={section.image} alt={section.title} className="h-full w-full object-cover" />
            <div className={`absolute inset-0 bg-linear-to-r opacity-90`} />
            <div className="absolute inset-0 flex items-end p-6 sm:p-8">
              <div className={`space-y-1 p-5 bg-linear-to-r opacity-90 ${accent}`}>
                <p className="text-sm font-semibold uppercase tracking-[0.2em]">{section.title}</p>
                <h3 className="mt-2 text-2xl font-bold text-white sm:text-3xl">{section.subtitle}</h3>
              </div>
            </div>
          </div>
          <div className="p-3">{content}</div>
        </div>
      )}
    </motion.section>
  );
}
