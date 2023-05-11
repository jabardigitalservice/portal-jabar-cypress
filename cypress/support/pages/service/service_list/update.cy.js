import navbar from "../../../selectors/navbar"
import create_service from "../../../selectors/service/service_list/create";
import update_service from "../../../selectors/service/service_list/update";
import { CreateServiceMasterPage } from "./create.cy"

const { faker } = require('@faker-js/faker')
const dataUpdate = "cypress/fixtures/service/update_temp_data.json"
const dataWizard1 = "cypress/fixtures/service/wizard1_temp_data.json"
const data = faker.random.word(2)
const data2 = faker.random.word(3)
const data3 = faker.random.word(2)
let create_page = new CreateServiceMasterPage()

export class UpdateServiceMasterPage {
    assertUpdateServicePage() {
        const titleH1 = cy.get(navbar.titleH1)
        titleH1.should("contain", "Ubah Data Layanan Pemerintah Daerah Provinsi Jawa Barat")
        // cy.url().should("eq", Cypress.env("base_url") + "/layanan/master-data/")
    }

    chooseUrusanPemerintahan() {
        const clickDropdown = cy.xpath(update_service.urusanPemerintahan).as('urusanPemerintahan')
        clickDropdown.click()

        const pendidikan = cy.contains(update_service.urusanPemerintahanPendidikan)
        const valueAssertion = 'KESEHATAN'
        pendidikan.click()
        cy.readFile(dataWizard1).then((object) => {
            object.urusanPemerintahan = valueAssertion
            cy.writeFile(dataWizard1, object)
        })
    }

    chooseSubUrusanPemerintahan() {
        const clickDropdown = cy.xpath(update_service.subUrusanPemerintahan).as('subUrusan')
        clickDropdown.click()

        const manajemenPendidikan = cy.contains(update_service.subUrusanPemerintahanManajemen)
        manajemenPendidikan.click()
        const valueAssertion = 'Upaya Kesehatan'
        cy.readFile(dataWizard1).then((object) => {
            object.subUrusanPemerintahan = valueAssertion
            cy.writeFile(dataWizard1, object)
        })
    }

    chooseBentukLayanan() {
        const clickDropdown = cy.xpath(update_service.bentukLayanan).as('bentukLayanan')
        clickDropdown.click()

        const administratif = cy.contains(update_service.bentukLayananAdministratif)
        administratif.click()
        const valueAssertion = 'BARANG'
        cy.readFile(dataWizard1).then((object) => {
            object.bentukLayanan = valueAssertion
            cy.writeFile(dataWizard1, object)
        })
    }

    jenisLayanan(text) {
        create_page.jenisLayanan(text)
    }

    subJenisLayanan() {
        create_page.subJenisLayanan
    }

    namaLayanan() {
        create_page.namaLayanan()
    }

    namaProgramLayanan() {
        create_page.namaProgramLayanan()
    }

    deskripsiLayanan() {
        create_page.deskripsiLayanan()
    }

    penggunaLayanan() {
        const clickDropdown = cy.xpath(create_service.penggunaLayanan).as('penggunaLayanan')
        clickDropdown.click()

        const asn = cy.contains(create_service.penggunaLayananAsn)
        asn.click()
        const valueAssertion = 'ASN'
        cy.readFile(dataWizard1).then((object) => {
            object.penggunaLayanan = valueAssertion
            cy.writeFile(dataWizard1, object)
        })
    }

    statusOperasional() {
        const clickDropdown = cy.xpath(create_service.statusOperasioinal).as('statusOperasional')
        clickDropdown.click()

        const not_aktif = cy.contains(create_service.statusOperasioinalTidakAktif)
        not_aktif.click()
        const valueAssertion = 'Tidak Aktif'
        cy.readFile(dataWizard1).then((object) => {
            object.statusOperasional = valueAssertion
            cy.writeFile(dataWizard1, object)
        })
    }

