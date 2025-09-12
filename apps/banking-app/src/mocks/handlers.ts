import { queryHandlers } from "./handlers/queryHandlers";
import { mutationHandlers } from "./handlers/mutationHandlers";
import { subscriptionHandlers } from "./handlers/subscriptionHandlers";

export const handlers = [
  ...queryHandlers,
  ...mutationHandlers,
  ...subscriptionHandlers,
];
