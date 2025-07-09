import { CartPage } from "./cart-page";
import { ProductBasePage } from "./product-base-page";

export class ProductPage extends ProductBasePage {
  // This locator is used to find the title element on the product page
  titleSpanLocator: string = '[data-test="title"]';

  // This locator is used to find the add to cart button for a specific product
  addToCartButtonLocator: string = '[data-test^="add-to-cart"]';

  // This locator is used to find the shopping cart link element to navigate to the shopping cart page
  shoppingCartLinkLocator: string = '[data-test="shopping-cart-link"]';

  // This method is used to get the title element on the product page
  getTitle() {
    return cy.get(this.titleSpanLocator);
  }

  // This method is used to add a product to the shopping cart by clicking the corresponding add to cart button
  addToCart(productName: string) {
    this.getProductItems().each(($item) => {
      const itemName = $item.find(this.productItemNameLocator).text();
      if (itemName === productName) {
        cy.wrap($item).find(this.addToCartButtonLocator).click();
      }
    });
  }

  // This method is used to get the shopping cart badge element, which displays the number of items in the shopping cart
  getShoppingCartBadge() {
    return cy.get(this.shoppingCartBadgeSpanLocator);
  }

  // This method is used to navigate to the shopping cart page by clicking the shopping cart link
  gotoShoppingCart() {
    cy.get(this.shoppingCartLinkLocator).click();
    return new CartPage();
  }
}
