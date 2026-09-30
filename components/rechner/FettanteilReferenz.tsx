"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import type { Sex } from "@/lib/rechner-logik";

// Auf-/Zuklappen per max-height-Transition statt JS-Höhenmessung — im Projekt
// gibt es noch keine GSAP-Height-Animation für sowas. Der grid-template-rows
// (0fr/1fr)-Trick wäre eleganter gewesen, kollabiert hier aber auf ~0, weil
// die Zielhöhe selbst über aspect-ratio von der (noch unbekannten) Breite
// abhängt — eine zirkuläre Berechnung, die Browser beim 1fr-Grid-Tracking
// nicht zuverlässig auflösen. max-height mit großzügigem Fixwert umgeht das.
export default function FettanteilReferenz({ sex }: { sex: Sex | null }) {
  const t = useTranslations("Rechner.koerperfettReferenz");
  const tAlt = useTranslations("Alt");
  const [open, setOpen] = useState(false);

  if (!sex) return null;

  const src =
    sex === "male" ? "/images/fettanteil-mann.jpeg" : "/images/fettanteil-frau.jpeg";
  const alt = sex === "male" ? tAlt("fettanteilMann") : tAlt("fettanteilFrau");

  return (
    <div className="flex flex-col gap-2">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-fit items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-text"
      >
        {t("link")}
        <svg
          viewBox="0 0 10 10"
          className={`h-2 w-2 shrink-0 transition-transform duration-200 ${
            open ? "rotate-180" : ""
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

      <div
        className={`overflow-hidden transition-[max-height] duration-300 ease-in-out motion-reduce:transition-none ${
          open ? "max-h-[420px]" : "max-h-0"
        }`}
      >
        <div className="flex flex-col gap-1.5 pt-0.5">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded border border-border bg-bg">
            <Image
              src={src}
              alt={alt}
              fill
              loading="eager"
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-contain"
            />
          </div>
          <p className="text-xs text-muted">{t("caption")}</p>
        </div>
      </div>
    </div>
  );
}
