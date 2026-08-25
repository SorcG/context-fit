"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "@/components/Reveal";

gsap.registerPlugin(ScrollTrigger);

export default function Zielgruppe() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        if (!imageRef.current) return;
        gsap.to(imageRef.current, {
          yPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      });
      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative flex h-[70dvh] min-h-[460px] w-full flex-col justify-end overflow-hidden lg:mx-auto lg:h-auto lg:min-h-0 lg:max-w-[1200px] lg:grid lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-10 lg:py-28"
    >
      <div className="group absolute inset-0 lg:relative lg:inset-auto lg:aspect-[4/5] lg:overflow-hidden lg:rounded-3xl lg:border lg:border-border">
        <Image
          ref={imageRef}
          src="/images/bram_kettlebell_closeup.jpeg"
          alt="Bram konzentriert mit Kettlebell"
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover object-top lg:scale-110"
        />
        <div className="pointer-events-none absolute inset-0 hidden opacity-0 transition-opacity duration-500 group-hover:opacity-100 lg:block [background:radial-gradient(circle_at_50%_50%,_var(--accent)_0%,_transparent_65%)] [background-size:150%_150%] [mix-blend-mode:overlay]" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/50 to-transparent lg:hidden" />
      <Reveal className="relative px-5 pb-14 lg:static lg:px-0 lg:pb-0">
        <p className="font-display text-2xl font-extrabold leading-[1.15] text-text lg:text-4xl">
          Grappler, vielbeschäftigte Väter und ganz normale Menschen.
        </p>
      </Reveal>
    </section>
  );
}
