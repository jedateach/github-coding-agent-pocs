import { graphql, HttpResponse } from "msw";
import { mockUser } from "../data/mockUser";
import { generateMockTransactions } from "../data/generateMockTransactions";
import { accountBalances } from "../accountBalances";

export const queryHandlers = [
  graphql.query("GetCurrentUser", () => {
    const updatedUser = {
      ...mockUser,
      parties: mockUser.parties.map((party) => ({
        ...party,
        accounts: party.accounts.map((account) => ({
          ...account,
          balance: accountBalances.get(account.id) || account.balance,
        })),
      })),
    };
    return HttpResponse.json({ data: { currentUser: updatedUser } });
  }),

  graphql.query("GetAccount", ({ variables }) => {
    const {
      id,
      transactionLimit = 30,
      transactionOffset = 0,
    } = variables as any;
    let account = null;
    for (const party of mockUser.parties) {
      const foundAccount = party.accounts.find((acc) => acc.id === id);
      if (foundAccount) {
        account = {
          ...foundAccount,
          balance: accountBalances.get(id) || foundAccount.balance,
          transactions: generateMockTransactions(
            id,
            transactionLimit,
            transactionOffset
          ),
        };
        break;
      }
    }
    if (!account) {
      return HttpResponse.json({ errors: [{ message: "Account not found" }] });
    }
    return HttpResponse.json({ data: { account } });
  }),
];
