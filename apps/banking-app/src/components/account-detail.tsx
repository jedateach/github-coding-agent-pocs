"use client";

import { useState, useEffect } from "react";
import { useGetAccountQuery } from "@/lib/gql/urql";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { LiveBalance } from "./live-balance";
import { BalanceChart } from "./balance-chart";

import Link from "next/link";
import { ArrowLeft, RefreshCw } from "lucide-react";

interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  balanceAfter: number;
}

function formatCurrency(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);
}

function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(dateString));
}

function getAccountTypeLabel(type: string): string {
  switch (type) {
    case "CHECKING":
      return "Checking";
    case "SAVINGS":
      return "Savings";
    case "CREDIT":
      return "Credit";
    default:
      return type;
  }
}

interface AccountDetailProps {
  accountId: string;
}

export function AccountDetail({ accountId }: AccountDetailProps) {
  const [transactionOffset, setTransactionOffset] = useState(0);
  const [allTransactions, setAllTransactions] = useState<Transaction[]>([]);

  const [{ data, fetching, error }, refetch] = useGetAccountQuery({
    variables: {
      id: accountId,
      transactionLimit: 30,
      transactionOffset,
    },
  });

  useEffect(() => {
    if (data?.account?.transactions) {
      if (transactionOffset === 0) {
        // First load, replace all transactions
        setAllTransactions(data.account.transactions);
      } else {
        // Subsequent loads, append new transactions
        setAllTransactions((prev) => [...prev, ...data.account!.transactions]);
      }
    }
  }, [data, transactionOffset]);

  const loadMoreTransactions = () => {
    setTransactionOffset((prev) => prev + 30);
  };

  if (fetching && transactionOffset === 0) {
    return (
      <div className="container mx-auto py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-8 bg-gray-200 rounded w-1/2"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-8">
        <Card>
          <CardContent className="p-6">
            <p className="text-red-600">
              Error loading account details: {error.message}
            </p>
            <Button onClick={() => refetch()} className="mt-4">
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!data?.account) {
    return (
      <div className="container mx-auto py-8">
        <Card>
          <CardContent className="p-6">
            <p className="text-muted-foreground">Account not found</p>
            <Button asChild className="mt-4">
              <Link href="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Accounts
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const { account } = data;

  return (
    <div className="container mx-auto py-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" asChild>
          <Link href="/">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Accounts
          </Link>
        </Button>

        <Button
          variant="outline"
          onClick={() => {
            setTransactionOffset(0);
            setAllTransactions([]);
            refetch();
          }}
          disabled={fetching}
        >
          <RefreshCw
            className={`w-4 h-4 mr-2 ${fetching ? "animate-spin" : ""}`}
          />
          Refresh
        </Button>
      </div>

      {/* Account Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>{account.name}</span>
            <span className="text-sm font-normal px-3 py-1 bg-secondary rounded">
              {getAccountTypeLabel(account.type)}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div>
              <p className="text-sm text-muted-foreground">Account ID</p>
              <p className="font-mono">{account.id}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Current Balance</p>
              <LiveBalance
                accountId={account.id}
                initialBalance={account.balance}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Balance Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Real-time Balance Chart</CardTitle>
        </CardHeader>
        <CardContent>
          <BalanceChart
            accountId={account.id}
            initialBalance={account.balance}
          />
        </CardContent>
      </Card>

      {/* Historical Transactions */}
      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
        </CardHeader>
        <CardContent>
          {allTransactions.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              No transactions found
            </p>
          ) : (
            <div className="space-y-4">
              {allTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="space-y-1">
                    <p className="font-medium">{transaction.description}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(transaction.date)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p
                      className={`font-semibold ${
                        transaction.amount > 0
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {transaction.amount > 0 ? "+" : ""}
                      {formatCurrency(transaction.amount)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Balance: {formatCurrency(transaction.balanceAfter)}
                    </p>
                  </div>
                </div>
              ))}

              {/* Load More Button */}
              <div className="text-center pt-4">
                <Button
                  variant="outline"
                  onClick={loadMoreTransactions}
                  disabled={fetching}
                >
                  {fetching ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    "Load More Transactions"
                  )}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
