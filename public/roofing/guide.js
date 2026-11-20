"use strict";

const worksheet = document.getElementById("visit-form");
const files = ["A", "B"].map(letter => ({
  letter,
  boxes: [...document.querySelectorAll('input[name="file' + letter + '"]')],
  score: document.getElementById("score-" + letter.toLowerCase())
}));
const reset = document.getElementById("reset-audit");
const summary = document.getElementById("audit-summary");
const inquiry = "https://summithillholdings.com/contact?venture=ridgecourse-roofing";

function updateCounts() {
  const counts = files.map(file => {
    const checked = file.boxes.filter(box => box.checked).length;
    file.score.textContent = checked + " / " + file.boxes.length;
    return checked;
  });
  reset.hidden = counts.every(count => count === 0);
  summary.textContent = reset.hidden
    ? "Choose the records you can locate. Use the worksheet for anything outside your file."
    : "Marked present in File A: " + counts[0] + ". File B: " + counts[1] +
      ". Unchecked rows export as unmarked. Your office decides which records apply.";
}

function worksheetText() {
  const values = new FormData(worksheet);
  const lines = [
    "RIDGECOURSE ROOFING | OFFICE FILE WORKSHEET",
    "Arizona B2B pilot for ordinary non-claim records",
    "",
    "Business type: " + values.get("trade"),
    "File volume: " + values.get("volume"),
    "Follow-up topics: " + (values.getAll("bottleneck").join(", ") || "None selected"),
    "Office note: " + (values.get("note").trim() || "None supplied")
  ];
  for (const file of files) {
    const count = file.boxes.filter(box => box.checked).length;
    lines.push("", "FILE " + file.letter + " — " + count + " / " + file.boxes.length + " marked present");
    if (count === 0) {
      lines.push("No items marked in this column.");
    } else {
      for (const box of file.boxes) {
        lines.push((box.checked ? "[present] " : "[unmarked] ") + box.value);
      }
    }
  }
  lines.push("", "Unchecked items may be outside this file. This worksheet records selections only.",
    "Your office decides billing, technical and legal questions.", "", "Pilot inquiries: " + inquiry);
  return lines.join("\n");
}

reset.addEventListener("click", () => {
  for (const file of files) {
    for (const box of file.boxes) box.checked = false;
  }
  updateCounts();
});
for (const file of files) {
  for (const box of file.boxes) box.addEventListener("change", updateCounts);
}

document.getElementById("save-notes").addEventListener("click", () => {
  const blob = new Blob([worksheetText(), "\n"], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "ridgecourse-office-file-checklist.txt";
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
  document.getElementById("note-result").textContent = "Your office worksheet has been downloaded.";
});
function fillPrintSheet() {
  document.getElementById("print-text").textContent = worksheetText();
}
document.getElementById("print-notes").addEventListener("click", () => {
  fillPrintSheet();
  window.print();
});
window.addEventListener("beforeprint", fillPrintSheet);
worksheet.addEventListener("submit", event => event.preventDefault());
document.getElementById("sheet-actions").hidden = false;
updateCounts();
