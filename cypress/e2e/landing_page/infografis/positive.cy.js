import { ListInfografisBannerPage } from "../../../support/pages/infografis/list.cy"
import { CreateInfograficBannerPage } from "../../../support/pages/infografis/create.cy"
import { DetailInfographicsBannerPage } from "../../../support/pages/infografis/detail.cy";
import { UpdateInfographicsBannerPage } from "../../../support/pages/infografis/update.cy";
import { DeleteInfographicsPage } from "../../../support/pages/infografis/delete.cy";
import { qase } from "cypress-qase-reporter/dist/mocha";

const { faker } = require('@faker-js/faker')
let listPage = new ListInfografisBannerPage()
let createPage = new CreateInfograficBannerPage()
let detailPage = new DetailInfographicsBannerPage()
let updatePage = new UpdateInfographicsBannerPage()
let deletePage = new DeleteInfographicsPage()
let dataImage

before('Load Data', () => {
    // cy.then(Cypress.session.clearCurrentSessionData)
    cy.fixture("landing_page/infographics/data_upload.json").then((data) => {
        dataImage = data
    })
})

beforeEach('', () => {
    cy.intercept({ resourceType: /xhr|fetch/ }, { log: false })
})

describe('Infografis Banner', { testIsolation: false }, () => {
    it('Login & Navigate to infografis banner', () => {
        cy.login()
        listPage.navigateToLandingPageMenu()
        listPage.navigateToInfografisBannerTab()
    });

    qase([3439, 3440, 3441, 2443, 3457, 3458, 3474, 3479, 3480, 3485, 3506, 3538, 3542, 3547],
        it('Add Banner Infografis', () => {
            cy.createInfographicsBanner()
        })
    )

    qase([3697, 3704, 3709, 3716, 3700],
        it('Assertion Data Create in Detail', () => {
            // Navigate to infographics tab
            listPage.navigateToInfografisBannerTab()

            // Go to Detail Page
            listPage.clickBtnAksi()
            listPage.clickBtnDetail()
            detailPage.assertDetailPage()
            detailPage.assertDataDetail()
            detailPage.clickBtnBack()
        })
    )

    qase([3610, 3553, 3554, 3555, 3556,],
        it('Update Data', () => {
            // Navigate to infographics tab
            listPage.navigateToInfografisBannerTab()

            // Go to update page
            listPage.clickBtnAksi()
            listPage.clickBtnUbah()
            updatePage.assertUpdateInfographicsPage()
            cy.wait(3000)

            // input data
            updatePage.removeImgDesktop()
            updatePage.uploadImgDesktop(dataImage.img4876x1627)
            updatePage.removeImgMobile()
            updatePage.uploadImgMobile(dataImage.img4876x1627)
            updatePage.inputTitleBanner(faker.company.companyName())
            updatePage.inputLinkRedirect(faker.image.imageUrl())

            updatePage.clickBtnSaveData()
            updatePage.btnYesSaveModalsConfirmation()
            updatePage.btnUnderstand()

            // Assertion in List Data Infografis Banner
            listPage.navigateToInfografisBannerTab()
            listPage.assertNewData()
        })
    )

    qase([3697, 3704, 3709, 3716, 3700],
        it('Assertion Data Update in Detail', () => {
            // Navigate to infographics tab
            listPage.navigateToInfografisBannerTab()

            // Go to Detail Page
            listPage.clickBtnAksi()
            listPage.clickBtnDetail()
            detailPage.assertDetailPage()
            detailPage.assertDataDetail()
            detailPage.clickBtnBack()
        })
    )
    qase([3724],
        it('Delete Data Infographics', () => {
            listPage.navigateToInfografisBannerTab()
            listPage.clickBtnAksi()
            listPage.clickBtnDelete()
            deletePage.modalsConfirmationDelete()
            deletePage.clickBtnYesDelete()
            deletePage.clickBtnUnderstand()
        })
    )

    // Add Infographics - Toogle Link redirect not active
    qase([3439, 3440, 3441, 2443, 3458, 3474, 3479, 3480, 3485, 3506, 3538, 3542, 3547, 3552],
        it('Added new banner infographic - toggle redirect link inactive', () => {
            // Navigate to Tab Infographic Banner
            listPage.clickBtnCreateInfografic()
            createPage.assertCreateInfograficPage()

            // Input data 
            createPage.uploadImgDesktop(dataImage.img4876x1627)
            createPage.uploadImgMobile(dataImage.img4876x1627)
            createPage.inputTitleBanner(faker.company.companyName())
            createPage.activeToogleLink()
            // createPage.inputLinkRedirect(faker.image.imageUrl())
            createPage.clickBtnSaveData()
            createPage.btnYesSaveModalsConfirmation()
            createPage.btnUnderstand()

            // Assertion in List Data Infografis Banner
            listPage.navigateToInfografisBannerTab()
            // listPage.assertNewData()
        })
    )
})