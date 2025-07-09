export class ProductBasePage {
  // This locator is used to find the product items
  productItemsLocator: string = '[data-test="inventory-item"]';

  // This locator is used to find the product item name element within each product item
  productItemNameLocator: string = '[data-test="inventory-item-name"]';

  // This locator is used to find the product item price element within each product item
  productItemPriceLocator: string = '[data-test="inventory-item-price"]';

  // This locator is used to find the shopping cart badge element displays the number of items in the shopping cart
  shoppingCartBadgeSpanLocator: string = '[data-test="shopping-cart-badge"]';

  // This method is used to get all the product items displayed
  getProductItems() {
    return cy.get("body").then(($body) => {
      const found = $body.find(this.productItemsLocator);
      if (found.length > 0) {
        return cy.get(this.productItemsLocator);
      } else {
        return cy.wrap([]);
      }
    });
  }
}
