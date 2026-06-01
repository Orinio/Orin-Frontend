import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ORIN - Turn Work Into Career Proof",
  description: "Transform your scattered work into verified career proof. AI coach, proof cards, and real opportunities.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <head>
        <style>
          {`
            @import url('https://fonts.googleapis.com/css2?family=Georgia:ital,wght@0,400;0,700&display=swap');
          `}
        </style>
      </head>
      <body className="min-h-full bg-white text-gray-900">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
