import axios from "axios";

export type NotificationItem = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  publishedAt: string;
  isNew: boolean;
};

export type NotificationsResult =
  | { success: true; notifications: NotificationItem[] }
  | {
      success: false;
      notifications: NotificationItem[];
      message: string;
      reason: "not-configured" | "load-error" | "empty";
    };

/** The single sheet tab this feature reads from. */
const SHEET_RANGE = "Notifications";

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

function toSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/** Best-effort date normalizer, matching services/schedule.ts. */
function normalizeDate(raw: string): string | null {
  const value = String(raw).trim();
  if (!value) return null;

  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;

  const dmy = value.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{4})$/);
  if (dmy) {
    const [, d, m, y] = dmy;
    return `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`;
  }

  const parsed = new Date(value);
  if (!Number.isNaN(parsed.getTime())) {
    return parsed.toISOString().slice(0, 10);
  }

  return null;
}

function buildNotification(
  row: string[],
  headers: string[],
  usedSlugs: Set<string>,
): NotificationItem | null {
  if (!row || !row.some((cell) => cell && String(cell).trim())) {
    return null;
  }

  const values = headers.reduce<Record<string, string>>(
    (acc, header, index) => {
      acc[header] = row[index] != null ? String(row[index]) : "";
      return acc;
    },
    {},
  );

  const id = String(values.id || "").trim();
  const title = String(
    values.title || values.subject || values.notice || values.name || "",
  ).trim();
  if (!title) return null;

  const content = String(
    values.description || values.details || values.content || "",
  ).trim();
  const summary =
    content.length > 140 ? `${content.slice(0, 140).trim()}…` : content;
  const category = String(values.category || "General").trim() || "General";
  const publishedAt =
    normalizeDate(values.date || values.publishedon || "") || "";
  const expiryDate = normalizeDate(
    values.expirydate || values.expireson || values.expiry || "",
  );
  const status = String(values.status || "")
    .trim()
    .toLowerCase();

  // Skip anything past its expiry date — staff can set-and-forget an
  // expiry rather than remembering to delete the row later.
  if (expiryDate) {
    const today = new Date().toISOString().slice(0, 10);
    if (expiryDate < today) return null;
  }

  let slug = toSlug(title) || `notice-${id || Date.now()}`;
  if (usedSlugs.has(slug)) {
    slug = `${slug}-${id || usedSlugs.size + 1}`;
  }
  usedSlugs.add(slug);

  return {
    id: id || slug,
    slug,
    title,
    summary: summary || title,
    content: content || title,
    category,
    publishedAt,
    isNew: status === "new",
  };
}

export async function getNotifications(): Promise<NotificationsResult> {
  try {
    const config = getSheetConfig();
    if (!config) {
      return {
        success: false,
        notifications: [],
        message: "Google Sheets is not configured for notifications.",
        reason: "not-configured",
      };
    }

    let values: string[][] = [];
    try {
      values = await fetchSheetValues(
        config.sheetId,
        SHEET_RANGE,
        config.apiKey,
      );
    } catch {
      return {
        success: false,
        notifications: [],
        message: "Could not load notifications from Google Sheets.",
        reason: "load-error",
      };
    }

    if (!values.length) {
      return {
        success: false,
        notifications: [],
        message: "No notifications yet.",
        reason: "empty",
      };
    }

    const [headerRow, ...rows] = values;
    const headers = (headerRow ?? []).map((h: string) =>
      normalizeHeader(String(h)),
    );

    const usedSlugs = new Set<string>();
    const notifications = rows
      .map((row) => buildNotification(row, headers, usedSlugs))
      .filter((n): n is NotificationItem => Boolean(n))
      .sort((a, b) => (b.publishedAt || "").localeCompare(a.publishedAt || ""));

    if (!notifications.length) {
      return {
        success: false,
        notifications: [],
        message: "No active notifications right now.",
        reason: "empty",
      };
    }

    return { success: true, notifications };
  } catch (error: any) {
    console.error("Error fetching notifications from Google Sheet:", error);
    return {
      success: false,
      notifications: [],
      message: error?.message || "Something went wrong loading notifications.",
      reason: "load-error",
    };
  }
}

export async function getNotificationBySlug(
  slug: string,
): Promise<NotificationItem | null> {
  const result = await getNotifications();
  if (!result.success) return null;
  return result.notifications.find((n) => n.slug === slug) ?? null;
}

export default getNotifications;
