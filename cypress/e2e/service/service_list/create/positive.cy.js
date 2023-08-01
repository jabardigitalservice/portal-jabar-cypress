import { ListServicePage } from "../../../../support/pages/service/service_list/list.cy";
import { CreateServiceMasterPage } from "../../../../support/pages/service/service_list/create.cy";
import { LoginPage } from "../../../../support/pages/auth/login_page.cy";
import { DeleteServicePage } from "../../../../support/pages/service/service_list/delete.cy";
import { qase } from "cypress-qase-reporter/dist/mocha";

const { faker } = require('@faker-js/faker')
let listServicePage = new ListServicePage()
let createServiceMasterPage = new CreateServiceMasterPage()
let loginPage = new LoginPage()
let deleteServicePage = new DeleteServicePage()
let user
let filename = "cypress/fixtures/service/wizard1_temp_data.json"

before('Load Data', () => {
    cy.then(Cypress.session.clearCurrentSessionData)
    cy.fixture("credentials.json").then((data) => {
        user = data
    })
})

describe('Service Positive Scenario', { testIsolation: false }, () => {

    it('Login CMS', () => {
        cy.login()
        listServicePage.navigateToServicePage()
        listServicePage.assertServicePage()
    });

    qase([2585, 2587, 2590, 2594, 2597, 2598, 2607, 2613, 2618, 2623, 2625, 2627, 2629, 2631, 2633, 2638, 2646, 2653, 2655, 2661, 2666, 2669, 2674, 2675, 2680, 2682, 2696, 2703, 2716, 2723, 2757, 2765, 2764, 2768, 2774, 2779, 2790, 2794, 2801, 2813, 2823, 2825, 2831],
        it('Create Master Data Layanan Teknis == Offline', () => {
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
            // createServiceMasterPage.specialDescription("ini link https://persib.co.id")
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
            // createServiceMasterPage.clickBtnTambahkanLayanan()
            // createServiceMasterPage.clickBtnSaveCreateService()
            // createServiceMasterPage.clickBtnUnderstand()
            cy.wait(3000)

            // Delete
            // listServicePage.clickBtnAksi()
            // listServicePage.clickBtnDelete()
            // deleteServicePage.modalsConfirmationDelete()
            // deleteServicePage.clickBtnYesDelete()
            // deleteServicePage.clickBtnUnderstand()
            // cy.readFile(filename).then((object) => {
            //     agendaPage.searchAgenda(object.namaLayanan)
            // })
            // agendaPage.assertNullDataTable()
        })
    )
})
