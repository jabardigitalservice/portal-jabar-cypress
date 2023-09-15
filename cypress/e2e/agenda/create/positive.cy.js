import { ListAgendaPage } from "../../../support/pages/agenda/list.cy"
import { CreateAgendaPage } from "../../../support/pages/agenda/create.cy"
import { LoginPage } from "../../../support/pages/auth/login_page.cy"
import { qase } from "cypress-qase-reporter/dist/mocha"

let agendaPage = new ListAgendaPage()
let createAgendaPage = new CreateAgendaPage()
let loginPage = new LoginPage()
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
	loginPage.navigateLoginPage()
	loginPage.enterEmail(user.email)
	loginPage.enterPassword(user.password)
	loginPage.clickBtnMasuk()
	loginPage.loadCmsPage()
	agendaPage.navigateToAgendaPage()
	agendaPage.clickBtnCreateAgenda()
	createAgendaPage.navigateToCreateAgendaPage()
})

describe("Agenda Offline Positive Scenario", () => {
	qase(
		260,
		it("S28A1 - Create Agenda Offline", () => {
			createAgendaPage.enterTitleAgenda(dataAgenda.titleAgenda)
			createAgendaPage.chooseTypeAgenda(dataAgenda.valueOffline)
			createAgendaPage.enterPlaceAgenda(dataAgenda.placeAgenda)
			createAgendaPage.enterDateAgenda()
			createAgendaPage.startTime(dataAgenda.startTime)
			createAgendaPage.endTime(dataAgenda.endTime)
			createAgendaPage.categoryAgenda(dataAgenda.cat1)
			createAgendaPage.enterTag()
			createAgendaPage.clickBtnCreateAgenda()
			createAgendaPage.modalsConfirmationSucces()
			cy.readFile(filename).then((object) => {
				agendaPage.searchAgenda(object.titleAgenda)
			})
			agendaPage.verifyNewData()
		})
	)

	qase(
		[264],
		it("S28A1 - Create Agenda Offline - Today", () => {
			createAgendaPage.enterTitleAgenda(dataAgenda.titleAgenda)
			createAgendaPage.chooseTypeAgendaOffline(dataAgenda.valueOffline)
			createAgendaPage.enterPlaceAgenda(dataAgenda.placeAgenda)
			createAgendaPage.checkBoxToday()
			createAgendaPage.startTime(dataAgenda.startTime)
			createAgendaPage.endTime(dataAgenda.endTime)
			createAgendaPage.categoryAgenda(dataAgenda.cat1)
			createAgendaPage.enterTag()
			createAgendaPage.clickBtnCreateAgenda()
			createAgendaPage.modalsConfirmationSucces()
			cy.readFile(filename).then((object) => {
				agendaPage.searchAgenda(object.titleAgenda)
			})
			agendaPage.verifyNewData()
		})
	)

	qase(
		265,
		it("S28A1 - Create Agenda Offline - date < date today", () => {
			createAgendaPage.enterTitleAgenda(dataAgenda.titleAgenda)
			createAgendaPage.chooseTypeAgendaOffline(dataAgenda.valueOffline)
			createAgendaPage.enterPlaceAgenda(dataAgenda.placeAgenda)
			createAgendaPage.enterDateAgendaBeforeToday()
			createAgendaPage.startTime(dataAgenda.startTime)
			createAgendaPage.endTime(dataAgenda.endTime)
			createAgendaPage.categoryAgenda(dataAgenda.cat1)
			createAgendaPage.enterTag()
			createAgendaPage.clickBtnCreateAgenda()
			createAgendaPage.modalsConfirmationSucces()
			cy.readFile(filename).then((object) => {
				agendaPage.searchAgenda(object.titleAgenda)
			})
			agendaPage.verifyNewData()
		})
	)

	qase(
		[266, 267],
		it("S28A1 - Create Agenda Offline - Start Time & End Time has passed", () => {
			createAgendaPage.enterTitleAgenda(dataAgenda.titleAgenda)
			createAgendaPage.chooseTypeAgendaOffline(dataAgenda.valueOffline)
			createAgendaPage.enterPlaceAgenda(dataAgenda.placeAgenda)
			createAgendaPage.enterDateAgenda()
			createAgendaPage.startTime(dataAgenda.startTimeNegative)
			createAgendaPage.endTime(dataAgenda.endTimeNegative)
			createAgendaPage.categoryAgenda(dataAgenda.cat1)
			createAgendaPage.enterTag()
			createAgendaPage.clickBtnCreateAgenda()
			createAgendaPage.modalsConfirmationSucces()
			cy.readFile(filename).then((object) => {
				agendaPage.searchAgenda(object.titleAgenda)
			})
			agendaPage.verifyNewData()
		})
	)
})

