import navbar from "../../selectors/navbar"
import create from "../../selectors/landing_page/infografis/create"
import { DeleteServicePage } from "../service/service_list/delete.cy"

const deleteServicePage = new DeleteServicePage()
const dataInfographics = "cypress/fixtures/landing_page/infographics/data_infographics.json"

export class CreateInfograficBannerPage {
    assertCreateInfograficPage() {
        const titleH1 = cy.get(navbar.titleH1).as('titleMenu')
        titleH1.should("contain", "Landing Page")
        cy.url().should("eq", Cypress.env("base_url") + "/landing-page/infographics-banner/tambah")
    }

    // Input Data
    uploadImgDesktop(file) {
        const upload = cy.xpath(create.uploadImgDesktop)
        upload.attachFile(file)
        cy.wait(2000)
    }

    uploadImgMobile(file) {
        const upload = cy.xpath(create.uploadImgMobile)
        upload.attachFile(file)
        cy.wait(2000)
    }

    inputTitleBanner(text) {
        const formInput = cy.xpath(create.titleBanner)
        cy.writeFile(dataInfographics, { titleBanner: text })
        formInput.clear().type(text)
    }

    activeToogleLink() {
        cy.get("section:nth-of-type(3) > div span").click();
    }

    inputLinkRedirect(link) {
        cy.readFile(dataInfographics).then((object) => {
            object.linkRedirect = link
            cy.writeFile(dataInfographics, object)
        })
        cy.get("section:nth-of-type(3) > span:nth-of-type(2) input").clear().type(link);
    }

    clickBtnSaveData() {
        const btn = cy.contains('Simpan Data')
        btn.then(($btn) => {
            if ($btn.is(":disabled")) {
                btn.should("be.disabled")
            } else {
                btn.should("be.visible")
                btn.contains("Simpan Data")
                btn.click()
                cy.wait(1000)
                // Assertion Modals Confirmation
                const modals = cy.get('.overflow-y-auto > .w-full > .flex > .text-sm')
                modals.should('contain', 'Apakah Anda ingin menyimpan banner ini terlebih dahulu?')
            }
        })
    }

    btnYesSaveModalsConfirmation() {
        const btn = cy.contains('Ya, simpan banner')
        btn.click()
        cy.wait(2000)

        // Assert Success Save Data
        const respons = cy.get('.animate-slide-up > .overflow-y-auto > .w-full > .font-roboto')
        respons.should('contain', 'Tambah Infografis Banner Berhasil')
        const modals = cy.get('.overflow-y-auto > .w-full > .flex > .text-sm')
        modals.should('contain', 'Banner yang Anda buat berhasil ditambahkan.')
    }

    btnUnderstand() {
        deleteServicePage.clickBtnUnderstand()
    }

    clickBtnBack() {
        const btn = cy.get(create.btnBack)
        btn.click()
        cy.url().should("eq", Cypress.env("base_url") + "/landing-page/infographics-banner")
    }
    // Input Data

    // Alert
    alertWrongUpload() {
        const alert = cy.get(create.alertWrongUpload)
        alert.should('contain', 'File yang anda pilih bukan gambar!')
    }

    alertTextLimit() {
        const alert = cy.get(create.alertText50)
        alert.should('contain', 'Teks yang anda masukkan lebih dari 50 karakter')
    }

    alertMandatory() {
        const alert = cy.get(create.alertMandatory)
        alert.should('contain', 'Field ini wajib diisi!')
    }

    alertLinkWrong() {
        const alert = cy.get(create.alertMandatory)
        alert.should('contain', 'Link yang anda masukkan salah!')
    }

    alertResolutionDesktop() {
        const alert = cy.get(create.alertResolution)
        alert.should('contain', 'Resolusi gambar melebihi 4877 x 1628 pixel!')
    }

    alertResolutionMobile() {
        const alert = cy.get(create.alertResolution)
        alert.should('contain', 'Resolusi gambar melebihi 1501 x 501 pixel!')
    }
}