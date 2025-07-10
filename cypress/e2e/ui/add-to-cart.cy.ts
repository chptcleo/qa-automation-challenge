import { LoginPage } from "../pages/login-page";
import { ProductPage } from "../pages/product-page";

describe("Add to Cart", () => {
  const loginPage: LoginPage = new LoginPage();
  const productName: string = "Sauce Labs Backpack";
  let productPage: ProductPage;

  before(() => {
    productPage = loginPage.login(Cypress.env("USERNAME"), Cypress.env("PASSWORD"));
    productPage.getTitle().should("have.text", "Products");
  });

  // @ts-ignore
  it("Adding Product to Cart", { tags: ["smoke", "ui"] }, () => {
    productPage.addToCart(productName);
    productPage.getShoppingCartBadge().should("have.text", "1");
  });
});
