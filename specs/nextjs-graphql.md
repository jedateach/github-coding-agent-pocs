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
- **GraphQL**: strongly typed schema, codegen, trusted docs
- **PNPM workspaces** for shared code (types, API clients)
- **UI/UX:** ShadCN + Tailwind

### Banking Application Features

_Current user is assumed authenticated._

- Parties:  
  - User as an individual  
  - A business they own  
  - Ability to switch between parties  
- Accounts:  
  - List accounts for selected party (name, type, balance)  
  - Subscribe to balance changes  
- Account details:  
  - View last 30 transactions  
  - Infinite scroll to fetch more transactions  
  - Subscribe to transaction updates  
- Money movement:  
  - Transfers between any party’s accounts  
  - Payments to external accounts  

Mocking generates transactions on demand, supporting both infinite scroll and live subscription updates.
