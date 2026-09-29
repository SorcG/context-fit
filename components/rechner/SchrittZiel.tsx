"use client";

import { rechnerTexteDe as texte } from "@/lib/rechner-texte-de";
import type { Goal } from "@/lib/rechner-logik";
import type { SchrittProps } from "./types";
import { ToggleCard } from "./RechnerFelder";

const goalOrder: Goal[] = ["maintain", "deficit", "bulk"];

export default function SchrittZiel({ data, update }: SchrittProps) {
  return (
    <div className="flex flex-col gap-3">
      <span className="text-sm font-medium text-muted">
        {texte.felder.ziel}
      </span>
      {goalOrder.map((goal) => (
        <ToggleCard
          key={goal}
          selected={data.goal === goal}
          onClick={() => update({ goal })}
          title={texte.felder.zielOptionen[goal]}
          subtitle={texte.zielBeschreibung[goal]}
          className="w-full"
        />
      ))}
    </div>
  );
}
