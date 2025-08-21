import { http, HttpResponse } from "msw";

export const profileMockHandlers = [
  http.get("/api/me", () => {
    return HttpResponse.json({
      name: "Jane Doe",
      email: "jane@example.com"
    });
  }),
];