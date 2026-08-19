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
  amber400: [251, 191, 36] as const,
  amber600: [217, 119, 6] as const,
  amber700: [180, 83, 9] as const,
  lime500: [132, 204, 22] as const,
  lime700: [77, 124, 15] as const,
  slate900: [15, 23, 42] as const,
  slate600: [71, 85, 105] as const,
  slate400: [148, 163, 184] as const,
  slate200: [226, 232, 240] as const,
  slate100: [241, 245, 249] as const,
  white: [255, 255, 255] as const,
};

type Entry = Schedule["classes"][number]["days"][number];

/** Mirrors the on-screen cell: subject / time range / SHIFT label, or the holiday note. */
function buildCellText(entry: Entry | undefined): string {
  if (!entry) return "—";

  if (entry.slots.length > 0) {
    const blocks = entry.slots.map((slot) => {
      const lines: string[] = [];
      if (slot.subject) lines.push(slot.subject);
      lines.push(`${slot.from} – ${slot.to}`);
      lines.push(`SHIFT ${slot.shift}`);
      return lines.join("\n");
    });
    if (entry.note) blocks.push(entry.note);
    return blocks.join("\n\n");
  }

  return entry.note || "Holiday";
}

function exportScheduleAsPdf(schedule: Schedule) {
  const doc = new jsPDF({ orientation: "landscape", unit: "pt", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const yearLabel = formatAcademicYear(schedule.year);

  // ---- Header (same hierarchy as the card header on screen) ----
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(...PDF_COLORS.slate400);
  doc.text(`ACADEMIC YEAR ${yearLabel.toUpperCase()}`, 40, 44, {
    charSpace: 1.4,
  });

  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(...PDF_COLORS.slate900);
  doc.text(schedule.examName, 40, 66);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(...PDF_COLORS.slate400);
  const generatedOn = new Date().toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  doc.text("Noza Convent School", pageWidth - 40, 44, { align: "right" });
  doc.text(`Generated on ${generatedOn}`, pageWidth - 40, 60, {
    align: "right",
  });

  // Legend, matching the on-screen pills
  const legend: Array<{ label: string; color: readonly number[] }> = [
    { label: "Exam", color: PDF_COLORS.amber400 },
    { label: "Prep / Holiday", color: PDF_COLORS.lime500 },
    { label: "No exam", color: PDF_COLORS.slate200 },
  ];
  let legendX = 40;
  const legendY = 82;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  legend.forEach(({ label, color }) => {
    doc.setFillColor(color[0], color[1], color[2]);
    doc.roundedRect(legendX, legendY - 6, 2.5, 8, 1.25, 1.25, "F");
    doc.setTextColor(...PDF_COLORS.slate600);
    doc.text(label, legendX + 8, legendY);
    legendX += doc.getTextWidth(label) + 30;
  });

  // ---- Table ----
  const head = [
    "CLASS",
    ...schedule.dates.map((iso) => {
      const d = formatDate(iso);
      return `${d.day} ${d.month}\n${d.isToday ? "TODAY" : d.weekday.toUpperCase()}`;
    }),
  ];

  const body = schedule.classes.map((cls) => {
    const dayByDate = new Map(cls.days.map((d) => [d.date, d]));
    return [
      cls.class,
      ...schedule.dates.map((date) => buildCellText(dayByDate.get(date))),
    ];
  });

  // Track which body cells are exam vs holiday so we can draw the accent bar.
  const cellKind = schedule.classes.map((cls) => {
    const dayByDate = new Map(cls.days.map((d) => [d.date, d]));
    return schedule.dates.map((date) => {
      const entry = dayByDate.get(date);
      if (!entry) return "none" as const;
      return entry.slots.length > 0 ? ("exam" as const) : ("holiday" as const);
    });
  });

  // ---- Separator between header/legend and table ----
  doc.setDrawColor(
    PDF_COLORS.slate200[0],
    PDF_COLORS.slate200[1],
    PDF_COLORS.slate200[2],
  );
  doc.setLineWidth(0.9);
  doc.line(40, 94, pageWidth - 40, 94);

  // ---- Table ----
  autoTable(doc, {
    startY: 104,
    head: [head],
    body,
    theme: "plain",

    styles: {
      font: "helvetica",
      fontSize: 8,
      cellPadding: {
        top: 9,
        right: 8,
        bottom: 9,
        left: 12,
      },
      textColor: PDF_COLORS.slate600 as unknown as [number, number, number],
      valign: "top",
      lineWidth: 0,
    },

    headStyles: {
      fillColor: PDF_COLORS.white as unknown as [number, number, number],
      textColor: PDF_COLORS.slate900 as unknown as [number, number, number],
      fontStyle: "bold",
      fontSize: 9,
      halign: "left",
      cellPadding: {
        top: 6,
        right: 8,
        bottom: 10,
        left: 12,
      },
    },

    columnStyles: {
      0: {
        fontStyle: "bold",
        fontSize: 10,
        textColor: PDF_COLORS.slate900 as unknown as [number, number, number],
        cellWidth: 92,
        cellPadding: {
          top: 9,
          right: 8,
          bottom: 9,
          left: 6,
        },
      },
    },

    margin: {
      left: 40,
      right: 40,
      bottom: 46,
    },

    // ---- Header/body text styling ----
    didParseCell(data) {
      if (data.section !== "head") return;

      data.cell.styles.textColor = PDF_COLORS.slate900 as unknown as [
        number,
        number,
        number,
      ];
    },

    // ---- Exam / holiday accent bars ----
    willDrawCell(data) {
      if (data.section !== "body" || data.column.index === 0) return;

      const kind = cellKind[data.row.index]?.[data.column.index - 1];

      if (kind === "none") return;

      const color = kind === "exam" ? PDF_COLORS.amber400 : PDF_COLORS.lime500;

      doc.setFillColor(color[0], color[1], color[2]);

      doc.rect(
        data.cell.x + 6,
        data.cell.y + 8,
        1.6,
        Math.max(data.cell.height - 16, 10),
        "F",
      );

      if (kind === "holiday") {
        doc.setTextColor(
          PDF_COLORS.lime700[0],
          PDF_COLORS.lime700[1],
          PDF_COLORS.lime700[2],
        );
      } else {
        doc.setTextColor(
          PDF_COLORS.slate900[0],
          PDF_COLORS.slate900[1],
          PDF_COLORS.slate900[2],
        );
      }
    },

    // ---- Table separators ----
    didDrawCell(data) {
      const isHeadRow = data.section === "head";

      const drawColor = isHeadRow ? PDF_COLORS.slate200 : PDF_COLORS.slate100;

      doc.setDrawColor(drawColor[0], drawColor[1], drawColor[2]);

      // Stronger separator under the table header
      doc.setLineWidth(isHeadRow ? 0.9 : 0.5);

      doc.line(
        data.cell.x,
        data.cell.y + data.cell.height,
        data.cell.x + data.cell.width,
        data.cell.y + data.cell.height,
      );
    },
  });

  // ---- Footer ----
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i += 1) {
    doc.setPage(i);
    doc.setDrawColor(...PDF_COLORS.slate100);
    doc.setLineWidth(0.5);
    doc.line(40, pageHeight - 34, pageWidth - 40, pageHeight - 34);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(...PDF_COLORS.slate400);
    doc.text(
      "Maintained by the school office. Not every class sits every date some have fewer exams or a preparation day instead.",
      40,
      pageHeight - 20,
    );
    doc.text(`Page ${i} of ${pageCount}`, pageWidth - 40, pageHeight - 20, {
      align: "right",
    });
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
      <div className="border-b border-slate-100 px-5 py-6 sm:px-9 sm:py-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
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

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:items-end">
            <button
              type="button"
              onClick={handleExport}
              disabled={isExporting}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-[13px] font-semibold text-slate-700 shadow-sm transition hover:border-amber-300 hover:bg-amber-50 hover:text-amber-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:py-2 sm:text-xs"
            >
              {isExporting ? (
                <BiLoaderAlt className="animate-spin text-base" aria-hidden />
              ) : (
                <BiDownload className="text-base" aria-hidden />
              )}
              {isExporting ? "Preparing PDF…" : "Download PDF"}
            </button>

            <div className="-mx-1 flex items-center gap-2 overflow-x-auto px-1 pb-0.5 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:justify-end sm:overflow-visible sm:px-0">
              {[
                { label: "Exam", dot: "bg-amber-500" },
                { label: "Prep / Holiday", dot: "bg-lime-500" },
                { label: "No exam", dot: "bg-slate-300" },
              ].map(({ label, dot }) => (
                <span
                  key={label}
                  className="inline-flex flex-shrink-0 items-center gap-2 rounded-full border border-slate-200/80 bg-slate-50 px-3 py-1.5 text-[11px] font-medium text-slate-600"
                >
                  <span
                    className={`h-2.5 w-1 rounded-full ${dot}`}
                    aria-hidden
                  />
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>
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
