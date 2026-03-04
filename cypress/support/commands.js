/// <reference types="cypress" />

Cypress.Commands.add("login", (email, password) => {
  cy.visit("/", {
    auth: {
      username: Cypress.env("LOGIN_USERNAME"),
      password: Cypress.env("LOGIN_PASSWORD"),
    },
  });
  cy.get(".btn.btn-outline-white.header_signin").click();
  cy.get("#signinEmail").type(email);
  cy.get("#signinPassword").type(password);
  cy.contains(".btn.btn-primary", "Login").click();
});


Cypress.Commands.overwrite("type", (originalFn, element, text, options) => {
  if (options && options.sensitive) {
    options.log = false;
    Cypress.log({
      $el: element,
      name: "type",
      message: "*".repeat(text.length),
    });
  }

  return originalFn(element, text, options);
});

Cypress.Commands.add("addExpense", (carId, expense) => {
  return cy.request({
    method: "POST",
    url: "/api/expenses",
    body: {
      carId,
      reportedAt: expense.reportedAt,
      mileage: expense.mileage,
      liters: expense.liters,
      totalCost: expense.totalCost,
      forceMileage: expense.forceMileage,
    },
  });
});