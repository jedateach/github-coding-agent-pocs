import './globals.css'
import type { Metadata } from 'next'
import { Providers } from '../components/providers'
import { AppHeader } from '../components/app-header'
import { PartyProvider } from '../components/party-provider'

export const metadata: Metadata = {
  title: 'Banking POC - GraphQL Demo',
  description: 'A proof-of-concept banking application demonstrating GraphQL with Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans">
        <Providers>
          <PartyProvider>
            <AppHeader />
            <main className="min-h-screen">
              {children}
            </main>
          </PartyProvider>
        </Providers>
      </body>
    </html>
  )
}