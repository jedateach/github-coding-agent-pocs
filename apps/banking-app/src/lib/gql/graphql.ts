/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Account = {
  __typename?: 'Account';
  balance: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  transactions: Array<Transaction>;
  type: AccountType;
};


export type AccountTransactionsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export enum AccountType {
  Checking = 'CHECKING',
  Credit = 'CREDIT',
  Savings = 'SAVINGS'
}

export type Mutation = {
  __typename?: 'Mutation';
  payment: Transaction;
  transfer: Transaction;
};


export type MutationPaymentArgs = {
  input: PaymentInput;
};


export type MutationTransferArgs = {
  input: TransferInput;
};

export type Party = {
  __typename?: 'Party';
  accounts: Array<Account>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  type: PartyType;
};

export enum PartyType {
  Business = 'BUSINESS',
  Person = 'PERSON'
}

export type PaymentInput = {
  amount: Scalars['Int']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  externalIban: Scalars['String']['input'];
  fromAccountId: Scalars['ID']['input'];
};

export type Query = {
  __typename?: 'Query';
  account?: Maybe<Account>;
  currentUser: User;
  party?: Maybe<Party>;
};


export type QueryAccountArgs = {
  id: Scalars['ID']['input'];
};


export type QueryPartyArgs = {
  id: Scalars['ID']['input'];
};

export type Subscription = {
  __typename?: 'Subscription';
  accountBalanceUpdated: Account;
  transactionAdded: Transaction;
};


export type SubscriptionAccountBalanceUpdatedArgs = {
  accountId: Scalars['ID']['input'];
};


export type SubscriptionTransactionAddedArgs = {
  accountId: Scalars['ID']['input'];
};

export type Transaction = {
  __typename?: 'Transaction';
  amount: Scalars['Int']['output'];
  balanceAfter: Scalars['Int']['output'];
  date: Scalars['String']['output'];
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
};

export type TransferInput = {
  amount: Scalars['Int']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  fromAccountId: Scalars['ID']['input'];
  toAccountId: Scalars['ID']['input'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  parties: Array<Party>;
};

export type GetAccountQueryVariables = Exact<{
  id: Scalars['ID']['input'];
  transactionLimit?: InputMaybe<Scalars['Int']['input']>;
  transactionOffset?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetAccountQuery = { __typename?: 'Query', account?: { __typename?: 'Account', id: string, name: string, type: AccountType, balance: number, transactions: Array<{ __typename?: 'Transaction', id: string, date: string, description: string, amount: number, balanceAfter: number }> } | null };

export type TransferMutationVariables = Exact<{
  input: TransferInput;
}>;


export type TransferMutation = { __typename?: 'Mutation', transfer: { __typename?: 'Transaction', id: string, date: string, description: string, amount: number, balanceAfter: number } };

export type PaymentMutationVariables = Exact<{
  input: PaymentInput;
}>;


export type PaymentMutation = { __typename?: 'Mutation', payment: { __typename?: 'Transaction', id: string, date: string, description: string, amount: number, balanceAfter: number } };

export type GetCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentUserQuery = { __typename?: 'Query', currentUser: { __typename?: 'User', id: string, name: string, parties: Array<{ __typename?: 'Party', id: string, type: PartyType, name: string, accounts: Array<{ __typename?: 'Account', id: string, name: string, type: AccountType, balance: number }> }> } };

export type SubscribeToAccountBalanceSubscriptionVariables = Exact<{
  accountId: Scalars['ID']['input'];
}>;


export type SubscribeToAccountBalanceSubscription = { __typename?: 'Subscription', accountBalanceUpdated: { __typename?: 'Account', id: string, balance: number } };

export type SubscribeToTransactionsSubscriptionVariables = Exact<{
  accountId: Scalars['ID']['input'];
}>;


export type SubscribeToTransactionsSubscription = { __typename?: 'Subscription', transactionAdded: { __typename?: 'Transaction', id: string, date: string, description: string, amount: number, balanceAfter: number } };


export const GetAccountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAccount"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"transactionLimit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"transactionOffset"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"account"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"balance"}},{"kind":"Field","name":{"kind":"Name","value":"transactions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"transactionLimit"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"transactionOffset"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"balanceAfter"}}]}}]}}]}}]} as unknown as DocumentNode<GetAccountQuery, GetAccountQueryVariables>;
export const TransferDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Transfer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TransferInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"transfer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"balanceAfter"}}]}}]}}]} as unknown as DocumentNode<TransferMutation, TransferMutationVariables>;
export const PaymentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Payment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PaymentInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"payment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"balanceAfter"}}]}}]}}]} as unknown as DocumentNode<PaymentMutation, PaymentMutationVariables>;
export const GetCurrentUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCurrentUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"parties"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"accounts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"balance"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetCurrentUserQuery, GetCurrentUserQueryVariables>;
export const SubscribeToAccountBalanceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"SubscribeToAccountBalance"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"accountId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accountBalanceUpdated"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"accountId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"accountId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"balance"}}]}}]}}]} as unknown as DocumentNode<SubscribeToAccountBalanceSubscription, SubscribeToAccountBalanceSubscriptionVariables>;
export const SubscribeToTransactionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"SubscribeToTransactions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"accountId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"transactionAdded"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"accountId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"accountId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"balanceAfter"}}]}}]}}]} as unknown as DocumentNode<SubscribeToTransactionsSubscription, SubscribeToTransactionsSubscriptionVariables>;