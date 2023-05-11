import navbar from "../../selectors/navbar"
import create_agenda, { linkAgenda } from "../../selectors/agenda/create_agenda"

const filename = "cypress/fixtures/agenda/agenda_temp_data.json"

export class CreateAgendaPage {
	navigateToCreateAgendaPage() {
		const titleH1 = cy.get(navbar.titleH1)

		titleH1.should("contain", " Tambah Agenda Baru ")
		cy.url().should("eq", Cypress.env("base_url") + "/agenda/tambah")
	}

	enterTitleAgenda(title) {
		const titleAgenda = cy.xpath(create_agenda.titleAgenda)
		const uuid = () => Cypress._.random(0, 1e4)
		const id = uuid()
		const titleText = title + ` ${id}`

		titleAgenda.clear()
		cy.writeFile(filename, { titleAgenda: titleText })
		titleAgenda.type(titleText)
	}

	chooseTypeAgendaOffline(offlineValue) {
		const typeAgendaOffline = cy.get(create_agenda.typeEvent)
		const valueAssertion = "offline"

		typeAgendaOffline.check(offlineValue).should("be.checked").and("have.value", offlineValue)

		cy.readFile(filename).then((object) => {
			object.typeAgenda = valueAssertion
			cy.writeFile(filename, object)
		})
	}

	chooseTypeAgendaOnline(onlineValue) {
		const typeAgendaOnline = cy.get(create_agenda.typeEvent)
		const valueAssertion = "online"

		typeAgendaOnline.check(onlineValue).should("be.checked").and("have.value", onlineValue)

		cy.readFile(filename).then((object) => {
			object.typeAgenda = valueAssertion
			cy.writeFile(filename, object)
		})
	}

	enterPlaceAgenda(textPlaceAgenda) {
		const placeAgenda = cy.xpath(create_agenda.placeAgenda)

		placeAgenda.clear()
		cy.readFile(filename).then((object) => {
			object.placeAgenda = textPlaceAgenda
			cy.writeFile(filename, object)
		})
		placeAgenda.type(textPlaceAgenda)
	}

	enterLinkAgenda(link) {
		const linkAgenda = cy.xpath(create_agenda.linkAgenda)

		linkAgenda.clear()
		cy.readFile(filename).then((object) => {
			object.linkAgenda = link
			cy.writeFile(filename, object)
		})
		linkAgenda.type(link)
	}

	checkBoxToday() {
		const dayjs = require("dayjs")
		const today = cy.get(create_agenda.checkboxToday)

		// Assertion Today
		const formDate = cy.get(create_agenda.chooseDate)
		formDate.invoke("val").then((text) => {
			expect(dayjs().format("DD/MM/YYYY")).to.equal(text)
		})
		today.should("be.checked")
	}

	enterDateAgenda() {
		const date = cy.get(create_agenda.chooseDate)
		date.click()
		cy.xpath(create_agenda.calendarShow).should("be.visible")

		// Choose Date
		const date28 = cy.xpath(create_agenda.date28)
		date28.click()

		// Assertion Value Date
	}

	enterDateAgendaBeforeToday() {
		const date = cy.get(create_agenda.chooseDate)
		date.click()
		cy.xpath(create_agenda.calendarShow).should("be.visible")

		// Choose Date
		const date01 = cy.xpath(create_agenda.date01)
		date01.click()

		// Assertion Value Date
	}

	startTime(time) {
		const startTime = cy.get(create_agenda.startTime)

		startTime.clear()
		cy.readFile(filename).then((object) => {
			const assertsStartTime = '14:00:00'

			object.startTime = time
			object.startTimeAssert = assertsStartTime
			cy.writeFile(filename, object)
		})
		startTime.type(time)
	}

	endTime(time) {
		const endTime = cy.get(create_agenda.endTime)

		endTime.clear()
		cy.readFile(filename).then((object) => {
			const assertsEndTime = '15:00:00'

			object.endTime = time
			object.endTimeAssert = assertsEndTime
			cy.writeFile(filename, object)
		})
		endTime.type(time)
	}

	categoryAgendaGubernur() {
		// Open Dropdown Option
		const dropdownCategory = cy.xpath(create_agenda.dropdownCategory)
		const valueAssertion = "Gubernur"
		dropdownCategory.click()
		cy.xpath(create_agenda.dropdown).should("be.visible")

		// Choose Gubernur Category
		const categoryGub = cy.get(create_agenda.gubernur)
		categoryGub.click()

		cy.readFile(filename).then((object) => {
			object.categoryAgenda = valueAssertion
			cy.writeFile(filename, object)
		})

		// Assertion Choose Option Gubernur Category
		dropdownCategory.invoke("val").then((text) => {
			expect("Gubernur").to.equal(text)
		})
	}

