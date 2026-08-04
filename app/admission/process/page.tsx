"use client";

import HeroAdmission from "@/components/admission/HeroAdmission";
import AdmissionProcess from "@/components/admission/AdmissionProcess";

export default function AdmissionProcessPage() {
  return (
    <main className="bg-white">
      <HeroAdmission
        title="Admission Process"
        subtitle="A simple and transparent admission journey designed to help parents and students feel confident at every step."
      />
      <AdmissionProcess />
    </main>
  );
}
