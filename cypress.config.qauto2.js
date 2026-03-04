require("dotenv").config();

const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: process.env.CYPRESS_QAUTO2_BASE_URL,
    fixturesFolder: "cypress/fixtures",
    specPattern: "cypress/e2e/addCarExpenses.qauto.spec.cy.js",
    supportFile: "cypress/support/e2e.js",

    setupNodeEvents(on, config) {
      config.env.LOGIN_USERNAME = process.env.CYPRESS_LOGIN_USERNAME;
      config.env.LOGIN_PASSWORD = process.env.CYPRESS_LOGIN_PASSWORD;

      config.env.APP_USER_EMAIL = process.env.CYPRESS_APP_USER2_EMAIL;
      config.env.APP_USER_PASSWORD = process.env.CYPRESS_APP_USER2_PASSWORD;

      return config;
    },
  },

  defaultCommandTimeout: 5000,
  viewportWidth: 1280,
  viewportHeight: 720,
  screenshotsFolder: "cypress/screenshots",
  videosFolder: "cypress/videos",
  video: true,
  modifyObstructiveCode: false,

  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "cypress/reports/qauto",
    overwrite: false,
    html: true,
    json: true,
  },
});
