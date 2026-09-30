import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";
import deMessages from "../messages/de.json";

type MessageTree = { [key: string]: string | MessageTree };

// Deutsch ist Basis: fehlt in einer anderen Sprache ein Key, erscheint der
// deutsche Text statt eines Key-Namens.
function withFallback(base: MessageTree, override: MessageTree): MessageTree {
  const result: MessageTree = { ...base };
  for (const [key, value] of Object.entries(override)) {
    const baseValue = base[key];
    result[key] =
      typeof value === "object" && typeof baseValue === "object"
        ? withFallback(baseValue, value)
        : value;
  }
  return result;
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  if (locale === routing.defaultLocale) {
    return { locale, messages: deMessages };
  }

  const localeMessages = (await import(`../messages/${locale}.json`)).default;
  return { locale, messages: withFallback(deMessages, localeMessages) };
});
