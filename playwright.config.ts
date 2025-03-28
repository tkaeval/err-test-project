import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // Kaust, kust testifaile otsitakse
  testDir: './tests',

  // Kas testid jooksevad failides paralleelselt
  fullyParallel: false,

  // Käivitame kõik testid ühes tööprotsessis, et vältida paralleelkäivituse probleeme
  workers: 1,

  // Raporti tüüp (HTML loob kaustas playwright-report graafilise ülevaate)
  reporter: 'html',
  
  timeout: 60000, // kogu testi aeg

  // Üldseaded kõikidele projektidele
  use: {
    // Näiteks: baseURL: 'http://127.0.0.1:3000',
    // Trace salvestatakse ainult siis, kui test esimese korraga ebaõnnestub
    trace: 'on-first-retry',
	actionTimeout: 10000, // iga tegevuse maksimaalne kestus
    navigationTimeout: 30000 // navigeerimise maksimaalne aeg
  },


  // Erinevate browserite konfiguratsioon
  projects: [
    {
      name: 'Chromium (Chrome)',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'Firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'WebKit (Safari)',
      use: { ...devices['Desktop Safari'] },
    }
  ]
});
