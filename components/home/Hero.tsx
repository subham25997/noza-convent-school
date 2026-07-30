"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import heroSlides from "@/data/heroSlides.json";
import { CONTACT } from "@/config/contact";

type Slide = {
  src: string;
  title: string;
  description: string;
  location?: string;
  phone?: string;
  email?: string;
};

const slides: Slide[] = heroSlides as Slide[];

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full overflow-hidden pt-16 pb-24 sm:pt-20 sm:pb-28 md:pb-32 lg:pb-36 min-h-[520px] sm:min-h-[620px] md:min-h-[700px] flex items-center">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {slides.map((slide, i) => (
          <motion.div
            key={i}
            className="absolute inset-0 bg-cover bg-top"
            style={{
              backgroundImage: `url(${slide.src})`,
              backgroundColor: "rgba(0,0,0,0.4)",
              backgroundBlendMode: "darken",
            }}
            animate={{ opacity: i === index ? 1 : 0 }}
            transition={{ duration: 1.5 }}
          />
        ))}
      </div>

      {/* Premium Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-lime-300/10 to-lime-300/30" />

      {/* Content */}
      <div className="relative z-20 w-full flex">
        <div className="max-w-4xl mx-auto px-5 sm:px-6 md:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.75, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.7, y: -20 }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Logo */}
              <div className="flex align-center justify-center p-3 h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-28 lg:h-32 lg:w-32 mx-auto my-4 drop-shadow-md bg-white/80 rounded-full overflow-hidden">
                <img
                  src="/images/logo.png"
                  alt="Noza Convent School Logo"
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="py-6 px-10 flex flex-col justify-center">
                <h1 className="text-3xl sm:text-4xl md:text-6xl mb-5 font-bold text-white text-center">
                  {slides[index].title}
                </h1>

                <p className="text-sm sm:text-base text-white/90 text-center max-w-3xl mx-auto mb-4">
                  {slides[index].description}
                </p>

                <div className="w-auto mx-auto">
                  {slides[index].location && (
                    <div className="flex align-center gap-3 text-white mb-2 justify-center">
                      <FaMapMarkerAlt className="text-white text-md sm:text-lg shrink-0" />
                      <p className="text-sm sm:text-base font-semibold text-white">
                        {slides[index].location}
                      </p>
                    </div>
                  )}

                  <div className="flex align-center gap-3 text-white mb-2 justify-center">
                    <FaPhoneAlt className="text-white text-md sm:text-lg shrink-0" />
                    <p className="text-sm sm:text-base font-semibold text-white">
                      {slides[index].phone ?? CONTACT.phoneNumber}
                    </p>
                  </div>

                  <div className="flex align-center gap-3 text-white mb-2 justify-center">
                    <MdEmail className="text-white text-md sm:text-lg shrink-0" />
                    <p className="text-sm sm:text-base font-semibold text-white break-all">
                      {slides[index].email ?? CONTACT.email}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

    </section>
  );
}
