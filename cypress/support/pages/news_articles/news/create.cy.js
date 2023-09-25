import navbar from "../../../selectors/navbar";
import create from "../../../selectors/news_articles/news/create";

const data = "cypress/fixtures/news_articles/news/data_news.json"

export class CreateNewsPage {
    assertCreatePage() {
        const titleH1 = cy.get(navbar.titleH1).as('titleMenu')
        titleH1.should("contain", "Tulis Berita Baru")
        cy.url().should("eq", Cypress.env("base_url") + "/berita-dan-artikel/tambah")
    }

    inputTitleNews(text) {
        const formInput = cy.xpath(create.textarea_titleNews)
        cy.writeFile(data, { titleNews: text })
        formInput.clear().type(text)
    }

    uploadFileBanner(file) {
        const upload = cy.xpath(create.input_fileUpload)
        upload.attachFile(file)
        cy.wait(2000)
    }

    inputNewsContent(text) {
        const textArea = cy.xpath(create.textarea_newsContent)
            .find('iframe')
            .its('0.contentDocument.body')
            .should('be.visible')
            .then(cy.wrap)

        cy.readFile(data).then((object) => {
            object.newsContent = text
            cy.writeFile(data, object)
        })

        textArea.type(text)
    }

    chooseLiveDuration(valueLive) {
        // Dropdown
        const dropdown = cy.xpath(create.dropdown_durationLive)
        dropdown.click()
        cy.wait(1000)

        // Choose Category
        const duration = cy.contains(valueLive)
        duration.click()

        cy.readFile(data).then((object) => {
            object.liveDuration = valueLive
            cy.writeFile(data, object)
        })

        // Assertion Choose Option Category
        const value = cy.xpath("//input[@placeholder='Pilih durasi']")
        value.invoke("val").then((text) => {
            if (text == "") {
                expect("").to.equal(text)
            } else {
                expect(valueLive).to.equal(text)
            }
        })
    }
}