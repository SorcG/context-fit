import Link from "next/link";

export default function Footer() {
  return (
    <footer id="site-footer" className="border-t border-border py-8 lg:py-10">
      <div className="mx-auto flex w-full max-w-[480px] flex-col items-center gap-3 px-5 text-center lg:max-w-[720px] lg:px-10">
        <div className="flex flex-col items-center gap-1">
          <p className="text-sm font-semibold text-text lg:text-base">
            Context Fit
          </p>
          <p className="text-xs text-muted lg:text-sm">
            Bram van Koppen · Paderborn
          </p>
        </div>
        <div className="flex items-center gap-3 text-[11px] text-muted lg:text-xs">
          <Link href="/impressum" className="transition-colors hover:text-text">
            Impressum
          </Link>
          <span aria-hidden>·</span>
          <Link href="/datenschutz" className="transition-colors hover:text-text">
            Datenschutz
          </Link>
        </div>
      </div>
    </footer>
  );
}
