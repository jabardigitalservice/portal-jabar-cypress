import create_service from "../../../selectors/service/service_list/create";
import create from "../../../selectors/service/service_publication/create";
import { DeleteServicePage } from "../service_list/delete.cy";

const { faker } = require('@faker-js/faker')
const dataWizard1 = "cypress/fixtures/service/wizard1_temp_data.json"
const dataMasterService = "cypress/fixtures/service/data_tes.json"
const dataPublication = "cypress/fixtures/service/publication_data.json"
const data = faker.random.word(2)
const data2 = faker.random.word(3)
const data3 = faker.random.word(2)
const deleteServicePage = new DeleteServicePage()

export class CreatePublicationServicePage {
    assertCreateServicePage() {
        const wizard1 = cy.xpath(create_service.titleWizard1).as('titleWizard1')
        wizard1.should("have.class", "flex flex-col form-stepper--active")
            .and('contain', 'Informasi dasar untuk landing page')
    }

    chooseService() {
        cy.readFile(dataMasterService).then((object) => {
            cy.get("span.mb-3 div.jds-popover__activator input").click();
            cy.get("span.mb-3 div.jds-popover__content input").click();
            cy.get("span.mb-3 div.jds-popover__content input").type(object.namaLayanan);
            cy.get("span.mb-3 li").click();
            cy.wait(2000)
        })
    }

    assertServiceValueForm1() {
        cy.readFile(dataMasterService).then((object) => {
            const opdName = cy.xpath(create.opdName)
            const serviceType = cy.xpath(create.serviceType)
            const serviceName = cy.xpath(create.serviceName)
            const serviceDescription = cy.xpath(create.serviceDescription)
            const serviceUser = cy.xpath(create.serviceUser)
            const serviceProgramName = cy.xpath(create.serviceProgramName)
            const operationalStatus = cy.xpath(create.operationalStatus)
            const serviceTechnical = cy.xpath(create.serviceTechnical)
            const benefitValue1 = cy.xpath(create.benefitValue1)
            const benefitValue2 = cy.xpath(create.benefitValue2)
            const benefitValue3 = cy.xpath(create.benefitValue3)
            const officialWebsite = cy.xpath(create.officialWebsite)
            const lower = object.bentukLayanan.toLowerCase()
            const lowerServiceUser = object.penggunaLayanan.toLowerCase()
            const lowerServiceTechnical = object.teknisLayanan.toLowerCase()

            serviceType.invoke('val').then((text) => {
                expect(object.bentukLayanan.charAt(0).toUpperCase() + lower.slice(1)).to.equal(text)
            })

            serviceName.invoke('val').then((text) => {
                expect(object.namaLayanan).to.equal(text)
            })

            serviceDescription.invoke('val').then((text) => {
                expect(object.deskripsiLayanan).to.equal(text)
            })

            serviceUser.invoke('val').then((text) => {
                expect(object.penggunaLayanan.charAt(0).toUpperCase() + lowerServiceUser.slice(1)).to.equal(text)
            })

            serviceProgramName.invoke('val').then((text) => {
                expect(object.namaProgramLayanan).to.equal(text)
            })

            operationalStatus.invoke('val').then((text) => {
                expect(object.statusOperasional).to.equal(text)
            })

            serviceTechnical.invoke('val').then((text) => {
                expect(object.teknisLayanan.charAt(0).toUpperCase() + lowerServiceTechnical.slice(1)).to.equal(text)
            })

            // Service Benefit 
            benefitValue1.invoke('val').then((text) => {
                expect(object.manfaatLayanan1).to.equal(text)
            })

            benefitValue2.invoke('val').then((text) => {
                expect(object.manfaatLayanan2).to.equal(text)
            })

            benefitValue3.invoke('val').then((text) => {
                expect(object.manfaatLayanan3).to.equal(text)
            })

            officialWebsite.invoke('val').then((text) => {
                expect(object.alamatWebsite).to.equal(text)
            })
        })
    }

