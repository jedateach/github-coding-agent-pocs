import { factory, primaryKey } from "@mswjs/data";

// Define the data models matching our GraphQL schema
export const db = factory({
  user: {
    id: primaryKey(String),
    name: String,
  },
  party: {
    id: primaryKey(String),
    type: String, // PERSON | BUSINESS
    name: String,
    userId: String,
  },
  account: {
    id: primaryKey(String),
    name: String,
    type: String, // CHECKING | SAVINGS | CREDIT
    balance: Number, // balance in cents
    partyId: String,
  },
  transaction: {
    id: primaryKey(String),
    date: String,
    description: String,
    amount: Number, // positive = credit, negative = debit
    balanceAfter: Number,
    accountId: String,
  },
});

// Initialize with seed data
export function initializeDatabase() {
  // Clear existing data
  db.user.deleteMany({ where: {} });
  db.party.deleteMany({ where: {} });
  db.account.deleteMany({ where: {} });
  db.transaction.deleteMany({ where: {} });

  // Create main user
  const user = db.user.create({
    id: "1",
    name: "John Doe",
  });

  // Create personal party
  const personalParty = db.party.create({
    id: "party-1",
    type: "PERSON",
    name: "John Doe",
    userId: user.id,
  });

  // Create business party
  const businessParty = db.party.create({
    id: "party-2",
    type: "BUSINESS",
    name: "Acme Corp",
    userId: user.id,
  });

  // Create personal accounts
  const checkingAccount = db.account.create({
    id: "acc-1",
    name: "Checking Account",
    type: "CHECKING",
    balance: 250000, // $2,500.00 in cents
    partyId: personalParty.id,
  });

  const savingsAccount = db.account.create({
    id: "acc-2",
    name: "Savings Account",
    type: "SAVINGS",
    balance: 1500000, // $15,000.00 in cents
    partyId: personalParty.id,
  });

  // Create business accounts
  const businessCheckingAccount = db.account.create({
    id: "acc-3",
    name: "Business Checking",
    type: "CHECKING",
    balance: 500000, // $5,000.00 in cents
    partyId: businessParty.id,
  });

  // Create some initial transactions for each account
  const accounts = [checkingAccount, savingsAccount, businessCheckingAccount];

  accounts.forEach((account) => {
    let currentBalance = account.balance;

    // Generate 30 historical transactions
    for (let i = 0; i < 30; i++) {
      const amount = Math.floor(Math.random() * 10000) - 5000; // Random +/- $50
      currentBalance -= amount; // Work backwards from current balance

      db.transaction.create({
        id: `txn-${account.id}-${i}`,
        accountId: account.id,
        amount,
        date: new Date(Date.now() - (30 - i) * 86400000).toISOString(), // 30 days ago to now
        description: `Transaction #${i + 1}`,
        balanceAfter: currentBalance,
      });
    }
  });

  return {
    user,
    parties: [personalParty, businessParty],
    accounts: [checkingAccount, savingsAccount, businessCheckingAccount],
  };
}
