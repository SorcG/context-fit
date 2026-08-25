import Image from "next/image";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";

export default function WarumContextFit() {
  return (
    <section className="py-16 lg:py-28">
      <Container className="flex flex-col gap-8 lg:grid lg:grid-cols-2 lg:items-center lg:gap-16">
        <Reveal className="lg:col-start-2 lg:row-start-1">
          <h2 className="text-2xl leading-tight lg:text-4xl">
            Warum Context Fit?
          </h2>
        </Reveal>

        <Reveal
          delay={0.1}
          className="lg:col-start-1 lg:row-start-1 lg:row-span-2"
        >
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl border border-border lg:aspect-[4/5]">
            <Image
              src="/images/bram_thinking.jpeg"
              alt="Bram, nachdenklich im Studio sitzend"
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
          <p>
            Wir alle wollen fit werden, doch manchmal stellt uns das Leben
            Hindernisse in den Weg und es ist schwer zu wissen, wo man
            anfangen soll. Keine Sorge, ich kümmere mich darum. Wir erstellen
            einen maßgeschneiderten Plan nur für dich, einschließlich eines
            Trainingsprogramms, Ernährungsberatung und Anpassungen im
            Lebensstil. Alles wird so gestaltet, dass es zu deiner individuellen
            Situation passt. Der Plan orientiert sich an deinem Kontext,
            daher auch der Name: Context Fit.
          </p>
          <p>
            <span className="font-semibold text-text">
              Context Fit: der richtige Ort für vielbeschäftigte Personen und
              Grappling-Athleten.
            </span>{" "}
            Als Schwarzgurt in BJJ und Luta Livre sowie begeisterter
            Kraftsportler liegt mir besonders am Herzen, anderen Grapplern zu
            helfen, ihre bestmögliche Grappling-Form zu erreichen.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
