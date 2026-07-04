"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

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
  { href: "/", label: "Home", Icon: HomeIcon },
  { href: "/leistungen", label: "Leistungen", Icon: ListIcon },
  { href: "/ueber-mich", label: "Über mich", Icon: UserIcon },
] as const;

export default function BottomTabNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 flex items-stretch gap-1.5 border-t border-border bg-surface px-3 pt-2"
      style={{ paddingBottom: "max(10px, env(safe-area-inset-bottom))" }}
    >
      {navItems.map(({ href, label, Icon }) => {
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
            <span className="text-[11px] font-medium">{label}</span>
          </Link>
        );
      })}
      <Link
        href="/kontakt"
        className="flex min-h-[48px] flex-1 flex-col items-center justify-center gap-1 rounded-xl bg-accent text-text transition-transform active:scale-95"
      >
        <ContactIcon className="h-5 w-5" />
        <span className="text-[11px] font-semibold">Kontakt</span>
      </Link>
    </nav>
  );
}
