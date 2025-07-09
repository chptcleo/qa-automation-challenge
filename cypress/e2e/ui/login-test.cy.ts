import { LoginPage } from "../pages/login-page";

describe("Login Test", () => {
  const loginPage: LoginPage = new LoginPage();

  // @ts-ignore
  it("Happy Path", { tags: ["smoke", "ui"] }, () => {
    loginPage.visit();
    const username = Cypress.env("username");
    const password = Cypress.env("password");
    const productPage = loginPage.login(username, password);
    productPage.getTitle().should("have.text", "Products");
  });

  // @ts-ignore
  it("Sad Path", { tags: ["regression", "ui"] }, () => {
    loginPage.visit();
    const invalidUsername = Cypress.env("invalidUsername");
    const password = Cypress.env("password");
    loginPage.login(invalidUsername, password);
    loginPage
      .getErrorHeader()
      .should(
        "have.text",
        "Epic sadface: Username and password do not match any user in this service"
      );
  });
});
