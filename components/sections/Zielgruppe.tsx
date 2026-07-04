import Image from "next/image";
import Reveal from "@/components/Reveal";

export default function Zielgruppe() {
  return (
    <section className="relative flex h-[70dvh] min-h-[460px] w-full flex-col justify-end overflow-hidden">
      <Image
        src="/images/bram_kettlebell_closeup.jpeg"
        alt="Bram konzentriert mit Kettlebell"
        fill
        sizes="100vw"
        className="object-cover object-top"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/50 to-transparent" />
      <Reveal className="relative px-5 pb-14">
        <p className="font-display text-2xl font-extrabold leading-[1.15] text-text">
          Grappler, vielbeschäftigte Väter und ganz normale Menschen.
        </p>
      </Reveal>
    </section>
  );
}
