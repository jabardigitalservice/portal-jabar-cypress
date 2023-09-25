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
    cy.login()
    cy.intercept({ resourceType: /xhr|fetch/ }, { log: false })
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

    // Search 
    qase([4521, 4518],
        it('Search Data & Clear', () => {
            cy.readFile(dataArchivesDocument).then((object) => {
                listPage.search(object.titleDocument)
            })
            listPage.assertSearchValid()
            listPage.clearSearch()
            listPage.assertRowDefault()
        }),

        qase([4526],
            it('Remove search keywords (use backspace)', () => {
                cy.readFile(dataArchivesDocument).then((object) => {
                    listPage.search(object.titleDocument)
                    cy.wait(5000)
                })
                listPage.assertSearchValid()
                listPage.deleteKeywordSearch()
                listPage.assertRowDefault()
            })
        ),

        qase([4525],
            it('Search With 1 Character', () => {
                listPage.search('a')
                listPage.assertRowDefault()
                listPage.clearSearch()
                listPage.assertRowDefault()
            })
        ),

        qase([4519],
            it('Search With 2 Character', () => {
                listPage.search('ai')
                listPage.assertRowDefault()
                listPage.clearSearch()
                listPage.assertRowDefault()
            })
        ),

        qase([4520],
            it('Invalid 3 character search', () => {
                listPage.search('aia')
                listPage.assertSearchNotFound()
                listPage.clearSearch()
                listPage.assertRowDefault()
            })
        ),

        qase([4522],
            it('Invalid > 3 character search', () => {
                listPage.search('aiaaaa')
                listPage.assertSearchNotFound()
                listPage.clearSearch()
                listPage.assertRowDefault()
            })
        ),

        qase([4529],
            it('Search with keywords space only', () => {
                listPage.search('   ')
                listPage.assertRowDefault()
                listPage.deleteKeywordSearch()
                listPage.assertRowDefault()
            })
        ),
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
        it('Update Data', () => {
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

    qase([4472, 4473, 4474, 4492, 4495, 4496, 4499, 4502, 4506],
        it('Update Data, Negative Scenario', () => {
            // Navigate to infographics tab
            listPage.navigateToArchiveDocumentTab()

            // Go to Detail Page
            listPage.clickBtnAksi()
            listPage.clickBtnUbah()
            updatePage.assertUpdateArchiveDocsPage()
            updatePage.assertUpdateData()

            // Upload File > 5MB
            updatePage.removeDocs()
            updatePage.uploadArchiveDocument(dataUpload.pdfFile6Mb)
            updatePage.alertFileOver5Mb()
            updatePage.inputTitleDocument(faker.word.adverb())
            updatePage.chooseCategoryTopic(category.cat1)
            updatePage.inputDescDocument(faker.lorem.sentences(2))
            updatePage.clickBtnSaveChanges()

            // Upload File JPG
            updatePage.uploadArchiveDocument(dataUpload.img4876x1627)
            updatePage.alertWrongExtensionFile()
            updatePage.inputTitleDocument(faker.word.adverb())
            updatePage.chooseCategoryTopic(category.cat2)
            updatePage.inputDescDocument(faker.lorem.sentences(2))
            updatePage.clickBtnSaveChanges()

            // Upload File PNG
            updatePage.uploadArchiveDocument(dataUpload.png4kb)
            updatePage.alertWrongExtensionFile()
            updatePage.inputTitleDocument(faker.word.adverb())
            updatePage.chooseCategoryTopic(category.cat1)
            updatePage.inputDescDocument(faker.lorem.sentences(2))
            updatePage.clickBtnSaveChanges()

            // Update Title > 150 Character
            updatePage.uploadArchiveDocument(dataUpload.pdfFile)
            updatePage.inputTitleDocument(faker.lorem.words(50))
            createPage.alertTextTitleMax()
            updatePage.chooseCategoryTopic(category.cat2)
            updatePage.inputDescDocument(faker.lorem.sentences(2))
            updatePage.clickBtnSaveChanges()

            // Update Title Empty
            updatePage.uploadArchiveDocument(dataUpload.pdfFile)
            updatePage.inputTitleDocument('test{selectAll}{backspace}')
            updatePage.alertMandatoryTitle()
            updatePage.chooseCategoryTopic(category.cat1)
            updatePage.inputDescDocument(faker.lorem.sentences(2))
            updatePage.clickBtnSaveChanges()

            // Update Title With Space
            updatePage.uploadArchiveDocument(dataUpload.pdfFile)
            updatePage.inputTitleDocument('    ')
            createPage.alertMandatoryTitle()
            updatePage.chooseCategoryTopic(category.cat2)
            updatePage.inputDescDocument(faker.lorem.sentences(2))
            updatePage.clickBtnSaveChanges()

            // Update Desc Docs With Space
            updatePage.uploadArchiveDocument(dataUpload.pdfFile)
            updatePage.inputTitleDocument(faker.word.adverb())
            updatePage.chooseCategoryTopic(category.cat2)
            updatePage.inputDescDocument('     ')
            updatePage.alertMandatoryDesc()
            updatePage.clickBtnSaveChanges()
        })
    )
})