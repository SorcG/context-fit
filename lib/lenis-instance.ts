import type Lenis from "lenis";

/** Set by SmoothScroll on mount so other components (e.g. nav links) can trigger scrolls. */
export const lenisInstance: { current: Lenis | null } = { current: null };

export function scrollToTop() {
  if (lenisInstance.current) {
    lenisInstance.current.scrollTo(0);
  } else {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}
