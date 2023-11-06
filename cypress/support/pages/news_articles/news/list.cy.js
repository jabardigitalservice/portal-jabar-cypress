import navbar from "../../../selectors/navbar"
import sidebar from "../../../selectors/sidebar"
import list from "../../../selectors/news_articles/news/list"

const data = "cypress/fixtures/news_articles/news/data_news.json"

export class ListNewsPage {
    assertPage() {
        // Title
        const titleH1 = cy.get(navbar.titleH1).as('titleMenu')
        titleH1.should("contain", "Berita dan Artikel")
        cy.url().should("eq", Cypress.env("base_url") + "/berita-dan-artikel")

        // Tab
        const tabMenu = cy.xpath(list.ulTabMenu)
        tabMenu.find('li').should('have.length', 4)
            .and('contain', 'Berita')
            .and('contain', 'Informasi')
            .and('contain', 'Video')
            .and('contain', 'Media Galeri')
    }

    navigateToNewsArchiveMenu() {
        const menu = cy.get(sidebar.newsMenu).as('newsMenu')
        menu.click()
        this.assertPage()
    }

    navigateToNewsTab() {
        const tab = cy.xpath(list.tabNews)
        const text = cy.xpath(list.textNews)
        tab.click().should('contain', 'Berita')
        cy.wait(1000)
        text.should('have.class', 'text-green-700')

        // Assertion Tab
        const tabAgregation = cy.xpath(list.tabAgregation)
        tabAgregation.find('li').should('have.length', 5)
            .and('contain', 'Semua Berita')
            .and('contain', 'Tersimpan')
            .and('contain', 'Menunggu Review')
            .and('contain', 'Diterbitkan')
            .and('contain', 'Diarsipkan')
    }

    clickBtnCreateNews() {
        const btn = cy.contains(list.btnAdd)
        btn.click()
        cy.wait(5000)
    }

    assertNewData() {
        const data = "cypress/fixtures/news_articles/news/data_news.json"

        cy.readFile(data).then((object) => {
            const newData = cy.xpath(list.tr_rowNewData)
            const lowerCategoryTopic = object.categoryTopic.toLowerCase()

            newData.should('contain', object.titleNews)
                .and('contain', lowerCategoryTopic)
                .and('contain', object.status)
        })
    }

    // Btn Aksi
    clickBtnAksi() {
        const btnAksi = cy.xpath(list.btn_Action)
        // btnAksi.should("be.visible")
        btnAksi.should("contain", "Aksi")
        btnAksi.click({ force: true })
        cy.wait(2000)
    }

    clickBtnDetail() {
        const btnDetail = cy.xpath(list.btn_Detail)
        btnDetail.should("contain", "Detail")
        btnDetail.click({ force: true })
        cy.wait(2000)
    }

    clickBtnUbah() {
        const btnUbah = cy.xpath(list.btn_Update).as('clickBtnUbah')
        btnUbah.should("contain", "Ubah")
        btnUbah.click({ force: true })
        cy.wait(2000)
    }

    clickBtnDelete() {
        const btnDelete = cy.get(list.btn_Delete)
        btnDelete.should("contain", "Hapus")
        btnDelete.click({ force: true })
    }
    // End Btn Aksi
}