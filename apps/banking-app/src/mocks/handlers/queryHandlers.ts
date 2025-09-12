import { graphql, HttpResponse } from "msw";
import { db } from "../data/db";

export const queryHandlers = [
  graphql.query("GetCurrentUser", () => {
    const user = db.user.findFirst({ where: { id: { equals: '1' } } });
    if (!user) {
      return HttpResponse.json({ errors: [{ message: "User not found" }] });
    }

    const parties = db.party.findMany({ where: { userId: { equals: user.id } } });
    const partiesWithAccounts = parties.map((party) => {
      const accounts = db.account.findMany({ where: { partyId: { equals: party.id } } });
      return {
        ...party,
        accounts,
      };
    });

    const currentUser = {
      ...user,
      parties: partiesWithAccounts,
    };

    return HttpResponse.json({ data: { currentUser } });
  }),

  graphql.query("GetAccount", ({ variables }) => {
    const {
      id,
      transactionLimit = 30,
      transactionOffset = 0,
    } = variables as any;
    
    const account = db.account.findFirst({ where: { id: { equals: id } } });
    if (!account) {
      return HttpResponse.json({ errors: [{ message: "Account not found" }] });
    }

    // Get transactions for this account with pagination
    const transactions = db.transaction.findMany({
      where: { accountId: { equals: id } },
      orderBy: { date: 'desc' },
      take: transactionLimit,
      skip: transactionOffset,
    });

    const accountWithTransactions = {
      ...account,
      transactions,
    };

    return HttpResponse.json({ data: { account: accountWithTransactions } });
  }),
];
