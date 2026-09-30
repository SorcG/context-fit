import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { pageMetadata } from "@/i18n/metadata";
import Container from "@/components/Container";
import Rechner from "@/components/rechner/Rechner";

export function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  return pageMetadata(params, "rechner");
}

export default async function RechnerPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations("Rechner");

  return (
    <section className="pb-12 pt-10 lg:pb-24 lg:pt-16">
      <Container variant="narrow" className="flex flex-col gap-8">
        <div className="flex flex-col gap-3">
          <p className="text-sm font-semibold tracking-wide text-accent lg:text-base">
            {t("eyebrow")}
          </p>
          <h1 className="text-3xl leading-[1.1] text-text hyphens-auto break-words lg:text-5xl">
            {t("seitentitel")}
          </h1>
          <p className="text-base leading-relaxed text-text lg:text-lg">
            {t("intro")}
          </p>
        </div>

        <Rechner />
      </Container>
    </section>
  );
}
