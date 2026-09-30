"use client";

import { useTranslations } from "next-intl";
import type { Goal } from "@/lib/rechner-logik";
import type { SchrittProps } from "./types";
import { ToggleCard } from "./RechnerFelder";

const goalOrder: Goal[] = ["maintain", "deficit", "bulk"];

export default function SchrittZiel({ data, update }: SchrittProps) {
  const t = useTranslations("Rechner");

  return (
    <div className="flex flex-col gap-3">
      <span className="text-sm font-medium text-muted">
        {t("felder.ziel")}
      </span>
      {goalOrder.map((goal) => (
        <ToggleCard
          key={goal}
          selected={data.goal === goal}
          onClick={() => update({ goal })}
          title={t(`felder.zielOptionen.${goal}`)}
          subtitle={t(`zielBeschreibung.${goal}`)}
          className="w-full"
        />
      ))}
    </div>
  );
}
