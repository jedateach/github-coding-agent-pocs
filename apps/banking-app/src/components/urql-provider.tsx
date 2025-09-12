'use client'

import { Client, Provider, cacheExchange, fetchExchange } from 'urql'
import { useMemo } from 'react'
import { sseSubscriptionExchange } from '@/lib/sse-exchange'

export function UrqlProvider({ children }: { children: React.ReactNode }) {
  const client = useMemo(() => {
    return new Client({
      url: '/api/graphql',
      exchanges: [
        cacheExchange,
        fetchExchange,
        sseSubscriptionExchange({
          url: '/api/graphql-sse',
        }),
      ],
    })
  }, [])

  return <Provider value={client}>{children}</Provider>
}