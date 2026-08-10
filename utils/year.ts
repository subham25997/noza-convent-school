/**
 * Computes the current Indian-schooling academic year.
 *
 * Most CBSE-affiliated schools run their academic session from April to
 * March. We treat July onward as "next year's" session so that, for
 * example, an exam scheduled in September 2026 is labelled academic
 * year 2027 (the session running April 2026 – March 2027).
 *
 * Pass a `referenceDate` for testing; defaults to the real current date.
 */
export function getAcademicYear(referenceDate: Date = new Date()): number {
  const isSecondHalfOfSession = referenceDate.getMonth() >= 6; // July = index 6
  return isSecondHalfOfSession
    ? referenceDate.getFullYear() + 1
    : referenceDate.getFullYear();
}
