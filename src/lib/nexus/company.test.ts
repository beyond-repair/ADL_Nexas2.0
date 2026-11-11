import assert from "node:assert/strict";
import test from "node:test";
import {
  allPassed,
  assertMissionTransition,
  canonicalAssignments,
  CompanyError,
  dollarsToCents,
  formatMoney,
  localDraft,
  localPlan,
  nextDefects,
  ownedChecksPass,
  planFromModel,
  reworkFrom,
  verifyArtifacts,
} from "./company.ts";

test("a plan cannot jump straight to accepted", () => {
  assert.throws(() => assertMissionTransition("PLANNED", "ACCEPTED"), CompanyError);
  assert.doesNotThrow(() => assertMissionTransition("PLANNED", "AUTHORIZED"));
  assert.doesNotThrow(() => assertMissionTransition("AWAITING_ACCEPTANCE", "EXECUTING"));
});

test("the pipeline always keeps verification and implementation", () => {
  const slots = canonicalAssignments("Track contractor jobs and draft invoices");
  assert.deepEqual(
    slots.map((slot) => slot.agent),
    ["researcher", "product", "architect", "designer", "developer", "qa", "coo"],
  );
});

test("a broken model plan falls back without dropping departments", () => {
  const plan = planFromModel("Build a contractor desk", "not json");
  assert.equal(plan.source, "local-orchestrator");
  assert.equal(plan.assignments.length, 7);
});

test("a model plan may rewrite briefs but cannot remove QA", () => {
  const plan = planFromModel(
    "Build a contractor desk for independent jobs and invoices",
    JSON.stringify({
      title: "Contractor desk",
      strategy: "Research the jobs, specify the desk, design it, build one slice, then verify.",
      questions: [],
      assignments: [{ agent: "developer", title: "Desk slice", brief: "Build the job list and a draft invoice view." }],
    }),
  );
  assert.equal(plan.source, "gpt-oss-20b");
  assert.equal(plan.assignments.find((slot) => slot.agent === "developer")?.title, "Desk slice");
  assert.ok(plan.assignments.some((slot) => slot.agent === "qa"));
});

test("verification fails a self-approving implementation and passes a real slice", () => {
  const objective = "Track contractor jobs and draft invoices";
  const artifacts = {
    researcher: localDraft("researcher", objective, ""),
    product: localDraft("product", objective, ""),
    architect: localDraft("architect", objective, ""),
    designer: localDraft("designer", objective, ""),
    developer: localDraft("developer", objective, ""),
  };
  assert.equal(allPassed(verifyArtifacts(artifacts)), true);
  const cheated = verifyArtifacts({
    ...artifacts,
    developer: `${artifacts.developer}\nMission accepted.`,
  });
  assert.equal(allPassed(cheated), false);
  assert.equal(cheated.find((item) => item.name === "No self-approval")?.passed, false);
});

test("thin objectives surface a question instead of inventing the user", () => {
  const plan = localPlan("Build an app");
  assert.equal(plan.questions.length, 1);
});

test("a later pass closes a defect and a new failure opens one", () => {
  const checks = [
    { name: "Research brief", passed: true, detail: "enough" },
    { name: "Implementation source", passed: false, detail: "No fenced source block." },
  ];
  const first = nextDefects(["Research brief"], checks);
  assert.deepEqual(first.close, ["Research brief"]);
  assert.deepEqual(first.create.map((item) => item.name), ["Implementation source"]);
  const again = nextDefects(["Implementation source"], checks);
  assert.deepEqual(again.close, []);
  assert.deepEqual(again.create, []);
});

test("a failed check goes back to the department that owns it", () => {
  assert.equal(reworkFrom(["Research brief"], []), "researcher");
  assert.equal(reworkFrom(["Implementation source", "Research brief"], []), "researcher");
  assert.equal(reworkFrom(["No self-approval"], []), "developer");
  assert.equal(reworkFrom([], ["designer"]), "designer");
  assert.equal(reworkFrom([], []), "developer");
});

test("the local slice does not embed markup from the objective", () => {
  const draft = localDraft("developer", "Track jobs <script>alert(1)</script>", "");
  assert.equal(draft.includes("<script>alert"), false);
  assert.equal(draft.includes("scriptalert(1)"), true);
});

test("a fenced page with no control is not a working slice", () => {
  const objective = "Track contractor jobs and draft invoices";
  const artifacts = {
    researcher: localDraft("researcher", objective, ""),
    product: localDraft("product", objective, ""),
    architect: localDraft("architect", objective, ""),
    designer: localDraft("designer", objective, ""),
    developer: `${"x".repeat(400)}\n\`\`\`html\n<!doctype html><p>The work is done.</p>\n\`\`\``,
  };
  const checks = verifyArtifacts(artifacts);
  assert.equal(checks.find((item) => item.name === "Working slice")?.passed, false);
  assert.equal(verifyArtifacts({ ...artifacts, developer: localDraft("developer", objective, "") }).find((item) => item.name === "Working slice")?.passed, true);
});

test("a failed working slice goes back to engineering", () => {
  assert.equal(reworkFrom(["Working slice"], []), "developer");
});

test("payment amounts are cents or nothing", () => {
  assert.equal(dollarsToCents("25"), 2500);
  assert.equal(dollarsToCents("$25.50"), 2550);
  assert.equal(dollarsToCents("25.5"), 2550);
  assert.equal(dollarsToCents("0"), null);
  assert.equal(dollarsToCents("nope"), null);
  assert.equal(formatMoney(2550), "$25.50");
});

test("rejection returns to the plan and cannot be accepted in place", () => {
  assert.throws(() => assertMissionTransition("REJECTED", "ACCEPTED"), CompanyError);
  assert.doesNotThrow(() => assertMissionTransition("REJECTED", "PLANNED"));
  assert.throws(() => assertMissionTransition("CANCELLED", "PLANNED"), CompanyError);
  assert.throws(() => assertMissionTransition("ACCEPTED", "PLANNED"), CompanyError);
});

test("a short department artifact fails its own check and the local draft does not", () => {
  const objective = "Track contractor jobs and draft invoices";
  assert.equal(ownedChecksPass("researcher", { researcher: "too short" }), false);
  assert.equal(ownedChecksPass("researcher", { researcher: localDraft("researcher", objective, "") }), true);
  assert.equal(
    ownedChecksPass("developer", { developer: `${localDraft("developer", objective, "")}\nMission accepted.` }),
    false,
  );
});
