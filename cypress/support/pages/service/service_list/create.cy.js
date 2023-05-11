import create_service from "../../../selectors/service/service_list/create";
import { DeleteServicePage } from "./delete.cy";

const { faker } = require('@faker-js/faker')
const dataWizard1 = "cypress/fixtures/service/wizard1_temp_data.json"
const data = faker.random.word(2)
const data2 = faker.random.word(3)
const data3 = faker.random.word(2)
const deleteServicePage = new DeleteServicePage()

export class CreateServiceMasterPage {
    assertCreateServicePage() {
        const wizard1 = cy.xpath(create_service.titleWizard1).as('titleWizard1')
        wizard1.should("have.class", "flex flex-col form-stepper--active")
            .and('contain', 'Informasi dasar untuk landing page')
    }

    chooseUrusanPemerintahan() {
        const clickDropdown = cy.xpath(create_service.urusanPemerintahan).as('urusanPemerintahan')
        clickDropdown.click()

        const pendidikan = cy.contains(create_service.urusanPemerintahanPendidikan)
        const valueAssertion = 'PENDIDIKAN'
        pendidikan.click()
        cy.writeFile(dataWizard1, { urusanPemerintahan: valueAssertion })
    }

    chooseSubUrusanPemerintahan() {
        const clickDropdown = cy.xpath(create_service.subUrusanPemerintahan).as('subUrusan')
        clickDropdown.click()

        const manajemenPendidikan = cy.contains(create_service.subUrusanPemerintahanManajemen)
        manajemenPendidikan.click()
        const valueAssertion = 'Manajemen Pendidikan'
        cy.readFile(dataWizard1).then((object) => {
            object.subUrusanPemerintahan = valueAssertion
            cy.writeFile(dataWizard1, object)
        })
    }

    chooseBentukLayanan() {
        const clickDropdown = cy.xpath(create_service.bentukLayanan).as('bentukLayanan')
        clickDropdown.click()

        const administratif = cy.contains(create_service.bentukLayananAdministratif)
        administratif.click()
        const valueAssertion = 'ADMINISTRATIF'
        cy.readFile(dataWizard1).then((object) => {
            object.bentukLayanan = valueAssertion
            cy.writeFile(dataWizard1, object)
        })
    }

    jenisLayanan(textJenisLayanan) {
        const formJenisLayanan = cy.xpath(create_service.jenisLayanan).as('jenisLayanan')
        const uuid = () => Cypress._.random(0, 1e4)
        const id = uuid()
        const jenisLayanan = textJenisLayanan + ` ${id}`

        formJenisLayanan.clear()
        cy.readFile(dataWizard1).then((object) => {
            object.jenisLayanan = jenisLayanan
            cy.writeFile(dataWizard1, object)
        })
        formJenisLayanan.type(jenisLayanan)
    }

    subJenisLayanan(textSubJenisLayanan) {
        const formSubJenisLayanan = cy.xpath(create_service.subJenisLayanan).as('subJenisLayanan')
        const uuid = () => Cypress._.random(0, 1e4)
        const id = uuid()
        const jenisLayanan = textSubJenisLayanan + ` ${id}`

        formSubJenisLayanan.clear()
        cy.readFile(dataWizard1).then((object) => {
            object.subJenisLayanan = jenisLayanan
            cy.writeFile(dataWizard1, object)
        })
        formSubJenisLayanan.type(jenisLayanan)
    }

    namaLayanan(textNamaLayanan) {
        const formNamaLayanan = cy.xpath(create_service.namaLayanan).as('namaLayanan')
        const uuid = () => Cypress._.random(0, 1e4)
        const id = uuid()
        const namaLayanan = textNamaLayanan + ` ${id}`

        formNamaLayanan.clear()
        cy.readFile(dataWizard1).then((object) => {
            object.namaLayanan = namaLayanan
            cy.writeFile(dataWizard1, object)
        })
        formNamaLayanan.type(namaLayanan)
    }

