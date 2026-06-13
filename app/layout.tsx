import type { Metadata } from "next";
import { Geist, Geist_Mono, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import SiteHeader from "./components/layout/SiteHeader";
import Footer from "./components/layout/Footer";
import FloatingCta from "./components/layout/FloatingCta";
import LoadingScreen from "./components/layout/LoadingScreen";
import StyledComponentsRegistry from "./lib/registry";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "latin-ext"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin", "latin-ext"],
  weight: ["600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Scanova — Więcej opinii w Google",
  description:
    "Karty opinii Google z NFC i QR. Jedno dotknięcie telefonu i klient zostawia opinię — bez aplikacji, bez proszenia.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pl"
      className={`${geistSans.variable} ${geistMono.variable} ${bricolage.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <StyledComponentsRegistry>
          <LoadingScreen />
          <SiteHeader />
          {children}
          <Footer />
          <FloatingCta />
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
