"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useTranslations } from "next-intl";
import { calc } from "@/lib/rechner-logik";
import type { RechnerDaten } from "./types";
import SchrittBasis from "./SchrittBasis";
import SchrittAlltag from "./SchrittAlltag";
import SchrittTraining from "./SchrittTraining";
import SchrittZiel from "./SchrittZiel";
import RechnerErgebnis from "./RechnerErgebnis";

const TOTAL_STEPS = 4;
const stepNames = ["basis", "alltag", "training", "ziel"] as const;

const initialData: RechnerDaten = {
  sex: null,
  weightKg: "",
  bodyFatPct: "",
  palLevel: null,
  goal: null,
  trainingType: null,
  sessionsPerWeek: "3",
  minutesPerSession: "60",
  restDays: "4",
};

function isStepValid(step: number, data: RechnerDaten): boolean {
  switch (step) {
    case 1: {
      const w = parseFloat(data.weightKg);
      const bf = parseFloat(data.bodyFatPct);
      return (
        data.sex !== null &&
        !Number.isNaN(w) &&
        w >= 30 &&
        w <= 250 &&
        !Number.isNaN(bf) &&
        bf >= 3 &&
        bf <= 60
      );
    }
    case 2:
      return data.palLevel !== null;
    case 3: {
      if (data.trainingType === null) return false;
      const sessions = parseFloat(data.sessionsPerWeek);
      if (Number.isNaN(sessions) || sessions < 0 || sessions > 14) {
        return false;
      }
      if (sessions > 0) {
        const minutes = parseFloat(data.minutesPerSession);
        if (Number.isNaN(minutes) || minutes < 10 || minutes > 240) {
          return false;
        }
      }
      const rest = parseFloat(data.restDays);
      return !Number.isNaN(rest) && rest >= 0;
    }
    case 4:
      return data.goal !== null;
    default:
      return true;
  }
}

export default function Rechner() {
  const t = useTranslations("Rechner");
  const [step, setStep] = useState(1);
  const [data, setData] = useState<RechnerDaten>(initialData);
  const contentRef = useRef<HTMLDivElement>(null);

  const update = (patch: Partial<RechnerDaten>) =>
    setData((d) => ({ ...d, ...patch }));

  const isResult = step === TOTAL_STEPS + 1;

  function animateIn(direction: "forward" | "back") {
    const el = contentRef.current;
    if (!el) return;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const x = reduceMotion ? 0 : direction === "forward" ? 20 : -20;
    gsap.fromTo(
      el,
      { opacity: 0, x },
      { opacity: 1, x: 0, duration: 0.3, ease: "power2.out" },
    );
  }

  function goTo(nextStep: number, direction: "forward" | "back") {
    const el = contentRef.current;
    if (!el) {
      setStep(nextStep);
      return;
    }
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const outX = reduceMotion ? 0 : direction === "forward" ? -20 : 20;
    gsap.to(el, {
      opacity: 0,
      x: outX,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        setStep(nextStep);
        animateIn(direction);
      },
    });
  }

  const handleNext = () => {
    if (!isStepValid(step, data)) return;
    goTo(step + 1, "forward");
  };

  const handleBack = () => {
    if (step > 1) goTo(step - 1, "back");
  };

  const handleReset = () => {
    setData(initialData);
    setStep(1);
  };

  const result =
    isResult && data.sex && data.palLevel && data.goal && data.trainingType
      ? calc({
          sex: data.sex,
          weightKg: parseFloat(data.weightKg),
          bodyFatPct: parseFloat(data.bodyFatPct),
          palLevel: data.palLevel,
          goal: data.goal,
          trainingType: data.trainingType,
          minutes:
            parseInt(data.sessionsPerWeek, 10) > 0
              ? parseFloat(data.minutesPerSession)
              : 0,
        })
      : null;

  return (
    <div className="flex flex-col gap-8">
      {!isResult && (
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
              <span
                key={i}
                className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
                  i < step ? "bg-accent" : "bg-border"
                }`}
              />
            ))}
          </div>
          <p className="text-xs text-muted">
            {step}/{TOTAL_STEPS} —{" "}
            {t(`schritte.${stepNames[step - 1]}`)}
          </p>
        </div>
      )}

      <div ref={contentRef} className={isResult ? "" : "pb-24 lg:pb-0"}>
        {step === 1 && <SchrittBasis data={data} update={update} />}
        {step === 2 && <SchrittAlltag data={data} update={update} />}
        {step === 3 && <SchrittTraining data={data} update={update} />}
        {step === 4 && <SchrittZiel data={data} update={update} />}
        {isResult && result && data.goal && data.palLevel && data.sex && (
          <RechnerErgebnis
            result={result}
            sessionsPerWeek={parseInt(data.sessionsPerWeek, 10) || 0}
            goal={data.goal}
            palLevel={data.palLevel}
            sex={data.sex}
            onReset={handleReset}
          />
        )}
      </div>

      {!isResult && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-bg/95 px-5 py-4 backdrop-blur lg:static lg:border-0 lg:bg-transparent lg:p-0 lg:backdrop-blur-none">
          <div
            className="mx-auto flex max-w-[480px] items-center justify-between gap-3 lg:max-w-none"
            style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
          >
            <button
              type="button"
              onClick={handleBack}
              disabled={step === 1}
              className="px-2 text-base font-medium text-muted transition-opacity disabled:opacity-0"
            >
              {t("navigation.zurueck")}
            </button>
            <button
              type="button"
              onClick={handleNext}
              disabled={!isStepValid(step, data)}
              className="flex h-[52px] min-w-[160px] items-center justify-center rounded-full bg-accent px-8 text-base font-semibold text-text transition-transform active:scale-95 disabled:cursor-not-allowed disabled:bg-border disabled:text-muted disabled:active:scale-100"
            >
              {step === TOTAL_STEPS
                ? t("navigation.ergebnisAnzeigen")
                : t("navigation.weiter")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
