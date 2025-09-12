import { mockUser } from "./data/mockUser";

export const accountBalances = new Map<string, number>();
mockUser.parties.forEach((party) => {
  party.accounts.forEach((account) => {
    accountBalances.set(account.id, account.balance);
  });
});

export function simulateBalanceUpdate(accountId: string) {
  const currentBalance = accountBalances.get(accountId) || 0;
  const change = Math.floor(Math.random() * 10000 - 5000);
  const newBalance = Math.max(0, currentBalance + change);
  accountBalances.set(accountId, newBalance);
  return newBalance;
}
