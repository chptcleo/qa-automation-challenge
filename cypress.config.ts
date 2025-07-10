import { defineConfig } from "cypress";
import { allureCypress } from "allure-cypress/reporter";

export default defineConfig({
  e2e: {
    supportFile: "cypress/support/e2e.ts",
    specPattern: "cypress/e2e/**/*.cy.ts",

    setupNodeEvents(on, config) {
      allureCypress(on, config);
      return config;
    },

  },
});
