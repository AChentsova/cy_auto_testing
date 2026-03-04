import garagePage from "../pages/GaragePage";
import expensesPage from "../pages/FuelExpensesPage";
import "../support/commands";

describe("Add a car and expenses - QAuto Main Site", () => {
  beforeEach(() => {
    cy.login(Cypress.env("APP_USER_EMAIL"), Cypress.env("APP_USER_PASSWORD"));
    cy.contains("You have been successfully logged in").should("be.visible");
    cy.url().should("include", "/panel/garage");
  });

  it("should add a car and add fuel expense", () => {
    garagePage.clickAddCar();
    garagePage.selectBrand("Audi");
    garagePage.selectModel("TT");
    garagePage.enterMileage("100");
    garagePage.submit();

    expensesPage.clickAddFuel();
    expensesPage.enterLiters("20");
    expensesPage.enterTotalCost("1000");
    expensesPage.changeMileage("150");
    expensesPage.submit();
  });
});