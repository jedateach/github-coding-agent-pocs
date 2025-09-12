'use client'

import { useState, useEffect } from 'react'
import { UrqlProvider } from './urql-provider'

export function Providers({ children }: { children: React.ReactNode }) {
  const [mswReady, setMswReady] = useState(false)

  useEffect(() => {
    // Initialize MSW in browser and wait for it to be ready
    if (typeof window !== 'undefined') {
      import('@/mocks/browser').then(({ worker }) => {
        worker.start({
          onUnhandledRequest: 'bypass',
        }).then(() => {
          console.log('MSW worker started')
          setMswReady(true)
        })
      })
    } else {
      // On server, MSW is not needed
      setMswReady(true)
    }
  }, [])

  // Show loading state while MSW is initializing
  if (!mswReady) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-600">Initializing application...</p>
        </div>
      </div>
    )
  }

  return (
    <UrqlProvider>
      {children}
    </UrqlProvider>
  )
}