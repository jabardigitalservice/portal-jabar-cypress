import { ListInfografisBannerPage } from "../../../../support/pages/infografis/list.cy";
import { CreateInfograficBannerPage } from "../../../../support/pages/infografis/create.cy";
import { DetailInfographicsBannerPage } from "../../../../support/pages/infografis/detail.cy";
import { UpdateInfographicsBannerPage } from "../../../../support/pages/infografis/update.cy";
import { DeleteInfographicsPage } from "../../../../support/pages/infografis/delete.cy";
import { qase } from "cypress-qase-reporter/dist/mocha";

const { faker } = require('@faker-js/faker')
let listPage = new ListInfografisBannerPage()
let createPage = new CreateInfograficBannerPage()
let detailPage = new DetailInfographicsBannerPage()
let updatePage = new UpdateInfographicsBannerPage()
let deletePage = new DeleteInfographicsPage()
let dataImage


before('Load Data', () => {
    cy.then(Cypress.session.clearCurrentSessionData)
    cy.fixture("landing_page/infographics/data_upload.json").then((data) => {
        dataImage = data
    })
})

describe('Update Infographics Banner Positive Scenario', { testIsolation: false }, () => {
    it.skip('Login & Navigate to infografis banner', () => {
        cy.login()
        listPage.navigateToLandingPageMenu()
        listPage.navigateToInfografisBannerTab()
    });

    qase([3439, 3440, 3441, 2443, 3457, 3458, 3474, 3479, 3480, 3485, 3506, 3538, 3542, 3547],
        it.skip('Add Banner Infografis', () => {
            cy.createInfographicsBanner()
        })
    )

    qase([3554, 3555,],
        it.skip('Update Data', () => {
            // Navigate to infographics tab
            listPage.navigateToInfografisBannerTab()

            // Go to update page
            listPage.clickBtnAksi()
            listPage.clickBtnUbah()
            updatePage.assertUpdateInfographicsPage()

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

    qase([],
        it.skip('Assertion Data Update in Detail', () => {
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

    // Update Infographics - Toogle Link redirect not active
    qase([3554, 3555,],
        it.skip('Change the redirect link toggle to non-active', () => {
            // Navigate to infographics tab
            listPage.navigateToInfografisBannerTab()

            // Go to update page
            listPage.clickBtnAksi()
            listPage.clickBtnUbah()
            updatePage.assertUpdateInfographicsPage()

            // input data
            updatePage.removeImgDesktop()
            updatePage.uploadImgDesktop(dataImage.img4876x1627)
            updatePage.removeImgMobile()
            updatePage.uploadImgMobile(dataImage.img4876x1627)
            updatePage.inputTitleBanner(faker.company.companyName())
            createPage.activeToogleLink()
            // updatePage.inputLinkRedirect(faker.image.imageUrl())

            updatePage.clickBtnSaveData()
            updatePage.btnYesSaveModalsConfirmation()
            updatePage.btnUnderstand()

            // Assertion in List Data Infografis Banner
            listPage.navigateToInfografisBannerTab()
            // listPage.assertNewData()
        })
    )

    qase([3554, 3555,],
        it.skip('Check default toogle link is nonactive', () => {
            // Navigate to infographics tab
            listPage.navigateToInfografisBannerTab()

            // Go to update page
            listPage.clickBtnAksi()
            listPage.clickBtnUbah()
            updatePage.assertUpdateInfographicsPage()

            updatePage.clickBtnSaveData()
            updatePage.btnYesSaveModalsConfirmation()
            updatePage.btnUnderstand()

            // Assertion in List Data Infografis Banner
            listPage.navigateToInfografisBannerTab()
            // listPage.assertNewData()
        })
    )

    qase([],
        it.skip('Delete Data Infographics', () => {
            listPage.navigateToInfografisBannerTab()
            listPage.clickBtnAksi()
            listPage.clickBtnDelete()
            deletePage.modalsConfirmationDelete()
            deletePage.clickBtnYesDelete()
            deletePage.clickBtnUnderstand()
        })
    )
})