import type { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const handleI18nRouting = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  const response = handleI18nRouting(request);

  // next-intl verweist per Link-Header (hreflang) auf alle Sprachvarianten.
  // Prävention gibt es nur auf Deutsch, die EN/NL-Varianten wären 404.
  if (/^\/de\/praevention\/?$/.test(request.nextUrl.pathname)) {
    response.headers.delete("link");
  }

  return response;
}

export const config = {
  // Alles außer API, Next-Interna und Dateien mit Endung (z. B. /images/*.jpeg).
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
