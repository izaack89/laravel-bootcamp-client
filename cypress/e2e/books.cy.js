describe("Books", () => {
  it("Can list, show, create, edit and delete books", () => {
    cy.visit("/");
    // List of the books
    cy.get("[data-cy=link-to-books]").click();
    // Create Books
    cy.get('[href="/libros/create"]')
      .click()
      .get("[data-cy=input-book-title]")
      .type("New book from Cypress")
      .get("[data-cy=button-submit-book]")
      .click()
      .get("[data-cy=book-list]")
      .contains("New book from Cypress");

    // List Book
    cy.get("[data-cy^=link-to-visit-book-]")
      .last()
      .click()
      .get("h1")
      .should("contain.text", "New book from Cypress")
      .get("[data-cy=link-to-books]")
      .click();

    // Edit Book
    cy.get("[data-cy^=link-to-edit-book-]")
      .last()
      .click()
      .get("[data-cy=input-book-title]")
      .clear()
      .type("Edit book from Cypress")
      .get("[data-cy=button-submit-book]")
      .click();

    // Delete Books

    cy.get("[data-cy^=button-delete-book-]")
      .last()
      .click()
      .get("[data-cy^=button-delete-book-]")
      .last()
      .should("not.contain.text", "Edit book from Cypress");
  });
});
