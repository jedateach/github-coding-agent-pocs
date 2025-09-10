# GraphQL Banking POC

A proof-of-concept banking application demonstrating GraphQL with Next.js, TypeScript, and URQL.

## Features

- **Party Management**: Switch between personal and business accounts
- **Account Overview**: View account balances and types (Checking, Savings, Credit)
- **Transaction History**: View transaction details with infinite scroll
- **Money Transfers**: Transfer funds between accounts with form validation
- **External Payments**: Send payments to external IBANs
- **Real-time Updates**: Simulated live balance and transaction updates
- **Full Type Safety**: End-to-end typing with GraphQL Code Generator

## Technologies

- **Next.js 15** with App Router and static export
- **TypeScript** for strict typing
- **GraphQL** with strongly typed schema and codegen
- **URQL** for GraphQL client with React hooks
- **React Hook Form** with Zod validation
- **ShadCN UI** + Tailwind CSS for styling
- **MSW** for browser-only API mocking
- **PNPM Workspaces** for monorepo structure
- **Vitest** and **Playwright** for testing

## Project Structure

```
├── packages/
│   └── schema/              # GraphQL schema definitions
└── apps/
    └── banking-app/         # Main Next.js application
        ├── src/
        │   ├── app/         # Next.js App Router pages
        │   ├── components/  # React components
        │   ├── lib/         # Utilities and generated GraphQL code
        │   ├── mocks/       # MSW handlers for API mocking
        │   └── graphql/     # GraphQL queries, mutations, subscriptions
        ├── __tests__/       # Vitest unit tests
        └── playwright/      # Playwright e2e tests
```

## Getting Started

### Prerequisites

- Node.js 18+
- PNPM 8+

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd github-coding-agent-pocs
```

2. Install dependencies:
```bash
pnpm install
```

3. Generate GraphQL types:
```bash
cd apps/banking-app
pnpm codegen
```

### Development

1. Start the development server:
```bash
cd apps/banking-app
pnpm dev
```

2. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

Build the static export:
```bash
cd apps/banking-app
pnpm build
```

The static files will be generated in the `dist/` directory.

### Testing

Run unit tests:
```bash
cd apps/banking-app
pnpm test
```

Run end-to-end tests:
```bash
cd apps/banking-app
pnpm test:e2e
```

## GraphQL Schema

The application uses a banking-focused GraphQL schema with:

- **User** and **Party** management (Personal/Business)
- **Account** types (Checking, Savings, Credit)
- **Transaction** history with balance tracking
- **Transfer** and **Payment** mutations
- **Subscription** support for real-time updates

## Key Features Demonstrated

### 1. Party Switching
- Toggle between personal and business accounts
- Context-based state management
- Automatic account filtering

### 2. Type-Safe GraphQL Operations
- Generated TypeScript types for all operations
- URQL React hooks with full type inference
- Compile-time query validation

### 3. Form Validation
- React Hook Form with Zod schemas
- IBAN validation for payments
- Real-time form validation feedback

### 4. Infinite Scroll
- Progressive loading of transaction history
- Offset-based pagination
- Loading states and error handling

### 5. Static Export Compatibility
- MSW for browser-only API mocking
- Static site generation with dynamic routes
- No server-side dependencies

## Architecture Decisions

### Why URQL over Apollo?
- Lighter bundle size
- Better caching defaults
- Excellent TypeScript integration
- Simpler subscription setup

### Why MSW for Mocking?
- Works in both development and production
- Browser-only operation (no server required)
- Realistic network request handling
- Perfect for static exports

### Why Static Export?
- Demonstrates modern JAMstack approach
- Easy deployment to CDNs
- Client-side GraphQL capabilities
- Offline-first potential

## Success Criteria ✅

- ✅ User can switch between personal and business party
- ✅ Accounts list displays balances with live updates
- ✅ Account detail shows transactions with infinite scroll
- ✅ Transfer form validates inputs and triggers mutations
- ✅ Payment form validates IBAN and processes payments
- ✅ All operations are fully typed via GraphQL codegen
- ✅ Static export build generates optimized production assets

## Contributing

1. Make changes in feature branches
2. Run tests: `pnpm test` and `pnpm test:e2e`
3. Check types: `pnpm type-check`
4. Build successfully: `pnpm build`

## License

MIT