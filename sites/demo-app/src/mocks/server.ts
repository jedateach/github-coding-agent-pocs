import { setupServer } from "msw/node";
import { profileMockHandlers } from "../api/profile.mock";
import { accountsMockHandlers } from "../api/accounts.mock";

export const server = setupServer(...profileMockHandlers, ...accountsMockHandlers);