"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  BiCalendarCheck,
  BiErrorCircle,
  BiLoaderAlt,
  BiCalendarStar,
  BiDownload,
} from "react-icons/bi";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {
  getSchedule,
  type Schedule,
  type ScheduleResult,
} from "@/services/schedule";
import { getAcademicYear, formatAcademicYear } from "@/utils/year";

function formatDate(iso: string) {
  const parsed = new Date(`${iso}T00:00:00`);
  return {
    weekday: parsed.toLocaleDateString("en-IN", { weekday: "short" }),
    day: parsed.toLocaleDateString("en-IN", { day: "2-digit" }),
    month: parsed.toLocaleDateString("en-IN", { month: "short" }),
    isToday: iso === new Date().toISOString().slice(0, 10),
  };
}

/** Amber/lime/slate palette, as RGB triples for jsPDF's fillColor/textColor APIs. */
const PDF_COLORS = {
  amber500: [245, 158, 11] as const,
  amber700: [180, 83, 9] as const,
  lime600: [101, 163, 13] as const,
  slate900: [15, 23, 42] as const,
  slate600: [71, 85, 105] as const,
  slate200: [226, 232, 240] as const,
  slate50: [248, 250, 252] as const,
  white: [255, 255, 255] as const,
};

function buildCellText(
  entry: Schedule["classes"][number]["days"][number] | undefined,
): string {
  if (!entry) return "-";

  if (entry.slots.length > 0) {
    const lines = entry.slots.map((slot) => {
      const timeLine = `Shift ${slot.shift} - ${slot.from}-${slot.to}`;
      return slot.subject ? `${slot.subject}\n${timeLine}` : timeLine;
    });
    if (entry.note) lines.push(entry.note);
    return lines.join("\n\n");
  }

  return entry.note || "Holiday";
}

