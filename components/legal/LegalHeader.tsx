import { useLocale, useTranslations } from "next-intl";
import Reveal from "@/components/Reveal";

/**
 * Kopf der Rechtstext-Seiten. Der Rechtstext selbst bleibt in allen
 * Sprachen Deutsch (rechtsverbindliche Fassung), auf EN/NL steht ein
 * entsprechender Hinweis darüber.
 */
export default function LegalHeader({
  title,
}: {
  title: "impressumTitle" | "datenschutzTitle";
}) {
  const t = useTranslations("Legal");
  const locale = useLocale();

  return (
    <Reveal className="flex flex-col gap-3">
      <p className="text-sm font-semibold tracking-wide text-accent lg:text-base">
        {t("eyebrow")}
      </p>
      <h1 className="text-3xl leading-[1.1] text-text hyphens-auto break-words lg:text-5xl">
        {t(title)}
      </h1>
      {locale !== "de" && (
        <p className="mt-2 rounded-xl border border-border bg-surface/50 p-4 text-sm text-muted">
          {t("germanOnly")}
        </p>
      )}
    </Reveal>
  );
}
