"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";

interface ComparePhoto {
  src: string;
  alt: string;
  position: string;
}

interface ComparePair {
  pose: string;
  before: ComparePhoto;
  after: ComparePhoto;
  statBefore: string;
  statAfter: string;
}

const pairs: ComparePair[] = [
  {
    pose: "Ansicht 1",
    before: {
      src: "/images/vorher1.jpeg",
      alt: "Bram vor der Transformation, Ansicht 1",
      position: "object-[center_49%]",
    },
    after: {
      src: "/images/nachher1.jpeg",
      alt: "Bram nach der Transformation, Ansicht 1",
      position: "object-top",
    },
    statBefore: "104 kg",
    statAfter: "88 kg",
  },
  {
    pose: "Ansicht 2",
    before: {
      src: "/images/vorher2.jpeg",
      alt: "Bram vor der Transformation, Ansicht 2",
      position: "object-[center_92%]",
    },
    after: {
      src: "/images/nachher2.jpeg",
      alt: "Bram nach der Transformation, Ansicht 2",
      position: "object-[center_53%]",
    },
    statBefore: "104 kg",
    statAfter: "88 kg",
  },
];

const FILTER = "[filter:grayscale(20%)_contrast(1.1)_brightness(0.95)]";

function CompareCard({ pair }: { pair: ComparePair }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const beforeImgRef = useRef<HTMLImageElement>(null);
  const afterImgRef = useRef<HTMLImageElement>(null);
  const pillAfterRef = useRef<HTMLSpanElement>(null);
  const statAfterRef = useRef<HTMLSpanElement>(null);
  const pinnedRef = useRef(false);
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    const beforeImg = beforeImgRef.current;
    const afterImg = afterImgRef.current;
    if (!card || !beforeImg || !afterImg) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    gsap.set(afterImg, { scale: reduceMotion ? 1 : 1.06 });

    const fadeTargets = [pillAfterRef.current, statAfterRef.current].filter(
      (el): el is HTMLElement => el !== null,
    );

    const tl = gsap.timeline({
      paused: true,
      defaults: {
        duration: reduceMotion ? 0.15 : 0.6,
        ease: "power2.out",
      },
    });
    tl.to(afterImg, { opacity: 1, scale: 1 }, 0)
      .to(beforeImg, { opacity: 0 }, 0)
      .to(fadeTargets, { opacity: 1 }, 0);

    const enter = () => tl.play();
    const leave = () => {
      if (!pinnedRef.current) tl.reverse();
    };
    const toggle = () => {
      const next = !pinnedRef.current;
      pinnedRef.current = next;
      setPinned(next);
      if (next) {
        tl.play();
      } else if (!card.matches(":hover")) {
        tl.reverse();
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggle();
      }
    };

    card.addEventListener("mouseenter", enter);
    card.addEventListener("mouseleave", leave);
    card.addEventListener("click", toggle);
    card.addEventListener("keydown", onKeyDown);

    return () => {
      card.removeEventListener("mouseenter", enter);
      card.removeEventListener("mouseleave", leave);
      card.removeEventListener("click", toggle);
      card.removeEventListener("keydown", onKeyDown);
      tl.kill();
    };
  }, []);

  return (
    <div
      ref={cardRef}
      role="button"
      tabIndex={0}
      aria-pressed={pinned}
      aria-label={`Vorher/Nachher-Vergleich, ${pair.pose}: aktuell ${
        pinned ? "Nachher" : "Vorher"
      } zu sehen. Klicken zum Umschalten.`}
      className="group relative aspect-[4/5] w-full cursor-pointer overflow-hidden rounded-3xl border border-border shadow-lg shadow-black/30 outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      <Image
        ref={beforeImgRef}
        src={pair.before.src}
        alt={pair.before.alt}
        fill
        sizes="(min-width: 1024px) 320px, 100vw"
        className={`z-10 object-cover ${pair.before.position} ${FILTER}`}
      />
      <Image
        ref={afterImgRef}
        src={pair.after.src}
        alt={pair.after.alt}
        fill
        sizes="(min-width: 1024px) 320px, 100vw"
        className={`pointer-events-none z-0 object-cover opacity-0 ${pair.after.position} ${FILTER}`}
      />

      <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-t from-bg/50 via-transparent to-bg/10" />
      <div className="pointer-events-none absolute inset-0 z-20 opacity-0 transition-opacity duration-500 group-hover:opacity-100 [background:radial-gradient(circle_at_50%_50%,_var(--accent)_0%,_transparent_65%)] [background-size:150%_150%] [mix-blend-mode:overlay]" />

      <div className="absolute left-4 top-4 z-30">
        <span className="block rounded-full bg-bg/70 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-muted backdrop-blur">
          Vorher
        </span>
        <span
          ref={pillAfterRef}
          className="absolute inset-0 block rounded-full bg-accent px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-text opacity-0"
        >
          Nachher
        </span>
      </div>

      <div className="absolute bottom-4 left-4 z-30">
        <span className="block rounded-full bg-bg/70 px-3 py-1.5 text-sm font-bold text-text backdrop-blur">
          {pair.statBefore}
        </span>
        <span
          ref={statAfterRef}
          className="absolute inset-0 flex items-center justify-center rounded-full bg-accent px-3 py-1.5 text-sm font-bold text-text opacity-0"
        >
          {pair.statAfter}
        </span>
      </div>

      <span className="pointer-events-none absolute bottom-4 right-4 z-30 flex h-8 w-8 items-center justify-center rounded-full bg-bg/70 text-sm text-muted opacity-100 backdrop-blur transition-opacity duration-300 group-hover:opacity-0">
        ⇄
      </span>
    </div>
  );
}

export default function ComebackCompare() {
  return (
    <div className="hidden lg:grid lg:grid-cols-2 lg:gap-6">
      {pairs.map((pair) => (
        <div key={pair.pose} className="flex flex-col gap-2">
          <CompareCard pair={pair} />
          <p className="text-center text-sm text-muted">{pair.pose}</p>
        </div>
      ))}
    </div>
  );
}
