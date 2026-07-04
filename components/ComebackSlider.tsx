"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const slides = [
  {
    src: "/images/vorher1.jpeg",
    alt: "Bram vor der Transformation, Ansicht 1",
    label: "Vorher",
    position: "object-[center_49%]",
  },
  {
    src: "/images/vorher2.jpeg",
    alt: "Bram vor der Transformation, Ansicht 2",
    label: "Vorher",
    position: "object-[center_92%]",
  },
  {
    src: "/images/nachher1.jpeg",
    alt: "Bram nach der Transformation, Ansicht 1",
    label: "Nachher",
    position: "object-top",
  },
  {
    src: "/images/nachher2.jpeg",
    alt: "Bram nach der Transformation, Ansicht 2",
    label: "Nachher",
    position: "object-[center_53%]",
  },
];

export default function ComebackSlider() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const onScroll = () => {
      const slideEl = track.children[0] as HTMLElement | undefined;
      const step = slideEl ? slideEl.offsetWidth + 12 : track.clientWidth;
      const idx = Math.round(track.scrollLeft / step);
      setActive(Math.max(0, Math.min(slides.length - 1, idx)));
    };

    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToIndex = (index: number) => {
    const track = trackRef.current;
    const slideEl = track?.children[index] as HTMLElement | undefined;
    slideEl?.scrollIntoView({
      behavior: "smooth",
      inline: "start",
      block: "nearest",
    });
  };

  return (
    <div className="flex flex-col gap-3">
      <div
        ref={trackRef}
        data-lenis-prevent
        className="flex w-full snap-x snap-mandatory gap-3 overflow-x-auto rounded-2xl [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {slides.map((slide) => (
          <div
            key={slide.src}
            className="relative aspect-square w-full shrink-0 snap-start overflow-hidden rounded-2xl border border-border shadow-lg shadow-black/30"
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              sizes="(max-width: 480px) 100vw, 480px"
              className={`object-cover ${slide.position} [filter:grayscale(20%)_contrast(1.1)_brightness(0.95)]`}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/50 via-transparent to-bg/10" />
            <span
              className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
                slide.label === "Nachher"
                  ? "bg-accent text-text"
                  : "bg-bg/70 text-muted backdrop-blur"
              }`}
            >
              {slide.label}
            </span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-2">
        {slides.map((slide, i) => (
          <button
            key={slide.src}
            type="button"
            aria-label={`${slide.label}-Bild ${(i % 2) + 1} anzeigen`}
            onClick={() => scrollToIndex(i)}
            className={`h-2 rounded-full transition-all ${
              i === active ? "w-6 bg-accent" : "w-2 bg-border"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
