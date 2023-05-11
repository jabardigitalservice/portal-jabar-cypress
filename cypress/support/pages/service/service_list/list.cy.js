import list from "../../../selectors/service/service_list/list";
import navbar from "../../../selectors/navbar";
import sidebar from "../../../selectors/sidebar";

export class ListServicePage {
    assertServicePage() {
        // Title
        const titleH1 = cy.get(navbar.titleH1).as('titleMenu')
        titleH1.should("contain", "Layanan Pemerintah Daerah Provinsi Jawa Barat")
        cy.url().should("eq", Cypress.env("base_url") + "/layanan")

        // Tab
        const tabMenu = cy.xpath('/html[1]/body[1]/div[1]/div[1]/div[1]/div[1]/div[1]/ul[1]')
        tabMenu.find('li').should('have.length', 3)
            .and('contain', 'Daftar Layanan')
            .and('contain', 'Daftar Publikasi Layanan')
            .and('contain', 'Program Unggulan')
    }

    navigateToServicePage() {
        const serviceMenu = cy.get(sidebar.layananMenu).as('serviceMenu')
        serviceMenu.click()
        serviceMenu.should("contain", "Layanan").and("be.visible")

        this.assertServicePage()
    }

    clickBtnCreateService() {
        const btnCreate = cy.contains(list.btnTambahLayanan).as('btnCreateService')

        btnCreate.should("be.visible").and("contain", "Tambah Layanan")
        btnCreate.click()

        cy.url().should("eq", Cypress.env("base_url") + "/layanan/master-data/tambah")
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