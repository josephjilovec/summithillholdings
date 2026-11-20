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

const CORE_QUESTIONS = [
  "Is an active AZ ROC R-42 or CR-42 license # printed and verified on roc.az.gov?",
  "Which areas, layers, underlayment brand/plies, removal, and disposal are included?",
  "Are new W-valley metal, drip edge, wall flashings, and new pipe boots included?",
  "What is the upfront $/sheet OSB decking rate and photo-backed Change Order rule?",
  "Who pulls municipal permits, schedules inspections, and provides lien waivers?"
];

function getAuditState() {
  const bidABoxes = Array.from(document.querySelectorAll('input[name="bidA"]'));
  const bidBBoxes = Array.from(document.querySelectorAll('input[name="bidB"]'));
  const aChecked = bidABoxes.filter(el => el.checked).map(el => el.value);
  const aMissing = bidABoxes.filter(el => !el.checked).map(el => el.value);
  const bChecked = bidBBoxes.filter(el => el.checked).map(el => el.value);
  const bMissing = bidBBoxes.filter(el => !el.checked).map(el => el.value);
  return { aChecked, aMissing, bChecked, bMissing };
}

function labelForScore(count) {
  if (count === 0) return "Check items present in writing";
  if (count <= 5) return "High omission risk — ask for written scope revision";
  if (count <= 9) return "Partial scope — clarify missing line items first";
  if (count < TOTAL_AUDIT_ITEMS) return "Strong scope — verify remaining items";
  return "Complete 12-point written scope";
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
      "Check items above to spot missing scope lines on Bid A or Bid B. Your comparison automatically attaches to your printable/downloadable notes below.";
    return;
  }

  const lines = [];
  if (aChecked.length > 0) {
    const gapA = aMissing.slice(0, 3).join("; ");
    lines.push(
      aMissing.length === 0
        ? "Bid A covers all 12 critical scope items in writing."
        : `Bid A is missing ${aMissing.length} item(s) — ask in writing about: ${gapA}${aMissing.length > 3 ? ", …" : ""}.`
    );
  }
  if (bChecked.length > 0) {
    const gapB = bMissing.slice(0, 3).join("; ");
    lines.push(
      bMissing.length === 0
        ? "Bid B covers all 12 critical scope items in writing."
        : `Bid B is missing ${bMissing.length} item(s) — ask in writing about: ${gapB}${bMissing.length > 3 ? ", …" : ""}.`
    );
  }
  auditSummaryEl.textContent = lines.join(" ");
}

function visitNotesText() {
  const data = new FormData(form);
  const observations = data.getAll("observation");
  const { aChecked, aMissing, bChecked, bMissing } = getAuditState();

  const out = [
    "RIDGECOURSE ROOFING | PHOENIX HOMEOWNER VISIT NOTES & SCOPE AUDIT",
    "Pre-Launch Field Manual · Summit Hill Holdings (Not a Licensed Contractor)",
    "========================================================================",
    "",
    "1. HOMEOWNER OBSERVATIONS",
    "Roof material:      " + data.get("material"),
    "Approximate age:    " + data.get("age"),
    "Observations:       " + (observations.length ? observations.join(" | ") : "None selected"),
    "My specific question / note:",
    "  " + (data.get("question").trim() || "____________________________________________________________"),
    "",
    "2. FIVE CORE QUESTIONS FOR EVERY LICENSED ARIZONA ROOFER",
    ...CORE_QUESTIONS.map((q, i) => `  0${i + 1}. ${q}`),
  ];

  if (aChecked.length > 0 || bChecked.length > 0) {
    out.push("", "3. WRITTEN PROPOSAL SCOPE AUDIT (12-POINT MATRIX)");
    if (aChecked.length > 0) {
      out.push(`  Bid A Score: ${aChecked.length} / ${TOTAL_AUDIT_ITEMS}`);
      out.push(
        aMissing.length
          ? "  Bid A Missing Items: " + aMissing.join("; ")
          : "  Bid A Missing Items: None — all 12 points documented."
      );
    }
    if (bChecked.length > 0) {
      out.push(`  Bid B Score: ${bChecked.length} / ${TOTAL_AUDIT_ITEMS}`);
      out.push(
        bMissing.length
          ? "  Bid B Missing Items: " + bMissing.join("; ")
          : "  Bid B Missing Items: None — all 12 points documented."
      );
    }
  }

  out.push(
    "",
    "4. CONTRACTOR VERIFICATION LOG",
    "Contractor A & AZ ROC #: _______________________________________________",
    "Contractor B & AZ ROC #: _______________________________________________",
    "Verify any Arizona license before signing: https://roc.az.gov/contractor-search",
    "",
    "This worksheet was generated locally in your browser tab and was not sent to any server."
  );

  return out.join("\n");
}

function fillPrintSheet() {
  document.getElementById("print-text").textContent = visitNotesText();
}

document.querySelectorAll('input[name="bidA"], input[name="bidB"]').forEach(box => {
  box.addEventListener("change", updateAuditUI);
});

if (resetAuditBtn) {
  resetAuditBtn.addEventListener("click", () => {
    document.querySelectorAll('input[name="bidA"], input[name="bidB"]').forEach(box => {
      box.checked = false;
    });
    updateAuditUI();
  });
}

document.getElementById("save-notes").addEventListener("click", () => {
  const blob = new Blob([visitNotesText(), "\n"], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "ridgecourse-roof-visit-notes.txt";
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
  result.textContent = "Your Ridgecourse visit notes and scope audit have been downloaded (.txt).";
});

document.getElementById("print-notes").addEventListener("click", () => {
  fillPrintSheet();
  window.print();
});

window.addEventListener("beforeprint", fillPrintSheet);
form.addEventListener("submit", event => event.preventDefault());
document.getElementById("sheet-actions").hidden = false;
updateAuditUI();
