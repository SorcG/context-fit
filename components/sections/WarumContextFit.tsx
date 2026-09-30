import Image from "next/image";
import { useTranslations } from "next-intl";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";

export default function WarumContextFit() {
  const t = useTranslations("Home.warum");
  const tAlt = useTranslations("Alt");

  return (
    <section className="py-16 lg:py-28">
      <Container className="flex flex-col gap-8 lg:grid lg:grid-cols-2 lg:items-center lg:gap-16">
        <Reveal className="lg:col-start-2 lg:row-start-1">
          <h2 className="text-2xl leading-tight lg:text-4xl">
            {t("title")}
          </h2>
        </Reveal>

        <Reveal
          delay={0.1}
          className="lg:col-start-1 lg:row-start-1 lg:row-span-2"
        >
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl border border-border lg:aspect-[4/5]">
            <Image
              src="/images/bram_thinking.jpeg"
              alt={tAlt("bramThinking")}
              fill
              sizes="(min-width: 1024px) 40vw, (max-width: 480px) 100vw, 480px"
              className="object-cover object-top"
            />
          </div>
        </Reveal>

        <Reveal
          delay={0.15}
          className="flex flex-col gap-4 text-base leading-relaxed text-text lg:col-start-2 lg:row-start-2 lg:text-lg"
        >
          <p>{t("p1")}</p>
          <p>
            {t.rich("p2", {
              b: (chunks) => (
                <span className="font-semibold text-text">{chunks}</span>
              ),
            })}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