    namaProgramLayanan(textNamaProgramLayanan) {
        const formNamaProgramLayanan = cy.xpath(create_service.namaProgramLayanan).as('namaProgramLayanan')
        const uuid = () => Cypress._.random(0, 1e4)
        const id = uuid()
        const namaProgramLayanan = textNamaProgramLayanan + ` ${id}`

        formNamaProgramLayanan.clear()
        cy.readFile(dataWizard1).then((object) => {
            object.namaProgramLayanan = namaProgramLayanan
            cy.writeFile(dataWizard1, object)
        })
        formNamaProgramLayanan.type(namaProgramLayanan)
    }

    deskripsiLayanan(textDeskripsiLayanan) {
        const formDeskripsi = cy.xpath(create_service.deskripsiLayanan).as('deskripsiLayanan')
        const uuid = () => Cypress._.random(0, 1e4)
        const id = uuid()
        const deskripsiLayanan = textDeskripsiLayanan + ` ${id}`

        formDeskripsi.clear()
        cy.readFile(dataWizard1).then((object) => {
            object.deskripsiLayanan = deskripsiLayanan
            cy.writeFile(dataWizard1, object)
        })
        formDeskripsi.type(deskripsiLayanan)
    }

    penggunaLayanan() {
        const clickDropdown = cy.xpath(create_service.penggunaLayanan).as('penggunaLayanan')
        clickDropdown.click()

        const umum = cy.contains(create_service.penggunaLayananUmum)
        umum.click()
        const valueAssertion = 'UMUM'
        cy.readFile(dataWizard1).then((object) => {
            object.penggunaLayanan = valueAssertion
            cy.writeFile(dataWizard1, object)
        })
    }

    kategoriRal() {
        const clickDropdown = cy.xpath(create_service.kategoriRal).as('kategoriRal')
        clickDropdown.click()

        const pertahanan = cy.contains(create_service.KategoriRalPertahanan)
        pertahanan.click()
        const valueAssertion = 'RAL.01.01 Pertahanan'
        cy.readFile(dataWizard1).then((object) => {
            object.kategoriLayanan = valueAssertion
            cy.writeFile(dataWizard1, object)
        })
    }

    statusOperasional() {
        const clickDropdown = cy.xpath(create_service.statusOperasioinal).as('statusOperasional')
        clickDropdown.click()

        const aktif = cy.contains(create_service.statusOperasioinalAktif)
        aktif.click()
        const valueAssertion = 'Aktif'
        cy.readFile(dataWizard1).then((object) => {
            object.statusOperasional = valueAssertion
            cy.writeFile(dataWizard1, object)
        })
    }

    teknisLayanan() {
        const clickDropdown = cy.xpath(create_service.teknisLayanan).as('teknisLayanan')
        clickDropdown.click()

        const online = cy.contains(create_service.teknisLayananOnline)
        online.click()
        const valueAssertion = 'online'
        cy.readFile(dataWizard1).then((object) => {
            object.teknisLayanan = valueAssertion
            cy.writeFile(dataWizard1, object)
        })
    }

    manfaatLayanan(textManfaat) {
        const manfaatLayanan = cy.xpath(create_service.manfaatLayanan).as('manfaatLayanan')
        cy.readFile(dataWizard1).then((object) => {
            object.manfaatLayanan = textManfaat
            cy.writeFile(dataWizard1, object)
        })
        manfaatLayanan.type(textManfaat)
    }

    clickBtnTambahManfaat() {
        const btnTambahManfaat = cy.contains(create_service.btnTambahManfaat)
        btnTambahManfaat.click()
    }

    clickBtnTambahFasilitas() {
        const btnTambahFasilitas = cy.contains(create_service.btnTambahFasilitasManfaat)
        btnTambahFasilitas.click()
    }

