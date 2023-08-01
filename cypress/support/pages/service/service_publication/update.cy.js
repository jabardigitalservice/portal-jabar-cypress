import navbar from "../../../selectors/navbar"
import create_service from "../../../selectors/service/service_list/create";
import update_service from "../../../selectors/service/service_list/update";
import create from "../../../selectors/service/service_publication/create";
// import { DeleteServicePage } from "./delete.cy";
import { DeleteServicePage } from "../service_list/delete.cy";
// import { CreateServiceMasterPage } from "./create.cy"
import { CreateServiceMasterPage } from "../service_list/create.cy";

const { faker } = require('@faker-js/faker')
const dataWizard1 = "cypress/fixtures/service/wizard1_temp_data.json"
const dataPublication = "cypress/fixtures/service/publication_data.json"
const data = faker.random.word(2)
const data2 = faker.random.word(3)
const data3 = faker.random.word(2)
let create_page = new CreateServiceMasterPage()
const deleteServicePage = new DeleteServicePage()

export class UpdatePublicationMasterPage {
    assertUpdatePublicationPage() {
        const titleH1 = cy.get(navbar.titleH1)
        titleH1.should("contain", "Ubah Data Layanan Publik")
        // cy.url().should("eq", Cypress.env("base_url") + "/layanan/master-data/")
    }