	enterTag() {
		let tagData = "cypress/fixtures/agenda/agenda_data.json"
		let formInputTag = cy.get(create_agenda.tag)

		cy.readFile(tagData).then((object) => {
			const dataTag = [
				{
					tag: object.tagAgenda1,
				},
				{
					tag: object.tagAgenda2,
				},
				{
					tag: object.tagAgenda3,
				},
			]

			dataTag.forEach(({ tag }) => {
				formInputTag.type(tag + "{enter}")
			})
		})
	}

	clickBtnCreateAgenda() {
		const btnCreate = cy.xpath(create_agenda.btnCreateAgenda)

		btnCreate.then(($btn) => {
			if ($btn.is(":disabled")) {
				btnCreate.should("be.disabled").and("contain", "Tambah Agenda")
			} else {
				btnCreate.should("be.visible")
				btnCreate.contains("Tambah Agenda")
				btnCreate.click()
			}
		})

		// btnCreate.should('be.visible')
		//     .and('contain', 'Tambah Agenda')
		// btnCreate.click()
	}

	modalsConfirmationSucces() {
		const messageSuccess = cy.xpath(create_agenda.messageTextSucces)
		messageSuccess.should("contain", " Tambah Agenda Berhasil ")

		const btnMengerti = cy.xpath(create_agenda.btnMengerti)
		btnMengerti.should("be.visible").and("contain", " Saya Mengerti ")
		btnMengerti.click()

		cy.url().should("eq", Cypress.env("base_url") + "/agenda")
	}

	alertTimeNotValid() {
		const alertTime = cy.xpath(create_agenda.alertTimeNotValid)

		alertTime.should("be.visible").and("contain", " Waktu pelaksanaan tidak valid ")
	}

	// Modals Confirmation Back Button 
	clickBtnBackAfterFilledData() {
		const btnBack = cy.xpath(create_agenda.btnBack)

		// Click Btn Back
		btnBack.should("contain", " Kembali ")
		btnBack.click()

		// Modals Show
		const modalsAlert = cy.xpath(create_agenda.modalsConfirmationBack)
		modalsAlert.should("be.visible").and("contain", "Apakah Anda ingin menyimpan agenda ini terlebih dahulu?")

		// CLick Btn Not Save
		const btnNoSaveAgenda = cy.xpath(create_agenda.btnNoSaveAgenda)
		btnNoSaveAgenda.should("be.visible")
		btnNoSaveAgenda.should("contain", " Tidak perlu simpan ")
		btnNoSaveAgenda.click()

		cy.url().should("eq", Cypress.env("base_url") + "/agenda")
	}

	clickBtnBack() {
		const btnBack = cy.xpath(create_agenda.btnBack)
		btnBack.should("be.visible")
		btnBack.contains("Kembali")
		btnBack.click()

		// Modals Show
		const modalsAlert = cy.xpath(create_agenda.modalsConfirmationBack)
		modalsAlert.should("be.visible").and("contain", "Apakah Anda ingin menyimpan agenda ini terlebih dahulu?")
	}

	clickBtnYesSave() {
		const btnYesSaveAgenda = cy.xpath(create_agenda.btnYesSaveAgenda)
		btnYesSaveAgenda.should("be.visible")
		btnYesSaveAgenda.should("contain", " Ya, simpan agenda ")
		btnYesSaveAgenda.click()
	}
	// Modals Confirmation Back Button

	clickBtnPratinjau() {
		const btnPratinjau = cy.xpath(create_agenda.btnPratinjau)
		btnPratinjau.should("be.visible")
		btnPratinjau.should("contain", " Pratinjau ")
		btnPratinjau.click()
	}

	modalsPratinjau() {
		// Verify Modals is Visible
		const modals = cy.xpath(create_agenda.modalsPratinjau)
		modals.should('be.visible')

		// Verify Value Data
		cy.readFile(filename).then((object) => {
			const titleData = object.titleAgenda
			const categoryData = object.categoryAgenda
			const typeData = object.typeAgenda
			const startTimeData = object.startTime
			const endTimeData = object.endTime
			const placeData = object.placeAgenda
			const linkData = object.linkAgenda
			const content = cy.xpath(create_agenda.contentPratinjau)

			content.should('contain', titleData)
				.and('contain', categoryData)
				.and('contain', typeData)
				.and('contain', startTimeData + ' sampai ' + endTimeData + ' WIB')
			if (object.typeAgenda == 'offline') {
				content.should('contain', placeData)
			} else {
				content.should('contain', linkData)
			}
		})

		// Close Button Modals
		const btnClose = cy.xpath(create_agenda.btnClosePratinjauModals)

		btnClose.should("be.visible")
		btnClose.should("contain", "Tutup")
		btnClose.click()
	}
}
