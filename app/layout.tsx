import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ProofLoop",
  description: "Turn scattered work into visible career proof.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
