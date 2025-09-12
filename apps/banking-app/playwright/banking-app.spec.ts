import { test, expect } from '@playwright/test'

test.describe('Banking POC App', () => {
  test('should display the main dashboard', async ({ page }) => {
    await page.goto('/')
    
    await expect(page.locator('h1')).toContainText('Banking Dashboard')
    await expect(page.getByText('Select party')).toBeVisible()
    await expect(page.getByText('Transfer Money')).toBeVisible()
    await expect(page.getByText('Send Payment')).toBeVisible()
  })

  test('should allow party selection', async ({ page }) => {
    await page.goto('/')
    
    // Wait for party selector to load
    await page.waitForSelector('[data-state="closed"]', { timeout: 10000 })
    
    // Click on party selector
    await page.click('[data-state="closed"]')
    
    // Should show party options
    await expect(page.getByText('Personal')).toBeVisible()
    await expect(page.getByText('Business')).toBeVisible()
  })

  test('should navigate to transfer page', async ({ page }) => {
    await page.goto('/')
    
    await page.click('text=Transfer Money')
    await expect(page.locator('h1')).toContainText('Transfer Money')
    await expect(page.getByText('Transfer Between Accounts')).toBeVisible()
  })

  test('should navigate to payment page', async ({ page }) => {
    await page.goto('/')
    
    await page.click('text=Send Payment')
    await expect(page.locator('h1')).toContainText('Send Payment')
    await expect(page.getByText('Send External Payment')).toBeVisible()
  })

  test('should display account details when navigating to account page', async ({ page }) => {
    await page.goto('/account/acc-1')
    
    await expect(page.getByText('Back to Accounts')).toBeVisible()
    await expect(page.getByText('Recent Transactions')).toBeVisible()
  })
})