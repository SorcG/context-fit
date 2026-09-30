import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";

export default function UeberMichTeaser() {
  const t = useTranslations("Home.ueberMichTeaser");
  const tAlt = useTranslations("Alt");

  return (
    <section className="py-16 lg:py-28">
      <Container className="flex flex-col gap-6 lg:grid lg:grid-cols-2 lg:items-center lg:gap-16">
        <Reveal className="lg:col-start-1 lg:row-start-1">
          <h2 className="text-2xl leading-tight lg:text-4xl">{t("title")}</h2>
        </Reveal>

        <Reveal
          delay={0.1}
          className="lg:col-start-2 lg:row-start-1 lg:row-span-3"
        >
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl border border-border lg:aspect-[4/5]">
            <Image
              src="/images/smile_with_curl.jpeg"
              alt={tAlt("smileWithCurl")}
              fill
              sizes="(min-width: 1024px) 40vw, (max-width: 480px) 100vw, 480px"
              className="object-cover object-top"
            />
          </div>
        </Reveal>

        <Reveal
          delay={0.15}
          className="flex flex-col gap-3 lg:col-start-1 lg:row-start-2"
        >
          <p className="text-base leading-relaxed text-text lg:text-lg">
            {t("intro")}
          </p>
          <p className="text-sm text-muted lg:text-base">
            {t("qualifikationen")}
          </p>
        </Reveal>

        <Reveal delay={0.2} className="lg:col-start-1 lg:row-start-3">
          <Link
            href="/ueber-mich"
            className="flex h-[52px] w-full items-center justify-center rounded-full border border-border px-6 text-base font-medium text-text transition-transform active:scale-95 lg:w-fit lg:px-8 lg:hover:scale-105 lg:hover:border-accent lg:hover:text-accent"
          >
            {t("mehr")}
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}
