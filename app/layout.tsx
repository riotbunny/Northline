import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Northline Client Partners | Remote Call Center Outsourcing",
  description:
    "Northline Client Partners provides remote call center outsourcing for companies that need customer service, scheduling, sales support, overflow, and seasonal call coverage.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
