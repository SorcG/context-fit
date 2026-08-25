"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function MagneticButton({
  children,
  strength = 0.3,
}: {
  children: React.ReactNode;
  strength?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const mq = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (min-width: 1024px)",
    );

    const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      xTo((e.clientX - rect.left - rect.width / 2) * strength);
      yTo((e.clientY - rect.top - rect.height / 2) * strength);
    };
    const onLeave = () => {
      xTo(0);
      yTo(0);
    };

    const enable = () => {
      el.addEventListener("mousemove", onMove);
      el.addEventListener("mouseleave", onLeave);
    };
    const disable = () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      gsap.set(el, { x: 0, y: 0 });
    };
    const onMqChange = () => (mq.matches ? enable() : disable());

    if (mq.matches) enable();
    mq.addEventListener("change", onMqChange);

    return () => {
      disable();
      mq.removeEventListener("change", onMqChange);
    };
  }, [strength]);

  return (
    <span ref={ref} className="block w-full lg:w-fit">
      {children}
    </span>
  );
}
