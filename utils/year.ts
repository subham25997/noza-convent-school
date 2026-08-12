/**
 * Computes the current CBSE academic session's start year.
 *
 * CBSE-affiliated schools run their academic session from April to March.
 * Session "2026-27" covers April 2026 through March 2027 — so April 2026,
 * September 2026, and January 2027 are all part of "2026-27"; the session
 * only rolls over to "2027-28" once April 2027 arrives.
 *
 * Pass a `referenceDate` for testing; defaults to the real current date.
 */
export function getAcademicYear(referenceDate: Date = new Date()): number {
  const month = referenceDate.getMonth(); // 0 = January
  const year = referenceDate.getFullYear();
  const isBeforeApril = month < 3; // Jan/Feb/March still belong to the previous session
  return isBeforeApril ? year - 1 : year;
}

/** Formats a session start year as CBSE-style "2026-27". */
export function formatAcademicYear(startYear: number): string {
  return `${startYear}-${String(startYear + 1).slice(-2)}`;
}

/** Convenience: the current CBSE session formatted as "2026-27". */
export function getAcademicYearLabel(referenceDate: Date = new Date()): string {
  return formatAcademicYear(getAcademicYear(referenceDate));
}
