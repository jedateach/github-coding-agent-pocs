"use client";

import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  TooltipProps,
} from "recharts";
import { useSubscribeToAccountBalanceSubscription } from "@/lib/gql/urql";

interface BalanceDataPoint {
  timestamp: string;
  timestampMs: number;
  balance: number;
  time: string; // formatted time for display
}

interface BalanceChartProps {
  accountId: string;
  initialBalance: number;
  className?: string;
}

const DAY_MS = 24 * 60 * 60 * 1000; // 24 hours

function formatCurrency(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);
}

function formatTime(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(date);
}

export function BalanceChart({
  accountId,
  initialBalance,
  className,
}: BalanceChartProps) {
  const [balanceHistory, setBalanceHistory] = useState<BalanceDataPoint[]>(
    () => {
      const now = new Date();
      const dayAgo = new Date(now.getTime() - DAY_MS);
      // Seed with a baseline point 24h ago so the time axis spans the full window
      return [
        {
          timestamp: dayAgo.toISOString(),
          timestampMs: dayAgo.getTime(),
          balance: initialBalance,
          time: formatTime(dayAgo),
        },
        {
          timestamp: now.toISOString(),
          timestampMs: now.getTime(),
          balance: initialBalance,
          time: formatTime(now),
        },
      ];
    }
  );
  const [isLive, setIsLive] = useState(false);

  // Subscribe to balance updates using GraphQL SSE subscription
  const [subscriptionResult] = useSubscribeToAccountBalanceSubscription(
    { variables: { accountId } },
    (prev, data) => {
      if (data?.accountBalanceUpdated?.balance !== undefined) {
        const now = new Date();
        const newDataPoint: BalanceDataPoint = {
          timestamp: now.toISOString(),
          timestampMs: now.getTime(),
          balance: data.accountBalanceUpdated.balance,
          time: formatTime(now),
        };

        setBalanceHistory((prev) => {
          // Keep only points from the last 24 hours (and cap to 500 to avoid unbounded growth)
          const cutoff = now.getTime() - DAY_MS;
          const newHistory = [...prev, newDataPoint].filter(
            (p) => p.timestampMs >= cutoff
          );
          return newHistory.slice(-500);
        });
        setIsLive(true);
      }
      return data;
    }
  );

  // Custom tooltip component for the chart
  const CustomTooltip = ({
    active,
    payload,
    label,
  }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      const ts = typeof label === "number" ? label : Number(label);
      const labelTime = Number.isFinite(ts)
        ? new Intl.DateTimeFormat("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }).format(new Date(ts))
        : String(label);
      return (
        <div className="bg-white p-3 border border-gray-200 rounded shadow-lg">
          <p className="text-sm text-gray-600">{`Time: ${labelTime}`}</p>
          <p className="text-sm font-semibold">
            {`Balance: ${formatCurrency(payload[0].value || 0)}`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Balance Trend</h3>
        {isLive && (
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-green-600 font-medium">
              LIVE UPDATES
            </span>
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
              dataKey="timestampMs"
              type="number"
              scale="time"
              domain={["dataMin", "dataMax"]}
              tickFormatter={(value) => {
                const n = typeof value === "number" ? value : Number(value);
                if (!Number.isFinite(n)) return "";
                const d = new Date(n);
                if (Number.isNaN(d.getTime())) return "";
                return new Intl.DateTimeFormat("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                }).format(d);
              }}
              tick={{ fontSize: 12 }}
              interval="preserveStartEnd"
            />
            <YAxis
              tickFormatter={(value) => formatCurrency(value)}
              tick={{ fontSize: 12 }}
              domain={["dataMin - 100", "dataMax + 100"]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="balance"
              stroke="#10b981"
              strokeWidth={2}
              dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
              activeDot={{
                r: 6,
                stroke: "#10b981",
                strokeWidth: 2,
                fill: "#fff",
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-2 text-xs text-muted-foreground">
        {isLive ? (
          <p>
            Real-time balance updates via SSE subscription • Showing last 24 hours
          </p>
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
  );
}
