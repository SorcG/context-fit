import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["de"],
  defaultLocale: "de",
  // Eine manuelle Sprachwahl soll länger halten als nur die Browser-Session.
  localeCookie: { maxAge: 60 * 60 * 24 * 365 },
  // Ordnernamen unter app/[locale]/ bleiben deutsch, die öffentlichen URLs
  // sind je Sprache übersetzt.
  pathnames: {
    "/": "/",
    "/leistungen": { de: "/leistungen" },
    "/ueber-mich": { de: "/ueber-mich" },
    "/kontakt": { de: "/kontakt" },
    "/rechner": { de: "/rechner" },
    "/praevention": { de: "/praevention" },
    "/impressum": { de: "/impressum" },
    "/datenschutz": { de: "/datenschutz" },
    "/design-system": "/design-system",
  },
});

export type Locale = (typeof routing.locales)[number];
export type Pathname = keyof typeof routing.pathnames;
