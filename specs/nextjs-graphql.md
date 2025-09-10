# GraphQL Banking POC: Typed Queries, Mutations, and Subscriptions

This proof-of-concept banking application demonstrates how GraphQL can power a domain-driven, type-safe, and reactive client–server experience.

## Goal

Show the value of GraphQL in a modern web application:

- **Domain-driven schema:** reusable contracts across client and server  
- **Queries:** efficient retrieval of accounts and transactions  
- **Mutations:** typed and safe money movement (transfers, payments)  
- **Subscriptions:** real-time updates to balances and transactions  
- **Trusted documents:** enforce safe, consistent query usage  
- **Full type safety:** end-to-end with TypeScript and GraphQL codegen  

---

## GraphQL Schema (Draft)

```graphql
# Core types

type User {
  id: ID!
  name: String!
  parties: [Party!]!
}

type Party {
  id: ID!
  type: PartyType!   # PERSON | BUSINESS
  name: String!
  accounts: [Account!]!
}

enum PartyType {
  PERSON
  BUSINESS
}

type Account {
  id: ID!
  name: String!
  type: AccountType! # CHECKING | SAVINGS | CREDIT
  balance: Int!      # balance in cents
  transactions(limit: Int, offset: Int): [Transaction!]!
}

enum AccountType {
  CHECKING
  SAVINGS
  CREDIT
}

type Transaction {
  id: ID!
  date: String!
  description: String!
  amount: Int!    # positive = credit, negative = debit
  balanceAfter: Int!
}

# Queries

type Query {
  currentUser: User!
  party(id: ID!): Party
  account(id: ID!): Account
}

# Mutations

input TransferInput {
  fromAccountId: ID!
  toAccountId: ID!
  amount: Int!
  description: String
}

input PaymentInput {
  fromAccountId: ID!
  externalIban: String!
  amount: Int!
  description: String
}

type Mutation {
  transfer(input: TransferInput!): Transaction!
  payment(input: PaymentInput!): Transaction!
}

# Subscriptions

type Subscription {
  accountBalanceUpdated(accountId: ID!): Account!
  transactionAdded(accountId: ID!): Transaction!
}
```

---

## Example Operations

### Query: Accounts for current user

```graphql
query GetAccounts {
  currentUser {
    parties {
      id
      name
      accounts {
        id
        name
        type
        balance
      }
    }
  }
}
```

### Mutation: Transfer

```graphql
mutation Transfer($input: TransferInput!) {
  transfer(input: $input) {
    id
    amount
    description
    balanceAfter
  }
}
```

### Subscription: New transaction

```graphql
subscription OnTransaction($accountId: ID!) {
  transactionAdded(accountId: $accountId) {
    id
    amount
    description
    balanceAfter
  }
}
```

---

## Requirements

### Technologies

- **TypeScript** for strict typing across client and server  
- **Next.js 15** with:  
  - app router  
  - static export mode  
  - prefer `"use client"`  
  - React Hook Form for isolated form components  
  - custom hook files wrapping data fetching  
  - loading and error pages  
- **MSW.js** for browser-only mocking of backend responses  
- **GraphQL:** strongly typed schema, codegen, trusted docs. Prefer the-guild graphql-code-generator producing urql react.
- **PNPM workspaces** for shared code (types, API clients)  
- **UI/UX:** ShadCN + Tailwind  

---

## Banking Application Features

_Current user is assumed authenticated._

- **Parties**:  
  - User as an individual  
  - A business they own  
  - Ability to switch between parties  

- **Accounts**:  
  - List accounts for selected party (name, type, balance)  
  - Subscribe to balance changes  

- **Account details**:  
  - View last 30 transactions  
  - Infinite scroll to fetch more transactions  
  - Subscribe to transaction updates  

- **Money movement**:  
  - Transfers between any party’s accounts  
  - Payments to external accounts  

Mocking generates transactions on demand, supporting both infinite scroll and live subscription updates.

---

## Implementation Notes

- **Transport:** Assume SSE-based GraphQL subscriptions for demo purposes  
- **Mocking:** MSW generates infinite fake transactions per account. Subscriptions push random balance + transaction updates  
- **UI Flows:**  
  - Party switcher → updates context for which accounts are shown  
  - Accounts list → shows balances live-updating  
  - Account detail → transaction list with infinite scroll + subscription updates  
  - Transfer form → RHF form, validates inputs, triggers GraphQL mutation  
  - Payment form → RHF form, validates IBAN, triggers GraphQL mutation  

---

## Success Criteria

- ✅ User can switch between personal and business party  
- ✅ Accounts list displays balances, which update live when subscription events arrive  
- ✅ Account detail shows 30 transactions, with infinite scroll loading more  
- ✅ Subscriptions inject new transactions at random intervals  
- ✅ Transfer mutation updates both accounts’ balances and transaction lists  
- ✅ Payment mutation reduces account balance and appends new transaction  
- ✅ All operations are fully typed via GraphQL codegen + TypeScript  

---