function exportScheduleAsPdf(schedule: Schedule) {
  const doc = new jsPDF({ orientation: "landscape", unit: "pt", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const yearLabel = formatAcademicYear(schedule.year);

  // ---- Header ----
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.setTextColor(...PDF_COLORS.slate900);
  doc.text("Noza Convent School", 40, 42);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(...PDF_COLORS.amber700);
  doc.text(`Academic Year ${yearLabel}`, 40, 58);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(...PDF_COLORS.slate900);
  doc.text(schedule.examName, 40, 78);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(...PDF_COLORS.slate600);
  const generatedOn = new Date().toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  doc.text(`Generated on ${generatedOn}`, pageWidth - 40, 42, {
    align: "right",
  });

  // ---- Table ----
  const head = [
    "Class",
    ...schedule.dates.map((iso) => {
      const d = formatDate(iso);
      return `${d.weekday}\n${d.day} ${d.month}`;
    }),
  ];

  const body = schedule.classes.map((cls) => {
    const dayByDate = new Map(cls.days.map((d) => [d.date, d]));
    return [
      cls.class,
      ...schedule.dates.map((date) => buildCellText(dayByDate.get(date))),
    ];
  });

  autoTable(doc, {
    startY: 96,
    head: [head],
    body,
    theme: "grid",
    styles: {
      font: "helvetica",
      fontSize: 8,
      cellPadding: 6,
      textColor: PDF_COLORS.slate600 as unknown as [number, number, number],
      lineColor: PDF_COLORS.slate200 as unknown as [number, number, number],
      lineWidth: 0.5,
      valign: "top",
    },
    headStyles: {
      fillColor: PDF_COLORS.amber500 as unknown as [number, number, number],
      textColor: PDF_COLORS.white as unknown as [number, number, number],
      fontStyle: "bold",
      fontSize: 8,
      halign: "center",
    },
    columnStyles: {
      0: {
        fontStyle: "bold",
        textColor: PDF_COLORS.slate900 as unknown as [number, number, number],
        fillColor: PDF_COLORS.slate50 as unknown as [number, number, number],
      },
    },
    alternateRowStyles: {
      fillColor: [255, 251, 235] as unknown as [number, number, number], // amber-50
    },
    margin: { left: 40, right: 40 },
  });

  // ---- Footer ----
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i += 1) {
    doc.setPage(i);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(...PDF_COLORS.slate600);
    doc.text(
      "Maintained by the school office. Not every class sits every date some have fewer exams or a preparation day instead.",
      40,
      doc.internal.pageSize.getHeight() - 20,
    );
    doc.text(
      `Page ${i} of ${pageCount}`,
      pageWidth - 40,
      doc.internal.pageSize.getHeight() - 20,
      { align: "right" },
    );
  }

  const filename = `${schedule.examName}-${yearLabel}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  doc.save(`${filename}.pdf`);
}

type FailureState = Extract<ScheduleResult, { success: false }>;

export default function ScheduleTable() {
  const [schedule, setSchedule] = useState<Schedule | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [failure, setFailure] = useState<FailureState | null>(null);
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const result = await getSchedule();
        if (!result.success || !result.schedule) {
          setFailure(result);
          setSchedule(null);
          return;
        }
        if (result.warning) {
          console.warn(result.warning);
        }
        setSchedule({ ...result.schedule, year: getAcademicYear() });
      } catch {
        setFailure({
          success: false,
          schedule: null,
          message: "Something went wrong loading the examination schedule.",
          reason: "load-error",
        });
      } finally {
        setIsLoading(false);
      }
    }

    load();
  }, []);

  const formattedDates = useMemo(
    () => (schedule ? schedule.dates.map(formatDate) : []),
    [schedule],
  );

  async function handleExport() {
    if (!schedule || isExporting) return;
    setIsExporting(true);
    try {
      // Yield a frame so the button's loading state actually paints before
      // the (synchronous, potentially heavy) PDF generation runs.
      await new Promise((resolve) => requestAnimationFrame(resolve));
      exportScheduleAsPdf(schedule);
    } finally {
      setIsExporting(false);
    }
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center rounded-3xl border border-slate-200 bg-white py-20 text-center">
        <BiLoaderAlt
          className="mb-4 animate-spin text-3xl text-lime-600"
          aria-hidden
        />
        <p className="text-sm text-slate-500">Loading examination schedule…</p>
      </div>
    );
  }

  if (failure || !schedule) {
    if (failure?.reason === "empty") {
      return (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-slate-200 bg-white py-16 text-center">
          <div className="mb-4 grid size-14 place-items-center rounded-2xl bg-lime-50 text-lime-600 ring-1 ring-lime-100">
            <BiCalendarStar className="text-2xl" aria-hidden />
          </div>
          <h3 className="text-lg font-semibold text-slate-900">
            No exam scheduled right now
          </h3>
          <p className="mt-2 max-w-md text-sm text-slate-600">
            {failure.message}
          </p>
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center justify-center rounded-3xl border border-slate-200 bg-white py-16 text-center">
        <div className="mb-4 grid size-14 place-items-center rounded-2xl bg-red-50 text-red-500 ring-1 ring-red-100">
          <BiErrorCircle className="text-2xl" aria-hidden />
        </div>
        <h3 className="text-lg font-semibold text-slate-900">
          Couldn&apos;t load the schedule
        </h3>
        <p className="mt-2 max-w-md text-sm text-slate-600">
          {failure?.message ?? "Please try again shortly."}
        </p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04),0_24px_60px_-40px_rgba(15,23,42,0.35)]"
    >
      {/* ================= HEADER ================= */}
      <div className="border-b border-slate-100 px-6 py-7 sm:px-9 sm:py-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex items-start gap-4">
            <div className="grid size-12 flex-shrink-0 place-items-center rounded-2xl bg-amber-50 text-amber-700 ring-1 ring-lime-100">
              <BiCalendarCheck className="text-2xl" aria-hidden />
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                Academic Year {formatAcademicYear(schedule.year)}
              </p>
              <h2 className="mt-1.5 text-2xl font-semibold tracking-tight text-slate-900 sm:text-[1.75rem]">
                {schedule.examName}
              </h2>
            </div>
          </div>

          <div className="flex flex-col items-start gap-3 sm:items-end">
            <button
              type="button"
              onClick={handleExport}
              disabled={isExporting}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 transition hover:border-amber-300 hover:bg-amber-50 hover:text-amber-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isExporting ? (
                <BiLoaderAlt className="animate-spin text-sm" aria-hidden />
              ) : (
                <BiDownload className="text-sm" aria-hidden />
              )}
              {isExporting ? "Preparing PDF..." : "Export as PDF"}
            </button>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-medium text-slate-500">
              <span className="flex items-center gap-2">
                <span
                  className="h-3 w-1 rounded-full bg-amber-500"
                  aria-hidden
                />
                Exam
              </span>
              <span className="flex items-center gap-2">
                <span
                  className="h-3 w-1 rounded-full bg-lime-500"
                  aria-hidden
                />
                Prep / Holiday
              </span>
              <span className="flex items-center gap-2">
                <span
                  className="h-3 w-1 rounded-full bg-slate-200"
                  aria-hidden
                />
                No exam
              </span>
            </div>
          </div>
        </div>

        <p className="mt-6 max-w-3xl text-xs leading-relaxed text-slate-500 sm:text-[13px]">
          Maintained by the school office. Not every class sits every date some
          have fewer exams or a preparation day instead. Updates appear here
          automatically.
        </p>
      </div>

      {/* ================= TABLE ================= */}
      <div className="overflow-x-auto [scrollbar-width:thin]">
        <table className="w-full min-w-[900px] border-separate border-spacing-0 text-sm">
          <thead>
            <tr>
              <th className="sticky left-0 z-20 w-[170px] min-w-[170px] border-b border-slate-200 bg-white px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                Class
              </th>
              {formattedDates.map((d, i) => (
                <th
                  key={schedule.dates[i]}
                  className={`border-b border-slate-200 px-4 py-4 text-left ${
                    d.isToday ? "bg-lime-50/60" : "bg-white"
                  }`}
                >
                  <div className="flex items-baseline gap-2">
                    <span className="text-[17px] font-semibold tabular-nums leading-none text-slate-900">
                      {d.day}
                    </span>
                    <span className="text-xs font-medium text-slate-500">
                      {d.month}
                    </span>
                  </div>
                  <div
                    className={`mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] ${
                      d.isToday ? "text-lime-700" : "text-slate-400"
                    }`}
                  >
                    {d.isToday ? "Today" : d.weekday}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {schedule.classes.map((cls) => {
              const dayByDate = new Map(cls.days.map((d) => [d.date, d]));
              return (
                <tr key={cls.class} className="group">
                  <td className="sticky left-0 z-10 border-b border-slate-100 bg-white px-6 py-5 align-top text-[15px] font-semibold text-slate-900 transition-colors group-hover:bg-slate-50">
                    {cls.class}
                  </td>

                  {schedule.dates.map((date) => {
                    const entry = dayByDate.get(date);

                    return (
                      <td
                        key={date}
                        className="border-b border-l border-slate-100 px-4 py-5 align-top transition-colors group-hover:bg-slate-50/70"
                      >
                        {!entry ? (
                          <span
                            className="block h-px w-5 bg-slate-200"
                            aria-hidden
                          />
                        ) : entry.slots.length > 0 ? (
                          <div className="flex flex-col gap-4">
                            {entry.slots.map((slot) => (
                              <div
                                key={slot.shift}
                                className="border-l-2 border-amber-400 pl-3"
                              >
                                {slot.subject && (
                                  <p className="text-[15px] font-semibold leading-tight text-slate-900">
                                    {slot.subject}
                                  </p>
                                )}
                                <p className="mt-1 text-[13px] font-medium tabular-nums text-slate-600">
                                  {slot.from} – {slot.to}
                                </p>
                                <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-amber-600">
                                  Shift {slot.shift}
                                </p>
                              </div>
                            ))}
                            {entry.note && (
                              <p className="text-[11px] italic leading-snug text-slate-400">
                                {entry.note}
                              </p>
                            )}
                          </div>
                        ) : (
                          <div className="border-l-2 border-lime-500 pl-3">
                            <p className="text-[14px] font-medium leading-tight text-lime-700">
                              {entry.note || "Holiday"}
                            </p>
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className="px-6 py-4 text-[11px] text-slate-400 sm:hidden">
        Swipe horizontally to see all dates →
      </p>
    </motion.div>
  );
}
