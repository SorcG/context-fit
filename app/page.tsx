import Hero from "@/components/sections/Hero";
import WarumContextFit from "@/components/sections/WarumContextFit";
import LeistungenTeaser from "@/components/sections/LeistungenTeaser";
import UeberMichTeaser from "@/components/sections/UeberMichTeaser";
import Zielgruppe from "@/components/sections/Zielgruppe";
import Kontakt from "@/components/sections/Kontakt";
import Footer from "@/components/Footer";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import RechnerCTA from "@/components/RechnerCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <WarumContextFit />
      <section className="py-8 lg:py-12">
        <Container>
          <Reveal>
            <RechnerCTA />
          </Reveal>
        </Container>
      </section>
      <LeistungenTeaser />
      <UeberMichTeaser />
      <Zielgruppe />
      <Kontakt />
      <Footer />
    </>
  );
}
