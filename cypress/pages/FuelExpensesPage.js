class ExpensesPage {
  clickAddFuel() {
    cy.contains("Add fuel expense").click();
  }

  enterLiters(value) {
    cy.get("#addExpenseLiters").type(value);
  }

  enterTotalCost(value) {
    cy.get("#addExpenseTotalCost").type(value);
  }

  changeMileage(value) {
    cy.get("#addExpenseMileage").clear().type(value);
  }

  changeReportedDate(value) {
    cy.get("#addExpenseDate").clear().type(value);
  }

  submit() {
    cy.get("ngb-modal-window").within(() => {
      cy.contains("button", "Add").click();
    });
  }
}

export default new ExpensesPage();