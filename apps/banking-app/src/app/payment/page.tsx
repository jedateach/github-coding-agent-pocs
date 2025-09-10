import { PaymentForm } from '@/components/payment-form'
import { PartyProvider } from '@/components/party-provider'

export default function PaymentPage() {
  return (
    <PartyProvider>
      <div className="container mx-auto py-8 max-w-2xl">
        <h1 className="text-3xl font-bold mb-8">Send Payment</h1>
        <PaymentForm />
      </div>
    </PartyProvider>
  )
}