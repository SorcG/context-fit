import type { PalLevel, Sex } from "./rechner-logik";

/**
 * Sprachunabhängige Anzeigewerte der PAL-Stufen. Die Bezeichnungen bleiben
 * in allen Sprachen Englisch (Fachbegriffe wie "PAL"), die Hilfetexte dazu
 * kommen übersetzt aus messages/*.json (Rechner.palHelper).
 *
 * Die Faktoren spiegeln nur die Werte aus rechner-logik.ts für die Anzeige.
 */
export const palAnzeige: Record<
  PalLevel,
  { label: string; multiplikator: Record<Sex, string> }
> = {
  sedentary: {
    label: "Sedentary",
    multiplikator: { male: "1.00", female: "1.00" },
  },
  lightly_active: {
    label: "Lightly active",
    multiplikator: { male: "1.11", female: "1.12" },
  },
  active: {
    label: "Active",
    multiplikator: { male: "1.25", female: "1.27" },
  },
  very_active: {
    label: "Very active",
    multiplikator: { male: "1.48", female: "1.45" },
  },
};
