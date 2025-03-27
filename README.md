# ERR Test Project

See projekt sisaldab automatiseeritud UI teste, mis on kirjutatud [Playwright](https://playwright.dev/) raamistikus.

## Seadistamine

1. Veendu, et sul on paigaldatud [Node.js](https://nodejs.org/)
2. Ava terminal ja paigalda vajalikud sõltuvused:

```bash
npm install
```

3. Testide käivitamiseks:

```bash
npx playwright test
```

4. Testiraporti avamiseks:

```bash
npx playwright show-report
```

## Projekti struktuur

```text
/tests                → Testifailid (nt login.spec.ts)
/playwright-report    → HTML-raport (luuakse automaatselt pärast teste)
/test-results         → Screenshoti ja logide salvestus
playwright.config.ts  → Playwrighti seadistused
package.json          → Projektisõltuvused ja skriptid
```

## Kasulikud NPM skriptid

Soovitav on lisada `package.json` faili järgmised käsud:

```json
"scripts": {
  "test": "npx playwright test",
  "report": "npx playwright show-report"
}
```

See võimaldab testide käivitamist lihtsamalt:

```bash
npm run test
npm run report
```

## Autor

Autor: tkaeval  
Aasta: 2025  
Projekt: ERR-i testide automatiseerimine
