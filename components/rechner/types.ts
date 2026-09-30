import type { Goal, PalLevel, Sex } from "@/lib/rechner-logik";

export interface RechnerDaten {
  sex: Sex | null;
  weightKg: string;
  bodyFatPct: string;
  palLevel: PalLevel | null;
  goal: Goal | null;
  resistanceActive: boolean;
  resistanceSessionsPerWeek: string;
  resistanceMinutesPerSession: string;
  martialArtsActive: boolean;
  martialArtsSessionsPerWeek: string;
  martialArtsMinutesPerSession: string;
  restDays: string;
}

export type UpdateRechnerDaten = (patch: Partial<RechnerDaten>) => void;

export interface SchrittProps {
  data: RechnerDaten;
  update: UpdateRechnerDaten;
}
