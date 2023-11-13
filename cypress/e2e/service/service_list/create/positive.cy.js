import { ListServicePage } from "../../../../support/pages/service/service_list/list.cy";
import { CreateServiceMasterPage } from "../../../../support/pages/service/service_list/create.cy";
import { LoginPage } from "../../../../support/pages/auth/login_page.cy";
import { DeleteServicePage } from "../../../../support/pages/service/service_list/delete.cy";
import { DetailServicePage } from "../../../../support/pages/service/service_list/detail.cy";
import { qase } from "cypress-qase-reporter/dist/mocha";

const { faker } = require('@faker-js/faker')
let listServicePage = new ListServicePage()
let createServiceMasterPage = new CreateServiceMasterPage()
let loginPage = new LoginPage()
let deleteServicePage = new DeleteServicePage()
let detailPage = new DetailServicePage()
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
            createServiceMasterPage.clickBtnTambahkanLayanan()
            createServiceMasterPage.clickBtnSaveCreateService()
            createServiceMasterPage.clickBtnUnderstand()
            cy.wait(3000)
        })
    )

    qase([4201, 4205, 4213, 4202],
        it('Search Data & Clear', () => {
            cy.readFile(filename).then((object) => {
                listServicePage.search(object.namaLayanan)
            })
        }),

        qase([4211],
            it('Remove search keywords (use backspace)', () => {
                cy.readFile(filename).then((object) => {
                    listServicePage.search(object.namaLayanan)
                    cy.wait(5000)
                })
                listServicePage.assertSearchValid()
                listServicePage.deleteKeywordSearch()
                listServicePage.assertRowDefault()
            })
        ),

        qase([4210],
            it('Search With 1 Character', () => {
                listServicePage.search('a')
                listServicePage.assertRowDefault()
                listServicePage.clearSearch()
                listServicePage.assertRowDefault()
            })
        ),

        qase([4203],
            it('Search With 2 Character', () => {
                listServicePage.search('ai')
                listServicePage.assertRowDefault()
                listServicePage.clearSearch()
                listServicePage.assertRowDefault()
            })
        ),

        qase([4204],
            it('Invalid 3 character search', () => {
                listServicePage.search('aiaa')
                listServicePage.assertSearchNotFound()
                listServicePage.clearSearch()
                listServicePage.assertRowDefault()
            })
        ),

        qase([4206],
            it('Invalid > 3 character search', () => {
                listServicePage.search('aiaaaa')
                listServicePage.assertSearchNotFound()
                listServicePage.clearSearch()
                listServicePage.assertRowDefault()
            })
        ),

        qase([4214],
            it('Search with keywords space only', () => {
                listServicePage.search('   ')
                listServicePage.assertRowDefault()
                listServicePage.deleteKeywordSearch()
                listServicePage.assertRowDefault()
            })
        ),
    )

    qase([2861, 2862, 2863, 2869, 2873],
        it('Assertion Detail Page', () => {
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
            detailPage.assertionAdditionalInfoData()
        })
    )

    it.skip('Delete Data', () => {
        listServicePage.clickBtnAksi()
        listServicePage.clickBtnDelete()
        deleteServicePage.modalsConfirmationDelete()
        deleteServicePage.clickBtnYesDelete()
        deleteServicePage.clickBtnUnderstand()
    })
})
