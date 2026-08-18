import Link from "next/link";
import { notFound } from "next/navigation";
import { BiArrowBack, BiBell, BiCalendar } from "react-icons/bi";
import { getNotificationBySlug } from "@/services/notifications";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const notification = await getNotificationBySlug(slug);

  if (!notification) {
    return {
      title: "Notification not found",
    };
  }

  return {
    title: `${notification.title} | Noza Convent School`,
    description: notification.summary,
  };
}

export default async function NotificationDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const notification = await getNotificationBySlug(slug);

  if (!notification) {
    notFound();
  }

  return (
    <main className="relative overflow-hidden bg-white px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 -top-40 size-[26rem] rounded-full bg-lime-200/35 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-24 size-[22rem] rounded-full bg-amber-200/35 blur-3xl"
      />

      <div className="relative mx-auto max-w-3xl">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-amber-600 transition hover:text-amber-700"
        >
          <BiArrowBack className="text-base" aria-hidden />
          Back to home
        </Link>

        <div className="mt-6 overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04),0_24px_60px_-40px_rgba(15,23,42,0.35)]">
          <div className="border-b border-slate-100 px-6 py-8 sm:px-10 sm:py-10">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="grid size-12 flex-shrink-0 place-items-center rounded-2xl bg-amber-100 text-amber-700">
                  <BiBell className="text-2xl" aria-hidden />
                </div>
                <div>
                  <span className="inline-flex items-center rounded-full bg-lime-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-lime-700">
                    {notification.category}
                  </span>
                  <h1 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                    {notification.title}
                  </h1>
                </div>
              </div>

              <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600">
                <BiCalendar className="text-base text-slate-400" aria-hidden />
                {notification.publishedAt || "Recently published"}
              </div>
            </div>
          </div>

          <div className="px-6 py-8 sm:px-10 sm:py-10">
            <div className="whitespace-pre-line text-base leading-8 text-slate-700">
              {notification.content}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
