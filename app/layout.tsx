import type { Metadata, Viewport } from "next";
import { Space_Mono, Caveat, Parisienne, EB_Garamond } from "next/font/google";
import "./globals.css";
import { siteDescription, siteTitle, siteUrl } from "@/lib/site";

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

const garamond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-garamond",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
  applicationName: siteTitle,
  authors: [{ name: "Ayle", url: "https://github.com/ayliee" }],
  creator: "Ayle",
  alternates: { canonical: "/" },
  openGraph: {
    // siteName is intentionally omitted, it renders as a second heading
    // above the title in Discord and Slack unfurls.
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    type: "website",
    images: [
      {
        url: "/icon.png",
        width: 256,
        height: 256,
        alt: siteTitle,
      },
    ],
  },
  twitter: {
    // summary keeps the icon as a small square on the right of the card
    card: "summary",
    title: siteTitle,
    description: siteDescription,
    images: ["/icon.png"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#FBF8EC",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${mono.variable} ${hand.variable} ${script.variable} ${garamond.variable}`}>
      <body className="font-mono antialiased">{children}</body>
    </html>
  );
}
