# Context Fit — Mobile: Plan

Stand: Design-System freigegeben, Startseite + drei vertiefende Unterseiten (`/leistungen`, `/ueber-mich`, `/kontakt`) umgesetzt. Multi-Page-Struktur mit Bottom-Tab-Bar-Navigation (mobil) + Top-Nav (Desktop). Vollständig responsiv (mobil-first + `lg:`-Desktop-Schicht).

---

# Mehrsprachigkeit (DE / EN / NL) — Umbauplan

> **Status: Phase 1–3 umgesetzt** (Branch `feature/i18n`). Phase 4 (Sitemap, `openGraph.locale`) steht noch aus.
> Die Pfad-Angaben ab „Sitemap" beziehen sich auf die deutschen URLs (`/de/...`); EN/NL siehe unten.

### Getroffene Entscheidungen (Freigabe vom 30.09.2026)

1. **Rechtstexte** bleiben in allen Sprachen Deutsch (`lang="de"` am Textblock), auf EN/NL steht ein Hinweis darüber (`components/legal/LegalHeader.tsx`).
2. **Übersetzte URLs direkt**:

| intern (Ordner) | de | en | nl |
|---|---|---|---|
| `/leistungen` | `/de/leistungen` | `/en/services` | `/nl/diensten` |
| `/ueber-mich` | `/de/ueber-mich` | `/en/about` | `/nl/over-mij` |
| `/kontakt` | `/de/kontakt` | `/en/contact` | `/nl/contact` |
| `/rechner` | `/de/rechner` | `/en/calorie-calculator` | `/nl/caloriecalculator` |
| `/praevention` | `/de/praevention` | — (404) | — (404) |
| `/impressum` | `/de/impressum` | `/en/legal-notice` | `/nl/colofon` |
| `/datenschutz` | `/de/datenschutz` | `/en/privacy` | `/nl/privacy` |

3. **Prävention nur auf Deutsch**: Tab in BottomTabNav/DesktopNav auf EN/NL ausgeblendet, Seite liefert dort 404, Sprachwechsel von `/de/praevention` führt auf die Startseite der Zielsprache, hreflang-Link-Header für diese Seite wird im `proxy.ts` entfernt.
4. **PAL-Stufen-Namen** bleiben Englisch (`lib/rechner-anzeige.ts`), die Hilfetexte darunter sind übersetzt (`Rechner.palHelper`).
5. **Impressum**: Kontaktsprachen um Niederländisch ergänzt.
6. **Bestandskorrekturen**: „dachte. Ich", Eyebrow „Prävention" statt „PRÄVENTION".
7. **Sprachumschalter mit Flaggen** (SVGs aus `country-flag-icons`, EN = britische Flagge). Es ist immer nur die aktuelle Flagge sichtbar: Desktop-Nav klappt die anderen beim Hover nach unten aus, Footer und die Lasche auf der mobilen Tab-Bar per Klick (`components/LanguageSwitcher.tsx`). Die Wahl wird ein Jahr im Cookie `NEXT_LOCALE` gespeichert.
8. **Startsprache immer Deutsch**: `localeDetection: false` — `/` leitet unabhängig von Browsersprache und Cookie auf `/de`. EN/NL nur über Umschalter oder direkte Links (`/en`, `/nl`).

### Hinweise für die Weiterarbeit

- **Neue Texte** immer zuerst in `messages/de.json`, dann in `en.json`/`nl.json`; `npm run check:i18n` meldet fehlende Keys. Fehlt ein Key trotzdem, erscheint live der deutsche Text (Fallback in `i18n/request.ts`).
- **Interne Links** immer über `Link`/`usePathname` aus `@/i18n/navigation` und mit dem internen (deutschen) Pfad, z. B. `href="/leistungen"` — das Präfix und die übersetzte URL setzt next-intl.
- **`@swc/core` ist per `overrides` auf 1.16.2 gepinnt.** next-intl lädt `@swc/core` beim Start von `next.config.ts`; Version 1.16.12 (erschienen am 29.09.2026) verweigert auf diesem Rechner den Start, weil sie ihren nativen Cache unter `AppData\Local` wegen dort gesetzter Fremd-Berechtigungen ablehnt. Pin wieder entfernen, sobald eine neuere Version das behebt.

## 1. Technische Eckdaten

- **Bibliothek:** `next-intl` (aktuelle v4), App-Router-Setup „with i18n routing".
- **Locales:** `de` (Standard + Fallback), `en`, `nl`. URL-Schema immer mit Präfix: `/de/...`, `/en/...`, `/nl/...` (`localePrefix: "always"`, next-intl-Default).
- **Next.js 16 → `proxy.ts` statt `middleware.ts`.** Seit Next 16 heißt die Middleware-Datei `proxy.ts`; die next-intl-Doku ist bereits darauf umgestellt. Das Projekt hat bisher keine Middleware, es entsteht also direkt `proxy.ts` im Projekt-Root.
- **Statisches Rendering:** Das Projekt läuft auf Next `16.2.10`. Der neue, von next-intl empfohlene Weg über `next/root-params` ist erst ab Next 16.3 standardmäßig verfügbar. Deshalb nutzen wir vorerst den etablierten Weg: `generateStaticParams()` im `[locale]`-Layout + `setRequestLocale(locale)` in Layout und jeder Page. Bei einem späteren Update auf ≥ 16.3 kann `setRequestLocale` wieder raus (reines Aufräumen, kein Verhaltensunterschied).
- **Root-URL `/`:** next-intl unterstützt Browsersprachen-Erkennung sauber und standardmäßig (`localeDetection: true`). Ablauf im Proxy:
  1. Cookie `NEXT_LOCALE` vorhanden (= Nutzer hat früher selbst umgeschaltet) → diese Sprache.
  2. Sonst `Accept-Language` des Browsers → bester Treffer aus `de`/`en`/`nl`.
  3. Sonst → `de`.

  **Empfehlung:** Erkennung aktiv lassen. Ein niederländischer Browser landet so direkt auf `/nl`, alle anderen Nicht-Treffer auf `/de`. Das Cookie ist per Default nur eine Session-Cookie; Vorschlag: `localeCookie: { maxAge: 60 * 60 * 24 * 365 }`, damit eine manuelle Wahl erhalten bleibt.
