import { ListAgendaPage } from "../../support/pages/agenda/list.cy"
import { CreateAgendaPage } from "../../support/pages/agenda/create.cy"
import { LoginPage } from "../../support/pages/auth/login_page.cy"
import { qase } from "cypress-qase-reporter/dist/mocha"

let agendaPage = new ListAgendaPage()
let createAgendaPage = new CreateAgendaPage()
let loginPage = new LoginPage()
let user
let dataAgenda
let dataTemp

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
    loginPage.navigateLoginPage()
    loginPage.enterEmail(user.email)
    loginPage.enterPassword(user.password)
    loginPage.clickBtnMasuk()
    loginPage.loadCmsPage()
    agendaPage.navigateToAgendaPage()
    agendaPage.clickBtnCreateAgenda()
    createAgendaPage.navigateToCreateAgendaPage()
})

describe('Agenda Abnormal Scenario', () => {
    qase(361,
        it.skip('S28A3 - Create Agenda Offline - Menampilkan Pratinjau Agenda - Koneksi Offline', () => {
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
            agendaPage.searchAgenda(dataTemp.titleAgenda)
            agendaPage.verifyNewData()
            agendaPage.clickBtnAksi()
            // agendaPage.goOffline()
            agendaPage.clickBtnAksiPratinjau()
            // agendaPage.goOnline()
            createAgendaPage.modalsPratinjau()
        })
    )
})