import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: '../../packages/schema/schema.graphql',
  documents: ['src/**/*.{ts,tsx}', 'src/**/*.graphql'],
  generates: {
    './src/lib/gql/': {
      preset: 'client',
      plugins: [],
    },
    './src/lib/gql/urql.ts': {
      plugins: ['typescript', 'typescript-operations', 'typescript-urql'],
      config: {
        withHooks: true,
        urqlImportFrom: 'urql',
        dedupeFragments: true,
      },
    },
    './src/lib/gql/introspection.json': {
      plugins: ['urql-introspection'],
    },
  },
  config: {
    strictScalars: true,
    scalars: {
      ID: 'string',
      String: 'string',
      Boolean: 'boolean',
      Int: 'number',
      Float: 'number',
    },
  },
}

export default config