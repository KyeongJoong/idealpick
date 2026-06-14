import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://idealpick.vercel.app";
const ADSENSE_ID = process.env.NEXT_PUBLIC_ADSENSE_ID ?? "";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Ideal Pick — Ultimate Worldcup Bracket Game",
  description:
    "Pick your ultimate favourite in 1v1 bracket tournaments! Marvel, Anime, Disney, K-POP, Pokémon, Football, and more. Free to play, fun to share!",
  keywords: [
    "ideal type worldcup", "worldcup bracket game", "1v1 pick game",
    "anime worldcup", "marvel worldcup", "kpop worldcup", "pokemon worldcup",
    "이상형 월드컵", "アニメ 総選挙", "disney worldcup", "taylor swift worldcup",
    "football worldcup game", "who would you rather", "pick one game",
  ],
  openGraph: {
    title: "Ideal Pick 🏆 Pick Your Ultimate Favourite!",
    description: "1v1 bracket tournaments for Marvel, Anime, K-POP, Disney, Pokémon & more. Who wins?",
    url: SITE_URL,
    siteName: "Ideal Pick",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ideal Pick 🏆",
    description: "1v1 bracket tournaments — Marvel, Anime, K-POP, Pokémon & more. Who is #1?",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: SITE_URL },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#4F46E5",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {ADSENSE_ID && (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ID}`}
            crossOrigin="anonymous"
          />
        )}
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Ideal Pick",
              url: SITE_URL,
              description: "1v1 bracket tournaments for Marvel, Anime, K-POP, Pokémon, Disney, Football, and more.",
              inLanguage: "en",
              potentialAction: {
                "@type": "SearchAction",
                target: { "@type": "EntryPoint", urlTemplate: `${SITE_URL}/?q={search_term_string}` },
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
