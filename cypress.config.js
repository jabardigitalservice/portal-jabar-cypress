const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },

    // Width x Height preview in cypress GUI
    viewportWidth: 1440,
    viewportHeight: 900,

    // Connecting with cypress dashboard
    projectId: "gzadzk",
    // npx cypress run --record --key 52874105-57fe-46db-b620-ba0d73dff5f6

    env: {
      base_url: "https://develop--portal-jabar-cms.netlify.app"
    },

    // Integration With Qase.io
    "reporter": "cypress-qase-reporter",
    "reporterOptions": {
      "apiToken": "faa1d80f16627da3fa736f3b76614d156edce6f8",
      "projectCode": "IPJ",
      "logging": true,
      "runComplete": false,
      "basePath": "https://api.qase.io/v1",
      "video": false,
      "environmentId": 2
    },

    "video": true,
    testIsolation: true,
  },


});