    teknisLayanan() {
        const clickDropdown = cy.xpath(create_service.teknisLayanan).as('teknisLayanan')
        clickDropdown.click()

        const online = cy.contains(create_service.teknisLayananOffline)
        online.click()
        const valueAssertion = 'offline'
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
            object.manfaatLayanan1 = data
            cy.writeFile(dataWizard1, object)
            const data1 = cy.xpath('/html[1]/body[1]/div[1]/div[1]/div[1]/div[1]/main[1]/span[1]/form[1]/section[2]/span[1]/fieldset[1]/section[1]/div[2]/div[1]/section[1]/span[14]/div[1]/div[1]/input[1]')
            data1.type(data)
            // this.clickBtnTambahManfaat()

            // Data 2
            const manfaatLayanan2 = cy.xpath('/html[1]/body[1]/div[1]/div[1]/div[1]/div[1]/main[1]/span[1]/form[1]/section[2]/span[1]/fieldset[1]/section[1]/div[2]/div[1]/section[1]/span[15]/div[1]/div[1]/input[1]')
            object.manfaatLayanan2 = data2
            cy.writeFile(dataWizard1, object)
            manfaatLayanan2.type(data2)
            // this.clickBtnTambahManfaat()

            // Data 3
            const manfaatLayanan3 = cy.xpath('/html[1]/body[1]/div[1]/div[1]/div[1]/div[1]/main[1]/span[1]/form[1]/section[2]/span[1]/fieldset[1]/section[1]/div[2]/div[1]/section[1]/span[16]/div[1]/div[1]/input[1]')
            object.manfaatLayanan3 = data3
            cy.writeFile(dataWizard1, object)
            manfaatLayanan3.type(data3)
        })
    }

    alamatWebsiteInformasiResmi(text) {
        create_page.alamatWebsiteInformasiResmi(text)
    }

    clickBtnTambahTautan() {
        const btnTambah = cy.contains(create_service.btnTambahTautan).as('btnTambahTautan')
        btnTambah.click()
    }

    tautanLayananMultiple() {
        // cy.readFile(dataWizard1).then((object) => {
        //     // Data 1
        //     const dropdownTautan = cy.get(create_service.dropdownTautan).as('dropdownTautan')
        //     dropdownTautan.click({ multiple: true, force: true })

        //     // const tautanGForm = cy.contains(create_service.tautanPlaystore).as('tautanGForm')
        //     const tautanPlaystore = cy.xpath("(//a[contains(text(),'Playstore')])[2]").as('tautanPlaystore')

        //     tautanPlaystore.click({ force: true })

        //     const tautanLayanan1 = cy.xpath(create_service.tautanLayanan1).as('tautanLayanan1')
        //     const textUrl = faker.image.technics()
        //     object.tautanLayanan1 = textUrl
        //     cy.writeFile(dataWizard1, object)
        //     tautanLayanan1.type(textUrl)

        //     const labelTautan1 = cy.xpath(create_service.labelTautan1).as('labelTautan1')
        //     const textLabel1 = faker.random.word()
        //     object.labelTautan1 = textLabel1
        //     cy.writeFile(dataWizard1, object)
        //     labelTautan1.type(textLabel1)

        //     // this.clickBtnTambahTautan()

        //     // Data 2
        //     const dropdownTautan2 = cy.get(create_service.dropdownTautan2).as('dropdownTautan')
        //     dropdownTautan2.click()

        //     // const tautanPlaystore = cy.xpath("(//a[contains(text(),'Playstore')])[2]").as('tautanPlaystore')
        //     const tautanGForm = cy.contains(create_service.tautanPlaystore).as('tautanGForm')

        //     tautanGForm.click({ force: true })

        //     const tautanLayanan2 = cy.get(':nth-child(24) > :nth-child(1) > .jds-input-text > .jds-input-text__input-wrapper > input').as('tautanLayanan2')
        //     const textUrl2 = faker.image.technics()
        //     object.tautanLayanan2 = textUrl2
        //     cy.writeFile(dataWizard1, object)
        //     tautanLayanan2.type(textUrl2)

        //     const labelTautan2 = cy.xpath(create_service.labelTautan2).as('labelTautan2')
        //     const textLabel2 = faker.random.word()
        //     object.labelTautan2 = textLabel2
        //     cy.writeFile(dataWizard1, object)
        //     labelTautan2.type(textLabel2)

        //     // this.clickBtnTambahTautan()

        //     // Data 3
        //     const dropdownTautan3 = cy.get(create_service.dropdownTautan3).as('dropdownTautan')
        //     dropdownTautan3.click()

        //     const tautanAppstore = cy.xpath("(//a[contains(text(),'App Store')])[3]").as('tautanAppStore')
        //     tautanAppstore.click({ force: true })

        //     const tautanLayanan3 = cy.get(':nth-child(25) > :nth-child(1) > .jds-input-text > .jds-input-text__input-wrapper > input').as('tautanLayanan3')
        //     const textUrl3 = faker.image.technics()
        //     object.tautanLayanan3 = textUrl3
        //     cy.writeFile(dataWizard1, object)
        //     tautanLayanan3.type(textUrl3)

        //     const labelTautan3 = cy.xpath(create_service.labelTautan3).as('labelTautan3')
        //     const textLabel3 = faker.random.word()
        //     object.labelTautan3 = textLabel3
        //     cy.writeFile(dataWizard1, object)
        //     labelTautan3.type(textLabel3)

        //     // this.clickBtnTambahTautan()

        //     // Data 4
        //     const dropdownTautan4 = cy.get(create_service.dropdownTautan4).as('dropdownTautan')
        //     dropdownTautan4.click()

        //     const tautanWebsite = cy.xpath("(//a[contains(text(),'Website')])[4]").as('tautanWebsite')
        //     tautanWebsite.click({ force: true })

        //     const tautanLayanan4 = cy.get(':nth-child(26) > :nth-child(1) > .jds-input-text > .jds-input-text__input-wrapper > input').as('tautanLayanan4')
        //     const textUrl4 = faker.image.technics()
        //     object.tautanLayanan4 = textUrl4
        //     cy.writeFile(dataWizard1, object)
        //     tautanLayanan4.type(textUrl4)

        //     const labelTautan4 = cy.xpath(create_service.labelTautan4).as('labelTautan4')
        //     const textLabel4 = faker.random.word()
        //     object.labelTautan4 = textLabel4
        //     cy.writeFile(dataWizard1, object)
        //     labelTautan4.type(textLabel4)
        // })
        cy.get("span:nth-of-type(19) > div:nth-of-type(1) > div > div > div > div").click();
        cy.get("span:nth-of-type(19) li:nth-of-type(2) > a").click();
        cy.get("span:nth-of-type(19) > div:nth-of-type(1) input").dblclick();
        cy.get("span:nth-of-type(19) > div:nth-of-type(1) input").click();
        cy.get("span:nth-of-type(19) > div:nth-of-type(1) input").clear().type("https://persib.co.id");
        cy.get("span:nth-of-type(19) > div:nth-of-type(2) input").dblclick();
        cy.get("span:nth-of-type(19) > div:nth-of-type(2) input").clear().type("test 1");
        cy.get("span:nth-of-type(20) > div:nth-of-type(1) > div > div > div > div").click();
        cy.get("span:nth-of-type(20) li:nth-of-type(1) > a").click();
        cy.get("span:nth-of-type(20) > div:nth-of-type(1) input").dblclick();
        cy.get("span:nth-of-type(20) > div:nth-of-type(1) input").click();
        cy.get("span:nth-of-type(20) > div:nth-of-type(1) input").clear().type("https://testing.co.id");
        cy.get("span:nth-of-type(20) > div:nth-of-type(2) input").dblclick();
        cy.get("span:nth-of-type(20) > div:nth-of-type(2) input").click();
        cy.get("span:nth-of-type(20) > div:nth-of-type(2) input").clear().type("test 2");
        cy.get("span:nth-of-type(21) > div:nth-of-type(1) > div > div > div > div").click();
        cy.get("span:nth-of-type(21) li:nth-of-type(4) > a").click();
        cy.get("span:nth-of-type(21) > div:nth-of-type(1) input").dblclick();
        cy.get("span:nth-of-type(21) > div:nth-of-type(1) input").click();
        cy.get("span:nth-of-type(21) > div:nth-of-type(1) input").clear().type("https://facebook.com");
        cy.get("span:nth-of-type(21) > div:nth-of-type(2) input").dblclick();
        cy.get("span:nth-of-type(21) > div:nth-of-type(2) input").clear().type("facebook");
        cy.get("span:nth-of-type(22) > div:nth-of-type(1) > div > div > div > div").click();
        cy.get("span:nth-of-type(22) li:nth-of-type(3) > a").click();
        cy.get("span:nth-of-type(22) > div:nth-of-type(1) input").dblclick();
        cy.get("span:nth-of-type(22) > div:nth-of-type(1) input").click();
        cy.get("span:nth-of-type(22) > div:nth-of-type(1) input").clear().type("https://persib.co.id");
        cy.get("span:nth-of-type(22) > div:nth-of-type(2) input").dblclick();
        cy.get("span:nth-of-type(22) > div:nth-of-type(2) input").clear().type("link tes");
    }

    clickBtnTambahSk() {
        const btnTambahSk = cy.contains(create_service.btnTambahSk)
        btnTambahSk.click()
    }

    syaratKetentuanMultiple() {
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
            tarifLayanan.type('2000')
            object.tarifLayanan = '2000'
            cy.writeFile(dataWizard1, object)
        })
    }

    waktuOperasionalSenin(startTime, endTime) {
        const start = cy.xpath(create_service.startTimeSenin)
        start.clear()
        start.type(startTime)

        const end = cy.xpath(create_service.endTimeSenin)
        end.clear()
        end.type(endTime)
    }

    waktuOperasionalSelasa(startTime, endTime) {
        const start = cy.xpath(create_service.startTimeSelasa)
        start.clear()
        start.type(startTime)

        const end = cy.xpath(create_service.endTimeSelasa)
        end.clear()
        end.type(endTime)
    }

    contactHotlinePhone(phoneNumber) {
        create_page.contactHotlinePhone(phoneNumber)

    }

    contactHotlineEmail(email) {
        create_page.contactHotlineEmail(email)
    }

    lokasiPelayananMultiple() {
        // Data 1
        cy.get("section > div:nth-of-type(1) > div:nth-of-type(1) div.jds-popover__activator input").click();
        cy.get("section > div:nth-of-type(1) > div:nth-of-type(1) li:nth-of-type(2)").click();
        cy.get("div:nth-of-type(1) > div:nth-of-type(2) div.jds-popover__activator input").click();
        cy.get("section > div:nth-of-type(1) > div:nth-of-type(2) li:nth-of-type(2)").click();
        cy.get("div:nth-of-type(1) > div:nth-of-type(3) input").click();
        cy.get("div:nth-of-type(1) > div:nth-of-type(3) input").type("Lokasi Testing");
        cy.get("section > div:nth-of-type(1) textarea").click();
        cy.get("section > div:nth-of-type(1) textarea").type("Jalan Lokasi testing lagi lagi");
        cy.get("div:nth-of-type(1) > div:nth-of-type(5) input").click();
        cy.get("div:nth-of-type(1) > div:nth-of-type(5) input").type("082237778476");

        // Data 2
        cy.get("div > section > div:nth-of-type(2) > div:nth-of-type(1) div.jds-popover__activator input").click();
        cy.get("div > section > div:nth-of-type(2) > div:nth-of-type(1) li:nth-of-type(2)").click();
        cy.get("div:nth-of-type(2) > div:nth-of-type(2) div.jds-popover__activator input").click();
        cy.get("div > section > div:nth-of-type(2) li:nth-of-type(3)").click();
        cy.get("div:nth-of-type(2) > div:nth-of-type(3) input").click();
        cy.get("div:nth-of-type(2) > div:nth-of-type(3) input").type("BLUD Testing");
        cy.get("div > section > div:nth-of-type(2) textarea").click();
        cy.get("div > section > div:nth-of-type(2) textarea").type("testing alamat BLUD ");
        cy.get("div:nth-of-type(2) > div:nth-of-type(5) input").click();
        cy.get("div:nth-of-type(2) > div:nth-of-type(5) input").type("089983337263");
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
}