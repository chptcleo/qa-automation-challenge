declare namespace Cypress {
  interface Chainable {
    createOrder(orderInfoParam: any): Chainable<Cypress.Response<object>>;
    deleteOrder(orderIdParam: number): Chainable<Cypress.Response<object>>;
  }
}