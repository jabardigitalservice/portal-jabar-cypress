import { ListServicePage } from "../../../../support/pages/service/service_list/list.cy";
import { CreateServiceMasterPage } from "../../../../support/pages/service/service_list/create.cy";
import { LoginPage } from "../../../../support/pages/auth/login_page.cy";
import { DeleteServicePage } from "../../../../support/pages/service/service_list/delete.cy";
import { qase } from "cypress-qase-reporter/dist/mocha";

const { faker } = require('@faker-js/faker')
let listServicePage = new ListServicePage()
let createServiceMasterPage = new CreateServiceMasterPage()
let loginPage = new LoginPage()
let deleteServicePage = new DeleteServicePage()
let user
let filename = "cypress/fixtures/service/wizard1_temp_data.json"

before('Load Data', () => {
    // cy.then(Cypress.session.clearCurrentSessionData)
    cy.fixture("credentials.json").then((data) => {
        user = data
    })
})

beforeEach(() => {
    cy.login()
    listServicePage.navigateToServicePage()
    listServicePage.assertServicePage()
})

describe('Service Positive Scenario', { testIsolation: true }, () => {
    qase([2882],
        it('Delete Data', () => {
            // Delete
            listServicePage.clickBtnAksi()
            listServicePage.clickBtnDelete()
            deleteServicePage.modalsConfirmationDelete()
            deleteServicePage.clickBtnYesDelete()
            deleteServicePage.clickBtnUnderstand()
            // cy.readFile(filename).then((object) => {
            //     agendaPage.searchAgenda(object.namaLayanan)
            // })
            // agendaPage.assertNullDataTable()
        })
    )
})
