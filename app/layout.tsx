import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Klaropoint | Trusted Clinical Data Operations",
  description:
    "Klaropoint helps ambulatory clinics validate clinical data, support payer reconciliation, and maintain audit-ready operational records.",
  metadataBase: new URL("https://klaropoint.com"),
  openGraph: {
    title: "Klaropoint | Trusted Clinical Data Operations",
    description:
      "Structured data integrity, payer reconciliation, and audit-ready workflows for ambulatory clinics.",
    url: "https://klaropoint.com",
    siteName: "Klaropoint",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
