import { CheckoutCompletePage } from "./checkout-complete-page";
import { ProductBasePage } from "./product-base-page";

export class CheckoutOverviewPage extends ProductBasePage {
  // This locator is used to find the payment information element
  paymentInfoLocator: string = '[data-test="payment-info-value"]';

  // This locator is used to find the shipping information element
  shippingInfoLocator: string = '[data-test="shipping-info-value"]';

  // This locator is used to find the item total price element
  itemTotalPriceLocator: string = '[data-test="subtotal-label"]';

  // This locator is used to find the tax price element
  taxPriceLocator: string = '[data-test="tax-label"]';

  // This locator is used to find the total price element
  totalPriceLocator: string = '[data-test="total-label"]';

  // This locator is used to find the finish button on the checkout overview page
  finishButtonLocator: string = '[data-test="finish"]';

  // This method is used to verify the order summary on the checkout overview page
  verifyOrderSummary(
    productItems: ProductItem[],
    paymentInfo: string,
    shippingInfo: string,
    itemTotalPrice: string,
    taxPrice: string,
    totalPrice: string
  ) {
    // Verify that the product items in the order summary match the expected product items
    this.getProductItems().each(($item, index) => {
      const itemName = $item.find(this.productItemNameLocator).text();
      const itemPrice = $item.find(this.productItemPriceLocator).text();
      expect(itemName).to.equal(productItems[index].name);
      expect(itemPrice).to.equal(productItems[index].price);
    });

    // Verify payment and shipping information
    cy.get(this.paymentInfoLocator).should("have.text", paymentInfo);
    cy.get(this.shippingInfoLocator).should("have.text", shippingInfo);

    // Verify item total price, tax price, and total price
    cy.get(this.itemTotalPriceLocator).should("have.text", itemTotalPrice);
    cy.get(this.taxPriceLocator).should("have.text", taxPrice);
    cy.get(this.totalPriceLocator).should("have.text", totalPrice);
  }

  // This method is used to click the finish button to complete the checkout process
  clickFinishButton() {
    cy.get(this.finishButtonLocator).click();
    return new CheckoutCompletePage();
  }
}
