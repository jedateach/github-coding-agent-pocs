import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Next.js + NGINX Runtime Config Demo",
  description: "Demonstrating runtime configuration with Next.js and NGINX",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Placeholder for runtime config injection by NGINX */}
        <script dangerouslySetInnerHTML={{
          __html: 'window.__CONFIG__ = {};'
        }} />
      </head>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
