import type { Metadata, Viewport } from "next";
import { Unbounded, DM_Sans } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import BottomTabNav from "@/components/BottomTabNav";
import "./globals.css";

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin"],
  weight: ["700", "800"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Context Fit — Bram van Koppen | Personal Coach Paderborn",
  description:
    "Dein Partner auf dem Weg zu einem gesünderen, fitteren Leben. Online Coaching, Personal Training und Grappling Training mit Bram van Koppen in Paderborn.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#0d0d0f",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      className={`${unbounded.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg text-text pb-24">
        <SmoothScroll>{children}</SmoothScroll>
        <BottomTabNav />
      </body>
    </html>
  );
}
