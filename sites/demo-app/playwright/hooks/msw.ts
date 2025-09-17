import { server } from "../../src/mocks/server";

export async function setupMSW() {
  server.listen({ onUnhandledRequest: "bypass" });
}

export async function teardownMSW() {
  server.close();
}