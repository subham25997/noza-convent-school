"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaEye } from "react-icons/fa";

type GalleryImage = {
  src: string;
};

type PhotoGalleryProps = {
  images: GalleryImage[];
};

type SelectedImage = {
  src: string;
  index: number;
};

export default function ModernPhotoGallery({ images }: PhotoGalleryProps) {
  const [selected, setSelected] = useState<SelectedImage | null>(null);

  const totalImages = useMemo(() => images.length, [images.length]);

  // Handle Escape key and prevent background scrolling
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selected) {
        setSelected(null);
        return;
      }

      if (!selected || totalImages === 0) {
        return;
      }

      if (e.key === "ArrowRight") {
        setSelected({
          src: images[(selected.index + 1) % totalImages].src,
          index: (selected.index + 1) % totalImages,
        });
      }

      if (e.key === "ArrowLeft") {
        setSelected({
          src: images[(selected.index - 1 + totalImages) % totalImages].src,
          index: (selected.index - 1 + totalImages) % totalImages,
        });
      }
    };

    if (selected) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [images, selected, totalImages]);

  return (
    <section className="relative overflow-hidden bg-white px-4 py-16 sm:px-6 sm:py-20 md:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(238,248,231,0.8),transparent_36%),radial-gradient(circle_at_bottom_right,rgba(221,239,207,0.45),transparent_34%)]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="max-w-3xl mb-8 sm:mb-10 md:mb-12">
          <div className="h-1 w-16 rounded-full bg-[#5E8C31]/35" aria-hidden="true" />
          <p className="mt-4 text-xs font-semibold uppercase tracking-[0.45em] text-[#5E8C31]">
            Gallery
          </p>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight text-[#1F2937] sm:text-3xl md:text-4xl">
            Moments at Noza Convent School
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-[#64748B] sm:text-base sm:leading-8 md:text-lg">
            Discover the moments where learning meets creativity, energy, and excellence.
          </p>
        </div>

      {/* Grid */}
      <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {images.map((item, index) => (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.16 }}
            transition={{ duration: 0.5 }}
            key={index}
            className="group relative h-72 cursor-pointer overflow-hidden rounded-3xl border border-[#CFE6B7] bg-white shadow-[0_14px_40px_rgba(31,41,55,0.08)] transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl"
            onClick={() => setSelected({ src: item.src, index })}
          >
            <motion.div
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <Image
                src={`/images/${item.src}`}
                alt={`Gallery image ${index + 1}`}
                fill
                className="object-cover object-center"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                loading="lazy"
              />
            </motion.div>

            <div className="absolute inset-0 bg-linear-to-t from-green-950/65 via-[#5E8C31]/18 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
            <div className="absolute inset-0 bg-[#5E8C31]/5 opacity-0 transition duration-300 group-hover:opacity-100" />

            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between px-4 py-4 opacity-0 transition duration-300 group-hover:opacity-100">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#5E8C31]/85 px-3 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-white shadow-md backdrop-blur-sm">
                <FaEye className="text-white" />
                View Image
              </div>
            </div>
          </motion.div>
        ))}

      </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute right-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-[#5E8C31] text-white shadow-md transition-colors hover:bg-[#6EA73D]"
              aria-label="Close modal"
            >
              <span className="text-xl leading-none">×</span>
            </button>

            <button
              type="button"
              aria-label="Previous image"
              onClick={(e) => {
                e.stopPropagation();
                setSelected({
                  src: images[(selected.index - 1 + totalImages) % totalImages].src,
                  index: (selected.index - 1 + totalImages) % totalImages,
                });
              }}
              className="absolute left-4 top-1/2 z-50 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-[#5E8C31]/90 text-white shadow-md backdrop-blur-sm transition hover:bg-[#6EA73D]"
            >
              <FaChevronLeft />
            </button>

            <button
              type="button"
              aria-label="Next image"
              onClick={(e) => {
                e.stopPropagation();
                setSelected({
                  src: images[(selected.index + 1) % totalImages].src,
                  index: (selected.index + 1) % totalImages,
                });
              }}
              className="absolute right-4 top-1/2 z-50 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-[#5E8C31]/90 text-white shadow-md backdrop-blur-sm transition hover:bg-[#6EA73D]"
            >
              <FaChevronRight />
            </button>

            <motion.div
              className="w-full max-w-6xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-16/10 w-full overflow-hidden rounded-2xl bg-black shadow-2xl">
                <Image
                  src={`/images/${selected.src}`}
                  alt={`Gallery image ${selected.index + 1}`}
                  fill
                  className="object-contain object-center"
                  sizes="100vw"
                  priority
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
