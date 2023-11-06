const { defineConfig } = require("cypress");
require('dotenv').config()
console.log(process.env.BASE_URL)

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },

    // Width x Height preview in cypress GUI
    viewportWidth: 1440,
    viewportHeight: 900,

    // Connecting with cypress dashboard
    projectId: process.env.CYPRESS_CLOUD_PROJECT_ID,

    env: {
      base_url: process.env.BASE_URL,
      base_url_preview: process.env.BASE_URL_PREVIEW,
    },

    retries: {
      runMode: 2, // Headless
      openMode: 1, // GUI 
    },

    // Integration With Qase.io
    "reporter": "cypress-qase-reporter",
    "reporterOptions": {
      "apiToken": process.env.QASE_IO_API_KEY,
      "projectCode": "IPJ",
      "logging": true,
      "runComplete": true,
      "basePath": "https://api.qase.io/v1",
      "video": false,
      "environmentId": 2
    },

    "video": true,
    testIsolation: true,
  },
});
