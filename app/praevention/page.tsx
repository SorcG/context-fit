import type { Metadata } from "next";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import PageHeader from "@/components/PageHeader";
import MagneticButton from "@/components/MagneticButton";

export const metadata: Metadata = {
  title: "Prävention — Context Fit",
  description:
    "Zertifizierte Online-Präventionskurse, von Bram van Koppen empfohlen — von zu Hause aus, von der Krankenkasse bis zu 100% erstattet.",
};

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden>
      <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M10 6v4l3 2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HomeMiniIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden>
      <path
        d="M3 9.5L10 3l7 6.5M4.5 8v8h11V8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChartIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden>
      <path
        d="M3.5 16.5h13"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M5.5 16.5v-4M10 16.5v-8M14.5 16.5v-6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CoinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden>
      <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M10 6.5v7M8.1 8.3c0-.9.85-1.6 1.9-1.6s1.9.6 1.9 1.35c0 1.85-3.8 1.05-3.8 2.9 0 .75.85 1.35 1.9 1.35s1.9-.7 1.9-1.6"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const vorteile = [
  {
    title: "100% flexibel",
    body: "Trainiere wann und wo du willst. Ganz ohne Anfahrt oder feste Termine.",
    Icon: ClockIcon,
  },
  {
    title: "Von zu Hause",
    body: "Absolviere die Einheiten in deiner gewohnten Umgebung, in deinem Tempo.",
    Icon: HomeMiniIcon,
  },
  {
    title: "Wissenschaftlich fundiert",
    body: "Effizientes Training für Gesundheit, Kraft und Beweglichkeit.",
    Icon: ChartIcon,
  },
  {
    title: "Kasse übernimmt bis zu 100%",
    body: "Du investierst in deine Gesundheit — deine Krankenkasse beteiligt sich massiv.",
    Icon: CoinIcon,
  },
] as const;

const ablauf = [
  {
    index: "01",
    title: "Kurs auswählen & starten",
    body: "Melde dich für deinen Online-Präventionskurs an und starte direkt von zu Hause aus, in deinem eigenen Tempo.",
  },
  {
    index: "02",
    title: "Kurs abschließen",
    body: "Absolviere die Einheiten und erhalte am Ende dein offizielles Teilnahmezertifikat.",
  },
  {
    index: "03",
    title: "Geld zurückerhalten",
    body: "Reiche das Zertifikat bei deiner Krankenkasse ein und erhalte einen Großteil oder die gesamte Kursgebühr zurück.",
  },
] as const;

export default function PraeventionPage() {
  return (
    <>
      <PageHeader
        eyebrow="PRÄVENTION"
        title="Von der Kasse bezahlt. Von mir empfohlen."
        image="/images/bram_handsup.jpeg"
        alt="Bram, hoch konzentriert bei einer dynamischen Übung"
      />

      <section className="py-12 lg:py-24">
        <Container variant="narrow" className="flex flex-col gap-12 lg:gap-20">
          <Reveal className="text-base leading-relaxed text-text lg:text-lg">
            <p>
              Nicht jeder kann oder will sich Personal Training leisten, und
              nicht jeder hat Lust auf ein volles Fitnessstudio. Für alle, die
              trotzdem etwas für ihre Gesundheit tun wollen, empfehle ich
              diese zertifizierten Online-Präventionskurse. Flexibel von zu
              Hause und deine Krankenkasse übernimmt bis zu 100% der Kosten.
              Kein Verkaufsgespräch, keine Verpflichtung — einfach ein guter
              Einstieg.
            </p>
          </Reveal>

          <div className="grid grid-cols-2 gap-4 lg:gap-6">
            {vorteile.map((v, i) => (
              <Reveal
                key={v.title}
                delay={i * 0.08}
                className="flex flex-col gap-3 rounded-2xl border border-border bg-surface p-5"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/15 text-accent">
                  <v.Icon className="h-5 w-5" />
                </span>
                <h3 className="text-base font-semibold text-text">
                  {v.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted">
                  {v.body}
                </p>
              </Reveal>
            ))}
          </div>

          <div className="flex flex-col gap-5">
            <h2 className="text-2xl leading-tight lg:text-3xl">
              So läuft&apos;s ab
            </h2>
            <div className="flex flex-col gap-4 lg:grid lg:grid-cols-3 lg:gap-6">
              {ablauf.map((step, i) => (
                <Reveal
                  key={step.index}
                  delay={i * 0.08}
                  className="flex flex-col gap-2 rounded-2xl border border-border bg-surface p-5"
                >
                  <p className="font-mono text-xs text-muted">
                    {step.index}
                  </p>
                  <h3 className="text-base font-semibold text-text">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted">
                    {step.body}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal className="flex flex-col gap-3">
            <MagneticButton>
              <a
                href="https://praevention.digital/kurse/ref/ContextFitPraevention/"
                className="flex h-[56px] w-full items-center justify-center rounded-full bg-accent px-6 text-base font-semibold text-text transition-transform active:scale-95 lg:w-fit lg:px-14"
              >
                Kurse ansehen
              </a>
            </MagneticButton>
            <p className="text-xs text-muted">
              Du wirst zu praevention.digital weitergeleitet — einem
              unabhängigen, zertifizierten Kursanbieter. Die Anmeldung und
              Abwicklung läuft komplett dort.
            </p>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
