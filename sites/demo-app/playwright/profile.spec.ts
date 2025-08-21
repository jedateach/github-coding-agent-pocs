import { test, expect } from "@playwright/test";
import { setupMSW, teardownMSW } from "./hooks/msw";

test.beforeAll(async () => setupMSW());
test.afterAll(async () => teardownMSW());

test("profile page shows user data", async ({ page }) => {
  await page.goto("/profile");
  
  // Wait for profile data to load
  await expect(page.locator("h2")).toContainText("Jane Doe");
  await expect(page.locator("p")).toContainText("jane@example.com");
  
  // Check that it mentions use() hook
  await expect(page.locator("text=use()")).toBeVisible();
});