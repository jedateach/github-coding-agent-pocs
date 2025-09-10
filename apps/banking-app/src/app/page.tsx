import { PartyProvider } from '@/components/party-provider'
import { PartySelector } from '@/components/party-selector'
import { AccountsList } from '@/components/accounts-list'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRightLeft, Send } from 'lucide-react'

export default function HomePage() {
  return (
    <PartyProvider>
      <main className="container mx-auto py-8">
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Banking Dashboard</h1>
            <div className="flex items-center space-x-4">
              <PartySelector />
            </div>
          </div>
          
          {/* Quick Actions */}
          <div className="flex space-x-4">
            <Button asChild>
              <Link href="/transfer">
                <ArrowRightLeft className="w-4 h-4 mr-2" />
                Transfer Money
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/payment">
                <Send className="w-4 h-4 mr-2" />
                Send Payment
              </Link>
            </Button>
          </div>
          
          <AccountsList />
        </div>
      </main>
    </PartyProvider>
  )
}