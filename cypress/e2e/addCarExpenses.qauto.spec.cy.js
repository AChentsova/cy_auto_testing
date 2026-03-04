import garagePage from "../pages/GaragePage";
import expensesPage from "../pages/FuelExpensesPage";
import "../support/commands";

describe("Add a car and expense - QAuto Main Site", () => {
  let carId;

  const testExpense = {
    reportedAt: "2026-03-04",
    mileage: 110,
    liters: 10,
    totalCost: 500,
    forceMileage: false,
  };

  beforeEach(() => {
    cy.login(Cypress.env("APP_USER_EMAIL"), Cypress.env("APP_USER_PASSWORD"));
    cy.contains("You have been successfully logged in").should("be.visible");
    cy.url().should("include", "/panel/garage");
  });

  it("should add a car with API verification", () => {
    cy.intercept("POST", "/api/cars").as("addCar");

    garagePage.clickAddCar();
    garagePage.selectBrand("Audi");
    garagePage.selectModel("TT");
    garagePage.enterMileage("100");
    garagePage.submit();

    cy.wait("@addCar").then((interception) => {
      expect(interception.response.statusCode).to.eq(201);
      carId = interception.response.body.data.id;

      cy.request("GET", "/api/cars").then((response) => {
        expect(response.status).to.eq(200);
        const createdCar = response.body.data.find((car) => car.id === carId);
        expect(createdCar).to.exist;
        expect(createdCar.brand).to.eq("Audi");
        expect(createdCar.model).to.eq("TT");
        expect(createdCar.mileage).to.eq(100);
      });
    }); 
  });

  it("should add an expense via API and validate the response", () => {
    cy.addExpense(carId, testExpense).then((expenseResponse) => {
      expect(expenseResponse.status).to.eq(200);

      const expense = expenseResponse.body.data;
      expect(expense.carId).to.eq(carId);
      expect(expense.reportedAt).to.eq(testExpense.reportedAt);
      expect(expense.mileage).to.eq(testExpense.mileage);
      expect(expense.liters).to.eq(testExpense.liters);
      expect(expense.totalCost).to.eq(testExpense.totalCost);
    });
  });

  it("should find the car via UI and validate the created expense", () => {
    expensesPage.openExpensesPage();
    cy.get("#carSelectDropdown").then(($btn) => {
      const selectedCar = $btn.text().trim();

      if (selectedCar !== "Audi TT") {
        cy.wrap($btn).click();

        cy.get(".car-select-dropdown_menu .car-select-dropdown_item")
          .contains("Audi TT")
          .click();
      }
    });
    cy.contains(
      "td",
      new Date(testExpense.reportedAt).toLocaleDateString("uk-UA"))
      .should("be.visible")
      .parent("tr")
      .within(() => {
        cy.contains(testExpense.mileage).should("be.visible");
        cy.contains(testExpense.liters).should("be.visible");
        cy.contains(testExpense.totalCost).should("be.visible");
      });
});
});