"use client";

import { useState } from "react";
import {
  FaWhatsapp,
  FaUser,
  FaPhone,
  FaPaperPlane,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaChevronRight,
  FaPhoneAlt,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { FiAlertCircle } from "react-icons/fi";
import { MdCheckCircle } from "react-icons/md";
import { CONTACT } from "@/config/contact";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function Contact() {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{ name?: string; mobile?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const validateForm = () => {
    const newErrors: { name?: string; mobile?: string } = {};

    if (!name.trim()) {
      newErrors.name = "Please enter your full name";
    } else if (name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!mobile.trim()) {
      newErrors.mobile = "Please enter your mobile number";
    } else if (!/^[0-9]{10}$/.test(mobile.replace(/\s/g, ""))) {
      newErrors.mobile = "Please enter a valid 10-digit mobile number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setShowSuccess(true);

    const fullMessage = message.trim()
      ? `Hello, my name is ${name.trim()} and my mobile number is ${mobile.trim()}.\n\nMessage: ${message.trim()}`
      : `Hello, my name is ${name.trim()} and my mobile number is ${mobile.trim()}. I would like to contact you.`;
    const encodedMessage = encodeURIComponent(fullMessage);
    const whatsappUrl = `${CONTACT.whatsappUrl}?text=${encodedMessage}`;

    setTimeout(() => {
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
      setIsSubmitting(false);
    }, 500);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    if (errors.name) {
      setErrors((prev) => ({ ...prev, name: undefined }));
    }
  };

  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMobile(e.target.value);
    if (errors.mobile) {
      setErrors((prev) => ({ ...prev, mobile: undefined }));
    }
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  return (
    <>
      {/* Hero Section */}
      <section
        className="relative py-32 px-4 overflow-hidden min-h-[500px] flex items-center"
        style={{
          backgroundImage: 'url("/images/Contactus.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Content */}
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="text-center"
          >
            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
            >
              Get in Touch
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed"
            >
              Have questions? We'd love to hear from you. Send us a message and
              we'll respond as soon as possible.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section - Two Column Layout */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-8 items-start">
            {/* LEFT COLUMN - Contact Information Cards (40%) */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2 h-full flex flex-col gap-4"
            >
              {/* Phone Card */}
              <motion.div
                whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 flex-1 flex flex-col justify-center"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                  <FaPhoneAlt className="text-white text-xl" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">
                  Call Us
                </h3>
                <p className="text-gray-500 text-sm mb-3">Mon-Sat: 8AM - 5PM</p>
                <a
                  href={CONTACT.phoneUrl}
                  className="text-amber-500 font-semibold hover:text-orange-700"
                >
                  {CONTACT.phoneDisplay}
                </a>
              </motion.div>

              {/* WhatsApp Card */}
              <motion.div
                whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 flex-1 flex flex-col justify-center"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                  <FaWhatsapp className="text-white text-2xl" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">
                  WhatsApp
                </h3>
                <p className="text-gray-500 text-sm mb-3">Quick response</p>
                <a
                  href={CONTACT.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 font-semibold hover:text-green-700"
                >
                  {CONTACT.whatsappDisplay}
                </a>
              </motion.div>

              {/* Email Card */}
              <motion.div
                whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 flex-1 flex flex-col justify-center"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                  <FaEnvelope className="text-white text-xl" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">Email</h3>
                <p className="text-gray-500 text-sm mb-3">
                  We reply within 24h
                </p>
                <a
                  href={CONTACT.emailUrl}
                  className="text-amber-500 font-semibold hover:text-orange-700 break-all"
                >
                  {CONTACT.email}
                </a>
              </motion.div>
            </motion.div>

            {/* RIGHT COLUMN - Contact Form (60%) */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-3 h-full"
            >
              <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100 h-full">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Send us a Message
                  </h2>
                  <p className="text-gray-500 text-sm">
                    Fill in the form below and we'll get back to you shortly
                  </p>
                </div>

                {/* Success Message */}
                <AnimatePresence>
                  {showSuccess && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, height: 0 }}
                      animate={{ opacity: 1, scale: 1, height: "auto" }}
                      exit={{ opacity: 0, scale: 0.95, height: 0 }}
                      className="mb-4 p-3 bg-green-50 border border-green-200 rounded-xl flex items-center gap-2"
                    >
                      <MdCheckCircle className="text-green-500 text-xl shrink-0" />
                      <p className="text-green-700 text-sm font-medium">
                        Opening WhatsApp... Please wait!
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Full Name Field */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <FaUser className="text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={handleNameChange}
                        placeholder="Enter your full name"
                        className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl transition-all duration-200 outline-none text-gray-700 placeholder-gray-400 ${
                          errors.name
                            ? "border-red-300 bg-red-50 focus:border-red-500"
                            : "border-gray-200 bg-gray-50 focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-100"
                        }`}
                      />
                    </div>
                    {errors.name && (
                      <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                        <FiAlertCircle className="text-xs" />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Mobile Number Field */}
                  <div>
                    <label
                      htmlFor="mobile"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Mobile Number <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <FaPhone className="text-gray-400" />
                      </div>
                      <input
                        type="tel"
                        id="mobile"
                        value={mobile}
                        onChange={handleMobileChange}
                        placeholder="Enter 10-digit mobile number"
                        maxLength={15}
                        className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl transition-all duration-200 outline-none text-gray-700 placeholder-gray-400 ${
                          errors.mobile
                            ? "border-red-300 bg-red-50 focus:border-red-500"
                            : "border-gray-200 bg-gray-50 focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-100"
                        }`}
                      />
                    </div>
                    {errors.mobile && (
                      <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                        <FiAlertCircle className="text-xs" />
                        {errors.mobile}
                      </p>
                    )}
                  </div>

                  {/* Message Field */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Your Message{" "}
                      <span className="text-gray-400">(Optional)</span>
                    </label>
                    <div className="relative">
                      <textarea
                        id="message"
                        value={message}
                        onChange={handleMessageChange}
                        placeholder="How can we help you?"
                        rows={3}
                        className="w-full px-4 py-3 border-2 border-gray-200 bg-gray-50 rounded-xl transition-all duration-200 outline-none text-gray-700 placeholder-gray-400 focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-100 resize-none"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                    className={`w-full py-4 px-6 rounded-xl font-bold text-white transition-all duration-200 flex items-center justify-center gap-3 shadow-lg ${
                      isSubmitting
                        ? "bg-green-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 hover:shadow-orange-200"
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        />
                        Opening WhatsApp...
                      </>
                    ) : (
                      <>
                        <FaWhatsapp className="text-xl" />
                        Send via WhatsApp
                        <FaPaperPlane className="text-sm opacity-70" />
                      </>
                    )}
                  </motion.button>
                </form>

                {/* Info Note */}
                <div className="mt-6 p-4 bg-orange-50 rounded-xl border border-orange-100">
                  <p className="text-xs text-amber-500 text-center">
                    💬 Your message will be sent directly to our WhatsApp.
                    Please ensure WhatsApp is installed on your device.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Google Map Section - Full Width Below Contact Section */}
      <section className="pb-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl p-[0.5] shadow-xl border border-gray-100"
          >
            <div className="relative rounded-3xl overflow-hidden h-[450px] lg:h-[500px]">
              <iframe
                src={CONTACT.mapEmbedUrl}
                width="100%"
                height="100%"
                allowFullScreen
              />
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