    manfaatLayananMultiple() {
        cy.readFile(dataWizard1).then((object) => {
            // const doManfaatLayanan = [
            //     {
            //         manfaatLayananData: "hai",
            //     },
            //     {
            //         manfaatLayananData: "tes",
            //     },
            //     {
            //         manfaatLayananData: "gas",
            //     }
            // ]

            // doManfaatLayanan.forEach(({ manfaatLayananData }) => {
            //     const manfaatLayanan1 = cy.xpath(create_service.manfaatLayanan)
            //     manfaatLayanan1.type(manfaatLayananData)

            //     const btnTambahManfaat = cy.contains(create_service.btnTambahManfaat)
            //     btnTambahManfaat.click()

            // })

            // Data 1
            object.manfaatLayanan1 = data3
            cy.writeFile(dataWizard1, object)
            this.manfaatLayanan(data3)
            this.clickBtnTambahManfaat()

            // Data 2
            const manfaatLayanan2 = cy.xpath(create_service.manfaatLayanan2)
            object.manfaatLayanan2 = data
            cy.writeFile(dataWizard1, object)
            manfaatLayanan2.type(data)
            this.clickBtnTambahManfaat()

            // Data 3
            const manfaatLayanan3 = cy.xpath(create_service.manfaatLayanan3)
            object.manfaatLayanan3 = data2
            cy.writeFile(dataWizard1, object)
            manfaatLayanan3.type(data2)
        })
    }

    fasilitasLayananMultiple() {
        cy.readFile(dataWizard1).then(() => {
            // Data 1
            object.fasilitasLayanan1 = data
            cy.writeFile(dataWizard1, object)
            this.manfaatLayanan(data)
            this.clickBtnTambahManfaat()

            // Data 2
            const fasilitasLayanan2 = cy.xpath(create_service.fasilitasLayanan2)
            object.fasilitasLayanan2 = data2
            cy.writeFile(dataWizard1, object)
            fasilitasLayanan2.type(data2)
            this.clickBtnTambahManfaat()

            // Data 3
            const fasilitasLayanan3 = cy.xpath(create_service.fasilitasLayanan3)
            object.fasilitasLayanan3 = data3
            cy.writeFile(dataWizard1, object)
            fasilitasLayanan3.type(data3)
        })
    }

    alamatWebsiteInformasiResmi(text) {
        const alamatWebsite = cy.xpath(create_service.alamatWebsite).as('alamatWebsite')
        cy.readFile(dataWizard1).then((object) => {
            object.alamatWebsite = text
            cy.writeFile(dataWizard1, object)
        })
        alamatWebsite.type(text)
    }

    clickBtnTambahTautan() {
        const btnTambah = cy.contains(create_service.btnTambahTautan).as('btnTambahTautan')
        btnTambah.click()
    }

    tautanLayananMultiple() {
        cy.readFile(dataWizard1).then((object) => {
            // Data 1
            const dropdownTautan = cy.get(create_service.dropdownTautan).as('dropdownTautan')
            dropdownTautan.click()

            const tautanGForm = cy.contains(create_service.tautanGoogleForm).as('tautanGForm')
            tautanGForm.click({ force: true })

            const tautanLayanan1 = cy.xpath(create_service.tautanLayanan1).as('tautanLayanan1')
            const textUrl = faker.image.technics()
            object.tautanLayanan1 = textUrl
            cy.writeFile(dataWizard1, object)
            tautanLayanan1.type(textUrl)

            const labelTautan1 = cy.xpath(create_service.labelTautan1).as('labelTautan1')
            const textLabel1 = faker.random.word()
            object.labelTautan1 = textLabel1
            cy.writeFile(dataWizard1, object)
            labelTautan1.type(textLabel1)

            this.clickBtnTambahTautan()

            // Data 2
            const dropdownTautan2 = cy.get(create_service.dropdownTautan2).as('dropdownTautan')
            dropdownTautan2.click()

            const tautanPlaystore = cy.xpath("(//a[contains(text(),'Playstore')])[2]").as('tautanPlaystore')
            tautanPlaystore.click({ force: true })

            const tautanLayanan2 = cy.get(':nth-child(24) > :nth-child(1) > .jds-input-text > .jds-input-text__input-wrapper > input').as('tautanLayanan2')
            const textUrl2 = faker.image.technics()
            object.tautanLayanan2 = textUrl2
            cy.writeFile(dataWizard1, object)
            tautanLayanan2.type(textUrl2)

            const labelTautan2 = cy.xpath(create_service.labelTautan2).as('labelTautan2')
            const textLabel2 = faker.random.word()
            object.labelTautan2 = textLabel2
            cy.writeFile(dataWizard1, object)
            labelTautan2.type(textLabel2)

            this.clickBtnTambahTautan()

            // Data 3
            const dropdownTautan3 = cy.get(create_service.dropdownTautan3).as('dropdownTautan')
            dropdownTautan3.click()

            const tautanAppstore = cy.xpath("(//a[contains(text(),'App Store')])[3]").as('tautanAppStore')
            tautanAppstore.click({ force: true })

            const tautanLayanan3 = cy.get(':nth-child(25) > :nth-child(1) > .jds-input-text > .jds-input-text__input-wrapper > input').as('tautanLayanan3')
            const textUrl3 = faker.image.technics()
            object.tautanLayanan3 = textUrl3
            cy.writeFile(dataWizard1, object)
            tautanLayanan3.type(textUrl3)

            const labelTautan3 = cy.xpath(create_service.labelTautan3).as('labelTautan3')
            const textLabel3 = faker.random.word()
            object.labelTautan3 = textLabel3
            cy.writeFile(dataWizard1, object)
            labelTautan3.type(textLabel3)

            this.clickBtnTambahTautan()

            // Data 4
            const dropdownTautan4 = cy.get(create_service.dropdownTautan4).as('dropdownTautan')
            dropdownTautan4.click()

            const tautanWebsite = cy.xpath("(//a[contains(text(),'Website')])[4]").as('tautanWebsite')
            tautanWebsite.click({ force: true })

            const tautanLayanan4 = cy.get(':nth-child(26) > :nth-child(1) > .jds-input-text > .jds-input-text__input-wrapper > input').as('tautanLayanan4')
            const textUrl4 = faker.image.technics()
            object.tautanLayanan4 = textUrl4
            cy.writeFile(dataWizard1, object)
            tautanLayanan4.type(textUrl4)

            const labelTautan4 = cy.xpath(create_service.labelTautan4).as('labelTautan4')
            const textLabel4 = faker.random.word()
            object.labelTautan4 = textLabel4
            cy.writeFile(dataWizard1, object)
            labelTautan4.type(textLabel4)
        })
    }

