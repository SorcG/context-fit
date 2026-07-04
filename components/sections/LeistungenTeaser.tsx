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
    <section className="py-16">
      <Container className="flex flex-col gap-6">
        <Reveal>
          <h2 className="text-2xl leading-tight">Leistungen</h2>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="text-base leading-relaxed text-text">
            Drei Wege, dein Ziel zu erreichen – online, vor Ort oder auf der
            Matte.
          </p>
        </Reveal>

        <div className="flex flex-col gap-4">
          {services.map((s, i) => (
            <Reveal key={s.anchor} delay={0.1 + i * 0.05}>
              <Link
                href={`/leistungen#${s.anchor}`}
                className="flex items-center gap-4 rounded-2xl border border-border bg-surface p-3 transition-transform active:scale-95"
              >
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-border">
                  <Image
                    src={s.image}
                    alt={s.alt}
                    fill
                    sizes="80px"
                    className={`object-cover ${s.imagePosition} ${
                      s.grayscale ? "grayscale" : ""
                    }`}
                  />
                </div>
                <div className="flex flex-col gap-0.5">
                  <h3 className="text-base font-semibold text-text">
                    {s.title}
                  </h3>
                  <p className="text-sm text-accent">{s.tagline}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3}>
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
