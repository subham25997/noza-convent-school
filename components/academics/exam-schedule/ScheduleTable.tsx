"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  BiCalendarCheck,
  BiCheckCircle,
  BiErrorCircle,
  BiInfoCircle,
  BiLoaderAlt,
  BiSave,
} from "react-icons/bi";
import { saveSchedule } from "@/services/schedule.service";
import type { Schedule } from "@/types/schedule";

type FieldKey = `${number}-${number}-from` | `${number}-${number}-to`;

const TIME_PATTERN = /^([01]\d|2[0-3]):([0-5]\d)$/;

function isValidTime(value: string): boolean {
  return TIME_PATTERN.test(value);
}

function formatDate(iso: string) {
  const parsed = new Date(`${iso}T00:00:00`);
  return {
    weekday: parsed.toLocaleDateString("en-IN", { weekday: "short" }),
    day: parsed.toLocaleDateString("en-IN", { day: "2-digit" }),
    month: parsed.toLocaleDateString("en-IN", { month: "short" }),
  };
}

/** Deep-clones without relying on structuredClone, for broad runtime support. */
function cloneSchedule(schedule: Schedule): Schedule {
  return JSON.parse(JSON.stringify(schedule)) as Schedule;
}

export default function ScheduleTable({
  initialSchedule,
}: {
  initialSchedule: Schedule;
}) {
  const [schedule, setSchedule] = useState<Schedule>(initialSchedule);
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<FieldKey, string>>
  >({});
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveState, setSaveState] = useState<"idle" | "success" | "error">(
    "idle",
  );

  const hasErrors = Object.keys(fieldErrors).length > 0;

  const formattedDates = useMemo(
    () => schedule.dates.map(formatDate),
    [schedule.dates],
  );

  function validateShift(
    classIndex: number,
    shiftIndex: number,
    from: string,
    to: string,
  ): Partial<Record<FieldKey, string>> {
    const fromKey: FieldKey = `${classIndex}-${shiftIndex}-from`;
    const toKey: FieldKey = `${classIndex}-${shiftIndex}-to`;
    const errors: Partial<Record<FieldKey, string>> = {};

    if (from && !isValidTime(from)) {
      errors[fromKey] = "Use HH:MM (24-hour) format.";
    }
    if (to && !isValidTime(to)) {
      errors[toKey] = "Use HH:MM (24-hour) format.";
    }
    if (
      !errors[fromKey] &&
      !errors[toKey] &&
      isValidTime(from) &&
      isValidTime(to) &&
      from >= to
    ) {
      errors[toKey] = "End time must be after start time.";
    }
    return errors;
  }

  function handleShiftChange(
    classIndex: number,
    shiftIndex: number,
    field: "from" | "to",
    value: string,
  ) {
    setSchedule((prev) => {
      const next = cloneSchedule(prev);
      next.classes[classIndex].shifts[shiftIndex][field] = value;
      return next;
    });

    setFieldErrors((prev) => {
      const cleared = { ...prev };
      delete cleared[`${classIndex}-${shiftIndex}-from` as FieldKey];
      delete cleared[`${classIndex}-${shiftIndex}-to` as FieldKey];

      const currentShift = schedule.classes[classIndex].shifts[shiftIndex];
      const from = field === "from" ? value : currentShift.from;
      const to = field === "to" ? value : currentShift.to;

      return { ...cleared, ...validateShift(classIndex, shiftIndex, from, to) };
    });

    setDirty(true);
    setSaveState("idle");
  }

  async function handleSave() {
    if (hasErrors) return;
    setSaving(true);
    setSaveState("idle");
    try {
      await saveSchedule(schedule);
      setSaveState("success");
      setDirty(false);
    } catch {
      setSaveState("error");
    } finally {
      setSaving(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="rounded-[2rem] border border-slate-200 bg-white p-5 sm:p-8"
    >
      {/* ================= HEADER ================= */}
      <div className="flex flex-col gap-4 border-b border-slate-100 pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="grid size-12 flex-shrink-0 place-items-center rounded-2xl bg-amber-100 text-amber-700">
            <BiCalendarCheck className="text-2xl" aria-hidden />
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-lime-700">
              Academic Year {schedule.year}
              {schedule.year ? `–${String(schedule.year + 1).slice(-2)}` : ""}
            </span>
            <h2 className="mt-1 text-xl font-semibold text-slate-900 sm:text-2xl">
              {schedule.examName}
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {saveState === "success" && (
            <span className="hidden items-center gap-1.5 text-sm font-medium text-lime-700 sm:flex">
              <BiCheckCircle className="text-lg" aria-hidden />
              Saved
            </span>
          )}
          {saveState === "error" && (
            <span className="hidden items-center gap-1.5 text-sm font-medium text-red-600 sm:flex">
              <BiErrorCircle className="text-lg" aria-hidden />
              Couldn&apos;t save
            </span>
          )}
          <button
            type="button"
            onClick={handleSave}
            disabled={!dirty || hasErrors || saving}
            className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
          >
            {saving ? (
              <BiLoaderAlt className="animate-spin text-lg" aria-hidden />
            ) : (
              <BiSave className="text-lg" aria-hidden />
            )}
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      <p className="mt-4 flex items-start gap-2 rounded-2xl bg-amber-50/70 px-4 py-3 text-xs text-amber-800 sm:text-sm">
        <BiInfoCircle className="mt-0.5 flex-shrink-0 text-base" aria-hidden />
        Shift timings are set once per class and apply across every exam date
        shown below. Editing a shift in any column updates it everywhere for
        that class.
      </p>

      {/* ================= TABLE ================= */}
      <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200">
        <table className="w-full min-w-[880px] border-collapse text-sm">
          <thead>
            <tr>
              <th className="sticky left-0 z-10 min-w-[140px] border-b border-slate-200 bg-slate-900 px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-white">
                Class
              </th>
              {formattedDates.map((d, i) => (
                <th
                  key={schedule.dates[i]}
                  className="border-b border-l border-slate-200 bg-slate-50 px-4 py-3 text-center"
                >
                  <div className="text-xs font-semibold uppercase tracking-wide text-lime-700">
                    {d.weekday}
                  </div>
                  <div className="text-sm font-semibold text-slate-900">
                    {d.day} {d.month}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {schedule.classes.map((cls, classIndex) => (
              <tr
                key={cls.class}
                className={classIndex % 2 === 0 ? "bg-white" : "bg-slate-50/50"}
              >
                <td
                  className={`sticky left-0 z-10 border-b border-slate-200 px-4 py-4 text-sm font-semibold text-slate-900 ${
                    classIndex % 2 === 0 ? "bg-white" : "bg-slate-50"
                  }`}
                >
                  {cls.class}
                </td>
                {schedule.dates.map((date) => (
                  <td
                    key={date}
                    className="border-b border-l border-slate-200 p-3 align-top"
                  >
                    <div className="flex flex-col gap-2">
                      {cls.shifts.map((shift, shiftIndex) => {
                        const fromKey: FieldKey = `${classIndex}-${shiftIndex}-from`;
                        const toKey: FieldKey = `${classIndex}-${shiftIndex}-to`;
                        const fromError = fieldErrors[fromKey];
                        const toError = fieldErrors[toKey];
                        const isAmber = shiftIndex % 2 === 0;

                        return (
                          <div
                            key={shift.shift}
                            className={`rounded-xl px-2.5 py-2 ${
                              isAmber ? "bg-amber-50/70" : "bg-lime-50/70"
                            }`}
                          >
                            <span
                              className={`text-[10px] font-semibold uppercase tracking-wide ${
                                isAmber ? "text-amber-700" : "text-lime-700"
                              }`}
                            >
                              Shift {shift.shift}
                            </span>
                            <div className="mt-1 flex items-center gap-1">
                              <input
                                type="time"
                                value={shift.from}
                                onChange={(e) =>
                                  handleShiftChange(
                                    classIndex,
                                    shiftIndex,
                                    "from",
                                    e.target.value,
                                  )
                                }
                                className={`w-full rounded-lg border bg-white px-1.5 py-1 text-xs text-slate-800 focus:outline-none focus:ring-2 ${
                                  fromError
                                    ? "border-red-400 focus:ring-red-300"
                                    : "border-slate-200 focus:ring-lime-300"
                                }`}
                              />
                              <span className="text-slate-400">–</span>
                              <input
                                type="time"
                                value={shift.to}
                                onChange={(e) =>
                                  handleShiftChange(
                                    classIndex,
                                    shiftIndex,
                                    "to",
                                    e.target.value,
                                  )
                                }
                                className={`w-full rounded-lg border bg-white px-1.5 py-1 text-xs text-slate-800 focus:outline-none focus:ring-2 ${
                                  toError
                                    ? "border-red-400 focus:ring-red-300"
                                    : "border-slate-200 focus:ring-lime-300"
                                }`}
                              />
                            </div>
                            {(fromError || toError) && (
                              <p className="mt-1 text-[10px] font-medium leading-tight text-red-600">
                                {fromError || toError}
                              </p>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile save bar (button above is hidden on very small screens' header row) */}
      {(saveState === "success" || saveState === "error") && (
        <p
          className={`mt-4 flex items-center gap-1.5 text-sm font-medium sm:hidden ${
            saveState === "success" ? "text-lime-700" : "text-red-600"
          }`}
        >
          {saveState === "success" ? (
            <BiCheckCircle className="text-lg" aria-hidden />
          ) : (
            <BiErrorCircle className="text-lg" aria-hidden />
          )}
          {saveState === "success" ? "Saved" : "Couldn't save changes"}
        </p>
      )}
    </motion.div>
  );
}
