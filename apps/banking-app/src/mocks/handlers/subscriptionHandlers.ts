import { http, HttpResponse } from "msw";
import { accountBalances, simulateBalanceUpdate } from "../accountBalances";

export const subscriptionHandlers = [
  http.post("/api/graphql-sse", ({ request }) => {
    const url = new URL(request.url);
    const query = url.searchParams.get("query");
    const variablesParam = url.searchParams.get("variables");
    let variables = {};
    try {
      variables = variablesParam ? JSON.parse(variablesParam) : {};
    } catch (e) {
      console.error("Failed to parse variables:", e);
    }
    const encoder = new TextEncoder();
    if (query?.includes("SubscribeToAccountBalance")) {
      const accountId = (variables as any)?.accountId;
      if (!accountId) {
        return new HttpResponse("Missing accountId parameter", { status: 400 });
      }
      const stream = new ReadableStream({
        start(controller) {
          const initialBalance = accountBalances.get(accountId) || 0;
          const initialData = {
            data: {
              accountBalanceUpdated: {
                id: accountId,
                balance: initialBalance,
              },
            },
          };
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify(initialData)}\n\n`)
          );
          const interval = setInterval(() => {
            const newBalance = simulateBalanceUpdate(accountId);
            const updateData = {
              data: {
                accountBalanceUpdated: {
                  id: accountId,
                  balance: newBalance,
                },
              },
            };
            try {
              controller.enqueue(
                encoder.encode(`data: ${JSON.stringify(updateData)}\n\n`)
              );
            } catch (error) {
              clearInterval(interval);
            }
          }, 5000);
          return () => {
            clearInterval(interval);
          };
        },
      });
      return new HttpResponse(stream, {
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          Connection: "keep-alive",
        },
      });
    }
    if (query?.includes("SubscribeToTransactions")) {
      const accountId = (variables as any)?.accountId;
      if (!accountId) {
        return new HttpResponse("Missing accountId parameter", { status: 400 });
      }
      const stream = new ReadableStream({
        start(controller) {
          const interval = setInterval(() => {
            const transaction = {
              id: `txn-live-${Date.now()}`,
              date: new Date().toISOString(),
              description: "Live transaction update",
              amount: Math.floor(Math.random() * 10000 - 5000),
              balanceAfter: accountBalances.get(accountId) || 0,
            };
            const updateData = {
              data: {
                transactionAdded: transaction,
              },
            };
            try {
              controller.enqueue(
                encoder.encode(`data: ${JSON.stringify(updateData)}\n\n`)
              );
            } catch (error) {
              clearInterval(interval);
            }
          }, 10000);
          return () => {
            clearInterval(interval);
          };
        },
      });
      return new HttpResponse(stream, {
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          Connection: "keep-alive",
        },
      });
    }
    return new HttpResponse("Unknown subscription", { status: 400 });
  }),
];