    uploadLogoService() {
        const fileUpload = 'Test_data.pdf'
        const fileUploadJpg = 'A.jpg'
        const fileUploadPng = 'service/img_200px.png'
        cy.get("#service-logo").attachFile(fileUploadPng)
        cy.wait(2000)
    }

    chooseServiceCategoryJabarprov() {
        cy.get("span:nth-of-type(8) div.jds-popover__activator input").click();
        cy.get("span:nth-of-type(8) li:nth-of-type(1) > span").click(); // Kependudukan & Tempat Tinggal
    }

    benefitTitileSection(text) {
        const title = cy.xpath(create.benefitTitleSection)
        cy.writeFile(dataPublication, { serviceBenefitsTitle: text })
        title.clear().type(text)

    }

    benefitFileUpload() {
        const fileUpload = 'Test_data.pdf'
        const fileUploadJpg = 'A.jpg'
        const fileUploadPng = 'service/img_200px.png'
        cy.xpath(create.benefitFile1).attachFile(fileUploadPng)
        cy.xpath(create.benefitFile2).attachFile(fileUploadPng)
        cy.xpath(create.benefitFile3).attachFile(fileUploadPng)
        cy.wait(2000)
    }

    urlCustomPortalJabar(text) {
        const url = cy.xpath(create.urlCustomPortalJabar)
        cy.readFile(dataPublication).then((object) => {
            object.urlCustomPortalJabar = text
            cy.writeFile(dataPublication, object)
        })
        url.clear().type(text)
    }

    clickBtnSaveNext() {
        const btn = cy.contains("Simpan & Lanjutkan")
        btn.click()

        const wizard2 = cy.xpath("//h2[normalize-space()='Deskripsi Layanan']")
        wizard2.should('contain', 'Deskripsi Layanan')
    }

    // Wizard 2
    assertServiceValueForm2() {
        cy.readFile(dataMasterService).then((object) => {
            const serviceTermConditionValue1 = cy.xpath(create.serviceTermConditionValue1)
            const serviceTermConditionValue2 = cy.xpath(create.serviceTermConditionValue2)
            const serviceTermConditionValue3 = cy.xpath(create.serviceTermConditionValue3)
            const serviceUsageValue1 = cy.xpath(create.serviceUsageValue1)
            const serviceUsageValue2 = cy.xpath(create.serviceUsageValue2)
            const serviceUsageValue3 = cy.xpath(create.serviceUsageValue3)
            const serviceRates = cy.xpath(create.serviceRates)
            const hotlinePhone = cy.xpath(create.hotlinePhone)
            const hotlineMail = cy.xpath(create.hotlineMail)
            const availabilityStatus = cy.xpath(create.availabilityStatus)
            const appsName = cy.xpath(create.appsName)
            const featureApp1 = cy.xpath(create.featureApp1)
            const featureApp2 = cy.xpath(create.featureApp2)
            const featureApp3 = cy.xpath(create.featureApp3)
            const featureDesc1 = cy.xpath(create.featureDesc1)
            const featureDesc2 = cy.xpath(create.featureDesc2)
            const featureDesc3 = cy.xpath(create.featureDesc3)

            serviceRates.invoke('val').then((text) => {
                expect(object.tarifLayanan).to.equal(text)
            })

            hotlinePhone.invoke('val').then((text) => {
                expect(object.hotlinePhone).to.equal(text)
            })

            hotlineMail.invoke('val').then((text) => {
                expect(object.hotlineEmail).to.equal(text)
            })

            // Application
            availabilityStatus.invoke('val').then((text) => {
                expect(object.statusKetersediaanAplikasi).to.equal(text)
            })

            appsName.invoke('val').then((text) => {
                expect(object.namaAplikasi).to.equal(text)
            })

            // Feature Application
            featureApp1.invoke('val').then((text) => {
                expect(object.fiturApps1).to.equal(text)
            })

            featureApp2.invoke('val').then((text) => {
                expect(object.fiturApps2).to.equal(text)
            })

            featureApp3.invoke('val').then((text) => {
                expect(object.fiturApps3).to.equal(text)
            })

            featureDesc1.invoke('val').then((text) => {
                expect(object.deskripsiFitur1).to.equal(text)
            })

            featureDesc2.invoke('val').then((text) => {
                expect(object.deskripsiFitur2).to.equal(text)
            })

            featureDesc3.invoke('val').then((text) => {
                expect(object.deskripsiFitur3).to.equal(text)
            })
        })
    }

