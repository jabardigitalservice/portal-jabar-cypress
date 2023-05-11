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
})

describe("Agenda Negative Scenario", () => {
	qase(1498,
		it("S28A1 - Create Agenda Offline - End Time < Start Time", () => {
			agendaPage.navigateToAgendaPage()
			agendaPage.clickBtnCreateAgenda()
			createAgendaPage.navigateToCreateAgendaPage()
			createAgendaPage.enterTitleAgenda(dataAgenda.titleAgenda)
			createAgendaPage.chooseTypeAgendaOffline(dataAgenda.valueOffline)
			createAgendaPage.enterPlaceAgenda(dataAgenda.placeAgenda)
			createAgendaPage.enterDateAgenda()
			createAgendaPage.startTime(dataAgenda.endTime)
			createAgendaPage.endTime(dataAgenda.startTime)
			createAgendaPage.categoryAgendaGubernur()
			createAgendaPage.enterTag()
			createAgendaPage.clickBtnCreateAgenda()
			createAgendaPage.alertTimeNotValid()
		})
	)

	qase(262,
		it("S28A1 - Create Agenda Offline - There is an empty field", () => {
			agendaPage.navigateToAgendaPage()
			agendaPage.clickBtnCreateAgenda()
			createAgendaPage.navigateToCreateAgendaPage()
			createAgendaPage.chooseTypeAgendaOffline(dataAgenda.valueOffline)
			createAgendaPage.enterPlaceAgenda(dataAgenda.placeAgenda)
			createAgendaPage.enterDateAgenda()
			createAgendaPage.startTime(dataAgenda.startTime)
			createAgendaPage.endTime(dataAgenda.endTime)
			createAgendaPage.categoryAgendaGubernur()
			createAgendaPage.enterTag()
			createAgendaPage.clickBtnCreateAgenda()
		})
	)

	qase(284,
		it("S28A1 - Create Agenda Offline - All fields are emptied", () => {
			agendaPage.navigateToAgendaPage()
			agendaPage.clickBtnCreateAgenda()
			createAgendaPage.clickBtnCreateAgenda()
		})
	)

	qase(1499,
		it("S28A1 - Create Agenda Offline - All Fields Filled - Cancel Create Agenda", () => {
			agendaPage.navigateToAgendaPage()
			agendaPage.clickBtnCreateAgenda()
			createAgendaPage.navigateToCreateAgendaPage()
			createAgendaPage.enterTitleAgenda(dataAgenda.titleAgenda)
			createAgendaPage.chooseTypeAgendaOffline(dataAgenda.valueOffline)
			createAgendaPage.enterPlaceAgenda(dataAgenda.placeAgenda)
			createAgendaPage.enterDateAgenda()
			createAgendaPage.startTime(dataAgenda.startTime)
			createAgendaPage.endTime(dataAgenda.endTime)
			createAgendaPage.categoryAgendaGubernur()
			createAgendaPage.enterTag()
			createAgendaPage.clickBtnBackAfterFilledData()
		})
	)

	qase(277,
		it('S28A2 - Create Agenda Online - End Time < Start Time', () => {
			agendaPage.navigateToAgendaPage()
			agendaPage.clickBtnCreateAgenda()
			createAgendaPage.navigateToCreateAgendaPage()
			createAgendaPage.enterTitleAgenda(dataAgenda.titleAgenda)
			createAgendaPage.chooseTypeAgendaOnline(dataAgenda.valueOnline)
			createAgendaPage.enterLinkAgenda(dataAgenda.linkAgenda)
			createAgendaPage.enterDateAgenda()
			createAgendaPage.startTime(dataAgenda.endTime)
			createAgendaPage.endTime(dataAgenda.startTime)
			createAgendaPage.categoryAgendaGubernur()
			createAgendaPage.enterTag()
			createAgendaPage.clickBtnCreateAgenda()
			createAgendaPage.alertTimeNotValid()
		})
	)

	qase(270,
		it('S28A2 - Create Agenda Online - There is an empty field', () => {
			agendaPage.navigateToAgendaPage()
			agendaPage.clickBtnCreateAgenda()
			createAgendaPage.navigateToCreateAgendaPage()
			createAgendaPage.chooseTypeAgendaOnline(dataAgenda.valueOnline)
			createAgendaPage.enterLinkAgenda(dataAgenda.linkAgenda)
			createAgendaPage.enterDateAgenda()
			createAgendaPage.startTime(dataAgenda.startTime)
			createAgendaPage.endTime(dataAgenda.endTime)
			createAgendaPage.categoryAgendaGubernur()
			createAgendaPage.enterTag()
			createAgendaPage.clickBtnCreateAgenda()
		})
	)

	qase(287,
		it('S28A2 - Create Agenda Online - All fields are emptied', () => {
			agendaPage.navigateToAgendaPage()
			agendaPage.clickBtnCreateAgenda()
			createAgendaPage.clickBtnCreateAgenda()
		})
	)

	qase(290,
		it('S28A1 - Create Agenda Online - All Fields Filled - Cancel Create Agenda', () => {
			agendaPage.navigateToAgendaPage()
			agendaPage.clickBtnCreateAgenda()
			createAgendaPage.navigateToCreateAgendaPage()
			createAgendaPage.enterTitleAgenda(dataAgenda.titleAgenda)
			createAgendaPage.chooseTypeAgendaOnline(dataAgenda.valueOnline)
			createAgendaPage.enterLinkAgenda(dataAgenda.linkAgenda)
			createAgendaPage.enterDateAgenda()
			createAgendaPage.startTime(dataAgenda.startTime)
			createAgendaPage.endTime(dataAgenda.endTime)
			createAgendaPage.categoryAgendaGubernur()
			createAgendaPage.enterTag()
			createAgendaPage.clickBtnBackAfterFilledData()
		})
	)
})
