import { setupServer } from "msw/node";
import { profileHandlers } from "./handlers/profile";
import { accountsHandlers } from "./handlers/accounts";

export const server = setupServer(...profileHandlers, ...accountsHandlers);