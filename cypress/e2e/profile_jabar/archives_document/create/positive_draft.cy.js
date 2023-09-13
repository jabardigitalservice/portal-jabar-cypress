import { ListArchivesDocument } from "../../../../support/pages/profile_jabar/archives_document/list.cy";
import { CreateArchivesDocumentPage } from "../../../../support/pages/profile_jabar/archives_document/create.cy";
import { qase } from "cypress-qase-reporter/dist/mocha"

const { faker } = require('@faker-js/faker')
let listPage = new ListArchivesDocument()
let createPage = new CreateArchivesDocumentPage()
let dataUpload
let category

before('Load Data', () => {
    // cy.then(Cypress.session.clearCurrentSessionData)
    cy.fixture("data_upload.json").then((data) => {
        dataUpload = data
    })
    cy.fixture("profile_jabar/data_category.json").then((data) => {
        category = data
    })
})

beforeEach(() => {
    cy.login()
    listPage.navigateToProfilJabarMenu()
    listPage.navigateToArchiveDocumentTab()
    // qase([4349, 4350],
    //     it('Login & Navigate to Archives and Documents', () => {

    //     })
    // )
})

describe('Archive and Documents Positive Scenario', () => {
    qase([4442],
        it('Create Data Empty Field', () => {
            // Navigate to infographics tab
            listPage.navigateToArchiveDocumentTab()

            // Form Add
            listPage.clickBtnCreateArchiveDocument()
            createPage.assertCreatePage()
            createPage.btnSaveDraft()
            createPage.btnYesSaveDraft()
            createPage.btnUnderstand()

            // Assertion in List Data Infografis Banner
            listPage.navigateToArchiveDocumentTab()
            listPage.assertNewDataDraft()
        })
    )

    qase([],
        it('Update Data All Field - Draft', () => {
            // Navigate to infographics tab
            listPage.navigateToArchiveDocumentTab()

            // Form Add
            listPage.clickBtnCreateArchiveDocument()
            createPage.assertCreatePage()
            createPage.uploadArchiveDocument(dataUpload.pdfFile)
            createPage.inputTitleDocument(faker.word.adverb())
            createPage.chooseCategoryTopic(category.cat1)
            createPage.inputDescDocument(faker.lorem.sentences(2))
            createPage.btnSaveDraft()
            createPage.btnYesSaveDraft()
            createPage.btnUnderstand()

            // Assertion in List Data Infografis Banner
            listPage.navigateToArchiveDocumentTab()
            listPage.assertNewData()
        })
    )
})