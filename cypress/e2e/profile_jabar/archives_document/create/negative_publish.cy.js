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
    cy.loginPreview()
    listPage.navigateToProfilJabarMenu()
    listPage.navigateToArchiveDocumentTab()
    // qase([4349, 4350],
    //     it('Login & Navigate to Archives and Documents', () => {

    //     })
    // )
})

describe('Archive and Documents Negative Scenario', () => {
    qase([4396],
        it('Upload File > 5 MB', () => {
            // Navigate to infographics tab
            listPage.navigateToArchiveDocumentTab()

            // Form Add
            listPage.clickBtnCreateArchiveDocument()
            createPage.assertCreatePage()
            createPage.uploadArchiveDocument(dataUpload.pdfFile6Mb)
            createPage.alertFileOver5Mb()
            createPage.inputTitleDocument(faker.word.adverb())
            createPage.chooseCategoryTopic(category.cat1)
            createPage.inputDescDocument(faker.lorem.sentences(2))
            createPage.clickBtnPublish()
            createPage.clickBtnBack()
            createPage.btnYesBack()
        })
    )

    qase([4397],
        it('Upload File JPG', () => {
            // Navigate to infographics tab
            listPage.navigateToArchiveDocumentTab()

            // Form Add
            listPage.clickBtnCreateArchiveDocument()
            createPage.assertCreatePage()
            createPage.uploadArchiveDocument(dataUpload.img4876x1627)
            createPage.alertWrongExtensionFile()
            createPage.inputTitleDocument(faker.word.adverb())
            createPage.chooseCategoryTopic(category.cat1)
            createPage.inputDescDocument(faker.lorem.sentences(2))
            createPage.clickBtnPublish()
            createPage.clickBtnBack()
            createPage.btnYesBack()
        })
    )

    qase([4398],
        it('Upload File PNG', () => {
            // Navigate to infographics tab
            listPage.navigateToArchiveDocumentTab()

            // Form Add
            listPage.clickBtnCreateArchiveDocument()
            createPage.assertCreatePage()
            createPage.uploadArchiveDocument(dataUpload.png200px)
            createPage.alertWrongExtensionFile()
            createPage.inputTitleDocument(faker.word.adverb())
            createPage.chooseCategoryTopic(category.cat1)
            createPage.inputDescDocument(faker.lorem.sentences(2))
            createPage.clickBtnPublish()
            createPage.clickBtnBack()
            createPage.btnYesBack()
        })
    )

    qase([4408],
        it('Input title > 150 Character', () => {
            // Navigate to infographics tab
            listPage.navigateToArchiveDocumentTab()

            // Form Add
            listPage.clickBtnCreateArchiveDocument()
            createPage.assertCreatePage()
            createPage.uploadArchiveDocument(dataUpload.pdfFile)
            createPage.inputTitleDocument(faker.lorem.words(50))
            createPage.alertTextTitleMax()
            createPage.chooseCategoryTopic(category.cat1)
            createPage.inputDescDocument(faker.lorem.sentences(2))
            createPage.clickBtnPublish()
            createPage.clickBtnBack()
            createPage.btnYesBack()
        })
    )

    qase([4409],
        it('Empty Field Title', () => {
            // Navigate to infographics tab
            listPage.navigateToArchiveDocumentTab()

            // Form Add
            listPage.clickBtnCreateArchiveDocument()
            createPage.assertCreatePage()
            createPage.uploadArchiveDocument(dataUpload.pdfFile)
            createPage.inputTitleDocument('test{selectAll}{backspace}')
            createPage.alertMandatoryTitle()
            createPage.chooseCategoryTopic(category.cat1)
            createPage.inputDescDocument(faker.lorem.sentences(2))
            createPage.clickBtnPublish()
            createPage.clickBtnBack()
            createPage.btnYesBack()
        })
    )

    qase([4412],
        it('Input title with only space', () => {
            // Navigate to infographics tab
            listPage.navigateToArchiveDocumentTab()

            // Form Add
            listPage.clickBtnCreateArchiveDocument()
            createPage.assertCreatePage()
            createPage.uploadArchiveDocument(dataUpload.pdfFile)
            createPage.inputTitleDocument('     ')
            createPage.alertMandatoryTitle()
            createPage.chooseCategoryTopic(category.cat1)
            createPage.inputDescDocument(faker.lorem.sentences(2))
            createPage.clickBtnPublish()
            createPage.clickBtnBack()
            createPage.btnYesBack()
        })
    )

    qase([4440],
        it('Choose Same Catogory', () => {
            // Navigate to infographics tab
            listPage.navigateToArchiveDocumentTab()

            // Form Add
            listPage.clickBtnCreateArchiveDocument()
            createPage.assertCreatePage()
            createPage.uploadArchiveDocument(dataUpload.pdfFile)
            createPage.inputTitleDocument(faker.lorem.sentences(2))
            createPage.chooseCategoryTopic(category.cat1)
            createPage.chooseCategoryTopic(category.cat1)
            createPage.alertMandatoryCategory()
            createPage.inputDescDocument(faker.lorem.sentences(2))
            createPage.clickBtnPublish()
            createPage.clickBtnBack()
            createPage.btnYesBack()
        })
    )

    qase([4418],
        it('Empty Description Documents', () => {
            // Navigate to infographics tab
            listPage.navigateToArchiveDocumentTab()

            // Form Add
            listPage.clickBtnCreateArchiveDocument()
            createPage.assertCreatePage()
            createPage.uploadArchiveDocument(dataUpload.pdfFile)
            createPage.inputTitleDocument(faker.word.adverb())
            createPage.chooseCategoryTopic(category.cat1)
            createPage.inputDescDocument('test{selectAll}{backspace}')
            createPage.alertMandatoryDesc()
            createPage.clickBtnPublish()
            createPage.clickBtnBack()
            createPage.btnYesBack()
        })
    )

    qase([4421],
        it('Input Description Documents with space', () => {
            // Navigate to infographics tab
            listPage.navigateToArchiveDocumentTab()

            // Form Add
            listPage.clickBtnCreateArchiveDocument()
            createPage.assertCreatePage()
            createPage.uploadArchiveDocument(dataUpload.pdfFile)
            createPage.inputTitleDocument(faker.word.adverb())
            createPage.chooseCategoryTopic(category.cat1)
            createPage.inputDescDocument('      ')
            createPage.alertMandatoryDesc()
            createPage.clickBtnPublish()
            createPage.clickBtnBack()
            createPage.btnYesBack()
        })
    )
})