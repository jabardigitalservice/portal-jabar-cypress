import detail from "../../../selectors/service/service_list/detail"
const filename = "cypress/fixtures/service/wizard1_temp_data.json"

export class DetailServicePage {
    assertDetailPage() {
        const titleDetailPage = cy.xpath(detail.titleDetailPage)
        titleDetailPage.should('contain', 'Detail Layanan')

        const tabMenu = cy.xpath(detail.panelTabMenu).as('tabMenuDetail')
        tabMenu.find('li').should('have.length', 3)
            .and('contain', 'Pelayanan')
            .and('contain', 'Aplikasi')
            .and('contain', 'Informasi Tambahan')
    }

    assertServiceData() {
        cy.readFile(filename).then((object) => {
            const urusanPemerintahan = object.urusanPemerintahan
            const subUrusan = object.subUrusanPemerintahan
            const bentukLayanan = object.bentukLayanan
            const jenisLayanan = object.jenisLayanan
            const subJenisLayanan = object.subJenisLayanan
            const namaLayanan = object.namaLayanan
            const namaProgramLayanan = object.namaProgramLayanan
            const deskripsiLayanan = object.deskripsiLayanan
            const penggunaLayanan = object.penggunaLayanan
            const kategoriLayanan = object.kategoriLayanan
            const statusOperasional = object.statusOperasional
            const teknisLayanan = object.teknisLayanan
            const alamatWebsite = object.alamatWebsite
            const tarifLayanan = object.tarifLayanan
            const hotlinePhone = object.hotlinePhone
            const hotlineEmail = object.hotlineEmail
            const serviceInformationTable = cy.xpath('/html[1]/body[1]/div[1]/div[1]/div[1]/div[1]/main[1]/section[2]/div[1]/div[1]')

            serviceInformationTable.should('contain', urusanPemerintahan)
                .and('contain', subUrusan)
                .and('contain', bentukLayanan)
                .and('contain', jenisLayanan)
                .and('contain', subJenisLayanan)
                .and('contain', namaLayanan)
                .and('contain', namaProgramLayanan)
                .and('contain', deskripsiLayanan)
                .and('contain', penggunaLayanan)
                .and('contain', kategoriLayanan)
                .and('contain', statusOperasional)
                .and('contain', teknisLayanan)
                .and('contain', alamatWebsite)

            const detailTable = cy.xpath('/html[1]/body[1]/div[1]/div[1]/div[1]/div[1]/main[1]/section[2]/div[1]/div[2]/table[1]')
            detailTable.should('contain', tarifLayanan)
                .and('contain', hotlinePhone)
                .and('contain', hotlineEmail)
        })
    }

    clickApplicationTab() {
        const appTab = cy.xpath('/html[1]/body[1]/div[1]/div[1]/div[1]/div[1]/main[1]/section[2]/ul[1]/li[2]')
        appTab.click()
    }

    assertionApplicationData() {
        cy.readFile(filename).then((object) => {
            const statusKetersediaanAplikasi = object.statusKetersediaanAplikasi
            const namaAplikasi = object.namaAplikasi
            const serviceInformationTable = cy.xpath('/html[1]/body[1]/div[1]/div[1]/div[1]/div[1]/main[1]/section[2]/div[1]')

            serviceInformationTable.should('contain', statusKetersediaanAplikasi)
                .and('contain', namaAplikasi)
        })
    }

    clickAdditionalInformationTab() {
        const additionalInfoTab = cy.xpath('/html[1]/body[1]/div[1]/div[1]/div[1]/div[1]/main[1]/section[2]/ul[1]/li[3]')
        additionalInfoTab.click()
    }

    assertionAdditionalInfoData() {
        cy.readFile(filename).then((object) => {
            const namaPenanggungJawab = object.namaPenanggungJawab
            const hpPenanggungJawab = object.hpPenanggungJawab
            const alamatEmail = object.alamatEmail
            const responsibilitiesTable = cy.xpath('/html[1]/body[1]/div[1]/div[1]/div[1]/div[1]/main[1]/section[2]/div[1]/div[1]')

            responsibilitiesTable.should('contain', namaPenanggungJawab)
                .and('contain', hpPenanggungJawab)
                .and('contain', alamatEmail)
        })
    }
}