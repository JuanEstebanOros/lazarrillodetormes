import type { Metadata } from "next";
import { Poppins, Work_Sans } from "next/font/google";
import GooeyFilter from "@/components/GooeyFilter";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Institución Educativa Lazarillo de Tormes | Puerto Carreño, Vichada",
  description:
    "Institución educativa privada en Puerto Carreño, Vichada. Educamos con amor, formamos en valores y sembramos autonomía desde preescolar hasta bachillerato.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${poppins.variable} ${workSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-ink">
        <GooeyFilter />
        {children}
      </body>
    </html>
  );
}
