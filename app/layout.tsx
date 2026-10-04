import type { Metadata, Viewport } from "next";
import { Space_Mono, Caveat, Parisienne } from "next/font/google";
import "./globals.css";

const mono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
  display: "swap",
});

const hand = Caveat({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-hand",
  display: "swap",
});

const script = Parisienne({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-script",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ayle / Meow",
  description:
    "life is lowkey a string of memories, has anything ever remained besides them?",
  openGraph: {
    title: "Ayle / Meow",
    description:
      "life is lowkey a string of memories, has anything ever remained besides them?",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#FBF8EC",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${mono.variable} ${hand.variable} ${script.variable}`}>
      <body className="font-mono antialiased">{children}</body>
    </html>
  );
}
