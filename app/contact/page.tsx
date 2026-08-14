"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import {
  FaWhatsapp,
  FaUser,
  FaPhone,
  FaPaperPlane,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaChevronDown,
  FaChevronUp,
  FaDirections,
  FaGraduationCap,
  FaUsers,
  FaQuestionCircle,
  FaPhoneAlt,
  FaRegCheckCircle,
} from "react-icons/fa";
import { FiAlertCircle } from "react-icons/fi";
import { MdCheckCircle } from "react-icons/md";
import { CONTACT } from "@/config/contact";

const heroVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.75 } },
};

const contentVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, delay: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: 0.05 * index },
  }),
};

type FormState = {
  studentName: string;
  parentName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

type QuickContactCard = {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  href: string;
  helper: string;
};

type FAQItem = {
  question: string;
  answer: string;
};

function SectionHeading({
  label,
  title,
  subtitle,
}: {
  label: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="max-w-3xl mb-8 sm:mb-10 md:mb-12">
      <p className="mt-4 text-xs font-semibold uppercase tracking-[0.45em] text-amber-600">
        {label}
      </p>
      <h2 className="mt-4 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl md:text-4xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base sm:leading-8 md:text-lg">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

function TextInput({
  label,
  icon: Icon,
  id,
  value,
  onChange,
  placeholder,
  type = "text",
  error,
  autoComplete,
}: {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  id: keyof FormState;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: string;
  error?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold text-slate-900">
        {label}
      </label>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-amber-600">
          <Icon className="text-base" />
        </div>
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={`w-full rounded-2xl border bg-white py-3 pl-12 pr-4 text-sm text-slate-900 outline-none transition duration-300 placeholder:text-slate-400 focus:shadow-[0_0_0_4px_rgba(245,158,11,0.14)] ${
            error
              ? "border-red-300 focus:border-red-400"
              : "border-slate-200 focus:border-amber-500"
          }`}
        />
      </div>
      {error ? (
        <p className="mt-2 flex items-center gap-1 text-sm text-red-500">
          <FiAlertCircle className="text-xs" />
          {error}
        </p>
      ) : null}
    </div>
  );
}

function InfoPill({
  icon: Icon,
  title,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-slate-200/80 bg-white/90 p-4 shadow-sm backdrop-blur-sm">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-lime-50 text-lime-700">
        <Icon className="text-base" />
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-600">
          {title}
        </p>
        <p className="mt-1 text-sm leading-6 text-slate-800">{value}</p>
      </div>
    </div>
  );
}

export default function Contact() {
  const [form, setForm] = useState<FormState>({
    studentName: "",
    parentName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const quickContactCards: QuickContactCard[] = useMemo(
    () => [
      {
        icon: FaMapMarkerAlt,
        label: "Address",
        value: "Noza Convent School, Maniar, Chhitoni, Dewrar, Uttar Pradesh 277302",
        href: CONTACT.locationUrl,
        helper: "Find us on Google Maps",
      },
      {
        icon: FaPhoneAlt,
        label: "Phone",
        value: CONTACT.phoneDisplay,
        href: CONTACT.phoneUrl,
        helper: "Call our office team",
      },
      {
        icon: FaEnvelope,
        label: "Email",
        value: CONTACT.email,
        href: CONTACT.emailUrl,
        helper: "Write to our admissions desk",
      },
      {
        icon: FaClock,
        label: "Office Hours",
        value: "Mon - Sat | 8:00 AM - 6:00 PM",
        href: CONTACT.locationUrl,
        helper: "Best time to reach us",
      },
    ],
    []
  );

  const whyContactUs = [
    {
      icon: FaGraduationCap,
      title: "Admission Support",
      description: "Get guidance on admissions, documents, and school visit planning.",
    },
    {
      icon: FaQuestionCircle,
      title: "Academic Queries",
      description: "Ask about curriculum, class details, and learning support for your child.",
    },
    {
      icon: FaUsers,
      title: "Career Guidance",
      description: "Understand the school journey and opportunities for student development.",
    },
    {
      icon: FaRegCheckCircle,
      title: "General Enquiry",
      description: "Connect with our team for any school-related information or follow-up.",
    },
  ];

  const faqs: FAQItem[] = [
    {
      question: "How can I apply?",
      answer: "You can submit an enquiry through the form, call the school office, or visit the campus for admission guidance.",
    },
    {
      question: "School timings?",
      answer: "Our office timings are Mon - Sat, 8:00 AM - 6:00 PM. You can reach us during these hours for support.",
    },
    {
      question: "Fee enquiry?",
      answer: "Please contact the school office or submit the form and our team will share the fee details with you.",
    },
    {
      question: "Transport facility?",
      answer: "Please contact our team to confirm route availability and transport support for your area.",
    },
    {
      question: "Documents required?",
      answer: "Our admission team will guide you on the required documents depending on the class and admission category.",
    },
  ];

  const validateForm = () => {
    const nextErrors: FormErrors = {};

    if (!form.studentName.trim()) nextErrors.studentName = "Student name is required";
    if (!form.parentName.trim()) nextErrors.parentName = "Parent name is required";
    if (!form.email.trim()) nextErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      nextErrors.email = "Enter a valid email address";
    }
    if (!form.phone.trim()) nextErrors.phone = "Phone number is required";
    else if (!/^[0-9+\-\s]{10,15}$/.test(form.phone.trim())) {
      nextErrors.phone = "Enter a valid phone number";
    }
    if (!form.subject.trim()) nextErrors.subject = "Subject is required";
    if (!form.message.trim()) nextErrors.message = "Message is required";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please complete the required fields.");
      return;
    }

    setIsSubmitting(true);
    setShowSuccess(true);
    const loadingToast = toast.loading("Preparing your enquiry...");

    const enquiry = [
      `Student Name: ${form.studentName.trim()}`,
      `Parent Name: ${form.parentName.trim()}`,
      `Email: ${form.email.trim()}`,
      `Phone: ${form.phone.trim()}`,
      `Subject: ${form.subject.trim()}`,
      `Message: ${form.message.trim()}`,
    ].join("\n");

    const whatsappUrl = `${CONTACT.whatsappUrl}?text=${encodeURIComponent(`Hello, I would like to enquire about admissions at Noza Convent School.\n\n${enquiry}`)}`;

    window.setTimeout(() => {
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
      toast.success("Opening WhatsApp for your enquiry.", { id: loadingToast });
      setIsSubmitting(false);
      setShowSuccess(false);
    }, 500);
  };

  return (
    <main className="bg-slate-50 text-slate-900">
      <motion.section
        initial="hidden"
        animate="visible"
        variants={heroVariants}
        className="relative min-h-[32rem] w-full overflow-hidden sm:min-h-[36rem]"
      >
        <motion.div
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-0 bg-[url('/images/gallery2/contactusg2.jpg')] bg-cover bg-center bg-no-repeat"
        />
        <div
          className="absolute inset-0 bg-[linear-gradient(110deg,rgba(15,23,42,.72),rgba(54,87,30,.56),rgba(15,23,42,.42))]"
          aria-hidden="true"
        />
        <motion.div
          variants={contentVariants}
          className="relative z-10 mx-auto flex min-h-[32rem] w-full max-w-5xl flex-col items-center justify-center px-5 text-center sm:min-h-[36rem] sm:px-6"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.48em] text-amber-200">
            Contact Us
          </p>
          <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-[1.05] tracking-[-0.04em] text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Let&apos;s Connect With Noza Convent School
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-white/85 sm:text-lg md:text-xl">
            We&apos;re always here to answer your questions, guide admissions, and help you connect with our school.
          </p>
        </motion.div>
      </motion.section>

      <section className="relative -mt-10 bg-transparent px-4 pb-16 sm:px-6 sm:pb-20 md:pb-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {quickContactCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <motion.a
                  key={card.label}
                  href={card.href}
                  target={card.label === "Phone" || card.label === "Email" ? undefined : "_blank"}
                  rel={card.label === "Phone" || card.label === "Email" ? undefined : "noopener noreferrer"}
                  custom={index}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.25 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="group flex min-h-[17rem] flex-col rounded-[1.5rem] border border-slate-200/80 bg-white p-6 shadow-[0_24px_60px_-35px_rgba(15,23,42,0.38)] transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_30px_70px_-35px_rgba(15,23,42,0.5)]"
                >
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-lime-50 text-lime-700 ring-8 ring-lime-50/70 transition duration-300 group-hover:rotate-3 group-hover:bg-amber-50 group-hover:text-amber-700 group-hover:ring-amber-50/70">
                    <Icon className="text-2xl" />
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-[0.32em] text-amber-600">
                    {card.label}
                  </p>
                  <h3 className="mt-2 break-words text-base font-semibold leading-7 text-slate-950 sm:text-lg">{card.value}</h3>
                  <p className="mt-auto pt-5 text-sm leading-7 text-slate-500">{card.helper}</p>
                </motion.a>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200/70 bg-white px-4 py-16 sm:px-6 sm:py-20 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="rounded-[1.75rem] border border-slate-200/80 bg-white p-6 shadow-[0_24px_60px_-35px_rgba(15,23,42,0.35)] sm:p-8"
          >
            <SectionHeading
              label="Reach Out"
              title="Send us a message"
              subtitle="Share your details and we will respond through WhatsApp with the next steps for admissions or any school-related query."
            />

            <AnimatePresence>
              {showSuccess ? (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.98 }}
                  className="mb-6 flex items-center gap-3 rounded-2xl border border-lime-200 bg-lime-50 px-4 py-3 text-sm text-lime-800"
                >
                  <MdCheckCircle className="text-lg" />
                  Opening WhatsApp with your enquiry...
                </motion.div>
              ) : null}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
              <TextInput
                label="Student Name"
                icon={FaUser}
                id="studentName"
                value={form.studentName}
                onChange={(value) => setForm((prev) => ({ ...prev, studentName: value }))}
                placeholder="Enter student name"
                error={errors.studentName}
                autoComplete="name"
              />
              <TextInput
                label="Parent Name"
                icon={FaUser}
                id="parentName"
                value={form.parentName}
                onChange={(value) => setForm((prev) => ({ ...prev, parentName: value }))}
                placeholder="Enter parent name"
                error={errors.parentName}
                autoComplete="name"
              />
              <TextInput
                label="Email"
                icon={FaEnvelope}
                id="email"
                value={form.email}
                onChange={(value) => setForm((prev) => ({ ...prev, email: value }))}
                placeholder="Enter email address"
                type="email"
                error={errors.email}
                autoComplete="email"
              />
              <TextInput
                label="Phone"
                icon={FaPhone}
                id="phone"
                value={form.phone}
                onChange={(value) => setForm((prev) => ({ ...prev, phone: value }))}
                placeholder="Enter phone number"
                type="tel"
                error={errors.phone}
                autoComplete="tel"
              />
              <div className="sm:col-span-2">
                <TextInput
                  label="Subject"
                  icon={FaPaperPlane}
                  id="subject"
                  value={form.subject}
                  onChange={(value) => setForm((prev) => ({ ...prev, subject: value }))}
                  placeholder="Admission enquiry, fee enquiry, etc."
                  error={errors.subject}
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="message" className="mb-2 block text-sm font-semibold text-slate-900">
                  Message
                </label>
                <textarea
                  id="message"
                  value={form.message}
                  onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
                  placeholder="Write your message here"
                  rows={5}
                  className={`w-full rounded-2xl border bg-white px-4 py-3 text-sm text-slate-900 outline-none transition duration-300 placeholder:text-slate-400 focus:shadow-[0_0_0_4px_rgba(245,158,11,0.14)] ${
                    errors.message
                      ? "border-red-300 focus:border-red-400"
                      : "border-slate-200 focus:border-amber-500"
                  }`}
                />
                {errors.message ? (
                  <p className="mt-2 flex items-center gap-1 text-sm text-red-500">
                    <FiAlertCircle className="text-xs" />
                    {errors.message}
                  </p>
                ) : null}
              </div>

              <div className="sm:col-span-2">
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-slate-950 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_18px_40px_-20px_rgba(15,23,42,0.7)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-[0_24px_48px_-20px_rgba(15,23,42,0.75)] disabled:cursor-not-allowed disabled:opacity-80"
                >
                  {isSubmitting ? (
                    <>
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="h-5 w-5 rounded-full border-2 border-white border-t-transparent"
                      />
                      Opening WhatsApp...
                    </>
                  ) : (
                    <>
                      <FaWhatsapp className="text-lg" />
                      Submit Enquiry
                      <FaPaperPlane className="text-sm opacity-80" />
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative overflow-hidden rounded-[1.75rem] border border-slate-800 bg-slate-950 p-6 text-white shadow-[0_24px_60px_-30px_rgba(15,23,42,0.65)] sm:p-8"
          >
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-lime-400/20 blur-3xl" />
            <div className="absolute -bottom-14 -left-10 h-44 w-44 rounded-full bg-amber-400/15 blur-3xl" />

            <div className="relative">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-sm">
                  <Image src="/images/logo.png" alt="Noza Convent School Logo" width={48} height={48} className="h-12 w-12 object-contain" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.32em] text-lime-300">Noza Convent School</p>
                  <h3 className="mt-1 text-2xl font-semibold text-white">We&apos;re here to help</h3>
                </div>
              </div>

              <div className="mt-6 rounded-3xl border border-white/10 bg-white/10 p-5 shadow-sm">
                <p className="text-sm leading-7 text-white/70">
                  <span className="font-semibold text-white">Principal Message:</span> We welcome every enquiry and are committed to guiding families with clarity and care.
                </p>
              </div>

              <div className="mt-5 space-y-4">
                <InfoPill icon={FaPhoneAlt} title="Admission Helpline" value={CONTACT.phoneDisplay} />
                <InfoPill icon={FaPhone} title="Emergency Contact" value={CONTACT.phoneDisplay} />
                <InfoPill icon={FaClock} title="Working Hours" value="Mon - Sat | 8:00 AM - 6:00 PM" />
              </div>

              <div className="mt-5">
                <div className="flex flex-col justify-between gap-3 rounded-3xl border border-white/10 bg-white/5 p-5 shadow-sm">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.32em] text-amber-300">Need help fast?</p>
                    <p className="mt-2 text-sm leading-7 text-white/65">
                      Use WhatsApp or call our office for a quick response.
                    </p>
                  </div>
                  <a
                    href={CONTACT.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-full bg-lime-500 px-5 py-3 text-sm font-semibold text-lime-950 shadow-md transition duration-300 hover:-translate-y-0.5 hover:bg-lime-300"
                  >
                    <FaWhatsapp className="mr-2 text-base" />
                    WhatsApp Us
                  </a>
                </div>
              </div>
            </div>
          </motion.aside>
        </div>
      </section>

      <section className="bg-slate-50 px-4 py-16 sm:px-6 sm:py-20 md:py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            label="Visit Us"
            title="Find our campus"
            subtitle="We are easy to locate and ready to welcome your visit. Use the map or open directions below."
          />

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white shadow-[0_24px_60px_-35px_rgba(15,23,42,0.35)]"
          >
            <div className="relative h-95 sm:h-112.5 lg:h-130">
              <iframe
                src={CONTACT.mapEmbedUrl}
                width="100%"
                height="100%"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
            <div className="flex flex-col gap-4 border-t border-slate-200 bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm leading-7 text-slate-600">
                <span className="font-semibold text-slate-950">Address:</span> Noza Convent School, Maniar, Chhitoni, Dewrar, Uttar Pradesh 277302
              </p>
              <a
                href={CONTACT.locationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-md transition duration-300 hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-lg"
              >
                <FaDirections className="mr-2" />
                Directions
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="border-y border-slate-200/70 bg-white px-4 py-16 sm:px-6 sm:py-20 md:py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            label="Why Contact Us"
            title="Support for every school-related need"
            subtitle="Choose the right reason to reach out and our team will guide you quickly and clearly."
          />

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {whyContactUs.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.article
                  key={item.title}
                  custom={index}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group rounded-[1.5rem] border border-slate-200/80 bg-white p-6 shadow-[0_20px_50px_-32px_rgba(15,23,42,0.35)] transition-all duration-300 hover:-translate-y-1 hover:border-amber-200 hover:shadow-[0_28px_60px_-32px_rgba(15,23,42,0.42)]"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-lime-50 text-lime-700 ring-8 ring-lime-50/70 transition duration-300 group-hover:rotate-3 group-hover:bg-amber-50 group-hover:text-amber-700">
                    <Icon className="text-xl" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-950">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-4 py-16 sm:px-6 sm:py-20 md:py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            label="FAQ"
            title="Frequently asked questions"
            subtitle="Find quick answers to common questions about admissions, school timings, transport, and documents."
          />

          <div className="mx-auto max-w-4xl space-y-4">
            {faqs.map((item, index) => {
              const open = openFaq === index;
              return (
                <motion.div
                  key={item.question}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: index * 0.05 }}
                  className="overflow-hidden rounded-[1.5rem] border border-slate-200/80 bg-white shadow-[0_18px_48px_-32px_rgba(15,23,42,0.35)]"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(open ? null : index)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className="text-base font-semibold text-slate-950 sm:text-lg">{item.question}</span>
                    {open ? (
                      <FaChevronUp className="shrink-0 text-amber-600" />
                    ) : (
                      <FaChevronDown className="shrink-0 text-amber-600" />
                    )}
                  </button>
                  <AnimatePresence initial={false}>
                    {open ? (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden border-t border-slate-200 px-6 py-5"
                      >
                        <p className="text-sm leading-7 text-slate-600 sm:text-base">{item.answer}</p>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-16 sm:px-6 sm:py-20 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-[2rem] border border-slate-800 bg-slate-950 px-6 py-10 shadow-[0_28px_70px_-35px_rgba(15,23,42,0.6)] sm:px-8 sm:py-12 md:px-12">
            <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.45em] text-amber-300">
                  Next Step
                </p>
                <h2 className="mt-4 text-2xl font-semibold tracking-tight text-white sm:text-3xl md:text-4xl">
                  Ready to Visit Our Campus?
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-white/65 sm:text-base sm:leading-8 md:text-lg">
                  We would be glad to meet you, answer your questions, and help you take the next step with confidence.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 lg:justify-end">
                <a
                  href={CONTACT.locationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-lime-400 px-6 py-3 text-sm font-semibold text-lime-950 shadow-md transition duration-300 hover:-translate-y-0.5 hover:bg-lime-300 hover:shadow-lg"
                >
                  Book a School Visit
                </a>
                <a
                  href={CONTACT.phoneUrl}
                  className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white shadow-md transition duration-300 hover:border-amber-300 hover:bg-white/15 hover:text-amber-200 hover:shadow-lg"
                >
                  Call Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
