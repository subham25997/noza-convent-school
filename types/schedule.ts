/**
 * Shared types for the Examination Schedule feature.
 * Kept independent of any data source (JSON today, Google Sheet later)
 * so the rest of the app never has to change when the source changes.
 */

export interface Shift {
  /** 1 = morning shift, 2 = afternoon shift, etc. */
  shift: number;
  /** 24-hour time, format HH:MM (e.g. "09:00") */
  from: string;
  /** 24-hour time, format HH:MM (e.g. "12:00") */
  to: string;
}

export type ClassName =
  | "Nursery"
  | "Class 1"
  | "Class 2"
  | "Class 3"
  | "Class 4"
  | "Class 5"
  | "Class 6"
  | "Class 7"
  | "Class 8"
  | "Class 9"
  | "Class 10";

export interface ClassSchedule {
  class: ClassName;
  shifts: Shift[];
}

export interface Schedule {
  /** Academic year, auto-computed at runtime — see utils/year.ts */
  year: number;
  /** e.g. "Half-Yearly Examination", "Semester 1" */
  examName: string;
  /** ISO date strings, e.g. "2026-09-14" */
  dates: string[];
  classes: ClassSchedule[];
}
