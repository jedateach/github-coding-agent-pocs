import { http, HttpResponse } from "msw";
import { db } from "../data/db";

// --- Protocol Utilities ---
const SSE_HEADERS = {
  "Content-Type": "text/event-stream",
  "Cache-Control": "no-cache",
  Connection: "keep-alive",
};

function singleEventStream(
  event: string,
  id: string,
  data?: any
): ReadableStream {
  return new ReadableStream({
    start(controller) {
      sendSSE(controller, event, id, data);
      controller.close();
    },
  });
}

function createSSEHttpResponse(stream: ReadableStream): HttpResponse<any> {
  return new HttpResponse(stream, { headers: SSE_HEADERS });
}
// --- Protocol Utilities ---
const encoder = new TextEncoder();

function validateGraphQLRequest(body: any):
  | {
      query: string;
      variables: Record<string, any>;
      operationName?: string;
      id: string;
    }
  | { error: HttpResponse<any> } {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return {
      error: new HttpResponse(
        JSON.stringify({
          errors: [{ message: "Malformed GraphQL request body" }],
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      ),
    };
  }
  const { query, variables, operationName, id } = body;
  if (!query || typeof query !== "string") {
    return {
      error: new HttpResponse(
        JSON.stringify({
          errors: [{ message: "Missing or invalid 'query' field" }],
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      ),
    };
  }
  return { query, variables: variables ?? {}, operationName, id };
}

function sendSSE(
  controller: ReadableStreamDefaultController,
  event: string,
  id: string,
  data?: any
) {
  let payload = `id: ${id}\nevent: ${event}`;
  if (data !== undefined) {
    payload += `\ndata: ${JSON.stringify(data)}`;
  }
  payload += `\n\n`;
  controller.enqueue(encoder.encode(payload));
}

function errorStream(id: string, errors: any[]): ReadableStream {
  return new ReadableStream({
    start(controller) {
      sendSSE(controller, "error", id, { errors });
      controller.close();
    },
  });
}

// --- Main Handler ---
export const subscriptionHandlers = [
  http.post("/api/graphql-sse", async ({ request }) => {
    let body;
    try {
      body = await request.json();
    } catch (e) {
      return new HttpResponse(
        JSON.stringify({ errors: [{ message: "Invalid JSON body" }] }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const validated = validateGraphQLRequest(body);
    if ("error" in validated) {
      debugger;
      return validated.error;
    }
    const { query, variables, operationName, id } = validated;

    // Route to domain-specific subscription
    if (
      operationName === "SubscribeToAccountBalance" ||
      query?.includes("SubscribeToAccountBalance")
    ) {
      const accountId = variables?.accountId;
      if (!accountId) {
        return createSSEHttpResponse(
          singleEventStream("error", id, {
            errors: [{ message: "Missing accountId parameter" }],
          })
        );
      }
      return createSSEHttpResponse(accountBalanceStream(accountId, id));
    }
    if (
      operationName === "SubscribeToTransactions" ||
      query?.includes("SubscribeToTransactions")
    ) {
      const accountId = variables?.accountId;
      if (!accountId) {
        return createSSEHttpResponse(
          singleEventStream("error", id, {
            errors: [{ message: "Missing accountId parameter" }],
          })
        );
      }
      return createSSEHttpResponse(transactionsStream(accountId, id));
    }
    // Unknown subscription
    return createSSEHttpResponse(
      singleEventStream("error", id, {
        errors: [{ message: "Unknown subscription" }],
      })
    );
  }),
];

// --- Domain Subscription Streams ---
function accountBalanceStream(accountId: string, id: string): ReadableStream {
  return new ReadableStream({
    start(controller) {
      // Get initial balance from database
      const account = db.account.findFirst({ where: { id: { equals: accountId } } });
      if (!account) {
        sendSSE(controller, "error", id, {
          errors: [{ message: "Account not found" }],
        });
        controller.close();
        return;
      }

      // Send initial balance event
      sendSSE(controller, "next", id, {
        data: {
          accountBalanceUpdated: {
            id: accountId,
            balance: account.balance,
          },
        },
      });

      // Bursty balance updates
      let count = 0;
      let active = true;
      function burstUpdate() {
        if (!active || count >= 300) {
          sendSSE(controller, "complete", id);
          return;
        }
        // Simulate a burst: 2-8 rapid updates
        const burstSize = Math.floor(Math.random() * 7) + 2;
        for (let i = 0; i < burstSize && count < 300; i++) {
          // Get current balance from database
          const currentAccount = db.account.findFirst({ where: { id: { equals: accountId } } });
          if (!currentAccount) return;

          // Random payment between $1.00 and $8.00, in cents
          const payment = Math.floor(Math.random() * (800 - 100 + 1)) + 100;
          const newBalance = currentAccount.balance + payment;
          
          // Update the database
          db.account.update({
            where: { id: { equals: accountId } },
            data: { balance: newBalance },
          });

          sendSSE(controller, "next", id, {
            data: {
              accountBalanceUpdated: {
                id: accountId,
                balance: newBalance,
                payment,
                description: `Payment received: $${(payment / 100).toFixed(2)}`,
                timestamp: new Date().toISOString(),
              },
            },
          });
          count++;
        }
        // Wait 200ms to 2s before next burst
        if (count < 300) {
          const nextDelay = Math.floor(Math.random() * 1800) + 200;
          setTimeout(burstUpdate, nextDelay);
        } else {
          sendSSE(controller, "complete", id);
        }
      }
      burstUpdate();
      return () => {
        active = false;
      };
    },
  });
}

function transactionsStream(accountId: string, id: string): ReadableStream {
  return new ReadableStream({
    start(controller) {
      // Verify account exists
      const account = db.account.findFirst({ where: { id: { equals: accountId } } });
      if (!account) {
        sendSSE(controller, "error", id, {
          errors: [{ message: "Account not found" }],
        });
        controller.close();
        return;
      }

      let count = 0;
      const interval = setInterval(() => {
        // Get current balance from database
        const currentAccount = db.account.findFirst({ where: { id: { equals: accountId } } });
        if (!currentAccount) return;

        const amount = Math.floor(Math.random() * 10000 - 5000);
        const newBalance = currentAccount.balance + amount;
        
        // Update account balance in database
        db.account.update({
          where: { id: { equals: accountId } },
          data: { balance: newBalance },
        });

        // Create new transaction in database
        const transaction = db.transaction.create({
          id: `txn-live-${accountId}-${Date.now()}-${Math.floor(Math.random() * 1000000)}`,
          date: new Date().toISOString(),
          description: "Live transaction update",
          amount,
          balanceAfter: newBalance,
          accountId,
        });

        sendSSE(controller, "next", id, {
          data: {
            transactionAdded: transaction,
          },
        });
        count++;
        if (count >= 3) {
          clearInterval(interval);
          sendSSE(controller, "complete", id);
        }
      }, 1000);
      return () => {
        clearInterval(interval);
      };
    },
  });
}
