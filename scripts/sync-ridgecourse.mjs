import { execFileSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readFileSync, readdirSync, renameSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const [checkout, revision] = process.argv.slice(2);
if (!checkout || !/^[a-f0-9]{40}$/.test(revision ?? "")) {
  throw new Error("Supply the Ridgecourse Roofing checkout path and a full 40-character commit SHA.");
}
const root = fileURLToPath(new URL("../", import.meta.url));
const git = (...args) => execFileSync("git", ["-C", resolve(checkout), ...args], { maxBuffer: 16 * 1024 * 1024 });
const records = git("ls-tree", "-r", "-z", revision, "--", "site/").toString().split("\0").filter(Boolean);
const staging = mkdtempSync(join(root, "public", ".roofing-sync-"));
const target = join(root, "public", "roofing");
try {
  const files = new Set();
  for (const record of records) {
    const match = /^100644 blob [a-f0-9]{40}\tsite\/([a-zA-Z0-9_.\/-]+)$/.exec(record);
    if (!match) throw new Error("Unexpected source file or mode.");
    const name = match[1];
    if (name.split("/").some(part => !part || part.startsWith("."))) throw new Error("Unexpected source path.");
    files.add(name);
    let contents = git("show", revision + ":site/" + name);
    if (name.endsWith(".html")) {
      // Prefix the standalone document's local URLs for the extensionless /roofing route.
      contents = Buffer.from(
        contents
          .toString()
          .replaceAll('href="./index.html"', 'href="/roofing"')
          .replace(/(href="|src="|srcset="|, )\.\//g, "$1/roofing/")
      );
    }
    const destination = join(staging, name);
    mkdirSync(dirname(destination), { recursive: true });
    writeFileSync(destination, contents);
  }
  if (!["index.html", "privacy.html", "terms.html", "style.css", "guide.js"].every(name => files.has(name))) {
    throw new Error("The source commit does not contain the complete Ridgecourse Roofing field manual.");
  }
  mkdirSync(target, { recursive: true });
  for (const entry of readdirSync(staging)) {
    if (entry === "assets") {
      mkdirSync(join(target, entry), { recursive: true });
      for (const asset of readdirSync(join(staging, entry))) {
        renameSync(join(staging, entry, asset), join(target, entry, asset));
      }
    } else {
      renameSync(join(staging, entry), join(target, entry));
    }
  }
  const manifestPath = join(root, "docs", "ridgecourse-source.json");
  let prior = { files: [] };
  try {
    prior = JSON.parse(readFileSync(manifestPath, "utf8"));
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }
  for (const old of prior.files) {
    if (!files.has(old) && /^[a-zA-Z0-9_-]+(?:\.[a-zA-Z0-9_-]+)*$|^assets\/[a-zA-Z0-9_-]+(?:\.[a-zA-Z0-9_-]+)*$/.test(old)) {
      rmSync(join(target, old), { force: true });
    }
  }
  writeFileSync(
    manifestPath,
    JSON.stringify({ repository: "josephjilovec/ridgecourseroofing", commit: revision, files: [...files].sort() }, null, 2) + "\n"
  );
  process.stdout.write("Updated " + files.size + " public files at /roofing from " + revision + "\n");
} finally {
  rmSync(staging, { recursive: true, force: true });
}
