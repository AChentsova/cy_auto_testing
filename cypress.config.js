require("dotenv").config();

const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    fixturesFolder: "cypress/fixtures",
    specPattern: "cypress/e2e/*.cy.{js,jsx,ts,tsx}",
    supportFile: "cypress/support/e2e.js",
    setupNodeEvents(on, config) {
      config.env.LOGIN_USERNAME = process.env.CYPRESS_LOGIN_USERNAME;
      config.env.LOGIN_PASSWORD = process.env.CYPRESS_LOGIN_PASSWORD;

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
});
