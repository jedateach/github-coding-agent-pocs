import { PaymentForm } from '../../components/payment-form'

export default function PaymentPage() {
  return (
    <div className="container mx-auto py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8">Send Payment</h1>
      <PaymentForm />
    </div>
  )
}