    clickBtnTambahSk() {
        const btnTambahSk = cy.contains(create_service.btnTambahSk)
        btnTambahSk.click()
    }

    syaratKetentuanMultiple() {
        for (let i = 1; i < 3; i++) {
            this.clickBtnTambahSk()
        }

        // Data 1
        const sk1 = cy.xpath(create_service.sk1)
        sk1.clear().type(faker.lorem.words())

        // Data 2
        const sk2 = cy.xpath(create_service.sk2)
        sk2.clear().type(faker.lorem.words())

        // Data 3
        const sk3 = cy.xpath(create_service.sk3)
        sk3.clear().type(faker.lorem.words())
    }

    syaratKetentuan() {
        const sk1 = cy.xpath(create_service.sk1)
        sk1.clear().type(faker.lorem.words())
    }

    clickBtnTambahProsedurLayanan() {
        const btnTambahProsedur = cy.contains(create_service.btnTambahProsedur)
        btnTambahProsedur.click()
    }

    prosedurLayananMultiple() {
        for (let i = 1; i < 3; i++) {
            this.clickBtnTambahProsedurLayanan()
        }

        // Data 1
        const prosedur1 = cy.xpath(create_service.prosedurLayanan1)
        prosedur1.clear().type(faker.lorem.words())

        // Data 2
        const prosedur2 = cy.xpath(create_service.prosedurLayanan2)
        prosedur2.clear().type(faker.lorem.words())

        // Data 3
        const prosedur3 = cy.xpath(create_service.prosedurLayanan3)
        prosedur3.clear().type(faker.lorem.words())
    }

    prosedurLayanan() {
        const prosedur1 = cy.xpath(create_service.prosedurLayanan1)
        prosedur1.clear().type(faker.lorem.words())
    }

    tarifLayanan() {
        cy.readFile(dataWizard1).then((object) => {
            const tarifLayanan = cy.xpath(create_service.tarifLayanan).as('tarifLayanan')
            tarifLayanan.clear()
            tarifLayanan.type('10000')
            object.tarifLayanan = '10000'
            cy.writeFile(dataWizard1, object)
        })
    }

    // waktuOperasional(day, startTime, endTime) {
    //     day = cy.xpath(create_service.senin)
    //     day.click()

    //     startTime = cy.xpath(create_service.startTime + day)
    //     startTime.clear()
    //     startTime.type(startTime)

