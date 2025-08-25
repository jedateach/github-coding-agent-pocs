# GraphQL Prototype Specification

## Overview

This prototype demonstrates:

- A **GraphQL backend** that composes data from two mocked backend services.
- A **Next.js client** (running in static mode) consuming the GraphQL API.
- **Code generation** to provide automatic TypeScript typings for GraphQL queries and mutations.
- **Query and mutation examples** that highlight resolver composition.

---

## Use Case: User Profile + Account Settings

We model a `User` entity composed from two backend services:

1. **Identity Service** – stores `id`, `name`, `email`.
2. **Preferences Service** – stores `theme`, `notificationsEnabled`.

GraphQL resolvers merge these services to present a unified `User`.

### Example Query

```
query GetUser($id: ID!) {
  user(id: $id) {
    id
    name
    email
    preferences {
      theme
      notificationsEnabled
    }
  }
}
```

### Example Mutation

```
mutation UpdateUserPreferences($id: ID!, $theme: String!, $notificationsEnabled: Boolean!) {
  updatePreferences(id: $id, theme: $theme, notificationsEnabled: $notificationsEnabled) {
    id
    preferences {
      theme
      notificationsEnabled
    }
  }
}
```

---

## GraphQL Backend

### Technology

- Apollo Server (or GraphQL Yoga).
- SDL-first schema definition.
- Mocked services for Identity and Preferences.

### Schema

```
type User {
  id: ID!
  name: String!
  email: String!
  preferences: Preferences!
}

type Preferences {
  theme: String!
  notificationsEnabled: Boolean!
}

type Query {
  user(id: ID!): User
}

type Mutation {
  updatePreferences(id: ID!, theme: String!, notificationsEnabled: Boolean!): User
}
```

### Resolvers

- `Query.user` → fetches `id`, `name`, `email` from **Identity Service**, then `preferences` from **Preferences Service**.
- `Mutation.updatePreferences` → updates Preferences Service and returns the merged user object.

Mock services may be simple in-memory objects or REST stubs.

---

## Next.js Client

### Technology

- Next.js in **static export mode**.
- Apollo Client (or urql) for queries.
- GraphQL Code Generator for types.

### File Layout

```
/src
  /graphql
    queries/
      getUser.graphql
      updatePreferences.graphql
    generated.tsx
  /pages
    profile.tsx
```

### Example Component

```tsx
"use client";
import {
  useGetUserQuery,
  useUpdatePreferencesMutation,
} from "../graphql/generated";

export default function ProfilePage() {
  const { data, loading } = useGetUserQuery({ variables: { id: "1" } });
  const [updatePreferences] = useUpdatePreferencesMutation();

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>{data?.user?.name}</h1>
      <p>{data?.user?.email}</p>
      <p>Theme: {data?.user?.preferences.theme}</p>
      <button
        onClick={() =>
          updatePreferences({
            variables: { id: "1", theme: "dark", notificationsEnabled: true },
          })
        }
      >
        Set Dark Mode
      </button>
    </div>
  );
}
```

---

## Code Generation

### Configuration (`codegen.yml`)

```
schema: http://localhost:4000/graphql
documents: "src/**/*.graphql"
generates:
  src/graphql/generated.tsx:
    plugins:
      - typescript
      - typescript-operations
      - typescript-react-apollo
```

### Run Codegen

```
yarn graphql-codegen
```

This generates React hooks like:

- `useGetUserQuery`
- `useUpdatePreferencesMutation`

---

## Demonstration Goals

This prototype illustrates:

1. **Resolver composition** from two backend services.
2. **Client-side GraphQL in Next.js static mode**.
3. **Type-safe queries and mutations via codegen**.
4. **End-to-end demo** of reading and writing user + preferences.
