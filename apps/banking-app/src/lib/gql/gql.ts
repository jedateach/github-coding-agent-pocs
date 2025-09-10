/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "query GetAccount($id: ID!, $transactionLimit: Int, $transactionOffset: Int) {\n  account(id: $id) {\n    id\n    name\n    type\n    balance\n    transactions(limit: $transactionLimit, offset: $transactionOffset) {\n      id\n      date\n      description\n      amount\n      balanceAfter\n    }\n  }\n}": typeof types.GetAccountDocument,
    "mutation Transfer($input: TransferInput!) {\n  transfer(input: $input) {\n    id\n    date\n    description\n    amount\n    balanceAfter\n  }\n}\n\nmutation Payment($input: PaymentInput!) {\n  payment(input: $input) {\n    id\n    date\n    description\n    amount\n    balanceAfter\n  }\n}": typeof types.TransferDocument,
    "query GetCurrentUser {\n  currentUser {\n    id\n    name\n    parties {\n      id\n      type\n      name\n      accounts {\n        id\n        name\n        type\n        balance\n      }\n    }\n  }\n}": typeof types.GetCurrentUserDocument,
    "subscription SubscribeToAccountBalance($accountId: ID!) {\n  accountBalanceUpdated(accountId: $accountId) {\n    id\n    balance\n  }\n}\n\nsubscription SubscribeToTransactions($accountId: ID!) {\n  transactionAdded(accountId: $accountId) {\n    id\n    date\n    description\n    amount\n    balanceAfter\n  }\n}": typeof types.SubscribeToAccountBalanceDocument,
};
const documents: Documents = {
    "query GetAccount($id: ID!, $transactionLimit: Int, $transactionOffset: Int) {\n  account(id: $id) {\n    id\n    name\n    type\n    balance\n    transactions(limit: $transactionLimit, offset: $transactionOffset) {\n      id\n      date\n      description\n      amount\n      balanceAfter\n    }\n  }\n}": types.GetAccountDocument,
    "mutation Transfer($input: TransferInput!) {\n  transfer(input: $input) {\n    id\n    date\n    description\n    amount\n    balanceAfter\n  }\n}\n\nmutation Payment($input: PaymentInput!) {\n  payment(input: $input) {\n    id\n    date\n    description\n    amount\n    balanceAfter\n  }\n}": types.TransferDocument,
    "query GetCurrentUser {\n  currentUser {\n    id\n    name\n    parties {\n      id\n      type\n      name\n      accounts {\n        id\n        name\n        type\n        balance\n      }\n    }\n  }\n}": types.GetCurrentUserDocument,
    "subscription SubscribeToAccountBalance($accountId: ID!) {\n  accountBalanceUpdated(accountId: $accountId) {\n    id\n    balance\n  }\n}\n\nsubscription SubscribeToTransactions($accountId: ID!) {\n  transactionAdded(accountId: $accountId) {\n    id\n    date\n    description\n    amount\n    balanceAfter\n  }\n}": types.SubscribeToAccountBalanceDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetAccount($id: ID!, $transactionLimit: Int, $transactionOffset: Int) {\n  account(id: $id) {\n    id\n    name\n    type\n    balance\n    transactions(limit: $transactionLimit, offset: $transactionOffset) {\n      id\n      date\n      description\n      amount\n      balanceAfter\n    }\n  }\n}"): (typeof documents)["query GetAccount($id: ID!, $transactionLimit: Int, $transactionOffset: Int) {\n  account(id: $id) {\n    id\n    name\n    type\n    balance\n    transactions(limit: $transactionLimit, offset: $transactionOffset) {\n      id\n      date\n      description\n      amount\n      balanceAfter\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation Transfer($input: TransferInput!) {\n  transfer(input: $input) {\n    id\n    date\n    description\n    amount\n    balanceAfter\n  }\n}\n\nmutation Payment($input: PaymentInput!) {\n  payment(input: $input) {\n    id\n    date\n    description\n    amount\n    balanceAfter\n  }\n}"): (typeof documents)["mutation Transfer($input: TransferInput!) {\n  transfer(input: $input) {\n    id\n    date\n    description\n    amount\n    balanceAfter\n  }\n}\n\nmutation Payment($input: PaymentInput!) {\n  payment(input: $input) {\n    id\n    date\n    description\n    amount\n    balanceAfter\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetCurrentUser {\n  currentUser {\n    id\n    name\n    parties {\n      id\n      type\n      name\n      accounts {\n        id\n        name\n        type\n        balance\n      }\n    }\n  }\n}"): (typeof documents)["query GetCurrentUser {\n  currentUser {\n    id\n    name\n    parties {\n      id\n      type\n      name\n      accounts {\n        id\n        name\n        type\n        balance\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "subscription SubscribeToAccountBalance($accountId: ID!) {\n  accountBalanceUpdated(accountId: $accountId) {\n    id\n    balance\n  }\n}\n\nsubscription SubscribeToTransactions($accountId: ID!) {\n  transactionAdded(accountId: $accountId) {\n    id\n    date\n    description\n    amount\n    balanceAfter\n  }\n}"): (typeof documents)["subscription SubscribeToAccountBalance($accountId: ID!) {\n  accountBalanceUpdated(accountId: $accountId) {\n    id\n    balance\n  }\n}\n\nsubscription SubscribeToTransactions($accountId: ID!) {\n  transactionAdded(accountId: $accountId) {\n    id\n    date\n    description\n    amount\n    balanceAfter\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;