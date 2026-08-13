import axios from "axios";

export type FeeStructureItem = {
  class: string;
  monthlyFee: number;
  annualFee: number;
};

export type FeeHighlightItem = {
  title: string;
  amount: string;
  time: string;
  description: string;
  type: string;
};

export type FeeData = {
  feeStructure: FeeStructureItem[];
  feeHighlights: FeeHighlightItem[];
};

export type FeeResult =
  | { success: true; data: FeeData }
  | {
      success: false;
      data: null;
      message: string;
      reason: "not-configured" | "load-error" | "empty";
    };

const CLASS_ORDER = [
  "Nursery",
  "LKG",
  "UKG",
  "Class 1",
  "Class 2",
  "Class 3",
  "Class 4",
  "Class 5",
  "Class 6",
  "Class 7",
  "Class 8",
  "Class 9",
  "Class 10",
];

const STRUCTURE_RANGE = "Fee Structure";
const HIGHLIGHT_RANGE = "Fee Highlight";

function normalizeHeader(header: string) {
  return header.toLowerCase().replace(/[^a-z0-9]+/g, "");
}

function getSheetConfig() {
  const sheetId = process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID;
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
  if (sheetId && apiKey) {
    return { sheetId, apiKey };
  }
  return null;
}

function extractSheetName(range: string) {
  const match = range.match(/^'?(.*?)'?!/);
  return match?.[1] ?? range;
}

async function fetchPublishedSheetValues(sheetId: string, range: string) {
  const sheetName = extractSheetName(range);
  const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(
    sheetName,
  )}`;
  const response = await axios.get(url, {
    headers: { Accept: "application/json" },
  });
  const match = response.data.match(
    /google\.visualization\.Query\.setResponse\(([\s\S]*)\)\s*;?\s*$/,
  );
  if (!match?.[1]) {
    throw new Error("Published sheet response could not be parsed");
  }

  const payload = JSON.parse(match[1]);
  const rows = payload?.table?.rows ?? [];
  return rows.map((row: any) =>
    (row?.c ?? []).map((cell: any) => cell?.v ?? ""),
  );
}

async function fetchSheetValues(
  sheetId: string,
  range: string,
  apiKey?: string,
) {
  if (apiKey) {
    try {
      const encodedRange = encodeURIComponent(range);
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodedRange}`;
      const response = await axios.get(url, { params: { key: apiKey } });
      return response.data.values ?? [];
    } catch (error: any) {
      const status = error?.response?.status;
      const message =
        error?.response?.data?.error?.message ?? error?.message ?? "";
      if (
        status !== 403 &&
        !/permission|not found|does not exist/i.test(message)
      ) {
        throw error;
      }
      // Fall through to the "published to web" fallback below.
    }
  }

  return fetchPublishedSheetValues(sheetId, range);
}

/** Accepts "Class 5", "class5", "5", "Nursery", "LKG", "ukg" and normalizes them, matching services/schedule.ts. */
function normalizeClassName(raw: string): string {
  const value = String(raw).trim();
  if (/^nursery$/i.test(value)) return "Nursery";

  const compact = value.toLowerCase().replace(/[^a-z]/g, "");
  if (compact === "lkg") return "LKG";
  if (compact === "ukg") return "UKG";

  const digits = value.match(/\d{1,2}/);
  if (digits) return `Class ${digits[0]}`;
  return value;
}

function classSortIndex(className: string) {
  const index = CLASS_ORDER.indexOf(className);
  return index === -1 ? CLASS_ORDER.length : index;
}

/** Strips currency symbols/commas/whitespace and parses a number. Returns null if not parseable. */
function parseAmount(raw: string): number | null {
  const cleaned = String(raw).replace(/[^\d.]/g, "");
  if (!cleaned) return null;
  const value = Number(cleaned);
  return Number.isFinite(value) ? value : null;
}

