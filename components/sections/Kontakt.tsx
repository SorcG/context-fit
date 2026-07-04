import Link from "next/link";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";

export default function Kontakt() {
  return (
    <section id="kontakt" className="py-20">
      <Container className="flex flex-col items-start gap-5">
        <Reveal>
          <h2 className="text-2xl leading-tight">
            Bereit für den nächsten Schritt?
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-base leading-relaxed text-text">
            Vereinbare ein unverbindliches Erstgespräch und finde heraus, wie
            ein Plan aussieht, der zu deinem Kontext passt.
          </p>
        </Reveal>
        <Reveal delay={0.15} className="w-full">
          <Link
            href="/kontakt"
            className="flex h-[56px] w-full items-center justify-center rounded-full bg-accent px-6 text-base font-semibold text-text transition-transform active:scale-95"
          >
            Jetzt Erstgespräch sichern
          </Link>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="text-sm text-muted">Standort: Paderborn</p>
        </Reveal>
      </Container>
    </section>
  );
}
