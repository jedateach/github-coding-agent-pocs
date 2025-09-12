import { subscriptionExchange } from "urql";
import { createClient as createSSEClient } from "graphql-sse";

interface SSEExchangeOptions {
  url: string;
}

export function sseSubscriptionExchange(options: SSEExchangeOptions) {
  const sseClient = createSSEClient({
    url: options.url,
  });

  return subscriptionExchange({
    forwardSubscription(operation) {
      return {
        subscribe: (sink) => {
          if (!operation.query) {
            sink.error(new Error("No query provided"));
            return { unsubscribe: () => {} };
          }

          const dispose = sseClient.subscribe(
            {
              query: operation.query,
              variables: operation.variables,
            },
            sink
          );
          return {
            unsubscribe: dispose,
          };
        },
      };
    },
  });
}
