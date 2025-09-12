import { graphql, HttpResponse } from "msw";
import { accountBalances } from "../accountBalances";

export const mutationHandlers = [
  graphql.mutation("Transfer", ({ variables }) => {
    const { input } = variables as any;
    const fromBalance = accountBalances.get(input.fromAccountId) || 0;
    const toBalance = accountBalances.get(input.toAccountId) || 0;
    accountBalances.set(input.fromAccountId, fromBalance - input.amount);
    accountBalances.set(input.toAccountId, toBalance + input.amount);
    const transaction = {
      id: `txn-transfer-${Date.now()}`,
      date: new Date().toISOString(),
      description: input.description || "Transfer",
      amount: -input.amount,
      balanceAfter: fromBalance - input.amount,
    };
    return HttpResponse.json({ data: { transfer: transaction } });
  }),

  graphql.mutation("Payment", ({ variables }) => {
    const { input } = variables as any;
    const fromBalance = accountBalances.get(input.fromAccountId) || 0;
    accountBalances.set(input.fromAccountId, fromBalance - input.amount);
    const transaction = {
      id: `txn-payment-${Date.now()}`,
      date: new Date().toISOString(),
      description: input.description || `Payment to ${input.externalIban}`,
      amount: -input.amount,
      balanceAfter: fromBalance - input.amount,
    };
    return HttpResponse.json({ data: { payment: transaction } });
  }),
];
