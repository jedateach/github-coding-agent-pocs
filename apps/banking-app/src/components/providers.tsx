'use client'

import { UrqlProvider } from './urql-provider'

export function Providers({ children }: { children: React.ReactNode }) {
  // Initialize MSW in browser
  if (typeof window !== 'undefined') {
    import('@/mocks/browser').then(({ worker }) => {
      worker.start({
        onUnhandledRequest: 'bypass',
      })
    })
  }

  return (
    <UrqlProvider>
      {children}
    </UrqlProvider>
  )
}