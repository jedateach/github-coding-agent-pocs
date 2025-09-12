import { graphql, HttpResponse } from "msw";
import { db } from "../data/db";

export const mutationHandlers = [
  graphql.mutation("Transfer", ({ variables }) => {
    const { input } = variables as any;
    
    const fromAccount = db.account.findFirst({ where: { id: { equals: input.fromAccountId } } });
    const toAccount = db.account.findFirst({ where: { id: { equals: input.toAccountId } } });
    
    if (!fromAccount || !toAccount) {
      return HttpResponse.json({ errors: [{ message: "Account not found" }] });
    }

    // Update account balances
    const newFromBalance = fromAccount.balance - input.amount;
    const newToBalance = toAccount.balance + input.amount;

    db.account.update({
      where: { id: { equals: input.fromAccountId } },
      data: { balance: newFromBalance },
    });

    db.account.update({
      where: { id: { equals: input.toAccountId } },
      data: { balance: newToBalance },
    });

    // Create transaction for the from account
    const transaction = db.transaction.create({
      id: `txn-transfer-${Date.now()}`,
      date: new Date().toISOString(),
      description: input.description || `Transfer to ${toAccount.name}`,
      amount: -input.amount,
      balanceAfter: newFromBalance,
      accountId: input.fromAccountId,
    });

    // Create corresponding transaction for the to account
    db.transaction.create({
      id: `txn-transfer-to-${Date.now()}`,
      date: new Date().toISOString(),
      description: input.description || `Transfer from ${fromAccount.name}`,
      amount: input.amount,
      balanceAfter: newToBalance,
      accountId: input.toAccountId,
    });

    return HttpResponse.json({ data: { transfer: transaction } });
  }),

  graphql.mutation("Payment", ({ variables }) => {
    const { input } = variables as any;
    
    const fromAccount = db.account.findFirst({ where: { id: { equals: input.fromAccountId } } });
    
    if (!fromAccount) {
      return HttpResponse.json({ errors: [{ message: "Account not found" }] });
    }

    // Update account balance
    const newBalance = fromAccount.balance - input.amount;
    
    db.account.update({
      where: { id: { equals: input.fromAccountId } },
      data: { balance: newBalance },
    });

    // Create transaction
    const transaction = db.transaction.create({
      id: `txn-payment-${Date.now()}`,
      date: new Date().toISOString(),
      description: input.description || `Payment to ${input.externalIban}`,
      amount: -input.amount,
      balanceAfter: newBalance,
      accountId: input.fromAccountId,
    });

    return HttpResponse.json({ data: { payment: transaction } });
  }),
];