describe('Agenda Online Positive Scenario', () => {
	qase(641,
		it('S28A2 - Create Agenda Online', () => {
			createAgendaPage.enterTitleAgenda(dataAgenda.titleAgenda)
			createAgendaPage.chooseTypeAgendaOnline(dataAgenda.valueOnline)
			createAgendaPage.enterLinkAgenda(dataAgenda.linkAgenda)
			createAgendaPage.enterDateAgenda()
			createAgendaPage.startTime(dataAgenda.startTime)
			createAgendaPage.endTime(dataAgenda.endTime)
			createAgendaPage.categoryAgenda(dataAgenda.cat1)
			createAgendaPage.enterTag()
			createAgendaPage.clickBtnCreateAgenda()
			createAgendaPage.modalsConfirmationSucces()
			cy.readFile(filename).then((object) => {
				agendaPage.searchAgenda(object.titleAgenda)
			})
			agendaPage.verifyNewData()
		})
	)

	qase(269,
		it('S28A2 - Create Agenda Online - Today', () => {
			createAgendaPage.enterTitleAgenda(dataAgenda.titleAgenda)
			createAgendaPage.chooseTypeAgendaOnline(dataAgenda.valueOnline)
			createAgendaPage.enterLinkAgenda(dataAgenda.linkAgenda)
			createAgendaPage.checkBoxToday()
			createAgendaPage.startTime(dataAgenda.startTime)
			createAgendaPage.endTime(dataAgenda.endTime)
			createAgendaPage.categoryAgenda(dataAgenda.cat1)
			createAgendaPage.enterTag()
			createAgendaPage.clickBtnCreateAgenda()
			createAgendaPage.modalsConfirmationSucces()
			cy.readFile(filename).then((object) => {
				agendaPage.searchAgenda(object.titleAgenda)
			})
			agendaPage.verifyNewData()
		})
	)

	qase(288,
		it('S28A2 - Create Agenda Online - Displays a confirmation message to save the agenda', () => {
			createAgendaPage.enterTitleAgenda(dataAgenda.titleAgenda)
			createAgendaPage.chooseTypeAgendaOnline(dataAgenda.valueOnline)
			createAgendaPage.enterLinkAgenda(dataAgenda.linkAgenda)
			createAgendaPage.checkBoxToday()
			createAgendaPage.startTime(dataAgenda.startTime)
			createAgendaPage.endTime(dataAgenda.endTime)
			createAgendaPage.categoryAgenda(dataAgenda.cat1)
			createAgendaPage.enterTag()
			createAgendaPage.clickBtnBack()
			createAgendaPage.clickBtnYesSave()
			createAgendaPage.modalsConfirmationSucces()
			cy.readFile(filename).then((object) => {
				agendaPage.searchAgenda(object.titleAgenda)
			})
			agendaPage.verifyNewData()
		})
	)

	qase(289,
		it('S28A2 - Create Agenda Online - Closes the confirmation message to save the agenda', () => {
			createAgendaPage.enterTitleAgenda(dataAgenda.titleAgenda)
			createAgendaPage.chooseTypeAgendaOnline(dataAgenda.valueOnline)
			createAgendaPage.enterLinkAgenda(dataAgenda.linkAgenda)
			createAgendaPage.enterDateAgenda()
			createAgendaPage.startTime(dataAgenda.startTime)
			createAgendaPage.endTime(dataAgenda.endTime)
			createAgendaPage.categoryAgenda(dataAgenda.cat1)
			createAgendaPage.enterTag()
			createAgendaPage.clickBtnBackAfterFilledData()
		})
	)

	qase(276,
		it('S28A2 - Create Agenda Online - Date < todays date', () => {
			createAgendaPage.enterTitleAgenda(dataAgenda.titleAgenda)
			createAgendaPage.chooseTypeAgendaOnline(dataAgenda.valueOnline)
			createAgendaPage.enterLinkAgenda(dataAgenda.linkAgenda)
			createAgendaPage.enterDateAgendaBeforeToday()
			createAgendaPage.startTime(dataAgenda.startTime)
			createAgendaPage.endTime(dataAgenda.endTime)
			createAgendaPage.categoryAgenda(dataAgenda.cat1)
			createAgendaPage.enterTag()
			createAgendaPage.clickBtnCreateAgenda()
			createAgendaPage.modalsConfirmationSucces()
			cy.readFile(filename).then((object) => {
				agendaPage.searchAgenda(object.titleAgenda)
			})
			agendaPage.verifyNewData()
		})
	)

	qase([275, 1497],
		it("S28A1 - Create Agenda Online - Start Time & End Time has passed", () => {
			createAgendaPage.enterTitleAgenda(dataAgenda.titleAgenda)
			createAgendaPage.chooseTypeAgendaOnline(dataAgenda.valueOnline)
			createAgendaPage.enterLinkAgenda(dataAgenda.linkAgenda)
			createAgendaPage.enterDateAgenda()
			createAgendaPage.startTime(dataAgenda.startTimeNegative)
			createAgendaPage.endTime(dataAgenda.endTimeNegative)
			createAgendaPage.categoryAgenda(dataAgenda.cat1)
			createAgendaPage.enterTag()
			createAgendaPage.clickBtnCreateAgenda()
			createAgendaPage.modalsConfirmationSucces()
			cy.readFile(filename).then((object) => {
				agendaPage.searchAgenda(object.titleAgenda)
			})
			agendaPage.verifyNewData()
		})
	)
})

