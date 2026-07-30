"use client";

import Image from "next/image";
import { FaFacebook, FaInstagram, FaYoutube, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock } from "react-icons/fa";
import { motion } from "framer-motion";
import { CONTACT } from "@/config/contact";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Academics", href: "/academics" },
  { name: "Gallery", href: "/gallery" },
  { name: "Contact", href: "/contact" },
];

const usefulLinks = [
  { name: "Admission", href: "/admission" },
  { name: "Notice Board", href: "/admin/add-notice" },
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Terms & Conditions", href: "/terms" },
];

const socialLinks = [
  { name: "Facebook", icon: FaFacebook, href: CONTACT.facebook },
  { name: "Instagram", icon: FaInstagram, href: CONTACT.instagram },
  { name: "YouTube", icon: FaYoutube, href: CONTACT.youtube },
];

export default function Footer() {
  return (
    <footer className="bg-[#111827] text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          
          {/* Column 1: School Info & Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-4 text-center md:text-left"
          >
            {/* Logo */}
            <div className="flex items-center justify-center md:justify-start space-x-3">
              <Image
                src="/images/logo.png"
                alt="Noza Convent School Logo"
                width={48}
                height={48}
                className="w-12 h-12 object-contain"
              />
              <div>
                <h3 className="text-white font-bold text-lg leading-tight">Noza Convent School</h3>
                <p className="text-orange-400 text-xs">Public School</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Nurturing young minds with excellence in education, character building, and holistic development since inception.
            </p>
            <div className="flex justify-center md:justify-start space-x-3 pt-2">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-amber-500 flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300"
                  aria-label={social.name}
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Column 2: Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4 text-center md:text-left"
          >
            <h3 className="text-white font-semibold text-lg flex items-center md:justify-end lg:justify-start group px-3 py-2">
              Quick Links
              {/* <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-amber-500 rounded"></span> */}
            </h3>
            <ul className="flex flex-wrap justify-center md:flex-col md:justify-start gap-2 pt-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    
                    className="pointer-events-none opacity-70 text-gray-400 hover:text-orange-400 transition-colors duration-300 text-sm flex items-center md:justify-end lg:justify-start group px-3 py-1"
                  >
                    <span className="w-0 h-0.5 bg-amber-500 mr-2 group-hover:w-2 group-hover:mr-2 transition-all duration-300"></span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3: Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4 text-center md:text-left"
          >
            <h3 className="text-white font-semibold text-lg relative inline-block">
              Contact Info
              {/* <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-amber-500 rounded"></span> */}
            </h3>
            <ul className="space-y-4 pt-4">
              <li className="flex items-start justify-center md:justify-start space-x-3">
                <FaMapMarkerAlt className="text-orange-500 mt-1 flex-shrink-0" size={16} />
                <span className="text-gray-400 text-sm leading-relaxed">
                  Noza Convent School, Maniar, Chhitoni, Dewrar, Uttar Pradesh 277302
                </span>
              </li>
              <li className="flex items-center justify-center md:justify-start space-x-3">
                <FaPhoneAlt className="text-orange-500 flex-shrink-0" size={16} />
                <a href={`tel:${CONTACT.phoneNumber}`} className="text-gray-400 hover:text-orange-400 transition-colors text-sm">
                  {CONTACT.phoneNumber}
                </a>
              </li>
              <li className="flex items-center justify-center md:justify-start space-x-3">
                <FaEnvelope className="text-orange-500 flex-shrink-0" size={16} />
                <a href={`mailto:${CONTACT.email}`} className="text-gray-400 hover:text-orange-400 transition-colors text-sm">
                  {CONTACT.email}
                </a>
              </li>
              <li className="flex items-start justify-center md:justify-start space-x-3">
                <FaClock className="text-orange-500 mt-1 flex-shrink-0" size={16} />
                <span className="text-gray-400 text-sm">
                  Mon - Sat: 8:00 AM - 6:00 PM
                </span>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 text-center md:text-left">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Noza Convent School. All rights reserved.
            </p>
            <p className="text-gray-500 text-xs">
              Designed & Developed by <a href="https://www.hasviktech.com" target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:text-orange-400 transition-colors">HASVIK Technologies</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
