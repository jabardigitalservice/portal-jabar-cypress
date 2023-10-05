import navbar from "../../selectors/navbar";
import sidebar from "../../selectors/sidebar";
import list from "../../selectors/landing_page/infografis/list";

export class ListInfografisBannerPage {
    assertPage() {
        // Title
        const titleH1 = cy.get(navbar.titleH1).as('titleMenu')
        titleH1.should("contain", "Landing Page")
        cy.url().should("eq", Cypress.env("base_url") + "/landing-page/popup-banner")

        // Tab
        const tabMenu = cy.xpath('/html[1]/body[1]/div[1]/div[1]/div[1]/div[1]/div[1]/ul[1]')
        tabMenu.find('li').should('have.length', 4)
            .and('contain', 'Popup Banner')
            .and('contain', 'Infografis Banner')
            .and('contain', 'Layanan Terpopuler')
            .and('contain', 'Akses Cepat')
    }

    assertNewData() {
        const dataInfographics = "cypress/fixtures/landing_page/infographics/data_infographics.json"
        cy.readFile(dataInfographics).then((object) => {
            const newData = cy.xpath(list.rowNewData)
            newData.should('contain', object.titleBanner)
                .and('contain', object.linkRedirect)
        })
    }

    navigateToLandingPageMenu() {
        const landingPageMenu = cy.get(sidebar.landingPageMenu).as('landingPageMenu')
        landingPageMenu.click()
        // landingPageMenu.should("contain", "Popup Banner").and("be.visible")

        this.assertPage()
    }

    navigateToInfografisBannerTab() {
        const tab = cy.xpath(list.tabInfografic)
        const text = cy.xpath(list.textTabInfografic)
        tab.click().should('contain', 'Infografis Banner')
        cy.wait(1000)
        text.should('have.class', 'text-green-700')
        cy.url().should("eq", Cypress.env("base_url") + "/landing-page/infographics-banner")
    }

    clickBtnCreateInfografic() {
        const btn = cy.contains(list.btnAddInfografis)
        btn.click()
    }

    // Btn Aksi
    clickBtnAksi() {
        const btnAksi = cy.xpath(list.btnAksi)
        // btnAksi.should("be.visible")
        btnAksi.should("contain", "Aksi")
        btnAksi.click()
    }

    clickBtnDetail() {
        const btnDetail = cy.xpath(list.btnDetail)
        btnDetail.should("contain", "Detail")
        btnDetail.click({ force: true })
    }

    clickBtnUbah() {
        const btnUbah = cy.xpath(list.btnUbah).as('clickBtnUbah')
        btnUbah.should("contain", "Ubah")
        btnUbah.click({ force: true })
    }

    clickBtnDelete() {
        const btnDelete = cy.xpath(list.btnDelete)
        btnDelete.should("contain", "Hapus")
        btnDelete.click({ force: true })
    }
    // End Btn Aksi
}