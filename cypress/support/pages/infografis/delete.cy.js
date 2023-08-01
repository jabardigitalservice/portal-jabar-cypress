import deletes from "../../selectors/landing_page/infografis/deletes"
const dataInfographics = "cypress/fixtures/landing_page/infographics/data_infographics.json"

export class DeleteInfographicsPage {
    modalsConfirmationDelete() {
        const modalsConfirmation = cy.xpath(deletes.modalsConfirmationDelete)

        cy.readFile(dataInfographics).then((object) => {
            const title = object.titleBanner
            modalsConfirmation.should('be.visible')
                .and('contain', 'Hapus Banner!')
                .and('contain', 'Apakah Anda yakin ingin menghapus banner infografis ini?')
                .and('contain', title)
        })
    }

    clickBtnYesDelete() {
        const btnYesDelete = cy.xpath(deletes.btnYesDelete)
        btnYesDelete.should("be.visible")
        btnYesDelete.should("contain", "Ya, saya yakin")
        btnYesDelete.click()
        cy.wait(2000)

        // listPage.assertServicePage()
    }

    clickBtnCancelDelete() {
        const btnCancelDelete = cy.xpath(deletes.btnCancelDelete)
        btnCancelDelete.should("be.visible")
        btnCancelDelete.should("contain", "Batal")
        btnCancelDelete.click()
    }

    clickBtnUnderstand() {
        const btn = cy.contains(deletes.btnUnderstand)

        // Assertion Delete Success
        const modalsConfirmation = cy.xpath(deletes.modalsConfirmationDelete)
        cy.readFile(dataInfographics).then((object) => {
            const title = object.titleBanner
            modalsConfirmation.should('be.visible')
                .and('contain', 'Berhasil dihapus!')
                .and('contain', title + " berhasil hapus")
        })

        btn.should("be.visible")
        btn.should("contain", "Saya Mengerti")
        btn.click()
    }
}