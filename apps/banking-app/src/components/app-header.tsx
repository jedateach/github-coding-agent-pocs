'use client'

import { Button } from './ui/button'
import { PartySelector } from './party-selector'
import { TransferModal } from './transfer-modal'
import Link from 'next/link'
import { Send } from 'lucide-react'

export function AppHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="text-2xl font-bold">
            Banking Dashboard
          </Link>
          
          <div className="flex items-center space-x-4">
            {/* Quick Actions */}
            <TransferModal />
            <Button asChild variant="outline">
              <Link href="/payment">
                <Send className="w-4 h-4 mr-2" />
                Send Payment
              </Link>
            </Button>
            
            {/* Party Selector */}
            <PartySelector />
          </div>
        </div>
      </div>
    </header>
  )
}