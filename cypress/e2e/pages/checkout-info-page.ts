import { CheckoutOverviewPage } from "./checkout-overview-page";

export class CheckoutInfoPage {
  // This locator is used to find the first name input field on the checkout info page
  firstNameInputLocator: string = '[data-test="firstName"]';

  // This locator is used to find the last name input field on the checkout info page
  lastNameInputLocator: string = '[data-test="lastName"]';

  // This locator is used to find the postal code input field on the checkout info page
  postalCodeInputLocator: string = '[data-test="postalCode"]';

  // This locator is used to find the continue button on the checkout info page
  continueButtonLocator: string = '[data-test="continue"]';

  // This method is used to fill in the checkout information form
  fillCheckoutInfo(firstName: string, lastName: string, postalCode: string) {
    cy.get(this.firstNameInputLocator).type(firstName);
    cy.get(this.lastNameInputLocator).type(lastName);
    cy.get(this.postalCodeInputLocator).type(postalCode);
  }

  // This method is used to click the continue button to navigate to checkout overview page
  clickContinueButton() {
    cy.get(this.continueButtonLocator).click();
    return new CheckoutOverviewPage();
  }
}
