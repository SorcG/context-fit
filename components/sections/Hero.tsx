"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import MagneticButton from "@/components/MagneticButton";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        { isDesktop: "(min-width: 1024px)" },
        (context) => {
          const { isDesktop } = context.conditions as { isDesktop: boolean };
          const tl = gsap.timeline({ delay: 0.2 });
          let split: SplitText | undefined;

          tl.from("[data-hero-eyebrow]", {
            opacity: 0,
            y: 16,
            duration: 0.7,
            ease: "power3.out",
          });

          if (isDesktop) {
            split = new SplitText("[data-hero-headline]", { type: "words" });
            tl.from(
              split.words,
              {
                opacity: 0,
                y: 30,
                duration: 0.7,
                stagger: 0.06,
                ease: "power3.out",
              },
              "-=0.45",
            );
          } else {
            tl.from(
              "[data-hero-headline]",
              { opacity: 0, y: 24, duration: 0.8, ease: "power3.out" },
              "-=0.45",
            );
          }

          tl.from(
            "[data-hero-sub]",
            { opacity: 0, y: 16, duration: 0.7, ease: "power3.out" },
            "-=0.5",
          ).from(
            "[data-hero-cta]",
            { opacity: 0, y: 16, duration: 0.6, ease: "power3.out" },
            "-=0.45",
          );

          if (isDesktop && imageRef.current) {
            gsap.to(imageRef.current, {
              yPercent: 8,
              ease: "none",
              scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "bottom top",
                scrub: true,
              },
            });
          }

          return () => split?.revert();
        },
      );

      return () => mm.revert();
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="relative flex h-[86dvh] min-h-[560px] w-full flex-col justify-end overflow-hidden lg:mx-auto lg:h-auto lg:min-h-0 lg:max-w-[1200px] lg:grid lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-10 lg:py-32"
    >
      <div className="group absolute inset-0 lg:relative lg:inset-auto lg:order-2 lg:aspect-[4/5] lg:overflow-hidden lg:rounded-3xl lg:border lg:border-border">
        <Image
          ref={imageRef}
          src="/images/bram_smile.jpeg"
          alt="Bram van Koppen, Personal Coach in Paderborn"
          fill
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover object-top lg:scale-110"
        />
        <div className="pointer-events-none absolute inset-0 hidden opacity-0 transition-opacity duration-500 group-hover:opacity-100 lg:block [background:radial-gradient(circle_at_50%_50%,_var(--accent)_0%,_transparent_65%)] [background-size:150%_150%] [mix-blend-mode:overlay]" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-transparent lg:hidden" />

      <div className="relative flex flex-col gap-4 px-5 pb-10 lg:static lg:order-1 lg:gap-6 lg:px-0 lg:pb-0">
        <p
          data-hero-eyebrow
          className="text-sm font-semibold tracking-wide text-accent lg:text-base"
        >
          Personal Coach · Paderborn
        </p>
        <h1
          data-hero-headline
          className="text-[2.1rem] leading-[1.08] text-text lg:text-6xl lg:leading-[1.05]"
        >
          Dein Partner auf dem Weg zu einem gesünderen, fitteren Leben.
        </h1>
        <p
          data-hero-sub
          className="text-base leading-relaxed text-muted lg:max-w-md lg:text-lg"
        >
          Ich begleite dich auf dem Weg zu einem gesünderen Lebensstil.
        </p>
        <div data-hero-cta className="mt-2 lg:mt-4">
          <MagneticButton>
            <Link
              href="/kontakt"
              className="flex h-[52px] w-full items-center justify-center rounded-full bg-accent px-6 text-base font-semibold text-text transition-transform active:scale-95 lg:w-fit lg:px-10 lg:transition-[transform,box-shadow] lg:hover:shadow-[0_0_32px_-4px_var(--accent)]"
            >
              Jetzt Erstgespräch sichern
            </Link>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
