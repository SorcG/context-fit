"use client";

import { useId, useState } from "react";
import Reveal from "@/components/Reveal";

const topics = [
  "Online Coaching",
  "Personal Training vor Ort",
  "Grappling Training",
  "Allgemeine Anfrage",
];

function SuccessIcon() {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      className="h-14 w-14 text-accent"
      aria-hidden
    >
      <circle cx="24" cy="24" r="21" stroke="currentColor" strokeWidth="2" />
      <path
        d="M15 24.5l6 6 12-13"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FloatingField({
  label,
  type = "text",
  required,
  value,
  onChange,
}: {
  label: string;
  type?: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
}) {
  const id = useId();
  return (
    <div className="relative">
      <input
        id={id}
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder=" "
        className="peer h-[56px] w-full rounded-xl border border-border bg-surface px-4 pt-4 text-base text-text outline-none transition-colors placeholder-shown:pt-0 focus:border-accent"
      />
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-4 top-2 text-xs text-muted transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-muted peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-xs peer-focus:text-accent"
      >
        {label}
        {required && <span className="text-accent"> *</span>}
      </label>
    </div>
  );
}

export default function KontaktForm() {
  const [topic, setTopic] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <Reveal className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-surface p-8 text-center">
        <SuccessIcon />
        <h2 className="text-xl leading-tight">Danke, {name.split(" ")[0]}!</h2>
        <p className="text-base leading-relaxed text-muted">
          Deine Anfrage ist bereit. Bram meldet sich innerhalb von 24 Stunden
          persönlich bei dir zurück.
        </p>
        <button
          type="button"
          onClick={() => {
            setSubmitted(false);
            setTopic(null);
            setName("");
            setEmail("");
            setPhone("");
            setMessage("");
          }}
          className="text-sm font-semibold text-accent underline underline-offset-4"
        >
          Neue Anfrage stellen
        </button>
      </Reveal>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      <Reveal className="flex flex-col gap-3">
        <span className="text-sm font-medium text-muted">
          Worum geht es? <span className="text-accent">*</span>
        </span>
        <div className="flex flex-wrap gap-2">
          {topics.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTopic(t)}
              aria-pressed={topic === t}
              className={`rounded-full border px-4 py-2.5 text-sm font-medium transition-all active:scale-95 ${
                topic === t
                  ? "border-accent bg-accent text-text"
                  : "border-border bg-surface text-muted"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.05} className="flex flex-col gap-4">
        <FloatingField
          label="Name"
          required
          value={name}
          onChange={setName}
        />
        <FloatingField
          label="E-Mail"
          type="email"
          required
          value={email}
          onChange={setEmail}
        />
        <FloatingField
          label="Telefon (optional)"
          type="tel"
          value={phone}
          onChange={setPhone}
        />
        <div className="relative">
          <textarea
            id="message"
            required
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder=" "
            className="peer w-full resize-none rounded-xl border border-border bg-surface px-4 pb-3 pt-6 text-base text-text outline-none transition-colors focus:border-accent"
          />
          <label
            htmlFor="message"
            className="pointer-events-none absolute left-4 top-2 text-xs text-muted transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-muted peer-focus:top-2 peer-focus:text-xs peer-focus:text-accent"
          >
            Deine Nachricht <span className="text-accent">*</span>
          </label>
        </div>
      </Reveal>

      <Reveal delay={0.1} className="flex flex-col gap-3">
        <button
          type="submit"
          disabled={!topic}
          className="flex h-[56px] w-full items-center justify-center rounded-full bg-accent px-6 text-base font-semibold text-text transition-transform active:scale-95 disabled:opacity-40 disabled:active:scale-100"
        >
          Anfrage senden
        </button>
        <p className="text-center text-sm text-muted">
          Ich melde mich innerhalb von 24 Stunden persönlich bei dir.
        </p>
      </Reveal>
    </form>
  );
}
