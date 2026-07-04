import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import PageHeader from "@/components/PageHeader";
import ComebackSlider from "@/components/ComebackSlider";

export const metadata: Metadata = {
  title: "Über mich — Context Fit",
  description:
    "Bram van Koppen: Schwarzgurt in BJJ und Luta Livre, Dipl. Physiotherapeut (NL) und Personal Coach in Paderborn.",
};

const qualifications = [
  "Menno Henselmans Personal Trainer Zertifizierung",
  "KNKF Fitness Instructor",
  "KNKF Weightlifting Instructor",
  "Schwarzgurt in Brazilian Jiu-Jitsu",
  "Schwarzgurt in Luta Livre",
  "Dipl. Physiotherapeut (NL), Manualtherapeut, PNF-Therapeut",
];

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      className="mt-0.5 h-5 w-5 shrink-0 text-accent"
      aria-hidden
    >
      <path
        d="M4 10.5l3.5 3.5L16 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function UeberMichPage() {
  return (
    <>
      <PageHeader
        eyebrow="Über mich"
        title="Bram van Koppen"
        image="/images/smile_with_curl.jpeg"
        alt="Bram van Koppen lächelt in die Kamera"
      />

      <section className="py-12">
        <Container className="flex flex-col gap-10">
          <Reveal className="flex flex-col gap-4 text-base leading-relaxed text-text">
            <p>
              Mein Name ist Bram van Koppen und Sport ist bereits seit meiner
              Jugend ein fester Bestandteil meines Lebens. Meine ersten
              Schritte machte ich im Karate, später entdeckte ich Brazilian
              Jiu-Jitsu, das bis heute meine große Leidenschaft geblieben ist.
              Mit der Zeit wurde mir klar, dass ich stärker werden musste, um
              mein volles Potenzial auszuschöpfen – so fand auch das
              Krafttraining seinen Platz in meinem Alltag. Von Olympischem
              Gewichtheben über Powerlifting bis hin zu weiteren Disziplinen
              habe ich viele Wege erkundet, um mich als Athlet und Trainer
              weiterzuentwickeln.
            </p>
            <p>
              Neben meiner Arbeit als Coach bin ich auch ausgebildeter
              Physiotherapeut. Das ermöglicht es mir, Leistungssteigerung mit
              Verletzungsprävention und Rehabilitation zu verbinden.
            </p>
            <p>
              Ich bin stolzer Vater von zwei Kindern. Gerade dadurch habe ich
              gelernt, wie wichtig effektive und realistische
              Trainingsmethoden sind. Familie, Beruf und Training unter einen
              Hut zu bringen, ist eine Herausforderung – und genau deswegen
              lege ich Wert darauf, Fitness praktisch und nachhaltig in den
              Alltag meiner Klienten zu integrieren.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="flex flex-col gap-6">
            <h2 className="text-2xl leading-tight">Mein Comeback</h2>
            <ComebackSlider />
            <div className="flex flex-col gap-4 text-base leading-relaxed text-text">
              <p>
                Vor rund zwei Jahren musste ich mir eingestehen: Ich war nicht
                in der Form, die ich dachte. 104 kg, obwohl ich regelmäßig
                trainierte — ich hatte mir selbst etwas vorgemacht.
              </p>
              <p>
                Der erste Schritt war{" "}
                <span className="font-semibold text-accent">
                  radikale Ehrlichkeit
                </span>
                . Keine Ausreden. Ich fand drei Dinge heraus: Ich hatte meine
                Kalorienzufuhr massiv unterschätzt. Trotz Training auf der
                Matte war ich im Alltag zu inaktiv. Und mein Schlaf war zu
                kurz — mit zwei kleinen Kindern keine leichte Aufgabe, aber ich
                hatte es mir zusätzlich zu leicht gemacht.
              </p>
              <p>
                Also habe ich es verändert: mehr Bewegung im Alltag, Kalorien
                getrackt, Mahlzeiten vorbereitet, einen strukturierten
                Trainingsplan konsequent verfolgt. Und das Wichtigste —{" "}
                <span className="font-semibold text-accent">
                  jeden Tag dranbleiben
                </span>
                .
              </p>
              <p>
                Das Ergebnis: von 104 kg auf 88 kg. Mehr Energie, mehr
                Selbstvertrauen.
              </p>
              <p>
                Einfach heißt nicht leicht.{" "}
                <span className="font-semibold text-accent">Konsequenz</span>{" "}
                war der eigentliche Erfolgsfaktor. Ich weiß, wie schwer es ist,
                Familie, Beruf und die eigene Gesundheit unter einen Hut zu
                bringen — genau deshalb helfe ich dir, den Weg zu finden, der
                zu deinem Leben passt.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.15} className="flex flex-col gap-6">
            <h2 className="text-2xl leading-tight">Qualifikationen</h2>
            <ul className="flex flex-col gap-3 rounded-2xl border border-border bg-surface p-5">
              {qualifications.map((q, i) => (
                <li
                  key={q}
                  className={`flex items-start gap-3 text-base text-text ${
                    i !== 0 ? "border-t border-border pt-3" : ""
                  }`}
                >
                  <CheckIcon />
                  <span>{q}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.2}>
            <Link
              href="/kontakt"
              className="flex h-[52px] w-full items-center justify-center rounded-full bg-accent px-6 text-base font-semibold text-text transition-transform active:scale-95"
            >
              Jetzt Erstgespräch sichern
            </Link>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
