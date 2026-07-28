import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { SITIO } from "@/lib/config";
import { CarritoProvider } from "@/lib/carrito";
import BannerPromesa from "@/components/layout/BannerPromesa";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import DrawerCarrito from "@/components/carrito/DrawerCarrito";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITIO.url),
  title: {
    default: `${SITIO.nombre} — Ropa interior mexicana de altísima calidad`,
    template: `%s · ${SITIO.nombre}`,
  },
  description: SITIO.descripcion,
  openGraph: {
    siteName: SITIO.nombre,
    locale: "es_MX",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-MX" className={`${fraunces.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <CarritoProvider>
          <BannerPromesa />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <DrawerCarrito />
        </CarritoProvider>
      </body>
    </html>
  );
}
