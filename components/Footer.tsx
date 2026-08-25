export default function Footer() {
  return (
    <footer id="site-footer" className="border-t border-border py-8 lg:py-10">
      <div className="mx-auto flex w-full max-w-[480px] flex-col items-center gap-1 px-5 text-center lg:max-w-[720px] lg:px-10">
        <p className="text-sm font-semibold text-text lg:text-base">
          Context Fit
        </p>
        <p className="text-xs text-muted lg:text-sm">
          Bram van Koppen · Paderborn
        </p>
      </div>
    </footer>
  );
}
