import { useState, type FormEvent } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { PayCard } from "@/components/company-notes";
import { Shell, useReadySession } from "@/components/shell";
import { Alert, Button, controlClass, when } from "@/components/nexus-ui";
import { formatMoney, dollarsToCents } from "@/lib/nexus/company";
import { companyCommand } from "@/lib/nexus/company-api";
import type { PaymentsView } from "@/lib/nexus/company-store";
import { errorText, useCompany } from "@/lib/nexus/use-company";

export const Route = createFileRoute("/payments")({ component: PaymentsPage });

function PaymentsPage() {
  const { user, pending } = useReadySession();
  return (
    <Shell>
      {pending ? <p className="py-8 text-sm text-muted">Checking session</p> : user ? <Ledger /> : (
        <p className="py-8 text-sm"><Link to="/login" className="text-accent">Sign in</Link> to see payments.</p>
      )}
    </Shell>
  );
}

function Ledger() {
  const { data, error, loading, reload } = useCompany<PaymentsView>("payments");
  const [payer, setPayer] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [missionId, setMissionId] = useState("");
  const [busy, setBusy] = useState(false);
  const [voiding, setVoiding] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const cents = dollarsToCents(amount);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setFormError(null);
    try {
      await companyCommand({ data: { type: "record-payment", payer, amount, note, missionId } });
      setPayer("");
      setAmount("");
      setNote("");
      setMissionId("");
      reload();
    } catch (err) {
      setFormError(errorText(err));
    } finally {
      setBusy(false);
    }
  }

  if (loading && !data) return <p className="py-8 text-sm text-muted">Loading payments</p>;
  if (!data) return <Alert>{error ?? "Payments did not load."}</Alert>;

  return (
    <div className="grid gap-10 py-6 lg:grid-cols-[minmax(0,1fr)_18rem]">
      <div>
        <h1 className="text-2xl font-medium">Payments</h1>
        <p className="mt-2 max-w-xl text-sm text-muted">
          {data.destination.business} is paid at {data.destination.cashtag}. This ledger is what you write down after the money arrives. It is not a receipt from Cash App.
        </p>
        <p className="mt-4 font-mono text-lg tabular-nums">Recorded {formatMoney(data.totalCents)}</p>

        <form onSubmit={(event) => void submit(event)} className="mt-8 max-w-xl space-y-3">
          <label className="block text-sm">
            Who paid
            <input value={payer} onChange={(event) => setPayer(event.target.value)} className={`${controlClass} mt-1 h-11`} />
          </label>
          <label className="block text-sm">
            Amount
            <input value={amount} onChange={(event) => setAmount(event.target.value)} inputMode="decimal" placeholder="25.00" className={`${controlClass} mt-1 h-11`} />
          </label>
          {amount.trim() && cents == null ? <p className="text-sm text-danger">Use an amount like 25 or 25.00.</p> : null}
          <label className="block text-sm">
            Mission
            <select value={missionId} onChange={(event) => setMissionId(event.target.value)} className={`${controlClass} mt-1 h-11`}>
              <option value="">Not tied to a mission</option>
              {data.missions.map((mission) => (
                <option key={mission.id} value={mission.id}>{mission.title}</option>
              ))}
            </select>
          </label>
          <label className="block text-sm">
            Note
            <input value={note} onChange={(event) => setNote(event.target.value)} className={`${controlClass} mt-1 h-11`} />
          </label>
          {formError ? <Alert>{formError}</Alert> : null}
          <Button type="submit" disabled={busy || payer.trim().length < 2 || cents == null}>
            {busy ? "Recording…" : cents ? `Record ${formatMoney(cents)}` : "Record the payment"}
          </Button>
        </form>

        {data.rows.length === 0 ? (
          <p className="mt-8 text-sm text-muted">Nothing recorded yet.</p>
        ) : (
          <ul className="mt-8 divide-y divide-line border-y border-line">
            {data.rows.map((row) => (
              <li key={row.id} className="py-3">
                <div className="flex items-baseline justify-between gap-3">
                  <span className={`text-sm ${row.voidedAt ? "text-muted line-through" : ""}`}>{row.payer}</span>
                  <span className="font-mono text-sm tabular-nums">{formatMoney(row.amountCents)}</span>
                </div>
                <p className="mt-1 text-xs text-muted">
                  {row.voidedAt ? "Voided · " : ""}{row.method} {row.destination} · {when(row.createdAt)}
                </p>
                {row.missionId && row.missionTitle ? (
                  <p className="mt-1 text-sm">
                    <Link to="/missions/$missionId" params={{ missionId: row.missionId }} className="text-accent">
                      {row.missionTitle}
                    </Link>
                  </p>
                ) : null}
                {row.note ? <p className="mt-1 text-sm text-muted">{row.note}</p> : null}
                {row.voidedAt ? (
                  <p className="mt-1 text-xs text-muted">Voided {when(row.voidedAt)}. The row stays. This is not a refund.</p>
                ) : (
                  <button
                    type="button"
                    className="mt-2 inline-flex h-11 items-center text-sm text-danger"
                    disabled={busy}
                    onClick={() => {
                      if (voiding !== row.id) {
                        setVoiding(row.id);
                        return;
                      }
                      setBusy(true);
                      setFormError(null);
                      void companyCommand({ data: { type: "void-payment", paymentId: row.id } })
                        .then(() => {
                          setVoiding(null);
                          reload();
                        })
                        .catch((err: unknown) => setFormError(errorText(err)))
                        .finally(() => setBusy(false));
                    }}
                  >
                    {voiding === row.id ? "Confirm void" : "Void this record"}
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
        {error ? (
          <button type="button" className="mt-4 text-sm text-danger" onClick={reload}>
            {error} Retry
          </button>
        ) : null}
      </div>
      <PayCard poster />
    </div>
  );
}
