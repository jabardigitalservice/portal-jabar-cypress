import { DeleteAgendaPage } from "../../../support/pages/agenda/deletes.cy";
import { ListAgendaPage } from "../../../support/pages/agenda/list.cy";
import { LoginPage } from "../../../support/pages/auth/login_page.cy"
import { CreateAgendaPage } from "../../../support/pages/agenda/create.cy"
import { qase } from "cypress-qase-reporter/dist/mocha"

let deletePage = new DeleteAgendaPage()
let agendaPage = new ListAgendaPage()
let loginPage = new LoginPage()
let createAgendaPage = new CreateAgendaPage()
let user
let dataAgenda
let dataTemp
let filename = "cypress/fixtures/agenda/agenda_temp_data.json"

before(() => {
    // cy.then(Cypress.session.clearCurrentSessionData)
    cy.fixture("credentials.json").then((data) => {
        user = data
    })
    cy.fixture("agenda/agenda_data.json").then((data) => {
        dataAgenda = data
    })
    cy.fixture("agenda/agenda_temp_data.json").then((data) => {
        dataTemp = data
    })
})

beforeEach(() => {
    // Login Phase
    loginPage.navigateLoginPage()
    loginPage.enterEmail(user.email)
    loginPage.enterPassword(user.password)
    loginPage.clickBtnMasuk()
    loginPage.loadCmsPage()

    // Navigate To Agenda Page
    agendaPage.navigateToAgendaPage()
    agendaPage.clickBtnCreateAgenda()

    // Input create data agenda
    createAgendaPage.navigateToCreateAgendaPage()
    createAgendaPage.enterTitleAgenda(dataAgenda.titleAgenda)
    createAgendaPage.chooseTypeAgendaOnline(dataAgenda.valueOnline)
    createAgendaPage.enterLinkAgenda(dataAgenda.linkAgenda)
    createAgendaPage.enterDateAgenda()
    createAgendaPage.startTime(dataAgenda.startTime)
    createAgendaPage.endTime(dataAgenda.endTime)
    createAgendaPage.categoryAgendaGubernur()
    createAgendaPage.enterTag()
    createAgendaPage.clickBtnPratinjau()
    createAgendaPage.modalsPratinjau()
    createAgendaPage.clickBtnCreateAgenda()
    createAgendaPage.modalsConfirmationSucces()

    // Verify new data input in list data
    cy.readFile(filename).then((object) => {
        agendaPage.searchAgenda(object.titleAgenda)
    })
    agendaPage.verifyNewData()

    // Navigate to update page
    agendaPage.clickBtnAksi()
    agendaPage.clickBtnDelete()
})

describe('Delete Agenda Scenario', () => {
    qase(257,
        it('S27A3 - Delete Agenda', () => {
            deletePage.modalsConfirmationDelete()
            deletePage.clickBtnYesDelete()
            cy.readFile(filename).then((object) => {
                agendaPage.searchAgenda(object.titleAgenda)
            })
            agendaPage.assertNullDataTable()
        })
    )

    qase(258,
        it('S27A3 - Delete Agenda [NEGATIVE]', () => {
            deletePage.modalsConfirmationDelete()
            deletePage.clickBtnCancelDelete()
            cy.readFile(filename).then((object) => {
                agendaPage.searchAgenda(object.titleAgenda)
            })
            agendaPage.verifyNewData()
        })
    )
})