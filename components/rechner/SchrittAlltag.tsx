"use client";

import { useTranslations } from "next-intl";
import { palAnzeige } from "@/lib/rechner-anzeige";
import type { PalLevel } from "@/lib/rechner-logik";
import type { SchrittProps } from "./types";

const palOrder: PalLevel[] = [
  "sedentary",
  "lightly_active",
  "active",
  "very_active",
];

export default function SchrittAlltag({ data, update }: SchrittProps) {
  const t = useTranslations("Rechner");
  const sex = data.sex ?? "male";

  return (
    <div className="flex flex-col gap-4">
      <span className="text-sm font-medium text-muted">
        {t("felder.alltagsaktivitaet")}
      </span>
      <div className="flex flex-col gap-3">
        {palOrder.map((level) => {
          const info = palAnzeige[level];
          const selected = data.palLevel === level;
          return (
            <button
              key={level}
              type="button"
              onClick={() => update({ palLevel: level })}
              aria-pressed={selected}
              className={`flex items-start gap-3 rounded-2xl border p-4 text-left transition-all active:scale-[0.98] ${
                selected
                  ? "border-accent bg-accent/10"
                  : "border-border bg-surface"
              }`}
            >
              <span
                className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                  selected ? "border-accent" : "border-border"
                }`}
                aria-hidden
              >
                {selected && (
                  <span className="h-2.5 w-2.5 rounded-full bg-accent" />
                )}
              </span>
              <span className="flex flex-col gap-1">
                <span className="flex items-baseline gap-2">
                  <span className="text-base font-semibold text-text">
                    {info.label}
                  </span>
                  <span className="text-sm text-muted">
                    {info.multiplikator[sex]}
                  </span>
                </span>
                <span className="text-sm text-muted">{t(`palHelper.${level}`)}</span>
              </span>
            </button>
          );
        })}
      </div>
      <div className="rounded-xl border border-border bg-surface/50 p-4 text-sm text-muted">
        {t("palDauerhinweis")}
      </div>
    </div>
  );
}
