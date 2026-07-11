// @ts-check
import { test, expect } from '@playwright/test';

test('TestMu AI Selenium Playground - Drag & Drop Sliders', async ({ page }) => {
  // 1. Open Selenium Playground and click “Drag & Drop Sliders”
  await page.goto('https://www.testmuai.com/selenium-playground/');
  
  const dragAndDropSlidersLink = page.getByRole('link', { name: 'Drag & Drop Sliders', exact: true });
  await dragAndDropSlidersLink.click();
  
  await expect(page).toHaveURL(/drag-drop-range-sliders-demo/);
  
  // 2. Select the slider “Default value 15”
  const sliderInput = page.locator('#slider3 input');
  const outputValue = page.locator('#rangeSuccess');

  // Verify initial state
  await expect(sliderInput).toHaveValue('15');
  await expect(outputValue).toHaveText('15');

  // We want to go from 15 to 95. That is exactly 80 step increases.
  // Using locator.press('ArrowRight') ensures the element is focused and actionable,
  // preventing race conditions where global keyboard events are sent before focus completes.
  for (let i = 0; i < 80; i++) {
    await sliderInput.press('ArrowRight');
  }

  // Validate that the range value shows 95
  await expect(outputValue).toHaveText('95');
  await expect(sliderInput).toHaveValue('95');
});
