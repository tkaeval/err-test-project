import { test, expect } from '@playwright/test';

// --- Esimene test ---
// Test kontrollib lehe ERR.ee navigatsiooni
test('ERR.ee navigatsioon: Avaleht -> Sport -> Avaleht', async ({ page }) => {
  try {
    // Laetakse ERR.ee avaleht ja kontrollitakse URL-i õigsust
    await page.goto('https://www.err.ee/');
    await page.waitForLoadState('networkidle'); // oodatakse, et leht oleks täielikult laetud
    await expect(page).toHaveURL('https://www.err.ee/');

    // Küpsistebänneri ilmumisel selle sulgemine
    try {
      await page.getByText(/Sain aru/i, { timeout: 3000 }).click();
    } catch (error) {}

    // Otsitakse päisest "Sport" nimelist elementi, klõpsatakse sellel ja kontrollitakse URL-i õigsust
    const sportLink = await page.locator('#header').getByRole('link', { name: 'Sport' }).first();
    await sportLink.click();
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL('https://sport.err.ee/');

    // Otsitakse elementi, mis viib tagasi ERR.ee avalehele, klõpsatakse sellel ja kontrollitakse URL-i õigsust
    const homeLink = await page.getByRole('link', { name: 'ERR avaleht' });
    await homeLink.click();
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL('https://www.err.ee/');
	

    // Logitakse testi tulemus konsooli
    console.log('Test tulemus: ERR.ee navigatsioon: PASS');
  } catch (error: any) {
    console.log('Testi tulemus: ERR.ee navigatsioon: FAIL');
    throw error; // error, test feilib
  }
});

