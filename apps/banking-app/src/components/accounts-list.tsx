'use client'

import { useParty } from './party-provider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { LiveBalance } from './live-balance'
import Link from 'next/link'

function getAccountTypeLabel(type: string): string {
  switch (type) {
    case 'CHECKING':
      return 'Checking'
    case 'SAVINGS':
      return 'Savings'
    case 'CREDIT':
      return 'Credit'
    default:
      return type
  }
}

export function AccountsList() {
  const { selectedParty } = useParty()

  if (!selectedParty) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Select a party to view accounts</p>
      </div>
    )
  }

  if (!selectedParty.accounts || selectedParty.accounts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No accounts found for this party</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">
        Accounts for {selectedParty.name}
      </h2>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {selectedParty.accounts.map((account) => (
          <Card key={account.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{account.name}</span>
                <span className="text-sm font-normal px-2 py-1 bg-secondary rounded">
                  {getAccountTypeLabel(account.type)}
                </span>
              </CardTitle>
              <CardDescription>
                Account ID: {account.id}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Current Balance</p>
                  <LiveBalance 
                    accountId={account.id}
                    initialBalance={account.balance}
                  />
                </div>
                
                <Button asChild className="w-full">
                  <Link href={`/account/${account.id}`}>
                    View Details
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}