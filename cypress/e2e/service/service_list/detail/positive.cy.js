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
    qase([4201, 4205, 4213, 4202],
        it('Search Data & Clear', () => {
            cy.readFile(filename).then((object) => {
                listServicePage.search(object.namaLayanan)
            })
        }),

        qase([4211],
            it('Remove search keywords (use backspace)', () => {
                cy.readFile(filename).then((object) => {
                    listServicePage.search(object.namaLayanan)
                    cy.wait(5000)
                })
                listServicePage.assertSearchValid()
                listServicePage.deleteKeywordSearch()
                listServicePage.assertRowDefault()
            })
        ),

        qase([4210],
            it('Search With 1 Character', () => {
                listServicePage.search('a')
                listServicePage.assertRowDefault()
                listServicePage.clearSearch()
                listServicePage.assertRowDefault()
            })
        ),

        qase([4203],
            it('Search With 2 Character', () => {
                listServicePage.search('ai')
                listServicePage.assertRowDefault()
                listServicePage.clearSearch()
                listServicePage.assertRowDefault()
            })
        ),

        qase([4204],
            it('Invalid 3 character search', () => {
                listServicePage.search('aia')
                listServicePage.assertSearchNotFound()
                listServicePage.clearSearch()
                listServicePage.assertRowDefault()
            })
        ),

        qase([4206],
            it('Invalid > 3 character search', () => {
                listServicePage.search('aiaaaa')
                listServicePage.assertSearchNotFound()
                listServicePage.clearSearch()
                listServicePage.assertRowDefault()
            })
        ),

        qase([4214],
            it('Search with keywords space only', () => {
                listServicePage.search('   ')
                listServicePage.assertRowDefault()
                listServicePage.deleteKeywordSearch()
                listServicePage.assertRowDefault()
            })
        ),
    )

    qase([2861, 2862, 2863, 2869, 2873],
        it.skip('Assertion Detail Page', () => {
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