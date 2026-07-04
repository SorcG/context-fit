const colors = [
  { name: "bg", label: "Background", hex: "#0D0D0F", textClass: "text-text" },
  { name: "surface", label: "Surface", hex: "#1C1C21", textClass: "text-text" },
  { name: "border", label: "Border", hex: "#2A2A30", textClass: "text-text" },
  { name: "muted", label: "Muted", hex: "#8A8A93", textClass: "text-bg" },
  { name: "text", label: "Text", hex: "#FFFFFF", textClass: "text-bg" },
  { name: "accent", label: "Accent", hex: "#E10600", textClass: "text-text" },
] as const;

const colorBgClass: Record<(typeof colors)[number]["name"], string> = {
  bg: "bg-bg",
  surface: "bg-surface",
  border: "bg-border",
  muted: "bg-muted",
  text: "bg-text",
  accent: "bg-accent",
};

export default function DesignSystemPage() {
  return (
    <main className="mx-auto flex w-full max-w-[430px] flex-col gap-10 px-5 py-10">
      <header className="flex flex-col gap-1">
        <p className="text-sm font-medium tracking-wide text-accent">
          Context Fit — Mobile
        </p>
        <h1 className="text-2xl leading-tight">Design System</h1>
        <p className="text-sm text-muted">
          Testseite zur Freigabe. Wird vor dem finalen Launch entfernt.
        </p>
      </header>

      {/* Farben */}
      <section className="flex flex-col gap-4">
        <h2 className="text-lg">Farben</h2>
        <div className="grid grid-cols-2 gap-3">
          {colors.map((color) => (
            <div
              key={color.name}
              className="overflow-hidden rounded-xl border border-border"
            >
              <div
                className={`flex h-20 items-end p-3 ${colorBgClass[color.name]}`}
              >
                <span className={`font-mono text-xs ${color.textClass}`}>
                  {color.hex}
                </span>
              </div>
              <div className="bg-surface px-3 py-2">
                <p className="text-sm font-medium text-text">{color.label}</p>
                <p className="font-mono text-xs text-muted">--{color.name}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Typografie */}
      <section className="flex flex-col gap-6">
        <h2 className="text-lg">Typografie</h2>

        <div className="flex flex-col gap-2 rounded-xl border border-border bg-surface p-4">
          <p className="text-xs text-muted">Unbounded 800 — Headline</p>
          <p className="font-display text-3xl font-extrabold leading-[1.1] text-text">
            Dein Partner auf dem Weg zu einem gesünderen, fitteren Leben.
          </p>
        </div>

        <div className="flex flex-col gap-2 rounded-xl border border-border bg-surface p-4">
          <p className="text-xs text-muted">Unbounded 700 — Subheadline</p>
          <p className="font-display text-xl font-bold leading-snug text-text">
            Grappler, vielbeschäftigte Väter und ganz normale Menschen.
          </p>
        </div>

        <div className="flex flex-col gap-2 rounded-xl border border-border bg-surface p-4">
          <p className="text-xs text-muted">DM Sans 400 — Fließtext</p>
          <p className="font-body text-base font-normal leading-relaxed text-text">
            Ich begleite dich auf dem Weg zu einem gesünderen Lebensstil. Wir
            erstellen einen maßgeschneiderten Plan nur für dich.
          </p>
        </div>

        <div className="flex flex-col gap-2 rounded-xl border border-border bg-surface p-4">
          <p className="text-xs text-muted">DM Sans 500 — Betont / Buttons</p>
          <p className="font-body text-base font-medium text-text">
            Trainiere smarter. Trainiere härter. Trainiere mit Ziel.
          </p>
        </div>

        <div className="flex flex-col gap-2 rounded-xl border border-border bg-surface p-4">
          <p className="text-xs text-muted">DM Sans 600 — Labels / Badges</p>
          <p className="font-body text-base font-semibold text-text">
            Schwarzgurt BJJ &amp; Luta Livre
          </p>
        </div>
      </section>

      {/* Button-Beispiel */}
      <section className="flex flex-col gap-4">
        <h2 className="text-lg">UI-Elemente</h2>
        <button className="flex h-[52px] w-full items-center justify-center rounded-full bg-accent px-6 font-body text-base font-semibold text-text transition-transform active:scale-95">
          Jetzt Erstgespräch sichern
        </button>
        <button className="flex h-[52px] w-full items-center justify-center rounded-full border border-border bg-transparent px-6 font-body text-base font-medium text-text transition-transform active:scale-95">
          Mehr erfahren
        </button>
      </section>
    </main>
  );
}
