import Image from "next/image";
import Link from "next/link";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";

const services = [
  {
    anchor: "online-coaching",
    title: "Online Coaching",
    tagline: "Jederzeit. Überall. Ohne Grenzen.",
    image: "/images/sideshot_2.jpeg",
    alt: "Bram im Profil, stehend im Fitnessstudio",
    imagePosition: "object-top",
    grayscale: false,
  },
  {
    anchor: "personal-training",
    title: "Personal Training vor Ort",
    tagline: "Kraft mit Ziel.",
    image: "/images/bram_explain_fitness.png",
    alt: "Bram im Coaching-Gespräch mit einem Klienten im Fitnessstudio",
    imagePosition: "object-[center_20%]",
    grayscale: true,
  },
  {
    anchor: "grappling-training",
    title: "Grappling Training",
    tagline: "Entfalte dein volles Potenzial auf der Matte",
    image: "/images/bram_explain_jj.png",
    alt: "Bram erklärt eine Grappling-Technik auf der Matte",
    imagePosition: "object-[center_22%]",
    grayscale: true,
  },
] as const;

export default function LeistungenTeaser() {
  return (
    <section className="py-16 lg:py-28">
      <Container variant="wide" className="flex flex-col gap-6 lg:gap-10">
        <div className="lg:flex lg:items-end lg:justify-between lg:gap-8">
          <div className="flex flex-col gap-3 lg:gap-4">
            <Reveal>
              <h2 className="text-2xl leading-tight lg:text-4xl">
                Leistungen
              </h2>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="text-base leading-relaxed text-text lg:max-w-md lg:text-lg">
                Drei Wege, dein Ziel zu erreichen. Entweder online, vor Ort
                oder auf der Matte.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="hidden lg:block">
            <Link
              href="/leistungen"
              className="flex h-[52px] w-fit items-center justify-center rounded-full border border-border px-8 text-base font-medium text-text transition-transform hover:scale-105 hover:border-accent hover:text-accent active:scale-95"
            >
              Alle Leistungen ansehen
            </Link>
          </Reveal>
        </div>

        <div className="flex flex-col gap-4 lg:grid lg:grid-cols-3 lg:gap-6">
          {services.map((s, i) => (
            <Reveal key={s.anchor} delay={0.1 + i * 0.05}>
              <Link
                href={`/leistungen#${s.anchor}`}
                className="flex items-center gap-4 rounded-2xl border border-border bg-surface p-3 transition-transform active:scale-95 lg:flex-col lg:items-stretch lg:gap-0 lg:overflow-hidden lg:p-0 lg:transition-[transform,border-color] lg:hover:scale-[1.02] lg:hover:border-accent"
              >
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-border lg:h-auto lg:w-full lg:aspect-[4/5] lg:shrink lg:rounded-none lg:border-0 lg:border-b">
                  <Image
                    src={s.image}
                    alt={s.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, 80px"
                    className={`object-cover ${s.imagePosition} ${
                      s.grayscale ? "grayscale" : ""
                    }`}
                  />
                </div>
                <div className="flex flex-col gap-0.5 lg:gap-1.5 lg:p-5">
                  <h3 className="text-base font-semibold text-text lg:text-lg">
                    {s.title}
                  </h3>
                  <p className="text-sm text-accent lg:text-base">
                    {s.tagline}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3} className="lg:hidden">
          <Link
            href="/leistungen"
            className="flex h-[52px] w-full items-center justify-center rounded-full border border-border px-6 text-base font-medium text-text transition-transform active:scale-95"
          >
            Alle Leistungen ansehen
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}
