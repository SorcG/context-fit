import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Container from "@/components/Container";

export default function NotFound() {
  const t = useTranslations("NotFound");

  return (
    <section className="py-20 lg:py-32">
      <Container variant="narrow" className="flex flex-col items-start gap-5">
        <p className="text-sm font-semibold tracking-wide text-accent lg:text-base">
          404
        </p>
        <h1 className="text-3xl leading-[1.1] text-text lg:text-5xl">
          {t("title")}
        </h1>
        <p className="text-base leading-relaxed text-muted lg:text-lg">
          {t("body")}
        </p>
        <Link
          href="/"
          className="flex h-[52px] w-full items-center justify-center rounded-full border border-border px-6 text-base font-medium text-text transition-transform active:scale-95 lg:w-fit lg:px-8 lg:hover:scale-105 lg:hover:border-accent lg:hover:text-accent"
        >
          {t("home")}
        </Link>
      </Container>
    </section>
  );
}
