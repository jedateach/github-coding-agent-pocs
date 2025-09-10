'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'
import { usePaymentMutation, useGetCurrentUserQuery } from '@/lib/gql/urql'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import Link from 'next/link'
import { ArrowLeft, AlertCircle, CheckCircle } from 'lucide-react'

// Simple IBAN validation
const ibanRegex = /^[A-Z]{2}[0-9]{2}[A-Z0-9]{4}[0-9]{7}([A-Z0-9]?){0,16}$/

const paymentSchema = z.object({
  fromAccountId: z.string().min(1, 'Please select a source account'),
  externalIban: z.string().regex(ibanRegex, 'Invalid IBAN format'),
  amount: z.number().min(0.01, 'Amount must be at least $0.01').max(1000000, 'Amount too large'),
  description: z.string().optional(),
})

type PaymentFormData = z.infer<typeof paymentSchema>

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

export function PaymentForm() {
  const [isSuccess, setIsSuccess] = useState(false)
  const [paymentResult, setPaymentResult] = useState<any>(null)
  
  const [{ data }] = useGetCurrentUserQuery()
  const [, executePayment] = usePaymentMutation()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    reset,
  } = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
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
  const selectedIban = watch('externalIban')
  const selectedAmount = watch('amount')

  const onSubmit = async (formData: PaymentFormData) => {
    try {
      const result = await executePayment({
        input: {
          fromAccountId: formData.fromAccountId,
          externalIban: formData.externalIban,
          amount: Math.round(formData.amount * 100), // Convert to cents
          description: formData.description,
        },
      })

      if (result.error) {
        throw new Error(result.error.message)
      }

      setPaymentResult(result.data?.payment)
      setIsSuccess(true)
      reset()
    } catch (error) {
      console.error('Payment failed:', error)
    }
  }

  if (isSuccess && paymentResult) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-green-600">
            <CheckCircle className="w-5 h-5" />
            <span>Payment Successful</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-green-50 p-4 rounded-lg space-y-2">
            <p><strong>Transaction ID:</strong> {paymentResult.id}</p>
            <p><strong>Amount:</strong> {formatCurrency(Math.abs(paymentResult.amount))}</p>
            <p><strong>Description:</strong> {paymentResult.description}</p>
            <p><strong>Date:</strong> {new Date(paymentResult.date).toLocaleDateString()}</p>
          </div>
          
          <div className="flex space-x-4">
            <Button
              onClick={() => {
                setIsSuccess(false)
                setPaymentResult(null)
              }}
              variant="outline"
            >
              Make Another Payment
            </Button>
            <Button asChild>
              <Link href="/">
                Back to Accounts
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Button variant="ghost" asChild>
        <Link href="/">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Accounts
        </Link>
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>Send External Payment</CardTitle>
        </CardHeader>
        <CardContent>
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

            {/* External IBAN */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Recipient IBAN</label>
              <Input
                placeholder="GB82 WEST 1234 5698 7654 32"
                {...register('externalIban')}
                className="font-mono"
              />
              {errors.externalIban && (
                <p className="text-sm text-red-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.externalIban.message}
                </p>
              )}
              <p className="text-xs text-muted-foreground">
                Enter the International Bank Account Number (IBAN) of the recipient
              </p>
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
              <label className="text-sm font-medium">Payment Reference (Optional)</label>
              <Input
                placeholder="Payment description or reference"
                {...register('description')}
              />
            </div>

            {/* Payment Preview */}
            {selectedFromAccount && selectedIban && selectedAmount && (
              <div className="bg-blue-50 p-4 rounded-lg space-y-2">
                <h4 className="font-medium">Payment Preview</h4>
                <p className="text-sm">
                  <strong>From:</strong> {allAccounts.find(a => a.id === selectedFromAccount)?.name}
                </p>
                <p className="text-sm">
                  <strong>To IBAN:</strong> {selectedIban}
                </p>
                <p className="text-sm">
                  <strong>Amount:</strong> {formatCurrency(selectedAmount * 100)}
                </p>
              </div>
            )}

            {/* Warning */}
            <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
              <div className="flex items-start space-x-2">
                <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                <div className="text-sm text-yellow-800">
                  <p className="font-medium">Important</p>
                  <p>External payments cannot be reversed. Please double-check the recipient IBAN and amount before proceeding.</p>
                </div>
              </div>
            </div>

            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? 'Processing Payment...' : 'Send Payment'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}