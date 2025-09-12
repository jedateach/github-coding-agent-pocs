// Helper to generate mock transactions for MSW and tests
export function generateMockTransactions(accountId: string, limit = 30, offset = 0) {
  const transactions = [];
  const baseBalance = 100000; // Start with $1000 base
  for (let i = offset; i < offset + limit; i++) {
    transactions.push({
      id: `txn-${accountId}-${i}`,
      accountId,
      amount: Math.floor(Math.random() * 10000) - 5000, // Random +/- $50
      date: new Date(Date.now() - i * 86400000).toISOString(),
      description: `Mock transaction #${i + 1}`,
      type: i % 2 === 0 ? "DEBIT" : "CREDIT",
      balance: baseBalance + (i * 1000),
    });
  }
  return transactions;
}
