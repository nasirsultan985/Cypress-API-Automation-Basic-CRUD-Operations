const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {

    setupNodeEvents(on, config) {
      // implement node event listeners here
    },

    specPattern: "cypress/integration/api-automation",
    failOnStatusCode: false // Globally disable failing on 4xx/5xx errors

  },
});