    //     endTime = cy.xpath(create_service.endTime + day)
    //     endTime.clear()
    //     endTime.type(endTime)
    //     // day.click()
    // }

    waktuOperasionalSenin(startTime, endTime) {
        const day = cy.xpath(create_service.senin)
        day.click()

        const start = cy.xpath(create_service.startTimeSenin)
        start.clear()
        start.type(startTime)

        const end = cy.xpath(create_service.endTimeSenin)
        end.clear()
        end.type(endTime)
        // day.click()
    }

    waktuOperasionalSelasa(startTime, endTime) {
        const day = cy.xpath(create_service.selasa)
        day.click()

        const start = cy.xpath(create_service.startTimeSelasa)
        start.clear()
        start.type(startTime)

        const end = cy.xpath(create_service.endTimeSelasa)
        end.clear()
        end.type(endTime)
    }

    contactHotlinePhone(phoneNumber) {
        cy.readFile(dataWizard1).then((object) => {
            const phoneHotline = cy.xpath(create_service.contactHotlinePhone).as('hotlinePhone')
            phoneHotline.clear()
            object.hotlinePhone = phoneNumber
            cy.writeFile(dataWizard1, object)
            phoneHotline.type(phoneNumber)
        })

    }

    contactHotlineEmail(email) {
        cy.readFile(dataWizard1).then((object) => {
            const emailHotline = cy.xpath(create_service.contactHotlineEmail).as('hotlineEmail')
            emailHotline.clear()
            object.hotlineEmail = email
            cy.writeFile(dataWizard1, object)
            emailHotline.type(email)
        })
    }

    clickBtnTambahLokasi() {
        const btnTambahLokasi = cy.contains(create_service.btnTambahLokasi)
        btnTambahLokasi.click()
    }

    lokasiPelayananMultiple() {
        for (let i = 1; i < 2; i++) {
            this.clickBtnTambahLokasi()
        }

        // Data 1
        const dropdownLokasi = cy.xpath(create_service.dropdownJenisLokasi).as('dropdownLokasi')
        dropdownLokasi.click()

        const unit = cy.xpath("//div[@class='jds-popover__content']//li[1]").as('chooseUnit')
        unit.click()

        const dropdownPj = cy.xpath(create_service.dropdownPj).as('dropdownPenanggungJawab')
        dropdownPj.click()

        const search = cy.xpath("(//input[@type='text'])[54]").as('searchType')
        search.type('UPTD Pusat Layanan Operasional Pendapatan Daerah', { force: true })

        // const pjLokasi = cy.xpath("//li[@class='jds - options__option - list - item']//span[@class='jds - options__option - list - item__text'][normalize-space()='UPTD Pusat Layanan Operasional Pendapatan Daerah']")
        // pjLokasi.click()


        // const namaLokasi1 = cy.xpath(create_service.namaLokasi1)
        // namaLokasi1.clear()
        // namaLokasi1.type('Lokasi 1')

        // const alamatLokasi1 = cy.xpath(create_service.alamatLokasi1)
        // alamatLokasi1.clear()
        // alamatLokasi1.type('Lokasi 1')

        const kontakLokasi1 = cy.xpath(create_service.kontakLokasi1).as('kontakLokasi1')
        kontakLokasi1.clear()
        kontakLokasi1.type('082289993847')

        // Data 2
        const dropdownLokasi2 = cy.xpath("(//input[@placeholder='Pilih Jenis Lokasi'])[2]").as('dropdownLokasi')
        dropdownLokasi2.click()

        const unit2 = cy.xpath("(//li[@class='jds-options__option-list-item'])[250]").as('chooseUnit')
        unit2.click()

        const dropdownPj2 = cy.xpath("(//input[@placeholder='Pilih Penanggung Jawab Lokasi'])[2]").as('dropdownPenanggungJawab')
        dropdownPj2.click()

        const search2 = cy.xpath("(//input[@type='text'])[60]").as('searchType2')
        search2.type('UPTD Pusat Pengelolaan Pendapatan Daerah Wilayah Kota Depok I', { force: true })

        // const namaLokasi1 = cy.xpath(create_service.namaLokasi1)
        // namaLokasi1.clear()
        // namaLokasi1.type('Lokasi 1')

        // const alamatLokasi1 = cy.xpath(create_service.alamatLokasi1)
        // alamatLokasi1.clear()
        // alamatLokasi1.type('Lokasi 1')

        const kontakLokasi2 = cy.xpath(create_service.kontakLokasi1).as('kontakLokasi1')
        kontakLokasi1.clear()
        kontakLokasi1.type('082289993848')
    }

