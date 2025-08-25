import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Profile Display - Microfrontend Demo",
  description: "User profile display zone in Next.js microfrontend architecture",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background font-sans antialiased">
        <header className="border-b">
          <div className="container mx-auto px-4 py-4">
            <h1 className="text-2xl font-bold">Profile Display Zone</h1>
            <p className="text-sm text-muted-foreground">Microfrontend Demo</p>
          </div>
        </header>
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}