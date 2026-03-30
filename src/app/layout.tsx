import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cypher | Sports intelligence for producers",
  description:
    "Walk in with the angle before anyone else sees it. Cypher surfaces converging signals and turns them into pitch-ready takes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Source+Sans+3:wght@400;500;600;700&family=JetBrains+Mono:wght@400;600&family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
