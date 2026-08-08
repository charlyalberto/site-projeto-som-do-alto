import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Projeto Som do Alto | Música que Transforma Vidas",
  
  description:
    "Projeto Sociomusical Som do Alto: formação musical gratuita, inclusão social e desenvolvimento humano para crianças e adolescentes da Zona Norte do Recife.",

  keywords: [
    "Projeto Som do Alto",
    "Som do Alto",
    "projeto sociomusical",
    "música",
    "educação musical",
    "formação musical",
    "Recife",
    "Zona Norte do Recife",
    "musicalização infantil",
    "inclusão social",
    "ADHEPE",
  ],

  authors: [
    {
      name: "Projeto Som do Alto",
    },
  ],

  creator: "Projeto Som do Alto",

  publisher: "Projeto Som do Alto",

  metadataBase: new URL("https://projetosomdoalto.org.br"),

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "Projeto Som do Alto | Música que Transforma Vidas",

    description:
      "Transformando vidas através da música. Formação musical gratuita, inclusão social e desenvolvimento humano para crianças e adolescentes da Zona Norte do Recife.",

    url: "https://projetosomdoalto.org.br",

    siteName: "Projeto Som do Alto",

    locale: "pt_BR",

    type: "website",

    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 630,
        alt: "Projeto Som do Alto",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title:
      "Projeto Som do Alto | Música que Transforma Vidas",

    description:
      "Transformando vidas através da música na Zona Norte do Recife.",

    images: ["/images/logo.png"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        {children}
      </body>
    </html>
  );
}