    clickBtnSimpanLanjutkan() {
        const btnSimpanLanjutkan = cy.contains(create_service.btnSimpanLanjutkan)
        btnSimpanLanjutkan.click()

        cy.readFile(dataWizard1).then((object) => {
            const teknisLayanan = object.teknisLayanan
            if (teknisLayanan == 'online') {
                cy.xpath("(//h2[@class='font-roboto font-medium text-blue-gray-800 text-[16px] leading-[28px] pb-7'])[1]").should('contain', 'Aplikasi')
            } else {
                cy.xpath("/html[1]/body[1]/div[1]/div[1]/div[1]/div[1]/main[1]/span[1]/form[1]/section[2]/span[1]/fieldset[1]/section[1]/img[1]")
                    .should('have.attr', 'src', '/assets/ilustrasi-layanan-master-data-offline.ab4530ff.svg"')
            }
        })
    }

    clickBtnSimpanLanjutkan2() {
        const btnSimpanLanjutkan = cy.contains(create_service.btnSimpanLanjutkan)
        btnSimpanLanjutkan.click()
    }

    // Wizard 2
    statusKetersediaanAplikasi(text) {
        cy.readFile(dataWizard1).then((object) => {
            const dropdown = cy.xpath(create_service.statusKetersediaanApps).as('dropdownStatus')
            dropdown.click()
            cy.contains(text).click()
            object.statusKetersediaanAplikasi = text
            cy.writeFile(dataWizard1, object)
        })
    }

    namaAplikasi(text) {
        cy.readFile(dataWizard1).then((object) => {
            const namaAplikasi = cy.xpath(create_service.namaApps)
            namaAplikasi.clear()
            namaAplikasi.type(text)
            object.namaAplikasi = text
            cy.writeFile(dataWizard1, object)
        })
    }

    clickBtnTambahFiturAplikasi() {
        const btnTambahkan = cy.contains(create_service.btnTambahFiturAplikasi).as('btnTambahkan')
        btnTambahkan.click()
    }

    fiturAplikasiMultiple() {
        for (let i = 1; i < 3; i++) {
            this.clickBtnTambahFiturAplikasi()
        }

        cy.readFile(dataWizard1).then((object) => {
            // Data 1
            const fiturApps1 = cy.xpath(create_service.fiturAplikasi1)
            const value1 = faker.random.word(2)
            object.fiturApps1 = value1
            cy.writeFile(dataWizard1, object)
            fiturApps1.clear()
            fiturApps1.type(value1)

            const deskripsiApps1 = cy.xpath(create_service.deskripsiFitur1)
            const deskripsiValue1 = faker.random.word(3)
            object.deskripsiFitur1 = deskripsiValue1
            cy.writeFile(dataWizard1, object)
            deskripsiApps1.clear()
            deskripsiApps1.type(deskripsiValue1)

            // Data 2
            const fiturApps2 = cy.xpath(create_service.fiturAplikasi2)
            const value2 = faker.random.word(2)
            object.fiturApps2 = value2
            cy.writeFile(dataWizard1, object)
            fiturApps2.clear()
            fiturApps2.type(value2)

            const deskripsiApps2 = cy.xpath(create_service.deskripsiFitur2)
            const deskripsiValue2 = faker.random.word(3)
            object.deskripsiFitur2 = deskripsiValue2
            cy.writeFile(dataWizard1, object)
            deskripsiApps2.clear()
            deskripsiApps2.type(deskripsiValue2)

            // Data 3
            const fiturApps3 = cy.xpath(create_service.fiturAplikasi3)
            const value3 = faker.random.word(2)
            object.fiturApps3 = value3
            cy.writeFile(dataWizard1, object)
            fiturApps3.clear()
            fiturApps3.type(value3)

            const deskripsiApps3 = cy.xpath(create_service.deskripsiFitur3)
            const deskripsiValue3 = faker.random.word(3)
            object.deskripsiFitur3 = deskripsiValue3
            cy.writeFile(dataWizard1, object)
            deskripsiApps3.clear()
            deskripsiApps3.type(deskripsiValue3)
        })
    }
    // Wizard 2

