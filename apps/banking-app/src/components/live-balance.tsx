'use client'

import { useState, useEffect } from 'react'

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

  useEffect(() => {
    setCurrentBalance(initialBalance)
  }, [initialBalance])

  useEffect(() => {
    // Simulate real-time balance updates with polling
    const interval = setInterval(() => {
      // Simulate balance changes (in a real app, this would come from subscriptions)
      const change = Math.floor(Math.random() * 10000 - 5000) // Random change between -$50 and $50
      setCurrentBalance(prev => Math.max(0, prev + change)) // Don't go below 0
      setIsLive(true)
    }, 8000) // Update every 8 seconds

    return () => clearInterval(interval)
  }, [accountId])

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
          Balance updating in real-time
        </p>
      )}
    </div>
  )
}