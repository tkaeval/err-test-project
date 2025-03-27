import { test, expect } from '@playwright/test';

// Test kontrollib ERR.ee lehe otsingu funktsionaalsust
test('ERR.ee otsingu funktsionaalsus', async ({ page }) => {
  try {
    // Laetakse ERR.ee avaleht ja kontrollitakse URL-i õigsust
    await page.goto('https://www.err.ee/');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL('https://www.err.ee/');

    // Kontrollitakse, et otsingukast on nähtav ja klõpsatav.
    const otsinguvali = page.getByRole('textbox', { name: 'Otsingufraas' });
    await expect(otsinguvali).toBeVisible();
    await otsinguvali.click();

    // Funktsioon otsingu teostamiseks ja tulemuste arvu tagastamiseks.
    // Funktsioon võtab sisendiks otsingusõna ning kontrollib, kas oodatavaid tulemusi on rohkem kui 0 (true) või 0 (false).
    async function searchAndReturnCount(query: string, expectedGreaterThanZero: boolean): Promise<number> {
      // Tühjendatakse otsingukast ja sisestatakse otsingusõna
      await otsinguvali.fill('');
      await otsinguvali.fill(query);
      // Klõpsatakse nupul "Otsi", et alustada otsingut.
      await page.getByRole('button', { name: 'Otsi' }).click();

      // Oodatakse kuni otsingu tulemuste arvu sisaldav teade on kuvatud.
      const alertLocator = page.getByRole('alert');
      await alertLocator.waitFor({ state: 'visible', timeout: 15000 });
      let resultCount = 0;
      
      // Kui oodatakse, et tulemusi on rohkem kui 0, siis kontrollitakse seda pollimise kaudu.
      if (expectedGreaterThanZero) {
        await expect.poll(async () => {
          const resultText = await alertLocator.textContent();
          const match = resultText?.match(/Leiti\s*(\d+)\s*tulemus(?:\(t\))?/);
          resultCount = match ? parseInt(match[1], 10) : 0;
          return resultCount;
        }, { timeout: 15000 }).toBeGreaterThan(0);
      } else {
        // Kui eeldatakse, et tulemusi ei ole, siis kontrollitakse seda pollimise kaudu.
        await expect.poll(async () => {
          const resultText = await alertLocator.textContent();
          const match = resultText?.match(/Leiti\s*(\d+)\s*tulemus(?:\(t\))?/);
          resultCount = match ? parseInt(match[1], 10) : 0;
          return resultCount;
        }, { timeout: 15000 }).toBe(0);
      }
      return resultCount;
    }

    // Testitakse otsingut sõnaga "politsei", oodatavaid tulemusi rohkem kui 0
    const politseiCount = await searchAndReturnCount("politsei", true);
    // Testitakse otsingut sõnaga "sigurvigur", oodatavaid tulemusi ei ole
    const sigurvigurCount = await searchAndReturnCount("sigurvigur", false);
    // Lisatud test: tühja otsingufraasi puhul oodatavaid tulemusi ei ole
    const emptyCount = await searchAndReturnCount("", false);

    // Logitakse testi tulemus konsooli
    console.log(`Testi tulemus: "politsei" andis ${politseiCount} tulemust, "sigurvigur" andis ${sigurvigurCount} tulemust, ja tühi otsing andis ${emptyCount} tulemust. ERR.ee otsingu funktsionaalsus: PASS`);
  } catch (error) {
    console.error(`Testi tulemus: ERR.ee otsingu funktsionaalsus: FAIL. Error: ${error.message}`);
    throw error;
  }
});
