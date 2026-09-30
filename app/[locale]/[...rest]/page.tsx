import { notFound } from "next/navigation";

// Fängt alle unbekannten Pfade unterhalb einer Sprache ab, damit die
// lokalisierte not-found.tsx greift statt der Next.js-Standardseite.
export default function CatchAllPage() {
  notFound();
}
