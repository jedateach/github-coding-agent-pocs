import { http, HttpResponse } from "msw";

export const accountsMockHandlers = [
  http.get("/api/accounts", () => {
    return HttpResponse.json([
      { id: "1", name: "Checking", balance: 1000 },
      { id: "2", name: "Savings", balance: 5000 },
    ]);
  }),
];