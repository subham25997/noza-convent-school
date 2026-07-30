"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { TfiEmail } from "react-icons/tfi";
import { PiPhone } from "react-icons/pi";
import { FaFacebook, FaYoutube } from "react-icons/fa";
import { BsInstagram } from "react-icons/bs";
import { CONTACT } from "@/config/contact";

type NavItem = {
  label: string;
  href?: string;
  children?: NavItem[];
  disabled?: boolean;
};

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const navRef = useRef<HTMLDivElement>(null);

  const navLinks: NavItem[] = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us"},
    {
      label: "Academics", disabled: true,
      children: [
        { href: "/academics/curriculum", label: "Curriculum" },
        { href: "/academics/co-curricular", label: "Co-Curricular" },
        { href: "/academics/calender", label: "Calender" },
      ],
    },
    { href: "/gallery", label: "Gallery", disabled: true },
    { href: "/contact", label: "Contact Us" },
  ];

  const contactDetails = {
    contactNumber: CONTACT.phoneDisplay,
    emailId: CONTACT.email,
    facebookPage: CONTACT.facebook,
    instaPage: CONTACT.instagram,
    youtubePage: CONTACT.youtube,
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setActiveDropdown(null);
    setMenuOpen(false);
  }, [pathname]);

  const renderNavItem = (item: NavItem, isMobile = false) => {
    const hasChildren = Boolean(item.children?.length);
    const isOpen = activeDropdown === item.label;
    const isActive = item.href
      ? pathname === item.href || pathname.startsWith(`${item.href}/`)
      : pathname === "/academics" || pathname.startsWith("/academics/");

    if (isMobile) {
      return (
        <li key={item.label}>
          {hasChildren ? (
            <>
              <button
                type="button"
                disabled={item.disabled}
                onClick={() => setActiveDropdown(isOpen ? null : item.label)}
                className={`flex w-full items-center justify-between px-6 py-3 text-left transition ${
                  isActive ? "text-amber-500" : "text-gray-900 hover:text-amber-500"
                }`}
              >
                <span>{item.label}</span>
                <span className={`text-sm transition-transform ${isOpen ? "rotate-180" : ""}`}>
                  ▾
                </span>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.ul
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden bg-gray-50"
                  >
                    {item.children?.map((child) => {
                      const isChildActive =
                        pathname === child.href || pathname.startsWith(`${child.href}/`);

                      return (
                        <li key={child.label}>
                          <Link
                            href={child.href ?? "/"}
                            onClick={() => {
                              setMenuOpen(false);
                              setActiveDropdown(null);
                            }}
                            className={`block px-8 py-2 text-sm transition ${
                              isChildActive
                                ? "text-amber-500"
                                : "text-gray-700 hover:text-amber-500"
                            }`}
                          >
                            {child.label}
                          </Link>
                        </li>
                      );
                    })}
                  </motion.ul>
                )}
              </AnimatePresence>
            </>
          ) : (
            <Link
              href={item.href ?? "/"}
              onClick={() => setMenuOpen(false)}
              className={`block px-6 py-3 transition ${
                isActive ? "text-amber-500" : "text-gray-900 hover:text-amber-500"
              }`}
              
            >
              {item.label}
            </Link>
          )}
        </li>
      );
    }

    return (
      <li
        key={item.label}
        className="relative"
        onMouseEnter={() => hasChildren && setActiveDropdown(item.label)}
        onMouseLeave={() => setActiveDropdown(null)}
      >
        {hasChildren ? (
          <>
            <button
              type="button"
              onClick={() => setActiveDropdown(isOpen ? null : item.label)}
              className={`flex items-center gap-1 px-2 py-2 font-semibold transition-colors duration-300 ${
                isActive ? "text-amber-500" : "text-gray-800 hover:text-amber-500"
              }
              ${item.disabled ? "pointer-events-none opacity-50" : ""}`}
              aria-expanded={isOpen}
              aria-haspopup="true"
            >
              <span>{item.label}</span>
              <span className={`text-sm transition-transform ${isOpen && !item.disabled ? "rotate-180" : ""}`}>
                ▾
              </span>
            </button>

            <AnimatePresence>
              {isOpen && !item.disabled && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="absolute left-0 top-full mt-3 w-56 rounded-xl border border-gray-200 bg-white p-2 shadow-xl"
                >
                  {item.children?.map((child) => {
                    const isChildActive =
                      pathname === child.href || pathname.startsWith(`${child.href}/`);

                    return (
                      <Link
                        key={child.label}
                        href={child.href ?? "/"}
                        onClick={() => setActiveDropdown(null)}
                        className={`block rounded-lg px-3 py-2 text-sm font-medium transition ${
                          isChildActive
                            ? "bg-orange-50 text-amber-500"
                            : "text-gray-700 hover:bg-gray-50 hover:text-amber-500"
                        }`}
                      >
                        {child.label}
                      </Link>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </>
        ) : (
          <Link
            href={item.href ?? "/"}
            className={`relative px-2 py-2 font-semibold transition-colors duration-300 ${
              isActive ? "text-amber-500" : "text-gray-800 hover:text-amber-500"
            } ${item.disabled ? "pointer-events-none opacity-50" : ""}`}
            aria-disabled={item.disabled}
            tabIndex={item.disabled ? -1 : undefined}
            onClick={(e) => {
              if (item.disabled) {
                e.preventDefault();
              }
            }}
          >
            {item.label}
          </Link>
        )}
      </li>
    );
  };

  return (
    <>
      <div className="bg-white border-b border-gray-200 hidden md:flex">
        <div className="flex items-center justify-between px-8 h-8 max-w-7xl w-full text-sm text-gray-900 mx-auto">
          <div className="flex items-center">
            <TfiEmail className="me-3 text-blue-600 text-lg text-semibold" />
            <span className="me-6">{contactDetails.emailId}</span>

            <PiPhone className="me-2 text-green-600 text-lg text-semibold" />
            <span>{contactDetails.contactNumber}</span>
          </div>

          <div className="flex items-center gap-5">
            <Link href={contactDetails.facebookPage} target="_blank">
              <FaFacebook className="text-blue-600 hover:scale-110 transition" />
            </Link>
            <Link href={contactDetails.instaPage} target="_blank">
              <BsInstagram className="text-pink-500 hover:scale-110 transition" />
            </Link>
            <Link href={contactDetails.youtubePage} target="_blank">
              <FaYoutube className="text-red-600 hover:scale-110 transition text-lg" />
            </Link>
          </div>
        </div>
      </div>

      <motion.nav
        initial={false}
        whileInView={{}}
        className="sticky top-0 z-50 bg-white shadow-md transition-all duration-300"
      >
        <div ref={navRef} className="max-w-7xl mx-auto flex items-center justify-between px-6 h-16">
          <Link href="/" className="flex gap-2 items-center">
            <img
              src="/images/logo.png"
              alt="Noza Convent School Public School Logo"
              className="w-14 h-14 object-contain"
            />
            <div className="ms-3">
              <h5 className="font-bold text-2xl text-amber-500 leading-tight">Noza Convent School</h5>
              <p className="text-xs font-semibold text-lime-600 uppercase tracking-wider">
                Public School
              </p>
            </div>
          </Link>

          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => renderNavItem(link))}
          </ul>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-1.5"
            aria-label="Toggle navigation menu"
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className="w-6 h-0.5 bg-gray-700"
            />
            <motion.span
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="w-6 h-0.5 bg-gray-700"
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              className="w-6 h-0.5 bg-gray-700"
            />
          </button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-white/95 backdrop-blur-lg shadow-lg overflow-hidden"
            >
              <ul className="flex flex-col py-4 font-semibold text-gray-900">
                {navLinks.map((link) => renderNavItem(link, true))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
