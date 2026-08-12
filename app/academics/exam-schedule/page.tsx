import ScheduleTable from "@/components/academics/exam-schedule/ScheduleTable";
import HeroExamSchedule from "@/components/academics/exam-schedule/HeroExamSchedule";

export const metadata = {
  title: "Examination Schedule | Noza Convent School",
  description:
    "Class-wise examination dates and shift timings for Nursery through Class 10, updated each term by the school office.",
};

export default function ExamSchedulePage() {
  return (
    <main className="bg-white">
      <HeroExamSchedule />

      {/* ================= SCHEDULE TABLE ================= */}
      <section className="px-5 pb-24 sm:px-8 mt-5">
        <div className="mx-auto max-w-7xl">
          <ScheduleTable />
        </div>
      </section>
    </main>
  );
}
