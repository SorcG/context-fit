import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { pageMetadata } from "@/i18n/metadata";
import { Link } from "@/i18n/navigation";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import PageHeader from "@/components/PageHeader";
import MagneticButton from "@/components/MagneticButton";
import RechnerCTA from "@/components/RechnerCTA";

export function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  return pageMetadata(params, "leistungen");
}

// Nur Struktur und Bilder — alle Texte kommen aus messages/*.json
// (Services.<key>, Alt.<alt>). Die Anker-IDs bleiben in allen Sprachen gleich.
const services = [
  {
    id: "online-coaching",
    key: "onlineCoaching",
    index: "01",
    closing: false,
    image: "/images/bram_online.png",
    alt: "bramOnline",
    grayscale: true,
    imagePosition: "object-center",
    extraImages: [
      {
        src: "/images/bram_frontshot.jpeg",
        alt: "bramFrontshot",
        grayscale: false,
        imagePosition: "object-top",
      },
      {
        src: "/images/stretching.jpeg",
        alt: "stretching",
        grayscale: false,
        imagePosition: "object-top",
      },
    ],
  },
  {
    id: "personal-training",
    key: "personalTraining",
    index: "02",
    closing: true,
    image: "/images/bram_explain_fitness.png",
    alt: "bramExplainFitness",
    grayscale: true,
    imagePosition: "object-[center_20%]",
    extraImages: [
      {
        src: "/images/bram_pushup.jpeg",
        alt: "bramPushup",
        grayscale: false,
        imagePosition: "object-[20%_top]",
      },
      {
        src: "/images/bram_splitsquats.jpeg",
        alt: "bramSplitsquats",
        grayscale: false,
        imagePosition: "object-top",
      },
    ],
  },
  {
    id: "grappling-training",
    key: "grapplingTraining",
    index: "03",
    closing: false,
    image: "/images/bram_explain_jj.png",
    alt: "bramExplainJj",
    grayscale: true,
    imagePosition: "object-[center_22%]",
    extraImages: [
      {
        src: "/images/bram_stands_bjj.jpeg",
        alt: "bramStandsBjj",
        grayscale: false,
        imagePosition: "object-top",
      },
      {
        src: "/images/bram_grapples.jpeg",
        alt: "bramGrapples",
        grayscale: true,
        imagePosition: "object-top",
      },
    ],
  },
] as const;

export default async function LeistungenPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations("Leistungen");
  const tServices = await getTranslations("Services");
  const tAlt = await getTranslations("Alt");
  const tNav = await getTranslations("Nav");

  const features: Record<(typeof services)[number]["key"], string[]> = {
    onlineCoaching: (
      ["plaene", "ernaehrung", "betreuung", "lifestyle"] as const
    ).map((f) => tServices(`onlineCoaching.features.${f}`)),
    personalTraining: [],
    grapplingTraining: (["gruppen", "gi"] as const).map((f) =>
      tServices(`grapplingTraining.features.${f}`),
    ),
  };

  return (
    <>
      <PageHeader
        eyebrow={t("eyebrow")}
        title={t("title")}
        image="/images/kettlebell_sideshot.jpeg"
        alt={tAlt("kettlebellSideshot")}
      />

      <section className="py-12 lg:py-24">
        <Container
          variant="wide"
          className="flex flex-col gap-10 lg:grid lg:grid-cols-3 lg:items-start lg:gap-8"
        >
          {services.map((s, i) => (
            <Reveal key={s.id} delay={i * 0.05} className="lg:h-full">
              <article
                id={s.id}
                className="flex flex-col gap-4 rounded-2xl border border-border bg-surface p-5 lg:h-full lg:transition-colors lg:hover:border-accent/60"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-border">
                  <Image
                    src={s.image}
                    alt={tAlt(s.alt)}
                    fill
                    sizes="(min-width: 1024px) 33vw, (max-width: 480px) 100vw, 480px"
                    className={`object-cover ${s.imagePosition} ${
                      s.grayscale ? "grayscale" : ""
                    }`}
                  />
                </div>
                <p className="font-mono text-xs text-muted">{s.index}</p>
                <h2 className="text-xl lg:text-2xl">
                  {tServices(`${s.key}.title`)}
                </h2>
                <p className="text-base font-medium text-accent">
                  {tServices(`${s.key}.tagline`)}
                </p>
                <p className="text-base leading-relaxed text-text">
                  {tServices(`${s.key}.body`)}
                </p>
                {features[s.key].length > 0 && (
                  <ul className="flex flex-col gap-2">
                    {features[s.key].map((f) => (
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
                {s.closing && (
                  <p className="text-base font-semibold text-text">
                    {tServices("personalTraining.closing")}
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
                        alt={tAlt(img.alt)}
                        fill
                        sizes="(min-width: 1024px) 16vw, (max-width: 480px) 50vw, 240px"
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

          <Reveal className="lg:col-span-3">
            <RechnerCTA />
          </Reveal>

          <Reveal className="lg:col-span-3 lg:flex lg:justify-center">
            <MagneticButton>
              <Link
                href="/kontakt"
                className="flex h-[52px] w-full items-center justify-center rounded-full bg-accent px-6 text-base font-semibold text-text transition-transform active:scale-95 lg:w-fit lg:px-14"
              >
                {tNav("cta")}
              </Link>
            </MagneticButton>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
