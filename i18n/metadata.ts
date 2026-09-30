import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import type { Locale } from "./routing";
import type messages from "../messages/de.json";

type PageKey = Exclude<keyof (typeof messages)["Metadata"], "default">;

/** Seitentitel + Beschreibung einer Unterseite aus Metadata.<page>. */
export async function pageMetadata(
  params: Promise<{ locale: string }>,
  page: PageKey,
): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({
    locale: locale as Locale,
    namespace: "Metadata",
  });
  return {
    title: t(`${page}.title`),
    description: t(`${page}.description`),
  };
}
