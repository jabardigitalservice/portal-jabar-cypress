import navbar from "../../selectors/navbar"
import update from "../../selectors/agenda/update"
import create_agenda from "../../selectors/agenda/create_agenda"
import { CreateAgendaPage } from "./create.cy"

const createAgendaPage = new CreateAgendaPage()
const filename = "cypress/fixtures/agenda/update_temp.json"
const dataCreate = "cypress/fixtures/agenda/agenda_temp_data.json"

export class UpdateAgendaPage {
    assertUpdatePage() {
        const titleH1 = cy.get(navbar.titleH1)
        titleH1.should("contain", "Ubah Agenda")
    }

    clickBtnPratinjau() {
        createAgendaPage.clickBtnPratinjau()
    }

    clickBtnBack() {
        createAgendaPage.clickBtnBack()
    }

    clickBtnSaveChanges() {
        const btnSaveChanges = cy.get(update.btnSaveChange)

        btnSaveChanges.then(($btn) => {
            if ($btn.is(":disabled")) {
                btnSaveChanges.should("be.disabled").and("contain", "Simpan Perubahan")
            } else {
                btnSaveChanges.should("be.visible")
                btnSaveChanges.contains("Simpan Perubahan")
                btnSaveChanges.click()
            }
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

    modalsConfirmationSuccesUpdate() {
        // Verify Modals is Visible
        const modals = cy.xpath(update.modals).as('modals')
        modals.should('be.visible')
            .and('contain', 'Simpan Agenda Berhasil')

        // Action Button
        const btnMengerti = cy.xpath(update.btnMengerti)
        btnMengerti.should("be.visible").and("contain", " Saya Mengerti ")
        btnMengerti.click()

        cy.url().should("eq", Cypress.env("base_url") + "/agenda")
    }

    clickBtnYesSave() {
        createAgendaPage.clickBtnYesSave()
    }

    clickBtnNotSaved() {
        const btnNotSaved = cy.xpath(update.btnNotSaved).as('btnNotSaved')
        btnNotSaved.should("be.visible")
        btnNotSaved.contains("Tidak perlu simpan")
        btnNotSaved.click()

        cy.url().should("eq", Cypress.env("base_url") + "/agenda")
    }

    modalsConfirmationSucces() {
        createAgendaPage.modalsConfirmationSucces()
    }

    enterTitleAgenda(title) {
        const titleAgenda = cy.get(create_agenda.titleAgenda).find('input')
        const uuid = () => Cypress._.random(0, 1e4)
        const id = uuid()
        const titleText = title + ` ${id}`

        titleAgenda.clear()
        cy.writeFile(filename, { titleAgendaUpdate: titleText })
        titleAgenda.type(titleText)
    }

    chooseTypeAgendaOffline(offlineValue) {
        const typeAgendaOffline = cy.get(create_agenda.typeEvent).find('input')
        const valueAssertion = "offline"

        typeAgendaOffline.check(offlineValue).should("be.checked").and("have.value", offlineValue)

        cy.readFile(filename).then((object) => {
            object.typeAgendaUpdate = valueAssertion
            cy.writeFile(filename, object)
        })
    }

    chooseTypeAgendaOnline(onlineValue) {
        const typeAgendaOnline = cy.get(create_agenda.typeEvent).find('input')
        const valueAssertion = "online"

        typeAgendaOnline.check(onlineValue).should("be.checked").and("have.value", onlineValue)

        cy.readFile(filename).then((object) => {
            object.typeAgendaUpdate = valueAssertion
            cy.writeFile(filename, object)
        })
    }

    enterPlaceAgenda(textPlaceAgenda) {
        const placeAgenda = cy.get(create_agenda.placeAgenda)

        placeAgenda.clear()
        cy.readFile(filename).then((object) => {
            object.placeAgendaUpdate = textPlaceAgenda
            cy.writeFile(filename, object)
        })
        placeAgenda.type(textPlaceAgenda)
    }

    enterLinkAgenda(link) {
        const linkAgenda = cy.get(create_agenda.linkAgenda).find('input')

        linkAgenda.clear()
        cy.readFile(filename).then((object) => {
            object.linkAgendaUpdate = link
            cy.writeFile(filename, object)
        })
        linkAgenda.type(link)
    }

    startTime(time) {
        const startTime = cy.get(create_agenda.startTime)

        startTime.clear()
        cy.readFile(filename).then((object) => {
            const assertsStartTime = '14:00:00'

            object.startTimeUpdate = time
            object.startTimeAssertUpdate = assertsStartTime
            cy.writeFile(filename, object)
        })
        startTime.type(time)
    }

    endTime(time) {
        const endTime = cy.get(create_agenda.endTime)

        endTime.clear()
        cy.readFile(filename).then((object) => {
            const assertsEndTime = '15:00:00'

            object.endTimeUpdate = time
            object.endTimeAssertUpdate = assertsEndTime
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
            object.categoryAgendaUpdate = valueAssertion
            cy.writeFile(filename, object)
        })

        // Assertion Choose Option Gubernur Category
        dropdownCategory.invoke("val").then((text) => {
            expect("Gubernur").to.equal(text)
        })
    }

    categoryAgendaWakilGubernur() {
        // Open Dropdown Option
        const dropdownCategory = cy.xpath(create_agenda.dropdownCategory)
        const valueAssertion = "Wakil Gubernur"
        dropdownCategory.click()
        cy.xpath(create_agenda.dropdown).should("be.visible")

        // Choose Wakil Gubernur Category
        const categoryWagub = cy.get(create_agenda.wakilGubernur)
        categoryWagub.click()

        cy.readFile(filename).then((object) => {
            object.categoryAgendaUpdate = valueAssertion
            cy.writeFile(filename, object)
        })

        // Assertion Choose Option Gubernur Category
        dropdownCategory.invoke("val").then((text) => {
            expect("Wakil Gubernur").to.equal(text)
        })
    }

    enterTag() {
        let tagData = "cypress/fixtures/agenda/agenda_data.json"
        let formInputTag = cy.get(update.tag)

        cy.readFile(tagData).then((object) => {
            const dataTag = [
                {
                    tag: object.tagAgendaUpdate1,
                },
                {
                    tag: object.tagAgendaUpdate2,
                },
            ]

            dataTag.forEach(({ tag }) => {
                formInputTag.type(tag + "{enter}")
            })
        })
    }

    verifyDataUpdatePage() {
        cy.readFile(dataCreate).then((object) => {
            const titleData = object.titleAgenda
            const categoryData = object.categoryAgenda
            const typeData = object.typeAgenda
            const startTimeData = object.startTime
            const startTimeAssert = object.startTimeAssert
            const endTimeData = object.endTime
            const endTimeAssert = object.endTimeAssert
            const placeData = object.placeAgenda
            const linkData = object.linkAgenda

            // Verify Title
            const titleAgenda = cy.get(update.titleAgenda).find('input').as('valueTitle')
            titleAgenda.invoke('val').then((text) => {
                expect(titleData).to.equal(text)
            })

            // Verify Type Agenda
            if (typeData == 'offline') {
                // Verify Place
                const placeAgenda = cy.get(update.placeAgenda).find('input').as('valuePlace')
                placeAgenda.invoke('val').then((text) => {
                    expect(placeData).to.equal(text)
                })
            } else {
                // Verify Link
                const linkAgenda = cy.get(update.linkAgenda).find('input').as('valueLink')
                linkAgenda.invoke('val').then((text) => {
                    expect(linkData).to.equal(text)
                })
            }

            // Verify Date
            // const date = cy.get(update.chooseDate)
            // date.invoke('val').then((text) => {
            //     expect(linkData).to.equal(text)
            // })

            // Verify Start Time
            const startTime = cy.get(update.startTime).as('valueStartTime')
            startTime.invoke('val').then((text) => {
                expect(startTimeAssert).to.equal(text)
            })

            // Verify End Time
            const endTime = cy.get(update.endTime).as('valueEndTime')
            endTime.invoke('val').then((text) => {
                expect(endTimeAssert).to.equal(text)
            })

            // Verify Category Agenda
            const categoryAgenda = cy.xpath(update.dropdownCategory).as('valueDropdown')
            categoryAgenda.invoke('val').then((text) => {
                expect(categoryData).to.equal(text)
            })

            // Verify Tag
            // const boxTag = cy.xpath(update.boxTag)
            // boxTag.should('contain')
        })
    }

    alertLinkNotValid() {
        const alertLink = cy.get(update.alertLinkNotValid).as('alertLink')
        alertLink.should('be.visible').and('contain', 'Link kegiatan tidak valid')
    }
}