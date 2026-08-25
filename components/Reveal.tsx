"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
  scrub = false,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  scrub?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      gsap.fromTo(
        ref.current,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          delay,
          ease: "power3.out",
          scrollTrigger: scrub
            ? {
                trigger: ref.current,
                start: "top 95%",
                end: "top 55%",
                scrub: true,
              }
            : {
                trigger: ref.current,
                start: "top 88%",
                once: true,
              },
        },
      );
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
