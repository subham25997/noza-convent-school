import { getSchedule } from "@/services/schedule.service";
import { getAcademicYear } from "@/utils/year";
import ScheduleTable from "@/components/academics/exam-schedule/ScheduleTable";
import { BiSolidStar } from "react-icons/bi";

export const metadata = {
  title: "Examination Schedule | Noza Convent School",
  description:
    "Class-wise examination dates and shift timings for Nursery through Class 10, updated each term by the school office.",
};

export default async function ExamSchedulePage() {
  const rawSchedule = await getSchedule();

  // Per spec: the computed academic year always overwrites whatever is
  // stored in the JSON file before the page renders.
  const schedule = { ...rawSchedule, year: getAcademicYear() };

  return (
    <main className="bg-white">
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden px-5 pb-14 pt-20 sm:px-8 sm:pt-24">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-40 -top-40 size-[28rem] rounded-full bg-lime-300/25 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 top-32 size-[24rem] rounded-full bg-amber-300/25 blur-3xl"
        />

        <div className="relative mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-lime-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-lime-700">
            <BiSolidStar className="text-sm" aria-hidden />
            Academics
          </span>
          <h1 className="mt-6 text-4xl font-semibold leading-[1.05] text-slate-900 sm:text-6xl">
            Examination
            <span className="relative ml-3 inline-block">
              <span className="relative z-10">Schedule</span>
              <span
                aria-hidden
                className="absolute inset-x-0 bottom-1 z-0 h-3 rounded-full bg-amber-300/60"
              />
            </span>
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-slate-600">
            Class-wise exam dates and shift timings for Nursery through Class 10. <br />
            Kept up to date by the school office each term.
          </p>
        </div>
      </section>

      {/* ================= SCHEDULE TABLE ================= */}
      <section className="px-5 pb-24 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <ScheduleTable initialSchedule={schedule} />
        </div>
      </section>
    </main>
  );
}