    assertServiceValueForm1() {
        cy.readFile(dataWizard1).then((object) => {
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

    removeImgLogo() {
        cy.get("button:nth-of-type(2) svg").click();
    }

    uploadLogoService(file) {
        cy.get("#service-logo").attachFile(file)
        cy.wait(2000)
    }

    chooseServiceCategoryJabarprov() {
        cy.get("span:nth-of-type(8) div.jds-popover__activator input").click();
        cy.get("li:nth-of-type(2) > span").click(); // Pendidikan dan Pembelajaran

        cy.readFile(dataPublication).then((object) => {
            object.categoryService = 'Pendidikan dan Pembelajaran'
            cy.writeFile(dataPublication, object)
        })
    }

    benefitTitileSection(text) {
        const title = cy.xpath(create.benefitTitleSection)
        cy.writeFile(dataPublication, { serviceBenefitsTitle: text })
        title.clear().type(text)
    }

    benefitFileUpload(file) {
        const fileUpload = 'Test_data.pdf'
        const fileUploadJpg = 'A.jpg'
        const fileUploadPng = 'service/img_200px.png'

        // Remove File
        cy.get("div.w-full > div > section > div:nth-of-type(1) div.self-center path").click();
        cy.get("div > section > div:nth-of-type(2) div.self-center > button").click();
        cy.xpath('/html[1]/body[1]/div[1]/div[1]/div[1]/div[1]/main[1]/span[1]/form[1]/section[2]/span[1]/fieldset[1]/section[2]/div[2]/div[1]/section[1]/div[3]/div[1]/section[1]/div[1]/div[1]/div[3]/button[1]').click()

        // Upload File
        cy.xpath(create.benefitFile1).attachFile(file)
        cy.xpath(create.benefitFile2).attachFile(file)
        cy.xpath(create.benefitFile3).attachFile(file)
        cy.wait(2000)
    }

    urlCustomPortalJabar(text) {
        const url = cy.xpath(create.urlCustomPortalJabar)
        cy.readFile(dataPublication).then((object) => {
            object.urlCustomPortalJabar = 'http://www.jabarprov.go.id/layanan/' + text
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
        cy.readFile(dataWizard1).then((object) => {
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

    coverImageFile(file) {
        // remove file
        cy.xpath("/html[1]/body[1]/div[1]/div[1]/div[1]/div[1]/main[1]/span[1]/form[1]/section[2]/span[1]/fieldset[1]/section[1]/div[2]/div[1]/section[1]/section[1]/div[1]/div[1]/div[3]/button[1]").click();
        cy.wait(3000)

        // upload file
        cy.xpath(create.coverImageFile).attachFile(file)
        cy.wait(2000)
    }

    contentImageMultiple(file) {
        // for (let i = 1; i < 3; i++) {
        //     const btnAdd = cy.contains('Tambahkan Gambar Konten')
        //     btnAdd.click()
        // }
        // remove image
        cy.xpath("/html[1]/body[1]/div[1]/div[1]/div[1]/div[1]/main[1]/span[1]/form[1]/section[2]/span[1]/fieldset[1]/section[1]/div[2]/div[1]/section[2]/div[2]/section[1]/div[1]/div[1]/div[3]/button[1]").click();
        cy.xpath("/html[1]/body[1]/div[1]/div[1]/div[1]/div[1]/main[1]/span[1]/form[1]/section[2]/span[1]/fieldset[1]/section[1]/div[2]/div[1]/section[2]/div[3]/section[1]/div[1]/div[1]/div[3]/button[1]").click();
        cy.xpath("/html[1]/body[1]/div[1]/div[1]/div[1]/div[1]/main[1]/span[1]/form[1]/section[2]/span[1]/fieldset[1]/section[1]/div[2]/div[1]/section[2]/div[4]/section[1]/div[1]/div[1]/div[3]/button[1]").click();
        cy.wait(3000)

        // upload image
        cy.xpath(create.contentImage1).attachFile(file)
        cy.xpath(create.contentImage2).attachFile(file)
        cy.xpath(create.contentImage3).attachFile(file)
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

    uploadTermConditionImage(file) {
        // remove image
        cy.get("section:nth-of-type(3) div.self-center path").click();
        cy.wait(3000)

        // upload image
        cy.xpath(create.serviceTermConditionFile).attachFile(file)
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

    uploadServiceUsageCover(file) {
        // remove file
        cy.xpath("/html[1]/body[1]/div[1]/div[1]/div[1]/div[1]/main[1]/span[1]/form[1]/section[2]/span[1]/fieldset[1]/section[1]/div[2]/div[1]/section[4]/section[1]/section[1]/div[1]/div[1]/div[3]/button[1]").click()
        cy.wait(3000)

        // upload file
        cy.xpath(create.serviceUsageFile).attachFile(file)
        cy.wait(2000)
    }

    uploadInfographicServiceImage(file) {
        // remove file
        cy.get("section:nth-of-type(5) > section > div:nth-of-type(1) div.self-center path").click();
        cy.get("section:nth-of-type(5) > section > div:nth-of-type(2) div.self-center path").click();
        cy.xpath("/html[1]/body[1]/div[1]/div[1]/div[1]/div[1]/main[1]/span[1]/form[1]/section[2]/span[1]/fieldset[1]/section[1]/div[2]/div[1]/section[5]/section[1]/div[3]/div[1]/section[1]/div[1]/div[1]/div[3]/button[1]").click();
        cy.wait(3000)

        // upload file
        cy.xpath(create.infographicFile1).attachFile(file)
        cy.xpath(create.infographicFile2).attachFile(file)
        cy.xpath(create.infographicFile3).attachFile(file)
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
    assertServiceValueForm3() {
        cy.readFile(dataPublication).then((object) => {
            const question1 = cy.xpath(create.question1)
            const question2 = cy.xpath(create.question2)
            const question3 = cy.xpath(create.question3)
            const answer1 = cy.xpath(create.answer1)
            const answer2 = cy.xpath(create.answer2)
            const answer3 = cy.xpath(create.answer3)

            question1.invoke('val').then((text) => {
                expect(object.question1).to.equal(text)
            })

            question2.invoke('val').then((text) => {
                expect(object.question2).to.equal(text)
            })

            question3.invoke('val').then((text) => {
                expect(object.question3).to.equal(text)
            })

            answer1.invoke('val').then((text) => {
                expect(object.answer1).to.equal(text)
            })

            answer2.invoke('val').then((text) => {
                expect(object.answer2).to.equal(text)
            })

            answer3.invoke('val').then((text) => {
                expect(object.answer3).to.equal(text)
            })
        })
    }

    newsKeyword() {
        let tagData = "cypress/fixtures/agenda/agenda_data.json"
        let formInputKeywords = cy.get(create.keywordNews)

        // remove tag
        cy.get("div.w-full > div > div > div > div:nth-of-type(1) path").click();
        cy.get("div.w-full > div > div > div > div:nth-of-type(1) path").click();
        cy.get("div.w-full > div > div > div > div:nth-of-type(1) path").click();
        cy.wait(3000)

        // add tag
        cy.readFile(tagData).then((object) => {
            const dataKeywords = [
                {
                    keywords: object.tagAgendaUpdate1,
                },
                {
                    keywords: object.tagAgendaUpdate2,
                },
                {
                    keywords: object.tagAgendaUpdate3,
                },
            ]

            dataKeywords.forEach(({ keywords }) => {
                formInputKeywords.type(keywords + "{enter}")
            })
        })
    }

    assertNewsKeyword() {
        let tagData = "cypress/fixtures/agenda/agenda_data.json"

        cy.readFile(tagData).then((object) => {
            const sectionTag = cy.xpath(create.keywordsTag)
            sectionTag.should('contain', object.tagAgendaUpdate1)
                .and('contain', object.tagAgendaUpdate2)
                .and('contain', object.tagAgendaUpdate3)
        })
    }

    faqQuestion(text1, text2, text3) {
        // for (let i = 1; i < 3; i++) {
        //     const btn = cy.contains('Tambahkan Pertanyaan')
        //     btn.click()
        // }

        cy.readFile(dataPublication).then((object) => {
            // Data 1
            const question1 = cy.xpath(create.question1)
            object.question1 = text1
            cy.writeFile(dataPublication, object)
            question1.clear().type(text1)

            // Data 2
            const question2 = cy.xpath(create.question2)
            object.question2 = text2
            cy.writeFile(dataPublication, object)
            question2.clear().type(text2)

            // Data 3
            const question3 = cy.xpath(create.question3)
            object.question3 = text3
            cy.writeFile(dataPublication, object)
            question3.clear().type(text3)
        })
    }

    faqAnswer(text1, text2, text3) {

        cy.readFile(dataPublication).then((object) => {
            // Data 1
            const answer1 = cy.xpath(create.answer1)
            object.answer1 = text1
            cy.writeFile(dataPublication, object)
            answer1.clear().type(text1)

            // Data 2
            const answer2 = cy.xpath(create.answer2)
            object.answer2 = text2
            cy.writeFile(dataPublication, object)
            answer2.clear().type(text2)

            // Data 3
            const answer3 = cy.xpath(create.answer3)
            object.answer3 = text3
            cy.writeFile(dataPublication, object)
            answer3.clear().type(text3)
        })
    }

    clickBtnSaveChange() {
        const btn = cy.contains('Simpan Perubahan')
        btn.then(($btn) => {
            if ($btn.is(":disabled")) {
                btn.should("be.disabled").and("contain", "Simpan Perubahan")
            } else {
                btn.should("be.visible")
                btn.contains("Simpan Perubahan")
                btn.click()
                cy.wait(1000)
                // Assertion Modals Confirmation
                const modals = cy.get('.animate-slide-up > .overflow-y-auto')
                modals.should('contain', 'Apakah Anda ingin mengubah data layanan ini?')
            }
        })
    }

    clickBtnCancel() {
        const btn = cy.contains("Batalkan")
        btn.click()
        cy.wait(1000)

        // Assertion
        const modalsCancel = cy.xpath("(//div[@class='w-full h-full px-2 pb-4'])[1]")
        modalsCancel.should('be.visible')
            .and('contain', 'Membatalkan Layanan')
            .and('contain', 'Apakah Anda yakin ingin membatalkan Layanan ini ?')

        // Click Yes
        const btnYesSure = cy.contains("Ya, saya yakin")
        btnYesSure.click()
        cy.wait(1000)
        cy.url().should("eq", Cypress.env("base_url") + "/layanan")
    }

    btnYesSaveModalsConfirmation() {
        const btn = cy.contains('Ya, simpan layanan')
        btn.click()
        cy.wait(2000)

        // Assert Success Save Data
        const respons = cy.get('.animate-slide-up > .overflow-y-auto > .w-full > .font-roboto')
        respons.should('contain', 'Berhasil!')
        const modals = cy.get('.animate-slide-up > .overflow-y-auto')
        modals.should('contain', 'Layanan yang Anda buat berhasil ditambahkan.')
    }

    btnUnderstand() {
        deleteServicePage.clickBtnUnderstand()
    }
}   