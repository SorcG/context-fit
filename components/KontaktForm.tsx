"use client";

import { useId, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import deMessages from "../messages/de.json";
import Reveal from "@/components/Reveal";
import MagneticButton from "@/components/MagneticButton";

// Sprachneutrale Keys — Mail-Betreff und Thema gehen immer auf Deutsch raus,
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
  error,
}: {
  label: string;
  type?: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
  error?: string;
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
        aria-invalid={error ? true : undefined}
        className={`peer h-[56px] w-full rounded-xl border bg-surface px-4 pt-4 text-base text-text outline-none transition-colors placeholder-shown:pt-0 focus:border-accent ${error ? "border-accent" : "border-border"}`}
      />
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-4 top-2 text-xs text-muted transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-muted peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-xs peer-focus:text-accent"
      >
        {label}
        {required && <span className="text-accent"> *</span>}
      </label>
      {error && <p className="mt-1.5 text-sm text-accent">{error}</p>}
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
  const [botcheck, setBotcheck] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [failed, setFailed] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    message?: string;
  }>({});
  const sendingRef = useRef(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sendingRef.current || !topic) return;

    const nextErrors: typeof errors = {};
    if (!name.trim()) nextErrors.name = t("errors.name");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) {
      nextErrors.email = t("errors.email");
    }
    if (!message.trim()) nextErrors.message = t("errors.message");
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    // Honeypot: Bots füllen das versteckte Feld aus — still Erfolg vortäuschen.
    if (botcheck) {
      setSubmitted(true);
      return;
    }

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
    if (!accessKey) {
      console.error(
        "NEXT_PUBLIC_WEB3FORMS_KEY fehlt — Kontaktformular kann nicht senden.",
      );
      setFailed(true);
      return;
    }

    sendingRef.current = true;
    setSending(true);
    setFailed(false);
    try {
      const topicLabel = deMessages.KontaktForm.topics[topic];
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          subject: deMessages.KontaktForm.subject.replace("{topic}", topicLabel),
          from_name: "Context Fit Website",
          email: email.trim(),
          name: name.trim(),
          ...(phone.trim() ? { phone: phone.trim() } : {}),
          message: message.trim(),
          topic: topicLabel,
        }),
      });
      const data = await res.json();
      if (data.success === true) {
        setSubmitted(true);
      } else {
        setFailed(true);
      }
    } catch {
      setFailed(true);
    } finally {
      sendingRef.current = false;
      setSending(false);
    }
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
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-8">
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
            error={errors.name}
          />
          <FloatingField
            label={t("email")}
            type="email"
            required
            value={email}
            onChange={setEmail}
            error={errors.email}
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
            aria-invalid={errors.message ? true : undefined}
            className={`peer w-full resize-none rounded-xl border bg-surface px-4 pb-3 pt-6 text-base text-text outline-none transition-colors focus:border-accent ${errors.message ? "border-accent" : "border-border"}`}
          />
          <label
            htmlFor="message"
            className="pointer-events-none absolute left-4 top-2 text-xs text-muted transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-muted peer-focus:top-2 peer-focus:text-xs peer-focus:text-accent"
          >
            {t("message")} <span className="text-accent">*</span>
          </label>
          {errors.message && (
            <p className="mt-1.5 text-sm text-accent">{errors.message}</p>
          )}
        </div>
        <input
          type="checkbox"
          name="botcheck"
          checked={botcheck}
          onChange={(e) => setBotcheck(e.target.checked)}
          tabIndex={-1}
          aria-hidden
          autoComplete="off"
          className="pointer-events-none absolute -left-[9999px] h-0 w-0 opacity-0"
        />
      </Reveal>

      <Reveal delay={0.1} className="flex flex-col gap-3 lg:items-start">
        <MagneticButton>
          <button
            type="submit"
            disabled={!topic || sending}
            className="flex h-[56px] w-full items-center justify-center rounded-full bg-accent px-6 text-base font-semibold text-text transition-transform active:scale-95 disabled:opacity-40 disabled:active:scale-100 lg:w-fit lg:px-16"
          >
            {sending ? t("submitting") : t("submit")}
          </button>
        </MagneticButton>
        {failed && (
          <p role="alert" className="text-sm text-accent">
            {t("error")}
          </p>
        )}
        <p className="text-center text-sm text-muted lg:text-left">
          {t("responseTime")}
        </p>
        <p className="text-center text-xs text-muted lg:text-left">
          {t.rich("privacy", {
            link: (chunks) => (
              <Link
                href="/datenschutz"
                className="underline underline-offset-2 transition-colors hover:text-text"
              >
                {chunks}
              </Link>
            ),
          })}
        </p>
      </Reveal>
    </form>
  );
}
