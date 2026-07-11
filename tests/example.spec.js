// @ts-check
import { test, expect } from '@playwright/test';

test('TestMu AI Selenium Playground - Simple Form Demo', async ({ page }) => {
  // 1. Open TestMu AI’s Selenium Playground
  await page.goto('https://www.testmuai.com/selenium-playground/');

  // 2. Click “Simple Form Demo”.
  const simpleFormDemoLink = page.getByRole('link', { name: 'Simple Form Demo', exact: true });
  await simpleFormDemoLink.click();

  // 3. Validate that the URL contains “simple-form-demo”.
  await expect(page).toHaveURL(/simple-form-demo/);

  // 4. Create a variable for a string value, e.g., “Welcome to TestMu AI”.
  const messageText = 'Welcome to TestMu AI';

  // 5. Use this variable to enter values in the “Enter Message” text box.
  const messageInput = page.locator('input#user-message');
  await messageInput.fill(messageText);

  // Wait briefly to allow the page's scripts to hydrate and register event handlers
  await page.waitForTimeout(500);

  // 6. Click “Get Checked Value”.
  const getCheckedValueButton = page.locator('button#showInput');
  await getCheckedValueButton.click();

  // 7. Validate whether the same text message is displayed in the right-hand panel under the “Your Message:” section.
  const displayedMessage = page.locator('#message');
  await expect(displayedMessage).toHaveText(messageText);
});

