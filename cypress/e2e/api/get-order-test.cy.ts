describe("Get Order Test", () => {
  const orderId = 1;
  const incorrectOrderId = "incorrectOrderId";
  const inexistentOrderId = "666666";
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

  after(() => {
    cy.deleteOrder(orderId).then((response) => {
      expect(response.status, "Response status code is not 200.").to.eq(200);
      expect(response.body, "Response body is not empty.").to.be.empty;
    });
  });

  // Test with incorrect order id and expect response with 400 status code
  // @ts-ignore
  it("Get Order Failed With Incorrect Order Id Test", { tags: ["regression", "api"] },
    () => {
      cy.request({
        method: "GET",
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

  // Test with inexistent order id and expect response with 404 status code
  // @ts-ignore
  it("Get Order Failed With Inexistent Order Id Test", { tags: ["regression", "api"] },
    () => {
      cy.request({
        method: "GET",
        url: `${Cypress.env("API_BASE_URL")}/store/order/${inexistentOrderId}`,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status, "Response status code is not 404.").to.eq(404);
        expect(
          response.body,
          "Response body and expected information are not identical."
        ).to.deep.equal("Order not found");
      });
    }
  );

  // Test with correct order id and expect response with 200 status code
  // Sometimes can not get order successufully
  // @ts-ignore
  it("Get Order Successfully Test", { tags: ["smoke", "api"] }, () => {
    cy.request(
      "GET",
      `${Cypress.env("API_BASE_URL")}/store/order/${orderId}`
    ).then((response) => {
      expect(response.status, "Response status code is not 200").to.eq(200);
      expect(
        response.body,
        "Response body and expected information are not identical."
      ).to.deep.equal(orderInfo);
    });
  });
});
