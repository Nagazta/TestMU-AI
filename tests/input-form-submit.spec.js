// @ts-check
import { test, expect } from '@playwright/test';

test('TestMu AI Selenium Playground - Input Form Submit', async ({ page }) => {
  // 1. Open Selenium Playground and click “Input Form Submit”
  await page.goto('https://www.testmuai.com/selenium-playground/');
  
  const inputFormSubmitLink = page.getByRole('link', { name: 'Input Form Submit', exact: true });
  await inputFormSubmitLink.click();
  
  await expect(page).toHaveURL(/input-form-demo/);

  // 2. Click “Submit” without filling in any information in the form.
  const submitButton = page.locator('#seleniumform button[type="submit"]');
  await submitButton.click();

  // 3. Assert “Please fill in the fields” error message (HTML5 validation message).
  const nameInput = page.locator('#seleniumform #name');
  const validationMessage = await nameInput.evaluate((el) => {
    // @ts-ignore
    return el.validationMessage;
  });
  console.log('Name input validation message:', validationMessage);
  
  // Validation message should contain 'fill' and 'field' (covers Chromium, WebKit, and Firefox formats)
  expect(validationMessage.toLowerCase()).toContain('fill');
  expect(validationMessage.toLowerCase()).toContain('field');

  // 4. Fill in Name, Email, and other fields.
  await nameInput.fill('John Doe');
  await page.locator('#seleniumform #inputEmail4').fill('john.doe@example.com');
  await page.locator('#seleniumform #inputPassword4').fill('SecretPassword123!');
  await page.locator('#seleniumform #company').fill('TestMu AI Quality Corp');
  await page.locator('#seleniumform #websitename').fill('https://www.testmuai.com');
  
  // 5. From the Country drop-down, select “United States” using the text property.
  await page.locator('#seleniumform select[name="country"]').selectOption({ label: 'United States' });

  // 6. Fill in all remaining fields and click “Submit”.
  await page.locator('#seleniumform #inputCity').fill('San Francisco');
  await page.locator('#seleniumform #inputAddress1').fill('1 Sutter St');
  await page.locator('#seleniumform #inputAddress2').fill('Suite 500');
  await page.locator('#seleniumform #inputState').fill('California');
  await page.locator('#seleniumform #inputZip').fill('94104');
  
  await submitButton.click();

  // 7. Once submitted, validate the success message “Thanks for contacting us, we will get back to you shortly.” on the screen.
  const successMessage = page.getByText('Thanks for contacting us, we will get back to you shortly.', { exact: true });
  await expect(successMessage).toBeVisible();
});
