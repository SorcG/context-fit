"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ delay: 0.2 });
      tl.from("[data-hero-eyebrow]", {
        opacity: 0,
        y: 16,
        duration: 0.7,
        ease: "power3.out",
      })
        .from(
          "[data-hero-headline]",
          { opacity: 0, y: 24, duration: 0.8, ease: "power3.out" },
          "-=0.45",
        )
        .from(
          "[data-hero-sub]",
          { opacity: 0, y: 16, duration: 0.7, ease: "power3.out" },
          "-=0.5",
        )
        .from(
          "[data-hero-cta]",
          { opacity: 0, y: 16, duration: 0.6, ease: "power3.out" },
          "-=0.45",
        );
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="relative flex h-[86dvh] min-h-[560px] w-full flex-col justify-end overflow-hidden"
    >
      <Image
        src="/images/bram_smile.jpeg"
        alt="Bram van Koppen, Personal Coach in Paderborn"
        fill
        priority
        sizes="100vw"
        className="object-cover object-top"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-transparent" />

      <div className="relative flex flex-col gap-4 px-5 pb-10">
        <p
          data-hero-eyebrow
          className="text-sm font-semibold tracking-wide text-accent"
        >
          Personal Coach · Paderborn
        </p>
        <h1
          data-hero-headline
          className="text-[2.1rem] leading-[1.08] text-text"
        >
          Dein Partner auf dem Weg zu einem gesünderen, fitteren Leben.
        </h1>
        <p data-hero-sub className="text-base leading-relaxed text-muted">
          Ich begleite dich auf dem Weg zu einem gesünderen Lebensstil.
        </p>
        <Link
          data-hero-cta
          href="/kontakt"
          className="mt-2 flex h-[52px] w-full items-center justify-center rounded-full bg-accent px-6 text-base font-semibold text-text transition-transform active:scale-95"
        >
          Jetzt Erstgespräch sichern
        </Link>
      </div>
    </section>
  );
}
