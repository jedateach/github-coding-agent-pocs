import type { Metadata } from "next";
import "./globals.css";
import { QueryProvider } from "./providers";
import { MocksProvider } from "@/components/MocksProvider";

export const metadata: Metadata = {
  title: "Data Fetching POC",
  description: "Proof of Concept for data fetching with Suspense and Error Boundaries",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        <MocksProvider>
          <QueryProvider>
            <main className="container mx-auto px-4 py-8">
              <header className="mb-8">
                <h1 className="text-3xl font-bold text-center">Data Fetching POC</h1>
                <p className="text-center text-muted-foreground mt-2">
                  React 19 + Next.js 15 with Suspense and TanStack Query
                </p>
              </header>
              <nav className="mb-8 flex justify-center gap-4">
                <a 
                  href="/profile" 
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                >
                  Profile (use() hook)
                </a>
                <a 
                  href="/accounts" 
                  className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 transition-colors"
                >
                  Accounts (TanStack Query)
                </a>
              </nav>
              {children}
            </main>
          </QueryProvider>
        </MocksProvider>
      </body>
    </html>
  );
}