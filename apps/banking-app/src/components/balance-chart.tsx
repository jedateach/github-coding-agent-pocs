'use client'

import { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps } from 'recharts'
import { useSubscribeToAccountBalanceSubscription } from '@/lib/gql/urql'

interface BalanceDataPoint {
  timestamp: string
  balance: number
  time: string // formatted time for display
}

interface BalanceChartProps {
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

function formatTime(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(date)
}

export function BalanceChart({ accountId, initialBalance, className }: BalanceChartProps) {
  const [balanceHistory, setBalanceHistory] = useState<BalanceDataPoint[]>(() => {
    const now = new Date()
    return [{
      timestamp: now.toISOString(),
      balance: initialBalance,
      time: formatTime(now)
    }]
  })
  const [isLive, setIsLive] = useState(false)

  // Subscribe to balance updates using GraphQL SSE subscription
  const [subscriptionResult] = useSubscribeToAccountBalanceSubscription(
    { variables: { accountId } },
    (prev, data) => {
      if (data?.accountBalanceUpdated?.balance !== undefined) {
        const now = new Date()
        const newDataPoint: BalanceDataPoint = {
          timestamp: now.toISOString(),
          balance: data.accountBalanceUpdated.balance,
          time: formatTime(now)
        }
        
        setBalanceHistory(prev => {
          // Keep only the last 20 data points to prevent the chart from becoming too cluttered
          const newHistory = [...prev, newDataPoint]
          return newHistory.slice(-20)
        })
        setIsLive(true)
      }
      return data
    }
  )

  // Custom tooltip component for the chart
  const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded shadow-lg">
          <p className="text-sm text-gray-600">{`Time: ${label}`}</p>
          <p className="text-sm font-semibold">
            {`Balance: ${formatCurrency(payload[0].value || 0)}`}
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Balance Trend</h3>
        {isLive && (
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-green-600 font-medium">LIVE UPDATES</span>
          </div>
        )}
      </div>
      
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={balanceHistory}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis 
              dataKey="time"
              tick={{ fontSize: 12 }}
              interval="preserveStartEnd"
            />
            <YAxis 
              tickFormatter={(value) => formatCurrency(value)}
              tick={{ fontSize: 12 }}
              domain={['dataMin - 100', 'dataMax + 100']}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="balance" 
              stroke="#10b981" 
              strokeWidth={2}
              dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#10b981', strokeWidth: 2, fill: '#fff' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-2 text-xs text-muted-foreground">
        {isLive ? (
          <p>Real-time balance updates via SSE subscription • Showing last 20 data points</p>
        ) : (
          <p>Waiting for live balance updates...</p>
        )}
      </div>
      
      {subscriptionResult.error && (
        <p className="text-xs text-red-500 mt-1">
          Chart subscription error: {subscriptionResult.error.message}
        </p>
      )}
    </div>
  )
}