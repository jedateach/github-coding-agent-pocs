'use client'

import { useState, useEffect } from 'react'
import { useSubscribeToAccountBalanceSubscription } from '@/lib/gql/urql'

interface LiveBalanceProps {
  accountId: string
  initialBalance: number
  className?: string
}

function formatCurrency(cents: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(cents / 100)
}

export function LiveBalance({ accountId, initialBalance, className }: LiveBalanceProps) {
  const [currentBalance, setCurrentBalance] = useState(initialBalance)
  const [isLive, setIsLive] = useState(false)

  // Subscribe to balance updates using GraphQL SSE subscription
  const [subscriptionResult] = useSubscribeToAccountBalanceSubscription(
    { variables: { accountId } },
    (prev, data) => {
      if (data?.accountBalanceUpdated?.balance !== undefined) {
        setCurrentBalance(data.accountBalanceUpdated.balance)
        setIsLive(true)
      }
      return data
    }
  )

  useEffect(() => {
    setCurrentBalance(initialBalance)
  }, [initialBalance])

  return (
    <div className={className}>
      <div className="flex items-center gap-2">
        <span className="text-2xl font-bold">
          {formatCurrency(currentBalance)}
        </span>
        {isLive && (
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-green-600 font-medium">LIVE</span>
          </div>
        )}
      </div>
      {isLive && (
        <p className="text-xs text-muted-foreground mt-1">
          Balance updating via SSE subscription
        </p>
      )}
      {subscriptionResult.error && (
        <p className="text-xs text-red-500 mt-1">
          Subscription error: {subscriptionResult.error.message}
        </p>
      )}
    </div>
  )
}