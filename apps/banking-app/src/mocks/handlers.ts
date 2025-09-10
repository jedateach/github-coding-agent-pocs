import { graphql, HttpResponse } from 'msw'

// Mock data
const mockUser = {
  id: '1',
  name: 'John Doe',
  parties: [
    {
      id: 'party-1',
      type: 'PERSON',
      name: 'John Doe (Personal)',
      accounts: [
        {
          id: 'acc-1',
          name: 'Checking Account',
          type: 'CHECKING',
          balance: 250000, // $2,500.00 in cents
        },
        {
          id: 'acc-2',
          name: 'Savings Account',
          type: 'SAVINGS',
          balance: 1500000, // $15,000.00 in cents
        },
      ],
    },
    {
      id: 'party-2',
      type: 'BUSINESS',
      name: 'Acme Corp',
      accounts: [
        {
          id: 'acc-3',
          name: 'Business Checking',
          type: 'CHECKING',
          balance: 500000, // $5,000.00 in cents
        },
        {
          id: 'acc-4',
          name: 'Business Savings',
          type: 'SAVINGS',
          balance: 2500000, // $25,000.00 in cents
        },
      ],
    },
  ],
}

// Helper to generate mock transactions
function generateMockTransactions(accountId: string, limit = 30, offset = 0) {
  const transactions = []
  const baseBalance = 100000 // Start with $1000 base
  
  for (let i = offset; i < offset + limit; i++) {
    const amount = Math.floor(Math.random() * 20000 - 10000) // Random amount between -$100 and $100
    const date = new Date()
    date.setDate(date.getDate() - i)
    
    transactions.push({
      id: `txn-${accountId}-${i}`,
      date: date.toISOString(),
      description: `Transaction ${i + 1}`,
      amount,
      balanceAfter: baseBalance + amount * (i + 1),
    })
  }
  
  return transactions
}

export const handlers = [
  // Current user query
  graphql.query('GetCurrentUser', () => {
    return HttpResponse.json({
      data: {
        currentUser: mockUser,
      },
    })
  }),

  // Get account with transactions
  graphql.query('GetAccount', ({ variables }) => {
    const { id, transactionLimit = 30, transactionOffset = 0 } = variables as any
    
    // Find account across all parties
    let account = null
    for (const party of mockUser.parties) {
      const foundAccount = party.accounts.find(acc => acc.id === id)
      if (foundAccount) {
        account = {
          ...foundAccount,
          transactions: generateMockTransactions(id, transactionLimit, transactionOffset),
        }
        break
      }
    }
    
    if (!account) {
      return HttpResponse.json({
        errors: [{ message: 'Account not found' }],
      })
    }
    
    return HttpResponse.json({
      data: {
        account,
      },
    })
  }),

  // Transfer mutation
  graphql.mutation('Transfer', ({ variables }) => {
    const { input } = variables as any
    
    // Mock successful transfer
    const transaction = {
      id: `txn-transfer-${Date.now()}`,
      date: new Date().toISOString(),
      description: input.description || 'Transfer',
      amount: -input.amount, // Negative for sender
      balanceAfter: 200000, // Mock balance after
    }
    
    return HttpResponse.json({
      data: {
        transfer: transaction,
      },
    })
  }),

  // Payment mutation
  graphql.mutation('Payment', ({ variables }) => {
    const { input } = variables as any
    
    // Mock successful payment
    const transaction = {
      id: `txn-payment-${Date.now()}`,
      date: new Date().toISOString(),
      description: input.description || `Payment to ${input.externalIban}`,
      amount: -input.amount, // Negative for sender
      balanceAfter: 150000, // Mock balance after
    }
    
    return HttpResponse.json({
      data: {
        payment: transaction,
      },
    })
  }),

  // Account balance subscription (mock) - In real app, this would use proper subscription transport
  graphql.query('SubscribeToAccountBalance', ({ variables }) => {
    // For static export, we'll simulate this with periodic updates
    return HttpResponse.json({
      data: {
        accountBalanceUpdated: {
          id: variables.accountId,
          balance: Math.floor(Math.random() * 1000000),
        },
      },
    })
  }),

  // Transaction added subscription (mock) - In real app, this would use proper subscription transport  
  graphql.query('SubscribeToTransactions', ({ variables }) => {
    return HttpResponse.json({
      data: {
        transactionAdded: {
          id: `txn-live-${Date.now()}`,
          date: new Date().toISOString(),
          description: 'Live transaction update',
          amount: Math.floor(Math.random() * 10000 - 5000),
          balanceAfter: Math.floor(Math.random() * 1000000),
        },
      },
    })
  }),
]