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
let dataNegative
let filename = "cypress/fixtures/service/publication_store_data.json"

before('Load Data', () => {
    cy.then(Cypress.session.clearCurrentSessionData)
    cy.fixture("credentials.json").then((data) => {
        user = data
    })
    cy.fixture("service/data_negative.json").then((data) => {
        dataNegative = data
    })
})

describe('Service Positive Scenario', { testIsolation: false }, () => {

    it('Login CMS', () => {
        cy.login()
        listServicePage.navigateToServicePage()
        listServicePage.assertServicePage()
    });

    it('Create Master Data Service', () => {
        // Create Master Data Service
        cy.createDataMasterService()
    });

    qase([3301, 3012, 3013, 3057, 3058, 3087, 3088, 3178, 3179, 3188, 3189, 3208, 3209],
        it('Upload the logo using a pdf file', () => {
            // Navigate to Master Data Publication Page 
            listPublicationPage.navigateToPublicationTab()
            listPublicationPage.clickBtnCreateService()
            createServiceMasterPage.assertCreateServicePage()

            // Form 1
            createPublicationPage.chooseService()
            createPublicationPage.assertServiceValueForm1()
            createPublicationPage.uploadLogoService(dataNegative.filePdf)
            createPublicationPage.alertWrongUpload()
            createPublicationPage.chooseServiceCategoryJabarprov()
            createPublicationPage.benefitTitileSection(faker.random.word(2))
            createPublicationPage.benefitFileUpload(dataNegative.filePdf)
            createPublicationPage.alertWrongUpload()
            createPublicationPage.urlCustomPortalJabar('jawa-barat')
            createPublicationPage.clickBtnSaveNext()

            // // Form 2
            createPublicationPage.assertServiceValueForm2()
            // createPublicationPage.coverImageYoutube('https://www.youtube.com/@masjidaljabbar')
            createPublicationPage.coverImageFile(dataNegative.filePdf)
            createPublicationPage.alertWrongUpload()
            createPublicationPage.contentImageMultiple(dataNegative.filePdf)
            createPublicationPage.alertWrongUpload()
            createPublicationPage.termConditionTitleSection(faker.random.word(2))
            createPublicationPage.uploadTermConditionImage(dataNegative.filePdf)
            createPublicationPage.serviceUsageTitleSection(faker.random.word(2))
            createPublicationPage.uploadServiceUsageCover(dataNegative.filePdf)
            createPublicationPage.alertWrongUpload()
            createPublicationPage.uploadInfographicServiceImage(dataNegative.filePdf)
            createPublicationPage.alertWrongUpload()
            createPublicationPage.featureAppsTitleSection(faker.random.word(3))
            createPublicationPage.clickBtnSaveNext()

            // // Form 3
            createPublicationPage.newsKeyword()
            createPublicationPage.assertNewsKeyword()
            createPublicationPage.faqQuestion(faker.lorem.paragraph(), faker.random.word(5), faker.random.word(10))
            createPublicationPage.faqAnswer(faker.lorem.paragraph(), faker.random.word(5), faker.random.word(10))
            createPublicationPage.clickBtnAddService()

            // Cancel Process
            createPublicationPage.clickBtnCancel()
        })
    )

    qase([3301, 3302, 3012, 3013, 3057, 3058, 3087, 3088, 3178, 3179, 3188, 3189, 3208, 3209],
        it('Upload the logo using a docx file', () => {
            // Create Master Data Service
            // cy.createDataMasterService()

            // Navigate to Master Data Publication Page 
            listPublicationPage.navigateToPublicationTab()
            listPublicationPage.clickBtnCreateService()
            createServiceMasterPage.assertCreateServicePage()

            // Form 1
            createPublicationPage.chooseService()
            createPublicationPage.assertServiceValueForm1()
            createPublicationPage.uploadLogoService(dataNegative.fileDocx)
            createPublicationPage.alertWrongUpload()
            createPublicationPage.chooseServiceCategoryJabarprov()
            createPublicationPage.benefitTitileSection(faker.random.word(2))
            createPublicationPage.benefitFileUpload(dataNegative.fileDocx)
            createPublicationPage.alertWrongUpload()
            createPublicationPage.urlCustomPortalJabar('jawa-barat')
            createPublicationPage.clickBtnSaveNext()

            // // Form 2
            createPublicationPage.assertServiceValueForm2()
            // createPublicationPage.coverImageYoutube('https://www.youtube.com/@masjidaljabbar')
            createPublicationPage.coverImageFile(dataNegative.fileDocx)
            createPublicationPage.alertWrongUpload()
            createPublicationPage.contentImageMultiple(dataNegative.fileDocx)
            createPublicationPage.alertWrongUpload()
            createPublicationPage.termConditionTitleSection(faker.random.word(2))
            createPublicationPage.uploadTermConditionImage(dataNegative.fileDocx)
            createPublicationPage.serviceUsageTitleSection(faker.random.word(2))
            createPublicationPage.uploadServiceUsageCover(dataNegative.fileDocx)
            createPublicationPage.alertWrongUpload()
            createPublicationPage.uploadInfographicServiceImage(dataNegative.fileDocx)
            createPublicationPage.alertWrongUpload()
            createPublicationPage.featureAppsTitleSection(faker.random.word(3))
            createPublicationPage.clickBtnSaveNext()

            // // Form 3
            createPublicationPage.newsKeyword()
            createPublicationPage.assertNewsKeyword()
            createPublicationPage.faqQuestion(faker.lorem.paragraph(), faker.random.word(5), faker.random.word(10))
            createPublicationPage.faqAnswer(faker.lorem.paragraph(), faker.random.word(5), faker.random.word(10))
            createPublicationPage.clickBtnAddService()

            // Cancel Process
            createPublicationPage.clickBtnCancel()
        })
    )

    qase([3006, 3026, 3295, 3051, 3081, 3172, 3182, 3202],
        it('Upload files over 5mb', () => {
            // Create Master Data Service
            // cy.createDataMasterService()

            // Navigate to Master Data Publication Page 
            listPublicationPage.navigateToPublicationTab()
            listPublicationPage.clickBtnCreateService()
            createServiceMasterPage.assertCreateServicePage()

            // Form 1
            createPublicationPage.chooseService()
            createPublicationPage.assertServiceValueForm1()
            createPublicationPage.uploadLogoService(dataNegative.fileImg6Mb)
            createPublicationPage.alertFileSize()
            createPublicationPage.chooseServiceCategoryJabarprov()
            createPublicationPage.benefitTitileSection(faker.random.word(2))
            createPublicationPage.benefitFileUpload(dataNegative.fileImg6Mb)
            createPublicationPage.alertFileSize()
            createPublicationPage.urlCustomPortalJabar('jawa-barat')
            createPublicationPage.clickBtnSaveNext()

            // // Form 2
            createPublicationPage.assertServiceValueForm2()
            // createPublicationPage.coverImageYoutube('https://www.youtube.com/@masjidaljabbar')
            createPublicationPage.coverImageFile(dataNegative.fileImg6Mb)
            createPublicationPage.alertFileSize()
            createPublicationPage.contentImageMultiple(dataNegative.fileImg6Mb)
            createPublicationPage.alertFileSize()
            createPublicationPage.termConditionTitleSection(faker.random.word(2))
            createPublicationPage.uploadTermConditionImage(dataNegative.fileImg6Mb)
            createPublicationPage.serviceUsageTitleSection(faker.random.word(2))
            createPublicationPage.uploadServiceUsageCover(dataNegative.fileImg6Mb)
            createPublicationPage.alertFileSize()
            createPublicationPage.uploadInfographicServiceImage(dataNegative.fileImg6Mb)
            createPublicationPage.alertFileSize()
            createPublicationPage.featureAppsTitleSection(faker.random.word(3))
            createPublicationPage.clickBtnSaveNext()

            // // Form 3
            createPublicationPage.newsKeyword()
            createPublicationPage.assertNewsKeyword()
            createPublicationPage.faqQuestion(faker.lorem.paragraph(), faker.random.word(5), faker.random.word(10))
            createPublicationPage.faqAnswer(faker.lorem.paragraph(), faker.random.word(5), faker.random.word(10))
            createPublicationPage.clickBtnAddService()

            // Cancel Process
            createPublicationPage.clickBtnCancel()
        })
    )

    qase([3008, 3297, 3053, 3083, 3174, 3138, 3204],
        it('Upload resolution over 600px', () => {
            // Create Master Data Service
            // cy.createDataMasterService()

            // Navigate to Master Data Publication Page 
            listPublicationPage.navigateToPublicationTab()
            listPublicationPage.clickBtnCreateService()
            createServiceMasterPage.assertCreateServicePage()

            // Form 1
            createPublicationPage.chooseService()
            createPublicationPage.assertServiceValueForm1()
            createPublicationPage.uploadLogoService(dataNegative.fileImg600px)
            createPublicationPage.alertServiceLogoResolution()
            createPublicationPage.chooseServiceCategoryJabarprov()
            createPublicationPage.benefitTitileSection(faker.random.word(2))
            createPublicationPage.benefitFileUpload(dataNegative.fileImg600px)
            createPublicationPage.alertBenefitResolution()
            createPublicationPage.urlCustomPortalJabar('jawa-barat')
            createPublicationPage.clickBtnSaveNext()

            // // Form 2
            createPublicationPage.assertServiceValueForm2()
            // createPublicationPage.coverImageYoutube('https://www.youtube.com/@masjidaljabbar')
            createPublicationPage.coverImageFile(dataNegative.fileImg600px)
            createPublicationPage.alert816x460Resolution()
            createPublicationPage.contentImageMultiple(dataNegative.fileImg600px)
            createPublicationPage.alert816x460Resolution()
            createPublicationPage.termConditionTitleSection(faker.random.word(2))
            createPublicationPage.uploadTermConditionImage(dataNegative.fileImg600px)
            createPublicationPage.alert525x525Resolution()
            createPublicationPage.serviceUsageTitleSection(faker.random.word(2))
            createPublicationPage.uploadServiceUsageCover(dataNegative.fileImg600px)
            createPublicationPage.alert520x650Resolution()
            createPublicationPage.uploadInfographicServiceImage(dataNegative.fileImg600px)
            createPublicationPage.alert525x525Resolution()
            createPublicationPage.featureAppsTitleSection(faker.random.word(3))
            createPublicationPage.clickBtnSaveNext()

            // // Form 3
            createPublicationPage.newsKeyword()
            createPublicationPage.assertNewsKeyword()
            createPublicationPage.faqQuestion(faker.lorem.paragraph(), faker.random.word(5), faker.random.word(10))
            createPublicationPage.faqAnswer(faker.lorem.paragraph(), faker.random.word(5), faker.random.word(10))
            createPublicationPage.clickBtnAddService()

            // Cancel Process
            createPublicationPage.clickBtnCancel()
        })
    )
})
