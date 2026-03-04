class GaragePage {
  visit() {
    cy.visit("/panel/garage");
  }

  clickAddCar() {
    cy.contains("Add car").click();
  }

  selectBrand(brand) {
    cy.get("#addCarBrand").select(brand);
  }

  selectModel(model) {
    cy.get("#addCarModel").select(model);
  }

  enterMileage(mileage) {
    cy.get("#addCarMileage").type(mileage);
  }

  submit() {
    cy.get("ngb-modal-window").within(() => {
      cy.contains("button", "Add").click();
    });
  }
}

export default new GaragePage();