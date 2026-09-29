"use client";

import { rechnerTexteDe as texte } from "@/lib/rechner-texte-de";
import type { SchrittProps } from "./types";
import { NumberField, ToggleCard } from "./RechnerFelder";

export default function SchrittBasis({ data, update }: SchrittProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-muted">
          {texte.felder.geschlecht}
        </span>
        <div className="grid grid-cols-2 gap-3">
          <ToggleCard
            selected={data.sex === "male"}
            onClick={() => update({ sex: "male" })}
            title={texte.felder.geschlechtOptionen.male}
          />
          <ToggleCard
            selected={data.sex === "female"}
            onClick={() => update({ sex: "female" })}
            title={texte.felder.geschlechtOptionen.female}
          />
        </div>
      </div>

      <NumberField
        label={texte.felder.gewicht}
        value={data.weightKg}
        onChange={(v) => update({ weightKg: v })}
        min={30}
        max={250}
        step={0.1}
      />

      <div className="flex flex-col gap-2">
        <NumberField
          label={texte.felder.koerperfett}
          value={data.bodyFatPct}
          onChange={(v) => update({ bodyFatPct: v })}
          min={3}
          max={60}
          step={0.1}
        />
        <p className="text-xs text-muted">
          {texte.warnungen.koerperfettUnrealistisch}
        </p>
      </div>
    </div>
  );
}
