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
  isPinned: boolean;
};

function normalizeHeader(header: string) {
  return header.toLowerCase().replace(/[^a-z0-9]+/g, "");
}

function getSheetConfig(env: NodeJS.ProcessEnv = process.env) {
  const sheetId = env.GOOGLE_SHEET_ID?.trim();
  const apiKey = env.GOOGLE_API_KEY?.trim() || env.GOOGLE_SHEET_API_KEY?.trim();

  if (sheetId && apiKey) {
    return {
      sheetId,
      apiKey,
    };
  }

  return null;
}

function extractSheetName(range: string) {
  const match = range.match(/^'?(.*?)'?!/);
  return match?.[1] ?? range;
}

async function fetchPublishedSheetValues(sheetId: string, range: string) {
  const sheetName = extractSheetName(range);
  const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(sheetName)}`;
  const response = await axios.get(url, {
    headers: {
      Accept: "application/json",
    },
  });

  const match = response.data.match(/google\.visualization\.Query\.setResponse\(([\s\S]*)\)\s*;?\s*$/);
  if (!match?.[1]) {
    throw new Error("Published sheet response could not be parsed");
  }

  const payload = JSON.parse(match[1]);
  const rows = payload?.table?.rows ?? [];
  const values = rows.map((row: any) => (row?.c ?? []).map((cell: any) => cell?.v ?? ""));

  return values;
}

async function fetchSheetValues(sheetId: string, range: string, apiKey?: string) {
  if (apiKey) {
    try {
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodeURIComponent(range)}`;
      const response = await axios.get(url, {
        params: { key: apiKey },
      });

      return response.data.values ?? [];
    } catch (error: any) {
      const status = error?.response?.status;
      const message = error?.response?.data?.error?.message ?? error?.message ?? "";
      if (status !== 403 && !/permission|not found|does not exist/i.test(message)) {
        throw error;
      }
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

function buildNotification(row: string[], headers: string[]): NotificationItem | null {
  if (!row || !row.some((cell) => cell && String(cell).trim())) {
    return null;
  }

  const normalizedHeaders = headers.map((header) => normalizeHeader(header));
  const values = normalizedHeaders.reduce<Record<string, string>>((acc, header, index) => {
    acc[header] = row[index] ?? "";
    return acc;
  }, {});

  const title = String(values.title || values.subject || values.notice || values.name || "").trim();
  if (!title) {
    return null;
  }

  const summary = String(values.shortDescription || "").trim();
  const content = String(values.description || "").trim();
  const category = String(values.category || "General").trim() || "General";
  const publishedAt = String(values.date || "").trim();
  const slug = String(values.slug || values.id || toSlug(title)).trim() || toSlug(title);
  const isNew = /new|urgent|important|announcement/i.test(
    String(values.isnew || values.status || values.priority || "").toLowerCase(),
  );
  const isPinned = /pinned|featured|important|urgent/i.test(
    String(values.ispinned || values.priority || values.status || "").toLowerCase(),
  );

  return {
    id: slug,
    slug,
    title,
    summary: summary || content,
    content: content || summary,
    category,
    publishedAt,
    isNew: isNew || values.isnew === "1" || values.isnew === "true",
    isPinned,
  };
}

export async function getNotifications() {
  try {
    const config = getSheetConfig();

    if (!config?.sheetId || !config.apiKey) {
      console.warn("Google Sheets API key is missing. Skipping notifications fetch.");
      return { success: true, notifications: [], message: "Notifications not configured" };
    }

    let values: string[][] = [];
    try {
      values = await fetchSheetValues(config.sheetId, "Notifications!A:Z", config.apiKey);
    } catch (error: any) {
      const message = error?.response?.data?.error?.message ?? error?.message ?? "";
      if (!/Unable to parse range|not found|does not exist|permission|published/i.test(message)) {
        throw error;
      }

      return {
        success: true,
        notifications: [],
        message: "Notifications sheet could not be loaded. Please publish the sheet to the web or share it with Anyone with the link.",
      };
    }

    const [headers, ...rows] = values;
    const notifications = rows
      .map((row: string[]) => buildNotification(row, headers ?? []))
      .filter((notification: NotificationItem | null): notification is NotificationItem => Boolean(notification))
      .sort((first: NotificationItem, second: NotificationItem) => {
        const firstTime = Date.parse(first.publishedAt || "0");
        const secondTime = Date.parse(second.publishedAt || "0");
        return secondTime - firstTime;
      });

    return {
      notifications: notifications.length ? notifications : [],
      success: true,
    };
  } catch (error: Error | any) {
    console.error("Error fetching notifications from Google Sheet:", error);
    return { notifications: [], success: false, error: error.message };
  }
}

export async function getNotificationBySlug(slug: string) {
  const { notifications } = await getNotifications();
  return notifications.find((notification: NotificationItem) => notification.slug === slug) ?? null;
}

export default getNotifications;
