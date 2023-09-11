import navbar from "../../../selectors/navbar";
import sidebar from "../../../selectors/sidebar";
import list from "../../../selectors/profile_jabar/archives_document/list";

export class ListArchivesDocument {
    assertPage() {
        // Title
        const titleH1 = cy.get(navbar.titleH1).as('titleMenu')
        titleH1.should("contain", "Profil Jawa Barat")
        cy.url().should("eq", Cypress.env("base_url") + "/profil-jawa-barat/arsip-dan-dokumen")

        // Tab
        const tabMenu = cy.xpath(list.ulTabMenu)
        tabMenu.find('li').should('have.length', 2)
            .and('contain', 'Arsip dan Dokumen')
            .and('contain', 'Tentang Jawa Barat')
    }

    assertNewData() {
        const data = "cypress/fixtures/profile_jabar/archives_document/data_archives_document.json"
        cy.readFile(data).then((object) => {
            const newData = cy.xpath(list.rowNewData)
            newData.should('contain', object.titleDocument)
                .and('contain', object.categoryTopic)
                .and('contain', object.status)
        })
    }

    assertNewDataDraft() {
        const data = "cypress/fixtures/profile_jabar/archives_document/data_archives_document.json"
        cy.readFile(data).then((object) => {
            const newData = cy.xpath(list.rowNewData)
            newData.should('contain', '-')
                .and('contain', '-')
                .and('contain', object.status)
        })
    }

    navigateToProfilJabarMenu() {
        const profilJabarMenu = cy.get(sidebar.profilJawaBaratMenu).as('profilJabarMenu')
        profilJabarMenu.click()
        this.assertPage()
    }

    navigateToArchiveDocumentTab() {
        const tab = cy.xpath(list.tabArchiveDocument)
        const text = cy.xpath(list.textArchiveDocument)
        tab.click().should('contain', 'Arsip dan Dokumen')
        cy.wait(1000)
        text.should('have.class', 'text-green-700')

        // Assertion Tab
        const tabMenu = cy.xpath("/html[1]/body[1]/div[1]/div[1]/div[1]/div[1]/div[1]/main[1]/section[1]/ul[1]")
        tabMenu.find('li').should('have.length', 4)
            .and('contain', 'Semua Data')
            .and('contain', 'Draf')
            .and('contain', 'Terbit')
            .and('contain', 'Diarsipkan')
    }

    clickBtnCreateArchiveDocument() {
        const btn = cy.get(list.btnAdd)
        btn.click()
    }

    // Btn Aksi
    clickBtnAksi() {
        const btnAksi = cy.xpath(list.btnAksi)
        // btnAksi.should("be.visible")
        btnAksi.should("contain", "Aksi")
        btnAksi.click({ force: true })
        cy.wait(2000)
    }

    clickBtnDetail() {
        const btnDetail = cy.xpath(list.btnDetail)
        btnDetail.should("contain", "Detail")
        btnDetail.click({ force: true })
        cy.wait(2000)
    }

    clickBtnUbah() {
        const btnUbah = cy.xpath(list.btnUbah).as('clickBtnUbah')
        btnUbah.should("contain", "Ubah")
        btnUbah.click({ force: true })
        cy.wait(2000)
    }

    clickBtnDelete() {
        const btnDelete = cy.get(list.btnDelete)
        btnDelete.should("contain", "Hapus")
        btnDelete.click({ force: true })
    }
    // End Btn Aksi
}