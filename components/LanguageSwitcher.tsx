"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { DE, GB, NL } from "country-flag-icons/react/3x2";
import { useRouter } from "next/navigation";
import { getPathname, usePathname } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";

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
    startTransition(() => {
      router.replace(getPathname({ href: target, locale: next }) + hash, {
        scroll: false,
      });
    });
  };

  return { switchTo, isPending };
}

/**
 * Kleine Lasche auf der Oberkante der mobilen Tab-Bar, öffnet ein
 * Popover nach oben.
 */
export function LanguageTab() {
  const locale = useLocale();
  const t = useTranslations("Language");
  const { switchTo, isPending } = useSwitchLocale();
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

  return (
    <div ref={rootRef} className="absolute -top-[26px] right-3">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label={t("label")}
        className={`relative flex h-[26px] items-center gap-1.5 rounded-t-lg border border-b-0 border-border bg-surface px-2.5 text-[11px] font-semibold uppercase text-muted transition-opacity after:absolute after:-inset-x-1 after:-inset-y-2 after:content-[''] ${
          isPending ? "opacity-60" : ""
        }`}
      >
        <Flag locale={locale} className="h-2.5 w-[15px]" />
        {locale}
        <svg
          viewBox="0 0 10 10"
          className={`h-2 w-2 transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden
        >
          <path
            d="M2 6.5L5 3.5l3 3"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open && (
        <div
          role="menu"
          className="absolute bottom-[calc(100%+8px)] right-0 flex min-w-[168px] flex-col overflow-hidden rounded-xl border border-border bg-surface py-1 shadow-lg shadow-black/40"
        >
          {routing.locales.map((l) => {
            const active = l === locale;
            return (
              <button
                key={l}
                type="button"
                role="menuitemradio"
                aria-checked={active}
                onClick={() => {
                  setOpen(false);
                  if (!active) switchTo(l);
                }}
                className={`flex min-h-[44px] items-center gap-3 px-4 text-left text-sm transition-colors active:bg-border/60 ${
                  active ? "text-accent" : "text-text"
                }`}
              >
                <Flag locale={l} className="h-3 w-[18px]" />
                <span className="w-6 text-xs font-semibold uppercase text-muted">
                  {l}
                </span>
                <span className="flex-1">{languages[l].name}</span>
                {active && (
                  <span
                    className="h-1.5 w-1.5 rounded-full bg-accent"
                    aria-hidden
                  />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

/**
 * Inline-Variante für DesktopNav und Footer: Flagge + Kürzel nebeneinander.
 */
export function LanguageInline({ className = "" }: { className?: string }) {
  const locale = useLocale();
  const t = useTranslations("Language");
  const { switchTo } = useSwitchLocale();

  if (routing.locales.length < 2) return null;

  return (
    <div
      role="group"
      aria-label={t("label")}
      className={`flex items-center gap-1 ${className}`}
    >
      {routing.locales.map((l) => {
        const active = l === locale;
        return (
          <button
            key={l}
            type="button"
            lang={l}
            aria-pressed={active}
            aria-label={languages[l].name}
            onClick={() => !active && switchTo(l)}
            className={`flex min-h-[32px] items-center gap-1.5 rounded-full px-2 text-xs font-semibold uppercase transition-colors ${
              active ? "text-accent" : "text-muted hover:text-text"
            }`}
          >
            <Flag
              locale={l}
              className={`h-2.5 w-[15px] transition-opacity ${active ? "" : "opacity-60"}`}
            />
            {l}
          </button>
        );
      })}
    </div>
  );
}
