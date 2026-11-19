"use strict";

const form = document.getElementById("visit-form");
const result = document.getElementById("note-result");
const comparison = [
  "Which areas, layers, products, removal and disposal are included?",
  "How will hidden deck damage be documented, priced and approved?",
  "Who handles permits, weather delays and written payment milestones?",
  "Which photos, warranties and callback details will I receive?"
];
function visitNotes() {
  const data = new FormData(form);
  const observations = data.getAll("observation");
  return [
    "Roof material: " + data.get("material"),
    "Observations: " + (observations.join(" / ") || "None recorded"),
    "My question: " + (data.get("question").trim() || "____________________________"),
    "", "Ask each licensed contractor:", ...comparison.map(question => "• " + question),
    "", "Contractor name and ROC number: ____________________________",
    "Date and follow-up: ________________________________________",
    "", "Record observations from the ground or indoors. This worksheet stays with you."
  ].join("\n");
}
function fillPrintSheet() {
  document.getElementById("print-text").textContent = visitNotes();
}
document.getElementById("save-notes").addEventListener("click", () => {
  const blob = new Blob(["True Peak Roofing | Roof visit notes\n\n", visitNotes(), "\n"], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "my-roof-visit-notes.txt";
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
  result.textContent = "Your notes are ready to save as a text file.";
});
document.getElementById("print-notes").addEventListener("click", () => {
  fillPrintSheet();
  window.print();
});
window.addEventListener("beforeprint", fillPrintSheet);
form.addEventListener("submit", event => event.preventDefault());
document.getElementById("sheet-actions").hidden = false;
