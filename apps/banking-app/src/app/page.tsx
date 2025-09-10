import { PartyProvider } from '@/components/party-provider'
import { PartySelector } from '@/components/party-selector'
import { AccountsList } from '@/components/accounts-list'

export default function HomePage() {
  return (
    <PartyProvider>
      <main className="container mx-auto py-8">
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Banking Dashboard</h1>
            <PartySelector />
          </div>
          
          <AccountsList />
        </div>
      </main>
    </PartyProvider>
  )
}