function buildStructureRows(
  rows: string[][],
  headers: string[],
): FeeStructureItem[] {
  const normalizedHeaders = headers.map(normalizeHeader);

  const items = rows
    .map((row) => {
      if (!row || !row.some((cell) => String(cell ?? "").trim())) return null;

      const values = normalizedHeaders.reduce<Record<string, string>>(
        (acc, header, index) => {
          acc[header] = row[index] != null ? String(row[index]) : "";
          return acc;
        },
        {},
      );

      const className = normalizeClassName(
        values.class || values.classname || values.grade || "",
      );
      const monthlyFee = parseAmount(
        values.monthlyfee || values.fee || values.amount || "",
      );
      const explicitAnnual = parseAmount(
        values.annualfee || values.yearlyfee || "",
      );

      if (!className || monthlyFee == null) return null;

      return {
        class: className,
        monthlyFee,
        annualFee: explicitAnnual ?? monthlyFee * 12,
      };
    })
    .filter((item): item is FeeStructureItem => Boolean(item));

  return items.sort(
    (a, b) =>
      classSortIndex(a.class) - classSortIndex(b.class) ||
      a.class.localeCompare(b.class),
  );
}

function buildHighlightRows(
  rows: string[][],
  headers: string[],
): FeeHighlightItem[] {
  const normalizedHeaders = headers.map(normalizeHeader);

  return rows
    .map((row) => {
      if (!row || !row.some((cell) => String(cell ?? "").trim())) return null;

      const values = normalizedHeaders.reduce<Record<string, string>>(
        (acc, header, index) => {
          acc[header] = row[index] != null ? String(row[index]) : "";
          return acc;
        },
        {},
      );

      const title = String(values.title || values.name || "").trim();
      const amount = String(values.amount || values.fee || "").trim();
      const time = String(
        values.time || values.period || values.duration || "",
      ).trim();
      const description = String(
        values.description || values.details || "",
      ).trim();
      const type = String(values.type || values.category || "").trim();

      if (!title || !amount) return null;

      return { title, amount, time, description, type };
    })
    .filter((item): item is FeeHighlightItem => Boolean(item));
}

/** Fetches a tab's values, treating "sheet not found" as an empty result rather than a hard failure. */
async function fetchTabSafely(
  sheetId: string,
  range: string,
  apiKey: string,
): Promise<string[][]> {
  try {
    return await fetchSheetValues(sheetId, range, apiKey);
  } catch (error: any) {
    const message =
      error?.response?.data?.error?.message ?? error?.message ?? "";
    if (/permission|not found|does not exist/i.test(message)) {
      return [];
    }
    throw error;
  }
}

export async function getFeeData(): Promise<FeeResult> {
  try {
    const config = getSheetConfig();
    if (!config) {
      return {
        success: false,
        data: null,
        message:
          "Google Sheets is not configured (missing NEXT_PUBLIC_GOOGLE_SHEET_ID / NEXT_PUBLIC_GOOGLE_API_KEY).",
        reason: "not-configured",
      };
    }

    let structureValues: string[][] = [];
    let highlightValues: string[][] = [];

    try {
      [structureValues, highlightValues] = await Promise.all([
        fetchTabSafely(config.sheetId, STRUCTURE_RANGE, config.apiKey),
        fetchTabSafely(config.sheetId, HIGHLIGHT_RANGE, config.apiKey),
      ]);
    } catch (error: any) {
      return {
        success: false,
        data: null,
        message:
          "Could not load fee information from Google Sheets. Please try again shortly.",
        reason: "load-error",
      };
    }

    const [structureHeaderRow, ...structureRows] = structureValues;
    const [highlightHeaderRow, ...highlightRows] = highlightValues;

    const feeStructure = structureValues.length
      ? buildStructureRows(
          structureRows,
          (structureHeaderRow ?? []).map((h) => String(h)),
        )
      : [];
    const feeHighlights = highlightValues.length
      ? buildHighlightRows(
          highlightRows,
          (highlightHeaderRow ?? []).map((h) => String(h)),
        )
      : [];

    if (!feeStructure.length && !feeHighlights.length) {
      return {
        success: false,
        data: null,
        message:
          "Fee details haven't been published yet. Please check back soon or contact the school office.",
        reason: "empty",
      };
    }

    return {
      success: true,
      data: { feeStructure, feeHighlights },
    };
  } catch (error: any) {
    console.error("Error fetching fee data from Google Sheet:", error);
    return {
      success: false,
      data: null,
      message:
        error?.message || "Something went wrong loading fee information.",
      reason: "load-error",
    };
  }
}
