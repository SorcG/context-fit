import Hero from "@/components/sections/Hero";
import WarumContextFit from "@/components/sections/WarumContextFit";
import LeistungenTeaser from "@/components/sections/LeistungenTeaser";
import UeberMichTeaser from "@/components/sections/UeberMichTeaser";
import Zielgruppe from "@/components/sections/Zielgruppe";
import Kontakt from "@/components/sections/Kontakt";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <WarumContextFit />
      <LeistungenTeaser />
      <UeberMichTeaser />
      <Zielgruppe />
      <Kontakt />
      <Footer />
    </>
  );
}
