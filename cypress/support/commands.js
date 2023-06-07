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
import { ListServicePage } from './pages/service/service_list/list.cy';
import { CreateServiceMasterPage } from './pages/service/service_list/create.cy';
import { LoginPage } from './pages/auth/login_page.cy';

const { faker } = require('@faker-js/faker')
let listServicePage = new ListServicePage()
let createServiceMasterPage = new CreateServiceMasterPage()
let loginPage = new LoginPage()
let user

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