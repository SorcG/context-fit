# Context Fit — Mobile: Plan

Stand: Design-System freigegeben, Startseite + drei vertiefende Unterseiten (`/leistungen`, `/ueber-mich`, `/kontakt`) umgesetzt. Multi-Page-Struktur mit Bottom-Tab-Bar-Navigation (mobil) + Top-Nav (Desktop). Vollständig responsiv (mobil-first + `lg:`-Desktop-Schicht).

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

Seiten-Header mit `smile_with_curl.jpeg`, vollständiger Bio-Text, Comeback-Slider (`vorher1/2.jpeg`, `nachher1/2.jpeg`) mit Vorher/Nachher-Story, anschließend die komplette Qualifikationen-Liste (6 Einträge).

## `/kontakt`

Seiten-Header mit `bram_handsup.jpeg`. Formular (`KontaktForm.tsx`, Client-Komponente): Themenauswahl als Pill-Buttons (Online Coaching, Personal Training vor Ort, Grappling Training, Allgemeine Anfrage), Name/E-Mail/Telefon/Nachricht mit Floating-Labels, Erfolgs-Ansicht nach Absenden (nur lokaler State, siehe Offene Punkte).

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
| `bram_handsup.jpeg` | Seiten-Header `/kontakt` |

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
- Rechtliches (Impressum/Datenschutz), SEO-Metadaten (OG-Tags, Sitemap, robots.txt), Git-Setup: noch nicht Teil des Projekts — folgt, sobald die inhaltliche Aufbauphase abgeschlossen ist.
- `app/design-system/page.tsx` ist weiterhin ein reiner Dev-Testpage und wird vor dem finalen Launch entfernt.
