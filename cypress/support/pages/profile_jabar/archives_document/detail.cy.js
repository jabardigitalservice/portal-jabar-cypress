import detail from "../../../selectors/profile_jabar/archives_document/detail"

const dataArchivesDocument = "cypress/fixtures/profile_jabar/archives_document/data_archives_document.json"

export class DetailPage {
    assertDetailPage() {
        const titleDetailPage = cy.get(detail.titleDetailPage)
        titleDetailPage.should('contain', 'Detail Arsip dan Dokumen')
    }

    assertDataDetail() {
        const dayjs = require("dayjs")
        const table = cy.get(detail.tableInfoDetail)
        cy.readFile(dataArchivesDocument).then((object) => {
            table.should('contain', object.titleDocument)
                .and('contain', object.descDocument)
                .and('contain', object.categoryTopic)
            // .and('contain', dayjs().format("DD/MM/YYYY - HH:mm"))
        })
    }

    clickBtnBack() {
        const btn = cy.get(detail.btnBack)
        btn.should('contain', 'Kembali').click()
    }
}