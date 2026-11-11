import { a as LEVEL_LABEL, c as OWNER_GATES, d as RUN_TOKEN, l as PAYMENT, o as MISSION_LABEL, s as MISSION_PATH, u as PIPELINE } from "./company-DDdSGDdi.mjs";
import { C as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Shell } from "./shell-CZ391mUm.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/blueprint-DKJl6UM-.js
var import_jsx_runtime = require_jsx_runtime();
function BlueprintPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "max-w-2xl py-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-xs text-muted",
				children: "Operating contract · 2.0"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 text-3xl font-medium",
				children: "What this company can do"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm leading-relaxed text-muted",
				children: "NEXUS is the owner’s command center for Atomic Dream Labs. A mission moves through a fixed workforce. Completion is a passing verification record plus your acceptance. An agent saying it is done does not count."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
				title: "The loop",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "list-decimal space-y-1 pl-5 text-sm",
					children: MISSION_PATH.map((step) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: MISSION_LABEL[step] }, step))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
				title: "Workforce on this release",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-xs leading-relaxed text-muted",
					children: PIPELINE.join(" → ")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: "Research, product, architecture, design, and implementation are written when you run that department. Quality is computed from the artifacts. Operations assembles the packet and does not change the result."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
				title: "Permission",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-1 text-sm",
					children: LEVEL_LABEL.map((label) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: label }, label))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 list-disc space-y-1 pl-5 text-sm text-muted",
					children: OWNER_GATES.map((gate) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: gate }, gate))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
				title: "Run token",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm leading-relaxed text-muted",
					children: RUN_TOKEN
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
				title: "Payments",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm leading-relaxed text-muted",
					children: [
						PAYMENT.business,
						" receives money on ",
						PAYMENT.method,
						" at ",
						PAYMENT.cashtag,
						". NEXUS shows that destination and stores a payment only when you record it. It does not charge a card, and it does not ask Cash App whether the money arrived."
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
				title: "Honest limits",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "One workspace per signed-in owner." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "After you authorize, Run the company walks the remaining departments and updates the record after each one. It stops if quality fails. Leaving the page stops the walk. Coming back reloads the record, and a run older than 90 seconds is released." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Accepted missions become verified memory, including a short specification and the implementation. The next plan and every department read that memory. Unaccepted drafts do not." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "A rejected packet can return to the plan. The departments run again. Rewriting the strategy is allowed after a rejection, even if work already ran." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "A recorded payment can be voided. The row stays, the total drops it, and voiding is not a refund." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Rewriting a plan replaces that mission's unverified strategy. A verified decision stays." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Department writing uses GPT-OSS 20B through a free public endpoint. It does not spend model credits. If that endpoint is down, the local orchestrator writes the step and says so." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Quality checks length, a fenced page, a usable control, and self-approval. It does not run the slice as a product test." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "The company record stays when you come back. A published deploy uses the hosted database when one is configured." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "A failed check is an open defect. Fix and retest redoes the department that owns it, then verifies again. A later pass closes the defect." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "The old project and task boards are closed. They do not run work." })
					]
				})
			})
		]
	}) });
}
function Section({ title, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mt-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "text-sm font-medium",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-2",
			children
		})]
	});
}
//#endregion
export { BlueprintPage as component };
