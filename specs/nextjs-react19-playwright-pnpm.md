# Proof of Concept Specification

## Overview

This Proof of Concept (POC) demonstrates **data fetching with Suspense and Error Boundaries** in a **React 19 + Next.js 15 App Router** frontend, within an **Nx + pnpm monorepo**.

Goals:

- Demonstrate clean package layering: shared client in `packages/`, feature APIs inside sites.
- Showcase React’s new **`use()` hook** for data fetching.
- Handle loading/error UI via **App Router conventions** (`loading.tsx`, `error.tsx`) and Suspense/ErrorBoundary.
- Demonstrate static export (`next export`).  
- Provide mocks for demo and tests.
- Use ShadCN for UI primitives.
- Compare **plain `use()`** vs **TanStack Query caching**.

---

## Tech Stack

- **Language:** TypeScript.
- **Framework:** Next.js 15 (App Router, `next export`, `src/` convention, latest version).
- **React:** 19 (latest version).
- **Package manager:** pnpm with workspaces.
- **HTTP Client:** Axios.
- **Caching Demo:** TanStack Query (only for accounts feature).
- **UI library:** ShadCN + Tailwind CSS.
- **Mocking:** MSW.
- **E2E Testing:** Playwright.

---

## Monorepo Structure

```plaintext
sites/
  demo-app/
    src/
      app/
        profile/page.tsx
        profile/loading.tsx
        profile/error.tsx
        accounts/page.tsx
        accounts/error.tsx
        layout.tsx
      api/
        profile.ts
        accounts.ts
      mocks/
        handlers/
          profile.ts
          accounts.ts
        server.ts
    playwright/
      profile.spec.ts
      accounts.spec.ts

packages/
  api-client/          # @myrepo/api-client → shared Axios instance
  ui-components/       # @myrepo/ui-components (re-export ShadCN + shared bits)
  config-tailwind/     # @myrepo/config-tailwind
  config-eslint/       # @myrepo/config-eslint
```

---

## Core Packages

### `@myrepo/api-client`

- Shared Axios instance with interceptors for:
  - Auth token injection.  
  - Global session-expiry detection (emit event on 401).  
  - Normalized error objects.  

### `@myrepo/ui-components`

- Wraps and re-exports ShadCN components.  
- Adds shared design tokens and any extra generic UI (Spinner, ErrorBox).  

---

## Site Example (`demo-app`)

### API layer

```ts
// src/api/profile.ts
import { axios } from "@myrepo/api-client";

export async function getProfile() {
  const res = await axios.get("/me");
  return res.data;
}
```

```ts
// src/api/accounts.ts
import { axios } from "@myrepo/api-client";

export async function getAccounts() {
  const res = await axios.get("/accounts");
  return res.data;
}
```

---

### Profile Page (Suspense, no TanStack Query)

```tsx
// src/app/profile/page.tsx
import { use } from "react";
import { getProfile } from "@/api/profile";
import { Card } from "@myrepo/ui-components";

export default function ProfilePage() {
  const profile = use(getProfile());

  return (
    <Card>
      <h1>{profile.name}</h1>
      <p>{profile.email}</p>
    </Card>
  );
}
```

```tsx
// src/app/profile/loading.tsx
import { Spinner } from "@myrepo/ui-components";

export default function Loading() {
  return <Spinner />;
}
```

```tsx
// src/app/profile/error.tsx
"use client";

import { ErrorBox } from "@myrepo/ui-components";

export default function Error({ error }) {
  return <ErrorBox message={error.message} />;
}
```

---

### Accounts Page (with TanStack Query)

```tsx
// src/app/accounts/page.tsx
"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAccounts } from "@/api/accounts";
import { Button, Card } from "@myrepo/ui-components";

export default function AccountsPage() {
  const queryClient = useQueryClient();
  const { data: accounts, isLoading, error } = useQuery({
    queryKey: ["accounts"],
    queryFn: getAccounts,
  });

  if (isLoading) return <p>Loading accounts...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <Button onClick={() => queryClient.invalidateQueries(["accounts"])}>
        Refresh Accounts
      </Button>
      {accounts.map((acct) => (
        <Card key={acct.id}>
          <h2>{acct.name}</h2>
          <p>Balance: {acct.balance}</p>
        </Card>
      ))}
    </>
  );
}
```

---

## MSW Mock Setup (Playwright-only)

```ts
// src/mocks/handlers/profile.ts
import { rest } from "msw";

export const profileHandlers = [
  rest.get("/me", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ name: "Jane Doe", email: "jane@example.com" }));
  }),
];
```

```ts
// src/mocks/handlers/accounts.ts
import { rest } from "msw";

export const accountsHandlers = [
  rest.get("/accounts", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([
      { id: "1", name: "Checking", balance: 1000 },
      { id: "2", name: "Savings", balance: 5000 },
    ]));
  }),
];
```

```ts
// src/mocks/server.ts
import { setupServer } from "msw/node";
import { profileHandlers } from "./handlers/profile";
import { accountsHandlers } from "./handlers/accounts";

export const server = setupServer(...profileHandlers, ...accountsHandlers);
```

```ts
// tests/e2e/hooks/msw.ts
import { server } from "../../src/mocks/server";

export async function setupMSW() {
  server.listen({ onUnhandledRequest: "bypass" });
}

export async function teardownMSW() {
  server.close();
}
```

```ts
// tests/e2e/profile.spec.ts
import { test } from "@playwright/test";
import { setupMSW, teardownMSW } from "./hooks/msw";

test.beforeAll(async () => setupMSW());
test.afterAll(async () => teardownMSW());

test("profile page shows user data", async ({ page }) => {
  await page.goto("/profile");
  await page.waitForSelector("h1");
});
```

```ts
// tests/e2e/accounts.spec.ts
import { test } from "@playwright/test";
import { setupMSW, teardownMSW } from "./hooks/msw";

test.beforeAll(async () => setupMSW());
test.afterAll(async () => teardownMSW());

test("accounts page shows accounts and refresh works", async ({ page }) => {
  await page.goto("/accounts");
  await page.waitForSelector("h2");
  await page.click("text=Refresh Accounts");
});
```

---

## Features to Demonstrate
1. **Profile page:** session-resolved, Suspense + use() hook, no TanStack Query.
2. **Accounts page:** TanStack Query caching, refetch, loading/error UI.
3. **Compare approaches:** plain `use()` vs TanStack Query.
4. **Global session-expiry redirect** via api-client interceptor.
5. **E2E testing:** Playwright with Node-side MSW injection (no app layout modifications).
6. **UI:** ShadCN primitives for cards, buttons, spinner, error boxes.

---

## Deliverables

- Monorepo skeleton with pnpm workspaces.
- Working flow for profile + accounts features as above.
- MSW handlers integrated for Playwright tests.
- Documentation on running dev, production build, and e2e tests.

---

## Out of Scope

- Form submissions.
- SSR, GraphQL, realtime features.
