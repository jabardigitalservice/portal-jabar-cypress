import { ListServicePage } from "../../../../support/pages/service/service_list/list.cy";
import { UpdateServiceMasterPage } from "../../../../support/pages/service/service_list/update.cy";
import { ListAgendaPage } from "../../../../support/pages/agenda/list.cy";
import { CreateServiceMasterPage } from "../../../../support/pages/service/service_list/create.cy";
import { LoginPage } from "../../../../support/pages/auth/login_page.cy";
import { DetailServicePage } from "../../../../support/pages/service/service_list/detail.cy";
import { DeleteServicePage } from "../../../../support/pages/service/service_list/delete.cy";
import { qase } from "cypress-qase-reporter/dist/mocha";

const { faker } = require('@faker-js/faker')
let listServicePage = new ListServicePage()
let updatePage = new UpdateServiceMasterPage()
let detailPage = new DetailServicePage()
let deleteServicePage = new DeleteServicePage()
let createPage = new CreateServiceMasterPage()
let agendaPage = new ListAgendaPage()
let loginPage = new LoginPage()
let user
let filename = "cypress/fixtures/service/wizard1_temp_data.json"

before('Load Data', () => {
    // cy.then(Cypress.session.clearCurrentSessionData)
    cy.fixture("credentials.json").then((data) => {
        user = data
    })
})

beforeEach(() => {
    cy.login()
})

describe('Update Scenario', () => {
    qase([2884, 2589, 2592, 2596, 2888, 2890, 2893, 2894, 2895, 2896, 2897, 2898],
        it('Update All Data Multiple - service technical = offline', () => {
            // Create Data 
            listServicePage.navigateToServicePage()
            listServicePage.assertServicePage()
            cy.createDataMasterService()

            // Go to update page
            listServicePage.navigateToServicePage()
            listServicePage.assertServicePage()
            listServicePage.clickBtnAksi()
            listServicePage.clickBtnUbah()

            // Update data form 1
            updatePage.assertUpdateServicePage()
            updatePage.chooseUrusanPemerintahan()
            updatePage.chooseSubUrusanPemerintahan()
            updatePage.chooseBentukLayanan()
            updatePage.jenisLayanan(faker.random.word(2))
            updatePage.subJenisLayanan(faker.random.word(2))
            updatePage.namaLayanan(faker.company.companyName())
            updatePage.namaProgramLayanan(faker.random.word(2))
            updatePage.deskripsiLayanan(faker.lorem.paragraph())
            updatePage.penggunaLayanan()
            updatePage.statusOperasional()
            updatePage.teknisLayanan()
            updatePage.manfaatLayananMultiple()
            updatePage.alamatWebsiteInformasiResmi(faker.image.imageUrl())
            updatePage.tautanLayananMultiple()
            updatePage.fasilitasLayananUpdate()
            updatePage.syaratKetentuanMultiple()
            updatePage.prosedurLayanan()
            updatePage.tarifLayanan()
            updatePage.waktuOperasionalSenin('07:00', '08:00')
            updatePage.waktuOperasionalSelasa('08:00', '14:00')
            updatePage.contactHotlinePhone('082270008376')
            updatePage.contactHotlineEmail(faker.internet.email())
            updatePage.lokasiPelayananMultiple()
            updatePage.clickBtnSimpanLanjutkan()

            // Form 2
            updatePage.clickBtnSimpanLanjutkan2()

            // Form 3
            updatePage.namaPenanggungJawab(faker.random.word(2))
            updatePage.nomorHp('082276662536')
            updatePage.alamatEmail(faker.internet.email())
            updatePage.socialMediaMultiple()
            updatePage.clickBtnSimpanPerubahan()
            updatePage.clickBtnSaveCreateService()
            updatePage.clickBtnUnderstand()
            cy.wait(3000)
        })
    )

    qase([2861, 2862, 2863, 2869, 2873],
        it('Assertion Data in Detail Page, Service Technical == Offline', () => {
            listServicePage.navigateToServicePage()
            listServicePage.assertServicePage()

            // Go to detail page
            listServicePage.clickBtnAksi()
            listServicePage.clickBtnDetail()
            detailPage.assertDetailPage()

            // Assert Service Tab
            detailPage.assertServiceData()
            // Assert Application Tab
            detailPage.clickApplicationTab()
            detailPage.assertionApplicationData()
            // // Assert Additional Information Tab
            detailPage.clickAdditionalInformationTab()
        })
    )

    qase([2882],
        it('Delete Data', () => {
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
