"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";

gsap.registerPlugin(ScrollTrigger);

const AUTO_ADVANCE_MS = 4000;

interface TestimonialItem {
  name: string;
  role: string;
  quote: string;
}

const ITEM_KEYS = ["luca", "justin", "eryk"] as const;

// Bildpfade sind keine übersetzbaren Inhalte, daher hier per Key statt
// über die Nachrichtendateien verknüpft.
const AVATARS: Record<(typeof ITEM_KEYS)[number], string> = {
  luca: "/images/testi_luca.jpg",
  justin: "/images/testi_justin.png",
  eryk: "/images/testi_eryk.jpeg",
};

export default function Testimonials() {
  const t = useTranslations("Home.testimonials");
  const items: TestimonialItem[] = ITEM_KEYS.map((key) => ({
    name: t(`items.${key}.name`),
    role: t(`items.${key}.role`),
    quote: t(`items.${key}.quote`),
  }));

  const [index, setIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const reduceMotionRef = useRef(false);

  useGSAP(
    () => {
      reduceMotionRef.current = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      slideRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.set(el, { opacity: i === 0 ? 1 : 0, x: 0 });
      });

      const observer = new IntersectionObserver(
        ([entry]) => setIsVisible(entry.isIntersecting),
        { threshold: 0.4 },
      );
      if (sectionRef.current) observer.observe(sectionRef.current);
      return () => observer.disconnect();
    },
    { scope: sectionRef },
  );

  function goTo(nextIndex: number) {
    if (nextIndex === index) return;
    const current = slideRefs.current[index];
    const next = slideRefs.current[nextIndex];
    if (!current || !next) {
      setIndex(nextIndex);
      return;
    }

    // Kill any tween left over from an interrupted transition (e.g. rapid
    // dot clicks) so a dropped onComplete can never permanently block
    // further navigation.
    gsap.killTweensOf([current, next]);

    if (reduceMotionRef.current) {
      gsap.set(current, { opacity: 0 });
      gsap.set(next, { opacity: 1, x: 0 });
      setIndex(nextIndex);
      return;
    }

    gsap.to(current, {
      opacity: 0,
      x: -20,
      duration: 0.35,
      ease: "power2.in",
      onComplete: () => {
        setIndex(nextIndex);
        gsap.fromTo(
          next,
          { opacity: 0, x: 20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.35,
            ease: "power2.out",
          },
        );
      },
    });
  }

  useEffect(() => {
    if (!isVisible || reduceMotionRef.current || items.length <= 1) return;
    const id = setTimeout(() => {
      goTo((index + 1) % items.length);
    }, AUTO_ADVANCE_MS);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, isVisible]);

  return (
    <section ref={sectionRef} className="py-16 lg:py-28">
      <Container variant="narrow" className="flex flex-col items-center gap-10">
        <Reveal className="flex flex-col items-center gap-3 text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-accent">
            {t("eyebrow")}
          </p>
          <h2 className="text-2xl leading-tight lg:text-4xl">{t("title")}</h2>
        </Reveal>

        <Reveal delay={0.1} className="w-full">
          <div className="relative min-h-[420px] w-full lg:min-h-[360px]">
            {items.map((item, i) => {
              const src = AVATARS[ITEM_KEYS[i]];
              return (
                <div
                  key={ITEM_KEYS[i]}
                  ref={(el) => {
                    slideRefs.current[i] = el;
                  }}
                  aria-hidden={i !== index}
                  className={`absolute inset-0 flex flex-col items-center gap-4 ${
                    i === index ? "" : "pointer-events-none"
                  }`}
                >
                  <div className="relative h-16 w-16 shrink-0 rounded-full p-0.5 ring-2 ring-accent ring-offset-4 ring-offset-bg">
                    <Image
                      src={src}
                      alt={`${item.name}, ${item.role}`}
                      fill
                      sizes="64px"
                      className="rounded-full object-cover object-top"
                    />
                  </div>

                  <span
                    className="font-display text-4xl leading-none text-accent"
                    aria-hidden
                  >
                    &rdquo;
                  </span>

                  <p className="max-w-xl text-center text-[1.15rem] font-medium leading-[1.6] text-text lg:text-[1.25rem]">
                    {item.quote}
                  </p>

                  <div className="flex flex-col items-center gap-0.5">
                    <span className="font-semibold text-text">
                      {item.name}
                    </span>
                    <span className="text-sm text-muted">{item.role}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 flex items-center justify-center gap-2">
            {items.map((item, i) => (
              <button
                key={ITEM_KEYS[i]}
                type="button"
                onClick={() => goTo(i)}
                aria-label={t("aria.gotoSlide", { n: i + 1 })}
                aria-current={i === index}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === index ? "w-6 bg-accent" : "w-2 bg-border"
                }`}
              />
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
