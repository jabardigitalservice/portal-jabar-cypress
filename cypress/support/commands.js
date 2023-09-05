// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import 'cypress-file-upload';

import 'cypress-file-upload';
import { ListServicePage } from './pages/service/service_list/list.cy';
import { CreateServiceMasterPage } from './pages/service/service_list/create.cy';
import { CreateInfograficBannerPage } from './pages/infografis/create.cy';
import { LoginPage } from './pages/auth/login_page.cy';
import { ListInfografisBannerPage } from './pages/infografis/list.cy';
import { qase } from "cypress-qase-reporter/dist/mocha";

const { faker } = require('@faker-js/faker')
let listServicePage = new ListServicePage()
let listInfographicsPage = new ListInfografisBannerPage()
let createServiceMasterPage = new CreateServiceMasterPage()
let createInfographicPage = new CreateInfograficBannerPage()
let loginPage = new LoginPage()
let user
let dataImage

before('Load Data', () => {
    cy.then(Cypress.session.clearCurrentSessionData)
    cy.fixture("landing_page/infographics/data_upload.json").then((data) => {
        dataImage = data
    })
})

Cypress.Commands.add('login', () => {
    cy.fixture("credentials.json").then((data) => {
        user = data
        loginPage.navigateLoginPage()
        loginPage.enterEmail(user.email)
        loginPage.enterPassword(user.password)
        loginPage.clickBtnMasuk()
        loginPage.loadCmsPage()
    })
})

Cypress.Commands.add('loginPreview', () => {
    cy.fixture("credentials.json").then((data) => {
        user = data
        loginPage.navigateLoginPagePreview()
        loginPage.enterEmail(user.email)
        loginPage.enterPassword(user.password)
        loginPage.clickBtnMasuk()
        loginPage.loadCmsPage()
    })
})

qase([2585, 2587, 2590, 2594, 2597, 2598, 2607, 2613, 2618, 2623, 2625, 2627, 2629, 2631, 2633, 2638, 2646, 2653, 2655, 2661, 2666, 2669, 2674, 2675, 2680, 2682, 2696, 2703, 2716, 2723, 2757, 2765, 2764, 2768, 2774, 2779, 2790, 2794, 2801, 2813, 2823, 2825, 2831],
    Cypress.Commands.add('createDataMasterService', () => {
        listServicePage.clickBtnCreateService()
        createServiceMasterPage.assertCreateServicePage()
        // input data
        createServiceMasterPage.chooseUrusanPemerintahan()
        createServiceMasterPage.chooseSubUrusanPemerintahan()
        createServiceMasterPage.chooseBentukLayanan()
        createServiceMasterPage.jenisLayanan(faker.random.word(2))
        createServiceMasterPage.namaLayanan(faker.company.companyName())
        createServiceMasterPage.namaProgramLayanan(faker.random.word(2))
        createServiceMasterPage.deskripsiLayanan(faker.lorem.paragraph())
        createServiceMasterPage.penggunaLayanan()
        createServiceMasterPage.kategoriRal()
        createServiceMasterPage.statusOperasional()
        createServiceMasterPage.teknisLayanan()
        // createServiceMasterPage.manfaatLayanan(faker.random.word(2))
        createServiceMasterPage.manfaatLayananMultiple()
        // createServiceMasterPage.fasilitasLayanan()
        createServiceMasterPage.alamatWebsiteInformasiResmi(faker.image.imageUrl())
        createServiceMasterPage.tautanLayananMultiple()
        createServiceMasterPage.syaratKetentuanMultiple()
        createServiceMasterPage.prosedurLayananMultiple()
        createServiceMasterPage.tarifLayanan()
        // createServiceMasterPage.tarifLayananRange()
        // createServiceMasterPage.specialDescription(faker.random.word(3))
        createServiceMasterPage.waktuOperasionalSenin('06:00', '07:00')
        createServiceMasterPage.waktuOperasionalSelasa('07:00', '15:00')
        createServiceMasterPage.contactHotlinePhone('089928883746')
        createServiceMasterPage.contactHotlineEmail(faker.internet.email())
        createServiceMasterPage.lokasiPelayananMultiple()
        createServiceMasterPage.clickBtnSimpanLanjutkan()

        // Wizard 2
        createServiceMasterPage.statusKetersediaanAplikasi('Tersedia')
        createServiceMasterPage.namaAplikasi(faker.random.word(2))
        createServiceMasterPage.fiturAplikasiMultiple()
        createServiceMasterPage.clickBtnSimpanLanjutkan2()

        // Wizard 3
        createServiceMasterPage.namaPenanggungJawab(faker.random.word(2))
        createServiceMasterPage.nomorHp('087767773848')
        createServiceMasterPage.alamatEmail(faker.internet.email())
        createServiceMasterPage.socialMediaMultiple()
        createServiceMasterPage.clickBtnTambahkanLayanan()
        createServiceMasterPage.clickBtnSaveCreateService()
        createServiceMasterPage.clickBtnUnderstand()

        // Delete
        // listServicePage.clickBtnAksi()
        // listServicePage.clickBtnDelete()
        // deleteServicePage.modalsConfirmationDelete()
        // deleteServicePage.clickBtnYesDelete()
        // deleteServicePage.clickBtnUnderstand()
        cy.wait(3000)
    })
)

Cypress.Commands.add('createInfographicsBanner', () => {
    // Navigate to Tab Infographic Banner
    listInfographicsPage.clickBtnCreateInfografic()
    createInfographicPage.assertCreateInfograficPage()

    // Input data 
    createInfographicPage.uploadImgDesktop(dataImage.img4876x1627)
    createInfographicPage.uploadImgMobile(dataImage.img4876x1627)
    createInfographicPage.inputTitleBanner(faker.company.companyName())
    createInfographicPage.inputLinkRedirect(faker.image.imageUrl())
    createInfographicPage.clickBtnSaveData()
    createInfographicPage.btnYesSaveModalsConfirmation()
    createInfographicPage.btnUnderstand()

    // Assertion in List Data Infografis Banner
    listInfographicsPage.navigateToInfografisBannerTab()
    listInfographicsPage.assertNewData()
})