describe('Preview Page Agenda', () => {
	qase([261, 247],
		it.only('S28A3 - Create Agenda Offline - Menampilkan Pratinjau Agenda', () => {
			createAgendaPage.enterTitleAgenda(dataAgenda.titleAgenda)
			createAgendaPage.chooseTypeAgendaOffline(dataAgenda.valueOffline)
			createAgendaPage.enterPlaceAgenda(dataAgenda.placeAgenda)
			createAgendaPage.enterDateAgenda()
			createAgendaPage.startTime(dataAgenda.startTime)
			createAgendaPage.endTime(dataAgenda.endTime)
			createAgendaPage.categoryAgenda(dataAgenda.cat1)
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
			agendaPage.clickBtnAksiPratinjau()
			createAgendaPage.modalsPratinjau()
		})
	)

	qase([359, 247],
		it.only('S28A3 - Create Agenda Online - Menampilkan Pratinjau Agenda', () => {
			createAgendaPage.enterTitleAgenda(dataAgenda.titleAgenda)
			createAgendaPage.chooseTypeAgendaOnline(dataAgenda.valueOnline)
			createAgendaPage.enterLinkAgenda(dataAgenda.linkAgenda)
			createAgendaPage.enterDateAgenda()
			createAgendaPage.startTime(dataAgenda.startTime)
			createAgendaPage.endTime(dataAgenda.endTime)
			createAgendaPage.categoryAgenda(dataAgenda.cat1)
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
			agendaPage.clickBtnAksiPratinjau()
			createAgendaPage.modalsPratinjau()
		})
	)
})
