"use client";

import { useTranslations } from "next-intl";

export function NumberField({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  suffix,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  min: number;
  max: number;
  step?: number;
  suffix?: string;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm font-medium text-muted">{label}</span>
      <div className="relative">
        <input
          type="number"
          inputMode="decimal"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          min={min}
          max={max}
          step={step}
          className="h-[56px] w-full rounded-xl border border-border bg-surface px-4 text-base text-text outline-none transition-colors focus:border-accent"
        />
        {suffix && (
          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-muted">
            {suffix}
          </span>
        )}
      </div>
    </label>
  );
}

export function ToggleCard({
  selected,
  onClick,
  title,
  subtitle,
  className = "",
}: {
  selected: boolean;
  onClick: () => void;
  title: string;
  subtitle?: string;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`flex min-h-[44px] flex-col items-start gap-1 rounded-2xl border p-4 text-left transition-all active:scale-[0.98] ${
        selected ? "border-accent bg-accent/10" : "border-border bg-surface"
      } ${className}`}
    >
      <span className="text-base font-semibold text-text">{title}</span>
      {subtitle && <span className="text-sm text-muted">{subtitle}</span>}
    </button>
  );
}

export function Stepper({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  suffix,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  suffix?: string;
}) {
  const t = useTranslations("Rechner.aria");
  const dec = () => onChange(Math.max(min, value - step));
  const inc = () => onChange(Math.min(max, value + step));

  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium text-muted">{label}</span>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={dec}
          disabled={value <= min}
          aria-label={t("verringern", { label })}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border bg-surface text-xl text-text transition-transform active:scale-90 disabled:opacity-30"
        >
          −
        </button>
        <span className="flex-1 text-center text-xl font-semibold text-text">
          {value}
          {suffix && (
            <span className="ml-1 text-sm font-normal text-muted">
              {suffix}
            </span>
          )}
        </span>
        <button
          type="button"
          onClick={inc}
          disabled={value >= max}
          aria-label={t("erhoehen", { label })}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border bg-surface text-xl text-text transition-transform active:scale-90 disabled:opacity-30"
        >
          +
        </button>
      </div>
    </div>
  );
}
