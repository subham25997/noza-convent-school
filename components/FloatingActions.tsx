"use client";

import { FaWhatsapp } from "react-icons/fa";
import { CONTACT } from "@/config/contact";

export default function FloatingActions() {
  const whatsappMessage = "Hello! I would like to inquire about Noza Convent School.";

  const handleWhatsAppClick = () => {
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `${CONTACT.whatsappUrl}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={handleWhatsAppClick}
        className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition hover:bg-green-600"
        aria-label="Contact us on WhatsApp"
        title="Contact us on WhatsApp"
      >
        <FaWhatsapp size={30} />
      </button>
    </div>
  );
}
