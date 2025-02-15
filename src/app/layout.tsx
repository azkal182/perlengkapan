import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Perlengkapan Widodari 1.3",
  description: "Perlengkapan Widodari 1.3",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` antialiased`}>{children}</body>
    </html>
  );
}
