# Context Fit — Mobile: Plan

Stand: Design-System freigegeben, Startseite + drei vertiefende Unterseiten (`/leistungen`, `/ueber-mich`, `/kontakt`) umgesetzt. Multi-Page-Struktur mit Bottom-Tab-Bar-Navigation.

## Sitemap

```
/                  → Startseite: kompakte Übersicht, verlinkt in die Tiefe
/leistungen        → alle 3 Leistungen ausführlich, mit Anker-IDs (#online-coaching, #personal-training, #grappling-training)
/ueber-mich        → vollständige Bio + Qualifikationen kombiniert
/kontakt           → Anfrageformular mit Themenauswahl (Erstgespräch)
```

`Kontakt` ist jetzt eine eigene Route (`/kontakt`) mit Formular. Alle "Jetzt Erstgespräch sichern"-Schaltflächen (Hero, Kontakt-Sektion, `/leistungen`, `/ueber-mich`) sowie die Bottom-Tab-Bar verlinken dorthin.

## Navigation

`components/BottomTabNav.tsx` — persistente Bottom-Tab-Bar auf allen Seiten (in `app/layout.tsx` eingebunden):
- Home / Leistungen / Über mich als normale Tabs (aktiver Zustand über Pfad hervorgehoben)
- Kontakt als visuell abgesetzter Accent-Pill-Eintrag, verlinkt auf `/kontakt`

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

Seiten-Header mit `smile_with_curl.jpeg`, vollständiger Bio-Text, zusätzliches Foto `bram_on_machine.jpeg`, anschließend die komplette Qualifikationen-Liste (6 Einträge).

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
| `bram_on_machine.jpeg` | Über mich, Zusatzfoto (`/ueber-mich`) |

**Noch ungenutzt (17 von 30):** `bram_kettlebell.jpeg`, `bram_handsup.jpeg`, `bram_curls.jpeg`, `bram_pushup.jpeg`, `pushup_position.jpeg`, `bram_curl_over_head.jpeg`, `bram_cabletower.jpeg`, `bram_press.jpeg`, `bram_lastpress.jpeg`, `bram_lastpull.jpeg`, `bram_pull.jpeg`, `bram_pulls.jpeg`, `legpress.jpeg`, `bram_butterfly.jpeg`, `sideshot_butterfly.jpeg`, `from_behind.jpeg`, `bram_sideshot.jpeg`, `bram_explain_fitness.png`.

`bram_explain_fitness.png` ist bewusst zurückgehalten (Wunsch des Nutzers, für einen späteren Zweck aufzuheben). `bram_explain_fitness.png` ist zudem **farbig**, nicht Schwarz-Weiß — bei zukünftiger Verwendung ggf. Graustufen-Filter nötig (analog zu `bram_explain_jj.png`).

## Offene Punkte

- **Kontakt-Button** verlinkt aktuell auf `/#kontakt` mit `href="#"` als Platzhalter auf der Startseite selbst — bewusst offen gelassen, bis eine reale Buchungsmöglichkeit (E-Mail/Calendly/WhatsApp) feststeht.
- Rechtliches (Impressum/Datenschutz), SEO-Metadaten (OG-Tags, Sitemap, robots.txt), Git-Setup: noch nicht Teil des Projekts — folgt, sobald die inhaltliche Aufbauphase abgeschlossen ist.
- `app/design-system/page.tsx` ist weiterhin ein reiner Dev-Testpage und wird vor dem finalen Launch entfernt.
