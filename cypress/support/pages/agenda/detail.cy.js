import detail from "../../selectors/agenda/detail";
import { ListAgendaPage } from "./list.cy";

const listPage = new ListAgendaPage()

const filename = "cypress/fixtures/agenda/agenda_temp_data.json"

export class DetailAgendaPage {
    assertDetailPage() {
        const titleDetailPage = cy.xpath(detail.titleDetailPage)
        titleDetailPage.should('contain', ' Detail Agenda Jawa Barat ')
    }

    assertDetailContent() {
        cy.readFile(filename).then((object) => {
            const titleData = object.titleAgenda
            const categoryData = object.categoryAgenda
            const typeData = object.typeAgenda
            const startTimeData = object.startTime
            const endTimeData = object.endTime
            const placeData = object.placeAgenda
            const linkData = object.linkAgenda
            const aboutAgendaSection = cy.xpath(detail.aboutAgendaSection).as('aboutSection').as('tentangAgenda')

            // About Agenda Section
            aboutAgendaSection.should('contain', titleData)
                .and('contain', categoryData)

            // Date & Time Agenda Section
            const aboutDateTimeSection = cy.xpath(detail.aboutDateTimeSection).as('DateTimeDetail')
            aboutDateTimeSection.should('contain', startTimeData + ' sampai ' + endTimeData)

            // Place Agenda Section
            const aboutPlaceSection = cy.xpath(detail.aboutPlaceAgenda).as('placeDetail')
            if (object.typeAgenda == 'offline') {
                aboutPlaceSection.should('contain', typeData)
                aboutPlaceSection.should('contain', placeData)
            } else {
                aboutPlaceSection.should('contain', typeData)
                aboutPlaceSection.should('contain', linkData)
            }
        })
    }

    clickBtnBack() {
        const btnBack = cy.xpath(detail.btnKembali).as('btnBack')
        btnBack.should("be.visible")
        btnBack.should("contain", "Kembali")
        btnBack.click()
        listPage.assertAgendaPage()
    }

    clickBtnDelete() {
        const btnDelete = cy.xpath(detail.btnDelete).as('btnDelete')
        btnDelete.should("be.visible")
        btnDelete.should("contain", "Hapus")
        btnDelete.click()
    }

    deleteAction() {
        cy.readFile(filename).then((object) => {
            const titleData = object.titleAgenda

            // Click Btn Delete
            const btnDelete = cy.xpath(detail.btnDelete)
            btnDelete.should("be.visible")
            btnDelete.should("contain", "Hapus")
            btnDelete.click()

            // Assert Modals Delete
            const modalsDelete = cy.xpath(detail.modalsConfirmationDelete)
            modalsDelete.should('be.visible')
                .and('contain', 'Hapus Agenda')
                .and('contain', 'Apakah Anda yakin akan menghapus agenda ini? ')
            cy.xpath(detail.modalsTitleAgenda).should('contain', titleData)

            // Do Delete Action
            const btnYesDelete = cy.xpath(detail.btnYesDeleteModals)
            btnYesDelete.should("be.visible")
            btnYesDelete.should("contain", "Ya, saya yakin")
            btnYesDelete.click()
        })
    }

    cancelDeleteAction() {
        cy.readFile(filename).then((object) => {
            const titleData = object.titleAgenda

            // Click Btn Delete
            const btnDelete = cy.xpath(detail.btnDelete)
            btnDelete.should("be.visible")
            btnDelete.should("contain", "Hapus")
            btnDelete.click()

            // Assert Modals Delete
            const modalsDelete = cy.xpath(detail.modalsConfirmationDelete)
            modalsDelete.should('be.visible')
                .and('contain', 'Hapus Agenda')
                .and('contain', 'Apakah Anda yakin akan menghapus agenda ini? ')
            cy.xpath(detail.modalsTitleAgenda).should('contain', titleData)

            // Cancel Delete Action
            const btnCancelDelete = cy.xpath(detail.btnCancelDeleteModals)
            btnCancelDelete.should("be.visible")
            btnCancelDelete.should("contain", "Batal")
            btnCancelDelete.click()
            this.assertDetailPage()
        })
    }

    clickBtnPratinjau() {
        const btnPratinjau = cy.xpath(detail.btnPratinjau)
        btnPratinjau.should("be.visible")
        btnPratinjau.should("contain", "Pratinjau")
        btnPratinjau.click()
    }

    clickBtnUpdate() {
        const btnUpdate = cy.xpath(detail.btnUbahAgenda)
        btnUpdate.should("be.visible")
        btnUpdate.should("contain", "Ubah Agenda")
        btnUpdate.click()
    }
}