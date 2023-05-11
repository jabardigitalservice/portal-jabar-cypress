import deletes from "../../../selectors/agenda/deletes";
import { ListServicePage } from "./list.cy";

const listPage = new ListServicePage()
const filename = "cypress/fixtures/service/wizard1_temp_data.json"

export class DeleteServicePage {
    modalsConfirmationDelete() {
        const modalsConfirmation = cy.xpath(deletes.modalsConfirmationDelete)

        cy.readFile(filename).then((object) => {
            const titleData = object.namaLayanan

            // modalsConfirmation.should('be.visible')
            //     .and('contain', 'Hapus Layanan')
            //     .and('contain', 'Apakah Anda yakin ingin menghapus Layanan ini?')
            //     .and('contain', titleData)
        })
    }

    clickBtnYesDelete() {
        const btnYesDelete = cy.xpath(deletes.btnYesDelete)
        btnYesDelete.should("be.visible")
        btnYesDelete.should("contain", "Ya, saya yakin")
        btnYesDelete.click()

        listPage.assertServicePage()
    }

    clickBtnCancelDelete() {
        const btnCancelDelete = cy.xpath(deletes.btnCancelDelete)
        btnCancelDelete.should("be.visible")
        btnCancelDelete.should("contain", "Batal")
        btnCancelDelete.click()
    }

    clickBtnUnderstand() {
        const btn = cy.contains(deletes.btnUnderstand)
        btn.should("be.visible")
        btn.should("contain", "Saya Mengerti")
        btn.click()
    }


}