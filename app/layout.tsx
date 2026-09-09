import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter, Caveat } from "next/font/google";
import "./globals.css";
import { birthdayPerson } from "./content";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: `HelLo, Stranger — for ${birthdayPerson}`,
  description:
    "A one-of-a-kind interactive birthday experience — a single unfolding evening told in light, type and 3D form.",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#FBF6ED",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} ${caveat.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
