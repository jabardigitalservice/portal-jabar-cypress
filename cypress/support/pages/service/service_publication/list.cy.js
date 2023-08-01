import list from "../../../selectors/service/service_publication/list";
import navbar from "../../../selectors/navbar";
import sidebar from "../../../selectors/sidebar";
import { ListServicePage } from "../service_list/list.cy";

export class ListPublicationPage {
    assertServicePage() {
        // Title
        const titleH1 = cy.get(navbar.titleH1).as('titleMenu')
        titleH1.should("contain", "Layanan Pemerintah Daerah Provinsi Jawa Barat")
        cy.url().should("eq", Cypress.env("base_url") + "/layanan/daftar-publikasi-layanan")

        // Tab
        const tabMenu = cy.xpath('/html[1]/body[1]/div[1]/div[1]/div[1]/div[1]/div[1]/ul[1]')
        tabMenu.find('li').should('have.length', 3)
            .and('contain', 'Daftar Layanan')
            .and('contain', 'Daftar Publikasi')
            .and('contain', 'Program Unggulan')
    }

    navigateToServicePage() {
        const serviceMenu = cy.get(sidebar.layananMenu).as('serviceMenu')
        serviceMenu.click()
        serviceMenu.should("contain", "Layanan").and("be.visible")

        this.assertServicePage()
    }

    navigateToPublicationTab() {
        const tabPublication = cy.xpath(list.tabPublication)
        const textTabPublication = cy.xpath(list.textTabPublication)
        tabPublication.click()
        cy.wait(1000)
        textTabPublication.should('have.class', 'text-green-700')
    }

    clickBtnCreateService() {
        const btnCreate = cy.contains(list.btnTambahLayanan).as('btnCreateService')

        btnCreate.should("be.visible").and("contain", "Tambah Layanan")
        btnCreate.click()

        cy.url().should("eq", Cypress.env("base_url") + "/layanan/daftar-publikasi/tambah")
    }

    assertNewData() {
        const filename = "cypress/fixtures/service/data_tes.json"
        const dataWizard1 = "cypress/fixtures/service/wizard1_temp_data.json"
        cy.readFile(dataWizard1).then((object) => {
            const newData = cy.xpath(list.rowNewData)
            const lower = object.penggunaLayanan.toLowerCase()
            newData.should('contain', object.namaLayanan)
                .and('contain', object.penggunaLayanan.charAt(0).toUpperCase() + lower.slice(1))
                .and('contain', object.teknisLayanan)
        })
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