'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'
import { useTransferMutation, useGetCurrentUserQuery } from '@/lib/gql/urql'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { AlertCircle, CheckCircle } from 'lucide-react'

const transferSchema = z.object({
  fromAccountId: z.string().min(1, 'Please select a source account'),
  toAccountId: z.string().min(1, 'Please select a destination account'),
  amount: z.number().min(0.01, 'Amount must be at least $0.01').max(1000000, 'Amount too large'),
  description: z.string().optional(),
})

type TransferFormData = z.infer<typeof transferSchema>

interface Account {
  id: string
  name: string
  type: string
  balance: number
}

function formatCurrency(cents: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(cents / 100)
}

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

interface TransferFormProps {
  onSuccess?: () => void
}

export function TransferForm({ onSuccess }: TransferFormProps) {
  const [isSuccess, setIsSuccess] = useState(false)
  const [transferResult, setTransferResult] = useState<any>(null)
  
  const [{ data }] = useGetCurrentUserQuery()
  const [, executeTransfer] = useTransferMutation()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    reset,
  } = useForm<TransferFormData>({
    resolver: zodResolver(transferSchema),
  })

  // Get all accounts from all parties
  const allAccounts: Account[] = []
  if (data?.currentUser?.parties) {
    for (const party of data.currentUser.parties) {
      for (const account of party.accounts) {
        allAccounts.push(account)
      }
    }
  }

  const selectedFromAccount = watch('fromAccountId')
  const selectedToAccount = watch('toAccountId')
  const selectedAmount = watch('amount')

  const onSubmit = async (formData: TransferFormData) => {
    try {
      const result = await executeTransfer({
        input: {
          fromAccountId: formData.fromAccountId,
          toAccountId: formData.toAccountId,
          amount: Math.round(formData.amount * 100), // Convert to cents
          description: formData.description,
        },
      })

      if (result.error) {
        throw new Error(result.error.message)
      }

      setTransferResult(result.data?.transfer)
      setIsSuccess(true)
      reset()
      
      // Call the onSuccess callback if provided
      if (onSuccess) {
        onSuccess()
      }
    } catch (error) {
      console.error('Transfer failed:', error)
    }
  }

  if (isSuccess && transferResult) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-green-600">
            <CheckCircle className="w-5 h-5" />
            <span>Transfer Successful</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-green-50 p-4 rounded-lg space-y-2">
            <p><strong>Transaction ID:</strong> {transferResult.id}</p>
            <p><strong>Amount:</strong> {formatCurrency(Math.abs(transferResult.amount))}</p>
            <p><strong>Description:</strong> {transferResult.description}</p>
            <p><strong>Date:</strong> {new Date(transferResult.date).toLocaleDateString()}</p>
          </div>
          
          <div className="flex space-x-4">
            <Button
              onClick={() => {
                setIsSuccess(false)
                setTransferResult(null)
              }}
              variant="outline"
            >
              Make Another Transfer
            </Button>
            <Button onClick={onSuccess}>
              Close
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* From Account */}
            <div className="space-y-2">
              <label className="text-sm font-medium">From Account</label>
              <Select
                onValueChange={(value) => setValue('fromAccountId', value)}
                value={selectedFromAccount}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select source account" />
                </SelectTrigger>
                <SelectContent>
                  {allAccounts.map((account) => (
                    <SelectItem key={account.id} value={account.id}>
                      <div className="flex items-center justify-between w-full">
                        <div>
                          <span className="font-medium">{account.name}</span>
                          <span className="text-xs ml-2 px-2 py-1 bg-gray-100 rounded">
                            {getAccountTypeLabel(account.type)}
                          </span>
                        </div>
                        <span className="text-sm text-muted-foreground ml-4">
                          {formatCurrency(account.balance)}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.fromAccountId && (
                <p className="text-sm text-red-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.fromAccountId.message}
                </p>
              )}
            </div>

            {/* To Account */}
            <div className="space-y-2">
              <label className="text-sm font-medium">To Account</label>
              <Select
                onValueChange={(value) => setValue('toAccountId', value)}
                value={selectedToAccount}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select destination account" />
                </SelectTrigger>
                <SelectContent>
                  {allAccounts
                    .filter((account) => account.id !== selectedFromAccount)
                    .map((account) => (
                      <SelectItem key={account.id} value={account.id}>
                        <div className="flex items-center justify-between w-full">
                          <div>
                            <span className="font-medium">{account.name}</span>
                            <span className="text-xs ml-2 px-2 py-1 bg-gray-100 rounded">
                              {getAccountTypeLabel(account.type)}
                            </span>
                          </div>
                          <span className="text-sm text-muted-foreground ml-4">
                            {formatCurrency(account.balance)}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              {errors.toAccountId && (
                <p className="text-sm text-red-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.toAccountId.message}
                </p>
              )}
            </div>

            {/* Amount */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Amount ($)</label>
              <Input
                type="number"
                step="0.01"
                min="0.01"
                max="10000"
                placeholder="0.00"
                {...register('amount', { valueAsNumber: true })}
              />
              {errors.amount && (
                <p className="text-sm text-red-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.amount.message}
                </p>
              )}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Description (Optional)</label>
              <Input
                placeholder="Transfer description"
                {...register('description')}
              />
            </div>

            {/* Transfer Preview */}
            {selectedFromAccount && selectedToAccount && selectedAmount && (
              <div className="bg-blue-50 p-4 rounded-lg space-y-2">
                <h4 className="font-medium">Transfer Preview</h4>
                <p className="text-sm">
                  <strong>From:</strong> {allAccounts.find(a => a.id === selectedFromAccount)?.name}
                </p>
                <p className="text-sm">
                  <strong>To:</strong> {allAccounts.find(a => a.id === selectedToAccount)?.name}
                </p>
                <p className="text-sm">
                  <strong>Amount:</strong> {formatCurrency(selectedAmount * 100)}
                </p>
              </div>
            )}

            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? 'Processing Transfer...' : 'Transfer Money'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}