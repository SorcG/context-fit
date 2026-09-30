import { defineRouting } from "next-intl/routing";

export const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export const routing = defineRouting({
  locales: ["de", "en", "nl"],
  defaultLocale: "de",
  // Immer Deutsch als Startsprache — keine Erkennung per Browsersprache.
  // Andere Sprachen nur über den Umschalter bzw. direkte /en, /nl-Links.
  localeDetection: false,
  // Eine manuelle Sprachwahl soll länger halten als nur die Browser-Session.
  localeCookie: { maxAge: LOCALE_COOKIE_MAX_AGE },
  // Ordnernamen unter app/[locale]/ bleiben deutsch, die öffentlichen URLs
  // sind je Sprache übersetzt.
  pathnames: {
    "/": "/",
    "/leistungen": { de: "/leistungen", en: "/services", nl: "/diensten" },
    "/ueber-mich": { de: "/ueber-mich", en: "/about", nl: "/over-mij" },
    "/kontakt": { de: "/kontakt", en: "/contact", nl: "/contact" },
    "/rechner": {
      de: "/rechner",
      en: "/calorie-calculator",
      nl: "/caloriecalculator",
    },
    // Existiert nur auf Deutsch (Krankenkassen-Erstattung), EN/NL → 404.
    "/praevention": {
      de: "/praevention",
      en: "/prevention",
      nl: "/preventie",
    },
    "/impressum": { de: "/impressum", en: "/legal-notice", nl: "/colofon" },
    "/datenschutz": { de: "/datenschutz", en: "/privacy", nl: "/privacy" },
    "/design-system": "/design-system",
  },
});

export type Locale = (typeof routing.locales)[number];
export type Pathname = keyof typeof routing.pathnames;
