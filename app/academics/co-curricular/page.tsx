import CoCurricularHero from "@/components/academics/co-curricular/CoCurricularHero";
import CoCurricularSection from "@/components/academics/co-curricular/CoCurricularSection";
import { coCurricularData } from "@/data/coCurricularData";

export const metadata = {
  title: "Co-Curricular | Noza Convent School",
  description: "Discover the co-curricular activities and vibrant learning experiences at Noza Convent School.",
};

export default function CoCurricularPage() {
  return (
    <main className="bg-white">
      <CoCurricularHero />

      <section className="px-4 py-12 sm:px-6 sm:py-16 md:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-500">
              Learning Beyond the Classroom
            </p>
            <h2 className="mt-3 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
              A vibrant blend of creativity, culture, sports and excellence
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-gray-600 sm:text-lg">
              Our co-curricular programmes encourage students to discover their talents, build confidence, and grow into balanced individuals.
            </p>
          </div>

          <div className="space-y-8 md:space-y-12">
            {coCurricularData.map((section) => (
              <CoCurricularSection key={section.id} section={section} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
