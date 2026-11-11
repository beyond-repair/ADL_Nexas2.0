import { o as __toESM } from "../_runtime.mjs";
import { b as formatMoney, d as RUN_TOKEN, l as PAYMENT } from "./company-DDdSGDdi.mjs";
import { C as require_jsx_runtime, X as require_react, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/company-notes-cc2MuPYL.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function RunTokenNote() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm leading-relaxed text-muted",
		children: RUN_TOKEN
	});
}
function PayCard({ poster = false, recordedCents, recordedLabel = "Recorded" }) {
	const [copied, setCopied] = (0, import_react.useState)(null);
	async function copy() {
		try {
			await navigator.clipboard.writeText(PAYMENT.cashtag);
			setCopied("yes");
		} catch {
			setCopied("no");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "text-sm font-medium",
			children: "Payments"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-sm",
			children: PAYMENT.business
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-mono text-sm",
			children: PAYMENT.cashtag
		}),
		typeof recordedCents === "number" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-1 font-mono text-sm tabular-nums",
			children: [
				recordedLabel,
				" ",
				formatMoney(recordedCents)
			]
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-1 text-xs leading-relaxed text-muted",
			children: [PAYMENT.method, ". A scan pays Cash App. NEXUS does not move the money, and it does not confirm the payment arrived."]
		}),
		poster ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: PAYMENT.qr,
			alt: "Scan to pay Atomic Dream Labs on Cash App",
			className: "mt-3 w-full max-w-sm rounded-md border border-line bg-white"
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-3 flex flex-wrap gap-x-4 text-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "inline-flex h-11 items-center text-accent",
				onClick: () => void copy(),
				children: copied === "yes" ? "Cashtag copied" : copied === "no" ? "Copy failed — select the cashtag" : "Copy cashtag"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/payments",
				className: "inline-flex h-11 items-center text-accent",
				children: "Payment record"
			})]
		})
	] });
}
//#endregion
export { RunTokenNote as n, PayCard as t };
