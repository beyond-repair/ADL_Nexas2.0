import { o as __toESM } from "../_runtime.mjs";
import { o as MISSION_LABEL } from "./company-DDdSGDdi.mjs";
import { C as require_jsx_runtime, X as require_react, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as useReadySession, t as Shell } from "./shell-CZ391mUm.mjs";
import { t as Alert } from "./nexus-ui-D8VU1C9e.mjs";
import { r as useCompany } from "./use-company-BBzioDxH.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/missions-ClcR7EFb.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var FILTERS = [
	{
		id: "all",
		label: "All"
	},
	{
		id: "yours",
		label: "Needs you"
	},
	{
		id: "work",
		label: "In the company"
	},
	{
		id: "closed",
		label: "Closed"
	}
];
function inFilter(status, filter) {
	if (filter === "all") return true;
	if (filter === "yours") return status === "AWAITING_ACCEPTANCE";
	if (filter === "closed") return status === "ACCEPTED" || status === "CANCELLED";
	return status === "PROPOSED" || status === "PLANNED" || status === "AUTHORIZED" || status === "EXECUTING" || status === "REJECTED";
}
function MissionsPage() {
	const { user, pending } = useReadySession();
	if (pending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "py-8 text-sm text-muted",
		children: "Checking session"
	}) });
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
		className: "py-8 text-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/login",
			className: "text-accent",
			children: "Sign in"
		}), " to see the missions."]
	}) });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {}) });
}
function List() {
	const { data, error, loading } = useCompany("command");
	const [filter, setFilter] = (0, import_react.useState)("all");
	if (loading && !data) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "py-8 text-sm text-muted",
		children: "Loading missions"
	});
	if (!data) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Alert, { children: error ?? "Missions did not load." });
	const shown = data.missions.filter((mission) => inFilter(mission.status, filter));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "py-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-medium",
				children: "Missions"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 max-w-xl text-sm text-muted",
				children: "Every objective the company has been given. Open one to plan, run, or accept it."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "-mx-4 mt-4 flex gap-1 overflow-x-auto px-4",
				children: FILTERS.map((item) => {
					const count = data.missions.filter((mission) => inFilter(mission.status, item.id)).length;
					const active = filter === item.id;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						"aria-pressed": active,
						className: `inline-flex h-11 shrink-0 items-center px-3 text-sm ${active ? "text-accent" : "text-muted"}`,
						onClick: () => setFilter(item.id),
						children: [
							item.label,
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "ml-2 font-mono text-xs tabular-nums",
								children: count
							})
						]
					}, item.id);
				})
			}),
			data.missions.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-6 text-sm text-muted",
				children: ["None yet. ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "text-accent",
					children: "Establish one from the command center."
				})]
			}) : shown.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-6 text-sm text-muted",
				children: "Nothing in this set."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-4 divide-y divide-line border-y border-line",
				children: shown.map((mission) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MissionRow, { mission }, mission.id))
			})
		]
	});
}
function MissionRow({ mission }) {
	const tone = mission.status === "REJECTED" || mission.status === "CANCELLED" ? "text-danger" : mission.status === "AWAITING_ACCEPTANCE" || mission.status === "ACCEPTED" ? "text-accent" : "text-muted";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/missions/$missionId",
		params: { missionId: mission.id },
		className: "block py-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "flex items-baseline justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "min-w-0 truncate font-medium",
					children: mission.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: `shrink-0 font-mono text-xs ${tone}`,
					children: MISSION_LABEL[mission.status]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mt-1 line-clamp-2 block text-sm text-muted",
				children: mission.objective
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "mt-1 block font-mono text-xs text-muted tabular-nums",
				children: [
					mission.done,
					"/",
					mission.total || "—",
					" departments"
				]
			})
		]
	}) });
}
//#endregion
export { MissionsPage as component };
