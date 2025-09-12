// User fixture for MSW and tests
export const mockUser = {
  id: "1",
  name: "John Doe",
  parties: [
    {
      id: "party-1",
      type: "PERSON",
      name: "John Doe (Personal)",
      accounts: [
        {
          id: "acc-1",
          name: "Checking Account",
          type: "CHECKING",
          balance: 250000, // $2,500.00 in cents
        },
        {
          id: "acc-2",
          name: "Savings Account",
          type: "SAVINGS",
          balance: 1500000, // $15,000.00 in cents
        },
      ],
    },
    {
      id: "party-2",
      type: "BUSINESS",
      name: "Acme Corp",
      accounts: [
        {
          id: "acc-3",
          name: "Business Checking",
          type: "CHECKING",
          balance: 500000, // $5,000.00 in cents
        },
        {
          id: "acc-4",
          name: "Business Savings",
          type: "SAVINGS",
          balance: 2500000, // $25,000.00 in cents
        },
      ],
    },
  ],
};
