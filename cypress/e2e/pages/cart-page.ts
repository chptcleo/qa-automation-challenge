import { CheckoutInfoPage } from "./checkout-info-page";
import { ProductBasePage } from "./product-base-page";

export class CartPage extends ProductBasePage {
  // This locator is used to find the remove button for a specific product
  removeButtonLocator: string = '[data-test^="remove"]';

  // This locator is used to find the checkout button element
  checkoutButtonLocator: string = '[data-test="checkout"]';

  // This method is used to remove a product from the shopping cart by clicking the corresponding remove button
  removeFromCart(productName: string) {
    this.getProductItems().each(($item) => {
      const itemName = $item.find(this.productItemNameLocator).text();
      if (itemName === productName) {
        cy.wrap($item).find(this.removeButtonLocator).click();
      }
    });
  }

  // This method is used to check if a specific product is in the cart by checking the product items
  isSpecificProductInCart(productName: string): Cypress.Chainable<boolean> {
    return this.getProductItems().then(($items: any) => {
      if ($items && $items.length === 0) {
        return false;
      }
      let isInCart = false;

      $items.each((_: any, item: any) => {
        const itemName = Cypress.$(item)
          .find(this.productItemNameLocator)
          .text();
        if (itemName === productName) {
          isInCart = true;
          return false;
        }
      });
      return isInCart;
    });
  }

  // This method is used to check if the shopping cart badge is displayed or not
  isShoppingCartBadgeDisplayed(): Cypress.Chainable<boolean> {
    return cy.get("body").then(($body) => {
      const found = $body.find(this.shoppingCartBadgeSpanLocator);
      if (found.length > 0) {
        return cy
          .get(this.shoppingCartBadgeSpanLocator)
          .then(($el) => Cypress.dom.isVisible($el));
      } else {
        return cy.wrap(false);
      }
    });
  }

  // Clicks the checkout button to proceed to the checkout info page
  clickCheckoutButton() {
    cy.get(this.checkoutButtonLocator).click();
    return new CheckoutInfoPage();
  }
}
