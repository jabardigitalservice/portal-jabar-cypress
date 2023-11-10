import { ListAgendaPage } from "../../../support/pages/agenda/list.cy"
import { CreateAgendaPage } from "../../../support/pages/agenda/create.cy"
import { LoginPage } from "../../../support/pages/auth/login_page.cy"
import { DetailAgendaPage } from "../../../support/pages/agenda/detail.cy"
import { UpdateAgendaPage } from "../../../support/pages/agenda/update.cy"
import { qase } from "cypress-qase-reporter/dist/mocha"

let agendaPage = new ListAgendaPage()
let createAgendaPage = new CreateAgendaPage()
let loginPage = new LoginPage()
let detailPage = new DetailAgendaPage()
let updatePage = new UpdateAgendaPage()
let user
let dataAgenda
let dataTemp
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
})

describe('Detail Agenda Scenario', () => {
    qase(255,
        it('S27A2 - Detail Online - View Detail Agenda', () => {
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
            cy.readFile(filename).then((object) => {
                agendaPage.searchAgenda(object.titleAgenda)
            })
            agendaPage.verifyNewData()
            agendaPage.clickBtnAksi()
            agendaPage.clickBtnAksiLihatDetail()
            detailPage.assertDetailPage()
            detailPage.assertDetailContent()
        })
    )

    qase(255,
        it('S27A2 - Detail Offline - View Detail Agenda', () => {
            createAgendaPage.enterTitleAgenda(dataAgenda.titleAgenda)
            createAgendaPage.chooseTypeAgendaOffline(dataAgenda.valueOffline)
            createAgendaPage.enterPlaceAgenda(dataAgenda.placeAgenda)
            createAgendaPage.enterDateAgenda()
            createAgendaPage.startTime(dataAgenda.startTime)
            createAgendaPage.endTime(dataAgenda.endTime)
            createAgendaPage.categoryAgendaGubernur()
            createAgendaPage.enterTag()
            createAgendaPage.clickBtnPratinjau()
            createAgendaPage.modalsPratinjau()
            createAgendaPage.clickBtnCreateAgenda()
            createAgendaPage.modalsConfirmationSucces()
            cy.readFile(filename).then((object) => {
                agendaPage.searchAgenda(object.titleAgenda)
            })
            agendaPage.verifyNewData()
            agendaPage.clickBtnAksi()
            agendaPage.clickBtnAksiLihatDetail()
            detailPage.assertDetailPage()
            detailPage.assertDetailContent()
        })
    )

    qase(281,
        it('S27A2 - View Detail Agenda - Back to List Data Agenda Page', () => {
            createAgendaPage.enterTitleAgenda(dataAgenda.titleAgenda)
            createAgendaPage.chooseTypeAgendaOffline(dataAgenda.valueOffline)
            createAgendaPage.enterPlaceAgenda(dataAgenda.placeAgenda)
            createAgendaPage.enterDateAgenda()
            createAgendaPage.startTime(dataAgenda.startTime)
            createAgendaPage.endTime(dataAgenda.endTime)
            createAgendaPage.categoryAgendaGubernur()
            createAgendaPage.enterTag()
            createAgendaPage.clickBtnPratinjau()
            createAgendaPage.modalsPratinjau()
            createAgendaPage.clickBtnCreateAgenda()
            createAgendaPage.modalsConfirmationSucces()
            cy.readFile(filename).then((object) => {
                agendaPage.searchAgenda(object.titleAgenda)
            })
            agendaPage.verifyNewData()
            agendaPage.clickBtnAksi()
            agendaPage.clickBtnAksiLihatDetail()
            detailPage.assertDetailPage()
            detailPage.assertDetailContent()
            detailPage.clickBtnBack()
        })
    )

    qase(279,
        it('S27A2 - View Detail Agenda - Delete Agenda', () => {
            createAgendaPage.enterTitleAgenda(dataAgenda.titleAgenda)
            createAgendaPage.chooseTypeAgendaOffline(dataAgenda.valueOffline)
            createAgendaPage.enterPlaceAgenda(dataAgenda.placeAgenda)
            createAgendaPage.enterDateAgenda()
            createAgendaPage.startTime(dataAgenda.startTime)
            createAgendaPage.endTime(dataAgenda.endTime)
            createAgendaPage.categoryAgendaGubernur()
            createAgendaPage.enterTag()
            createAgendaPage.clickBtnPratinjau()
            createAgendaPage.modalsPratinjau()
            createAgendaPage.clickBtnCreateAgenda()
            createAgendaPage.modalsConfirmationSucces()
            cy.readFile(filename).then((object) => {
                agendaPage.searchAgenda(object.titleAgenda)
            })
            agendaPage.verifyNewData()
            agendaPage.clickBtnAksi()
            agendaPage.clickBtnAksiLihatDetail()
            detailPage.assertDetailPage()
            detailPage.assertDetailContent()
            detailPage.deleteAction()
            cy.readFile(filename).then((object) => {
                agendaPage.searchAgenda(object.titleAgenda)
            })
            agendaPage.assertNullDataTable()
        })
    )

    qase(280,
        it('S27A2 - View Detail Agenda - Closing the Popup Menu Confirm Delete Agenda', () => {
            createAgendaPage.enterTitleAgenda(dataAgenda.titleAgenda)
            createAgendaPage.chooseTypeAgendaOffline(dataAgenda.valueOffline)
            createAgendaPage.enterPlaceAgenda(dataAgenda.placeAgenda)
            createAgendaPage.enterDateAgenda()
            createAgendaPage.startTime(dataAgenda.startTime)
            createAgendaPage.endTime(dataAgenda.endTime)
            createAgendaPage.categoryAgendaGubernur()
            createAgendaPage.enterTag()
            createAgendaPage.clickBtnPratinjau()
            createAgendaPage.modalsPratinjau()
            createAgendaPage.clickBtnCreateAgenda()
            createAgendaPage.modalsConfirmationSucces()
            cy.readFile(filename).then((object) => {
                agendaPage.searchAgenda(object.titleAgenda)
            })
            agendaPage.verifyNewData()
            agendaPage.clickBtnAksi()
            agendaPage.clickBtnAksiLihatDetail()
            detailPage.assertDetailPage()
            detailPage.assertDetailContent()
            detailPage.cancelDeleteAction()
        })
    )

    qase(283,
        it('S27A2 - View Detail Agenda - Show Preview', () => {
            createAgendaPage.enterTitleAgenda(dataAgenda.titleAgenda)
            createAgendaPage.chooseTypeAgendaOffline(dataAgenda.valueOffline)
            createAgendaPage.enterPlaceAgenda(dataAgenda.placeAgenda)
            createAgendaPage.enterDateAgenda()
            createAgendaPage.startTime(dataAgenda.startTime)
            createAgendaPage.endTime(dataAgenda.endTime)
            createAgendaPage.categoryAgendaGubernur()
            createAgendaPage.enterTag()
            createAgendaPage.clickBtnPratinjau()
            createAgendaPage.modalsPratinjau()
            createAgendaPage.clickBtnCreateAgenda()
            createAgendaPage.modalsConfirmationSucces()
            cy.readFile(filename).then((object) => {
                agendaPage.searchAgenda(object.titleAgenda)
            })
            agendaPage.verifyNewData()
            agendaPage.clickBtnAksi()
            agendaPage.clickBtnAksiLihatDetail()
            detailPage.assertDetailContent()
            detailPage.clickBtnPratinjau()
            createAgendaPage.modalsPratinjau()
        })
    )

    qase([299, 300],
        it('S27A2 - View Detail Agenda - Edit Agenda', () => {
            createAgendaPage.enterTitleAgenda(dataAgenda.titleAgenda)
            createAgendaPage.chooseTypeAgendaOffline(dataAgenda.valueOffline)
            createAgendaPage.enterPlaceAgenda(dataAgenda.placeAgenda)
            createAgendaPage.enterDateAgenda()
            createAgendaPage.startTime(dataAgenda.startTime)
            createAgendaPage.endTime(dataAgenda.endTime)
            createAgendaPage.categoryAgendaGubernur()
            createAgendaPage.enterTag()
            createAgendaPage.clickBtnPratinjau()
            createAgendaPage.modalsPratinjau()
            createAgendaPage.clickBtnCreateAgenda()
            createAgendaPage.modalsConfirmationSucces()
            cy.readFile(filename).then((object) => {
                agendaPage.searchAgenda(object.titleAgenda)
            })
            agendaPage.verifyNewData()
            agendaPage.clickBtnAksi()
            agendaPage.clickBtnAksiLihatDetail()
            detailPage.assertDetailContent()
            detailPage.clickBtnUpdate()
            updatePage.assertUpdatePage()
            updatePage.enterTitleAgenda(dataAgenda.titleUpdateAgenda)
            updatePage.chooseTypeAgendaOnline(dataAgenda.valueOnline)
            updatePage.enterLinkAgenda(dataAgenda.linkAgendaUpdate)
            updatePage.startTime(dataAgenda.startTime)
            updatePage.endTime(dataAgenda.endTime)
            updatePage.categoryAgendaWakilGubernur()
            updatePage.clickBtnSaveChanges()
            updatePage.modalsConfirmationSuccesUpdate()
            agendaPage.searchAgendaUpdate(dataTemp.titleAgendaUpdate)
            agendaPage.verifyNewDataUpdate()
        })
    )

    qase(301,
        it('S27A2 - View Detail Agenda - Menampilkan Pesan konfirmasi untuk menyimpan perubahan', () => {
            createAgendaPage.enterTitleAgenda(dataAgenda.titleAgenda)
            createAgendaPage.chooseTypeAgendaOffline(dataAgenda.valueOffline)
            createAgendaPage.enterPlaceAgenda(dataAgenda.placeAgenda)
            createAgendaPage.enterDateAgenda()
            createAgendaPage.startTime(dataAgenda.startTime)
            createAgendaPage.endTime(dataAgenda.endTime)
            createAgendaPage.categoryAgendaGubernur()
            createAgendaPage.enterTag()
            createAgendaPage.clickBtnPratinjau()
            createAgendaPage.modalsPratinjau()
            createAgendaPage.clickBtnCreateAgenda()
            createAgendaPage.modalsConfirmationSucces()
            cy.readFile(filename).then((object) => {
                agendaPage.searchAgenda(object.titleAgenda)
            })
            agendaPage.verifyNewData()
            agendaPage.clickBtnAksi()
            agendaPage.clickBtnAksiLihatDetail()
            detailPage.assertDetailContent()
            detailPage.clickBtnUpdate()
            updatePage.assertUpdatePage()
            updatePage.enterTitleAgenda(dataAgenda.titleUpdateAgenda)
            updatePage.chooseTypeAgendaOnline(dataAgenda.valueOnline)
            updatePage.enterLinkAgenda(dataAgenda.linkAgendaUpdate)
            updatePage.startTime(dataAgenda.startTime)
            updatePage.endTime(dataAgenda.endTime)
            updatePage.categoryAgendaWakilGubernur()
            updatePage.clickBtnBack()
            updatePage.clickBtnYesSave()
            updatePage.modalsConfirmationSuccesUpdate()
            agendaPage.searchAgendaUpdate(dataTemp.titleAgendaUpdate)
            agendaPage.verifyNewDataUpdate()
        })
    )

    qase(282,
        it.only('S27A2 - View Detail Agenda - Kembali Ke Halaman Detail Agenda', () => {
            createAgendaPage.enterTitleAgenda(dataAgenda.titleAgenda)
            createAgendaPage.chooseTypeAgendaOffline(dataAgenda.valueOffline)
            createAgendaPage.enterPlaceAgenda(dataAgenda.placeAgenda)
            createAgendaPage.enterDateAgenda()
            createAgendaPage.startTime(dataAgenda.startTime)
            createAgendaPage.endTime(dataAgenda.endTime)
            createAgendaPage.categoryAgendaGubernur()
            createAgendaPage.enterTag()
            createAgendaPage.clickBtnPratinjau()
            createAgendaPage.modalsPratinjau()
            createAgendaPage.clickBtnCreateAgenda()
            createAgendaPage.modalsConfirmationSucces()
            cy.readFile(filename).then((object) => {
                agendaPage.searchAgenda(object.titleAgenda)
            })
            agendaPage.verifyNewData()
            agendaPage.clickBtnAksi()
            agendaPage.clickBtnAksiLihatDetail()
            detailPage.assertDetailContent()
            detailPage.clickBtnUpdate()
            cy.wait(5000)
            updatePage.clickBtnBack()
            updatePage.clickBtnYesSave()
            updatePage.modalsConfirmationSuccesUpdate()
            cy.readFile(filename).then((object) => {
                agendaPage.searchAgenda(object.titleAgenda)
            })
            agendaPage.verifyNewData()
        })
    )

    qase(302,
        it('S27A2 - View Detail Agenda - Menampilkan Pesan konfirmasi untuk menyimpan perubahan [TIDAK]', () => {
            createAgendaPage.enterTitleAgenda(dataAgenda.titleAgenda)
            createAgendaPage.chooseTypeAgendaOffline(dataAgenda.valueOffline)
            createAgendaPage.enterPlaceAgenda(dataAgenda.placeAgenda)
            createAgendaPage.enterDateAgenda()
            createAgendaPage.startTime(dataAgenda.startTime)
            createAgendaPage.endTime(dataAgenda.endTime)
            createAgendaPage.categoryAgendaGubernur()
            createAgendaPage.enterTag()
            createAgendaPage.clickBtnPratinjau()
            createAgendaPage.modalsPratinjau()
            createAgendaPage.clickBtnCreateAgenda()
            createAgendaPage.modalsConfirmationSucces()
            cy.readFile(filename).then((object) => {
                agendaPage.searchAgenda(object.titleAgenda)
            })
            agendaPage.verifyNewData()
            agendaPage.clickBtnAksi()
            agendaPage.clickBtnAksiLihatDetail()
            detailPage.assertDetailContent()
            detailPage.clickBtnUpdate()
            updatePage.assertUpdatePage()
            updatePage.enterTitleAgenda(dataAgenda.titleUpdateAgenda)
            updatePage.categoryAgendaWakilGubernur()
            updatePage.clickBtnBack()
            updatePage.clickBtnNotSaved()
            cy.readFile(filename).then((object) => {
                agendaPage.searchAgenda(object.titleAgenda)
            })
            agendaPage.verifyNewData()
        })
    )
})
