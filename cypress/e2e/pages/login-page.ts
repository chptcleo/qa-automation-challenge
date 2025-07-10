import { ProductPage } from "../pages/product-page";

export class LoginPage {
  // This locator is used to find the username input field on the login page
  usernameInputLocator: string = '[data-test="username"]';

  // This locator is used to find the password input field on the login page
  passwordInputLocator: string = '[data-test="password"]';

  // This locator is used to find the login button on the login page
  loginButtonLocator: string = '[data-test="login-button"]';

  // This locator is used to find the error header on the login page
  errorHeaderLocator: string = '[data-test="error"]';

  // This method is used to visit the login page based on the base URL defined in cypress.config.ts
  visit() {
    cy.visit(Cypress.env("BASE_URL"));
  }

  // This method is used to perform the login action by entering the username and password, and clicking the login button
  login(username: string, password: string): ProductPage {
    cy.get(this.usernameInputLocator).type(username);
    cy.get(this.passwordInputLocator).type(password);
    cy.get(this.loginButtonLocator).click();
    return new ProductPage();
  }

  // This method is used to get the error header element, which displays error messages when login fails
  getErrorHeader() {
    return cy.get(this.errorHeaderLocator);
  }
}
