const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://example.com",
    fixturesFolder: "cypress/fixtures",
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    supportFile: "cypress/support/e2e.js",
    setupNodeEvents(on, config) {},
  },

  defaultCommandTimeout: 5000,

  viewportWidth: 1280,
  viewportHeight: 720,

  screenshotsFolder: "cypress/screenshots",
  videosFolder: "cypress/videos",
  video: true,

  modifyObstructiveCode: false,
});
