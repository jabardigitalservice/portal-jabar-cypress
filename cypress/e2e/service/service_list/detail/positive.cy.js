import { ListServicePage } from "../../../../support/pages/service/service_list/list.cy";
import { DetailServicePage } from "../../../../support/pages/service/service_list/detail.cy";
import { ListAgendaPage } from "../../../../support/pages/agenda/list.cy";
import { CreateServiceMasterPage } from "../../../../support/pages/service/service_list/create.cy";
import { LoginPage } from "../../../../support/pages/auth/login_page.cy";
import { qase } from "cypress-qase-reporter/dist/mocha";

const { faker } = require('@faker-js/faker')
let listServicePage = new ListServicePage()
let detailPage = new DetailServicePage()
let agendaPage = new ListAgendaPage()
let createServiceMasterPage = new CreateServiceMasterPage()
let loginPage = new LoginPage()
let user
let filename = "cypress/fixtures/service/wizard1_temp_data.json"

before('Load Data', () => {
    // cy.then(Cypress.session.clearCurrentSessionData)
    cy.fixture("credentials.json").then((data) => {
        user = data
    })
})

beforeEach(() => {
    // Login
    loginPage.navigateLoginPage()
    loginPage.enterEmail(user.email)
    loginPage.enterPassword(user.password)
    loginPage.clickBtnMasuk()
    loginPage.loadCmsPage()
    // Go to Service Page
    listServicePage.navigateToServicePage()
    listServicePage.assertServicePage()

})

describe('Detail Positive Scenario', () => {
    qase([2861, 2862, 2863, 2869, 2873],
        it('Assertion Detail Page', () => {
            // Create Data 
            cy.createDataMasterService()

            // Go to detail page
            listServicePage.clickBtnAksi()
            listServicePage.clickBtnDetail()
            detailPage.assertDetailPage()

            // Assert Service Tab
            detailPage.assertServiceData()

            // Assert Application Tab
            detailPage.clickApplicationTab()
            detailPage.assertionApplicationData()

            // // Assert Additional Information Tab
            detailPage.clickAdditionalInformationTab()
            detailPage.assertionAdditionalInfoData()
        })
    )
})