- **Alte URLs bleiben gültig:** `/leistungen` (ohne Präfix) wird vom Proxy auf `/<erkannte Sprache>/leistungen` umgeleitet — bestehende Links/Bookmarks brechen nicht.
- **Assets:** Der Standard-Matcher `/((?!api|trpc|_next|_vercel|.*\\..*).*)` schließt alles mit Punkt aus, `/images/*.jpeg` wird also nicht umgeleitet.
- **`hreflang`:** next-intl setzt automatisch `Link`-Header mit allen Sprachvarianten + `x-default`. Zusätzlich kommen `alternates.languages` in `generateMetadata` (für saubere `<link rel="alternate">` im HTML).

## 2. Bestandsaufnahme: sichtbarer deutscher Text

Legende: **M** = Metadaten, **A** = Alt-Text, **L** = Button-/Link-Label, **F** = Formular, **ARIA** = Screenreader-Text, **⚠** = Stolperstelle für die Migration.

### `app/`

| Datei | Inhalt |
|---|---|
| `app/layout.tsx` | **M** globaler `title` + `description`. `<html lang="de">` fest verdrahtet → muss dynamisch werden. |
| `app/page.tsx` | kein eigener Text (setzt nur Sections zusammen). Keine eigene `metadata` → erbt aus Layout. |
| `app/leistungen/page.tsx` | **M** title/description · PageHeader: eyebrow „Leistungen", title „Drei Wege zu deinem Ziel", **A** · `services[]`: je Leistung title, tagline, body, features (4 + 2 Punkte), closing (nur Personal Training), **A** Hauptbild + 2× **A** Zusatzbilder (= 9 Alt-Texte) · **L** „Jetzt Erstgespräch sichern". ⚠ Texte stecken im Daten-Array zusammen mit Bildpfaden/CSS-Klassen → Trennung Struktur/Text nötig. |
| `app/ueber-mich/page.tsx` | **M** · `qualifications[]` (6 Einträge) · PageHeader eyebrow/title/**A** · Bio (3 Absätze) · „Mein Comeback" (h2) + 5 Absätze mit hervorgehobenen Passagen („radikale Ehrlichkeit", „jeden Tag dranbleiben", „Konsequenz") · „Qualifikationen" (h2) · **L** CTA. ⚠ Hervorhebungen mitten im Satz → Rich-Text (`t.rich`) nötig. ⚠ Tippfehler im Bestand: „dachte.Ich" (fehlendes Leerzeichen). |
| `app/praevention/page.tsx` | **M** · PageHeader eyebrow „PRÄVENTION" (als Großbuchstaben im String, andere Seiten nicht), title, **A** · Intro-Absatz · `vorteile[]` 4× title/body · „So läuft's ab" · `ablauf[]` 3× title/body · **L** „Kurse ansehen" · Weiterleitungs-Hinweis. Externe URL bleibt unverändert. |
| `app/kontakt/page.tsx` | **M** · PageHeader eyebrow/title/**A** · Intro-Absatz. |
| `app/rechner/page.tsx` | **M** title/description (fest im Code, nicht in `rechner-texte-de.ts`) · „Kostenloses Tool" (fest im Code) · `seitentitel` + `intro` bereits aus `rechner-texte-de.ts`. |
| `app/impressum/page.tsx` | **M** · „Rechtliches", „Impressum" · Rechtstext als `LegalBlock[]`. |
| `app/datenschutz/page.tsx` | **M** · „Rechtliches"/„Datenschutz"-Kopf · ~450 Zeilen Rechtstext als `LegalBlock[]`, teils mit JSX (`<LegalLink>` mitten im Absatz). Siehe Entscheidung 6.1. |
| `app/design-system/page.tsx` | Nur Dev-Seite (Farb-/Typo-Labels). **Wird nicht übersetzt**; zieht unverändert nach `app/[locale]/design-system/` um bzw. fliegt vor Launch ohnehin raus. |

### `components/`

| Datei | Inhalt |
|---|---|
| `BottomTabNav.tsx` | **L** „Home", „Leistungen", „Prävention", „Über mich", „Kontakt". ⚠ `pathname === "/rechner"` und `pathname === href` → mit Locale-Präfix funktioniert das nicht mehr; wird auf `usePathname` aus `i18n/navigation` umgestellt (liefert den Pfad **ohne** Präfix). |
| `DesktopNav.tsx` | **L** 4 Nav-Labels + „Jetzt Erstgespräch sichern". „Context Fit" bleibt. Gleiches `pathname`-Thema wie oben. |
| `Footer.tsx` | **L** „Impressum", „Datenschutz". „Bram van Koppen · Paderborn" bleibt. |
| `PageHeader.tsx` | kein eigener Text (bekommt eyebrow/title/alt als Props) → bleibt unverändert. |
| `RechnerCTA.tsx` | **L** „Finde deine Kalorien in 60 Sekunden" + Untertitel. |
| `sections/Hero.tsx` | **A** · eyebrow „Personal Coach · Paderborn" · h1 · Subline · **L** CTA. ⚠ Headline wird auf Desktop per `SplitText` in Wörter zerlegt — funktioniert sprachunabhängig, aber bei EN/NL einmal optisch prüfen (Zeilenumbruch). |
| `sections/WarumContextFit.tsx` | h2 · **A** · 2 Absätze, einer mit fett hervorgehobenem Satzteil (→ `t.rich`). |
| `sections/LeistungenTeaser.tsx` | h2 „Leistungen" · Intro · `services[]` 3× title/tagline/**A** · **L** „Alle Leistungen ansehen" (2×, mobil + desktop). Titel/Taglines sind identisch zu `/leistungen` → **gemeinsame Message-Keys**, nicht doppelt pflegen. |
| `sections/UeberMichTeaser.tsx` | h2 · **A** · Einleitungssatz · Qualifikations-Kurzzeile · **L** „Mehr über mich erfahren". |
| `sections/Zielgruppe.tsx` | **A** · Statement „Grappler, vielbeschäftigte Väter und ganz normale Menschen." |
| `sections/Kontakt.tsx` | h2 · Absatz · **L** CTA · „Standort: Paderborn". |
| `KontaktForm.tsx` | **F** Themen-Pills (4) · „Worum geht es?" · Labels „Name", „E-Mail", „Telefon (optional)", „Deine Nachricht" · **L** „Anfrage senden", „Neue Anfrage stellen" · „Danke, {Vorname}!" · Erfolgs- und 24h-Hinweis. Placeholder sind bewusst `" "` (Trick für Floating Labels) → bleiben so. ⚠ Das gewählte Thema wird als **deutscher Anzeigetext** im State gespeichert → auf sprachneutrale Keys (`onlineCoaching`, …) umstellen, sonst hängt das spätere Backend von der UI-Sprache ab. ⚠ Die Browser-eigenen Pflichtfeld-Meldungen („Bitte füllen Sie dieses Feld aus") kommen aus der Browsersprache, nicht von uns — bleibt so. |
| `ComebackSlider.tsx` | **A** 4× · Labels „Vorher"/„Nachher" · **ARIA** „{Label}-Bild {n} anzeigen". ⚠ Styling hängt an `slide.label === "Nachher"` → auf `kind: "before" \| "after"` umstellen. |
| `ComebackCompare.tsx` | „Ansicht 1/2" · **A** 4× · Pills „Vorher"/„Nachher" · **ARIA** zusammengesetzter Satz („Vorher/Nachher-Vergleich, … Klicken zum Umschalten.") → ICU-Nachricht mit Platzhaltern. „104 kg"/„88 kg" bleiben. ⚠ `pair.pose` dient auch als React-`key` → auf feste ID umstellen. |
| `legal/LegalBlocks.tsx` | kein eigener Text (rendert nur Blöcke). |
| `rechner/Rechner.tsx` | Schritt-Anzeige „{n}/4 — {Schritt}" · Zurück/Weiter/Ergebnis (bereits aus `rechner-texte-de.ts`). |
| `rechner/RechnerErgebnis.tsx` | größtenteils aus `rechner-texte-de.ts`. ⚠ Fest im Code: „PAL:", Einheiten „g", „kcal", „kg". |
| `rechner/RechnerFelder.tsx` | ⚠ **ARIA** fest im Code: „{Label} verringern" / „{Label} erhöhen". |
| `rechner/SchrittBasis/Alltag/Training/Ziel.tsx` | nur über `rechner-texte-de.ts`. |
| `MagneticButton`, `Reveal`, `Container`, `SmoothScroll` | kein Text. |

### `lib/`

| Datei | Inhalt |
|---|---|
| **`lib/rechner-texte-de.ts`** | **Alle Kalorienrechner-Texte** (Felder, Optionen, Ziel-Beschreibungen, PAL-Stufen inkl. Hilfetexte, Hinweise, Warnungen, Navigation, Ergebnis). Wird **vollständig in `messages/*.json` (Namespace `Rechner`) überführt und danach gelöscht** — kein Parallel-System. Details: <br>• `interface RechnerTexte` entfällt, Typsicherheit kommt stattdessen aus next-intl (siehe 3.4). <br>• `Record<Goal/Sex/PalLevel/TrainingType, …>` → JSON-Objekte mit genau diesen Keys (`maintain`, `deficit`, …), Zugriff z. B. `t(\`ziel.optionen.${goal}\`)`. <br>• Die zwei Funktionen `tageMismatch(total)` und `trainingsKcalZeile(kcal)` → ICU-Nachrichten mit Platzhalter (`„… aktuell sind es {total}."`). <br>• `pal.*.multiplikator` („1.00", „1.11" …) ist **kein Übersetzungstext**, sondern eine Anzeige der Faktoren. Wandert in eine kleine, nicht übersetzte Konstante (`lib/rechner-anzeige.ts`). `rechner-logik.ts` wird dafür **nicht** angefasst. |
| `lib/rechner-logik.ts` | Kein sichtbarer Text. **Bleibt unverändert** (Formeln, Faktoren, Rundung). |

**Grobe Größenordnung:** ca. 230–260 Einzeltexte ohne Rechtstexte, davon ~60 im Rechner.

## 3. Architektur

### 3.1 Ordnerstruktur (Soll)

```
context-fit-mobile/
├── proxy.ts                      ← NEU: next-intl-Proxy (Sprach-Erkennung + Redirects)
├── next.config.ts                ← erweitert um createNextIntlPlugin()
├── global.d.ts                   ← NEU: Typ-Anbindung der Messages (AppConfig)
├── i18n/
│   ├── routing.ts                ← NEU: locales, defaultLocale, localeCookie
│   ├── request.ts                ← NEU: lädt messages/<locale>.json (+ DE-Fallback)
│   └── navigation.ts             ← NEU: Link, usePathname, useRouter, redirect (locale-aware)
├── messages/
│   ├── de.json                   ← NEU: Quelle der Wahrheit
│   ├── en.json                   ← NEU (Phase 3)
│   └── nl.json                   ← NEU (Phase 3)
├── app/
│   ├── globals.css               ← bleibt hier
│   └── [locale]/
│       ├── layout.tsx            ← war app/layout.tsx (html lang={locale}, Fonts, Navs, Provider)
│       ├── not-found.tsx         ← NEU: 404 in der jeweiligen Sprache
│       ├── [...rest]/page.tsx    ← NEU: fängt unbekannte Pfade → notFound()
│       ├── page.tsx
│       ├── leistungen/page.tsx
│       ├── praevention/page.tsx
│       ├── ueber-mich/page.tsx
│       ├── kontakt/page.tsx
│       ├── rechner/page.tsx
│       ├── impressum/page.tsx
│       ├── datenschutz/page.tsx
│       └── design-system/page.tsx   (unübersetzt, fliegt vor Launch raus)
├── components/                   ← bleiben, wo sie sind; nur Text → useTranslations()
│   └── LanguageSwitcher.tsx      ← NEU
├── lib/
│   ├── rechner-logik.ts          ← unverändert
│   ├── rechner-anzeige.ts        ← NEU: PAL-Faktoren als Anzeige-Strings
│   └── rechner-texte-de.ts       ← ENTFÄLLT
└── scripts/
    └── check-messages.mjs        ← NEU: prüft, ob en/nl dieselben Keys wie de haben
```

Kein `src/`-Ordner, da das Projekt keinen hat — das Plugin findet `i18n/request.ts` im Root automatisch.

### 3.2 Routen-Überführung

| Heute | Neu (Datei) | Öffentliche URLs |
|---|---|---|
| `app/page.tsx` → `/` | `app/[locale]/page.tsx` | `/de`, `/en`, `/nl` (`/` → Redirect) |
| `/leistungen` | `app/[locale]/leistungen/page.tsx` | `/de/leistungen`, `/en/leistungen`, `/nl/leistungen` |
| `/ueber-mich` | `app/[locale]/ueber-mich/page.tsx` | analog |
| `/kontakt` | `app/[locale]/kontakt/page.tsx` | analog |
| `/rechner` | `app/[locale]/rechner/page.tsx` | analog |
| `/praevention` | `app/[locale]/praevention/page.tsx` | analog |
| `/impressum`, `/datenschutz` | `app/[locale]/…` | analog |

Anker (`#online-coaching`, `#personal-training`, `#grappling-training`) bleiben in allen Sprachen gleich.

Mechanik je Seite:
1. Datei per `git mv` verschieben (Historie bleibt erhalten).
2. `export const metadata` → `export async function generateMetadata({ params })` mit `getTranslations({ locale, namespace: "Metadata" })` + `alternates.languages`.
3. `setRequestLocale(locale)` am Anfang der Page.
4. Alle internen `next/link`-Links → `Link` aus `@/i18n/navigation` (setzt das Präfix automatisch). Betrifft: BottomTabNav, DesktopNav, Footer, RechnerCTA, Hero, Kontakt-Section, LeistungenTeaser, UeberMichTeaser, `/leistungen`, `/ueber-mich`, RechnerErgebnis. Der externe Link auf praevention.digital bleibt ein normales `<a>`.
5. Texte → `useTranslations` (Server- und Client-Komponenten gleichermaßen; Client-Komponenten bekommen die Messages über `NextIntlClientProvider` im Layout).

Texte in Daten-Arrays (Leistungen, Qualifikationen, Vorteile, Ablauf, Slider): Das Array behält nur Struktur (ID, Bildpfad, CSS-Klassen), Text kommt über die ID: `t(\`services.${s.id}.title\`)`. Listen (Features, Qualifikationen) als Objekt mit festen Keys + statische Key-Liste im Code — so empfiehlt es next-intl, und es bleibt typsicher.

`SmoothScroll.tsx` nutzt weiterhin `usePathname` aus `next/navigation` (mit Präfix) — gewollt: beim Sprachwechsel ändert sich der Pfad, Lenis misst neu.

### 3.3 Message-Struktur (Ausschnitt)

```jsonc
{
  "Metadata":  { "default": { "title": "…", "description": "…" }, "leistungen": { … }, … },
  "Nav":       { "home": "Home", "leistungen": "Leistungen", "praevention": "Prävention",
                 "ueberMich": "Über mich", "kontakt": "Kontakt", "ctaErstgespraech": "Jetzt Erstgespräch sichern" },
  "Footer":    { "impressum": "Impressum", "datenschutz": "Datenschutz" },
  "Language":  { "label": "Sprache", "de": "Deutsch", "en": "English", "nl": "Nederlands" },
  "Home":      { "hero": { … }, "warum": { … }, "leistungenTeaser": { … }, "ueberMichTeaser": { … },
                 "zielgruppe": { … }, "kontakt": { … }, "rechnerCta": { … } },
  "Services":  { "onlineCoaching": { "title": "…", "tagline": "…", "body": "…",
                 "features": { "plaene": "…", … }, "alt": { "main": "…", "extra1": "…", "extra2": "…" } }, … },
  "Leistungen": { … }, "UeberMich": { … }, "Comeback": { … }, "Praevention": { … },
  "Kontakt":   { …, "form": { … } },
  "Rechner":   { … },   // 1:1 aus rechner-texte-de.ts
  "Legal":     { … },
  "NotFound":  { … }
}
```

Hervorhebungen im Fließtext als Rich-Text-Tags, z. B.:
`"Der erste Schritt war <hl>radikale Ehrlichkeit</hl>. Keine Ausreden. …"` → `t.rich("p2", { hl: (c) => <span className="font-semibold text-accent">{c}</span> })`.
So bleibt das Styling im Code, der Übersetzer kann die Hervorhebung aber an die passende Stelle im Satz setzen.

### 3.4 Typsicherheit & Fallback

- `global.d.ts` bindet `messages/de.json` als Typ an (`AppConfig.Messages`) → Tippfehler in Keys sind TypeScript-Fehler, genau wie bisher beim `RechnerTexte`-Interface.
- **DE als Fallback pro Key:** `i18n/request.ts` merged `de.json` als Basis mit der Zielsprache (kleiner Deep-Merge, keine Zusatz-Dependency). Fehlt in `nl.json` ein Key, erscheint der deutsche Text statt eines kaputten Key-Namens.
- `scripts/check-messages.mjs` (+ `npm run check:i18n`) listet fehlende/überzählige Keys in en/nl — damit Fallbacks nicht unbemerkt live gehen.

## 4. Sprachumschalter

### Randbedingung
Die BottomTabNav hat bereits 5 Spalten; laut Bestand ist „Leistungen"/„Prävention" bei 320 px Breite schon am Limit. Eine **6. Spalte** würde bei 320 px die Labels umbrechen lassen → **nicht empfohlen**.

### Vorschlag (mobil): „Sprach-Lasche" auf der Tab-Bar

Ein kleines Kürzel-Element sitzt rechts **auf der Oberkante** der Tab-Bar (wie ein Karteireiter), nimmt also keine Spaltenbreite weg:

```
                                      ┌──────┐
                                      │ DE ▾ │   ← 28 px hoch, bg-surface, border, 11px semibold
┌─────────────────────────────────────┴──────┴──┐
│  ⌂       ≡        ⛨        👤      [ Kontakt ] │
│ Home  Leistungen Prävention Über mich          │
└────────────────────────────────────────────────┘
```

Tap öffnet ein kleines Popover nach oben:

```
┌──────────────────┐
│ DE  Deutsch   ●  │   ← aktive Sprache in Accent
│ EN  English      │
│ NL  Nederlands   │
└──────────────────┘
```

- **Kürzel statt Flaggen:** Flaggen stehen für Länder, nicht für Sprachen (EN = UK? USA?), und Flaggen-Emojis werden unter Windows gar nicht als Flaggen dargestellt. Kürzel passen außerdem zum reduzierten Design.
- Sprachnamen jeweils in der eigenen Sprache („Nederlands", nicht „Niederländisch").
- Touch-Ziel ≥ 44 px (Lasche optisch 28 px, Klickfläche per Padding vergrößert); Popover schließt bei Tap außerhalb/Escape; `aria-expanded`, `aria-label` aus `Language.label`.
- Wechsel via `router.replace(pathname, { locale })` aus `i18n/navigation` → man bleibt auf derselben Seite, der Anker (`#…`) wird mitgenommen. Setzt automatisch das `NEXT_LOCALE`-Cookie.

### Weitere Stellen
- **Desktop (`DesktopNav`)**: dezentes Inline-Segment `DE · EN · NL` zwischen den Nav-Links und dem CTA-Button, aktive Sprache in Accent. Kein Dropdown nötig, Platz ist da.
- **Footer**: dieselbe Inline-Variante `DE · EN · NL` klein unter Impressum/Datenschutz. Grund: Auf `/rechner` ist die BottomTabNav auf Mobil ausgeblendet — ohne Footer-Umschalter käme man dort nicht an die Sprachwahl.

### Hinweis
Ein Sprachwechsel mitten im Rechner setzt den eingegebenen Rechner-Stand zurück (neue Seite = neuer Komponenten-State). Für ein 60-Sekunden-Tool vertretbar; ließe sich später per `sessionStorage` abfangen.

### Label-Längen (Plausibilitätscheck Tab-Bar)
EN: Home / Services / Prevention / About / Contact — NL: Home / Diensten / Preventie / Over mij / Contact. Alle kürzer oder gleich lang wie „Leistungen" → keine Layout-Probleme erwartet. Längere CTA-Texte (z. B. NL „Plan een kennismakingsgesprek") werden in DesktopNav und bei den Vollbreite-Buttons geprüft.

## 5. Migrations-Reihenfolge

Arbeit auf eigenem Branch `feature/i18n`, ein Commit pro Schritt, damit jeder Stand einzeln zurückrollbar ist.

### Phase 1 — Infrastruktur, nur Deutsch (nichts darf sich sichtbar ändern)
1. `npm install next-intl`.
2. `i18n/routing.ts` mit **zunächst nur `locales: ["de"]`**, `i18n/request.ts`, `i18n/navigation.ts`, `proxy.ts`, Plugin in `next.config.ts`.
3. `app/*` → `app/[locale]/*` verschieben, Layout mit `hasLocale`/`notFound`, `generateStaticParams`, `setRequestLocale`, `NextIntlClientProvider`, `<html lang={locale}>`.
4. Interne Links auf `@/i18n/navigation` umstellen, `pathname`-Vergleiche in BottomTabNav/DesktopNav anpassen.
5. **Prüfen:** `npm run build` + `npm run lint` grün; `/` → `/de`; `/leistungen` → `/de/leistungen`; alle Seiten, Anker, Tab-Bar-Aktivzustand, Rechner (Tab-Bar ausgeblendet), Lenis-Scrolling nach Seitenwechsel, Bilder, 404 für unbekannte Pfade.

### Phase 2 — Texte nach `messages/de.json` extrahieren (weiterhin nur Deutsch)
Datei für Datei, jeweils mit Sichtprüfung „sieht exakt aus wie vorher":
1. Layout-Metadaten, Nav, Footer
2. Startseiten-Sections + RechnerCTA
3. `/leistungen` (inkl. gemeinsamer `Services`-Keys mit dem Teaser)
4. `/ueber-mich`, ComebackSlider, ComebackCompare (Rich-Text, `kind`-Umstellung)
5. `/praevention`, `/kontakt` + KontaktForm (Themen-Keys statt Anzeigetext)
6. **Rechner:** `rechner-texte-de.ts` → `messages/de.json` (`Rechner`), plus die bisher hart codierten Reste („Kostenloses Tool", Metadaten, „PAL:", Einheiten, ARIA „verringern/erhöhen"). Danach `rechner-texte-de.ts` löschen. Kontrollrechnung mit festen Testwerten vorher/nachher → Ergebnis muss identisch sein.
7. Impressum/Datenschutz-Rahmen (Überschrift, Metadaten) — Rechtstext je nach Entscheidung 6.1.
8. Abschluss-Check: Suche nach verbliebenen deutschen Strings in `app/` + `components/` (Umlaute, typische Wörter in JSX), `npm run build`.

### Phase 3 — Englisch & Niederländisch
1. `locales: ["de", "en", "nl"]`, `LanguageSwitcher` in BottomTabNav, DesktopNav, Footer.
2. `messages/en.json` schreiben → `check:i18n` → Sichtprüfung aller Seiten auf `/en` (mobil 320/375 px + Desktop).
3. `messages/nl.json` analog.
4. Übersetzungs-Review durch dich — **für NL idealerweise durch Bram selbst** (Muttersprachler).

### Phase 4 — SEO & Feinschliff
- `alternates`/`hreflang` in allen `generateMetadata`, `openGraph.locale`.
- `sitemap.ts` mit allen Sprachvarianten (steht ohnehin noch auf der offenen Liste).
- Optional: lokalisierte Slugs (siehe 6.2).

## 6. Entscheidungen, die ich von dir brauche

1. **Impressum & Datenschutz.** Die Texte sind von eRecht24 generierte Rechtstexte. Eine eigene Übersetzung birgt Haftungsrisiko und ist nicht rechtsverbindlich.
   **Empfehlung:** Rechtstext in allen Sprachen auf Deutsch lassen, Seitenkopf/Footer-Label übersetzen und auf `/en` und `/nl` einen kurzen Hinweis darüber setzen („This legal notice is provided in German, which is the legally binding version."). Der Rechtstext bleibt dann als `LegalBlock[]` im Code und kommt **nicht** in die JSON-Dateien (spart auch ~450 Zeilen, die sonst an jeden Client geschickt würden). Alternative: eRecht24 bietet englische Fassungen an — die könnte man für `/en` einbinden.
2. **URL-Slugs.** Phase 1–3 mit **deutschen Slugs für alle Sprachen** (`/en/leistungen`). Später optional lokalisiert über next-intl `pathnames` (`/en/services`, `/nl/diensten`, `/en/about`, `/nl/over-mij` …). Weil ab Phase 1 alle Links über `i18n/navigation` laufen, ist das nachträglich reine Konfiguration. Jetzt schon oder später?
3. **Prävention auf EN/NL.** Die Seite beruht darauf, dass **deutsche Krankenkassen** die Kurse erstatten. Für niederländische Besucher (Zorgverzekeraar) gilt das so nicht. Vorschlag: Seite in allen Sprachen zeigen, auf EN/NL aber mit einem klaren Satz, dass die Erstattung für gesetzlich Versicherte in Deutschland gilt. Alternativ: Prävention-Tab auf EN/NL ausblenden.
4. **PAL-Stufen-Namen** („Sedentary", „Lightly active" …) sind schon in der deutschen Fassung Englisch. Vorschlag: in allen drei Sprachen so lassen (Fachbegriffe, analog zu „PAL"). Hilfetexte darunter werden übersetzt.
5. **Impressum „Sprachen für den Kontakt: Deutsch, Englisch".** Mit einer NL-Seite liegt es nahe, Niederländisch zu ergänzen — das ist aber eine inhaltliche Änderung am Rechtstext, also Brams Entscheidung.
6. **Kleinkram im Bestand** (bei der Extraktion gefunden): „dachte.Ich" in `/ueber-mich`, uneinheitliches eyebrow „PRÄVENTION" in Großbuchstaben. Mit korrigieren (eigener Commit) oder 1:1 übernehmen?
7. **Sprachumschalter:** Einverstanden mit der „Lasche" auf der Tab-Bar + Inline-Variante in DesktopNav und Footer?

## 7. Leitlinien für die Übersetzung (Phase 3)

- **Ton statt Wortlaut:** direkt, ruhig, ohne Werbe-Ausrufezeichen (Referenz: `UeberMich`, `WarumContextFit`). Kurze Sätze bleiben kurz. Sinngemäß übertragen, so dass es für Muttersprachler natürlich klingt.
- **Anrede:** DE „du" → EN neutrales „you" → NL „je/jij" (informell, wie im Deutschen; „u" wäre für die Tonalität zu förmlich).
- **Unverändert in allen Sprachen:** „Context Fit", „BJJ", „Luta Livre", „PAL", Personen- und Ortsnamen, Zahlen/Einheiten (kg, kcal, g), externe URLs.
- **Rechner:** nur Anzeigetexte; `lib/rechner-logik.ts` wird nicht verändert.
- **Glossar (Vorschlag, wird beim Übersetzen verfeinert):**

| DE | EN | NL |
|---|---|---|
| Erstgespräch | intro call | kennismakingsgesprek |
| Leistungen | Services | Diensten |
| Prävention | Prevention | Preventie |
| Über mich | About | Over mij |
| Personal Training vor Ort | In-person personal training | Personal training op locatie |
| Schwarzgurt | black belt | zwarte band |
| Krankenkasse | health insurance | zorgverzekeraar |
| Ruhetag / Trainingstag | rest day / training day | rustdag / trainingsdag |
| Grundumsatz | BMR | basaalmetabolisme (BMR) |
| Magermasse | lean mass | vetvrije massa |

## Sitemap

```
/                  → Startseite: kompakte Übersicht, verlinkt in die Tiefe
/leistungen        → alle 3 Leistungen ausführlich, mit Anker-IDs (#online-coaching, #personal-training, #grappling-training)
/praevention        → Verweis auf externe, zertifizierte Online-Präventionskurse (praevention.digital)
/ueber-mich        → vollständige Bio + Qualifikationen kombiniert
/kontakt           → Anfrageformular mit Themenauswahl (Erstgespräch)
/impressum         → nur über den Footer erreichbar, sonst nirgends verlinkt
/datenschutz       → nur über den Footer erreichbar, sonst nirgends verlinkt
```

`Kontakt` ist jetzt eine eigene Route (`/kontakt`) mit Formular. Alle "Jetzt Erstgespräch sichern"-Schaltflächen (Hero, Kontakt-Sektion, `/leistungen`, `/ueber-mich`) sowie die Bottom-Tab-Bar verlinken dorthin.

## Navigation

`components/BottomTabNav.tsx` — persistente Bottom-Tab-Bar auf allen Seiten (in `app/layout.tsx` eingebunden):
- Home / Leistungen / Prävention / Über mich als normale Tabs (aktiver Zustand über Pfad hervorgehoben)
- Kontakt als visuell abgesetzter Accent-Pill-Eintrag, verlinkt auf `/kontakt`
- 5 Tabs sind bei 375px Breite ca. 65px pro Tab, bei 320px (iPhone SE) nahezu ohne seitlichen Puffer (Label "Leistungen"/"Prävention" füllt die Spalte fast komplett aus) — bewusst nicht verkleinert, siehe Konversationsnotiz

`components/DesktopNav.tsx` — identische 4 Tabs (ohne Kontakt-Pill-Sonderfall, dafür eigener CTA-Button rechts) für Desktop.

`components/Footer.tsx` rendert jetzt global (`app/layout.tsx`, nicht mehr nur auf der Startseite) — Grund: die Impressum/Datenschutz-Links müssen laut Impressumspflicht von jeder Seite aus erreichbar sein, nicht nur von `/`. Enthält zwei dezente, kleine Links ("Impressum" · "Datenschutz"), die einzigen Verweise auf diese beiden Seiten im gesamten Projekt (keine Nav-Tabs, keine sonstigen Links).

## Bekannter Lenis-Stolperstein (behoben)

`components/SmoothScroll.tsx`: Lenis (`content: document.documentElement`, Default) misst die Scroll-Höhe einmalig und verlässt sich sonst auf einen `ResizeObserver` auf `document.documentElement` — dessen eigene Box bleibt aber viewport-groß, unabhängig vom Inhalt (`getComputedStyle(html).height` ≈ Viewport-Höhe, während `scrollHeight` den echten Inhalt zeigt). Bei einer Client-Side-Navigation (Next.js `<Link>`, kein Full-Reload) von einer kurzen zu einer langen Seite feuert dieser Observer daher **nicht**, und Lenis' interner `limit` (max. Scroll-Distanz) bleibt auf dem Wert der vorherigen, kürzeren Seite hängen — man kommt per Mausrad/Touch nicht weiter runter als das alte Seitenende, obwohl `scrollHeight` korrekt die neue, längere Seite zeigt. Am stärksten sichtbar auf den längsten Seiten (Startseite, `/datenschutz` mit ~10.500px). Fix: `SmoothScroll.tsx` ruft bei jedem Pfadwechsel (`usePathname()`) `lenis.resize()` sowie `ScrollTrigger.refresh()` explizit auf.

Die frühere `StickyCTA.tsx` (Ein-/Ausblenden per IntersectionObserver) wurde entfernt, da die Tab-Bar dauerhaft sichtbar ist und deren Zweck übernimmt.

## Startseite (`app/page.tsx`)

Reihenfolge: Hero → Warum Context Fit → Leistungen-Teaser → Über-mich-Teaser → Zielgruppe → Kontakt → Footer.

- **Hero** — `bram_smile.jpeg`, dunkler Gradient-Overlay
- **Warum Context Fit** — `bram_thinking.jpeg` (dunkler Hintergrund, nachdenklicher Ausdruck)
- **Leistungen-Teaser** (`LeistungenTeaser.tsx`) — 3 kompakte Kacheln (Thumbnail + Titel + Tagline), verlinken auf `/leistungen#<anchor>`; Link "Alle Leistungen ansehen" → `/leistungen`
- **Über-mich-Teaser** (`UeberMichTeaser.tsx`) — Foto `smile_with_curl.jpeg`, erster Bio-Satz, Qualifikations-Kurzzeile; Link "Mehr über mich erfahren" → `/ueber-mich`
- **Zielgruppe** — `bram_kettlebell_closeup.jpeg`, Abschluss-Statement
- **Kontakt** — Teaser-CTA, verlinkt auf `/kontakt`, Standort Paderborn
- **Footer**

## `/leistungen` (volle Tiefe)

Seiten-Header (`PageHeader`) mit `kettlebell_sideshot.jpeg`. Je Leistung: Hauptfoto + Text (unverändert aus der Startseiten-Fassung übernommen) + 1–2 zusätzliche Fotos:

| Leistung | Hauptfoto | Zusatzfotos |
|---|---|---|
| Online Coaching | `sideshot_2.jpeg` | `bram_frontshot.jpeg` |
| Personal Training vor Ort | `kettlebell_sideshot.jpeg` | `bram_bicepscurl.jpeg`, `bram_splitsquats.jpeg` |
| Grappling Training | `bram_explain_jj.png` (Graustufen-Filter, da Original farbig) | `squat_sideshot.jpeg`, `stretching.jpeg` |

## `/ueber-mich` (volle Tiefe)

Seiten-Header mit `smile_with_curl.jpeg`, vollständiger Bio-Text, Comeback-Slider (`vorher1/2.jpeg`, `nachher1/2.jpeg`) mit Vorher/Nachher-Story, anschließend die komplette Qualifikationen-Liste (6 Einträge).

## `/praevention`

Seiten-Header mit `bram_handsup.jpeg` (wie `/kontakt`). Persönlicher Absatz, 4 Vorteils-Karten (2×2-Grid auf allen Breakpoints — bei 4-spaltig Desktop brachen lange Wörter wie "Wissenschaftlich" mitten im Wort um, daher bewusst 2 Spalten mit mehr Breite pro Karte, je mit Icon), 3 nummerierte Ablauf-Schritte (01–03, im gleichen Stil wie die Leistungs-Indizes auf `/leistungen`), externer CTA-Button zu `https://praevention.digital/kurse/ref/ContextFitPraevention/` mit Transparenz-Hinweis darunter. Kein API-Call, reiner Außenlink (selber Tab, kein `target="_blank"`, passend zur Formulierung "wirst weitergeleitet").

## `/kontakt`

Seiten-Header mit `bram_handsup.jpeg`. Formular (`KontaktForm.tsx`, Client-Komponente): Themenauswahl als Pill-Buttons (Online Coaching, Personal Training vor Ort, Grappling Training, Allgemeine Anfrage), Name/E-Mail/Telefon/Nachricht mit Floating-Labels, Erfolgs-Ansicht nach Absenden (nur lokaler State, siehe Offene Punkte).

## `/impressum` und `/datenschutz`

Reine Rechtstext-Seiten, kein `PageHeader` (kein Foto, bewusst zurückhaltend). Inhalt 1:1 aus den von eRecht24 generierten PDFs übernommen (Bram van Koppen, Pohlweg 76, 33098 Paderborn; Hoster: Vercel Inc.). Gerendert über `components/legal/LegalBlocks.tsx` (typisierte Block-Liste: h2/h3/h4/p/ul/address), damit die lange Datenschutzerklärung nicht als eine riesige JSX-Wand geschrieben werden musste. Einzige Verlinkung im gesamten Projekt: die zwei kleinen Footer-Links.

## Foto-Inventar — aktueller Verwendungsstatus

| Datei | Verwendung |
|---|---|
| `bram_smile.jpeg` | Hero (Startseite) |
| `bram_thinking.jpeg` | Warum Context Fit (Startseite) |
| `sideshot_2.jpeg` | Online Coaching (Teaser + `/leistungen`) |
| `kettlebell_sideshot.jpeg` | Personal Training (Teaser + `/leistungen`), Seiten-Header `/leistungen` |
| `bram_explain_jj.png` | Grappling Training (Teaser + `/leistungen`, Graustufen-Filter) |
| `smile_with_curl.jpeg` | Über-mich-Teaser (Startseite), Seiten-Header `/ueber-mich` |
| `bram_kettlebell_closeup.jpeg` | Zielgruppe (Startseite) |
| `bram_frontshot.jpeg` | Online Coaching, Zusatzfoto (`/leistungen`) |
| `bram_bicepscurl.jpeg` | Personal Training, Zusatzfoto (`/leistungen`) |
| `bram_splitsquats.jpeg` | Personal Training, Zusatzfoto (`/leistungen`) |
| `squat_sideshot.jpeg` | Grappling Training, Zusatzfoto (`/leistungen`) |
| `stretching.jpeg` | Grappling Training, Zusatzfoto (`/leistungen`) |
| `vorher1.jpeg`, `vorher2.jpeg`, `nachher1.jpeg`, `nachher2.jpeg` | Comeback-Slider (`/ueber-mich`) |
| `bram_handsup.jpeg` | Seiten-Header `/kontakt` und `/praevention` |

**Noch ungenutzt (16 von 30):** `bram_kettlebell.jpeg`, `bram_curls.jpeg`, `bram_pushup.jpeg`, `pushup_position.jpeg`, `bram_curl_over_head.jpeg`, `bram_cabletower.jpeg`, `bram_press.jpeg`, `bram_lastpress.jpeg`, `bram_lastpull.jpeg`, `bram_pull.jpeg`, `bram_pulls.jpeg`, `legpress.jpeg`, `bram_butterfly.jpeg`, `sideshot_butterfly.jpeg`, `from_behind.jpeg`, `bram_sideshot.jpeg`, `bram_explain_fitness.png`.

`bram_explain_fitness.png` ist bewusst zurückgehalten (Wunsch des Nutzers, für einen späteren Zweck aufzuheben). `bram_explain_fitness.png` ist zudem **farbig**, nicht Schwarz-Weiß — bei zukünftiger Verwendung ggf. Graustufen-Filter nötig (analog zu `bram_explain_jj.png`).

## Desktop-Version (`lg:`, ab 1024px)

Ursprünglich war die Seite 100% mobile-first ohne jegliche Breakpoints. Es gibt jetzt eine additive Desktop-Schicht (ein einziger Breakpoint `lg:`, kein `md:`/`xl:`) — mobile Basis-Klassen bleiben unverändert, alles Desktop-Spezifische ist `lg:`-präfixiert.

- **`Container.tsx`** hat einen `variant`-Prop (`default` 1100px / `narrow` 720px Lesebreite / `wide` 1200px für Grids).
- **`DesktopNav.tsx`** (neu) — sticky Top-Bar, wird solide beim Scrollen (`ScrollTrigger`); `BottomTabNav` ist ab `lg:` per `lg:hidden` ausgeblendet.
- **Bug-Fix Vollbild-Bilder**: `Hero.tsx`, `PageHeader.tsx`, `Zielgruppe.tsx` nutzten viewport-hohe Sektionen (`h-[86dvh]` etc.) mit `object-cover` — auf breiten Desktop-Viewports wurden die überwiegend hochformatigen Fotos dadurch massiv verzerrt/reingezoomt. Fix: bei `lg:` wird die Sektion zum 2-Spalten-Grid, das Bild bekommt eine eigene `aspect-[4/5]`-Box statt den ganzen (falsch proportionierten) Viewport zu füllen.
- **Grids**: Startseiten-Sektionen (`WarumContextFit`, `UeberMichTeaser`) werden 2-spaltig mit alternierender Bildseite, `LeistungenTeaser` + `/leistungen` werden 3-spaltige Karten-Grids, `ComebackSlider` wird bei `lg:` zum statischen 4er-Grid (Swipe ergibt mit Maus keinen Sinn), Formularfelder in `KontaktForm.tsx` werden teils 2-spaltig.
- **Motion-Feinschliff**: `Reveal.tsx` hat einen optionalen `scrub`-Prop für Scroll-gekoppelte Animation; `Hero.tsx` nutzt `SplitText` für ein Wort-Stagger-Reveal der Headline (nur `lg:`, via `gsap.matchMedia`); Hero/PageHeader/Zielgruppe haben einen dezenten Parallax-Effekt auf dem gerahmten Bild plus Hover-Glow; `MagneticButton.tsx` (neu) gibt den Haupt-CTAs einen Cursor-Magnet-Effekt (nur bei Maus+Desktop aktiv).

## Offene Punkte

- **Kontaktformular** (`KontaktForm.tsx`) sendet aktuell noch nirgendwohin — Submit setzt nur lokalen React-State auf "erfolgreich". Backend/API-Route zum Weiterleiten der Anfrage an Brams E-Mail-Adresse fehlt noch.
- Rechtliches: Impressum/Datenschutz sind jetzt vorhanden (`/impressum`, `/datenschutz`). SEO-Metadaten (OG-Tags, Sitemap, robots.txt), Git-Setup weiterhin offen.
- `app/design-system/page.tsx` ist weiterhin ein reiner Dev-Testpage und wird vor dem finalen Launch entfernt.
