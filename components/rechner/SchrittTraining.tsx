"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import type { SchrittProps } from "./types";
import { Stepper, ToggleCard } from "./RechnerFelder";

export default function SchrittTraining({ data, update }: SchrittProps) {
  const t = useTranslations("Rechner");
  const restTouchedRef = useRef(false);

  const sessions = parseInt(data.sessionsPerWeek, 10) || 0;
  const minutes = parseInt(data.minutesPerSession, 10) || 60;
  const restDays = parseInt(data.restDays, 10) || 0;

  const handleSessionsChange = (v: number) => {
    if (restTouchedRef.current) {
      update({ sessionsPerWeek: String(v) });
    } else {
      update({
        sessionsPerWeek: String(v),
        restDays: String(Math.max(0, 7 - v)),
      });
    }
  };

  const handleRestChange = (v: number) => {
    restTouchedRef.current = true;
    update({ restDays: String(v) });
  };

  const mismatch = sessions + restDays !== 7;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-muted">
          {t("felder.trainingsart")}
        </span>
        <div className="grid grid-cols-2 gap-3">
          <ToggleCard
            selected={data.trainingType === "resistance"}
            onClick={() => update({ trainingType: "resistance" })}
            title={t("felder.trainingsartOptionen.resistance")}
          />
          <ToggleCard
            selected={data.trainingType === "martial_arts"}
            onClick={() => update({ trainingType: "martial_arts" })}
            title={t("felder.trainingsartOptionen.martial_arts")}
          />
        </div>
      </div>

      <Stepper
        label={t("felder.einheitenProWoche")}
        value={sessions}
        onChange={handleSessionsChange}
        min={0}
        max={14}
      />

      {sessions > 0 && (
        <Stepper
          label={t("felder.minutenProEinheit")}
          value={minutes}
          onChange={(v) => update({ minutesPerSession: String(v) })}
          min={10}
          max={240}
          step={5}
        />
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
          {t("warnungen.tageMismatch", { total: sessions + restDays })}
        </p>
      )}
    </div>
  );
}
