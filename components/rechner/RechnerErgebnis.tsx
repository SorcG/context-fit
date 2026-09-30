"use client";

import { useEffect, useRef } from "react";
import { Link } from "@/i18n/navigation";
import gsap from "gsap";
import MagneticButton from "@/components/MagneticButton";
import { useTranslations } from "next-intl";
import { palAnzeige } from "@/lib/rechner-anzeige";
import {
  roundGram,
  roundKcal,
  type CalcResult,
  type Goal,
  type PalLevel,
  type Sex,
} from "@/lib/rechner-logik";

function MacroCard({
  titel,
  goalLabel,
  kcal,
  proteinG,
  fatG,
  carbG,
  carbClamped,
  zusatzZeile,
  delay,
}: {
  titel: string;
  goalLabel: string;
  kcal: number;
  proteinG: number;
  fatG: number;
  carbG: number;
  carbClamped: boolean;
  zusatzZeile?: string;
  delay: number;
}) {
  const t = useTranslations("Rechner");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    gsap.fromTo(
      el,
      { opacity: 0, y: reduceMotion ? 0 : 24 },
      { opacity: 1, y: 0, duration: 0.6, delay, ease: "power3.out" },
    );
  }, [delay]);

  return (
    <div
      ref={ref}
      className="flex flex-col gap-4 rounded-2xl border border-border bg-surface p-6"
    >
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-lg font-semibold text-text">{titel}</h3>
        <span className="shrink-0 rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-accent">
          {goalLabel}
        </span>
      </div>

      <p className="font-display text-4xl font-extrabold text-text">
        {roundKcal(kcal)}{" "}
        <span className="text-lg font-medium text-muted">
          {t("output.kcalProTag")}
        </span>
      </p>

      <div className="flex flex-col gap-2 border-t border-border pt-4">
        <div className="flex justify-between text-sm">
          <span className="text-muted">{t("output.protein")}</span>
          <span className="text-text">{roundGram(proteinG)} g</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted">{t("output.fett")}</span>
          <span className="text-text">{roundGram(fatG)} g</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted">{t("output.kohlenhydrate")}</span>
          <span className="text-text">{roundGram(carbG)} g</span>
        </div>
      </div>

      {zusatzZeile && <p className="text-sm text-accent">{zusatzZeile}</p>}

      {carbClamped && (
        <p className="rounded-xl border border-accent/40 bg-accent/10 p-3 text-sm text-text">
          {t("warnungen.negativeKohlenhydrate")}
        </p>
      )}
    </div>
  );
}

export default function RechnerErgebnis({
  result,
  sessionsPerWeek,
  goal,
  palLevel,
  onReset,
}: {
  result: CalcResult;
  sessionsPerWeek: number;
  goal: Goal;
  palLevel: PalLevel;
  sex: Sex;
  onReset: () => void;
}) {
  const t = useTranslations("Rechner");
  const goalLabel = t(`felder.zielOptionen.${goal}`);
  const palInfo = palAnzeige[palLevel];
  const hasTraining = sessionsPerWeek > 0;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-1.5 rounded-xl border border-border bg-surface/50 p-4 text-sm text-muted">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted">
          {t("ergebnis.soKommenWirDarauf")}
        </p>
        <p>
          {t("output.grundumsatz")}:{" "}
          <span className="text-text">{Math.round(result.bmr)} kcal</span>
          {" · "}
          {t("output.magermasse")}:{" "}
          <span className="text-text">{result.ffm.toFixed(1)} kg</span>
        </p>
        <p>
          PAL:{" "}
          <span className="text-text">
            {palInfo.label} ({result.pal.toFixed(2)})
          </span>
          {hasTraining && (
            <>
              {" · "}
              {t("output.training")}:{" "}
              <span className="text-text">
                +{Math.round(result.trainEE)} kcal
              </span>
            </>
          )}
        </p>
      </div>

      <div className="flex flex-col gap-6 lg:grid lg:grid-cols-2">
        <MacroCard
          titel={t("output.ruhetag")}
          goalLabel={goalLabel}
          kcal={result.rest.kcal}
          proteinG={result.rest.proteinG}
          fatG={result.rest.fatG}
          carbG={result.rest.carbG}
          carbClamped={result.rest.carbClamped}
          delay={0}
        />
        {hasTraining && (
          <MacroCard
            titel={t("output.trainingstag")}
            goalLabel={goalLabel}
            kcal={result.train.kcal}
            proteinG={result.train.proteinG}
            fatG={result.train.fatG}
            carbG={result.train.carbG}
            carbClamped={result.train.carbClamped}
            zusatzZeile={t("ergebnis.trainingsKcalZeile", {
              kcal: String(Math.round(result.trainEE)),
            })}
            delay={0.1}
          />
        )}
      </div>

      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <button
          type="button"
          onClick={onReset}
          className="flex h-[52px] w-full items-center justify-center rounded-full border border-border px-6 text-base font-medium text-text transition-transform active:scale-95 lg:w-fit"
        >
          {t("ergebnis.nochmalBerechnen")}
        </button>
        <MagneticButton>
          <Link
            href="/kontakt"
            className="flex h-[52px] w-full items-center justify-center rounded-full bg-accent px-6 text-base font-semibold text-text transition-transform active:scale-95 lg:w-fit lg:px-10"
          >
            {t("ergebnis.zumErstgespraech")}
          </Link>
        </MagneticButton>
      </div>

      <p className="text-xs text-muted">{t("footer")}</p>
    </div>
  );
}
