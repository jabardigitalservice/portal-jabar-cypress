import { NavbarComponent } from "../../component/navbar_component.cy";

let navbarComponent = new NavbarComponent()

export class NavbarPage {
    verifyPage() {
        const titleH1 = navbarComponent.elements.titleH1()

        cy.url().then(($url) => {
            if ($url.includes(Cypress.env('base_url'))) {
                titleH1.should('contain', 'Dashboard')
            } else {
                titleH1.should('contain', 'Agenda Jawa Barat')
            }
        })
    }
}