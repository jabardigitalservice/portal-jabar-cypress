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
let dataUpload


before('Load Data', () => {
    cy.then(Cypress.session.clearCurrentSessionData)
    cy.fixture("landing_page/infographics/data_upload.json").then((data) => {
        dataUpload = data
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

    qase([3439, 3440, 3460, 3482, 3542],
        it('Upload File PDF extension', () => {
            // Navigate to Tab Infographic Banner
            listPage.clickBtnCreateInfografic()
            createPage.assertCreateInfograficPage()

            // Input data 
            createPage.uploadImgDesktop(dataUpload.pdfFile)
            createPage.alertWrongUpload()
            createPage.uploadImgMobile(dataUpload.pdfFile)
            createPage.alertWrongUpload()
            createPage.inputTitleBanner(faker.company.companyName())
            createPage.inputLinkRedirect(faker.image.imageUrl())
            createPage.clickBtnSaveData()
            createPage.clickBtnBack()
        })
    )

    qase([3439, 3440, 3462, 3482, 3484],
        it('Upload File Docx extension', () => {
            // Navigate to Tab Infographic Banner
            listPage.navigateToInfografisBannerTab()
            listPage.clickBtnCreateInfografic()
            createPage.assertCreateInfograficPage()

            // Input data 
            createPage.uploadImgDesktop(dataUpload.wordFile)
            createPage.alertWrongUpload()
            createPage.uploadImgMobile(dataUpload.wordFile)
            createPage.alertWrongUpload()
            createPage.inputTitleBanner(faker.company.companyName())
            createPage.inputLinkRedirect(faker.image.imageUrl())
            createPage.clickBtnSaveData()
            createPage.clickBtnBack()
        })
    )

    qase([3454, 3456],
        it('Upload File 6MB', () => {
            // Navigate to Tab Infographic Banner
            listPage.navigateToInfografisBannerTab()
            listPage.clickBtnCreateInfografic()
            createPage.assertCreateInfograficPage()

            // Input data 
            createPage.uploadImgDesktop(dataUpload.img6Mb)
            createPage.alertResolutionDesktop()
            createPage.uploadImgMobile(dataUpload.img6Mb)
            createPage.alertResolutionMobile()
            createPage.inputTitleBanner(faker.company.companyName())
            createPage.inputLinkRedirect(faker.image.imageUrl())
            createPage.clickBtnSaveData()
            createPage.clickBtnBack()
        })
    )

    qase([3487],
        it('Type Title Infographics Banner > 50 Character', () => {
            // Navigate to Tab Infographic Banner
            listPage.navigateToInfografisBannerTab()
            listPage.clickBtnCreateInfografic()
            createPage.assertCreateInfograficPage()

            // Input data 
            createPage.uploadImgDesktop(dataUpload.img4876x1627)
            createPage.uploadImgMobile(dataUpload.img4876x1627)
            createPage.inputTitleBanner(faker.lorem.paragraph(5))
            createPage.alertTextLimit()
            createPage.inputLinkRedirect(faker.image.imageUrl())
            createPage.clickBtnSaveData()
            createPage.clickBtnBack()
        })
    )

    qase([3488, 3508],
        it('Empty Title and link Redirect', () => {
            // Navigate to Tab Infographic Banner
            listPage.navigateToInfografisBannerTab()
            listPage.clickBtnCreateInfografic()
            createPage.assertCreateInfograficPage()

            // Input data 
            createPage.uploadImgDesktop(dataUpload.img4876x1627)
            createPage.uploadImgMobile(dataUpload.img4876x1627)
            createPage.clickBtnSaveData()
            createPage.clickBtnBack()
        })
    )

    qase([3492, 3509],
        it('Input Title and link with space value', () => {
            // Navigate to Tab Infographic Banner
            listPage.navigateToInfografisBannerTab()
            listPage.clickBtnCreateInfografic()
            createPage.assertCreateInfograficPage()

            // Input data 
            createPage.uploadImgDesktop(dataUpload.img4876x1627)
            createPage.uploadImgMobile(dataUpload.img4876x1627)
            createPage.inputTitleBanner("      ")
            createPage.alertMandatory()
            createPage.inputLinkRedirect("     ")
            createPage.alertMandatory()
            createPage.clickBtnSaveData()
            createPage.clickBtnBack()
        })
    )

    qase([3512],
        it('Input Link Redirect Without Format Link', () => {
            // Navigate to Tab Infographic Banner
            listPage.navigateToInfografisBannerTab()
            listPage.clickBtnCreateInfografic()
            createPage.assertCreateInfograficPage()

            // Input data 
            createPage.uploadImgDesktop(dataUpload.img4876x1627)
            createPage.uploadImgMobile(dataUpload.img4876x1627)
            createPage.inputTitleBanner(faker.company.companyName())
            createPage.inputLinkRedirect("tester Engineer JDS")
            createPage.alertLinkWrong()
            createPage.clickBtnSaveData()
            createPage.clickBtnBack()
        })
    )

    qase([3513],
        it('Input Link Redirect With number input', () => {
            // Navigate to Tab Infographic Banner
            listPage.navigateToInfografisBannerTab()
            listPage.clickBtnCreateInfografic()
            createPage.assertCreateInfograficPage()

            // Input data 
            createPage.uploadImgDesktop(dataUpload.img4876x1627)
            createPage.uploadImgMobile(dataUpload.img4876x1627)
            createPage.inputTitleBanner(faker.company.companyName())
            createPage.inputLinkRedirect("123456789101112")
            createPage.alertLinkWrong()
            createPage.clickBtnSaveData()
            createPage.clickBtnBack()
        })
    )
})