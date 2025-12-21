const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    blockHosts: [
      "*.googlesyndication.com",
      "*.doubleclick.net",
      "*.google-analytics.com"
    ],
  },
});
