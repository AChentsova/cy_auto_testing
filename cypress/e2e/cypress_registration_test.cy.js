/// <reference types="cypress" />

import "../support/commands";

describe("Registration form", () => {
    let email;
    const password = "TestPass123";
  beforeEach(() => {
    cy.visit("https://qauto.forstudy.space", {
      auth: {
        username: Cypress.env("LOGIN_USERNAME"),
        password: Cypress.env("LOGIN_PASSWORD"),
      },
    });
  });

  describe("User Registration and Login", () => {
    it("should register new user with valid data", () => {
      email = `testuser${Date.now()}@test.com`;
      cy.get(".hero-descriptor_btn").click();
      cy.contains(".btn.btn-primary", "Register").should("be.disabled");
      cy.get("#signupName").type("Jane");
      cy.get("#signupLastName").type("Doe");
      cy.get("#signupEmail").type(email);
      cy.get("#signupPassword").type(password, { sensitive: true });
      cy.get("#signupRepeatPassword").type(password, { sensitive: true });
      cy.contains(".btn.btn-primary", "Register").should("be.enabled").click();
      cy.contains("Registration complete").should("be.visible");
    });

    it("should login registered user", () => {
      cy.login(email, password);
      cy.contains("You have been successfully logged in").should("be.visible");
      cy.url().should("include", "/panel/garage");
    });
  });

  describe("Validation for Name and Last name fields", () => {
    beforeEach(() => {
        cy.get(".hero-descriptor_btn").click();
    });

    it("should show error for short name", () => {
        cy.get("#signupName").type("J");
        cy.get("#signupLastName").click();
        cy.contains("Name has to be from 2 to 20 characters long").should("be.visible");
        cy.get("#signupName").should
        ("have.css", 
        "border-color",
        "rgb(220, 53, 69)");
        cy.contains(".btn.btn-primary", "Register").should("be.disabled");
    });

    it("should show error for short last name", () => {
        cy.get("#signupLastName").type("D");
        cy.get("#signupName").click();
        cy.contains("Last name has to be from 2 to 20 characters long").should("be.visible");
        cy.get("#signupLastName").should(
          "have.css",
          "border-color",
          "rgb(220, 53, 69)",
        );
        cy.contains(".btn.btn-primary", "Register").should("be.disabled");
    });

    it("should show error for long name", () => {
        cy.get("#signupName").type("J".repeat(21));
        cy.get("#signupLastName").click();
        cy.contains("Name has to be from 2 to 20 characters long").should("be.visible");
        cy.get("#signupName").should(
          "have.css",
          "border-color",
          "rgb(220, 53, 69)",
        );
        cy.contains(".btn.btn-primary", "Register").should("be.disabled");
    });

    it("should show error for long last name", () => {
        cy.get("#signupLastName").type("D".repeat(21));
        cy.get("#signupName").click();
        cy.contains("Last name has to be from 2 to 20 characters long").should("be.visible");
        cy.get("#signupLastName").should(
          "have.css",
          "border-color",
          "rgb(220, 53, 69)",
        );
        cy.contains(".btn.btn-primary", "Register").should("be.disabled");
    });

    it("should show error for name with invalid characters", () => {
        cy.get("#signupName").type("Jane123");
        cy.get("#signupLastName").click();
        cy.contains("Name is invalid").should("be.visible");
        cy.get("#signupName").should(
          "have.css",
          "border-color",
          "rgb(220, 53, 69)",
        );
        cy.contains(".btn.btn-primary", "Register").should("be.disabled");
    });

    it("should show error for last name with invalid characters", () => {
        cy.get("#signupLastName").type("Doe@!");
        cy.get("#signupName").click();
        cy.contains("Last name is invalid").should("be.visible");
        cy.get("#signupLastName").should(
          "have.css",
          "border-color",
          "rgb(220, 53, 69)",
        );
        cy.contains(".btn.btn-primary", "Register").should("be.disabled");
    });

    it("should show error for empty name", () => {
        cy.get("#signupName").click();
        cy.get("#signupLastName").click();
        cy.contains("Name required").should("be.visible");
        cy.get("#signupName").should(
          "have.css",
          "border-color",
          "rgb(220, 53, 69)",
        );
        cy.contains(".btn.btn-primary", "Register").should("be.disabled");
    });

    it("should show error for empty last name", () => {
        cy.get("#signupLastName").click();
        cy.get("#signupName").click();
        cy.contains("Last name required").should("be.visible");
        cy.get("#signupLastName").should(
          "have.css",
          "border-color",
          "rgb(220, 53, 69)",
        );
        cy.contains(".btn.btn-primary", "Register").should("be.disabled");
    });
    });

    describe("Validation for Email field", () => {
        beforeEach(() => {
            cy.get(".hero-descriptor_btn").click();
        });

        it("should show error for invalid email format", () => {
            cy.get("#signupEmail").type("invalid-email");
            cy.get("#signupName").click();
            cy.contains("Email is incorrect").should("be.visible");
            cy.get("#signupEmail").should(
              "have.css",
              "border-color",
              "rgb(220, 53, 69)",
            );
            cy.contains(".btn.btn-primary", "Register").should("be.disabled");
        });

        it("should show error for empty email", () => {
            cy.get("#signupEmail").click();
            cy.get("#signupName").click();
            cy.contains("Email required").should("be.visible");
            cy.get("#signupEmail").should(
              "have.css",
              "border-color",
              "rgb(220, 53, 69)",
            );
            cy.contains(".btn.btn-primary", "Register").should("be.disabled");
        });
    });

    describe("Validation for Password and Re-enter password fields", () => {
        beforeEach(() => {
            cy.get(".hero-descriptor_btn").click();
        });
        it("should show error for short password", () => {
            cy.get("#signupPassword").type("Pass1");
            cy.get("#signupLastName").click();
            cy.contains("Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter").should("be.visible");
            cy.get("#signupPassword").should(
              "have.css",
              "border-color",
              "rgb(220, 53, 69)",
            );
            cy.contains(".btn.btn-primary", "Register").should("be.disabled");
        });

        it("should show error for long password", () => {
            cy.get("#signupPassword").type("P".repeat(16) + "ass1");
            cy.get("#signupLastName").click();
            cy.contains("Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter").should("be.visible");
            cy.get("#signupPassword").should(
                "have.css",
                "border-color",
                "rgb(220, 53, 69)",
            );
            cy.contains(".btn.btn-primary", "Register").should("be.disabled");
        });

        it("should show error for password without capital letter", () => {
            cy.get("#signupPassword").type("testpass1");
            cy.get("#signupLastName").click();
            cy.contains("Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter").should("be.visible");
            cy.get("#signupPassword").should(
                "have.css",
                "border-color",
                "rgb(220, 53, 69)",
            );
            cy.contains(".btn.btn-primary", "Register").should("be.disabled");
        });

        it("should show error for password without small letter", () => {
            cy.get("#signupPassword").type("TESTPASS1");
            cy.get("#signupLastName").click();
            cy.contains("Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter").should("be.visible");
            cy.get("#signupPassword").should(
                "have.css",
                "border-color",
                "rgb(220, 53, 69)",
            );
            cy.contains(".btn.btn-primary", "Register").should("be.disabled");
        });

        it("should show error for password without number", () => {
            cy.get("#signupPassword").type("TestPass");
            cy.get("#signupLastName").click();
            cy.contains("Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter").should("be.visible");
            cy.get("#signupPassword").should(
                "have.css",
                "border-color",
                "rgb(220, 53, 69)",
            );
            cy.contains(".btn.btn-primary", "Register").should("be.disabled");
        });

        it("should show error for empty password", () => {
            cy.get("#signupPassword").click();
            cy.get("#signupLastName").click();
            cy.contains("Password required").should("be.visible");
            cy.get("#signupPassword").should(
                "have.css",
                "border-color",
                "rgb(220, 53, 69)",
            );
            cy.contains(".btn.btn-primary", "Register").should("be.disabled");
        });

        it("should show error for non-matching repeat password", () => {
            cy.get("#signupPassword").type("TestPass1");
            cy.get("#signupRepeatPassword").type("TestPass2");
            cy.get("#signupName").click();
            cy.contains("Passwords do not match").should("be.visible");
            cy.get("#signupRepeatPassword").should(
                "have.css",
                "border-color",
                "rgb(220, 53, 69)",
            );
            cy.contains(".btn.btn-primary", "Register").should("be.disabled");
        });

        it("should show error for empty repeat password", () => {
            cy.get("#signupPassword").type("TestPass1");
            cy.get("#signupRepeatPassword").click();
            cy.get("#signupName").click();
            cy.contains("Re-enter password required").should("be.visible");
            cy.get("#signupRepeatPassword").should(
                "have.css",
                "border-color",
                "rgb(220, 53, 69)",
            );
            cy.contains(".btn.btn-primary", "Register").should("be.disabled");
        });
    });
});
