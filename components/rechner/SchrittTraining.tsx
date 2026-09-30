"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import type { SchrittProps } from "./types";
import { Stepper, ToggleCard } from "./RechnerFelder";

export default function SchrittTraining({ data, update }: SchrittProps) {
  const t = useTranslations("Rechner");
  const restTouchedRef = useRef(false);

  const resistanceActive = data.resistanceActive;
  const martialArtsActive = data.martialArtsActive;
  const resistanceSessions = parseInt(data.resistanceSessionsPerWeek, 10) || 0;
  const resistanceMinutes = parseInt(data.resistanceMinutesPerSession, 10) || 60;
  const martialArtsSessions = parseInt(data.martialArtsSessionsPerWeek, 10) || 0;
  const martialArtsMinutes = parseInt(data.martialArtsMinutesPerSession, 10) || 60;
  const restDays = parseInt(data.restDays, 10) || 0;

  const totalSessions =
    (resistanceActive ? resistanceSessions : 0) +
    (martialArtsActive ? martialArtsSessions : 0);

  const autoRestDays = (nextTotalSessions: number) =>
    restTouchedRef.current
      ? {}
      : { restDays: String(Math.max(0, 7 - nextTotalSessions)) };

  const handleResistanceToggle = () => {
    const next = !resistanceActive;
    const nextTotal =
      (next ? resistanceSessions : 0) +
      (martialArtsActive ? martialArtsSessions : 0);
    update({ resistanceActive: next, ...autoRestDays(nextTotal) });
  };

  const handleMartialArtsToggle = () => {
    const next = !martialArtsActive;
    const nextTotal =
      (resistanceActive ? resistanceSessions : 0) + (next ? martialArtsSessions : 0);
    update({ martialArtsActive: next, ...autoRestDays(nextTotal) });
  };

  const handleResistanceSessionsChange = (v: number) => {
    const nextTotal = v + (martialArtsActive ? martialArtsSessions : 0);
    update({
      resistanceSessionsPerWeek: String(v),
      ...autoRestDays(nextTotal),
    });
  };

  const handleMartialArtsSessionsChange = (v: number) => {
    const nextTotal = (resistanceActive ? resistanceSessions : 0) + v;
    update({
      martialArtsSessionsPerWeek: String(v),
      ...autoRestDays(nextTotal),
    });
  };

  const handleRestChange = (v: number) => {
    restTouchedRef.current = true;
    update({ restDays: String(v) });
  };

  const mismatch = totalSessions + restDays !== 7;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-muted">
          {t("felder.trainingsart")}
        </span>
        <div className="grid grid-cols-2 gap-3">
          <ToggleCard
            selected={resistanceActive}
            onClick={handleResistanceToggle}
            title={t("felder.trainingsartOptionen.resistance")}
          />
          <ToggleCard
            selected={martialArtsActive}
            onClick={handleMartialArtsToggle}
            title={t("felder.trainingsartOptionen.martial_arts")}
          />
        </div>
      </div>

      {resistanceActive && (
        <div className="flex flex-col gap-6">
          <Stepper
            label={t("felder.einheitenProWocheKraft")}
            value={resistanceSessions}
            onChange={handleResistanceSessionsChange}
            min={0}
            max={14}
          />
          {resistanceSessions > 0 && (
            <Stepper
              label={t("felder.minutenProEinheitKraft")}
              value={resistanceMinutes}
              onChange={(v) =>
                update({ resistanceMinutesPerSession: String(v) })
              }
              min={10}
              max={240}
              step={5}
            />
          )}
        </div>
      )}

      {martialArtsActive && (
        <div className="flex flex-col gap-6">
          <Stepper
            label={t("felder.einheitenProWocheKampfsport")}
            value={martialArtsSessions}
            onChange={handleMartialArtsSessionsChange}
            min={0}
            max={14}
          />
          {martialArtsSessions > 0 && (
            <Stepper
              label={t("felder.minutenProEinheitKampfsport")}
              value={martialArtsMinutes}
              onChange={(v) =>
                update({ martialArtsMinutesPerSession: String(v) })
              }
              min={10}
              max={240}
              step={5}
            />
          )}
        </div>
      )}

      <Stepper
        label={t("felder.ruhetageProWoche")}
        value={restDays}
        onChange={handleRestChange}
        min={0}
        max={14}
      />

      {mismatch && (
        <p className="text-sm text-accent">
          {t("warnungen.tageMismatch", { total: totalSessions + restDays })}
        </p>
      )}
    </div>
  );
}
