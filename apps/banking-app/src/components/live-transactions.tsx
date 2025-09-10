'use client'

import { useState, useEffect } from 'react'

interface Transaction {
  id: string
  date: string
  description: string
  amount: number
  balanceAfter: number
}

interface LiveTransactionsProps {
  accountId: string
  onNewTransaction?: (transaction: Transaction) => void
  className?: string
}

function formatCurrency(cents: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(cents / 100)
}

function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(dateString))
}

export function LiveTransactions({ accountId, onNewTransaction, className }: LiveTransactionsProps) {
  const [liveTransactions, setLiveTransactions] = useState<Transaction[]>([])
  const [isLive, setIsLive] = useState(false)

  useEffect(() => {
    // Simulate real-time transaction updates with polling
    const interval = setInterval(() => {
      const newTransaction: Transaction = {
        id: `txn-live-${Date.now()}`,
        date: new Date().toISOString(),
        description: 'Live transaction update',
        amount: Math.floor(Math.random() * 10000 - 5000),
        balanceAfter: Math.floor(Math.random() * 1000000),
      }
      
      setLiveTransactions(prev => [newTransaction, ...prev].slice(0, 5)) // Keep only last 5 live transactions
      setIsLive(true)
      onNewTransaction?.(newTransaction)
    }, 12000) // New transaction every 12 seconds

    return () => clearInterval(interval)
  }, [accountId, onNewTransaction])

  if (!isLive || liveTransactions.length === 0) {
    return null
  }

  return (
    <div className={className}>
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        <h3 className="text-lg font-semibold text-green-600">Live Transactions</h3>
      </div>
      
      <div className="space-y-3">
        {liveTransactions.map((transaction, index) => (
          <div
            key={transaction.id}
            className={`flex items-center justify-between p-3 rounded-lg border-l-4 border-green-500 bg-green-50 dark:bg-green-950 transition-all duration-300 ${
              index === 0 ? 'animate-pulse' : ''
            }`}
          >
            <div className="space-y-1">
              <p className="font-medium text-green-900 dark:text-green-100">
                {transaction.description}
              </p>
              <p className="text-sm text-green-700 dark:text-green-300">
                {formatDate(transaction.date)}
              </p>
            </div>
            <div className="text-right">
              <p className={`font-semibold ${
                transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {transaction.amount > 0 ? '+' : ''}
                {formatCurrency(transaction.amount)}
              </p>
              <p className="text-sm text-green-700 dark:text-green-300">
                Balance: {formatCurrency(transaction.balanceAfter)}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      <p className="text-xs text-green-600 mt-3 text-center">
        Real-time transaction updates
      </p>
    </div>
  )
}