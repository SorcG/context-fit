"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { lenisInstance } from "@/lib/lenis-instance";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: false,
    });
    lenisRef.current = lenis;
    lenisInstance.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const update = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
      lenisRef.current = null;
      lenisInstance.current = null;
    };
  }, []);

  useEffect(() => {
    // Lenis (and ScrollTrigger) measure document height once and don't
    // reliably auto-detect it changing on Next.js client-side navigation
    // (document.documentElement's own box stays viewport-sized regardless
    // of content, so the ResizeObserver Lenis relies on never fires here).
    // Without this, the scroll limit stays stuck at whatever the
    // previous, often shorter, page measured — recalculate it explicitly
    // once the new page has painted.
    const timeout = setTimeout(() => {
      lenisRef.current?.resize();
      ScrollTrigger.refresh();
    }, 0);
    return () => clearTimeout(timeout);
  }, [pathname]);

  useEffect(() => {
    // Covers in-page height changes that aren't route changes (e.g. an
    // accordion expanding) — document.body's box tracks real content height,
    // unlike document.documentElement which stays pinned to the viewport.
    const observer = new ResizeObserver(() => {
      lenisRef.current?.resize();
      ScrollTrigger.refresh();
    });
    observer.observe(document.body);
    return () => observer.disconnect();
  }, []);

  return <>{children}</>;
}
