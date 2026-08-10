"use server";

/**
 * Examination Schedule service.
 *
 * Today this reads/writes a local JSON file. Marking the file "use server"
 * turns getSchedule/saveSchedule into Server Actions, so client components
 * can import and call them directly — no separate API route needed.
 *
 * MIGRATION PATH: when the school wants to manage this from a Google Sheet
 * instead (see services/notifications.ts for the existing pattern used on
 * this site), only the body of these two functions needs to change — every
 * component that calls getSchedule()/saveSchedule() keeps working as-is.
 */

import { promises as fs } from "fs";
import path from "path";
import type { Schedule } from "@/types/schedule";

const SCHEDULE_FILE_PATH = path.join(process.cwd(), "data", "schedule.json");

export async function getSchedule(): Promise<Schedule> {
  const raw = await fs.readFile(SCHEDULE_FILE_PATH, "utf-8");
  return JSON.parse(raw) as Schedule;
}

export async function saveSchedule(updated: Schedule): Promise<void> {
  // NOTE: this is a real write to data/schedule.json, which is convenient
  // for local development and demos. On serverless hosts (e.g. Vercel) the
  // filesystem at runtime is read-only, so treat this as a "mocked" write
  // for the live site until the Google Sheet integration replaces it —
  // the calling code never has to know the difference either way.
  const serialized = JSON.stringify(updated, null, 2);
  await fs.writeFile(SCHEDULE_FILE_PATH, serialized, "utf-8");
}
