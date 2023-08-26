import list from "../../../selectors/service/service_list/list";
import navbar from "../../../selectors/navbar";
import sidebar from "../../../selectors/sidebar";

const filename = "cypress/fixtures/service/wizard1_temp_data.json"


export class ListServicePage {
    assertServicePage() {
        // Title
        const titleH1 = cy.get(navbar.titleH1).as('titleMenu')
        titleH1.should("contain", "Layanan Pemerintah Daerah Provinsi Jawa Barat")
        cy.url().should("eq", Cypress.env("base_url") + "/layanan/daftar-layanan")

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

    // Search
    search(title) {
        cy.readFile(filename).then((object) => {
            const search = cy.xpath(list.search)
            search.clear()
            search.type(title).should('have.value', title.substring(0, 50));
            cy.wait(2000)
        })
    }

    deleteKeywordSearch() {
        const search = cy.xpath(list.search)
        search.type("{selectall}{backspace}").should('have.value', '')
        cy.wait(2000)
    }

    assertSearchValid() {
        cy.readFile(filename).then((object) => {
            const tr = cy.xpath(list.tableRow)
            const lowerServiceUsage = object.penggunaLayanan.toLowerCase()
            tr.should('contain', object.namaLayanan)
                .and('contain', object.penggunaLayanan.charAt(0).toUpperCase() + lowerServiceUsage.slice(1))
                .and('contain', object.teknisLayanan)
        })
    }

    assertRowDefault() {
        const tableBody = cy.xpath(list.tableBody)
        const search = cy.xpath(list.search)

        // Assertion
        tableBody.find('tr').then(rows => {
            const rowCount = Cypress.$(rows).length
            expect(rowCount).to.equal(10)
        })
    }

    assertSearchNotFound() {
        const img = cy.xpath("/html[1]/body[1]/div[1]/div[1]/div[1]/div[1]/div[1]/main[1]/section[1]/section[1]/div[2]/div[1]/img[1]")
        img.should('have.attr', 'src', '/assets/search-not-found.c2800234.svg')

        const titleMessage = cy.xpath("//h3[normalize-space()='Data tidak ditemukan !']")
        titleMessage.should('contain', 'Data tidak ditemukan !')

        const message = cy.xpath("/html[1]/body[1]/div[1]/div[1]/div[1]/div[1]/div[1]/main[1]/section[1]/section[1]/div[2]/div[1]/p[1]")
        message.should('contain', 'Data yang Kamu minta tidak dapat ditemukan. Mohon pastikan Kamu telah memasukkan informasi yang benar.')
    }

    clearSearch() {
        const btnClear = cy.xpath(list.btnClearSearch)
        const search = cy.xpath(list.search)
        btnClear.click()
        cy.wait(2000)
        search.should('have.value', '')
    }
    // End Search

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