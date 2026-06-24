import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/tokens.css";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Andy Na Régua — Barbearia em Balneário Camboriú",
  description:
    "Corte, barba e estética masculina em Balneário Camboriú. Agende online.",
};

// Script blocking: roda antes do React montar. Se a sessão já viu o preload,
// injeta uma <style> tag escondendo o overlay imediatamente.
// Importante: injetamos style em vez de adicionar classe no <html> porque o React
// rastreia atributos do <html> e geraria erro de hydration mismatch.
const preloadSkipScript = `try{if(sessionStorage.getItem('andy-na-regua-preload-shown')){var s=document.createElement('style');s.textContent='[data-preload-intro]{display:none!important}';document.head.appendChild(s)}}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <head>
        {/* Fallback blackletter via Google Fonts (nome canônico preservado).
            O @font-face em tokens.css carrega a Cloister Black local; este é o fallback. */}
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
        <script dangerouslySetInnerHTML={{ __html: preloadSkipScript }} />
      </head>
      <body className="bg-bg-base text-text-primary antialiased">{children}</body>
    </html>
  );
}
