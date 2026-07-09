import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const cabinet = localFont({
  src: "./fonts/CabinetGrotesk-Variable.woff2",
  variable: "--font-cabinet",
  weight: "100 1000",
  display: "swap",
});

// Italic variant intentionally not loaded — nothing on the site uses italics.
// If a real editorial italic moment appears, add Satoshi-VariableItalic.woff2
// back here (the file stays in app/fonts).
const satoshi = localFont({
  src: "./fonts/Satoshi-Variable.woff2",
  weight: "300 900",
  variable: "--font-satoshi",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Hunter Espaniola · Real Estate Media, Southern Utah",
    template: "%s · Hunter Espaniola",
  },
  description:
    "FAA-certified aerial and ground videography for Southern Utah listings. Cinematic property films that help homes near Zion, St. George, and Washington County sell faster. Starting at $500.",
  metadataBase: new URL("https://hunterespaniola.com"),
  openGraph: {
    title: "Hunter Espaniola · Real Estate Media, Southern Utah",
    description:
      "FAA-certified aerial and ground videography for Southern Utah listings. Starting at $500 per property.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cabinet.variable} ${satoshi.variable}`}>
      <body className="min-h-svh">{children}</body>
    </html>
  );
}
