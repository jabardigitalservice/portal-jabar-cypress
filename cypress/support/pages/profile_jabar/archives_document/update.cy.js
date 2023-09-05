import navbar from "../../../selectors/navbar"
import update from "../../../selectors/profile_jabar/archives_document/update"
import create from "../../../selectors/profile_jabar/archives_document/create"
import { CreateArchivesDocumentPage } from "./create.cy"

let createArchiveDocsPage = new CreateArchivesDocumentPage()
const dataArchivesDocument = "cypress/fixtures/profile_jabar/archives_document/data_archives_document.json"

export class UpdatePage {
    assertUpdateArchiveDocsPage() {
        const titleH1 = cy.get(navbar.titleH1)
        titleH1.should("contain", "Ubah Arsip dan Dokumen")
    }

    assertUpdateData() {
        cy.readFile(dataArchivesDocument).then((object) => {
            const title = cy.get(create.titleDocument)
            const category = cy.xpath("//input[@placeholder='Pilih Kategori/Topik']")
            const desc = cy.get(create.textareaDescDocument)

            // Assertion Data Form Update
            title.invoke("val").then((text) => {
                expect(object.titleDocument).to.equal(text)
            })

            category.invoke("val").then((text) => {
                expect(object.categoryTopic).to.equal(text)
            })

            desc.invoke("val").then((text) => {
                expect(object.descDocument).to.equal(text)
            })
        })
    }

    removeDocs() {
        const btn = cy.get(update.btnRemoveDocs)
        btn.click()
        cy.wait(2000)

        // Assertion
        const alert = cy.get('.w-fit')
        alert.should('contain', 'Berhasil menghapus dokumen')
    }

    uploadArchiveDocument(file) {
        createArchiveDocsPage.uploadArchiveDocument(file)
        cy.wait(1000)

        // Assertion
        const successMessage = cy.xpath(update.successUploadMessage)
        successMessage.should('contain', 'Dokumen berhasil diupload')
    }

    inputTitleDocument(text) {
        createArchiveDocsPage.inputTitleDocument(text)
    }

    chooseCategoryTopic(valueCategory) {
        createArchiveDocsPage.chooseCategoryTopic(valueCategory)
    }

    inputDescDocument(text) {
        createArchiveDocsPage.inputDescDocument(text)
    }

    clickBtnSaveChanges() {
        const btn = cy.get(update.btnSaveChanges)
        btn.click()
        cy.wait(1000)

        // Assertion Modals Confirmation
        const titleModals = cy.get(create.modalsTitle)
        titleModals.should('contain', 'Simpan Perubahan')

        const bodyModals = cy.get(create.modalsBody)
        bodyModals.should('contain', 'Apakah Anda ingin menyimpan data perubahan?')
    }

    btnYesSaveModalsConfirmation() {
        const btn = cy.get('[data-cy="archive-document-form__confirmation-button-save"]')
        btn.click()
        cy.wait(2000)

        // Assert Success Save Data
        const respons = cy.get(create.modalsMessageTitle)
        respons.should('contain', 'Berhasil disimpan !')
        const modals = cy.get(create.modalsMessageBody)
        modals.should('contain', 'Dokumen Anda berhasil disimpan.')
    }

    btnUnderstand() {
        createArchiveDocsPage.btnUnderstand()
    }
}