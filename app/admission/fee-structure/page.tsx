import HeroAdmission from "@/components/admission/HeroAdmission";
import FeeStructure from "@/components/admission/fee-structure/FeeStructure";

export const metadata = {
  title: "Fee Structure | Noza Convent School",
  description:
    "Class-wise tuition fees and admission, exam, and transport fee details for Noza Convent School.",
};

export default function FeeStructurePage() {
  return (
    <main className="bg-white">
      <HeroAdmission
        title="Fee Structure"
        subtitle="Review the latest tuition, admission, examination, and transport fee details for the academic session."
      />

      <section className="px-4 sm:px-6 py-8 sm:py-12 md:py-16">
       <div className="mx-auto max-w-6xl">
          <FeeStructure />
        </div>
      </section>
    </main>
  );
}
