/// <reference types="cypress" />

describe("Header and Footer Links and Buttons", () => {
  beforeEach(() => {
    cy.visit("https://qauto.forstudy.space", {
      auth: {
        username: Cypress.env("LOGIN_USERNAME"),
        password: Cypress.env("LOGIN_PASSWORD"),
      },
    });
  });

  it("should find all links and buttons in header", () => {
    cy.get("header")
      .find("a, button")
      .should("have.length.greaterThan", 0)
      .each(($el) => {
        cy.wrap($el)
          .should("be.visible")
          .invoke("text")
          .then((text) => {
            if (text.trim().length > 0) {
              expect(text.trim()).to.not.be.empty;
            }
          });
      });
  });

  it("should find all links and buttons in footer", () => {
    cy.get("app-home > div")
      .eq(1)
      .find("a, button")
      .should("have.length.greaterThan", 0)
      .each(($el) => {
        cy.wrap($el)
          .should("be.visible")
          .invoke("text")
          .then((text) => {
            if (text.trim().length > 0) {
              expect(text.trim()).to.not.be.empty;
            }
          });
      });
  });
});