import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
const ppNeueCorp = localFont({
  src: "./fonts/PPNeueCorp-TightVariable.ttf",
  variable: "--font-pp-neue-corp-tight",
  weight: "100 900",
});
const maisonNeue = localFont({
  src: [
    { path: "./fonts/Maison Neue Book.otf",  weight: "400", style: "normal" },
    { path: "./fonts/Maison Neue Demi.otf",  weight: "600", style: "normal" },
    { path: "./fonts/Maison Neue Bold.otf",  weight: "700", style: "normal" },
  ],
  variable: "--font-maison-neue",
});

export const metadata: Metadata = {
  title: "Design System Starter",
  description: "A Next.js design system starter with shadcn/ui",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${ppNeueCorp.variable} ${maisonNeue.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}