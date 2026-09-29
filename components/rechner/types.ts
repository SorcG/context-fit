import type { Goal, PalLevel, Sex, TrainingType } from "@/lib/rechner-logik";

export interface RechnerDaten {
  sex: Sex | null;
  weightKg: string;
  bodyFatPct: string;
  palLevel: PalLevel | null;
  goal: Goal | null;
  trainingType: TrainingType | null;
  sessionsPerWeek: string;
  minutesPerSession: string;
  restDays: string;
}

export type UpdateRechnerDaten = (patch: Partial<RechnerDaten>) => void;

export interface SchrittProps {
  data: RechnerDaten;
  update: UpdateRechnerDaten;
}
