import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cuadros de navegación | Arte marino",
  description: "Colección de cuadros inspirados en el mar y la navegación. Láminas y lienzos artísticos minimalistas.",
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${playfair.variable} scroll-smooth`}>
      <body className="antialiased bg-white text-[#0B1F3A] font-sans selection:bg-[#3A6EA5] selection:text-white">
        {children}
      </body>
    </html>
  );
}
