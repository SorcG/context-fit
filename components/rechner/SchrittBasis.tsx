"use client";

import { useTranslations } from "next-intl";
import type { SchrittProps } from "./types";
import { NumberField, ToggleCard } from "./RechnerFelder";
import FettanteilReferenz from "./FettanteilReferenz";

export default function SchrittBasis({ data, update }: SchrittProps) {
  const t = useTranslations("Rechner");

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-muted">
          {t("felder.geschlecht")}
        </span>
        <div className="grid grid-cols-2 gap-3">
          <ToggleCard
            selected={data.sex === "male"}
            onClick={() => update({ sex: "male" })}
            title={t("felder.geschlechtOptionen.male")}
          />
          <ToggleCard
            selected={data.sex === "female"}
            onClick={() => update({ sex: "female" })}
            title={t("felder.geschlechtOptionen.female")}
          />
        </div>
      </div>

      <NumberField
        label={t("felder.gewicht")}
        value={data.weightKg}
        onChange={(v) => update({ weightKg: v })}
        min={30}
        max={250}
        step={0.1}
      />

      <div className="flex flex-col gap-2">
        <NumberField
          label={t("felder.koerperfett")}
          value={data.bodyFatPct}
          onChange={(v) => update({ bodyFatPct: v })}
          min={3}
          max={60}
          step={0.1}
        />
        <p className="text-xs text-muted">
          {t("warnungen.koerperfettUnrealistisch")}
        </p>
        <FettanteilReferenz sex={data.sex} />
      </div>
    </div>
  );
}
