import { btnYesDelete } from "../../../selectors/agenda/deletes"
import navbar from "../../../selectors/navbar"
import create from "../../../selectors/profile_jabar/archives_document/create"
import { agendaMenu } from "../../../selectors/sidebar"
import { DeleteServicePage } from "../../service/service_list/delete.cy"

const deleteServicePage = new DeleteServicePage()
const dataArchivesDocument = "cypress/fixtures/profile_jabar/archives_document/data_archives_document.json"

export class CreateArchivesDocumentPage {
    assertCreatePage() {
        const titleH1 = cy.get(navbar.titleH1).as('titleMenu')
        titleH1.should("contain", "Tambah Arsip dan Dokumen")
        cy.url().should("eq", Cypress.env("base_url") + "/profil-jawa-barat/arsip-dan-dokumen/tambah")
    }

    // Input Data
    uploadArchiveDocument(file) {
        const upload = cy.get(create.fileUpload)
        upload.attachFile(file)
        cy.wait(2000)
    }

    inputTitleDocument(text) {
        const formInput = cy.get(create.titleDocument)
        cy.writeFile(dataArchivesDocument, { titleDocument: text })
        formInput.clear().type(text)
    }

    chooseCategoryTopic(valueCategory) {
        // Dropdown
        const dropdown = cy.get(create.dropdownCategory)
        dropdown.click()
        cy.wait(1000)

        // Choose Category
        const category = cy.contains(valueCategory)
        category.click()

        cy.readFile(dataArchivesDocument).then((object) => {
            object.categoryTopic = valueCategory
            cy.writeFile(dataArchivesDocument, object)
        })

        // Assertion Choose Option Category
        const value = cy.xpath("//input[@placeholder='Pilih Kategori/Topik']")
        value.invoke("val").then((text) => {
            if (text == "") {
                expect("").to.equal(text)
            } else {
                expect(valueCategory).to.equal(text)
            }
        })
    }

    inputDescDocument(text) {
        const textArea = cy.get(create.textareaDescDocument)

        cy.readFile(dataArchivesDocument).then((object) => {
            object.descDocument = text
            cy.writeFile(dataArchivesDocument, object)
        })

        textArea.clear().type(text)
    }

    inputCharacters(number) {
        var text = "";
        var possible = "ABCDEFGHIJK LMNOPQRSTUVWXYZa bcdefghijklmnopqrstuvwxyz";

        for (var i = 0; i < number; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }

    // Publish 
    clickBtnPublish() {
        const btn = cy.get(create.btnPublish)
        btn.then(($btn) => {
            if ($btn.is(":disabled")) {
                btn.should("be.disabled")
            } else {
                btn.should("be.visible")
                btn.contains("Terbitkan Arsip Dokumen")
                btn.click()
                cy.wait(1000)
                // Assertion Modals Confirmation
                const titleModals = cy.get(create.modalsTitle)
                titleModals.should('contain', 'Terbitkan Dokumen')

                const bodyModals = cy.get(create.modalsBody)
                bodyModals.should('contain', 'Apakah Anda ingin menerbitkan Dokumen ini?')
            }
        })
    }

    btnYesPublish() {
        const btn = cy.get(create.btnYesPublish)
        const assertion = "Terbit"

        btn.click()
        cy.wait(2000)

        // Assert Success Publish Data
        const titleSuccess = cy.get(create.modalsMessageTitle)
        titleSuccess.should('contain', 'Berhasil !')
        const messageSuccess = cy.get(create.modalsMessageBody)
        messageSuccess.should('contain', 'Anda berhasil menerbitkan Dokumen.')
        cy.readFile(dataArchivesDocument).then((object) => {
            object.status = assertion
            cy.writeFile(dataArchivesDocument, object)
        })
    }

    btnUnderstand() {
        deleteServicePage.clickBtnUnderstand()
    }
    // Publish

    // Save Draft
    btnSaveDraft() {
        const btn = cy.get(create.btnSaveDraft)
        btn.click()
        cy.wait(2000)

        // Assertion Modals Confirmation
        const titleModals = cy.get(create.modalsTitle)
        titleModals.should('contain', 'Simpan ke Draf')

        const bodyModals = cy.get(create.modalsBody)
        bodyModals.should('contain', 'Apakah Anda ingin menyimpan ke draf?')
    }

    btnYesSaveDraft() {
        const btn = cy.get(create.btnYesDraft)
        const assertion = "Draf"

        btn.click()
        cy.wait(2000)

        // Assert Success 
        const titleSuccess = cy.get(create.modalsMessageTitle)
        titleSuccess.should('contain', 'Berhasil disimpan ke draf !')
        const messageSuccess = cy.get(create.modalsMessageBody)
        messageSuccess.should('contain', 'Anda berhasil menyimpan dokumen ke draf.')

        cy.readFile(dataArchivesDocument).then((object) => {
            object.status = assertion
            cy.writeFile(dataArchivesDocument, object)
        })
    }
    // Save Draft

    clickBtnBack() {
        const btn = cy.get(create.btnBack)
        btn.click()

        // Assert
        const titleModals = cy.get(create.modalsTitle)
        titleModals.should('contain', 'Membatalkan Dokumen')

        const bodyModals = cy.get(create.modalsBody)
        bodyModals.should('contain', 'Apakah Anda yakin ingin membatalkan Dokumen ini?')
    }

    btnYesBack() {
        const btn = cy.get('[data-cy="archive-document-form__confirmation-button-cancel"]')
        btn.click()
        cy.url().should("eq", Cypress.env("base_url") + "/profil-jawa-barat/arsip-dan-dokumen")
    }
    // Input Data

    // Alert
    alertWrongUpload() {
        const alert = cy.get(create.alertWrongUpload)
        alert.should('contain', 'File yang anda pilih bukan gambar!')
    }

    alertFileOver5Mb() {
        const alert = cy.get(create.alertOver5mb)
        alert.should('contain', 'File yang anda masukan melebihi size batas maksimal!')
    }

    alertWrongExtensionFile() {
        const alert = cy.get(create.alertOver5mb)
        alert.should('contain', 'Format file tidak didukung, format yang didukung hanya doc, docx, xls, xlsx, pdf')
    }

    alertTextLimit() {
        const alert = cy.get(create.alertText50)
        alert.should('contain', 'Teks yang anda masukkan lebih dari 50 karakter')
    }

    alertTextTitleMax() {
        const alert = cy.get(create.alertMaxTitle)
        alert.should('contain', 'Teks yang anda masukkan lebih dari 150 karakter')
    }

    alertMandatoryTitle() {
        const alert = cy.get(create.alertMandatoryTitle)
        alert.should('contain', 'Field ini wajib diisi!')
    }

    alertMandatoryCategory() {
        const alert = cy.get(create.alertMandatoryCategory)
        alert.should('contain', 'Field ini wajib diisi!')
    }

    alertMandatoryDesc() {
        const alert = cy.get(create.alertMandatoryDesc)
        alert.should('contain', 'Field ini wajib diisi!')
    }
}