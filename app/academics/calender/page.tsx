import Link from "next/link";

export const metadata = {
  title: "Calender | Noza Convent School",
  description: "View the academic calendar for Noza Convent School.",
};

export default function CalenderPage() {
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl rounded-3xl border border-gray-200 bg-white p-8 shadow-sm sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">
          Academics
        </p>
        <h1 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
          Academic Calender
        </h1>
        <p className="mt-4 max-w-3xl text-lg text-gray-600">
          The academic calendar outlines key phases of learning, assessments, events, and parent engagement throughout the year.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            { title: "Term 1", text: "Orientation, regular learning, and initial assessments." },
            { title: "Term 2", text: "Mid-year reviews, projects, and progress meetings." },
            { title: "Term 3", text: "Final evaluations, result sharing, and planning for the next term." },
          ].map((item) => (
            <div key={item.title} className="rounded-2xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900">{item.title}</h2>
              <p className="mt-2 text-sm leading-7 text-gray-600">{item.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <Link href="/academics" className="text-sm font-semibold text-amber-500 hover:text-orange-700">
            ← Back to Academics overview
          </Link>
        </div>
      </div>
    </main>
  );
}
