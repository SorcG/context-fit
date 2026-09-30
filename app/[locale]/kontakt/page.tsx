import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { pageMetadata } from "@/i18n/metadata";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import PageHeader from "@/components/PageHeader";
import KontaktForm from "@/components/KontaktForm";

export function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  return pageMetadata(params, "kontakt");
}

export default async function KontaktPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations("Kontakt");
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
        <Container variant="narrow" className="flex flex-col gap-10 lg:gap-14">
          <Reveal className="flex flex-col gap-4 text-base leading-relaxed text-text lg:text-lg">
            <p>{t("intro")}</p>
          </Reveal>

          <KontaktForm />
        </Container>
      </section>
    </>
  );
}
