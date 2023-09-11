import navbar from "../../selectors/navbar"
import update from "../../selectors/landing_page/infografis/update"
import { CreateInfograficBannerPage } from "./create.cy"

let createInfographicsPage = new CreateInfograficBannerPage()

export class UpdateInfographicsBannerPage {
    assertUpdateInfographicsPage() {
        const titleH1 = cy.get(navbar.titleH1)
        titleH1.should("contain", "Landing Page")
        // cy.url().should("eq", Cypress.env("base_url") + "/layanan/master-data/")
    }

    removeImgDesktop() {
        const btn = cy.get(update.removeImgDesktop)
        btn.click()
        cy.wait(2000)
    }

    uploadImgDesktop(file) {
        createInfographicsPage.uploadImgDesktop(file)
    }

    removeImgMobile() {
        const btn = cy.get(update.removeImgMobile)
        btn.click()
        cy.wait(2000)
    }

    uploadImgMobile(file) {
        createInfographicsPage.uploadImgMobile(file)
    }

    inputTitleBanner(text) {
        createInfographicsPage.inputTitleBanner(text)
    }

    inputLinkRedirect(text) {
        createInfographicsPage.inputLinkRedirect(text)
    }

    clickBtnSaveData() {
        createInfographicsPage.clickBtnSaveData()
    }

    btnYesSaveModalsConfirmation() {
        const btn = cy.contains('Ya, simpan banner')
        btn.click()
        cy.wait(2000)

        // Assert Success Save Data
        const respons = cy.get('.animate-slide-up > .overflow-y-auto > .w-full > .font-roboto')
        respons.should('contain', 'Update Infografis Banner Berhasil')
        const modals = cy.get('.overflow-y-auto > .w-full > .flex > .text-sm')
        modals.should('contain', 'Banner yang Anda ubah berhasil disimpan.')
    }

    btnUnderstand() {
        createInfographicsPage.btnUnderstand()
    }
}