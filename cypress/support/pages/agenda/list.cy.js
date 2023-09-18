import list from "../../selectors/agenda/list"
import navbar from "../../selectors/navbar"
import sidebar from "../../selectors/sidebar"
import { UpdateAgendaPage } from "./update.cy"

const updatePage = new UpdateAgendaPage()
const filename = "cypress/fixtures/agenda/agenda_temp_data.json"
const dataUpdate = "cypress/fixtures/agenda/update_temp.json"

export class ListAgendaPage {
	assertAgendaPage() {
		const titleH1 = cy.get(navbar.titleH1)
		titleH1.should("contain", " Agenda Jawa Barat ")
		cy.url().should("eq", Cypress.env("base_url") + "/agenda")
	}

	assertNullDataTable() {
		const tbodyTable = cy.xpath(list.tbodyTableNull)
		tbodyTable.should('contain', 'Data tidak tersedia')
	}

	navigateToAgendaPage() {
		const agendaMenu = cy.get(sidebar.agendaMenu)
		agendaMenu.click()
		agendaMenu.should("contain", "Agenda").and("be.visible")

		this.assertAgendaPage()
	}

	clickBtnCreateAgenda() {
		const btnCreate = cy.get(list.btnCreateAgenda)

		btnCreate.should("be.visible").and("contain", "Tambah Agenda")
		btnCreate.click()

		cy.url().should("eq", Cypress.env("base_url") + "/agenda/tambah")
	}

	verifyNewData() {
		cy.readFile(filename).then((object) => {
			const title = object.titleAgenda
			const category = object.categoryAgenda
			const type = object.typeAgenda
			const startTime = object.startTime
			const endTime = object.endTime
			const verifyNewData = cy.xpath(list.newData)

			verifyNewData.should("contain", title)
				.and("contain", category)
				.and("contain", startTime + ' - ' + endTime)
				.and("contain", type)
		})
	}

	verifyNewDataUpdate() {
		cy.readFile(dataUpdate).then((object) => {
			const title = object.titleAgendaUpdate
			const category = object.categoryAgendaUpdate
			const type = object.typeAgendaUpdate
			const startTime = object.startTimeUpdate
			const endTime = object.endTimeUpdate
			const verifyNewData = cy.xpath(list.newData)

			verifyNewData.should("contain", title)
				.and("contain", category)
				.and("contain", startTime + ' - ' + endTime)
				.and("contain", type)
		})
	}

	searchAgenda(title) {
		cy.readFile(filename).then((object) => {
			// const title = object.titleAgenda
			const searchAgenda = cy.get(list.cariAgenda)
			searchAgenda.clear()
			searchAgenda.type(title).should('have.value', title.substring(0, 50));
			cy.wait(1000)
		})
	}

	assertCharacterSearch() {
		cy.readFile(filename).then((object) => {
			const title = object.titleAgenda
			const searchAgenda = cy.xpath(list.cariAgenda).as('characterValue')
			searchAgenda.should('have.value', title.substring(0, 50));
		})
	}

	clickBtnRemoveValueSearch() {
		const btnClear = cy.xpath(list.btnRemoveSearchValue)
		btnClear.click()

		const searchValue = cy.xpath(list.cariAgenda)
		searchValue.invoke('val').then((text) => {
			expect("").to.equal("");
		})
	}

	searchAgendaUpdate() {
		cy.readFile(dataUpdate).then((object) => {
			const title = object.titleAgendaUpdate
			const searchAgenda = cy.get(list.cariAgenda)
			searchAgenda.clear()
			searchAgenda.type(title)
		})
	}

	// Btn Aksi
	clickBtnAksi() {
		const btnAksi = cy.xpath(list.btnAksi)
		btnAksi.should("be.visible")
		btnAksi.should("contain", " Aksi ")
		btnAksi.click()

		const dropdownBtnAksi = cy.xpath(list.dropdownBtnAksi).as('dropdownBtnAksi')
		dropdownBtnAksi.should('be.visible')
	}

	clickBtnAksiPratinjau() {
		const btnPratinjau = cy.xpath(list.btnPratinjau).as('btnPratinjau')
		btnPratinjau.should("contain", " Pratinjau ")
		btnPratinjau.click({ force: true })
	}

	clickBtnAksiLihatDetail() {
		const btnDetail = cy.xpath(list.btnLihatDetail).as('btnLihatDetail')
		btnDetail.should("contain", " Lihat Detail ")
		btnDetail.click({ force: true })
	}

	clickBtnUpdate() {
		const btnUpdate = cy.xpath(list.btnUbah).as('btnAksiUbah')
		btnUpdate.should("contain", "Ubah")
		btnUpdate.click({ force: true })

		updatePage.assertUpdatePage()
	}

	clickBtnDelete() {
		const btnDelete = cy.xpath(list.btnDelete)
		btnDelete.should("contain", "Hapus")
		btnDelete.click({ force: true })
	}
	// End Btn Aksi

	goOffline() {
		const assertOffline = () => {
			return cy.wrap(window).its('navigator.onLine').should('be.false')
		}

		cy.log('**go offline**')
			.then(() => {
				Cypress.automation('remote:debugger:protocol',
					{
						command: 'Network.enable',
					})
			})
			.then(() => {
				Cypress.automation('remote:debugger:protocol',
					{
						command: 'Network.emulateNetworkConditions',
						params: {
							offline: true,
							latency: -1,
							downloadThroughput: -1,
							uploadThroughput: -1,
						},
					})
			})

		assertOffline()
	}

	goOnline() {
		const assertOnline = () => {
			return cy.wrap(window).its('navigator.onLine').should('be.true')
		}

		// disable offline mode, otherwise we will break our tests :)
		cy.log('**go online**')
			.then(() => {
				// https://chromedevtools.github.io/devtools-protocol/1-3/Network/#method-emulateNetworkConditions
				Cypress.automation('remote:debugger:protocol',
					{
						command: 'Network.emulateNetworkConditions',
						params: {
							offline: false,
							latency: -1,
							downloadThroughput: -1,
							uploadThroughput: -1,
						},
					})
			})
			.then(() => {
				Cypress.automation('remote:debugger:protocol',
					{
						command: 'Network.disable',
					})
			})

		assertOnline()
	}



}
