import { graphql, HttpResponse, http } from 'msw'

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

// In-memory store to track account balances for real-time updates
const accountBalances = new Map<string, number>()
mockUser.parties.forEach(party => {
  party.accounts.forEach(account => {
    accountBalances.set(account.id, account.balance)
  })
})

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

// Helper to simulate balance updates
function simulateBalanceUpdate(accountId: string) {
  const currentBalance = accountBalances.get(accountId) || 0
  const change = Math.floor(Math.random() * 10000 - 5000) // Random change between -$50 and $50
  const newBalance = Math.max(0, currentBalance + change) // Don't go below 0
  accountBalances.set(accountId, newBalance)
  return newBalance
}

export const handlers = [
  // Current user query
  graphql.query('GetCurrentUser', () => {
    // Update balances in response with current values
    const updatedUser = {
      ...mockUser,
      parties: mockUser.parties.map(party => ({
        ...party,
        accounts: party.accounts.map(account => ({
          ...account,
          balance: accountBalances.get(account.id) || account.balance,
        })),
      })),
    }

    return HttpResponse.json({
      data: {
        currentUser: updatedUser,
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
          balance: accountBalances.get(id) || foundAccount.balance,
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
    
    // Update account balances
    const fromBalance = accountBalances.get(input.fromAccountId) || 0
    const toBalance = accountBalances.get(input.toAccountId) || 0
    
    accountBalances.set(input.fromAccountId, fromBalance - input.amount)
    accountBalances.set(input.toAccountId, toBalance + input.amount)
    
    // Mock successful transfer
    const transaction = {
      id: `txn-transfer-${Date.now()}`,
      date: new Date().toISOString(),
      description: input.description || 'Transfer',
      amount: -input.amount, // Negative for sender
      balanceAfter: fromBalance - input.amount,
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
    
    // Update account balance
    const fromBalance = accountBalances.get(input.fromAccountId) || 0
    accountBalances.set(input.fromAccountId, fromBalance - input.amount)
    
    // Mock successful payment
    const transaction = {
      id: `txn-payment-${Date.now()}`,
      date: new Date().toISOString(),
      description: input.description || `Payment to ${input.externalIban}`,
      amount: -input.amount, // Negative for sender
      balanceAfter: fromBalance - input.amount,
    }
    
    return HttpResponse.json({
      data: {
        payment: transaction,
      },
    })
  }),

  // SSE endpoint for GraphQL subscriptions
  http.get('/api/graphql-sse', ({ request }) => {
    const url = new URL(request.url)
    const query = url.searchParams.get('query')
    const variablesParam = url.searchParams.get('variables')
    
    let variables = {}
    try {
      variables = variablesParam ? JSON.parse(variablesParam) : {}
    } catch (e) {
      console.error('Failed to parse variables:', e)
    }
    
    const encoder = new TextEncoder()
    
    // Determine subscription type from query
    if (query?.includes('SubscribeToAccountBalance')) {
      const accountId = (variables as any)?.accountId
      
      if (!accountId) {
        return new HttpResponse('Missing accountId parameter', { status: 400 })
      }
      
      const stream = new ReadableStream({
        start(controller) {
          // Send initial balance
          const initialBalance = accountBalances.get(accountId) || 0
          const initialData = {
            data: {
              accountBalanceUpdated: {
                id: accountId,
                balance: initialBalance,
              },
            },
          }
          
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify(initialData)}\n\n`)
          )
          
          // Send periodic balance updates
          const interval = setInterval(() => {
            const newBalance = simulateBalanceUpdate(accountId)
            const updateData = {
              data: {
                accountBalanceUpdated: {
                  id: accountId,
                  balance: newBalance,
                },
              },
            }
            
            try {
              controller.enqueue(
                encoder.encode(`data: ${JSON.stringify(updateData)}\n\n`)
              )
            } catch (error) {
              // Stream might be closed
              clearInterval(interval)
            }
          }, 5000) // Update every 5 seconds
          
          // Clean up on stream close
          return () => {
            clearInterval(interval)
          }
        },
      })
      
      return new HttpResponse(stream, {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
        },
      })
    }
    
    if (query?.includes('SubscribeToTransactions')) {
      const accountId = (variables as any)?.accountId
      
      if (!accountId) {
        return new HttpResponse('Missing accountId parameter', { status: 400 })
      }
      
      const stream = new ReadableStream({
        start(controller) {
          // Send periodic transaction updates
          const interval = setInterval(() => {
            const transaction = {
              id: `txn-live-${Date.now()}`,
              date: new Date().toISOString(),
              description: 'Live transaction update',
              amount: Math.floor(Math.random() * 10000 - 5000),
              balanceAfter: accountBalances.get(accountId) || 0,
            }
            
            const updateData = {
              data: {
                transactionAdded: transaction,
              },
            }
            
            try {
              controller.enqueue(
                encoder.encode(`data: ${JSON.stringify(updateData)}\n\n`)
              )
            } catch (error) {
              // Stream might be closed
              clearInterval(interval)
            }
          }, 10000) // New transaction every 10 seconds
          
          // Clean up on stream close
          return () => {
            clearInterval(interval)
          }
        },
      })
      
      return new HttpResponse(stream, {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
        },
      })
    }
    
    return new HttpResponse('Unknown subscription', { status: 400 })
  }),

  // Legacy subscription handlers (kept for compatibility but should use SSE endpoint above)
  graphql.query('SubscribeToAccountBalance', ({ variables }) => {
    const accountId = (variables as any)?.accountId
    return HttpResponse.json({
      data: {
        accountBalanceUpdated: {
          id: accountId,
          balance: accountBalances.get(accountId) || Math.floor(Math.random() * 1000000),
        },
      },
    })
  }),

  graphql.query('SubscribeToTransactions', ({ variables }) => {
    const accountId = (variables as any)?.accountId
    return HttpResponse.json({
      data: {
        transactionAdded: {
          id: `txn-live-${Date.now()}`,
          date: new Date().toISOString(),
          description: 'Live transaction update',
          amount: Math.floor(Math.random() * 10000 - 5000),
          balanceAfter: accountBalances.get(accountId) || Math.floor(Math.random() * 1000000),
        },
      },
    })
  }),
]