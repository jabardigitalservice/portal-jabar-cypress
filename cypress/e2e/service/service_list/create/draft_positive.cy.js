import { ListServicePage } from "../../../../support/pages/service/service_list/list.cy";
import { CreateServiceMasterPage } from "../../../../support/pages/service/service_list/create.cy";
import { LoginPage } from "../../../../support/pages/auth/login_page.cy";
import { DeleteServicePage } from "../../../../support/pages/service/service_list/delete.cy";
import { qase } from "cypress-qase-reporter/dist/mocha";
import { btnSaveDraft } from "../../../../support/selectors/service/service_list/create";

const { faker } = require('@faker-js/faker')
let listServicePage = new ListServicePage()
let createServiceMasterPage = new CreateServiceMasterPage()
let loginPage = new LoginPage()
let deleteServicePage = new DeleteServicePage()
let user
let filename = "cypress/fixtures/service/wizard1_temp_data.json"

before('Load Data', () => {
    cy.then(Cypress.session.clearCurrentSessionData)
    cy.fixture("credentials.json").then((data) => {
        user = data
    })
})

describe('Service Positive Scenario', { testIsolation: false }, () => {

    it('Login Application', () => {
        cy.login()
        listServicePage.navigateToServicePage()
        listServicePage.assertServicePage()
    });

    qase([2832],
        it('Create Draft Null Value', () => {
            listServicePage.clickBtnCreateService()
            createServiceMasterPage.assertCreateServicePage()
            createServiceMasterPage.clickBtnSimpanLanjutkanDraft()
            createServiceMasterPage.clickBtnSimpanLanjutkan2()
            createServiceMasterPage.clickBtnSaveDraft()
            createServiceMasterPage.clickBtnYesSaveDraft()
            createServiceMasterPage.assertAlertSuccessSaveDraft()
            createServiceMasterPage.clickBtnUnderstand()

            // Delete
            // listServicePage.clickBtnAksi()
            // listServicePage.clickBtnDelete()
            // deleteServicePage.modalsConfirmationDelete()
            // deleteServicePage.clickBtnYesDelete()
            // deleteServicePage.clickBtnUnderstand()
            // cy.readFile(filename).then((object) => {
            //     agendaPage.searchAgenda(object.namaLayanan)
            // })
            // agendaPage.assertNullDataTable()
        })
    )
})
