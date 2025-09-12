import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
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


export const GetAccountDocument = gql`
    query GetAccount($id: ID!, $transactionLimit: Int, $transactionOffset: Int) {
  account(id: $id) {
    id
    name
    type
    balance
    transactions(limit: $transactionLimit, offset: $transactionOffset) {
      id
      date
      description
      amount
      balanceAfter
    }
  }
}
    `;

export function useGetAccountQuery(options: Omit<Urql.UseQueryArgs<GetAccountQueryVariables>, 'query'>) {
  return Urql.useQuery<GetAccountQuery, GetAccountQueryVariables>({ query: GetAccountDocument, ...options });
};
export const TransferDocument = gql`
    mutation Transfer($input: TransferInput!) {
  transfer(input: $input) {
    id
    date
    description
    amount
    balanceAfter
  }
}
    `;

export function useTransferMutation() {
  return Urql.useMutation<TransferMutation, TransferMutationVariables>(TransferDocument);
};
export const PaymentDocument = gql`
    mutation Payment($input: PaymentInput!) {
  payment(input: $input) {
    id
    date
    description
    amount
    balanceAfter
  }
}
    `;

export function usePaymentMutation() {
  return Urql.useMutation<PaymentMutation, PaymentMutationVariables>(PaymentDocument);
};
export const GetCurrentUserDocument = gql`
    query GetCurrentUser {
  currentUser {
    id
    name
    parties {
      id
      type
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
    `;

export function useGetCurrentUserQuery(options?: Omit<Urql.UseQueryArgs<GetCurrentUserQueryVariables>, 'query'>) {
  return Urql.useQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>({ query: GetCurrentUserDocument, ...options });
};
export const SubscribeToAccountBalanceDocument = gql`
    subscription SubscribeToAccountBalance($accountId: ID!) {
  accountBalanceUpdated(accountId: $accountId) {
    id
    balance
  }
}
    `;

export function useSubscribeToAccountBalanceSubscription<TData = SubscribeToAccountBalanceSubscription>(options: Omit<Urql.UseSubscriptionArgs<SubscribeToAccountBalanceSubscriptionVariables>, 'query'>, handler?: Urql.SubscriptionHandler<SubscribeToAccountBalanceSubscription, TData>) {
  return Urql.useSubscription<SubscribeToAccountBalanceSubscription, TData, SubscribeToAccountBalanceSubscriptionVariables>({ query: SubscribeToAccountBalanceDocument, ...options }, handler);
};
export const SubscribeToTransactionsDocument = gql`
    subscription SubscribeToTransactions($accountId: ID!) {
  transactionAdded(accountId: $accountId) {
    id
    date
    description
    amount
    balanceAfter
  }
}
    `;

export function useSubscribeToTransactionsSubscription<TData = SubscribeToTransactionsSubscription>(options: Omit<Urql.UseSubscriptionArgs<SubscribeToTransactionsSubscriptionVariables>, 'query'>, handler?: Urql.SubscriptionHandler<SubscribeToTransactionsSubscription, TData>) {
  return Urql.useSubscription<SubscribeToTransactionsSubscription, TData, SubscribeToTransactionsSubscriptionVariables>({ query: SubscribeToTransactionsDocument, ...options }, handler);
};