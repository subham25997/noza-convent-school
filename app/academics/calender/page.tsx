"use client";

import { useEffect, useState } from "react";
import { BiBook, BiCalendar, BiChevronLeft, BiChevronRight, BiFlag, BiStar } from "react-icons/bi";
import { type CalendarEvent, getCalendarEvents } from "@/services/calendar";

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const legend = [
  { label: "Academic", color: "bg-lime-600" },
  { label: "Holiday", color: "bg-rose-500" },
  { label: "Event", color: "bg-amber-500" },
  { label: "Break", color: "bg-slate-600" },
  { label: "Meeting", color: "bg-emerald-600" },
];

export default function CalenderPage() {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadEvents() {
      try {
        const response = await getCalendarEvents();
        if (!response) {
          throw new Error("Unable to load calendar events");
        }
        setEvents(response.events ?? []);
      } catch {
        setEvents([]);
      } finally {
        setIsLoading(false);
      }
    }

    loadEvents();
  }, []);

  const monthEvents = events.filter((event) => months.indexOf(event.month) === selectedMonth);

  return (
    <main className="min-h-screen bg-[#FFF8EC]/40 text-slate-900">
      <section className="relative overflow-hidden bg-slate-950 px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-cover bg-center opacity-45"
          style={{ backgroundImage: "url('/images/classroom.jpeg')" }}
        />
        <div aria-hidden="true" className="absolute inset-0 bg-linear-to-r from-slate-950 via-lime-950/85 to-slate-950/70" />
        <div aria-hidden="true" className="pointer-events-none absolute -left-20 top-12 size-72 rounded-full border-[2rem] border-amber-300/15" />
        <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-24 size-96 rounded-full bg-lime-400/10 blur-3xl" />

        <div className="relative mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-lime-300/25 bg-lime-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-lime-200">
            <BiCalendar aria-hidden="true" />
            Plan ahead
          </span>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">Academic Calendar</h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-200 sm:text-lg sm:leading-8">
            Stay informed about school events, holidays, and important academic milestones throughout the year.
          </p>
        </div>
      </section>

      <section className="relative px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div aria-hidden="true" className="pointer-events-none absolute left-0 top-12 size-72 rounded-full bg-lime-200/35 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute right-0 top-1/3 size-80 rounded-full bg-amber-200/30 blur-3xl" />

        <div className="relative mx-auto max-w-6xl">
          <div className="relative mb-6 overflow-hidden rounded-[1.75rem] bg-slate-950 p-5 shadow-[0_24px_60px_-32px_rgba(15,23,42,0.8)] sm:p-6">
            <div aria-hidden="true" className="absolute -right-12 -top-16 size-48 rounded-full bg-lime-400/15 blur-2xl" />
            <div aria-hidden="true" className="absolute -bottom-20 left-1/3 size-52 rounded-full bg-amber-400/10 blur-3xl" />
            <div className="relative flex items-center justify-between gap-4">
              <button
                type="button"
                aria-label="Show previous month"
                onClick={() => setSelectedMonth((prev) => (prev === 0 ? 11 : prev - 1))}
                className="grid size-11 place-items-center rounded-2xl border border-white/10 bg-white/10 text-white transition-all hover:-translate-y-0.5 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-lime-300"
              >
                <BiChevronLeft size={24} aria-hidden="true" />
              </button>
              <div className="text-center">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-lime-300">Explore the year</p>
                <h2 className="mt-1 text-2xl font-semibold tracking-tight text-white sm:text-3xl">{months[selectedMonth]} {new Date().getFullYear()}</h2>
              </div>
              <button
                type="button"
                aria-label="Show next month"
                onClick={() => setSelectedMonth((prev) => (prev === 11 ? 0 : prev + 1))}
                className="grid size-11 place-items-center rounded-2xl border border-white/10 bg-white/10 text-white transition-all hover:-translate-y-0.5 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-lime-300"
              >
                <BiChevronRight size={24} aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="mb-8 grid grid-cols-4 gap-2 rounded-[1.5rem] border border-slate-200/80 bg-white p-3 shadow-[0_18px_45px_-34px_rgba(15,23,42,0.45)] sm:grid-cols-6 sm:gap-3 sm:p-4 md:grid-cols-12">
            {months.map((month, index) => (
              <button
                key={month}
                type="button"
                aria-pressed={selectedMonth === index}
                onClick={() => setSelectedMonth(index)}
                className={`rounded-xl border px-2 py-2.5 text-center text-xs font-semibold transition-all sm:py-3 sm:text-sm ${
                  selectedMonth === index
                    ? "border-lime-600 bg-lime-600 text-white shadow-[0_10px_22px_-12px_rgba(77,124,15,0.9)]"
                    : "border-transparent bg-slate-50 text-slate-600 hover:border-amber-200 hover:bg-amber-50 hover:text-amber-800"
                }`}
              >
                {month.slice(0, 3)}
              </button>
            ))}
          </div>

          <div className="grid items-stretch gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="h-full rounded-[1.75rem] border border-slate-200/80 bg-white p-5 shadow-[0_22px_55px_-34px_rgba(15,23,42,0.4)] sm:p-8">
                <div className="mb-7 flex items-center gap-4 border-b border-slate-100 pb-6">
                  <div className="grid size-12 place-items-center rounded-2xl bg-amber-100 text-amber-700 ring-8 ring-amber-50/70">
                    <BiCalendar className="text-2xl" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-lime-700">{months[selectedMonth]}</p>
                    <h3 className="mt-1 text-xl font-semibold tracking-tight text-slate-950 sm:text-2xl">Events & dates</h3>
                  </div>
                </div>

                {isLoading ? (
                  <div className="flex flex-col items-center justify-center py-14 text-center">
                    <div className="mb-4 grid size-16 place-items-center rounded-2xl bg-slate-100 text-slate-400">
                      <BiCalendar className="text-3xl" aria-hidden="true" />
                    </div>
                    <p className="text-sm font-medium text-slate-500">Loading calendar events…</p>
                  </div>
                ) : monthEvents.length > 0 ? (
                  <div className="space-y-3">
                    {monthEvents.map((event, index) => (
                      <article
                        key={`${event.month}-${event.day}-${event.title}-${index}`}
                        className="group flex items-center gap-4 rounded-2xl border border-slate-200/80 bg-slate-50/70 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-200 hover:bg-amber-50/50 hover:shadow-[0_14px_28px_-22px_rgba(15,23,42,0.45)]"
                      >
                        <div className={`flex size-14 shrink-0 flex-col items-center justify-center rounded-2xl text-white shadow-sm ${event.color}`}>
                          <span className="text-[0.65rem] font-semibold uppercase tracking-wide text-white/75">{months[selectedMonth].slice(0, 3)}</span>
                          <span className="text-xl font-bold leading-none">{event.day}</span>
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 className="font-semibold text-slate-900">{event.title}</h4>
                          <span className="mt-2 inline-flex rounded-full bg-white px-2.5 py-1 text-[0.68rem] font-semibold capitalize tracking-wide text-slate-500 ring-1 ring-slate-200/80">{event.type}</span>
                        </div>
                      </article>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-14 text-center">
                    <div className="mb-4 grid size-16 place-items-center rounded-2xl bg-slate-100 text-slate-400">
                      <BiCalendar className="text-3xl" aria-hidden="true" />
                    </div>
                    <p className="font-medium text-slate-600">No events scheduled for this month</p>
                    <p className="mt-1 text-sm text-slate-400">Choose another month to view its calendar.</p>
                  </div>
                )}
              </div>
            </div>

            <aside className="grid h-full gap-6 lg:grid-rows-2">
              <div className="h-full rounded-[1.75rem] border border-slate-200/80 bg-white p-6 shadow-[0_22px_55px_-34px_rgba(15,23,42,0.4)]">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-lime-700">Event guide</p>
                <h3 className="mt-1 text-xl font-semibold tracking-tight text-slate-950">Calendar legend</h3>
                <div className="mt-5 space-y-2">
                  {legend.map((item) => (
                    <div key={item.label} className="flex items-center gap-3 rounded-xl bg-slate-50 px-3.5 py-3">
                      <span className={`size-2.5 rounded-full ${item.color}`} />
                      <span className="text-sm font-medium text-slate-600">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="h-full rounded-[1.75rem] border border-slate-200/80 bg-white p-6 shadow-[0_22px_55px_-34px_rgba(15,23,42,0.4)]">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-lime-700">Year at a glance</p>
                    <h3 className="mt-1 text-xl font-semibold tracking-tight text-slate-950">Calendar overview</h3>
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wide text-amber-700">
                    <span className="size-1.5 rounded-full bg-amber-500" />
                    Highlights
                  </span>
                </div>
                <div className="mt-5 grid grid-cols-3 gap-2.5">
                  <div className="rounded-2xl border border-lime-100 bg-lime-50/80 p-3">
                    <div className="grid size-9 place-items-center rounded-xl bg-white text-lime-700 shadow-sm"><BiBook className="text-base" aria-hidden="true" /></div>
                    <p className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">{events.filter((event) => event.type === "academic").length}</p>
                    <p className="mt-1 text-[0.68rem] font-medium leading-4 text-slate-500">Academic</p>
                  </div>
                  <div className="rounded-2xl border border-rose-100 bg-rose-50/75 p-3">
                    <div className="grid size-9 place-items-center rounded-xl bg-white text-rose-600 shadow-sm"><BiFlag className="text-base" aria-hidden="true" /></div>
                    <p className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">{events.filter((event) => event.type === "holiday").length}</p>
                    <p className="mt-1 text-[0.68rem] font-medium leading-4 text-slate-500">Holidays</p>
                  </div>
                  <div className="rounded-2xl border border-amber-100 bg-amber-50/80 p-3">
                    <div className="grid size-9 place-items-center rounded-xl bg-white text-amber-700 shadow-sm"><BiStar className="text-base" aria-hidden="true" /></div>
                    <p className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">{events.filter((event) => event.type === "event").length}</p>
                    <p className="mt-1 text-[0.68rem] font-medium leading-4 text-slate-500">Events</p>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