    coverImageYoutube(url) {
        cy.readFile(dataPublication).then((object) => {
            const btnLink = cy.get(create.btnLinkYoutube)
            btnLink.click()
            const urlYoutube = cy.get(create.urlYoutube)
            object.urlYoutubeCoverImage = url
            cy.writeFile(dataPublication, object)
            urlYoutube.clear().type(url)
        })
    }

    contentImageMultiple() {
        for (let i = 1; i < 3; i++) {
            const btnAdd = cy.contains('Tambahkan Gambar Konten')
            btnAdd.click()
        }

        const fileUpload = 'Test_data.pdf'
        const fileUploadJpg = 'A.jpg'
        const fileUploadPng = 'service/img_200px.png'
        cy.xpath(create.contentImage1).attachFile(fileUploadPng)
        cy.xpath(create.contentImage2).attachFile(fileUploadPng)
        cy.xpath(create.contentImage3).attachFile(fileUploadPng)
        cy.wait(1000)
    }

    termConditionTitleSection(text) {
        const title = cy.xpath(create.serviceTermConditionTitle)
        cy.readFile(dataPublication).then((object) => {
            object.serviceTermConditionTitle = text
            cy.writeFile(dataPublication, object)
        })
        title.clear().type(text)
    }

    uploadTermConditionImage() {
        const fileUpload = 'Test_data.pdf'
        const fileUploadJpg = 'A.jpg'
        const fileUploadPng = 'service/img_200px.png'
        cy.xpath(create.serviceTermConditionFile).attachFile(fileUploadPng)
        cy.wait(1000)
    }

    serviceUsageTitleSection(text) {
        const title = cy.xpath(create.serviceUsageTitle)
        cy.readFile(dataPublication).then((object) => {
            object.serviceUsageTitle = text
            cy.writeFile(dataPublication, object)
        })
        title.clear().type(text)
    }

    uploadServiceUsageCover() {
        const fileUpload = 'Test_data.pdf'
        const fileUploadJpg = 'A.jpg'
        const fileUploadPng = 'service/img_200px.png'

        cy.xpath(create.serviceUsageFile).attachFile(fileUploadPng)
        cy.wait(2000)
    }

    uploadInfographicServiceImage() {
        const fileUpload = 'Test_data.pdf'
        const fileUploadJpg = 'A.jpg'
        const fileUploadPng = 'service/img_200px.png'
        for (let i = 1; i < 3; i++) {
            const btnAdd = cy.contains('Tambahkan Infografis')
            btnAdd.click()
        }
        cy.xpath(create.infographicFile1).attachFile(fileUploadPng)
        cy.xpath(create.infographicFile2).attachFile(fileUploadPng)
        cy.xpath(create.infographicFile3).attachFile(fileUploadPng)
        cy.wait(2000)
    }

    featureAppsTitleSection(text) {
        const title = cy.xpath(create.appFeatureTitle)
        cy.readFile(dataPublication).then((object) => {
            object.appFeatureTitle = text
            cy.writeFile(dataPublication, object)
        })
        title.clear().type(text)
    }

    // Wizard 3
    newsKeyword() {
        let tagData = "cypress/fixtures/agenda/agenda_data.json"
        let formInputKeywords = cy.get(create.keywordNews)

        cy.readFile(tagData).then((object) => {
            const dataKeywords = [
                {
                    kewords: object.tagAgenda1,
                },
                {
                    kewords: object.tagAgenda2,
                },
                {
                    kewords: object.tagAgenda3,
                },
            ]

            dataKeywords.forEach(({ keywords }) => {
                formInputKeywords.type(keywords + "{enter}")
            })
        })
    }
}