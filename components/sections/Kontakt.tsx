import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import MagneticButton from "@/components/MagneticButton";

export default function Kontakt() {
  const t = useTranslations("Home.kontakt");
  const tNav = useTranslations("Nav");

  return (
    <section id="kontakt" className="py-20 lg:py-32">
      <Container
        variant="narrow"
        className="flex flex-col items-start gap-5 lg:items-center lg:text-center"
      >
        <Reveal>
          <h2 className="text-2xl leading-tight lg:text-5xl">
            {t("title")}
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-base leading-relaxed text-text lg:max-w-lg lg:text-lg">
            {t("body")}
          </p>
        </Reveal>
        <Reveal delay={0.15} className="w-full lg:w-fit">
          <MagneticButton>
            <Link
              href="/kontakt"
              className="flex h-[56px] w-full items-center justify-center rounded-full bg-accent px-6 text-base font-semibold text-text transition-transform active:scale-95 lg:w-fit lg:px-14 lg:transition-[box-shadow] lg:hover:shadow-[0_0_32px_-4px_var(--accent)]"
            >
              {tNav("cta")}
            </Link>
          </MagneticButton>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="text-sm text-muted">{t("standort")}</p>
        </Reveal>
      </Container>
    </section>
  );
}
