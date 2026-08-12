"use client";
import { useEffect, useState } from "react";
import { BiChevronLeft, BiChevronRight, BiCalendar, BiBook, BiFlag, BiStar } from "react-icons/bi";
import  { type CalendarEvent, getCalendarEvents } from "@/services/calendar";

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const legend = [
  { label: "Academic", color: "bg-blue-500" },
  { label: "Holiday", color: "bg-red-500" },
  { label: "Event", color: "bg-purple-500" },
  { label: "Break", color: "bg-amber-500" },
  { label: "Meeting", color: "bg-green-500" },
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
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 py-16 sm:px-6 sm:py-24 md:py-32 lg:px-8 bg-gradient-to-br from-lime-700/90 via-lime-600/99 to-lime-700/90">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: "url('/images/academic-calendar.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-white" />
          <div className="absolute -bottom-10 -left-10 h-60 w-60 rounded-full bg-white" />
        </div>
        <div className="relative mx-auto max-w-7xl">
          <h1 className="mt-3 text-center text-4xl font-bold text-white sm:text-5xl">
            Academic Calendar
          </h1>
          <p className="mt-4 text-center max-w-7xl text-lg text-gray-50">
            Stay updated with important dates, events, holidays, and academic
            milestones throughout the year.
          </p>
        </div>
      </section>

      {/* Calendar Section */}
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          {/* Month Selector */}
          <div className="mb-10 flex items-center justify-between rounded-2xl bg-amber-500/90 p-4 shadow-sm ring-1 ring-gray-200/50">
            <button
              onClick={() =>
                setSelectedMonth((prev) => (prev === 0 ? 11 : prev - 1))
              }
              className="rounded-xl p-2 transition-color"
            >
              <BiChevronLeft
                size={24}
                className="text-white cursor-pointer hover:transform hover:scale-110"
              />
            </button>
            <h2 className="text-xl font-bold text-white sm:text-2xl">
              {months[selectedMonth]} {new Date().getFullYear()}
            </h2>
            <button
              onClick={() =>
                setSelectedMonth((prev) => (prev === 11 ? 0 : prev + 1))
              }
              className="rounded-xl p-2 transition-colors"
            >
              <BiChevronRight
                size={24}
                className="text-white cursor-pointer hover:transform hover:scale-110"
              />
            </button>
          </div>

          {/* Quick Month Grid */}
          <div className="mb-8 grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-12">
            {months.map((month, index) => (
              <button
                key={month}
                onClick={() => setSelectedMonth(index)}
                className={`rounded-xl py-2 text-center text-xs font-medium transition-all sm:py-3 sm:text-sm ${
                  selectedMonth === index
                    ? "bg-lime-500 text-white shadow-lg shadow-lime-500/30"
                    : "bg-white text-gray-600 hover:bg-gray-50"
                }`}
              >
                {month.slice(0, 3)}
              </button>
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Events List */}
            <div className="lg:col-span-2">
              <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200/50 sm:p-8">
                <div className="mb-8 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100">
                    <BiCalendar className="text-xl text-amber-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">
                    Events & Dates
                  </h3>
                </div>

                {isLoading ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                      <BiCalendar className="text-2xl text-gray-400" />
                    </div>
                    <p className="text-gray-500">Loading calendar events…</p>
                  </div>
                ) : monthEvents.length > 0 ? (
                  <div className="space-y-3">
                    {monthEvents.map((event, index) => (
                      <div
                        key={`${event.month}-${event.day}-${event.title}-${index}`}
                        className="flex items-center gap-4 rounded-xl border border-gray-100 bg-gray-50/50 p-4 transition-all hover:border-orange-200 hover:bg-orange-50/30"
                      >
                        <div
                          className={`flex h-12 w-12 flex-shrink-0 flex-col items-center justify-center rounded-xl text-white ${event.color}`}
                        >
                          <span className="text-xs font-medium opacity-80">
                            {months[selectedMonth].slice(0, 3)}
                          </span>
                          <span className="text-lg font-bold leading-none">
                            {event.day}
                          </span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">
                            {event.title}
                          </h4>
                          <p className="mt-1 text-sm text-gray-500 capitalize">
                            {event.type}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                      <BiCalendar className="text-2xl text-gray-400" />
                    </div>
                    <p className="text-gray-500">
                      No events scheduled for this month
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Legend */}
              <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200/50">
                <h3 className="mb-4 font-bold text-gray-900">Legend</h3>
                <div className="space-y-3">
                  {legend.map((item) => (
                    <div key={item.label} className="flex items-center gap-3">
                      <div className={`h-3 w-3 rounded-full ${item.color}`} />
                      <span className="text-sm text-gray-600">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200/50">
                <h3 className="mb-4 font-bold text-gray-900">
                  Year at a Glance
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100">
                      <BiBook className="text-lg text-blue-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">
                        {
                          events.filter((event) => event.type === "academic")
                            .length
                        }
                      </p>
                      <p className="text-xs text-gray-500">Academic Days</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100">
                      <BiFlag className="text-lg text-red-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">
                        {
                          events.filter((event) => event.type === "holiday")
                            .length
                        }
                      </p>
                      <p className="text-xs text-gray-500">Holidays</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100">
                      <BiStar className="text-lg text-purple-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">
                        {
                          events.filter((event) => event.type === "event")
                            .length
                        }
                      </p>
                      <p className="text-xs text-gray-500">Events</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
