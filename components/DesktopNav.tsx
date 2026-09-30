"use client";

import { useRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { LanguageInline } from "@/components/LanguageSwitcher";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const navItems = [
  { href: "/", key: "home" },
  { href: "/leistungen", key: "leistungen" },
  { href: "/praevention", key: "praevention" },
  { href: "/ueber-mich", key: "ueberMich" },
] as const;

export default function DesktopNav() {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("Nav");
  const navRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!navRef.current) return;
      ScrollTrigger.create({
        start: "top -80",
        onUpdate: (self) => {
          navRef.current?.classList.toggle("desktop-nav-solid", self.scroll() > 80);
        },
      });
    },
    { scope: navRef },
  );

  return (
    <nav
      ref={navRef}
      className="fixed inset-x-0 top-0 z-40 hidden items-center justify-between border-b border-transparent px-10 py-5 transition-colors duration-300 lg:flex [&.desktop-nav-solid]:border-border [&.desktop-nav-solid]:bg-bg/90 [&.desktop-nav-solid]:backdrop-blur-md"
    >
      <Link
        href="/"
        className="font-display text-lg font-extrabold tracking-tight text-text"
      >
        Context Fit
      </Link>

      <div className="flex items-center gap-9">
        {navItems.map(({ href, key }) => {
          // Prävention (Krankenkassen-Erstattung) ist nur für Deutschland relevant.
          if (key === "praevention" && locale !== "de") return null;
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`text-sm font-medium transition-colors hover:text-text ${
                active ? "text-accent" : "text-muted"
              }`}
            >
              {t(key)}
            </Link>
          );
        })}
      </div>

      <div className="flex items-center gap-6">
        <LanguageInline />
        <Link
          href="/kontakt"
          className="rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-text transition-transform hover:scale-105 active:scale-95"
        >
          {t("cta")}
        </Link>
      </div>
    </nav>
  );
}
