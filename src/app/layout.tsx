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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body className="bg-bg-base text-text-primary antialiased">{children}</body>
    </html>
  );
}
