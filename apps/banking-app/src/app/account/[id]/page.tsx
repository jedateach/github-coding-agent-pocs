import { AccountDetail } from '../../../components/account-detail'

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
    <div className="container mx-auto py-8">
      <AccountDetail accountId={id} />
    </div>
  )
}