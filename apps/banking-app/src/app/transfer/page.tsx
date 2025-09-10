import { TransferForm } from '@/components/transfer-form'
import { PartyProvider } from '@/components/party-provider'

export default function TransferPage() {
  return (
    <PartyProvider>
      <div className="container mx-auto py-8 max-w-2xl">
        <h1 className="text-3xl font-bold mb-8">Transfer Money</h1>
        <TransferForm />
      </div>
    </PartyProvider>
  )
}