import { ListArchivesDocument } from "../../../../support/pages/profile_jabar/archives_document/list.cy";
import { CreateArchivesDocumentPage } from "../../../../support/pages/profile_jabar/archives_document/create.cy";
import { DetailPage } from "../../../../support/pages/profile_jabar/archives_document/detail.cy";
import { UpdatePage } from "../../../../support/pages/profile_jabar/archives_document/update.cy";
import { qase } from "cypress-qase-reporter/dist/mocha"

const { faker } = require('@faker-js/faker')
let listPage = new ListArchivesDocument()
let createPage = new CreateArchivesDocumentPage()
let detailPage = new DetailPage()
let updatePage = new UpdatePage()
let dataUpload
let category
const dataArchivesDocument = "cypress/fixtures/profile_jabar/archives_document/data_archives_document.json"

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

describe('Archive and Documents Positive Scenario', () => {
    qase([4381, 4391, 4394, 4399, 4406, 4413, 4415, 4423],
        it('Create Data Archives and Documents - PUBLISH', () => {
            // Navigate to infographics tab
            listPage.navigateToArchiveDocumentTab()

            // Form Add
            listPage.clickBtnCreateArchiveDocument()
            createPage.assertCreatePage()
            createPage.uploadArchiveDocument(dataUpload.pdfFile)
            createPage.inputTitleDocument(faker.word.adverb())
            createPage.chooseCategoryTopic(category.cat1)
            createPage.inputDescDocument(faker.lorem.sentences(2))
            createPage.clickBtnPublish()
            createPage.btnYesPublish()
            createPage.btnUnderstand()

            // Assertion in List Data Infografis Banner
            listPage.navigateToArchiveDocumentTab()
            listPage.assertNewData()
        })
    )

    qase([4440],
        it('Input Description Document = 500 Character', () => {
            // Navigate to infographics tab
            listPage.navigateToArchiveDocumentTab()

            // Form Add
            listPage.clickBtnCreateArchiveDocument()
            createPage.assertCreatePage()
            createPage.uploadArchiveDocument(dataUpload.pdfFile)
            createPage.inputTitleDocument(faker.word.adverb())
            createPage.chooseCategoryTopic(category.cat1)
            createPage.inputDescDocument(createPage.inputCharacters(500))
            createPage.clickBtnPublish()
            createPage.btnYesPublish()
            createPage.btnUnderstand()

            // Assertion in List Data Infografis Banner
            listPage.navigateToArchiveDocumentTab()
            listPage.assertNewData()
        })
    )

    qase([4434, 4437, 4443, 4448, 4451, 4452],
        it('Detail Data', () => {
            // Navigate to infographics tab
            listPage.navigateToArchiveDocumentTab()

            // Go to Detail Page
            listPage.clickBtnAksi()
            listPage.clickBtnDetail()
            detailPage.assertDetailPage()
            detailPage.assertDataDetail()
            detailPage.clickBtnBack()
        })
    )

    qase([4484, 4486, 4470, 4491, 4493, 4500, 4507],
        it('Ubah Data', () => {
            // Navigate to infographics tab
            listPage.navigateToArchiveDocumentTab()

            // Go to Detail Page
            listPage.clickBtnAksi()
            listPage.clickBtnUbah()
            updatePage.assertUpdateArchiveDocsPage()
            updatePage.assertUpdateData()
            updatePage.removeDocs()

            updatePage.uploadArchiveDocument(dataUpload.wordFile)
            updatePage.inputTitleDocument(faker.word.adverb())

            // cy.readFile(dataArchivesDocument).then((object) => {
            //     const cat1 = 'Dokumen Perencanaan'
            //     const cat2 = 'Laporan Pertanggungjawaban'

            //     if (object.categoryTopic == category.cat1) {
            //         updatePage.chooseCategoryTopic(category.cat2)
            //     } else {
            //         updatePage.chooseCategoryTopic(category.cat1)
            //     }
            // })

            updatePage.chooseCategoryTopic(category.cat2)
            updatePage.inputDescDocument(faker.lorem.sentences(2))
            updatePage.clickBtnSaveChanges()
            updatePage.btnYesSaveModalsConfirmation()
            updatePage.btnUnderstand()
        })
    )
})