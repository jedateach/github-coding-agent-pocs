'use client'

import { Client, Provider, cacheExchange, fetchExchange } from 'urql'
import { useMemo } from 'react'

export function UrqlProvider({ children }: { children: React.ReactNode }) {
  const client = useMemo(() => {
    return new Client({
      url: '/api/graphql',
      exchanges: [
        cacheExchange,
        fetchExchange,
        // Note: For this demo, subscriptions are simulated via MSW
        // In a real app, you'd add subscriptionExchange with proper SSE or WebSocket setup
      ],
    })
  }, [])

  return <Provider value={client}>{children}</Provider>
}