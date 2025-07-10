import { LoginPage } from "../pages/login-page";
import { ProductPage } from "../pages/product-page";

describe("Login Test", () => {
  const loginPage: LoginPage = new LoginPage();
  let productPage: ProductPage;

  // @ts-ignore
  it("Happy Path", { tags: ["smoke", "ui"] }, () => {
    productPage = loginPage.login(
      Cypress.env("USERNAME"),
      Cypress.env("PASSWORD")
    );
    productPage.getTitle().should("have.text", "Products");
  });

  // @ts-ignore
  it("Sad Path", { tags: ["regression", "ui"] }, () => {
    loginPage.login(Cypress.env("INVALID_USERNAME"), Cypress.env("PASSWORD"));
    loginPage
      .getErrorHeader()
      .should(
        "have.text",
        "Epic sadface: Username and password do not match any user in this service"
      );
  });
});
