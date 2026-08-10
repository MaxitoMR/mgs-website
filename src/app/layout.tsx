import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { COMPANY, GA_ID } from "@/lib/constants";
import Script from "next/script";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

/**
 * Next emits `width=device-width, initial-scale=1` from this by default, which
 * is what we want and what stays. No `maximumScale` and no `userScalable: false`
 * — those would stop iOS force-zooming an undersized input, but only by taking
 * pinch-zoom away from everyone, which fails WCAG 1.4.4. The zoom problem is
 * solved properly in globals.css by giving every control a 16px floor.
 *
 * `themeColor` paints the mobile address bar and the task-switcher card in the
 * brand green instead of browser-default chrome — the page reads as an MGS
 * surface from the first frame, before any of it has rendered.
 */
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#80B515" },
    { media: "(prefers-color-scheme: dark)", color: "#111111" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(COMPANY.url),
  title: {
    default: `${COMPANY.name} - ${COMPANY.tagline}`,
    template: `%s | ${COMPANY.name}`,
  },
  description: COMPANY.description,
  keywords: [
    "janitorial services",
    "commercial cleaning",
    "medical facility cleaning",
    "industrial cleaning",
    "facility management",
    "professional cleaning services",
    "Houston cleaning company",
    "Katy TX janitorial",
    "office cleaning Houston",
    "surgery center cleaning",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: COMPANY.url,
    siteName: COMPANY.name,
    title: `${COMPANY.name} - ${COMPANY.tagline}`,
    description: COMPANY.description,
    images: [
      {
        url: "/og-image.png",
        width: 800,
        height: 800,
        alt: "MGS Supply & Services — Total Janitorial Management",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${COMPANY.name} - ${COMPANY.tagline}`,
    description: COMPANY.description,
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
    ],
    apple: [
      { url: "/favicon.png" },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: COMPANY.url,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={manrope.variable}>
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
            gtag('event', 'conversion', {'send_to': '${GA_ID}/KuCrCPWB5vUbEICD9Jkp'});
          `}
        </Script>
      </head>
      <body className="min-h-screen bg-paper text-gray-800 antialiased font-light">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
