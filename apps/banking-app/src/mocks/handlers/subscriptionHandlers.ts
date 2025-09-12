import { http, HttpResponse } from "msw";
import { accountBalances, simulateBalanceUpdate } from "../accountBalances";

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
      // Initial balance event
      let balance = accountBalances.get(accountId) || 0;
      sendSSE(controller, "next", id, {
        data: {
          accountBalanceUpdated: {
            id: accountId,
            balance,
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
          // Random payment between $1.00 and $8.00, in cents
          const payment = Math.floor(Math.random() * (800 - 100 + 1)) + 100;
          balance += payment;
          sendSSE(controller, "next", id, {
            data: {
              accountBalanceUpdated: {
                id: accountId,
                balance,
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
      let count = 0;
      const interval = setInterval(() => {
        // Generate a more unique transaction ID using accountId, timestamp, and a random suffix
        const transaction = {
          id: `txn-${accountId}-${Date.now()}-${Math.floor(
            Math.random() * 1000000
          )}`,
          date: new Date().toISOString(),
          description: "Live transaction update",
          amount: Math.floor(Math.random() * 10000 - 5000),
          balanceAfter: accountBalances.get(accountId) || 0,
        };
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
