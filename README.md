# Cypress TypeScript E2E Test Project

## 🚀 Project Overview

This repository provides an automated testing framework using **Cypress** and **TypeScript**, following the **Page Object Model (POM)** design pattern.  
It supports both **UI** and **API** testing and is fully integrated with **GitHub Actions** for continuous integration.

### 🔧 Core Features

- **TypeScript support** for type safety and maintainability
- **Page Object Model** for scalable and reusable UI test code
- **UI Testing** for [SauceDemo](https://www.saucedemo.com/)
- **Cypress `cy.request`** for RESTful API automation
- **API Testing** for [Swagger Petstore](https://petstore3.swagger.io/)
- **Tag-based test selection** (smoke, regression, ui, api)
- **Allure reporting** for rich test reports
- **GitHub Actions CI** to run tests and generate reports on every push

---

## 💻 Local Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/chptcleo/qa-automation-challenge.git
cd qa-automation-challenge
```

### 2. Configure Environment Variables

Create `cypress.env.json` to include environment variables.

```bash
// cypress.env.json
{
  "USERNAME": <username>, // For login https://www.saucedemo.com/
  "PASSWORD": <password>, // For login https://www.saucedemo.com/
  "INVALID_USERNAME": "invalid_user",
  "API_BASE_URL": "https://petstore3.swagger.io/api/v3"
}
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Run Tests Locally

- **Open Cypress UI:**
  ```bash
  npm run cypress:open
  ```
- **Run all tests:**
  ```bash
  npm run cypress:run
  ```
- **Run only UI tests:**
  ```bash
  npm run cypress:run:ui
  ```
- **Run only API tests:**
  ```bash
  npm run cypress:run:api
  ```
- **Run tests by tag (e.g., smoke):**
  ```bash
  npm run cypress:run:smoke
  ```

### 5. Generate and View Allure Report

After running tests:
```bash
npm run allure:generate
npm run allure:open
```

---

## 🤖 CI Pipeline (GitHub Actions)

This project includes a GitHub Actions workflow that:

- Runs Cypress tests automatically on every `push` to any branch
- Generates and uploads the Allure test report as an artifact
- Optionally deploys the Allure report to GitHub Pages for easy web access

### How to View CI Test Results

1. Go to the **Actions** tab in your GitHub repository.
2. Click the latest workflow run.
3. Review logs, test status, and download the Allure report artifact.
4. If GitHub Pages is enabled, open the Allure report link provided in the workflow summary.

---

## 📝 Example Project Structure

```
cypress/
├── e2e/
│   ├── ui/
│   │   └── login-test.cy.ts
│   └── api/
│       └── petstore.cy.ts
├── pages/
│   └── login-page.ts
├── support/
│   ├── commands.ts
│   └── e2e.ts
├── fixtures/
│   └── users.json
cypress.env.json
cypress.config.ts
```

---

## 📄 License

[MIT](LICENSE)