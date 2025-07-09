export class CheckoutCompletePage {
  // This locator is used to find the checkout complete header element
  completeHeaderLocator: string = '[data-test="complete-header"]';

  getCompleteHeader() {
    return cy.get(this.completeHeaderLocator);
  }
}
