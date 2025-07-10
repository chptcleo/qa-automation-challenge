describe("Delete Order Test", () => {
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

  before(() => {
    cy.createOrder(orderInfo).then((response) => {
      expect(response.status, "Response status code is not 200.").to.eq(200);
      expect(
        response.body,
        "Response body and expected information are not identical."
      ).to.deep.equal(orderInfo);
    });
  });

  // Test with correct order id and expect response with 200 status code
  // @ts-ignore
  it("Delete Order Successully Test", { tags: ["smoke", "api"] }, () => {
    cy.request(
      "DELETE",
      `${Cypress.env("API_BASE_URL")}/store/order/${orderId}`
    ).then((response) => {
      expect(response.status, "Response status code is not 200.").to.eq(200);
      expect(response.body, "Response body is not empty.").to.be.empty;
    });
  });

  // Test with incorrect order id and expect response with 400 status code
  // @ts-ignore
  it("Delete Order Failed With Incorrect Order Id Test", { tags: ["regression", "api"] },
    () => {
      cy.request({
        method: "DELETE",
        url: `${Cypress.env("API_BASE_URL")}/store/order/${incorrectOrderId}`,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status, "Response status code is not 400.").to.eq(400);
        expect(
          response.body.message,
          "Response message and expected information are not identical."
        ).to.deep.equal(
          "Input error: couldn't convert `incorrectOrderId` to type `class java.lang.Long`"
        );
      });
    }
  );
});
