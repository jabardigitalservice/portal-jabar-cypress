import deletes from "../../selectors/agenda/deletes";
import { ListAgendaPage } from "./list.cy";

const listPage = new ListAgendaPage()
const filename = "cypress/fixtures/agenda/agenda_temp_data.json"

export class DeleteAgendaPage {
    modalsConfirmationDelete() {
        const modalsConfirmation = cy.get(deletes.modalsConfirmationDelete)

        cy.readFile(filename).then((object) => {
            const titleData = object.titleAgenda

            modalsConfirmation.should('be.visible')
                .and('contain', 'Hapus Agenda')
                .and('contain', 'Apakah Anda yakin akan menghapus agenda ini?')
                .and('contain', titleData)
        })
        cy.wait(2000)
    }

    clickBtnYesDelete() {
        const btnYesDelete = cy.get(deletes.btnYesDelete)
        btnYesDelete.should("be.visible")
        btnYesDelete.should("contain", "Ya, saya yakin")
        btnYesDelete.click()

        listPage.assertAgendaPage()
    }

    clickBtnCancelDelete() {
        const btnCancelDelete = cy.get(deletes.btnCancelDelete)
        btnCancelDelete.should("be.visible")
        btnCancelDelete.should("contain", "Batal")
        btnCancelDelete.click()
    }
}