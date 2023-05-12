import { ListServicePage } from "../../../../support/pages/service/service_list/list.cy";
import { UpdateServiceMasterPage } from "../../../../support/pages/service/service_list/update.cy";
import { ListAgendaPage } from "../../../../support/pages/agenda/list.cy";
import { CreateServiceMasterPage } from "../../../../support/pages/service/service_list/create.cy";
import { LoginPage } from "../../../../support/pages/auth/login_page.cy";
import { DeleteServicePage } from "../../../../support/pages/service/service_list/delete.cy";
import { qase } from "cypress-qase-reporter/dist/mocha";

const { faker } = require('@faker-js/faker')
let listServicePage = new ListServicePage()
let updatePage = new UpdateServiceMasterPage()
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
    // Login Phase
    loginPage.navigateLoginPage()
    loginPage.enterEmail(user.email)
    loginPage.enterPassword(user.password)
    loginPage.clickBtnMasuk()
    loginPage.loadCmsPage()

    // Go to update page
    listServicePage.navigateToServicePage()
    listServicePage.assertServicePage()
    listServicePage.clickBtnAksi()
    listServicePage.clickBtnUbah()
})

describe('Update Scenario', () => {
    qase([2884, 2589, 2592, 2596],
        it('Update All Data Multiple - service technical = offline', () => {
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
        })
    )
})