    // Wizard 3
    namaPenanggungJawab(text) {
        cy.readFile(dataWizard1).then((object) => {
            const nama = cy.get(create_service.pjNama)
            nama.clear()
            nama.type(text)
            object.namaPenanggungJawab = text
            cy.writeFile(dataWizard1, object)
        })
    }

    nomorHp(text) {
        cy.readFile(dataWizard1).then((object) => {
            const hp = cy.get(create_service.pjNomorHp)
            hp.clear()
            hp.type(text)
            object.hpPenanggungJawab = text
            cy.writeFile(dataWizard1, object)
        })
    }

    alamatEmail(text) {
        cy.readFile(dataWizard1).then((object) => {
            const email = cy.get(create_service.pjEmail)
            email.clear()
            email.type(text)
            object.alamatEmail = text
            cy.writeFile(dataWizard1, object)
        })
    }

    clickBtnTambahSocialMedia() {
        const btnAddSocmed = cy.contains(create_service.btnTambahkanSosmed)
        btnAddSocmed.click()
    }

    socialMediaMultiple() {
        for (let i = 1; i < 3; i++) {
            this.clickBtnTambahSocialMedia()
        }

        // Data 1
        const socmedName1 = cy.get(create_service.namaSosmed1)
        socmedName1.clear()
        socmedName1.type('Tes1')

        // dropdown
        const chooseSocmed1 = cy.xpath(create_service.dropdownSosmed1)
        chooseSocmed1.click()
        cy.wait(2000)

        // facebook
        const socmed1 = cy.contains(create_service.facebook)
        socmed1.click({ force: true })

        // url
        const url1 = cy.xpath(create_service.urlSosmed1)
        url1.clear()
        url1.type("https://www.facebook.com/")

        // Data 2
        const socmedName2 = cy.get(create_service.namaSosmed2)
        socmedName2.clear()
        socmedName2.type('Tes2')

        // dropdown
        const chooseSocmed2 = cy.xpath(create_service.dropdownSosmed2)
        chooseSocmed2.click()
        cy.wait(2000)

        // instagram
        const socmed2 = cy.xpath('/html[1]/body[1]/div[1]/div[1]/div[1]/div[1]/main[1]/span[1]/form[1]/section[2]/span[1]/fieldset[1]/section[2]/div[2]/div[1]/section[1]/div[2]/div[2]/div[1]/div[1]/div[1]/ul[1]/li[2]/a[1]')
        socmed2.click({ force: true })

        // url  
        const url2 = cy.xpath(create_service.urlSosmed2)
        url2.clear()
        url2.type("https://www.instagram.com/")

        // Data 3
        const socmedName3 = cy.get(create_service.namaSosmed3)
        socmedName3.clear()
        socmedName3.type('Tes2')

        // dropdown
        const chooseSocmed3 = cy.xpath(create_service.dropdownSosmed3)
        chooseSocmed3.click()
        cy.wait(2000)

        // twitter
        const socmed3 = cy.xpath('/html[1]/body[1]/div[1]/div[1]/div[1]/div[1]/main[1]/span[1]/form[1]/section[2]/span[1]/fieldset[1]/section[2]/div[2]/div[1]/section[1]/div[3]/div[2]/div[1]/div[1]/div[1]/ul[1]/li[3]/a[1]')
        socmed3.click({ force: true })

        // url  
        const url3 = cy.xpath(create_service.urlSosmed3)
        url3.clear()
        url3.type("https://twitter.com/")
    }

    clickBtnTambahkanLayanan() {
        const btn = cy.contains(create_service.btnTambahkanLayanan)
        btn.click()
    }

    clickBtnSaveCreateService() {
        const btn = cy.xpath(create_service.btnSaveCreateService)
        btn.click()
    }

    clickBtnUnderstand() {
        deleteServicePage.clickBtnUnderstand()
    }
    // Wizard 3

}