describe("Create Order Test", () => {
  const orderId = 1;
  const incorrectOrderId = "incorrectOrderId";
  const orderInfo = {
    id: orderId,
    petId: 198772,
    quantity: 7,
    shipDate: "2025-07-06T10:00:00.000+00:00",
    status: "approved",
    complete: true,
  };

  const incorrectOrderInfo = {
    id: incorrectOrderId,
    petId: 198772,
    quantity: 7,
    shipDate: "2025-07-06T10:00:00.000+00:00",
    status: "approved",
    complete: true,
  };

  after(() => {
    cy.deleteOrder(orderId).then((response) => {
      expect(response.status, "Response status code is not 200.").to.eq(200);
      expect(response.body, "Response body is not empty.").to.be.empty;
    });
  });

  // Test with correct request data and expect response with 200 status code
  // @ts-ignore
  it("Create Order Successfully Test", { tags: ["smoke", "api"] }, () => {
    cy.createOrder(orderInfo).then((response) => {
      expect(response.status, "Response status code is not 200.").to.eq(200);
      expect(
        response.body,
        "Response body and expected information are not identical."
      ).to.deep.equal(orderInfo);
    });
  });

  // Test with incorrect request data and expect response with 400 status code
  // @ts-ignore
  it("Create Order Failed Test", { tags: ["regression", "api"] }, () => {
    cy.request({
      method: "POST",
      url: `${Cypress.env("API_BASE_URL")}/store/order`,
      body: incorrectOrderInfo,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status, "Response status code is not 400.").to.eq(400);
      expect(
        response.body.message,
        "Response message and expected information are not identical."
      ).to.deep.equal(
        "Input error: unable to convert input to io.swagger.petstore.model.Order"
      );
    });
  });
});
