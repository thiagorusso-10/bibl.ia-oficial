import type { Metadata } from "next";
import { Space_Grotesk, Merriweather } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { SWRegister } from "@/components/pwa/sw-register";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const merriweather = Merriweather({
  variable: "--font-reading",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

const rawUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
const appUrl = rawUrl.startsWith("http") ? rawUrl : `https://${rawUrl}`;

export const metadata: Metadata = {
  metadataBase: new URL(appUrl),
  title: {
    default: "BIBL.IA OFICIAL — Estudo Teológico & Fun Bible Kids",
    template: "%s | BIBL.IA OFICIAL",
  },
  description:
    "Plataforma de ensino teológico para jovens e adultos, com área dedicada de atividades bíblicas para crianças.",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: "BIBL.IA OFICIAL",
  },
  twitter: {
    card: "summary_large_image",
    title: "BIBL.IA OFICIAL",
    description: "Estudo Teológico & Fun Bible Kids",
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "BIBL.IA",
  },
};

export const viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false, // App-like feel
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="pt-BR" suppressHydrationWarning>
        <body
          suppressHydrationWarning
          className={`${spaceGrotesk.variable} ${merriweather.variable} bg-zinc-50 text-black antialiased font-sans`}
        >
          <SWRegister />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
