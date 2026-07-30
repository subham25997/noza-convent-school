"use client";

import { motion } from "framer-motion";
import { FaSchool, FaFlask, FaLeaf } from "react-icons/fa";
import MainTitle from "../MainTitle";

export default function Infrastructure() {
  return (
    <section className="relative bg-lime-600">
      <div
        className="absolute inset-0 opacity-5"
        style={{ background: "url(/images/bg_img1.png)" }}
      ></div>
      <div className="w-full relative mx-auto">
        <div className="absolute inset-0 flex items-center justify-center bg-lime-600/30 px-6">
          <div className="w-full max-w-7xl text-center">
            <div className="hidden md:block">
              <MainTitle
                align="center"
                title="School Infrastructure"
                color="white"
              />
            </div>

            <p className="mt-4 text-white max-w-4xl mx-auto hidden md:block">
              Our campus combines elegant design with modern facilities to
              provide an inspiring, safe and well-equipped environment for every
              student.
              From state-of-the-art classrooms and laboratories to lush outdoor
              spaces, we ensure that every aspect of our infrastructure supports
              holistic learning and growth.
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-white/4  backdrop-blur-lg border border-white/8 rounded-xl p-4 flex items-start gap-5">
                <div className="w-15 h-15 rounded-md bg-white/20 flex items-center justify-center text-white">
                  <FaSchool className="text-xl" />
                </div>
                <div className="text-start">
                  <h4 className="text-white font-semibold">
                    Modern Classrooms
                  </h4>
                  <p className="text-white/80 text-sm">
                    Interactive boards, ergonomic seating and smart layouts.
                  </p>
                </div>
              </div>

              <div className="bg-white/4  backdrop-blur-lg border border-white/8 rounded-xl p-4 flex items-start gap-5">
                <div className="w-15 h-15 rounded-md bg-white/20 flex items-center justify-center text-white">
                  <FaFlask className="text-xl" />
                </div>
                <div className="text-start">
                  <h4 className="text-white font-semibold">Advanced Labs</h4>
                  <p className="text-white/80 text-sm">
                    Fully equipped science and computer laboratories.
                  </p>
                </div>
              </div>

              <div className="bg-white/4  backdrop-blur-lg border border-white/8 rounded-xl p-4 flex items-start gap-5">
                <div className="w-15 h-15 rounded-md bg-white/20 flex items-center justify-center text-white">
                  <FaLeaf className="text-xl" />
                </div>
                <div className="text-start">
                  <h4 className="text-white font-semibold">Green Campus</h4>
                  <p className="text-white/80 text-sm">
                    Lush outdoor spaces and dedicated sports facilities.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <iframe
            className="w-full min-h-120 aspect-video"
            src={`https://www.youtube.com/embed/T-VP2QY3oOk?autoplay=1&mute=1&start=0&end=20&loop=1&playlist=T-VP2QY3oOk`}
            title="School Infrastructure"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        </motion.div>
      </div>
    </section>
  );
}
