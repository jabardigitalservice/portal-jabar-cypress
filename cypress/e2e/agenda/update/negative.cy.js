import { ListAgendaPage } from "../../../support/pages/agenda/list.cy"
import { CreateAgendaPage } from "../../../support/pages/agenda/create.cy"
import { LoginPage } from "../../../support/pages/auth/login_page.cy"
import { UpdateAgendaPage } from "../../../support/pages/agenda/update.cy"
import { qase } from "cypress-qase-reporter/dist/mocha"

let agendaPage = new ListAgendaPage()
let createAgendaPage = new CreateAgendaPage()
let loginPage = new LoginPage()
let updatePage = new UpdateAgendaPage()
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
    agendaPage.clickBtnUpdate()
})

describe('Update Agenda - Negative Scenario', () => {
    // Karena pada fase beforeach data yang disubmit adalah type == online, maka tahap ini perlu mengganti type ke offline terlebih dahulu kemudian mengganti lagi ke type online
    qase(295,
        it('S27A3 - Ubah Tipe agenda offline - online dengan format link yang tidak valid [NEGATIVE]', () => {
            // Change type agenda from online to offline
            updatePage.verifyDataUpdatePage()
            updatePage.enterTitleAgenda(dataAgenda.titleUpdateAgenda)
            updatePage.chooseTypeAgendaOffline(dataAgenda.valueOffline)
            updatePage.enterPlaceAgenda(dataAgenda.placeAgendaUpdate)
            updatePage.startTime(dataAgenda.startTime)
            updatePage.endTime(dataAgenda.endTime)
            updatePage.categoryAgendaWakilGubernur()
            updatePage.enterTag()
            updatePage.clickBtnSaveChanges()
            updatePage.modalsConfirmationSuccesUpdate()
            agendaPage.searchAgendaUpdate(dataTempUpdate.titleAgendaUpdate)
            agendaPage.verifyNewDataUpdate()

            // change type agenda from offline to online
            agendaPage.clickBtnAksi()
            agendaPage.clickBtnUpdate()
            updatePage.enterTitleAgenda(dataAgenda.titleUpdateAgenda)
            updatePage.chooseTypeAgendaOnline(dataAgenda.valueOnline)
            updatePage.enterLinkAgenda(dataAgenda.linkAgendaUpdateNotValid)
            updatePage.startTime(dataAgenda.startTime)
            updatePage.endTime(dataAgenda.endTime)
            updatePage.categoryAgendaGubernur()
            updatePage.enterTag()
            updatePage.alertLinkNotValid()
            updatePage.clickBtnSaveChanges()
        })
    )
})