import { qase } from "cypress-qase-reporter/dist/mocha"
import { ListNewsPage } from "../../../support/pages/news_articles/news/list.cy";
import { CreateNewsPage } from "../../../support/pages/news_articles/news/create.cy";

const { faker } = require('@faker-js/faker')
let listPage = new ListNewsPage()
let createPage = new CreateNewsPage()
let dataUpload
let dataLive
let dataCategory
let dataLocation

beforeEach('', () => {
    cy.intercept({ resourceType: /xhr|fetch/ }, { log: false })
})

before('Load Data', () => {
    // cy.then(Cypress.session.clearCurrentSessionData)
    cy.fixture("data_upload.json").then((data) => {
        dataUpload = data
    })
    cy.fixture("news_articles/news/data_live.json").then((data) => {
        dataLive = data
    })
    cy.fixture("news_articles/news/data_category.json").then((data) => {
        dataCategory = data
    })
    cy.fixture("news_articles/news/data_location.json").then((data) => {
        dataLocation = data
    })
})

beforeEach('', () => {
    cy.login()
    listPage.navigateToNewsArchiveMenu()
    listPage.navigateToNewsTab()
})

describe('Scenario Publish News Positive', { testIsolation: false }, () => {
    qase([334, 1521, 339, 340, 342, 329],
        it('Publish News', () => {
            // Navigate to form add
            listPage.clickBtnCreateNews()
            createPage.assertCreatePage()

            // Form Input
            createPage.inputTitleNews(faker.word.adverb())
            createPage.uploadFileBanner(dataUpload.img1500x500)
            createPage.inputNewsContent(faker.lorem.sentences(5))
            createPage.chooseLiveDuration(dataLive.tanpaBatas)
            createPage.chooseCategoryTopic(dataCategory.cat1)
            createPage.enterTag()
            createPage.assertTags()
            createPage.inputAuthor(faker.lorem.word(5))
            createPage.inputReporter(faker.lorem.word(7))
            createPage.inputEditor(faker.lorem.word(9))
            createPage.chooseLocations(dataLocation.kotCimahi)

            // Btn Publish Actions
            createPage.clickBtnPublish()
            createPage.clickBtnYesPublish()
            createPage.clickBtnCloseModals()

            // Assert data in list data news
            listPage.navigateToNewsTab()
            listPage.assertNewData()
        })
    )
})