import type { Metadata } from "next";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import PageHeader from "@/components/PageHeader";
import KontaktForm from "@/components/KontaktForm";

export const metadata: Metadata = {
  title: "Kontakt — Context Fit",
  description:
    "Vereinbare ein unverbindliches Erstgespräch mit Bram van Koppen, Personal Coach in Paderborn.",
};

export default function KontaktPage() {
  return (
    <>
      <PageHeader
        eyebrow="Kontakt"
        title="Lass uns starten."
        image="/images/bram_handsup.jpeg"
        alt="Bram, hoch konzentriert bei einer dynamischen Übung"
      />

      <section className="py-12 lg:py-24">
        <Container variant="narrow" className="flex flex-col gap-10 lg:gap-14">
          <Reveal className="flex flex-col gap-4 text-base leading-relaxed text-text lg:text-lg">
            <p>
              Vereinbare ein unverbindliches Erstgespräch und finde heraus,
              wie ein Plan aussieht, der zu deinem Kontext passt. Wähle
              einfach das Thema deiner Anfrage und schreib mir ein paar Zeilen dazu,
          den Rest besprechen wir persönlich.
            </p>
          </Reveal>

          <KontaktForm />
        </Container>
      </section>
    </>
  );
}
