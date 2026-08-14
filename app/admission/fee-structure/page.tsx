"use client";

import HeroAdmission from "@/components/admission/HeroAdmission";
import { CONTACT } from "@/config/contact";
import { BiWallet } from "react-icons/bi";

export default function FeeStructurePage() {
  return (
    <main className="bg-white">
      <HeroAdmission
        title="Fee Structure"
        subtitle="Class-wise fee details will be published here shortly."
      />

      <section className="px-4 sm:px-6 py-16 sm:py-20 md:py-24">
        <div className="max-w-3xl mx-auto text-center border border-gray-200 rounded-2xl sm:rounded-3xl bg-gray-50 p-8 sm:p-12">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-green-600">
            <BiWallet size={26} />
          </div>

          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">
            Fee Structure Coming Soon
          </h2>

          <p className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed">
            We're finalising the class-wise fee details for this academic year.
            In the meantime, please contact the school office for the latest fee
            information.
          </p>

          <div className="mt-6 space-y-2 text-sm text-gray-700">
            <p className="font-medium">Phone: {CONTACT.phoneDisplay}</p>
            <p className="font-medium">Email: {CONTACT.email}</p>
          </div>

          <a
            href={`${CONTACT.whatsappUrl}?text=${encodeURIComponent(
              "Hello, I would like to know the fee structure at Noza Convent School.",
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex rounded-full bg-amber-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-amber-600"
          >
            Ask About Fees on WhatsApp
          </a>
        </div>
      </section>
    </main>
  );
}
