import axios from "axios";

export type CalendarEvent = {
  month: string;
  day: number;
  title: string;
  type: string;
  color: string;
};

function normalizeHeader(header: string) {
  return header.toLowerCase().replace(/[^a-z0-9]+/g, "");
}

function getSheetConfig() {
  const sheetId = process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID;
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
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
      const url = `https://sheets.googleapis.com/v4/spreadsheets/1rsGKWWABZbmtVs425H1MU8Gi5RngnNtOuUhxV3ENNcc/values/Calendar%20Events?key=AIzaSyCK59IksX8fYE5t9iLhTfnRXJyc6f2WpoI`;
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

function normalizeMonth(value: string) {
  const normalized = value.toLowerCase().trim();
  const monthMap: Record<string, string> = {
    jan: "January",
    january: "January",
    feb: "February",
    february: "February",
    mar: "March",
    march: "March",
    apr: "April",
    april: "April",
    may: "May",
    jun: "June",
    june: "June",
    jul: "July",
    july: "July",
    aug: "August",
    august: "August",
    sep: "September",
    sept: "September",
    september: "September",
    oct: "October",
    october: "October",
    nov: "November",
    november: "November",
    dec: "December",
    december: "December",
  };

  return monthMap[normalized] ?? value;
}

function normalizeType(value: string) {
  const normalized = value.toLowerCase().trim();
  if (["academic", "exam", "class", "study"].includes(normalized)) {
    return "academic";
  }
  if (["holiday", "vacation", "off"].includes(normalized)) {
    return "holiday";
  }
  if (["event", "celebration", "festival"].includes(normalized)) {
    return "event";
  }
  if (["break", "closure"].includes(normalized)) {
    return "break";
  }
  if (["meeting", "ptm", "parentteachermeeting"].includes(normalized)) {
    return "meeting";
  }

  return normalized || "event";
}

function getEventColor(type: string) {
  switch (type) {
    case "academic":
      return "bg-lime-600";
    case "holiday":
      return "bg-rose-500";
    case "event":
      return "bg-amber-500";
    case "break":
      return "bg-slate-600";
    case "meeting":
      return "bg-emerald-600";
    default:
      return "bg-slate-500";
  }
}

function buildCalendarEvent(row: string[], headers: string[]): CalendarEvent | null {
  if (!row || !row.some((cell) => cell && String(cell).trim())) {
    return null;
  }

  const normalizedHeaders = headers.map((header) => normalizeHeader(header));
  const values = normalizedHeaders.reduce<Record<string, string>>((acc, header, index) => {
    acc[header] = row[index] ?? "";
    return acc;
  }, {});

  const month = normalizeMonth(String(values.month || values.mth || values.mon || values.monthname || "").trim());
  const day = Number(String(values.day || values.date || values.d || values.dayofmonth || "").trim());
  const title = String(values.title || values.event || values.name || values.heading || "").trim();
  const type = normalizeType(String(values.type || values.category || values.kind || values.eventtype || "event").trim());

  if (!month || !title || Number.isNaN(day)) {
    return null;
  }

  return {
    month,
    day,
    title,
    type,
    color: getEventColor(type),
  };
}

export async function getCalendarEvents() {
  try {
    const config = getSheetConfig();
    console.log("Calendar sheet config:", config);
    if (!config?.sheetId || !config.apiKey) {
      console.warn("Google Sheets API key is missing. Skipping calendar fetch.");
      return { success: true, events: [], message: "Calendar not configured" };
    }

    let values: string[][] = [];
    try {
      values = await fetchSheetValues(config.sheetId, "Calendar Events", config.apiKey);
    } catch (error: any) {
      const message = error?.response?.data?.error?.message ?? error?.message ?? "";
      if (!/Unable to parse range|not found|does not exist|permission|published/i.test(message)) {
        throw error;
      }

      return {
        success: true,
        events: [],
        message: "Calendar sheet could not be loaded. Please publish the sheet to the web or share it with Anyone with the link.",
      };
    }

    if (!values.length) {
      return { success: true, events: [], message: "No calendar entries found" };
    }

    const [headers, ...rows] = values;
    const events = rows
      .map((row) => buildCalendarEvent(row, headers ?? []))
      .filter((event): event is CalendarEvent => Boolean(event))
      .sort((first, second) => {
        const firstMonth = first.month;
        const secondMonth = second.month;
        const monthOrder = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const firstIndex = monthOrder.indexOf(firstMonth);
        const secondIndex = monthOrder.indexOf(secondMonth);

        if (firstIndex !== secondIndex) {
          return (firstIndex === -1 ? 999 : firstIndex) - (secondIndex === -1 ? 999 : secondIndex);
        }

        return first.day - second.day;
      });

    return {
      events,
      success: true,
    };
  } catch (error: Error | any) {
    console.error("Error fetching calendar events from Google Sheet:", error);
    return { events: [], success: false, error: error.message };
  }
}
