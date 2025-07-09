# Cypress TypeScript E2E Test Project

## 🚀 Project Overview

This repository contains an automated testing framework built with **Cypress + TypeScript**, using the **Page Object Model (POM)** design pattern.

It covers:
- **UI Testing** for the demo website: [https://www.saucedemo.com/](https://www.saucedemo.com/)
- **API Testing** for the Swagger Petstore: [https://petstore3.swagger.io/](https://petstore3.swagger.io/)
- **CI Integration** via GitHub Actions to automatically run tests on every push

### 🔧 Core Features
- TypeScript support with strong typings
- Page Object Model for scalable UI test structure
- Cypress `cy.request` for RESTful API testing
- GitHub Actions workflow for CI

---

## 💻 Local Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/cypress-ts-e2e.git
cd cypress-ts-e2e
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Project Structure
```
cypress/
├── e2e/
│   ├── ui/
│   │   └── login.cy.ts
│   └── api/
│       └── petstore.cy.ts
├── pages/
│   └── LoginPage.ts
├── fixtures/
│   └── users.json
├── support/
│   ├── commands.ts
│   └── e2e.ts
```

### 4. Run UI Tests Locally
```bash
npm run test:ui
```

### 5. Run API Tests Locally
```bash
npm run test:api
```

### 6. Run All Tests
```bash
npm run test:all
```

---

## 🤖 CI Pipeline (GitHub Actions)

This project includes a GitHub Actions workflow that:
- Runs both UI and API test suites on every `push` or `pull_request`

### GitHub Actions Workflow File: `.github/workflows/ci.yml`
```yaml
name: Cypress Tests

on:
  push:
  pull_request:

jobs:
  cypress-tests:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18

      - name: Install dependencies
        run: npm ci

      - name: Run Cypress tests
        run: npm run test:all
```

### 🔍 View Test Results
After a push or PR:
1. Go to the "Actions" tab on your GitHub repo
2. Click the latest workflow run
3. See the logs and status of each test step

---

## ✅ NPM Scripts Reference

```json
"scripts": {
  "cypress:open": "cypress open",
  "test:ui": "cypress run --spec cypress/e2e/ui/*.cy.ts",
  "test:api": "cypress run --spec cypress/e2e/api/*.cy.ts",
  "test:all": "cypress run"
}
```

---

## 🧩 Future Improvements
- Add test data via fixtures
- Integrate test report plugin (e.g., Mochawesome)
- Environment-specific configuration
- Parallel test execution

---

## 📄 License
[MIT](LICENSE)

