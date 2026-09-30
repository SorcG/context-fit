// Vergleicht messages/en.json und messages/nl.json mit messages/de.json.
// Fehlende Keys würden live stillschweigend auf Deutsch zurückfallen.
// Aufruf: npm run check:i18n
import fs from "node:fs";

// Nur auf Deutsch vorhanden (Seite existiert auf EN/NL nicht).
const DE_ONLY = ["Praevention", "Metadata.praevention"];

const load = (locale) =>
  JSON.parse(fs.readFileSync(new URL(`../messages/${locale}.json`, import.meta.url), "utf8"));

function keys(obj, prefix = "") {
  return Object.entries(obj).flatMap(([k, v]) => {
    const key = prefix ? `${prefix}.${k}` : k;
    return typeof v === "object" && v !== null ? keys(v, key) : [key];
  });
}

const isDeOnly = (key) => DE_ONLY.some((p) => key === p || key.startsWith(`${p}.`));
const base = keys(load("de")).filter((k) => !isDeOnly(k));
let failed = false;

for (const locale of ["en", "nl"]) {
  const own = new Set(keys(load(locale)));
  const missing = base.filter((k) => !own.has(k));
  const extra = [...own].filter((k) => !base.includes(k));
  if (missing.length || extra.length) failed = true;
  console.log(`${locale}: ${missing.length} fehlend, ${extra.length} überzählig`);
  missing.forEach((k) => console.log(`  - fehlt: ${k}`));
  extra.forEach((k) => console.log(`  + extra: ${k}`));
}

process.exit(failed ? 1 : 0);
