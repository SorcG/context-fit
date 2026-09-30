import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import type { Metadata } from "next";
import Container from "@/components/Container";
import Rechner from "@/components/rechner/Rechner";
import { rechnerTexteDe as texte } from "@/lib/rechner-texte-de";

export const metadata: Metadata = {
  title: "Kalorienrechner — Context Fit",
  description:
    "Finde deine Kalorien- und Makro-Ziele in 60 Sekunden — abgestimmt auf dein Training, nicht nur deinen Alltag.",
};

export default async function RechnerPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  return (
    <section className="pb-12 pt-10 lg:pb-24 lg:pt-16">
      <Container variant="narrow" className="flex flex-col gap-8">
        <div className="flex flex-col gap-3">
          <p className="text-sm font-semibold tracking-wide text-accent lg:text-base">
            Kostenloses Tool
          </p>
          <h1 className="text-3xl leading-[1.1] text-text lg:text-5xl">
            {texte.seitentitel}
          </h1>
          <p className="text-base leading-relaxed text-text lg:text-lg">
            {texte.intro}
          </p>
        </div>

        <Rechner />
      </Container>
    </section>
  );
}
