import detail from "../../../selectors/service/service_list/detail"
const filename = "cypress/fixtures/service/data_tes.json"
const publicationData = "cypress/fixtures/service/publication_data.json"
const dataWizard1 = "cypress/fixtures/service/wizard1_temp_data.json"

export class DetailPublicationPage {
    assertDetailPage() {
        const titleDetailPage = cy.xpath(detail.titleDetailPage)
        titleDetailPage.should('contain', 'Detail Layanan')

        const tabMenu = cy.xpath(detail.panelTabMenu).as('tabMenuDetail')
        tabMenu.find('li').should('have.length', 3)
            .and('contain', 'Pengaturan Dasar')
            .and('contain', 'Deskripsi Layanan')
            .and('contain', 'Informasi Tambahan')
    }

    assertBasicSettingData() {
        cy.readFile(dataWizard1).then((object) => {
            const bentukLayanan = object.bentukLayanan
            const namaLayanan = object.namaLayanan
            const deskripsiLayanan = object.deskripsiLayanan
            const penggunaLayanan = object.penggunaLayanan
            const serviceProgramName = object.namaProgramLayanan
            const statusOperasional = object.statusOperasional
            const teknisLayanan = object.teknisLayanan
            const benefitValue1 = object.manfaatLayanan1
            const benefitValue2 = object.manfaatLayanan2
            const benefitValue3 = object.manfaatLayanan3
            const generalTable = cy.xpath('/html[1]/body[1]/div[1]/div[1]/div[1]/div[1]/main[1]/section[2]/div[1]/div[1]/table[1]')

            cy.readFile(publicationData).then((objectPublication) => {
                generalTable.should('contain', bentukLayanan)
                    .and('contain', namaLayanan)
                    .and('contain', deskripsiLayanan)
                    .and('contain', penggunaLayanan)
                    .and('contain', serviceProgramName)
                    .and('contain', statusOperasional)
                    .and('contain', teknisLayanan)
                    .and('contain', objectPublication.serviceBenefitsTitle)
                    .and('contain', benefitValue1)
                    .and('contain', benefitValue2)
                    .and('contain', benefitValue3)
                    .and('contain', objectPublication.urlCustomPortalJabar.toLowerCase())
            })
        })
    }

    clickServiceDescriptionTab() {
        const serviceDescriptionTab = cy.get("li:nth-of-type(2) > p");
        serviceDescriptionTab.click()
        cy.wait(1000)
        serviceDescriptionTab.should('have.class', 'text-green-700').and('contain', 'Deskripsi Layanan')
    }

    assertionServiceDescriptionData() {
        cy.readFile(dataWizard1).then((object) => {
            cy.readFile(publicationData).then((objectPublication) => {
                const detailTable = cy.xpath('/html[1]/body[1]/div[1]/div[1]/div[1]/div[1]/main[1]/section[2]/div[1]/div[1]')

                // Detail
                detailTable.should('contain', objectPublication.serviceTermConditionTitle)
                    .and('contain', objectPublication.serviceUsageTitle)
                    .and('contain', object.hotlinePhone)
                    .and('contain', object.hotlineEmail)

                // Location Service
                const locationServiceTable = cy.xpath('/html[1]/body[1]/div[1]/div[1]/div[1]/div[1]/main[1]/section[2]/div[1]/div[2]/table[1]')

                // Application
                const applicationTable = cy.xpath('/html[1]/body[1]/div[1]/div[1]/div[1]/div[1]/main[1]/section[2]/div[1]/div[3]/table[1]')
                applicationTable.should('contain', object.statusKetersediaanAplikasi)
                    .and('contain', object.namaAplikasi)
                    .and('contain', object.fiturApps1)
                    .and('contain', object.deskripsiFitur1)
                    .and('contain', object.fiturApps2)
                    .and('contain', object.deskripsiFitur2)
                    .and('contain', object.fiturApps3)
                    .and('contain', object.deskripsiFitur3)
                    .and('contain', object.labelTautan1)
                    .and('contain', object.labelTautan2)
                    .and('contain', object.labelTautan3)
                    .and('contain', object.labelTautan4)

                // if (object.teknisLayanan == 'offline') {
                //     cy.xpath("/html[1]/body[1]/div[1]/div[1]/div[1]/div[1]/main[1]/section[2]/div[1]/table[1]/tbody[1]").should('contain', '-')
                // } else {
                //     serviceInformationTable.should('contain', statusKetersediaanAplikasi)
                //         .and('contain', object.namaAplikasi)
                // }
            })
        })
    }

    clickAdditionalInformationTab() {
        const additionalInformationTab = cy.xpath("/html[1]/body[1]/div[1]/div[1]/div[1]/div[1]/main[1]/section[2]/ul[1]/li[3]");
        additionalInformationTab.click()
        // cy.wait(1000)
        // additionalInformationTab.should('have.class', 'text-green-700').and('contain', 'Informasi Tambahan')
    }

    assertionAdditionalInformation() {
        const newsKeyword = "cypress/fixtures/agenda/agenda_data.json"

        cy.readFile(newsKeyword).then((object) => {
            const newsInformationTable = cy.xpath('/html[1]/body[1]/div[1]/div[1]/div[1]/div[1]/main[1]/section[2]/div[1]/div[1]')
            const dataKeywords = [
                {
                    keywords: object.tagAgenda1,
                },
                {
                    keywords: object.tagAgenda2,
                },
                {
                    keywords: object.tagAgenda3,
                },
            ]

            dataKeywords.forEach(({ keywords }) => {
                newsInformationTable.should('contain', keywords)
            })
        })

        cy.readFile(publicationData).then((objectPublication) => {
            const faqTable = cy.xpath('/html[1]/body[1]/div[1]/div[1]/div[1]/div[1]/main[1]/section[2]/div[1]/div[2]')
            faqTable.should('contain', objectPublication.question1)
                .and('contain', objectPublication.answer1)
                .and('contain', objectPublication.question2)
                .and('contain', objectPublication.answer2)
                .and('contain', objectPublication.question3)
                .and('contain', objectPublication.answer3)
        })
    }

    assertionAdditionalInformationUpdate() {
        const newsKeyword = "cypress/fixtures/agenda/agenda_data.json"

        cy.readFile(newsKeyword).then((object) => {
            const newsInformationTable = cy.xpath('/html[1]/body[1]/div[1]/div[1]/div[1]/div[1]/main[1]/section[2]/div[1]/div[1]')
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
                newsInformationTable.should('contain', keywords)
            })
        })

        cy.readFile(publicationData).then((objectPublication) => {
            const faqTable = cy.xpath('/html[1]/body[1]/div[1]/div[1]/div[1]/div[1]/main[1]/section[2]/div[1]/div[2]')
            faqTable.should('contain', objectPublication.question1)
                .and('contain', objectPublication.answer1)
                .and('contain', objectPublication.question2)
                .and('contain', objectPublication.answer2)
                .and('contain', objectPublication.question3)
                .and('contain', objectPublication.answer3)
        })
    }

    clickBtnBack() {
        const btn = cy.contains('Kembali')
        btn.click()
        cy.wait(1000)
        cy.url().should("eq", Cypress.env("base_url") + "/layanan/daftar-publikasi-layanan")
    }
}