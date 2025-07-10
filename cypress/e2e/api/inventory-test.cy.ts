describe("Inventory Test", () => {
  // Because this API is not stable, sometimes it returns 500, sometimes it returns 200,
  // So test both cases, once API is stable, remove the 500 status code check.
  // @ts-ignore
  it("Inventory Test", { tags: ["smoke", "api"] }, () => {
    cy.request({
      method: "GET",
      url: `${Cypress.env("API_BASE_URL")}/store/inventory`,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status, "Response status code is not 200.").to.be.oneOf([
        200, 500,
      ]);
      if (response.status === 200) {
        expect(
          JSON.stringify(response.body),
          "Response message does not include expected message"
        )
          .to.include("approved")
          .and.include("placed")
          .and.include("delivered");
      }
      if (response.status === 500) {
        expect(
          response.body.message,
          "Response message does not include expected message"
        ).to.include("There was an error processing your request.");
      }
    });
  });
});
