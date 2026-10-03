import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { pageMetadata } from "@/i18n/metadata";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import PageHeader from "@/components/PageHeader";
import MagneticButton from "@/components/MagneticButton";

export function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  return pageMetadata(params, "praevention");
}

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
  { key: "flexibel", Icon: ClockIcon },
  { key: "zuhause", Icon: HomeMiniIcon },
  { key: "wissenschaft", Icon: ChartIcon },
  { key: "kasse", Icon: CoinIcon },
] as const;

const ablauf = [
  { index: "01", key: "starten" },
  { index: "02", key: "abschliessen" },
  { index: "03", key: "erstattung" },
] as const;

export default async function PraeventionPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  // Die Kurse werden nur von deutschen Krankenkassen erstattet — auf EN/NL
  // gibt es diese Seite nicht (Tab ist dort ebenfalls ausgeblendet).
  if (locale !== "de") notFound();
  setRequestLocale(locale as Locale);
  const t = await getTranslations("Praevention");
  const tAlt = await getTranslations("Alt");

  return (
    <>
      <PageHeader
        eyebrow={t("eyebrow")}
        title={t("title")}
        image="/images/bram_handsup.jpeg"
        alt={tAlt("bramHandsup")}
      />

      <section className="py-12 lg:py-24">
        <Container variant="narrow" className="flex flex-col gap-12 lg:gap-20">
          <Reveal className="text-base leading-relaxed text-text lg:text-lg">
            <p>{t("intro")}</p>
          </Reveal>

          <div className="grid grid-cols-2 gap-4 lg:gap-6">
            {vorteile.map((v, i) => (
              <Reveal
                key={v.key}
                delay={i * 0.08}
                className="flex flex-col gap-3 rounded-2xl border border-border bg-surface p-5"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/15 text-accent">
                  <v.Icon className="h-5 w-5" />
                </span>
                <h3 className="break-words text-base font-semibold text-text hyphens-auto lg:hyphens-manual">
                  {t(`vorteile.${v.key}.title`)}
                </h3>
                <p className="text-sm leading-relaxed text-muted">
                  {t(`vorteile.${v.key}.body`)}
                </p>
              </Reveal>
            ))}
          </div>

          <div className="flex flex-col gap-5">
            <h2 className="text-2xl leading-tight lg:text-3xl">
              {t("ablaufTitle")}
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
                    {t(`ablauf.${step.key}.title`)}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted">
                    {t(`ablauf.${step.key}.body`)}
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
                {t("cta")}
              </a>
            </MagneticButton>
            <p className="text-xs text-muted">
              {t("hinweis")}
            </p>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
