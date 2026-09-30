"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { DE, GB, NL } from "country-flag-icons/react/3x2";
import { useRouter } from "next/navigation";
import { getPathname, usePathname } from "@/i18n/navigation";
import { LOCALE_COOKIE_MAX_AGE, routing, type Locale } from "@/i18n/routing";

// Sprachnamen immer in der jeweils eigenen Sprache.
const languages: Record<
  string,
  { name: string; Flag: typeof DE }
> = {
  de: { name: "Deutsch", Flag: DE },
  en: { name: "English", Flag: GB },
  nl: { name: "Nederlands", Flag: NL },
};

function Flag({ locale, className }: { locale: string; className?: string }) {
  const { Flag: Icon } = languages[locale];
  return (
    <Icon
      aria-hidden
      className={`shrink-0 rounded-[2px] ring-1 ring-white/15 ${className ?? ""}`}
    />
  );
}

function useSwitchLocale() {
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const switchTo = (next: Locale) => {
    // Prävention gibt es nur auf Deutsch — von dort geht es auf die Startseite.
    const target = pathname === "/praevention" && next !== "de" ? "/" : pathname;
    // Anker (z. B. #grappling-training) beim Wechsel mitnehmen.
    const hash = target === pathname ? window.location.hash : "";
    // Wahl merken, damit "/" beim nächsten Besuch direkt in dieser Sprache
    // landet (next-intl setzt das Cookie nur über seinen eigenen Router).
    document.cookie = `NEXT_LOCALE=${next}; path=/; max-age=${LOCALE_COOKIE_MAX_AGE}; samesite=lax`;
    startTransition(() => {
      router.replace(getPathname({ href: target, locale: next }) + hash, {
        scroll: target !== pathname,
      });
    });
  };

  return { switchTo, isPending };
}

/**
 * Kompaktes Dropdown für DesktopNav und Footer: zeigt nur die aktuelle
 * Flagge, die übrigen Sprachen fahren beim Hovern (bzw. Klick/Tab) heraus.
 * placement "down" = nach unten (Navigation), "up" = nach oben (Footer).
 * overlay = Variante über Fotos (mobil oben rechts): Pill-Hintergrund,
 * Menü rechtsbündig.
 */
export function LanguageMenu({
  placement = "down",
  openOnHover = true,
  overlay = false,
}: {
  placement?: "down" | "up";
  openOnHover?: boolean;
  overlay?: boolean;
}) {
  const locale = useLocale();
  const t = useTranslations("Language");
  const { switchTo } = useSwitchLocale();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (routing.locales.length < 2) return null;

  const others = routing.locales.filter((l) => l !== locale);
  const down = placement === "down";

  return (
    <div
      ref={rootRef}
      className="relative"
      onMouseEnter={openOnHover ? () => setOpen(true) : undefined}
      onMouseLeave={openOnHover ? () => setOpen(false) : undefined}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label={t("label")}
        className={`flex items-center gap-1.5 rounded-full text-xs font-semibold uppercase transition-colors ${
          overlay
            ? "min-h-[40px] bg-bg/70 px-3 text-text backdrop-blur"
            : "min-h-[32px] px-2 text-muted hover:text-text"
        }`}
      >
        <Flag locale={locale} className="h-3 w-[18px]" />
        {locale}
        <svg
          viewBox="0 0 10 10"
          className={`h-2 w-2 transition-transform duration-200 ${
            open === down ? "rotate-180" : ""
          }`}
          aria-hidden
        >
          <path
            d="M2 3.5L5 6.5l3-3"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* pt/pb statt Abstand, damit die Maus beim Herunterfahren nicht ins Leere gerät */}
      <div
        role="menu"
        className={`absolute z-50 ${
          overlay ? "right-0" : "left-1/2 -translate-x-1/2"
        } ${
          down ? "top-full pt-1" : "bottom-full pb-1"
        } ${open ? "" : "pointer-events-none"}`}
      >
        <div className="flex flex-col items-stretch gap-1">
          {others.map((l, i) => (
            <button
              key={l}
              type="button"
              role="menuitem"
              lang={l}
              aria-label={languages[l].name}
              tabIndex={open ? 0 : -1}
              onClick={() => {
                setOpen(false);
                switchTo(l);
              }}
              style={{ transitionDelay: open ? `${i * 60}ms` : "0ms" }}
              className={`flex min-h-[32px] items-center gap-1.5 rounded-full border border-border bg-surface px-2.5 text-xs font-semibold uppercase text-text shadow-lg shadow-black/40 transition-[opacity,transform,color] duration-200 hover:text-accent ${
                open
                  ? "translate-y-0 opacity-100"
                  : down
                    ? "-translate-y-3 opacity-0"
                    : "translate-y-3 opacity-0"
              }`}
            >
              <Flag locale={l} className="h-3 w-[18px]" />
              {l}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
