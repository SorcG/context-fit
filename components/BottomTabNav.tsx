"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { LanguageTab } from "@/components/LanguageSwitcher";

function HomeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden>
      <path
        d="M3 9.5L10 3l7 6.5M4.5 8v8h11V8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ListIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden>
      <path
        d="M4 5.5h12M4 10h12M4 14.5h7"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden>
      <path
        d="M10 2.5l6 2.2v4.3c0 4-2.6 6.9-6 8.5-3.4-1.6-6-4.5-6-8.5V4.7l6-2.2z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M7.3 10l1.8 1.8 3.6-3.6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function UserIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden>
      <circle cx="10" cy="6.5" r="3" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M4 17c0-3.3 2.7-6 6-6s6 2.7 6 6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ContactIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden>
      <path
        d="M3 4.5h14v9H8.5L4.5 17v-3.5H3v-9z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const navItems = [
  { href: "/", key: "home", Icon: HomeIcon },
  { href: "/leistungen", key: "leistungen", Icon: ListIcon },
  { href: "/praevention", key: "praevention", Icon: ShieldIcon },
  { href: "/ueber-mich", key: "ueberMich", Icon: UserIcon },
] as const;

export default function BottomTabNav() {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("Nav");

  // Der Rechner hat seine eigene sticky Zurück/Weiter-Leiste am unteren
  // Bildschirmrand — zwei fixe Bottom-Bars gleichzeitig wären verwirrend.
  if (pathname === "/rechner") return null;

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 flex items-stretch gap-1.5 border-t border-border bg-surface px-3 pt-2 lg:hidden"
      style={{ paddingBottom: "max(10px, env(safe-area-inset-bottom))" }}
    >
      <LanguageTab />
      {navItems.map(({ href, key, Icon }) => {
        // Prävention (Krankenkassen-Erstattung) ist nur für Deutschland relevant.
        if (key === "praevention" && locale !== "de") return null;
        const active = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className={`flex min-h-[48px] flex-1 flex-col items-center justify-center gap-1 rounded-xl transition-transform active:scale-95 ${
              active ? "text-accent" : "text-muted"
            }`}
          >
            <Icon className="h-5 w-5" />
            <span className="text-[11px] font-medium">{t(key)}</span>
          </Link>
        );
      })}
      <Link
        href="/kontakt"
        className="flex min-h-[48px] flex-1 flex-col items-center justify-center gap-1 rounded-xl bg-accent text-text transition-transform active:scale-95"
      >
        <ContactIcon className="h-5 w-5" />
        <span className="text-[11px] font-semibold">{t("kontakt")}</span>
      </Link>
    </nav>
  );
}
