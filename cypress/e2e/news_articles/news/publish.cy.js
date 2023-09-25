import { qase } from "cypress-qase-reporter/dist/mocha"
import { ListNewsPage } from "../../../support/pages/news_articles/news/list.cy";
import { CreateNewsPage } from "../../../support/pages/news_articles/news/create.cy";

const { faker } = require('@faker-js/faker')
let listPage = new ListNewsPage()
let createPage = new CreateNewsPage()
let dataUpload
let dataLive

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
})

beforeEach('', () => {
    cy.login()
    listPage.navigateToNewsArchiveMenu()
    listPage.navigateToNewsTab()
})

describe('Scenario Publish News Positive', { testIsolation: false }, () => {
    qase([],
        it('Publish News', () => {
            listPage.clickBtnCreateNews()
            createPage.assertCreatePage()
            createPage.inputTitleNews(faker.word.adverb())
            createPage.uploadFileBanner(dataUpload.img1500x500)
            createPage.inputNewsContent(faker.lorem.sentences(5))
            createPage.chooseLiveDuration(dataLive.tanpaBatas)
        })
    )
})