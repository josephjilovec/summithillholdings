"use strict";

const form = document.getElementById("visit-form");
const result = document.getElementById("note-result");
const scoreAEl = document.getElementById("score-a");
const scoreBEl = document.getElementById("score-b");
const statusAEl = document.getElementById("status-a");
const statusBEl = document.getElementById("status-b");
const auditSummaryEl = document.getElementById("audit-summary");
const resetAuditBtn = document.getElementById("reset-audit");

const TOTAL_AUDIT_ITEMS = 12;

const CORE_CHECKS = [
  "Confirm signed customer scope with active contractor license # on file before billing.",
  "Verify 4-stage timestamped photo sequence (Pre-Work, Bare Deck, Dry-In/Flashing, Final).",
  "Reconcile supplier material drop tickets and sub labor draws to scope quantities.",
  "Confirm daily moisture/psychrometric logs and equipment day counts have zero skipped dates.",
  "Collect permit sign-off, unexpired vendor W-9/COIs, and statutory lien waivers prior to closeout."
];

function getAuditState() {
  const fileABoxes = Array.from(document.querySelectorAll('input[name="fileA"]'));
  const fileBBoxes = Array.from(document.querySelectorAll('input[name="fileB"]'));
  const aChecked = fileABoxes.filter(el => el.checked).map(el => el.value);
  const aMissing = fileABoxes.filter(el => !el.checked).map(el => el.value);
  const bChecked = fileBBoxes.filter(el => el.checked).map(el => el.value);
  const bMissing = fileBBoxes.filter(el => !el.checked).map(el => el.value);
  return { aChecked, aMissing, bChecked, bMissing };
}

function labelForScore(count) {
  if (count === 0) return "Check items present in job file";
  if (count <= 5) return "High billing-delay risk — major documentation gaps";
  if (count <= 9) return "Incomplete file — resolve flagged exceptions before invoicing";
  if (count < TOTAL_AUDIT_ITEMS) return "Nearly closeout-ready — verify remaining items";
  return "Complete 12-point closeout & billing dossier";
}

function updateAuditUI() {
  if (!scoreAEl || !scoreBEl) return;
  const { aChecked, aMissing, bChecked, bMissing } = getAuditState();
  scoreAEl.textContent = `${aChecked.length} / ${TOTAL_AUDIT_ITEMS}`;
  scoreBEl.textContent = `${bChecked.length} / ${TOTAL_AUDIT_ITEMS}`;
  statusAEl.textContent = labelForScore(aChecked.length);
  statusBEl.textContent = labelForScore(bChecked.length);

  const anyChecked = aChecked.length > 0 || bChecked.length > 0;
  if (resetAuditBtn) resetAuditBtn.hidden = !anyChecked;

  if (!anyChecked) {
    auditSummaryEl.textContent =
      "Check items present in File A or File B to surface missing documentation gaps. Your exception summary automatically attaches to the downloadable checklist below.";
    return;
  }

  const lines = [];
  if (aChecked.length > 0) {
    const gapA = aMissing.slice(0, 3).join("; ");
    lines.push(
      aMissing.length === 0
        ? "Job File A meets all 12 closeout and billing documentation checkpoints."
        : `Job File A is missing ${aMissing.length} item(s) — PM review needed for: ${gapA}${aMissing.length > 3 ? ", …" : ""}.`
    );
  }
  if (bChecked.length > 0) {
    const gapB = bMissing.slice(0, 3).join("; ");
    lines.push(
      bMissing.length === 0
        ? "Job File B meets all 12 closeout and billing documentation checkpoints."
        : `Job File B is missing ${bMissing.length} item(s) — PM review needed for: ${gapB}${bMissing.length > 3 ? ", …" : ""}.`
    );
  }
  auditSummaryEl.textContent = lines.join(" ");
}

function buildPrepChecklistText() {
  const data = new FormData(form);
  const bottlenecks = data.getAll("bottleneck");
  const { aChecked, aMissing, bChecked, bMissing } = getAuditState();

  const out = [
    "RIDGECOURSE ROOFING | B2B JOB-FILE AUDIT & PREP CHECKLIST",
    "Not a Licensed Roofing Contractor & Not a Public Adjuster · Fixed-Fee B2B Support (US)",
    "======================================================================================",
    "",
    "1. CONTRACTOR / OPERATIONS PROFILE",
    "Trade segment:      " + data.get("trade"),
    "Monthly volume:     " + data.get("volume"),
    "Active bottlenecks: " + (bottlenecks.length ? bottlenecks.join(" | ") : "None selected"),
    "Workflow / CRM note:",
    "  " + (data.get("note").trim() || "____________________________________________________________"),
    "",
    "2. FIVE CORE PRE-INVOICE FILE CHECKS (FOR QUALIFIED PM / ESTIMATOR REVIEW)",
    ...CORE_CHECKS.map((item, i) => `  0${i + 1}. ${item}`),
  ];

  if (aChecked.length > 0 || bChecked.length > 0) {
    out.push("", "3. 12-POINT JOB-FILE COMPLETENESS AUDIT");
    if (aChecked.length > 0) {
      out.push(`  Job File A Readiness: ${aChecked.length} / ${TOTAL_AUDIT_ITEMS}`);
      out.push(
        aMissing.length
          ? "  Job File A Exceptions: " + aMissing.join("; ")
          : "  Job File A Exceptions: None — all 12 documentation checkpoints present."
      );
    }
    if (bChecked.length > 0) {
      out.push(`  Job File B Readiness: ${bChecked.length} / ${TOTAL_AUDIT_ITEMS}`);
      out.push(
        bMissing.length
          ? "  Job File B Exceptions: " + bMissing.join("; ")
          : "  Job File B Exceptions: None — all 12 documentation checkpoints present."
      );
    }
  }

  out.push(
    "",
    "4. INTERNAL SIGN-OFF LOG",
    "Project Manager / Estimator: ___________________________________________",
    "Job Reference ID(s):         ___________________________________________",
    "B2B fixed-fee inquiries:     https://summithillholdings.com/contact?venture=ridgecourse-roofing",
    "",
    "Generated strictly inside your browser tab — no files or entries were transmitted to any server."
  );

  return out.join("\n");
}

function fillPrintSheet() {
  document.getElementById("print-text").textContent = buildPrepChecklistText();
}

document.querySelectorAll('input[name="fileA"], input[name="fileB"]').forEach(box => {
  box.addEventListener("change", updateAuditUI);
});

if (resetAuditBtn) {
  resetAuditBtn.addEventListener("click", () => {
    document.querySelectorAll('input[name="fileA"], input[name="fileB"]').forEach(box => {
      box.checked = false;
    });
    updateAuditUI();
  });
}

document.getElementById("save-notes").addEventListener("click", () => {
  const blob = new Blob([buildPrepChecklistText(), "\n"], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "ridgecourse-job-file-audit-checklist.txt";
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
  result.textContent = "Your B2B job-file checklist and audit summary have been downloaded (.txt).";
});

document.getElementById("print-notes").addEventListener("click", () => {
  fillPrintSheet();
  window.print();
});

window.addEventListener("beforeprint", fillPrintSheet);
form.addEventListener("submit", event => event.preventDefault());
document.getElementById("sheet-actions").hidden = false;
updateAuditUI();
