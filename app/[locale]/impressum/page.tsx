import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { pageMetadata } from "@/i18n/metadata";
import LegalHeader from "@/components/legal/LegalHeader";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import { LegalContent, type LegalBlock } from "@/components/legal/LegalBlocks";

export function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  return pageMetadata(params, "impressum");
}

const blocks: LegalBlock[] = [
  {
    type: "address",
    lines: ["Bram van Koppen", "Private Coaching", "Pohlweg 76", "33098 Paderborn"],
  },
  { type: "h3", text: "Kontakt" },
  {
    type: "address",
    lines: ["Telefon: +4915117814726", "E-Mail: info@context-fit.com"],
  },
  { type: "h3", text: "Umsatzsteuer-ID" },
  {
    type: "p",
    content:
      "Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz: DE453434825-EX",
  },
  { type: "h3", text: "Berufsbezeichnung und berufsrechtliche Regelungen" },
  { type: "p", content: "Berufsbezeichnung: Physiotherapeut" },
  { type: "p", content: "Verliehen in: Deutschland" },
  { type: "h3", text: "Verbraucherstreitbeilegung/Universalschlichtungsstelle" },
  {
    type: "p",
    content:
      "Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.",
  },
  {
    type: "h3",
    text: "Zentrale Kontaktstelle nach dem Digital Services Act - DSA (Verordnung (EU) 2022/2065)",
  },
  {
    type: "p",
    content:
      "Unsere zentrale Kontaktstelle für Nutzer und Behörden nach Art. 11, 12 DSA erreichen Sie wie folgt:",
  },
  {
    type: "address",
    lines: ["E-Mail: info@context-fit.com", "Telefon: 015117814726"],
  },
  {
    type: "p",
    content:
      "Die für den Kontakt zur Verfügung stehenden Sprachen sind: Deutsch, Englisch, Niederländisch.",
  },
];

export default async function ImpressumPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  return (
    <section className="py-12 lg:py-24">
      <Container variant="narrow" className="flex flex-col gap-8">
        <LegalHeader title="impressumTitle" />

        <Reveal delay={0.05}>
          <LegalContent blocks={blocks} />
        </Reveal>
      </Container>
    </section>
  );
}
