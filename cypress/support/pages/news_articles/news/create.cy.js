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

    chooseCategoryTopic(valueTopic) {
        // Dropdown
        const dropdown = cy.xpath(create.dropdown_categoryTopic)
        dropdown.click()
        cy.wait(1000)

        // Choose Category
        const category = cy.contains(valueTopic)
        category.click()

        cy.readFile(data).then((object) => {
            object.categoryTopic = valueTopic
            cy.writeFile(data, object)
        })

        // Assertion Choose Option Category
        const value = cy.xpath("//input[@placeholder='Pilih kategori/topik']")
        value.invoke("val").then((text) => {
            if (text == "") {
                expect("").to.equal(text)
            } else {
                expect(valueTopic).to.equal(text)
            }
        })
    }

    enterTag() {
        let tagData = "cypress/fixtures/agenda/agenda_data.json"
        let formInputTag = cy.get(create.input_tag)

        cy.readFile(tagData).then((object) => {
            const dataTag = [
                {
                    tag: object.tagAgenda1,
                },
                {
                    tag: object.tagAgenda2,
                },
                {
                    tag: object.tagAgenda3,
                },
            ]

            dataTag.forEach(({ tag }) => {
                formInputTag.type(tag + "{enter}")
            })
        })
    }

    assertTags() {
        let tagData = "cypress/fixtures/agenda/agenda_data.json"

        cy.readFile(tagData).then((object) => {
            const sectionTag = cy.xpath(create.section_tag)
            sectionTag.should('contain', object.tagAgenda1)
                .and('contain', object.tagAgenda2)
                .and('contain', object.tagAgenda3)
        })
    }

    inputAuthor(text) {
        const formInput = cy.get(create.input_author)

        cy.readFile(data).then((object) => {
            object.author = text
            cy.writeFile(data, object)
        })

        formInput.type(text)
    }

    inputReporter(text) {
        const formInput = cy.get(create.input_reporter)

        cy.readFile(data).then((object) => {
            object.reporter = text
            cy.writeFile(data, object)
        })

        formInput.type(text)
    }

    inputEditor(text) {
        const formInput = cy.get(create.input_editor)

        cy.readFile(data).then((object) => {
            object.editor = text
            cy.writeFile(data, object)
        })

        formInput.type(text)
    }

    chooseLocations(valueLocation) {
        // Dropdown
        const dropdown = cy.xpath(create.dropdown_location)
        dropdown.click()
        cy.wait(1000)

        // Choose Locations
        const location = cy.contains(valueLocation)
        location.click()

        cy.readFile(data).then((object) => {
            object.location = valueLocation
            cy.writeFile(data, object)
        })

        // Assertion Choose Option Locations
        const value = cy.xpath("//input[@placeholder='Pilih lokasi']")
        value.invoke("val").then((text) => {
            if (text == "") {
                expect("").to.equal(text)
            } else {
                expect(valueLocation).to.equal(text)
            }
        })
    }

    // Btn Action
    clickBtnPublish() {
        const btn = cy.xpath(create.btn_publish)
        btn.then(($btn) => {
            if ($btn.is(":disabled")) {
                btn.should("be.disabled")
            } else {
                btn.should("be.visible")
                btn.contains("Ajukan untuk Diterbitkan")
                btn.click()
                cy.wait(2000)
                // Assertion Modals Confirmation
                const titleModals = cy.xpath(create.modals_title)
                titleModals.should('contain', 'Terbitkan Berita')

                const bodyModals = cy.xpath(create.modals_body)
                bodyModals.should('contain', 'Apakah Anda yakin untuk mengajukan berita ini untuk diterbitkan?')

                cy.readFile(data).then((object) => {
                    const titleNewsConfirmation = cy.xpath(create.modals_NewsTitleConfirmation)
                    titleNewsConfirmation.should('contain', object.titleNews)
                })
            }
        })
    }

    clickBtnYesPublish() {
        const btn = cy.xpath(create.btn_yesPublish)
        const assertion = "Menunggu Review"

        btn.click()
        cy.wait(2000)

        // Assert Success Publish Data
        const titleSuccess = cy.xpath(create.modals_title)
        titleSuccess.should('contain', 'Ajukan Berita Berhasil')

        const messageSuccess = cy.xpath(create.modals_bodyConfirmation)
        messageSuccess.should('contain', 'Berita yang Anda buat sedang menunggu untuk direview.')

        // Status Data 
        cy.readFile(data).then((object) => {
            object.status = assertion
            cy.writeFile(data, object)
        })
    }

    clickBtnCloseModals() {
        const btn = cy.get(create.btn_close)
        btn.click()
        cy.wait(2000)
        cy.url().should("eq", Cypress.env("base_url") + "/berita-dan-artikel")
    }
}