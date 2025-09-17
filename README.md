# Data Fetching Monorepo POC

This Proof of Concept (POC) demonstrates **data fetching with Suspense and Error Boundaries** in a **React 19 + Next.js 15 App Router** frontend, within a **pnpm monorepo**.

## 🎯 Goals

- Demonstrate clean package layering: shared client in `packages/`, feature APIs inside sites
- Showcase React's new **`use()` hook** for data fetching
- Handle loading/error UI via **App Router conventions** (`loading.tsx`, `error.tsx`) and Suspense/ErrorBoundary
- Provide mocks for demo and tests
- Use ShadCN for UI primitives
- Compare **plain `use()`** vs **TanStack Query caching**

## 🏗️ Architecture

### Monorepo Structure

```
├── packages/
│   ├── api-client/          # @myrepo/api-client → shared Axios instance
│   ├── ui-components/       # @myrepo/ui-components (re-export ShadCN + shared bits)
│   ├── config-tailwind/     # @myrepo/config-tailwind
│   └── config-eslint/       # @myrepo/config-eslint
├── sites/
│   └── demo-app/            # Next.js 15 demo application
│       ├── src/
│       │   ├── app/         # App Router pages
│       │   ├── api/         # API layer functions
│       │   └── mocks/       # MSW handlers
│       └── playwright/      # E2E tests
└── pnpm-workspace.yaml
```

### Tech Stack

- **Language:** TypeScript
- **Framework:** Next.js 15 (App Router, `src/` convention)
- **React:** 19 with new `use()` hook
- **Package manager:** pnpm with workspaces
- **HTTP Client:** Axios
- **Caching Demo:** TanStack Query (accounts feature only)
- **UI library:** ShadCN + Tailwind CSS
- **Mocking:** MSW
- **E2E Testing:** Playwright

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm 9.0.0+

### Installation

```bash
# Install pnpm globally if not already installed
npm install -g pnpm@9.0.0

# Clone the repository
git clone <repository-url>
cd data-fetching-monorepo-poc

# Install all dependencies
pnpm install

# Build packages
pnpm run --filter "@myrepo/api-client" build
pnpm run --filter "@myrepo/ui-components" build
```

### Development

```bash
# Start the demo app in development mode
pnpm run dev

# Or run from root
pnpm run --filter demo-app dev
```

The app will be available at `http://localhost:3000` (or `http://localhost:3001` if 3000 is in use).

### Production Build

```bash
# Build the demo app for production
pnpm run build

# Or run from root
pnpm run --filter demo-app build
```

### Testing

```bash
# Run E2E tests
pnpm run test:e2e

# Run E2E tests in UI mode
pnpm run test:e2e:ui

# Lint code
pnpm run lint

# Type check
pnpm run type-check
```

## 📱 Features Demonstrated

### 1. Profile Page - React 19 `use()` Hook

- **Location:** `/profile`
- **Approach:** React 19's `use()` hook with Suspense
- **Features:**
  - Automatic suspense boundaries
  - Built-in error handling
  - Simple data fetching pattern

### 2. Accounts Page - TanStack Query

- **Location:** `/accounts`
- **Approach:** TanStack Query for caching and state management
- **Features:**
  - Query invalidation with refresh button
  - Loading and error states
  - Cache management
  - Optimistic updates support

### 3. Shared Packages

#### `@myrepo/api-client`
- Shared Axios instance with interceptors
- Auth token injection
- Global session-expiry detection (401 handling)
- Normalized error objects

#### `@myrepo/ui-components`
- ShadCN components wrapper
- Shared design tokens
- Custom components (Spinner, ErrorBox)
- Tailwind CSS integration

## 🧪 API Mocking

The project uses MSW (Mock Service Worker) for API mocking:

- **Profile API:** `/api/me` - Returns user profile data
- **Accounts API:** `/api/accounts` - Returns account list with balances

### Mock Data

```typescript
// Profile
{
  name: "Jane Doe",
  email: "jane@example.com"
}

// Accounts
[
  { id: "1", name: "Checking", balance: 1000 },
  { id: "2", name: "Savings", balance: 5000 }
]
```

## 🎨 UI Components

Built with ShadCN components and Tailwind CSS:

- **Card** - Container component for content
- **Button** - Interactive elements with variants
- **Spinner** - Loading indicators
- **ErrorBox** - Error display with optional dismiss
- **Typography** - Consistent text styling

## 🔧 Configuration

### Environment Variables

```bash
# .env.local
NEXT_PUBLIC_API_BASE_URL=/api
```

### Package Scripts

```bash
# Root level
pnpm dev        # Start demo app in development
pnpm build      # Build demo app for production
pnpm test:e2e   # Run Playwright tests

# Package level
pnpm run --filter "@myrepo/api-client" build
pnpm run --filter "@myrepo/ui-components" build
pnpm run --filter demo-app dev
```

## 📊 Comparison: `use()` vs TanStack Query

| Feature | `use()` Hook | TanStack Query |
|---------|-------------|----------------|
| Bundle Size | Smaller | Larger |
| Caching | Manual | Automatic |
| Refetching | Manual | Automatic |
| Loading States | Suspense | Built-in |
| Error Handling | Error Boundaries | Built-in |
| Invalidation | N/A | Sophisticated |
| DevTools | React DevTools | TanStack DevTools |

## 🚦 Known Limitations

1. **Static Export:** Currently disabled due to dynamic API routes. Can be enabled with a different approach using `generateStaticParams`.

2. **SSR with `use()`:** The `use()` hook requires client-side rendering for API calls during development.

3. **Development Warnings:** Console warnings about `use()` hook are expected in development mode with React 19.

## 📖 Further Reading

- [React 19 use() Hook Documentation](https://react.dev/reference/react/use)
- [Next.js 15 App Router](https://nextjs.org/docs/app)
- [TanStack Query v5](https://tanstack.com/query/latest)
- [ShadCN UI Components](https://ui.shadcn.com/)
- [MSW API Mocking](https://mswjs.io/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Run linting and tests
6. Submit a pull request

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.