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
  mobileHeight = "h-[46dvh] min-h-[360px]",
}: {
  eyebrow: string;
  title: string;
  image: string;
  alt: string;
  imagePosition?: string;
  mobileHeight?: string;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const glowPos = useRef({ x: 50, y: 50 });

  function setGlow(x: number, y: number) {
    if (glowRef.current) {
      glowRef.current.style.backgroundImage = `radial-gradient(circle at ${x}% ${y}%, var(--accent) 0%, transparent 40%)`;
    }
  }

  function handleGlowMove(e: React.MouseEvent<HTMLDivElement>) {
    if (window.innerWidth < 1024) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    gsap.to(glowPos.current, {
      x,
      y,
      duration: 0.4,
      ease: "power2.out",
      overwrite: true,
      onUpdate: () => setGlow(glowPos.current.x, glowPos.current.y),
    });
  }

  function handleGlowEnter(e: React.MouseEvent<HTMLDivElement>) {
    if (window.innerWidth < 1024) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    gsap.set(glowPos.current, { x, y });
    setGlow(x, y);
  }

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (textRef.current) {
        if (reduceMotion) {
          gsap.set(textRef.current, { opacity: 1, y: 0 });
        } else {
          gsap.fromTo(
            textRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.8, delay: 0.1, ease: "power3.out" },
          );
        }
      }

      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        if (!imageRef.current || reduceMotion) return;
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
      className={`relative flex ${mobileHeight} w-full flex-col justify-end overflow-hidden lg:mx-auto lg:h-auto lg:min-h-0 lg:max-w-[1200px] lg:grid lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-10 lg:py-28`}
    >
      <div
        className="group absolute inset-0 lg:relative lg:inset-auto lg:order-2 lg:aspect-[4/5] lg:overflow-hidden lg:rounded-3xl lg:border lg:border-border"
        onMouseEnter={handleGlowEnter}
        onMouseMove={handleGlowMove}
      >
        <Image
          ref={imageRef}
          src={image}
          alt={alt}
          fill
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          className={`object-cover ${imagePosition} lg:scale-110`}
        />
        <div
          ref={glowRef}
          style={{
            backgroundImage:
              "radial-gradient(circle at 50% 50%, var(--accent) 0%, transparent 40%)",
          }}
          className="pointer-events-none absolute inset-0 hidden opacity-0 transition-opacity duration-500 group-hover:opacity-30 lg:block [background-size:100%_100%] [mix-blend-mode:overlay]"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/50 to-transparent lg:hidden" />
      <div
        ref={textRef}
        className="relative flex flex-col gap-2 px-5 pb-8 lg:static lg:order-1 lg:gap-3 lg:px-0 lg:pb-0"
      >
        <p className="text-sm font-semibold tracking-wide text-accent lg:text-base">
          {eyebrow}
        </p>
        <h1 className="whitespace-pre-line text-3xl leading-[1.1] text-text lg:text-5xl">
          {title}
        </h1>
      </div>
    </section>
  );
}
