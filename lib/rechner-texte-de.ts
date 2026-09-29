import type { Goal, PalLevel, Sex, TrainingType } from "./rechner-logik";

/**
 * Alle sichtbaren Texte der Rechner-Seite. Komponenten importieren
 * ausschließlich von hier, keine hartcodierten Strings im JSX.
 *
 * Für weitere Sprachen: eine Datei mit identischer Struktur anlegen,
 * z. B. rechner-texte-en.ts / rechner-texte-nl.ts, jeweils vom Typ
 * `RechnerTexte`.
 */
export interface RechnerTexte {
  seitentitel: string;
  intro: string;
  felder: {
    geschlecht: string;
    geschlechtOptionen: Record<Sex, string>;
    gewicht: string;
    koerperfett: string;
    alltagsaktivitaet: string;
    ziel: string;
    zielOptionen: Record<Goal, string>;
    trainingsart: string;
    trainingsartOptionen: Record<TrainingType, string>;
    einheitenProWoche: string;
    minutenProEinheit: string;
    ruhetageProWoche: string;
  };
  zielBeschreibung: Record<Goal, string>;
  pal: Record<
    PalLevel,
    {
      label: string;
      multiplikator: Record<Sex, string>;
      helper: string;
    }
  >;
  palDauerhinweis: string;
  output: {
    ruhetag: string;
    trainingstag: string;
    grundumsatz: string;
    magermasse: string;
    training: string;
    protein: string;
    fett: string;
    kohlenhydrate: string;
    kcal: string;
    tag: string;
  };
  warnungen: {
    negativeKohlenhydrate: string;
    koerperfettUnrealistisch: string;
    tageMismatch: (total: number) => string;
  };
  footer: string;
  navigation: {
    zurueck: string;
    weiter: string;
    ergebnisAnzeigen: string;
  };
  schritte: {
    basis: string;
    alltag: string;
    training: string;
    ziel: string;
  };
  ergebnis: {
    soKommenWirDarauf: string;
    nochmalBerechnen: string;
    zumErstgespraech: string;
    trainingsKcalZeile: (kcal: number) => string;
  };
}

export const rechnerTexteDe: RechnerTexte = {
  seitentitel: "Kalorienrechner",
  intro:
    "Job und Schritte sind das eine. Training kommt extra drauf. Unsicher beim PAL? Nimm die niedrigere Stufe.",
  felder: {
    geschlecht: "Geschlecht",
    geschlechtOptionen: { male: "Mann", female: "Frau" },
    gewicht: "Gewicht (kg)",
    koerperfett: "Körperfett (%)",
    alltagsaktivitaet: "Alltagsaktivität (PAL)",
    ziel: "Ziel",
    zielOptionen: {
      maintain: "Erhalten",
      deficit: "Defizit",
      bulk: "Aufbau",
    },
    trainingsart: "Trainingsart",
    trainingsartOptionen: {
      resistance: "Krafttraining",
      martial_arts: "Kampfsport (BJJ, Kickboxen)",
    },
    einheitenProWoche: "Einheiten pro Woche",
    minutenProEinheit: "Minuten pro Einheit",
    ruhetageProWoche: "Ruhetage pro Woche",
  },
  zielBeschreibung: {
    maintain: "Gewicht halten, Kraft und Form verbessern.",
    deficit: "Fett verlieren, Muskeln so gut wie möglich erhalten.",
    bulk: "Muskeln aufbauen, kontrollierter Überschuss.",
  },
  pal: {
    sedentary: {
      label: "Sedentary",
      multiplikator: { male: "1.00", female: "1.00" },
      helper: "Bürojob, wenig Schritte. Den Großteil des Tages sitzen.",
    },
    lightly_active: {
      label: "Lightly active",
      multiplikator: { male: "1.11", female: "1.12" },
      helper: "Etwas Laufen, leichte Steharbeit. Kein körperlicher Job.",
    },
    active: {
      label: "Active",
      multiplikator: { male: "1.25", female: "1.27" },
      helper: "Viel auf den Beinen. Viele Schritte, nicht „ich trainiere 6×“.",
    },
    very_active: {
      label: "Very active",
      multiplikator: { male: "1.48", female: "1.45" },
      helper:
        "Körperlicher Job oder sehr viele Schritte. Immer noch ohne Gym / Matte.",
    },
  },
  palDauerhinweis:
    "PAL ist nur der Alltag. Nicht „very active“ wählen, weil du trainierst. Trainingsminuten kommen extra drauf. Unsicher? Eine Stufe niedriger.",
  output: {
    ruhetag: "Ruhetag",
    trainingstag: "Trainingstag",
    grundumsatz: "Grundumsatz (BMR)",
    magermasse: "Magermasse",
    training: "Training",
    protein: "Protein",
    fett: "Fett",
    kohlenhydrate: "Kohlenhydrate",
    kcal: "kcal",
    tag: "Tag",
  },
  warnungen: {
    negativeKohlenhydrate:
      "Das Defizit ist an Ruhetagen hart. Protein und Fett fressen fast alles. Entweder fast keine Carbs am Ruhetag — oder das Defizit ist zu groß.",
    koerperfettUnrealistisch:
      "Katch-McArdle braucht eine Körperfettzahl. 25% eintragen „weil's gut klingt“ haut den BMR durcheinander.",
    tageMismatch: (total: number) =>
      `Einheiten und Ruhetage sollten zusammen 7 ergeben — aktuell sind es ${total}.`,
  },
  footer:
    "Schätzung, keine medizinische Beratung. Eine ordentliche Messung schlägt Raten.",
  navigation: {
    zurueck: "Zurück",
    weiter: "Weiter",
    ergebnisAnzeigen: "Ergebnis anzeigen",
  },
  schritte: {
    basis: "Basis",
    alltag: "Alltag",
    training: "Training",
    ziel: "Ziel",
  },
  ergebnis: {
    soKommenWirDarauf: "So kommen wir darauf",
    nochmalBerechnen: "Nochmal berechnen",
    zumErstgespraech: "Zum Erstgespräch",
    trainingsKcalZeile: (kcal: number) => `+ ${kcal} kcal aus dem Training`,
  },
};
