import { useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { Shell, useReadySession } from "@/components/shell";
import { Alert } from "@/components/nexus-ui";
import { MISSION_LABEL, type MissionStatus } from "@/lib/nexus/company";
import type { CommandCenter, MissionSummary } from "@/lib/nexus/company-store";
import { useCompany } from "@/lib/nexus/use-company";

export const Route = createFileRoute("/missions/")({ component: MissionsPage });

const FILTERS = [
  { id: "all", label: "All" },
  { id: "yours", label: "Needs you" },
  { id: "work", label: "In the company" },
  { id: "closed", label: "Closed" },
] as const;

type FilterId = (typeof FILTERS)[number]["id"];

function inFilter(status: MissionStatus, filter: FilterId): boolean {
  if (filter === "all") return true;
  if (filter === "yours") return status === "AWAITING_ACCEPTANCE";
  if (filter === "closed") return status === "ACCEPTED" || status === "CANCELLED";
  return status === "PROPOSED" || status === "PLANNED" || status === "AUTHORIZED" || status === "EXECUTING" || status === "REJECTED";
}

function MissionsPage() {
  const { user, pending } = useReadySession();
  if (pending) return <Shell><p className="py-8 text-sm text-muted">Checking session</p></Shell>;
  if (!user) {
    return (
      <Shell>
        <p className="py-8 text-sm">
          <Link to="/login" className="text-accent">Sign in</Link> to see the missions.
        </p>
      </Shell>
    );
  }
  return (
    <Shell>
      <List />
    </Shell>
  );
}

function List() {
  const { data, error, loading } = useCompany<CommandCenter>("command");
  const [filter, setFilter] = useState<FilterId>("all");
  if (loading && !data) return <p className="py-8 text-sm text-muted">Loading missions</p>;
  if (!data) return <Alert>{error ?? "Missions did not load."}</Alert>;
  const shown = data.missions.filter((mission) => inFilter(mission.status, filter));
  return (
    <div className="py-6">
      <h1 className="text-2xl font-medium">Missions</h1>
      <p className="mt-2 max-w-xl text-sm text-muted">Every objective the company has been given. Open one to plan, run, or accept it.</p>
      <div className="-mx-4 mt-4 flex gap-1 overflow-x-auto px-4">
        {FILTERS.map((item) => {
          const count = data.missions.filter((mission) => inFilter(mission.status, item.id)).length;
          const active = filter === item.id;
          return (
            <button
              key={item.id}
              type="button"
              aria-pressed={active}
              className={`inline-flex h-11 shrink-0 items-center px-3 text-sm ${active ? "text-accent" : "text-muted"}`}
              onClick={() => setFilter(item.id)}
            >
              {item.label} <span className="ml-2 font-mono text-xs tabular-nums">{count}</span>
            </button>
          );
        })}
      </div>
      {data.missions.length === 0 ? (
        <p className="mt-6 text-sm text-muted">
          None yet. <Link to="/" className="text-accent">Establish one from the command center.</Link>
        </p>
      ) : shown.length === 0 ? (
        <p className="mt-6 text-sm text-muted">Nothing in this set.</p>
      ) : (
        <ul className="mt-4 divide-y divide-line border-y border-line">
          {shown.map((mission) => (
            <MissionRow key={mission.id} mission={mission} />
          ))}
        </ul>
      )}
    </div>
  );
}

function MissionRow({ mission }: { mission: MissionSummary }) {
  const tone =
    mission.status === "REJECTED" || mission.status === "CANCELLED"
      ? "text-danger"
      : mission.status === "AWAITING_ACCEPTANCE" || mission.status === "ACCEPTED"
        ? "text-accent"
        : "text-muted";
  return (
    <li>
      <Link to="/missions/$missionId" params={{ missionId: mission.id }} className="block py-3">
        <span className="flex items-baseline justify-between gap-3">
          <span className="min-w-0 truncate font-medium">{mission.title}</span>
          <span className={`shrink-0 font-mono text-xs ${tone}`}>{MISSION_LABEL[mission.status]}</span>
        </span>
        <span className="mt-1 line-clamp-2 block text-sm text-muted">{mission.objective}</span>
        <span className="mt-1 block font-mono text-xs text-muted tabular-nums">
          {mission.done}/{mission.total || "—"} departments
        </span>
      </Link>
    </li>
  );
}