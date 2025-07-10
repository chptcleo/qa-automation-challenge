import { CartPage } from "../pages/cart-page";
import { LoginPage } from "../pages/login-page";
import { ProductPage } from "../pages/product-page";
import { CheckoutInfoPage } from "../pages/checkout-info-page";
import { CheckoutOverviewPage } from "../pages/checkout-overview-page";
import { CheckoutCompletePage } from "../pages/checkout-complete-page";

describe("Checkout Process", () => {
  const loginPage: LoginPage = new LoginPage();
  const productName: string = "Sauce Labs Backpack";
  const firstName: string = "John";
  const lastName: string = "Doe";
  const postalCode: string = "12345";
  const productItems: ProductItem[] = [
    { name: "Sauce Labs Backpack", price: "$29.99" },
  ];
  const paymentInfo: string = "SauceCard #31337";
  const shippingInfo: string = "Free Pony Express Delivery!";
  const itemTotalPrice: string = "Item total: $29.99";
  const taxPrice: string = "Tax: $2.40";
  const totalPrice: string = "Total: $32.39";
  const completeMessage: string = "Thank you for your order!";
  let productPage: ProductPage;
  let cartPage: CartPage;
  let checkoutInfoPage: CheckoutInfoPage;
  let checkoutOverviewPage: CheckoutOverviewPage;
  let checkoutCompletePage: CheckoutCompletePage;

  before(() => {
    productPage = loginPage.login(Cypress.env("USERNAME"), Cypress.env("PASSWORD"));
    productPage.getTitle().should("have.text", "Products");
    productPage.addToCart(productName);
    productPage.getShoppingCartBadge().should("have.text", "1");
  });

  // @ts-ignore
  it("Checkout Process", { tags: ["smoke", "ui"] }, () => {
    // Navigate to the shopping cart page.
    cartPage = productPage.gotoShoppingCart();

    // Navigate to the checkout info page.
    checkoutInfoPage = cartPage.clickCheckoutButton();

    // Fill in the checkout information form.
    checkoutInfoPage.fillCheckoutInfo(firstName, lastName, postalCode);

    // Click the continue button to navigate to checkout overview page.
    checkoutOverviewPage = checkoutInfoPage.clickContinueButton();

    // Verify that the order summary match the expected.
    checkoutOverviewPage.verifyOrderSummary(
      productItems,
      paymentInfo,
      shippingInfo,
      itemTotalPrice,
      taxPrice,
      totalPrice
    );

    // Click the finish button to complete the checkout process.
    checkoutCompletePage = checkoutOverviewPage.clickFinishButton();

    // Verify that the checkout complete header is displayed.
    checkoutCompletePage
      .getCompleteHeader()
      .should("have.text", completeMessage);
  });
});
