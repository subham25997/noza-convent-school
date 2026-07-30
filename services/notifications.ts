import { google } from "googleapis";

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

function normalizePrivateKey(privateKey: string | undefined) {
  if (!privateKey) {
    return undefined;
  }

  return privateKey
    .trim()
    .replace(/^['"]|['"]$/g, "")
    .replace(/\\n/g, "\n");
}

function getSheetCredentials(env: NodeJS.ProcessEnv = process.env) {
  const sheetId = env.GOOGLE_SHEET_ID?.trim();
  const clientEmail = env.GOOGLE_CLIENT_EMAIL?.trim();
  const privateKey = normalizePrivateKey(env.GOOGLE_PRIVATE_KEY);

  if (sheetId && clientEmail && privateKey) {
    return {
      sheetId,
      credentials: {
        client_email: clientEmail,
        private_key: privateKey,
      },
    };
  }

  const serviceAccountJson = env.GOOGLE_SERVICE_ACCOUNT || env.GOOGLE_CREDENTIALS;
  if (serviceAccountJson) {
    try {
      const parsed = JSON.parse(serviceAccountJson);
      if (parsed.client_email && parsed.private_key) {
        return {
          sheetId: env.GOOGLE_SHEET_ID?.trim() || parsed.spreadsheet_id || parsed.sheet_id,
          credentials: {
            client_email: parsed.client_email,
            private_key: normalizePrivateKey(parsed.private_key),
          },
        };
      }
    } catch {
      // Ignore malformed JSON and fall back to the individual env var path.
    }
  }

  return null;
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
    const credentials = getSheetCredentials();

    if (!credentials?.sheetId || !credentials.credentials.client_email || !credentials.credentials.private_key) {
      console.warn("Google Sheets configuration is incomplete. Skipping notifications fetch.");
      return { success: true, notifications: [], message: "Notifications not configured" };
    }

    const auth = new google.auth.GoogleAuth({
      credentials: credentials.credentials,
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const sheets = google.sheets({
      version: "v4",
      auth,
    });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: credentials.sheetId,
      range: "Notifications!A:Z",
    });

    const values = response.data.values ?? [];

    const [headers, ...rows] = values;
    const notifications = rows
      .map((row) => buildNotification(row, headers ?? []))
      .filter((notification): notification is NotificationItem => Boolean(notification))
      .sort((first, second) => {
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
  return notifications.find((notification) => notification.slug === slug) ?? null;
}

export default getNotifications;
