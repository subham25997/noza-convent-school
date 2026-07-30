"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { FaPlay } from "react-icons/fa";

const videos = [
  {
    title: "Annual Function Dance Performance",
    videoId: "_Bupwo_75WE",
    category: "Dance Performance",
  },
  {
    title: "Annual Function Dance Performance",
    videoId: "5TVbDhwM3Ao",
    category: "Dance Performance",
  },
  {
    title: "Sawan Celebration Dance Performance",
    videoId: "AAJN7ftj3iE",
    category: "Dance Performance",
  },
  {
    title: "Dance Practice Session",
    videoId: "10_EYR7CC1o",
    category: "Dance Practice",
  },
];

export default function MomentsSection() {
  const [activeVideo, setActiveVideo] = useState(videos[0]);

  return (
    <section className="relative overflow-hidden bg-slate-950 text-white py-16 sm:py-20 px-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(251,191,36,0.14),_transparent_32%),linear-gradient(180deg,_rgba(15,23,42,0.96),_rgba(15,23,42,0.99))]" />
      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14 md:mb-16"
        >
          <p className="text-sm uppercase tracking-[0.35em] text-amber-300/90">
            School Highlights
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
            Capturing memorable moments at Noza Convent School
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
            Explore our events, performances, and student achievements through easy-to-browse videos and story cards.
          </p>
        </motion.div>

        <div className="grid gap-8 xl:grid-cols-[1.35fr_0.65fr] items-start">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="rounded-xl overflow-hidden border border-white/10 shadow-[0_35px_90px_-45px_rgba(0,0,0,0.8)] bg-slate-950"
          >
            <div className="relative aspect-video overflow-hidden">
              <iframe
                className="absolute inset-0 h-full w-full"
                src={`https://www.youtube.com/embed/${activeVideo.videoId}?autoplay=1&mute=1`}
                title={activeVideo.title}
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            </div>
            <div className="space-y-4 p-6 sm:p-8">
              <span className="inline-flex rounded-full bg-amber-500/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.32em] text-amber-200">
                Featured Moment
              </span>
              <h3 className="text-2xl font-semibold text-white sm:text-3xl">
                {activeVideo.title}
              </h3>
              <p className="text-sm leading-7 text-slate-300">
                {activeVideo.category} from one of our school’s proudest performances. Select another clip on the right to watch instantly.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="space-y-4"
          >
            {videos.map((video, index) => (
              <button
                key={video.videoId}
                type="button"
                onClick={() => setActiveVideo(video)}
                className={`group grid grid-cols-[auto_1fr] gap-4 rounded-[1.75rem] border p-4 text-left transition duration-300 ${
                  activeVideo.videoId === video.videoId
                    ? "border-amber-400/40 bg-white/10"
                    : "border-white/10 bg-white/5 hover:border-amber-400/30 hover:bg-white/10"
                }`}
              >
                <div className="relative h-24 w-24 overflow-hidden rounded-[1.5rem] bg-slate-900">
                  <img
                    src={`https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`}
                    alt={video.title}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 transition duration-300 group-hover:bg-black/50">
                    <FaPlay className="text-white text-lg" />
                  </div>
                </div>
                <div className="min-w-0">
                  <p className="text-xs uppercase tracking-[0.3em] text-amber-300">{video.category}</p>
                  <h4 className="mt-2 text-base font-semibold text-white leading-tight sm:text-lg">
                    {video.title}
                  </h4>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    A short highlight from our annual school celebration program.
                  </p>
                </div>
              </button>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}