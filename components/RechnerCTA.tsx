import { Link } from "@/i18n/navigation";

function CalculatorIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden>
      <rect
        x="3.5"
        y="2"
        width="13"
        height="16"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M6.5 5.5h7"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle cx="6.75" cy="9.5" r="0.9" fill="currentColor" />
      <circle cx="10" cy="9.5" r="0.9" fill="currentColor" />
      <circle cx="13.25" cy="9.5" r="0.9" fill="currentColor" />
      <circle cx="6.75" cy="12.5" r="0.9" fill="currentColor" />
      <circle cx="10" cy="12.5" r="0.9" fill="currentColor" />
      <circle cx="13.25" cy="12.5" r="0.9" fill="currentColor" />
      <path
        d="M6.75 15.5h6.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function RechnerCTA() {
  return (
    <Link
      href="/rechner"
      className="group flex items-center gap-4 rounded-2xl border border-border bg-surface p-5 transition-all active:scale-[0.98] lg:gap-6 lg:p-6 lg:transition-[transform,border-color] lg:hover:scale-[1.01] lg:hover:border-accent"
    >
      <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent lg:h-16 lg:w-16">
        <CalculatorIcon className="h-7 w-7 lg:h-8 lg:w-8" />
      </span>
      <span className="flex flex-1 flex-col gap-1">
        <span className="text-lg font-semibold text-text lg:text-xl">
          Finde deine Kalorien in 60 Sekunden
        </span>
        <span className="text-sm text-muted lg:text-base">
          Kostenloser Rechner — abgestimmt auf dein Training, nicht nur
          deinen Alltag.
        </span>
      </span>
      <span
        className="hidden shrink-0 text-xl text-accent transition-transform lg:block lg:group-hover:translate-x-1"
        aria-hidden
      >
        →
      </span>
    </Link>
  );
}
