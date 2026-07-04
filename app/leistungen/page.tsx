import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Leistungen — Context Fit",
  description:
    "Online Coaching, Personal Training vor Ort und Grappling Training mit Bram van Koppen in Paderborn.",
};

const services = [
  {
    id: "online-coaching",
    index: "01",
    title: "Online Coaching",
    tagline: "Jederzeit. Überall. Ohne Grenzen.",
    body: "Du musst nicht in derselben Stadt – oder sogar im selben Land – sein, um professionelles Coaching zu erhalten.",
    features: [
      "Individuelle Trainingspläne",
      "Personalisierte Ernährungsberatung",
      "Kontinuierliche Betreuung & Motivation",
      "Lifestyle-Coaching",
    ],
    image: "/images/bram_online.png",
    alt: "Bram im Videocall auf einem Laptop-Bildschirm",
    grayscale: true,
    imagePosition: "object-center",
    extraImages: [
      {
        src: "/images/bram_frontshot.jpeg",
        alt: "Bram, frontal stehend",
        grayscale: false,
        imagePosition: "object-top",
      },
      {
        src: "/images/stretching.jpeg",
        alt: "Bram bei einer Mobility-Übung",
        grayscale: false,
        imagePosition: "object-top",
      },
    ],
  },
  {
    id: "personal-training",
    index: "02",
    title: "Personal Training vor Ort",
    tagline: "Kraft mit Ziel.",
    body: "Mit Personal Training vor Ort bekommst du nicht nur einen Trainingsplan – du erhältst direkte Unterstützung, Motivation und jemanden, der dich wirklich zur Verantwortung zieht.",
    closing: "Trainiere smarter. Trainiere härter. Trainiere mit Ziel.",
    image: "/images/bram_explain_fitness.png",
    alt: "Bram im Coaching-Gespräch mit einem Klienten im Fitnessstudio",
    grayscale: true,
    imagePosition: "object-[center_20%]",
    extraImages: [
      {
        src: "/images/bram_pushup.jpeg",
        alt: "Bram bei einer Liegestütz-Übung",
        grayscale: false,
        imagePosition: "object-[20%_top]",
      },
      {
        src: "/images/bram_splitsquats.jpeg",
        alt: "Bram beim Ausfallschritt",
        grayscale: false,
        imagePosition: "object-top",
      },
    ],
  },
  {
    id: "grappling-training",
    index: "03",
    title: "Grappling Training",
    tagline: "Entfalte dein volles Potenzial auf der Matte",
    body: "Jahrelange Erfahrung in BJJ, MMA und Strength & Conditioning.",
    features: ["Personal Training & Kleingruppen", "Gi & No-Gi Expertise"],
    image: "/images/bram_explain_jj.png",
    alt: "Bram erklärt eine Grappling-Technik auf der Matte",
    grayscale: true,
    imagePosition: "object-[center_22%]",
    extraImages: [
      {
        src: "/images/bram_stands_bjj.jpeg",
        alt: "Bram im Gi, stehend im Trainingsraum",
        grayscale: false,
        imagePosition: "object-top",
      },
      {
        src: "/images/bram_grapples.jpeg",
        alt: "Bram im Grappling-Austausch mit einem Trainingspartner",
        grayscale: true,
        imagePosition: "object-top",
      },
    ],
  },
] as const;

export default function LeistungenPage() {
  return (
    <>
      <PageHeader
        eyebrow="Leistungen"
        title="Drei Wege zu deinem Ziel"
        image="/images/kettlebell_sideshot.jpeg"
        alt="Bram beim Training im Fitnessstudio"
      />

      <section className="py-12">
        <Container className="flex flex-col gap-10">
          {services.map((s, i) => (
            <Reveal key={s.id} delay={i * 0.05}>
              <article
                id={s.id}
                className="flex flex-col gap-4 rounded-2xl border border-border bg-surface p-5"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-border">
                  <Image
                    src={s.image}
                    alt={s.alt}
                    fill
                    sizes="(max-width: 480px) 100vw, 480px"
                    className={`object-cover ${s.imagePosition} ${
                      s.grayscale ? "grayscale" : ""
                    }`}
                  />
                </div>
                <p className="font-mono text-xs text-muted">{s.index}</p>
                <h2 className="text-xl">{s.title}</h2>
                <p className="text-base font-medium text-accent">
                  {s.tagline}
                </p>
                <p className="text-base leading-relaxed text-text">
                  {s.body}
                </p>
                {"features" in s && (
                  <ul className="flex flex-col gap-2">
                    {s.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-2 text-base text-text"
                      >
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        {f}
                      </li>
                    ))}
                  </ul>
                )}
                {"closing" in s && (
                  <p className="text-base font-semibold text-text">
                    {s.closing}
                  </p>
                )}
                <div className="grid grid-cols-2 gap-3">
                  {s.extraImages.map((img) => (
                    <div
                      key={img.src}
                      className="relative aspect-[3/4] w-full overflow-hidden rounded-xl border border-border"
                    >
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        sizes="(max-width: 480px) 50vw, 240px"
                        className={`object-cover ${img.imagePosition} ${
                          img.grayscale ? "grayscale" : ""
                        }`}
                      />
                    </div>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}

          <Reveal>
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
