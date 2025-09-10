import { AccountDetail } from '@/components/account-detail'
import { PartyProvider } from '@/components/party-provider'

interface PageProps {
  params: Promise<{ id: string }>
}

// Generate static params for static export
export function generateStaticParams() {
  return [
    { id: 'acc-1' },
    { id: 'acc-2' },
    { id: 'acc-3' },
    { id: 'acc-4' },
  ]
}

export default async function AccountDetailPage({ params }: PageProps) {
  const { id } = await params
  
  return (
    <PartyProvider>
      <AccountDetail accountId={id} />
    </PartyProvider>
  )
}