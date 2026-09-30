"use client";

import { useId, useState } from "react";
import { useTranslations } from "next-intl";
import Reveal from "@/components/Reveal";
import MagneticButton from "@/components/MagneticButton";

// Sprachneutrale Keys — das spätere Backend bekommt immer denselben Wert,
// egal in welcher Sprache das Formular ausgefüllt wurde.
const topics = [
  "onlineCoaching",
  "personalTraining",
  "grapplingTraining",
  "allgemein",
] as const;

type Topic = (typeof topics)[number];

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
  const t = useTranslations("KontaktForm");
  const [topic, setTopic] = useState<Topic | null>(null);
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
      <Reveal className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-surface p-8 text-center lg:gap-6 lg:p-16">
        <SuccessIcon />
        <h2 className="text-xl leading-tight lg:text-3xl">
          {t("successTitle", { name: name.split(" ")[0] })}
        </h2>
        <p className="text-base leading-relaxed text-muted lg:max-w-md lg:text-lg">
          {t("successBody")}
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
          {t("reset")}
        </button>
      </Reveal>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      <Reveal className="flex flex-col gap-3">
        <span className="text-sm font-medium text-muted">
          {t("topicLabel")} <span className="text-accent">*</span>
        </span>
        <div className="flex flex-wrap gap-2">
          {topics.map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setTopic(key)}
              aria-pressed={topic === key}
              className={`rounded-full border px-4 py-2.5 text-sm font-medium transition-all active:scale-95 lg:px-5 lg:py-3 lg:text-base lg:hover:scale-105 ${
                topic === key
                  ? "border-accent bg-accent text-text"
                  : "border-border bg-surface text-muted lg:hover:border-accent/60 lg:hover:text-text"
              }`}
            >
              {t(`topics.${key}`)}
            </button>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.05} className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 lg:grid lg:grid-cols-2 lg:gap-4">
          <FloatingField
            label={t("name")}
            required
            value={name}
            onChange={setName}
          />
          <FloatingField
            label={t("email")}
            type="email"
            required
            value={email}
            onChange={setEmail}
          />
        </div>
        <FloatingField
          label={t("phone")}
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
            {t("message")} <span className="text-accent">*</span>
          </label>
        </div>
      </Reveal>

      <Reveal delay={0.1} className="flex flex-col gap-3 lg:items-start">
        <MagneticButton>
          <button
            type="submit"
            disabled={!topic}
            className="flex h-[56px] w-full items-center justify-center rounded-full bg-accent px-6 text-base font-semibold text-text transition-transform active:scale-95 disabled:opacity-40 disabled:active:scale-100 lg:w-fit lg:px-16"
          >
            {t("submit")}
          </button>
        </MagneticButton>
        <p className="text-center text-sm text-muted lg:text-left">
          {t("responseTime")}
        </p>
      </Reveal>
    </form>
  );
}
