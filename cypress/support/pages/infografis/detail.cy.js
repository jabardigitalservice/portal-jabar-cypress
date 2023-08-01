import detail from "../../selectors/landing_page/infografis/detail"

const dataInfographics = "cypress/fixtures/landing_page/infographics/data_infographics.json"


export class DetailInfographicsBannerPage {
    assertDetailPage() {
        const titleDetailPage = cy.xpath(detail.titleDetailPage)
        titleDetailPage.should('contain', 'Detail Banner Infografis')
    }

    assertDataDetail() {
        const dayjs = require("dayjs")
        const table = cy.get('[data-cy="infographics-banner-detail__container"]')
        cy.readFile(dataInfographics).then((object) => {
            table.should('contain', object.titleBanner)
                .and('contain', object.linkRedirect)
                .and('contain', dayjs().format("DD/MM/YYYY - HH:mm"))
        })
    }

    clickBtnBack() {
        const btn = cy.get(detail.btnBack)
        btn.should('contain', 'Kembali').click()
    }
}