import Link from "next/link";
import { notFound } from "next/navigation";
import { getNotificationBySlug } from "@/services/notifications";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
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

export default async function NotificationDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const notification = await getNotificationBySlug(slug);

  if (!notification) {
    notFound();
  }

  return (
    <main className="bg-slate-50 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
        <Link href="/" className="mb-6 inline-flex items-center text-sm font-medium text-amber-500 transition hover:text-orange-700">
          ← Back to home
        </Link>

        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">{notification.category}</p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-900">{notification.title}</h1>
          </div>
          <div className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-600">
            {notification.publishedAt || "Recently published"}
          </div>
        </div>

        <div className="mt-8 space-y-6 text-base leading-8 text-slate-700">
          <p className="text-lg text-slate-600">{notification.summary}</p>
          <div className="whitespace-pre-line">{notification.content}</div>
        </div>
      </div>
    </main>
  );
}
