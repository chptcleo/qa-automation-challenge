import { CartPage } from "../pages/cart-page";
import { LoginPage } from "../pages/login-page";
import { ProductPage } from "../pages/product-page";

describe("View Cart and Remove Product", () => {
  const loginPage: LoginPage = new LoginPage();
  const productName: string = "Sauce Labs Backpack";
  let productPage: ProductPage;
  let cartPage: CartPage;

  before(() => {
    productPage = loginPage.login(Cypress.env("USERNAME"), Cypress.env("PASSWORD"));
    productPage.getTitle().should("have.text", "Products");
    productPage.addToCart(productName);
    productPage.getShoppingCartBadge().should("have.text", "1");
  });

  // @ts-ignore
  it("View Cart and Remove Product", { tags: ["smoke", "ui"] }, () => {
    // Navigate to the shopping cart page.
    cartPage = productPage.gotoShoppingCart();

    // Verify that the added product (e.g., Sauce Labs Backpack) is in the cart.
    cartPage.isSpecificProductInCart(productName).then((isInCart) => {
      expect(isInCart).to.be.true;
    });

    // Remove the product from the cart.
    cartPage.removeFromCart(productName);

    // Verify that the product is removed from the cart.
    cartPage.isSpecificProductInCart(productName).then((isInCart) => {
      expect(isInCart).to.be.false;
    });

    // Verify that the cart count is updated to 0 by checking the shopping cart badge is displayed or not.
    cartPage.isShoppingCartBadgeDisplayed().then((isDisplayed) => {
      expect(isDisplayed).to.be.false;
    });
  });
});
