import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

// Locale-bewusste Varianten von Link, usePathname, useRouter und redirect.
// usePathname liefert den internen Pfad ohne Sprach-Präfix (z. B. "/leistungen").
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
