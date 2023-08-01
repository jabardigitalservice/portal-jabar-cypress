import { ListServicePage } from "../../../../support/pages/service/service_list/list.cy";
import { ListPublicationPage } from "../../../../support/pages/service/service_publication/list.cy";
import { CreateServiceMasterPage } from "../../../../support/pages/service/service_list/create.cy";
import { CreatePublicationServicePage } from "../../../../support/pages/service/service_publication/create.cy";
import { DetailPublicationPage } from "../../../../support/pages/service/service_publication/detail.cy";
import { LoginPage } from "../../../../support/pages/auth/login_page.cy";
import { DeleteServicePage } from "../../../../support/pages/service/service_list/delete.cy";
import { qase } from "cypress-qase-reporter/dist/mocha";

const { faker } = require('@faker-js/faker')
let listServicePage = new ListServicePage()
let listPublicationPage = new ListPublicationPage()
let createServiceMasterPage = new CreateServiceMasterPage()
let createPublicationPage = new CreatePublicationServicePage()
let detailPage = new DetailPublicationPage()
let loginPage = new LoginPage()
let deleteServicePage = new DeleteServicePage()
let user
let dataFile
let filename = "cypress/fixtures/service/publication_store_data.json"

before('Load Data', () => {
    cy.then(Cypress.session.clearCurrentSessionData)
    cy.fixture("credentials.json").then((data) => {
        user = data
    })
    cy.fixture("service/data_negative.json").then((data) => {
        dataFile = data
    })
})

describe('Service Positive Scenario', { testIsolation: false }, () => {

    it.only('Login CMS', () => {
        cy.login()
        listServicePage.navigateToServicePage()
        listServicePage.assertServicePage()
    });

    qase([2950, 2957, 2961, 2966, 2971, 2973, 3156, 3157, 3158, 2977, 3001, 3004, 3009, 3011, 3034, 3293, 3298, 3300, 3394, 3395, 3430, 3059, 3056, 3063, 3079, 3084, 3086, 3089, 3090, 3097, 3170, 3175, 3177, 3177, 3117, 3124, 3180, 3185, 3187, 3167, 3168, 3200, 3205, 3207, 3212, 3213, 3214, 3215, 3216, 3217, 3218, 3219, 3220, 3221, 3222, 3411, 3235, 3241, 3242, 3243, 3245, 3246],
        it.only('Create data publication', () => {
            // Create Master Data Service == Online
            cy.createDataMasterService()

            // Navigate to Master Data Publication Page 
            listPublicationPage.navigateToPublicationTab()
            listPublicationPage.clickBtnCreateService()
            createServiceMasterPage.assertCreateServicePage()

            // Form 1
            createPublicationPage.chooseService()
            createPublicationPage.assertServiceValueForm1()
            createPublicationPage.uploadLogoService(dataFile.filePng)
            createPublicationPage.chooseServiceCategoryJabarprov()
            createPublicationPage.benefitTitileSection("Manfaat Layanan untuk Masyarakat")
            createPublicationPage.benefitFileUpload(dataFile.filePng)
            createPublicationPage.urlCustomPortalJabar(faker.random.word(2))
            createPublicationPage.clickBtnSaveNext()

            // Form 2
            createPublicationPage.assertServiceValueForm2()
            // createPublicationPage.coverImageYoutube('https://www.youtube.com/@masjidaljabbar')
            createPublicationPage.coverImageFile(dataFile.filePng)
            createPublicationPage.contentImageMultiple(dataFile.filePng)
            createPublicationPage.termConditionTitleSection("Syarat dan Ketentuan Layanan")
            createPublicationPage.uploadTermConditionImage(dataFile.filePng)
            createPublicationPage.serviceUsageTitleSection("Alur atau Prosedur Penggunaan Layanan")
            createPublicationPage.uploadServiceUsageCover(dataFile.filePng)
            createPublicationPage.uploadInfographicServiceImage(dataFile.filePng)
            createPublicationPage.featureAppsTitleSection("Fitur Aplikasi")
            createPublicationPage.clickBtnSaveNext()

            // Form 3
            createPublicationPage.newsKeyword()
            createPublicationPage.assertNewsKeyword()
            createPublicationPage.faqQuestion(faker.lorem.words(5), faker.random.word(5), faker.random.word(10))
            createPublicationPage.faqAnswer(faker.lorem.words(10), faker.random.word(5), faker.random.word(10))
            createPublicationPage.clickBtnAddService()
            createPublicationPage.btnYesSaveModalsConfirmation()
            createPublicationPage.btnUnderstand()

            // Assert on list data
            listPublicationPage.navigateToPublicationTab()
            listPublicationPage.assertNewData()
        })
    )

    qase([2943, 2942, 3282, 3283, 3284],
        it('Detail Data Publication', () => {
            // Create Master Data Service
            // cy.createDataMasterService()

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
            detailPage.assertionAdditionalInformation()
            detailPage.clickBtnBack()
        })
    )

    qase([2938, 2940],
        it.skip('Delete Data', () => {
            // Navigate to Master Data Publication Page 
            listPublicationPage.navigateToPublicationTab()

            // Delete
            listServicePage.clickBtnAksi()
            listServicePage.clickBtnDelete()
            deleteServicePage.modalsConfirmationDelete()
            deleteServicePage.clickBtnYesDelete()
            deleteServicePage.clickBtnUnderstand()
        })
    )
})
