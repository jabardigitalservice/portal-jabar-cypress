import { ListServicePage } from "../../../../support/pages/service/service_list/list.cy";
import { ListPublicationPage } from "../../../../support/pages/service/service_publication/list.cy";
import { UpdatePublicationMasterPage } from "../../../../support/pages/service/service_publication/update.cy";
import { CreatePublicationServicePage } from "../../../../support/pages/service/service_publication/create.cy";
import { ListAgendaPage } from "../../../../support/pages/agenda/list.cy";
import { CreateServiceMasterPage } from "../../../../support/pages/service/service_list/create.cy";
import { LoginPage } from "../../../../support/pages/auth/login_page.cy";
import { DetailServicePage } from "../../../../support/pages/service/service_list/detail.cy";
import { DetailPublicationPage } from "../../../../support/pages/service/service_publication/detail.cy";
import { DeleteServicePage } from "../../../../support/pages/service/service_list/delete.cy";
import { qase } from "cypress-qase-reporter/dist/mocha";

const { faker } = require('@faker-js/faker')
let listServicePage = new ListServicePage()
let listPublicationPage = new ListPublicationPage()
let updatePage = new UpdatePublicationMasterPage()
let detailPage = new DetailPublicationPage()
let deleteServicePage = new DeleteServicePage()
let createPublicationPage = new CreatePublicationServicePage()
let createPage = new CreateServiceMasterPage()
let agendaPage = new ListAgendaPage()
let loginPage = new LoginPage()
let user
let filename = "cypress/fixtures/service/wizard1_temp_data.json"
let dataFile

before('Load Data', () => {
    // cy.then(Cypress.session.clearCurrentSessionData)
    cy.fixture("credentials.json").then((data) => {
        user = data
    })
    cy.fixture("service/data_negative.json").then((data) => {
        dataFile = data
    })
})

beforeEach(() => {
    cy.login()
    cy.intercept({ resourceType: /xhr|fetch/ }, { log: false })
})

describe('Update Scenario', () => {
    qase([3257, 3689, 3696],
        it('Update All Data Multiple - service technical = offline', () => {
            // Create Data 
            // cy.createDataMasterService()

            // Go to update page
            listServicePage.navigateToServicePage()
            listServicePage.assertServicePage()
            listPublicationPage.navigateToPublicationTab()
            listServicePage.clickBtnAksi()
            listServicePage.clickBtnUbah()

            // Update data form 1
            updatePage.assertUpdatePublicationPage()
            updatePage.assertServiceValueForm1()
            updatePage.removeImgLogo()
            updatePage.uploadLogoService(dataFile.filePng)
            updatePage.chooseServiceCategoryJabarprov()
            updatePage.benefitTitileSection(faker.random.word(2))
            updatePage.benefitFileUpload(dataFile.filePng)
            updatePage.urlCustomPortalJabar(faker.random.word(2))
            updatePage.clickBtnSaveNext()

            // Form 2
            updatePage.assertServiceValueForm2()
            updatePage.coverImageFile(dataFile.filePng)
            updatePage.contentImageMultiple(dataFile.filePng)
            updatePage.termConditionTitleSection(faker.random.word(2))
            updatePage.uploadTermConditionImage(dataFile.filePng)
            updatePage.serviceUsageTitleSection(faker.random.word(2))
            updatePage.uploadServiceUsageCover(dataFile.filePng)
            updatePage.uploadInfographicServiceImage(dataFile.filePng)
            updatePage.featureAppsTitleSection(faker.random.word(3))
            updatePage.clickBtnSaveNext()

            // Form 3
            // updatePage.assertServiceValueForm3()
            updatePage.newsKeyword()
            updatePage.assertNewsKeyword()
            updatePage.faqQuestion(faker.lorem.words(5), faker.random.word(5), faker.random.word(10))
            updatePage.faqAnswer(faker.lorem.words(10), faker.random.word(5), faker.random.word(10))
            updatePage.clickBtnSaveChange()
            updatePage.btnYesSaveModalsConfirmation()
            updatePage.btnUnderstand()
        })
    )

    qase([2943, 2942, 3282, 3283, 3284],
        it('Detail Data Publication', () => {
            // Create Master Data Service
            // cy.createDataMasterService()

            // Go to service page
            listServicePage.navigateToServicePage()
            listServicePage.assertServicePage()

            // Navigate to Master Data Publication Page 
            listPublicationPage.navigateToPublicationTab()

            // Go to detail page
            listPublicationPage.clickBtnAksi()
            listPublicationPage.clickBtnDetail()
            detailPage.assertDetailPage()

            // Basic Setting Tab
            detailPage.assertBasicSettingData()
            detailPage.clickServiceDescriptionTab()
            detailPage.assertionServiceDescriptionData()
            detailPage.clickAdditionalInformationTab()
            detailPage.assertionAdditionalInformationUpdate()
            detailPage.clickBtnBack()
        })
    )

    qase([2882],
        it.skip('Delete Data', () => {
            listServicePage.navigateToServicePage()
            listServicePage.assertServicePage()
            listServicePage.clickBtnAksi()
            listServicePage.clickBtnDelete()
            deleteServicePage.modalsConfirmationDelete()
            deleteServicePage.clickBtnYesDelete()
            deleteServicePage.clickBtnUnderstand()
        })
    )
})
