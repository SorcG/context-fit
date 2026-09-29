export type Sex = "male" | "female";
export type PalLevel = "sedentary" | "lightly_active" | "active" | "very_active";
export type Goal = "maintain" | "deficit" | "bulk";
export type TrainingType = "resistance" | "martial_arts";

const PAL: Record<Sex, Record<PalLevel, number>> = {
  male: { sedentary: 1.0, lightly_active: 1.11, active: 1.25, very_active: 1.48 },
  female: { sedentary: 1.0, lightly_active: 1.12, active: 1.27, very_active: 1.45 },
};

const TEF = 1.15;

const GOAL: Record<Goal, number> = { maintain: 1.0, deficit: 0.6, bulk: 1.1 };

const KCAL_PER_KG_MIN: Record<TrainingType, number> = {
  resistance: 0.1,
  martial_arts: 0.2,
};

export interface CalcInput {
  sex: Sex;
  weightKg: number;
  bodyFatPct: number;
  palLevel: PalLevel;
  goal: Goal;
  trainingType: TrainingType;
  minutes: number;
}

export interface MacroResult {
  kcal: number;
  proteinG: number;
  fatG: number;
  carbG: number;
  carbClamped: boolean;
}

export interface CalcResult {
  ffm: number;
  bmr: number;
  pal: number;
  trainEE: number;
  deeRest: number;
  deeTrain: number;
  rest: MacroResult;
  train: MacroResult;
}

export function calc({
  sex,
  weightKg,
  bodyFatPct,
  palLevel,
  goal,
  trainingType,
  minutes,
}: CalcInput): CalcResult {
  const ffm = weightKg * (1 - bodyFatPct / 100);
  const bmr = 370 + 21.6 * ffm;
  const pal = PAL[sex][palLevel];
  const trainEE = KCAL_PER_KG_MIN[trainingType] * weightKg * minutes;

  const deeRest = bmr * pal * TEF;
  const deeTrain = (bmr * pal + trainEE) * TEF;

  const targetRest = deeRest * GOAL[goal];
  const targetTrain = deeTrain * GOAL[goal];

  const proteinG = 2 * weightKg;
  const fatKcal = 0.4 * bmr;
  const fatG = fatKcal / 9;

  const macros = (target: number): MacroResult => {
    const carbKcal = target - proteinG * 4 - fatKcal;
    return {
      kcal: target,
      proteinG,
      fatG,
      carbG: Math.max(0, carbKcal / 4),
      carbClamped: carbKcal < 0,
    };
  };

  return {
    ffm,
    bmr,
    pal,
    trainEE,
    deeRest,
    deeTrain,
    rest: macros(targetRest),
    train: macros(targetTrain),
  };
}

/** Rounding is display-only — never feed a rounded value back into calc(). */
export function roundKcal(n: number): number {
  return Math.round(n / 10) * 10;
}

export function roundGram(n: number): number {
  return Math.round(n / 5) * 5;
}
