import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/tokens.css";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

const siteTitle = "Andy Na Régua — Barbearia em Balneário Camboriú";
const siteDescription =
  "Corte, barba e estética masculina em Balneário Camboriú. Agende online.";

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: "https://andynaregua.com.br",
    siteName: "Andy Na Régua",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Andy Na Régua — Barbearia em Balneário Camboriú",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/og-image.jpg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BarberShop",
  name: "Andy Na Régua",
  url: "https://andynaregua.com.br",
  image: "https://andynaregua.com.br/logo.png",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Rua 900, nº 41",
    addressLocality: "Balneário Camboriú",
    addressRegion: "SC",
    addressCountry: "BR",
  },
  telephone: "+55 47 99304942",
  openingHours: "Mo-Sa 08:00-22:00",
};

const preloadSkipScript = `try{if(sessionStorage.getItem('andy-na-regua-preload-shown')){var s=document.createElement('style');s.textContent='[data-preload-intro]{display:none!important}';document.head.appendChild(s)}}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=UnifrakturMaguntia&display=swap"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script dangerouslySetInnerHTML={{ __html: preloadSkipScript }} />
      </head>
      <body className="bg-bg-base text-text-primary antialiased">{children}</body>
    </html>
  );
}
