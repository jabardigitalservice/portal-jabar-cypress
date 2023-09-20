import { qase } from "cypress-qase-reporter/dist/mocha"
import { ListNewsPage } from "../../../support/pages/news_articles/news/list.cy";

const { faker } = require('@faker-js/faker')
let listPage = new ListNewsPage()

beforeEach('', () => {
    cy.intercept({ resourceType: /xhr|fetch/ }, { log: false })
})

describe('Scenario Publish News Positive', { testIsolation: false }, () => {
    qase([],
        it('Visit URL CMS & News Menu', () => {
            cy.login()
            listPage.navigateToNewsArchiveMenu()
            listPage.navigateToNewsTab()
        })
    )

    qase([],
        it('Publish News', () => {
            listPage.clickBtnCreateNews()
        })
    )
})