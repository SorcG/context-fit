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

      <section className="py-12">
        <Container className="flex flex-col gap-10">
          <Reveal className="flex flex-col gap-4 text-base leading-relaxed text-text">
            <p>
              Vereinbare ein unverbindliches Erstgespräch und finde heraus,
              wie ein Plan aussieht, der zu deinem Kontext passt. Wähle
              einfach das Thema deiner Anfrage und schreib mir ein paar Zeilen
              – den Rest besprechen wir persönlich.
            </p>
          </Reveal>

          <KontaktForm />
        </Container>
      </section>
    </>
  );
}
