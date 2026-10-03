import type { ReactNode } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { pageMetadata } from "@/i18n/metadata";
import { Link } from "@/i18n/navigation";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import PageHeader from "@/components/PageHeader";
import ComebackSlider from "@/components/ComebackSlider";
import ComebackCompare from "@/components/ComebackCompare";
import MagneticButton from "@/components/MagneticButton";

export function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  return pageMetadata(params, "ueberMich");
}

const qualifications = [
  "henselmans",
  "knkfFitness",
  "knkfWeightlifting",
  "bjj",
  "lutaLivre",
  "physio",
] as const;

const bioParagraphs = ["p1", "p2", "p3"] as const;
const comebackParagraphs = ["p1", "p2", "p3", "p4", "p5"] as const;

const highlight = (chunks: ReactNode) => (
  <span className="font-semibold text-accent">{chunks}</span>
);

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

export default async function UeberMichPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations("UeberMich");
  const tAlt = await getTranslations("Alt");
  const tNav = await getTranslations("Nav");

  return (
    <>
      <PageHeader
        eyebrow={t("eyebrow")}
        title={"Bram\nvan Koppen"}
        image="/images/bram_sideshot.jpeg"
        alt={tAlt("bramSideshot")}
        mobileHeight="h-[60dvh] min-h-[480px]"
      />

      <section className="py-12 lg:py-24">
        <Container variant="narrow" className="flex flex-col gap-10 lg:gap-16">
          <Reveal className="flex flex-col gap-4 text-base leading-relaxed text-text lg:text-lg">
            {bioParagraphs.map((p) => (
              <p key={p}>{t(`bio.${p}`)}</p>
            ))}
          </Reveal>

          <Reveal delay={0.1} className="flex flex-col gap-6">
            <h2 className="text-2xl leading-tight lg:text-4xl">
              {t("comeback.title")}
            </h2>
            <ComebackSlider />
            <ComebackCompare />
            <div className="flex flex-col gap-4 text-base leading-relaxed text-text lg:text-lg">
              {comebackParagraphs.map((p) => (
                <p key={p}>{t.rich(`comeback.${p}`, { hl: highlight })}</p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.15} className="flex flex-col gap-6">
            <h2 className="text-2xl leading-tight lg:text-4xl">
              {t("qualifikationen.title")}
            </h2>
            <ul className="flex flex-col gap-3 rounded-2xl border border-border bg-surface p-5 lg:grid lg:grid-cols-2 lg:gap-3 lg:border-0 lg:bg-transparent lg:p-0">
              {qualifications.map((q, i) => (
                <li
                  key={q}
                  className={`flex items-start gap-3 text-base text-text lg:rounded-xl lg:border lg:border-border lg:bg-surface lg:px-4 lg:py-3.5 ${
                    i !== 0 ? "border-t border-border pt-3" : ""
                  }`}
                >
                  <CheckIcon />
                  <span>{t(`qualifikationen.${q}`)}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.2}>
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
