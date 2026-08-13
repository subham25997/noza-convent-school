"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  BiBookAlt,
  BiBus,
  BiCreditCard,
  BiSpreadsheet,
  BiErrorCircle,
  BiInfoCircle,
  BiLoaderAlt,
  BiWallet,
  BiHome,
  BiRun,
} from "react-icons/bi";
import { getFeeData, type FeeData, type FeeResult } from "@/services/fees";
import { CONTACT } from "@/config/contact";

type FailureState = Extract<FeeResult, { success: false }>;

const INR = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

const ICON_MAP: Record<string, typeof BiCreditCard> = {
  admission: BiCreditCard,
  readmission: BiCreditCard,
  tuition: BiBookAlt,
  exam: BiSpreadsheet,
  examination: BiSpreadsheet,
  transport: BiBus,
  bus: BiBus,
  hostel: BiHome,
  sports: BiRun,
  activity: BiRun,
};

function iconForHighlight(type: string, title: string) {
  const key = (type || title).toLowerCase().replace(/[^a-z]/g, "");
  for (const [needle, Icon] of Object.entries(ICON_MAP)) {
    if (key.includes(needle)) return Icon;
  }
  return BiWallet;
}

export default function FeeStructure() {
  const [data, setData] = useState<FeeData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [failure, setFailure] = useState<FailureState | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const result = await getFeeData();
        if (!result.success || !result.data) {
          setFailure(result);
          setData(null);
          return;
        }
        setData(result.data);
      } catch {
        setFailure({
          success: false,
          data: null,
          message: "Something went wrong loading fee information.",
          reason: "load-error",
        });
      } finally {
        setIsLoading(false);
      }
    }

    load();
  }, []);

  const highlights = useMemo(() => data?.feeHighlights ?? [], [data]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center rounded-[2rem] border border-slate-200 bg-white py-20 text-center">
        <BiLoaderAlt className="mb-4 animate-spin text-3xl text-lime-600" aria-hidden />
        <p className="text-sm text-slate-500">Loading fee structure…</p>
      </div>
    );
  }

  if (failure || !data) {
    if (failure?.reason === "empty") {
      return (
        <div className="flex flex-col items-center justify-center rounded-[2rem] border border-slate-200 bg-white py-16 text-center">
          <div className="mb-4 grid size-14 place-items-center rounded-2xl bg-lime-50 text-lime-600">
            <BiInfoCircle className="text-2xl" aria-hidden />
          </div>
          <h3 className="text-lg font-semibold text-slate-900">Fee details coming soon</h3>
          <p className="mt-2 max-w-md text-sm text-slate-600">{failure.message}</p>
          <ContactBlock />
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center justify-center rounded-[2rem] border border-slate-200 bg-white py-16 text-center">
        <div className="mb-4 grid size-14 place-items-center rounded-2xl bg-red-50 text-red-500">
          <BiErrorCircle className="text-2xl" aria-hidden />
        </div>
        <h3 className="text-lg font-semibold text-slate-900">Couldn&apos;t load fee details</h3>
        <p className="mt-2 max-w-md text-sm text-slate-600">
          {failure?.message ?? "Please try again shortly."}
        </p>
        <ContactBlock />
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* ================= TUITION TABLE ================= */}
      {data.feeStructure.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-[2rem] border border-slate-200 bg-white p-5 sm:p-8"
        >
          <div className="flex items-center gap-3">
            <div className="grid size-12 flex-shrink-0 place-items-center rounded-2xl bg-amber-100 text-amber-700">
              <BiBookAlt className="text-2xl" aria-hidden />
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-lime-700">
                Class-wise
              </span>
              <h2 className="mt-1 text-xl font-semibold text-slate-900 sm:text-2xl">
                Tuition Fees
              </h2>
            </div>
          </div>

          <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full min-w-[480px] border-collapse text-sm">
              <thead>
                <tr>
                  <th className="border-b border-slate-200 bg-slate-900 px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-white">
                    Class
                  </th>
                  <th className="border-b border-l border-slate-200 bg-slate-50 px-4 py-3 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Monthly Fee
                  </th>
                  <th className="border-b border-l border-slate-200 bg-slate-50 px-4 py-3 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Annual Fee
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.feeStructure.map((item, i) => (
                  <tr key={item.class} className={i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                    <td className="border-b border-slate-200 px-4 py-3 font-semibold text-slate-900">
                      {item.class}
                    </td>
                    <td className="border-b border-l border-slate-200 px-4 py-3 text-center font-medium text-slate-700">
                      {INR.format(item.monthlyFee)}
                    </td>
                    <td className="border-b border-l border-slate-200 px-4 py-3 text-center font-medium text-slate-700">
                      {INR.format(item.annualFee)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* ================= FEE HIGHLIGHTS ================= */}
      {highlights.length > 0 && (
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-4">
          {highlights.map((item, i) => {
            const Icon = iconForHighlight(item.type, item.title);
            const isAmber = i % 2 === 0;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -8 }}
                className={`group rounded-2xl sm:rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 transition-all duration-300 hover:shadow-xl ${
                  isAmber ? "hover:border-amber-300" : "hover:border-lime-300"
                }`}
              >
                <div
                  className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110 ${
                    isAmber
                      ? "bg-amber-100 text-amber-700"
                      : "bg-lime-100 text-lime-700"
                  }`}
                >
                  <Icon className="text-xl" aria-hidden />
                </div>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                  {item.title}
                </h3>
                <p className="mt-2 text-xl font-bold text-slate-900 sm:text-2xl">
                  {item.amount}
                </p>
                {item.time && (
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-lime-700">
                    {item.time}
                  </p>
                )}
                {item.description && (
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {item.description}
                  </p>
                )}
              </motion.div>
            );
          })}
        </div>
      )}

      {/* ================= NOTE + CONTACT ================= */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-slate-900 p-6 sm:p-8 text-white"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-lime-300">Note</p>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
          Fees are subject to change as per school policy and government guidelines. For the
          latest updates or payment plans, please contact the school office.
        </p>
        <ContactBlock dark />
      </motion.div>
    </div>
  );
}

function ContactBlock({ dark = false }: { dark?: boolean }) {
  return (
    <>
      <div
        className={`mt-6 space-y-2 text-sm ${dark ? "text-slate-200" : "text-slate-700"}`}
      >
        <p className="font-medium">Phone: {CONTACT.phoneDisplay}</p>
        <p className="font-medium">Email: {CONTACT.email}</p>
      </div>

      <a
        href={`${CONTACT.whatsappUrl}?text=${encodeURIComponent(
          "Hello, I would like to know the fee structure at Noza Convent School."
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex rounded-full bg-amber-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-amber-600"
      >
        Ask About Fees on WhatsApp
      </a>
    </>
  );
}