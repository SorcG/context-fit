"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function PageHeader({
  eyebrow,
  title,
  image,
  alt,
  imagePosition = "object-top",
}: {
  eyebrow: string;
  title: string;
  image: string;
  alt: string;
  imagePosition?: string;
}) {
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
      className="relative flex h-[46dvh] min-h-[360px] w-full flex-col justify-end overflow-hidden lg:mx-auto lg:h-auto lg:min-h-0 lg:max-w-[1200px] lg:grid lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-10 lg:py-28"
    >
      <div className="group absolute inset-0 lg:relative lg:inset-auto lg:order-2 lg:aspect-[4/5] lg:overflow-hidden lg:rounded-3xl lg:border lg:border-border">
        <Image
          ref={imageRef}
          src={image}
          alt={alt}
          fill
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          className={`object-cover ${imagePosition} lg:scale-110`}
        />
        <div className="pointer-events-none absolute inset-0 hidden opacity-0 transition-opacity duration-500 group-hover:opacity-100 lg:block [background:radial-gradient(circle_at_50%_50%,_var(--accent)_0%,_transparent_65%)] [background-size:150%_150%] [mix-blend-mode:overlay]" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/50 to-transparent lg:hidden" />
      <div className="relative flex flex-col gap-2 px-5 pb-8 lg:static lg:order-1 lg:gap-3 lg:px-0 lg:pb-0">
        <p className="text-sm font-semibold tracking-wide text-accent lg:text-base">
          {eyebrow}
        </p>
        <h1 className="text-3xl leading-[1.1] text-text lg:text-5xl">
          {title}
        </h1>
      </div>
    </section>
  );
}
