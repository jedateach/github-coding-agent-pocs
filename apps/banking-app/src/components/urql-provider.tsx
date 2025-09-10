'use client'

import { Client, Provider, cacheExchange, fetchExchange, subscriptionExchange } from 'urql'
import { useMemo } from 'react'

// Setup for SSE-based subscriptions (demo purposes)
const subscriptionForwarder = (operation: any) => {
  return new EventSource(`/api/graphql/stream?query=${encodeURIComponent(operation.query)}`)
}

export function UrqlProvider({ children }: { children: React.ReactNode }) {
  const client = useMemo(() => {
    return new Client({
      url: '/api/graphql',
      exchanges: [
        cacheExchange,
        fetchExchange,
        subscriptionExchange({
          forwardSubscription: subscriptionForwarder,
          enableAllOperations: true,
        }),
      ],
    })
  }, [])

  return <Provider value={client}>{children}</Provider>
}