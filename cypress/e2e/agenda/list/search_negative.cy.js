import { ListAgendaPage } from "../../../support/pages/agenda/list.cy"
import { CreateAgendaPage } from "../../../support/pages/agenda/create.cy"
import { LoginPage } from "../../../support/pages/auth/login_page.cy"
import { UpdateAgendaPage } from "../../../support/pages/agenda/update.cy"
import { qase } from "cypress-qase-reporter/dist/mocha"

let agendaPage = new ListAgendaPage()
let createAgendaPage = new CreateAgendaPage()
let loginPage = new LoginPage()
let user
let dataAgenda
let dataTemp
let dataTempUpdate
let filename = "cypress/fixtures/agenda/agenda_temp_data.json"

before(() => {
    cy.fixture("credentials.json").then((data) => {
        user = data
    })
    cy.fixture("agenda/agenda_data.json").then((data) => {
        dataAgenda = data
    })
    cy.fixture("agenda/agenda_temp_data.json").then((data) => {
        dataTemp = data
    })
    cy.fixture("agenda/update_temp.json").then((dataUpdate) => {
        dataTempUpdate = dataUpdate
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
    // agendaPage.clickBtnCreateAgenda()

    // Input create data agenda
    // createAgendaPage.navigateToCreateAgendaPage()
    // createAgendaPage.enterTitleAgenda(dataAgenda.titleAgenda)
    // createAgendaPage.chooseTypeAgendaOnline(dataAgenda.valueOnline)
    // createAgendaPage.enterLinkAgenda(dataAgenda.linkAgenda)
    // createAgendaPage.enterDateAgenda()
    // createAgendaPage.startTime(dataAgenda.startTime)
    // createAgendaPage.endTime(dataAgenda.endTime)
    // createAgendaPage.categoryAgendaGubernur()
    // createAgendaPage.enterTag()
    // createAgendaPage.clickBtnPratinjau()
    // createAgendaPage.modalsPratinjau()
    // createAgendaPage.clickBtnCreateAgenda()
    // createAgendaPage.modalsConfirmationSucces()
})

describe('Search Agenda | Negative Scenario', () => {
    qase(368,
        it('Memasukan 3 karakter yang tidak beririsan dengan judul list agenda', () => {
            agendaPage.searchAgenda(dataAgenda.search3CharacterWrong)
            agendaPage.assertNullDataTable()
        })
    )

    qase(638,
        it('Memasukan > 3 karakter yang tidak beririsan dengan judul list agenda', () => {
            agendaPage.searchAgenda(dataAgenda.search5CharacterWrong)
            agendaPage.assertNullDataTable()
        })
    )

    qase(639,
        it.skip('Memasukan keyword karakter asing', () => {
            agendaPage.searchAgenda(dataAgenda.searchWrongCharacter)
            agendaPage.assertNullDataTable()
        })
    )
})
