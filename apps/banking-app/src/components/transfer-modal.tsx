'use client'

import { useState } from 'react'
import { Button } from './ui/button'
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from './ui/dialog'
import { TransferForm } from './transfer-form'
import { ArrowRightLeft } from 'lucide-react'

export function TransferModal() {
  const [open, setOpen] = useState(false)

  const handleTransferSuccess = () => {
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <ArrowRightLeft className="w-4 h-4 mr-2" />
          Transfer Money
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Transfer Between Accounts</DialogTitle>
        </DialogHeader>
        <TransferForm onSuccess={handleTransferSuccess} />
      </DialogContent>
    </Dialog>
  )
}