import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { formatMoney, PAYMENT, RUN_TOKEN } from "@/lib/nexus/company";

export function RunTokenNote() {
  return <p className="text-sm leading-relaxed text-muted">{RUN_TOKEN}</p>;
}

export function PayCard({
  poster = false,
  recordedCents,
  recordedLabel = "Recorded",
}: {
  poster?: boolean;
  recordedCents?: number;
  recordedLabel?: string;
}) {
  const [copied, setCopied] = useState<"yes" | "no" | null>(null);

  async function copy() {
    try {
      await navigator.clipboard.writeText(PAYMENT.cashtag);
      setCopied("yes");
    } catch {
      setCopied("no");
    }
  }

  return (
    <section>
      <h2 className="text-sm font-medium">Payments</h2>
      <p className="mt-2 text-sm">{PAYMENT.business}</p>
      <p className="font-mono text-sm">{PAYMENT.cashtag}</p>
      {typeof recordedCents === "number" ? (
        <p className="mt-1 font-mono text-sm tabular-nums">{recordedLabel} {formatMoney(recordedCents)}</p>
      ) : null}
      <p className="mt-1 text-xs leading-relaxed text-muted">
        {PAYMENT.method}. A scan pays Cash App. NEXUS does not move the money, and it does not confirm the payment arrived.
      </p>
      {poster ? (
        <img
          src={PAYMENT.qr}
          alt="Scan to pay Atomic Dream Labs on Cash App"
          className="mt-3 w-full max-w-sm rounded-md border border-line bg-white"
        />
      ) : null}
      <div className="mt-3 flex flex-wrap gap-x-4 text-sm">
        <button type="button" className="inline-flex h-11 items-center text-accent" onClick={() => void copy()}>
          {copied === "yes" ? "Cashtag copied" : copied === "no" ? "Copy failed — select the cashtag" : "Copy cashtag"}
        </button>
        <Link to="/payments" className="inline-flex h-11 items-center text-accent">
          Payment record
        </Link>
      </div>
    </section>
  );
}
