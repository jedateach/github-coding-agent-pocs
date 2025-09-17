import { test, expect } from "@playwright/test";
import { setupMSW, teardownMSW } from "./hooks/msw";

test.beforeAll(async () => setupMSW());
test.afterAll(async () => teardownMSW());

test("accounts page shows accounts and refresh works", async ({ page }) => {
  await page.goto("/accounts");
  
  // Wait for accounts to load
  await expect(page.locator("h1")).toContainText("Account Dashboard");
  
  // Check that accounts are displayed
  await expect(page.locator("text=Checking")).toBeVisible();
  await expect(page.locator("text=Savings")).toBeVisible();
  await expect(page.locator("text=$1,000")).toBeVisible();
  await expect(page.locator("text=$5,000")).toBeVisible();
  
  // Test refresh functionality
  await page.click("text=Refresh Accounts");
  
  // Accounts should still be visible after refresh
  await expect(page.locator("text=Checking")).toBeVisible();
  
  // Check that it mentions TanStack Query
  await expect(page.locator("text=TanStack Query")).toBeVisible();
});