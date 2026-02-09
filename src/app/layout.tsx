import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import Providers from "./providers";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"]
});

export const metadata: Metadata = {
  title: "Scanbo Scribe AI",
  description:
    "Effortlessly create comprehensive and accurate patient notes from your voice recordings"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
