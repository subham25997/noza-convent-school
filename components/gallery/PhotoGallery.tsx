"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import MainTitle from "../MainTitle";

/* ---------------- DATA ---------------- */

const galleryData = [
  { src: "gallery1.jpg", span: "md:col-span-1 md:row-span-2" },
  { src: "gallery2.jpg", span: "md:col-span-2 md:row-span-2" },
  { src: "gallery3.jpg", span: "md:col-span-1 md:row-span-2" },
  { src: "gallery4.jpg", span: "md:col-span-2 md:row-span-2" },
  { src: "gallery5.jpg", span: "md:col-span-2 md:row-span-2" },
  { src: "gallery6.jpg", span: "md:col-span-1 md:row-span-2" },
  { src: "gallery7.jpg", span: "md:col-span-2 md:row-span-2" },
  { src: "gallery8.jpg", span: "md:col-span-1 md:row-span-2" },

  { src: "gallery9.jpg", span: "md:col-span-3 md:row-span-3" },
  { src: "gallery10.jpg", span: "md:col-span-1 md:row-span-2" },
  { src: "gallery11.jpg", span: "md:col-span-1 md:row-span-2" },
  { src: "gallery12.jpg", span: "md:col-span-2 md:row-span-2" },
  { src: "gallery13.jpg", span: "md:col-span-1 md:row-span-1" },
  { src: "gallery14.jpg", span: "md:col-span-2 md:row-span-2" },
  { src: "gallery15.jpg", span: "md:col-span-1 md:row-span-2" },
  { src: "gallery16.jpg", span: "md:col-span-1 md:row-span-1" },

  { src: "gallery17.jpg", span: "md:col-span-2 md:row-span-2" },
  { src: "gallery18.jpg", span: "md:col-span-1 md:row-span-2" },
  { src: "gallery19.jpg", span: "md:col-span-1 md:row-span-2" },
  { src: "gallery20.jpg", span: "md:col-span-2 md:row-span-2" },
  { src: "gallery21.jpg", span: "md:col-span-1 md:row-span-2" },
  { src: "gallery22.jpg", span: "md:col-span-1 md:row-span-1" },
  { src: "gallery23.jpg", span: "md:col-span-2 md:row-span-2" },
  { src: "gallery24.jpg", span: "md:col-span-2 md:row-span-2" },

  { src: "gallery25.jpg", span: "md:col-span-2 md:row-span-2" },
  { src: "gallery26.jpg", span: "md:col-span-2 md:row-span-2" },
];

/* ---------------- COMPONENT ---------------- */

export default function ModernPhotoGallery() {
  const [selected, setSelected] = useState<any>(null);

  // Handle Escape key and prevent background scrolling
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selected) {
        setSelected(null);
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
  }, [selected]);

  return (
    <section className="bg-gradient-to-b from-white to-gray-50 pt-10 pb-20 px-4 md:px-6">

      {/* Heading */}
      <div className="text-center mb-12">
        <MainTitle title="Moments at Noza Convent School" />
      </div>

      {/* Grid */}
      <div className="
        max-w-7xl mx-auto 
        grid 
        grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 
        auto-rows-[140px] sm:auto-rows-[160px] md:auto-rows-[180px] lg:auto-rows-[200px]
        gap-1
      ">
        
        {galleryData.map((item, index) => (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            
            key={index}
            className={`
              relative overflow-hidden
              cursor-pointer group hover:shadow-xl
              ${item.span}
            `}
            onClick={() => setSelected(item)}
          >
            {/* Image */}
            <motion.img
              whileHover={{ scale: 1.05 }}
              src={`/images/gallery/${item.src}`}
              alt=""
              loading="lazy"
              className="w-full h-full min-h-full object-cover transition duration-500 group-hover:scale-110"
            />

            {/* Premium Overlay */}
            <div className="
              absolute inset-0 
              bg-gradient-to-t from-black/40 via-black/10 to-transparent 
              opacity-0 group-hover:opacity-100 
              transition duration-300
            " />

            {/* Subtle Shine Effect */}
            <div className="
              absolute inset-0 
              bg-white/10 opacity-0 group-hover:opacity-100 
              transition duration-300
            " />
          </motion.div>
        ))}

      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-gray-600 transition-colors z-50"
              aria-label="Close modal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <motion.div
              className="max-w-6xl w-full"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={`/images/gallery/${selected.src}`}
                className="w-full rounded-2xl shadow-2xl"
                alt=""
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
