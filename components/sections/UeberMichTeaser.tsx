import Image from "next/image";
import Link from "next/link";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";

export default function UeberMichTeaser() {
  return (
    <section className="py-16">
      <Container className="flex flex-col gap-6">
        <Reveal>
          <h2 className="text-2xl leading-tight">Über mich</h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl border border-border">
            <Image
              src="/images/smile_with_curl.jpeg"
              alt="Bram van Koppen lächelt in die Kamera"
              fill
              sizes="(max-width: 480px) 100vw, 480px"
              className="object-cover object-top"
            />
          </div>
        </Reveal>

        <Reveal delay={0.15} className="flex flex-col gap-3">
          <p className="text-base leading-relaxed text-text">
            Mein Name ist Bram van Koppen und Sport ist bereits seit meiner
            Jugend ein fester Bestandteil meines Lebens.
          </p>
          <p className="text-sm text-muted">
            Schwarzgurt BJJ &amp; Luta Livre · Dipl. Physiotherapeut (NL) ·
            Menno Henselmans Personal Trainer
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <Link
            href="/ueber-mich"
            className="flex h-[52px] w-full items-center justify-center rounded-full border border-border px-6 text-base font-medium text-text transition-transform active:scale-95"
          >
            Mehr über mich erfahren
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}
