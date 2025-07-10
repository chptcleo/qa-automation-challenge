# QA Automation Challenge

## 🚀 Project Overview

This project is an automated testing framework built with **Cypress** and **TypeScript**. It is designed to support both UI and API testing, following best practices such as the Page Object Model (POM) for maintainability and scalability. The framework integrates with **Allure** for advanced test reporting and is configured to run in a CI pipeline using **GitHub Actions**.

### Core Features

- **Cypress + TypeScript**: Modern, robust, and type-safe test automation.
- **Page Object Model**: Clean separation of test logic and page structure.
- **UI & API Testing**: End-to-end coverage for web and API scenarios.
- **Environment Management**: Easily switch between dev, qa, uat and prod environments.
- **Tag-based Test Selection**: Run tests by tags (smoke, regression, ui, api).
- **Allure Reporting**: Rich, interactive test reports.
- **GitHub Actions CI**: Automated test execution and reporting on every push.

---

## 🛠️ Setup Instructions for Running Tests Locally

1. **Clone the Repository**
   ```bash
   git clone https://github.com/chptcleo/qa-automation-challenge.git
   cd qa-automation-challenge
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Set Environment Variables**
   - Create the appropriate `cypress.env.dev.json` file.
     ```bash
     {
       "LOGIN_URL": "[login_url]",
       "USERNAME": "[username]",
       "PASSWORD": "[password]",
       "INVALID_USERNAME": "[invalid_user]",
       "API_BASE_URL": "[api_base_url]"
     }
     ```

4. **Run Tests**
   - **Open Cypress UI:**
     ```bash
     npm run cypress:open
     ```
   - **Run all tests headlessly:**
     ```bash
     npm run cypress:run
     ```
   - **Run smoke tests by tag:**
     ```bash
     npm run cypress:run:smoke
     ```
   - **Run UI tests by tag:**
     ```bash
     npm run cypress:run:ui
     ```
   - **Run API tests by tag:**
     ```bash
     npm run cypress:run:api
     ```

5. **Generate and View Allure Report**
   ```bash
   npm run allure:generate
   npm run allure:open
   ```

---

## 🤖 How to Run the CI Pipeline and View Test Results

- The CI pipeline is triggered automatically on every push to the repository.
- The workflow installs dependencies, runs Cypress tests, and generates an Allure report.
- After execution:
  1. Go to the **Actions** tab in your GitHub repository.
  2. Select the latest workflow run to view logs and results.
  3. Download the Allure report artifact from the workflow summary.

---

## 🌐 How to Test in Different Environments

1. **Using Multiple `cypress.env.[env].json` Files To Test Locally**

To manage environment-specific variables, create separate files for each environment:

- `cypress.env.qa.json`
- `cypress.env.uat.json`
- `cypress.env.prod.json`

**How to use:**
Add or edit npm scripts in your `package.json`:
```json
"scripts": {
  "cypress:run:qa": "cp cypress.env.qa.json cypress.env.json && cypress run --browser chrome",
  "cypress:run:uat": "cp cypress.env.uat.json cypress.env.json && cypress run --browser chrome",
  "cypress:run:prod": "cp cypress.env.prod.json cypress.env.json && cypress run --browser chrome",
}
```

---

2. **Creating New `continuous-integration-[env].yaml` for GitHub Actions To Test In CI**

For CI pipelines in different environments, create a separate workflow file based on `continuous-integration.yaml` for each environment, such as:

- `.github/workflows/continuous-integration-qa.yaml`
- `.github/workflows/continuous-integration-uat.yaml`
- `.github/workflows/continuous-integration-prod.yaml`

**How to use:**
Update the **environment** field to indicate environment(e.g. qa), then add environment-specific secrets and variables in your GitHub repository settings under the environment.
```yaml
jobs:
  continuous-integration:
    runs-on: ubuntu-latest
    environment: qa 
    env:
      CYPRESS_USERNAME: ${{ secrets.CYPRESS_USERNAME }}
      CYPRESS_PASSWORD: ${{ secrets.CYPRESS_PASSWORD }}
      CYPRESS_LOGIN_URL: ${{ vars.CYPRESS_LOGIN_URL }}
      CYPRESS_API_BASE_URL: ${{ vars.CYPRESS_API_BASE_URL }}
      CYPRESS_INVALID_USERNAME: ${{ vars.CYPRESS_INVALID_USERNAME }}

```

---

**Happy Testing!**