"use client";

import { motion } from "framer-motion";
import { BiMap, BiLogoWhatsapp, BiEnvelope } from "react-icons/bi";
import { CONTACT } from "@/config/contact";

export default function VisitSection() {
  return (
    <section className="relative overflow-hidden py-20 bg-linear-to-br from-amber-600 to-amber-400">
      <div className="absolute inset-0 bg-[url('/images/bg_img1.png')] bg-cover bg-center opacity-5" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="grid gap-12 lg:grid-cols-[1.3fr_0.95fr] items-center"
        >
          <div className="space-y-8 text-white">
            <p className="text-sm font-bold uppercase tracking-[0.35em] text-lime-200">Contact & Visit</p>
            <div className="space-y-4">
              <h2 className="text-3xl font-semibold leading-tight text-white sm:text-4xl md:text-5xl">
                Discover the future of elite education at Noza Convent School.
              </h2>
              <p className="max-w-3xl text-base leading-8 text-white/85 sm:text-lg">
                Join us for a campus visit and feel the premium learning environment built around character, innovation, and student success.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <motion.a
                whileHover={{ scale: 1.03 }}
                href={CONTACT.locationUrl}
                target="_blank"
                className="inline-flex h-14 items-center justify-center gap-3 rounded-full bg-white text-amber-600 px-6 text-lg font-semibold shadow-lg shadow-amber-500/20 transition hover:bg-white/90"
              >
                <BiMap className="text-xl" />
                View Location
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.03 }}
                href={CONTACT.emailUrl}
                className="inline-flex h-14 items-center justify-center gap-3 rounded-full border bg-white border-lime-500/50 text-lime-500 px-6 text-lg font-semibold transition hover:text-lime-700 hover:bg-white/90"
              >
                <BiEnvelope className="text-xl" />
                Email Us
              </motion.a>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden rounded-lg border border-white/20 bg-white/95 p-1 shadow-2xl shadow-slate-950/10"
          >
            <div className="rounded-lg">
              <iframe
                className="rounded-lg h-100 w-full"
                src={CONTACT.mapEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
