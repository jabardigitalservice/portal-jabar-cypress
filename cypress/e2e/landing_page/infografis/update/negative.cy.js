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
let dataUpload


before('Load Data', () => {
    // cy.then(Cypress.session.clearCurrentSessionData)
    cy.fixture("landing_page/infographics/data_upload.json").then((data) => {
        dataUpload = data
    })
})

describe('Update Infographics Banner Negative Scenario', { testIsolation: false }, () => {
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

    // qase([3554, 3555,],
    //     it('Update Data', () => {
    //         // Navigate to infographics tab
    //         listPage.navigateToInfografisBannerTab()

    //         // Go to update page
    //         listPage.clickBtnAksi()
    //         listPage.clickBtnUbah()
    //         updatePage.assertUpdateInfographicsPage()

    //         // input data
    //         updatePage.removeImgDesktop()
    //         updatePage.uploadImgDesktop(dataImage.img4876x1627)
    //         updatePage.removeImgMobile()
    //         updatePage.uploadImgMobile(dataImage.img4876x1627)
    //         updatePage.inputTitleBanner(faker.company.companyName())
    //         createPage.activeToogleLink()
    //         updatePage.inputLinkRedirect(faker.image.imageUrl())

    //         updatePage.clickBtnSaveData()
    //         updatePage.btnYesSaveModalsConfirmation()
    //         updatePage.btnUnderstand()

    //         // Assertion in List Data Infografis Banner
    //         listPage.navigateToInfografisBannerTab()
    //         listPage.assertNewData()
    //     })
    // )

    qase([3565, 3570],
        it.skip('Ubah image banner desktop dengan ukuran file >2MB', () => {
            // Navigate to infographics tab
            listPage.navigateToInfografisBannerTab()

            // Go to update page
            listPage.clickBtnAksi()
            listPage.clickBtnUbah()
            updatePage.assertUpdateInfographicsPage()

            // input data
            updatePage.removeImgDesktop()
            updatePage.uploadImgDesktop(dataUpload.img6Mb)
            createPage.alertResolutionDesktop()
            updatePage.removeImgMobile()
            updatePage.uploadImgMobile(dataUpload.img6Mb)
            createPage.alertResolutionMobile()
            updatePage.inputTitleBanner(faker.company.companyName())
            updatePage.inputLinkRedirect(faker.image.imageUrl())

            updatePage.clickBtnSaveData()
            createPage.clickBtnBack()
        })
    )

    qase([3567, 3572],
        it.skip('Ubah image menggunakan file PDF', () => {
            // Navigate to infographics tab
            listPage.navigateToInfografisBannerTab()

            // Go to update page
            listPage.clickBtnAksi()
            listPage.clickBtnUbah()
            updatePage.assertUpdateInfographicsPage()

            // input data
            updatePage.removeImgDesktop()
            updatePage.uploadImgDesktop(dataUpload.pdfFile)
            createPage.alertWrongUpload()
            updatePage.removeImgMobile()
            updatePage.uploadImgMobile(dataUpload.pdfFile)
            createPage.alertWrongUpload()
            updatePage.inputTitleBanner(faker.company.companyName())
            updatePage.inputLinkRedirect(faker.image.imageUrl())

            updatePage.clickBtnSaveData()
            createPage.clickBtnBack()
        })
    )

    qase([3569, 3574],
        it.skip('Ubah image banner desktop menggunakan file DOCX', () => {
            // Navigate to infographics tab
            listPage.navigateToInfografisBannerTab()

            // Go to update page
            listPage.clickBtnAksi()
            listPage.clickBtnUbah()
            updatePage.assertUpdateInfographicsPage()

            // input data
            updatePage.removeImgDesktop()
            updatePage.uploadImgDesktop(dataUpload.wordFile)
            createPage.alertWrongUpload()
            updatePage.removeImgMobile()
            updatePage.uploadImgMobile(dataUpload.wordFile)
            createPage.alertWrongUpload()
            updatePage.inputTitleBanner(faker.company.companyName())
            updatePage.inputLinkRedirect(faker.image.imageUrl())

            updatePage.clickBtnSaveData()
            createPage.clickBtnBack()
        })
    )

    qase([3575],
        it.skip('Ubah judul popup banner dengan > 50 karakter', () => {
            // Navigate to infographics tab
            listPage.navigateToInfografisBannerTab()

            // Go to update page
            listPage.clickBtnAksi()
            listPage.clickBtnUbah()
            updatePage.assertUpdateInfographicsPage()

            // input data
            updatePage.removeImgDesktop()
            updatePage.uploadImgDesktop(dataUpload.img4876x1627)
            updatePage.removeImgMobile()
            updatePage.uploadImgMobile(dataUpload.img4876x1627)
            updatePage.inputTitleBanner(faker.lorem.paragraph(5))
            createPage.alertTextLimit()
            updatePage.inputLinkRedirect(faker.image.imageUrl())

            updatePage.clickBtnSaveData()
            createPage.clickBtnBack()
        })
    )

    qase([3576],
        it.skip('Ubah judul popup dengan mengosongkan field', () => {
            // Navigate to infographics tab
            listPage.navigateToInfografisBannerTab()

            // Go to update page
            listPage.clickBtnAksi()
            listPage.clickBtnUbah()
            updatePage.assertUpdateInfographicsPage()

            // input data
            updatePage.removeImgDesktop()
            updatePage.uploadImgDesktop(dataUpload.img4876x1627)
            updatePage.removeImgMobile()
            updatePage.uploadImgMobile(dataUpload.img4876x1627)
            updatePage.inputTitleBanner(" ")
            createPage.alertMandatory()
            updatePage.inputLinkRedirect(faker.image.imageUrl())

            updatePage.clickBtnSaveData()
            createPage.clickBtnBack()
        })
    )

    qase([3586],
        it.skip('Ubah link redirect menggunakan spasi saja', () => {
            // Navigate to infographics tab
            listPage.navigateToInfografisBannerTab()

            // Go to update page
            listPage.clickBtnAksi()
            listPage.clickBtnUbah()
            updatePage.assertUpdateInfographicsPage()

            // input data
            updatePage.removeImgDesktop()
            updatePage.uploadImgDesktop(dataUpload.img4876x1627)
            updatePage.removeImgMobile()
            updatePage.uploadImgMobile(dataUpload.img4876x1627)
            updatePage.inputTitleBanner(faker.random.word(3))
            updatePage.inputLinkRedirect(" ")
            createPage.alertMandatory()

            updatePage.clickBtnSaveData()
            createPage.clickBtnBack()
        })
    )

    qase([3588],
        it.skip('Ubah link redirect tidak menggunakan format', () => {
            // Navigate to infographics tab
            listPage.navigateToInfografisBannerTab()

            // Go to update page
            listPage.clickBtnAksi()
            listPage.clickBtnUbah()
            updatePage.assertUpdateInfographicsPage()

            // input data
            updatePage.removeImgDesktop()
            updatePage.uploadImgDesktop(dataUpload.img4876x1627)
            updatePage.removeImgMobile()
            updatePage.uploadImgMobile(dataUpload.img4876x1627)
            updatePage.inputTitleBanner(faker.random.word(3))
            updatePage.inputLinkRedirect(faker.random.word(2))
            createPage.alertLinkWrong()

            updatePage.clickBtnSaveData()
            createPage.clickBtnBack()
        })
    )

    qase([3589],
        it.skip('Ubah link redirect dengan angka saja', () => {
            // Navigate to infographics tab
            listPage.navigateToInfografisBannerTab()

            // Go to update page
            listPage.clickBtnAksi()
            listPage.clickBtnUbah()
            updatePage.assertUpdateInfographicsPage()

            // input data
            updatePage.removeImgDesktop()
            updatePage.uploadImgDesktop(dataUpload.img4876x1627)
            updatePage.removeImgMobile()
            updatePage.uploadImgMobile(dataUpload.img4876x1627)
            updatePage.inputTitleBanner(faker.random.word(3))
            updatePage.inputLinkRedirect("123455")
            createPage.alertLinkWrong()

            updatePage.clickBtnSaveData()
            createPage.clickBtnBack()
        })
    )

    qase([3724],
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